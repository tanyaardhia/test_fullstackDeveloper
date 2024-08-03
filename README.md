# PrimeHeadline - Fullstack Developer

PrimeHeadline adalah aplikasi web responsif yang dibangun dengan teknologi terkini untuk mengelola berita, detail berita, dan profil pengguna.

_Tech Stack:_

- Backend: Node.js, PostgreSQL
- Frontend: React.Js, Vite

_Fitur Utama:_

1. **Halaman Login**
   - Pengguna dapat login ke akun mereka dengan email dan password.

2. **Halaman Register**
   - Pengguna dapat mendaftar dengan nama, nomor telepon, dan email.

3. **Halaman Utama**
   - Menampilkan daftar berita dengan infinite scroll untuk memuat lebih banyak berita saat pengguna menggulir ke bawah (infinite scroll).

4. **Halaman Detail Berita**
   - Menampilkan detail dari berita yang dipilih pengguna dari halaman utama.

5. **Halaman Profil**
   - Menampilkan detail pengguna yang terdaftar.

## Instruksi Persiapan

1. **Clone repository:**

   ```bash
   git clone <url_repository>
   cd <name_repository>
   ```

2. **Install dependencies untuk Backend**

   ```bash
   cd .\server\
   npm install
   ```

3. **Install dependencies untuk Frontend**

   ```bash
   cd .\client\
   npm install
   ```

## Menjalankan Aplikasi

1. **Jalankan server Backend**
    
    masih di tempat server yang sudah di cd/server, lalu bisa di running

    ```
    npx nodemon app
    ```

1. **Jalankan server Frontend**
    
    masih di tempat server yang sudah di cd/server, lalu bisa di running

    ```
    npm run dev
    ```

## API Endpoints

- POST /login - Untuk login pengguna.
- POST /register - Untuk registrasi pengguna baru.
- GET /news - Untuk mendapatkan daftar berita (infinite scroll).
- GET /news/:id - Untuk mendapatkan detail berita berdasarkan ID
- GET /profile/:id - Untuk mendapatkan detail profil pengguna.