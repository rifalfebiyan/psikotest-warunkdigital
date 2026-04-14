# Implementation Plan: Web-Based DISC Personality Test Application

## 1. Project Overview
Tujuan dari proyek ini adalah membangun aplikasi berbasis web yang memungkinkan pengguna untuk mengisi kuesioner kepribadian DISC dan menghasilkan laporan dinamis yang mencakup visualisasi grafik dan rekomendasi karier. [cite_start]Laporan yang dihasilkan harus mereplikasi struktur dan metrik dari referensi PDF[cite: 2, 9].

## 2. Tech Stack Selection
Untuk memastikan pengembangan yang cepat, antarmuka yang modern, dan performa yang optimal, arsitektur aplikasi akan menggunakan teknologi berikut:

* **Frontend Framework:** Next.js dan React untuk perutean (routing) dan rendering yang cepat.
* **Styling & UI Components:** Tailwind CSS dikombinasikan dengan Shadcn UI untuk membangun antarmuka yang bersih, responsif, dan mudah dikustomisasi (seperti form input, tabel, dan kartu hasil).
* **Data Visualization:** Recharts atau Chart.js untuk merender grafik garis DISC yang membutuhkan plotting koordinat spesifik.
* **State Management:** Zustand atau React Context API untuk menyimpan status jawaban pengguna selama proses asesmen.
* **PDF Generator:** `@react-pdf/renderer` atau `html2canvas` + `jspdf` untuk mengekspor hasil akhir asesmen ke dalam format dokumen.

## 3. Core Features & Data Mapping

### A. Modul Input Data Peserta
Aplikasi harus memiliki form awal untuk menangkap identitas pengguna sebelum tes dimulai.
* [cite_start]**Field yang dibutuhkan:** Nama, Email, No HP, dan pencatatan Tanggal Tes secara otomatis[cite: 5, 6].

### B. Scoring Engine (Mesin Penilaian)
Sistem harus mampu mengkalkulasi jawaban dari kuesioner (biasanya berisi pilihan *Most* dan *Least*) untuk menghasilkan tiga metrik utama:
* [cite_start]Skor **Most** (Karakter yang ditunjukkan ke luar)[cite: 10].
* [cite_start]Skor **Least** (Karakter di bawah tekanan)[cite: 21].
* [cite_start]Skor **Change** (Karakter asli/tersembunyi)[cite: 27].

### C. Visualisasi Grafik (DISC Graphs)
Aplikasi akan menampilkan tiga grafik garis vertikal berdasarkan hasil kalkulasi.
* [cite_start]**Sumbu X:** Kategori D, I, S, dan C[cite: 11, 12, 13, 14].
* **Sumbu Y:** Skala numerik yang dinamis. [cite_start]Perlu diperhatikan bahwa skalanya bisa bernilai positif hingga negatif (misalnya rentang dari 21 hingga -22 tergantung jenis grafiknya)[cite: 15, 32, 48, 61]. Charting library harus dikonfigurasi untuk mendukung *negative axes*.

### D. Profil Kepribadian & Deskripsi
[cite_start]Berdasarkan titik tertinggi pada grafik, sistem akan memetakan pengguna ke profil tertentu (misalnya: S-C)[cite: 7]. 
Sistem harus menampilkan data dinamis yang mencakup:
* [cite_start]**Gaya Utama & Pendukung:** Menampilkan karakteristik umum, nilai dalam tim, kemungkinan kelemahan, dan ketakutan terbesar dari masing-masing gaya[cite: 64, 65, 68, 69].

### E. Rekomendasi Pekerjaan (Job Match)
Menyediakan daftar rekomendasi profesi yang sesuai dengan profil DISC pengguna.
* **Kategori Profesi:** Harus mencakup peran di bidang *Office*, *Engineering*, *Health Care*, dll. (misalnya: General Administrator, Planner, Computer Programmer, System Analyst) [cite_start][cite: 70, 71, 73, 75, 79, 81, 90, 93].

## 4. Development Phases

### Phase 1: Setup & Database Modeling
1.  Inisialisasi proyek Next.js dengan Tailwind CSS.
2.  Setup komponen dasar Shadcn UI (Button, Input, Form, Card, Table).
3.  Definisikan skema JSON atau model database untuk Master Data Kuesioner (soal dan bobot DISC) dan Profiling (pemetaan skor ke deskripsi dan rekomendasi pekerjaan).

### Phase 2: Assessment Interface
1.  [cite_start]Buat halaman *Landing Page* dan form Data Peserta[cite: 5].
2.  Kembangkan antarmuka kuesioner yang interaktif. Gunakan validasi untuk memastikan pengguna mengisi pilihan *Most* dan *Least* pada setiap soal tanpa duplikasi.
3.  Simpan *progress* jawaban ke *local storage* atau *global state* untuk mencegah kehilangan data jika pengguna melakukan *refresh*.

### Phase 3: Calculation & Result Dashboard
1.  Implementasikan algoritma perhitungan untuk mengakumulasi skor D, I, S, dan C.
2.  [cite_start]Integrasikan *charting library* untuk menggambar ketiga grafik (Graph Most, Least, Change)[cite: 10, 21, 27].
3.  [cite_start]Buat antarmuka halaman hasil (*Dashboard*) yang menampilkan profil singkat [cite: 7, 8][cite_start], rincian gaya utama/pendukung [cite: 64, 68][cite_start], dan daftar rekomendasi pekerjaan[cite: 70].

### Phase 4: PDF Export Generation
1.  Format tata letak halaman hasil agar ramah cetak (A4).
2.  [cite_start]Gunakan pustaka PDF untuk memungkinkan pengguna mengunduh laporan yang memiliki hierarki visual sama persis dengan referensi dokumen (2 halaman)[cite: 51, 97].

## 5. Testing & Validation
* **Scoring Accuracy:** Lakukan simulasi input jawaban secara manual dan bandingkan hasilnya dengan sistem *scoring* DISC standar untuk memastikan grafik digambar pada titik yang benar.
* **UI Responsiveness:** Pastikan grafik dan form input berfungsi dengan baik pada tampilan *mobile* maupun *desktop*.