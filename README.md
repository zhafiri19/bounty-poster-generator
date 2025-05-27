# 🏴‍☠️ Bounty Poster Generator – One Piece Themed Web App

**Bounty Poster Generator** adalah aplikasi web berbasis React.js dan Bootstrap 5 yang memungkinkan pengguna membuat poster bounty ala One Piece secara kustom.  
Aplikasi ini mendukung input foto, filter gambar, berbagai gaya poster (Wanted, Marine, Revolutionary), dan mode misterius!

🔗 [Live Demo](https://zhafiri19.github.io/bounty-poster-generator/)

---

## ✨ Fitur Utama

-   🖼️ Upload atau ambil foto langsung dari kamera
-   🎨 Filter foto: monokrom, sepia, dll
-   🎭 Mode Misterius (blur data belum lengkap)
-   🪙 Pilih gaya poster: Wanted / Marine / Revolutionary
-   💾 Download hasil sebagai gambar
-   🖼️ Galeri hasil poster yang pernah dibuat
-   📤 Share ke media sosial _(coming soon)_

---

## 🚀 Tech Stack

-   **React.js**
-   **Bootstrap 5**
-   **HTML5 + CSS3**
-   **JavaScript**
-   **html2canvas**

---

## 🛠️ Cara Instalasi (Run Secara Lokal)

Pastikan kamu sudah menginstall [Node.js](https://nodejs.org) dan npm.

### 1. Clone Repositori

```bash
git clone https://github.com/zhafiri19/bounty-poster-generator.git
cd bounty-poster-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Aplikasi

```bash
npm start
```

Buka browser dan akses:

```
http://localhost:3000
```

Aplikasi akan auto-reload saat kamu mengedit file sumber.

---

## ⚙️ Build untuk Produksi

Jika kamu ingin membuild versi produksi (untuk deploy ke GitHub Pages atau server lain):

```bash
npm run build
```

Hasil build akan muncul di folder:

```
/build
```

Untuk deploy ke GitHub Pages, pastikan `homepage` di `package.json` sudah diisi:

```json
"homepage": "https://username.github.io/nama-repo"
```

---

## 📁 Struktur Folder

```
bounty-poster-generator/
├── public/               # Aset publik
├── src/
│   ├── components/       # Komponen React
│   ├── styles/           # CSS khusus
│   ├── App.js            # Root component
│   └── index.js          # Entry point
├── .gitignore
├── package.json
├── README.md
└── yarn.lock / package-lock.json
```

---

## 📄 License

MIT License – bebas digunakan dan dimodifikasi untuk keperluan personal maupun pembelajaran.

---

> Made with ❤️ + ☕ + ☠️ Spirit of the Grand Line!
