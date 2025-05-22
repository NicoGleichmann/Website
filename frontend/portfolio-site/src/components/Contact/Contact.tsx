import styles from './Contact.module.css';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTheme } from '../DarkModeToggle/DarkModeProvider';

const containerVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ContactSection = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setStatus({ type: 'success', message: 'Nachricht erfolgreich gesendet!' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ type: 'error', message: 'Fehler beim Senden der Nachricht.' });
      }
      
    } catch (error) {
      console.error("Fehler:", error);
      alert("Serverfehler.");
    }
  };

  return (
    <section 
      className={styles.contactSection} 
      id="contact"
      data-theme={isDarkMode ? 'dark' : 'light'}
    >
      <motion.div
        className={styles.left}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h1 variants={itemVariants}>Let's talk</motion.h1>
        <motion.p variants={itemVariants}>Stelle eine Frage oder sage einfach nur „Hallo“ …</motion.p>
        <motion.div className={styles.contactInfo} variants={itemVariants}>
          <p>📞 +49 176 44444 856</p>
          <p>📧 nicogleichmann39@gmail.com</p>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.right}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.form className={styles.form} variants={itemVariants} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Name..."
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="beispiel@domain.de"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Hallo du..."
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit" className={styles.submitBtn}>SENDEN ➤</button>

          {status && (
            <div className={status.type === 'success' ? styles.successMessage : styles.errorMessage}>
              {status.message}
            </div>
          )}
        </motion.form>

        <motion.div className={styles.socials} variants={itemVariants}>
          <a href="https://www.instagram.com/nico.gleichmann/">📘</a>
          <a href="https://twitter.com/nicogleichmann">🐦</a>
          <a href="https://www.youtube.com/@nicogleichmann">▶️</a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
