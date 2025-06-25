# 🖥️ Backend - Ankey (Anki Card App)

Ini adalah **backend server** untuk aplikasi Flutter **Ankey**, sebuah aplikasi Anki Card yang memungkinkan pengguna membuat, mengelola, dan meninjau kartu belajar.

Backend ini dibangun menggunakan:
- Node.js
- Express.js
- MySQL (via XAMPP)
- JWT untuk otentikasi
- bcryptjs untuk enkripsi password

---

# 🚀 Cara Menjalankan Backend

Ikuti langkah-langkah berikut untuk menjalankan backend secara lokal:

## 1. Install Node.js

- Unduh Node.js dari [https://nodejs.org/](https://nodejs.org/)
- Jalankan installer dan **ikuti seluruh instruksi**
- Setelah selesai, buka terminal dan ketik:

```bash
node -v
npm -v
```

Untuk memastikan instalasi berhasil.

## 2. Clone Repository Backend
Buka terminal dan jalankan:

```bash
git clone https://github.com/KevinSatrio/ankey_be.git
cd ankey_be
```

## 3. Install Dependencies
Jalankan:

```bash
npm install
```

## 4. Jalankan Apache dan MySQL di XAMPP
- Buka aplikasi XAMPP
- Klik Start pada modul Apache dan MySQL

## 5. Import database ke MySQL
1. **download** file database flutter_auth.sql di https://github.com/luthfiren/ankey/tree/main/database
2. **Buka** phpMyAdmin: http://localhost/phpmyadmin
3. **Create Database** baru dengan nama **`flutter_auth`** (harus sama persis)
4. **Import file SQL** yang ada di [`database/flutter_auth.sql`](database/flutter_auth.sql)
5. Klik database `flutter_auth` → Import → pilih file `flutter_auth.sql` → Go.

Pastikan struktur tabel sudah sesuai.

## 6. Jalankan Server Backend
Setelah semua siap, jalankan server dengan:

```bash
npm start
```

Jika berhasil, akan muncul di terminal:

```bash
db.js is being loaded
Connecting to MySQL...
Server running on port 5000
MySQL connected
```

## 7. ➡️ Lanjutkan ke Instruksi di Repo Frontend
Backend siap menerima request dari Flutter app. Silakan lanjutkan dengan mengikuti petunjuk di repo frontend:

🔗 https://github.com/luthfiren/ankey
