from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Datenbank erstellen (einmalig)
def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS ratings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            rating INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
init_db()

@app.route('/business/business.html', methods=['POST'])
def rate_product():
    data = request.get_json()
    product_id = data['product_id']
    rating = data['rating']

    if product_id is None or rating is None:
        return jsonify({'error': 'Ungültige Daten'}), 400

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("INSERT INTO ratings (product_id, rating) VALUES (?, ?)", (product_id, rating))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Bewertung gespeichert!'})

@app.route('/')
def index():
    return render_template('business.html')

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
