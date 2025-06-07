// server.js - Newsletter-Anmeldung mit Brevo-Integration

import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Load environment variables as early as possible
dotenv.config();

// Brevo API-URLs
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_CONTACTS_API_URL = 'https://api.brevo.com/v3/contacts';
// Ensure API_KEY is available from .env
// Using process.env.API_KEY directly in the code

// Globale Pfadvariablen
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pfad zur JSON-Datei für Newsletter-Abonnenten
const subscribersPath = path.join(__dirname, 'newsletterSubscribers.json');

// Funktion zum Lesen der Abonnenten
async function getSubscribers() {
    try {
        // Check if file exists first
        try {
            await fs.access(subscribersPath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, create it with an empty array
                await fs.writeFile(subscribersPath, JSON.stringify([], null, 2), 'utf-8');
                return [];
            }
            throw error;
        }
        
        // File exists, read it
        const data = await fs.readFile(subscribersPath, 'utf-8');
        
        // Handle empty file
        if (!data.trim()) {
            await fs.writeFile(subscribersPath, JSON.stringify([], null, 2), 'utf-8');
            return [];
        }
        
        return JSON.parse(data);
    } catch (error) {
        console.error('Fehler beim Lesen der Abonnenten:', error);
        // Return empty array as fallback
        return [];
    }
}

// Funktion zum Speichern eines neuen Abonnenten
async function saveSubscriber(email) {
    try {
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return { success: false, message: 'Ungültige E-Mail-Adresse.' };
        }

        const subscribers = await getSubscribers();
        if (!Array.isArray(subscribers)) {
            console.error('Ungültiges Abonnentenformat, initialisiere neue Liste');
            await fs.writeFile(subscribersPath, JSON.stringify([], null, 2), 'utf-8');
            return saveSubscriber(email); // Try again with fresh file
        }

        const exists = subscribers.some(sub => 
            sub && sub.email && sub.email.toLowerCase() === email.toLowerCase()
        );
        
        if (exists) {
            return { success: false, message: 'Diese E-Mail ist bereits angemeldet.' };
        }

        const newSubscriber = {
            email: email.toLowerCase(),
            subscribedAt: new Date().toISOString()
        };

        const updatedSubscribers = [...subscribers, newSubscriber];
        
        try {
            await fs.writeFile(
                subscribersPath, 
                JSON.stringify(updatedSubscribers, null, 2), 
                'utf-8'
            );
            return { 
                success: true, 
                message: 'Erfolgreich für den Newsletter angemeldet!', 
                data: newSubscriber 
            };
        } catch (writeError) {
            console.error('Fehler beim Speichern der Abonnentenliste:', writeError);
            return { 
                success: false, 
                message: 'Fehler beim Speichern. Bitte versuchen Sie es später erneut.' 
            };
        }
    } catch (error) {
        console.error('Kritischer Fehler in saveSubscriber:', error);
        return { 
            success: false, 
            message: 'Ein unerwarteter Fehler ist aufgetreten.',
            error: error.message 
        };
    }
}

// Initialize the Express app
const app = express();

// CORS Konfiguration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://deine-domain.de'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// --- Core Middleware ---
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses incoming requests with URL-encoded payloads
app.use(cors(corsOptions)); // Apply CORS middleware
app.options('*', cors(corsOptions)); // Handle preflight requests for all routes

// --- Environment Variable Checks ---
if (!process.env.API_KEY) {
    console.error('Umgebungsvariable API_KEY fehlt. Bitte in der .env-Datei festlegen.');
    process.exit(1);
}

if (!process.env.SENDER_EMAIL) {
    console.error('Umgebungsvariable SENDER_EMAIL fehlt. Bitte in der .env-Datei festlegen.');
    process.exit(1);
}

// --- API Routes ---

// GET-Route für /api/newsletter (nur für Tests)
app.get('/api/newsletter', (req, res) => {
    res.json({ status: 'running', message: 'Newsletter-API ist erreichbar' });
});

// POST-Route zur Newsletter-Anmeldung (für Abwärtskompatibilität)
app.post('/api/newsletter', async (req, res) => {
    console.log('Incoming request body:', req.body);
    const { email, token } = req.body;
    
    // Log the presence of required fields
    console.log('Email present:', !!email);
    console.log('Token present:', !!token);
    console.log('reCAPTCHA secret key present:', !!process.env.RECAPTCHA_SECRET_KEY);

    // Temporarily disable reCAPTCHA for testing
    console.log('reCAPTCHA validation is temporarily disabled for testing');
    /*
    // Re-enable this block after testing
    if (process.env.RECAPTCHA_SECRET_KEY) {
        if (!token) {
            console.warn('reCAPTCHA-Token fehlt in der Anfrage');
            return res.status(400).json({
                success: false,
                message: 'reCAPTCHA-Token fehlt',
                error: 'missing-token'
            });
        }

        try {
            const verificationUrl = 'https://www.google.com/recaptcha/api/siteverify';
            const verificationParams = new URLSearchParams();
            verificationParams.append('secret', process.env.RECAPTCHA_SECRET_KEY);
            verificationParams.append('response', token);
            
            const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            if (userIp) {
                verificationParams.append('remoteip', userIp);
            }

            const recaptchaResponse = await fetch(verificationUrl, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: verificationParams.toString()
            });

            const recaptchaData = await recaptchaResponse.json();
            console.log('reCAPTCHA Antwort:', recaptchaData);

            if (!recaptchaData.success) {
                console.warn('reCAPTCHA-Validierung fehlgeschlagen:', recaptchaData['error-codes']);
                let errorMessage = 'reCAPTCHA-Validierung fehlgeschlagen';
                if (recaptchaData['error-codes'] && recaptchaData['error-codes'].length > 0) {
                    const errorCode = recaptchaData['error-codes'][0];
                    if (errorCode === 'missing-input-secret' || errorCode === 'invalid-input-secret') {
                        errorMessage = 'Ungültiger reCAPTCHA Secret Key.';
                    } else if (errorCode === 'missing-input-response' || errorCode === 'invalid-input-response') {
                        errorMessage = 'Ungültige reCAPTCHA-Antwort. Bitte laden Sie die Seite neu.';
                    } else if (errorCode === 'bad-request') {
                        errorMessage = 'Ungültige reCAPTCHA-Anfrage.';
                    } else if (errorCode === 'timeout-or-duplicate') {
                        errorMessage = 'reCAPTCHA-Token abgelaufen. Bitte laden Sie die Seite neu.';
                    }
                }

                return res.status(400).json({
                    success: false,
                    message: errorMessage,
                    error: 'recaptcha-failed',
                    errorCodes: recaptchaData['error-codes']
                });
            }
        } catch (error) {
            console.error('reCAPTCHA-Validierungsfehler:', error);
            return res.status(500).json({
                success: false,
                message: 'Fehler bei der reCAPTCHA-Validierung',
                error: 'recaptcha-error',
                details: error.message
            });
        }
    }
    */

    if (!email || typeof email !== 'string' || !email.includes('@')) { // Basic email format check
        return res.status(400).json({ success: false, message: 'Ungültige E-Mail-Adresse.' });
    }

    try {
        const result = await saveSubscriber(email);

        if (!result.success) {
            return res.status(409).json(result); // 409 Conflict if email already exists
        }

        // Optional: Integration mit Brevo (Kontakt hinzufügen)
        const brevoResponse = await fetch(BREVO_CONTACTS_API_URL, {
            method: 'POST',
            headers: {
                'api-key': BREVO_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                updateEnabled: false, // Prevents updating existing contact attributes if they already exist
                // optional: listIds: [123], // Add contact to specific list in Brevo
            }),
        });

        if (!brevoResponse.ok) {
            const brevoErrorText = await brevoResponse.text();
            console.error('Fehler bei der Brevo API-Integration:', brevoResponse.status, brevoErrorText);
            // You might choose to return an error here or just log it
            // return res.status(500).json({ success: false, message: 'Anmeldung erfolgreich, aber Brevo-Integration fehlgeschlagen.' });
        }

        return res.json(result);
    } catch (error) {
        console.error('Serverfehler bei der Newsletter-Anmeldung:', error);
        return res.status(500).json({ success: false, message: 'Serverfehler bei der Anmeldung.' });
    }
});

// Route zur Newsletter-Anmeldung (neue Route, identical functionality to /api/newsletter post)
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Ungültige E-Mail-Adresse.' });
    }

    try {
        const result = await saveSubscriber(email);

        if (!result.success) {
            return res.status(409).json(result);
        }

        // Integration mit Brevo (Kontakt hinzufügen)
        if (!process.env.API_KEY) {
            console.warn('Brevo API key is not configured. Skipping Brevo integration.');
        } else {
            console.log('Brevo API Key gefunden, versuche Kontakt zu erstellen...');
            try {
                const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
                    method: 'POST',
                    headers: {
                        'api-key': process.env.API_KEY,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        updateEnabled: true, // Änderung: updateEnabled auf true, um bestehende E-Mails zu aktualisieren
                        attributes: {
                            NEWSLETTER: true,
                            SIGNUP_DATE: new Date().toISOString()
                        },
                        listIds: [2] // Wichtig: Diese ID muss mit deiner tatsächlichen Listen-ID in Brevo übereinstimmen
                    }),
                });


                const brevoData = await brevoResponse.json();
                console.log('Brevo API Response:', brevoData);
                
                if (!brevoResponse.ok) {
                    console.error('Fehler bei der Brevo-API:', brevoData);
                    // Wir fahren trotzdem fort, da die lokale Speicherung erfolgreich war
                } else {
                    console.log('Kontakt erfolgreich in Brevo erstellt/aktualisiert');
                    return res.status(200).json({
                        success: true,
                        message: 'Erfolgreich für den Newsletter angemeldet!',
                        data: result.data,
                        brevoData: brevoData
                    });
                }
            } catch (brevoError) {
                console.error('Fehler bei der Kommunikation mit der Brevo-API:', brevoError);
                // Wir fahren trotzdem fort, da die lokale Speicherung erfolgreich war
            }
        }

        // Wenn wir hier ankommen, war die lokale Speicherung erfolgreich, aber Brevo nicht verfügbar
        return res.status(200).json({
            success: true,
            message: 'Erfolgreich angemeldet! (Brevo-Integration fehlgeschlagen)',
            data: result.data
        });

        return res.json(result);
    } catch (error) {
        console.error('Serverfehler bei der Anmeldung:', error);
        return res.status(500).json({ success: false, message: 'Serverfehler bei der Anmeldung.' });
    }
});

// --- Security Middleware (Apply after API routes but before static files/catch-all) ---
app.use(helmet());

// CSP-Konfiguration
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
        "img-src 'self' data: https:; " +
        "font-src 'self' https://fonts.gstatic.com; " +
        "connect-src 'self' https://www.google.com;"
    );
    next();
});

// Zusätzliche Sicherheits-Header
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minuten
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);


// --- Static Files & Catch-All Route (Must be last) ---
const staticPath = path.join(__dirname, '../frontend/navigation-site/dist');
app.use(express.static(staticPath, { index: false })); // 'index: false' ensures the catch-all handles index.html explicitly

// Debug-Ausgabe
console.log('Statische Dateien werden aus folgendem Verzeichnis bereitgestellt:');
console.log(staticPath);

// Alle nicht definierten GET-Routen auf die Hauptseite umleiten
// THIS MUST BE THE ABSOLUTE LAST ROUTE DEFINITION IN YOUR FILE
app.get('/*', (req, res) => {
    console.log(`Ungültige Route aufgerufen: ${req.path}, leite zur Hauptseite weiter`);
    res.sendFile(path.join(staticPath, 'index.html'));
});


// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
    console.log(`API-Endpunkte:
    - GET  /api/newsletter  Test-API-Endpunkt
    - POST /api/newsletter  Newsletter-Anmeldung`);
});