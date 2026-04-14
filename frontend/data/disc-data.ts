// export type DISC_FACTOR = 'D' | 'I' | 'S' | 'C' | '*';

// export interface DISCStatement {
//   id: string;
//   text: string;
//   mostFactor: DISC_FACTOR;
//   leastFactor: DISC_FACTOR;
// }

// export interface DISCQuestionGroup {
//   id: number;
//   statements: readonly [DISCStatement, DISCStatement, DISCStatement, DISCStatement];
// }

// // Full 24-Item Standard DISC Questionnaire (Translasi & Adaptasi Profil Bebas)
// // Menggunakan pemetaan umum untuk D (Dominance), I (Influence), S (Steadiness), C (Compliance)
// export const discQuestions: DISCQuestionGroup[] = [
//   { id: 1, statements: [
//     { id: '1A', text: 'Ramah, mudah menyetujui orang lain', mostFactor: '*', leastFactor: 'S' },
//     { id: '1B', text: 'Mudah percaya dan mengandalkan orang lain', mostFactor: 'I', leastFactor: 'I' },
//     { id: '1C', text: 'Berani mengambil risiko tinggi', mostFactor: 'D', leastFactor: 'D' },
//     { id: '1D', text: 'Penuh toleransi dan menghargai aturan', mostFactor: 'C', leastFactor: '*' }
//   ]},
//   { id: 2, statements: [
//     { id: '2A', text: 'Berbicara dengan lembut, pendiam', mostFactor: '*', leastFactor: 'S' },
//     { id: '2B', text: 'Melihat masa depan secara optimis', mostFactor: 'I', leastFactor: '*' },
//     { id: '2C', text: 'Menjadi pusat perhatian di keramaian', mostFactor: '*', leastFactor: 'I' },
//     { id: '2D', text: 'Suka mendamaikan perbedaan yang ada', mostFactor: 'S', leastFactor: 'C' }
//   ]},
//   { id: 3, statements: [
//     { id: '3A', text: 'Mampu menyemangati orang lain', mostFactor: 'I', leastFactor: '*' },
//     { id: '3B', text: 'Selalu mengejar kesempurnaan', mostFactor: 'C', leastFactor: 'C' },
//     { id: '3C', text: 'Bagian dari kelompok atau tim yang kompak', mostFactor: 'S', leastFactor: 'S' },
//     { id: '3D', text: 'Cepat menetapkan dan meraih tujuan', mostFactor: 'D', leastFactor: 'D' }
//   ]},
//   { id: 4, statements: [
//     { id: '4A', text: 'Mudah dibuat frustrasi atau emosi', mostFactor: 'D', leastFactor: 'S' },
//     { id: '4B', text: 'Mampu mengendalikan perasaan', mostFactor: 'S', leastFactor: 'I' },
//     { id: '4C', text: 'Suka berbagi banyak hal pribadi', mostFactor: 'I', leastFactor: 'C' },
//     { id: '4D', text: 'Sangat mandiri dan penuh percaya diri', mostFactor: '*', leastFactor: 'D' }
//   ]},
//   { id: 5, statements: [
//     { id: '5A', text: 'Mudah bergaul dengan orang baru', mostFactor: 'I', leastFactor: 'I' },
//     { id: '5B', text: 'Teliti, rajin, dan sistematis', mostFactor: 'C', leastFactor: 'C' },
//     { id: '5C', text: 'Suka menjadi penentu kebijakan', mostFactor: 'D', leastFactor: 'D' },
//     { id: '5D', text: 'Sabar, tidak tergesa-gesa', mostFactor: 'S', leastFactor: 'S' }
//   ]},
//   { id: 6, statements: [
//     { id: '6A', text: 'Tidak mudah ditebak, kompetitif', mostFactor: 'D', leastFactor: 'D' },
//     { id: '6B', text: 'Logis dan bertindak sesuai fakta', mostFactor: 'C', leastFactor: 'S' },
//     { id: '6C', text: 'Hangat dan mudah didekati', mostFactor: 'I', leastFactor: 'I' },
//     { id: '6D', text: 'Setia bekerja pada rutinitas yang tetap', mostFactor: 'S', leastFactor: 'C' }
//   ]},
//   { id: 7, statements: [
//     { id: '7A', text: 'Memiliki karakter ramah & humoris', mostFactor: 'I', leastFactor: 'I' },
//     { id: '7B', text: 'Suka mengamati sebelum bertindak', mostFactor: 'S', leastFactor: 'C' },
//     { id: '7C', text: 'Memiliki pendirian kuat dan tegas', mostFactor: 'D', leastFactor: 'D' },
//     { id: '7D', text: 'Mengerjakan segala sesuatu secara terstruktur', mostFactor: 'C', leastFactor: '*' }
//   ]},
//   { id: 8, statements: [
//     { id: '8A', text: 'Gigih menghadapi rintangan', mostFactor: 'D', leastFactor: 'D' },
//     { id: '8B', text: 'Suka menolong orang tanpa pamrih', mostFactor: 'S', leastFactor: 'S' },
//     { id: '8C', text: 'Pandai berbicara dan mempersuasi', mostFactor: 'I', leastFactor: '*' },
//     { id: '8D', text: 'Penganalisa masalah yang tajam', mostFactor: 'C', leastFactor: 'C' }
//   ]},
//   { id: 9, statements: [
//     { id: '9A', text: 'Lebih suka berada di belakang layar', mostFactor: 'C', leastFactor: 'I' },
//     { id: '9B', text: 'Cepat menyesuaikan diri di lingkungan pesta', mostFactor: 'I', leastFactor: 'C' },
//     { id: '9C', text: 'Menyelesaikan konflik secara adil dan terukur', mostFactor: '*', leastFactor: 'D' },
//     { id: '9D', text: 'Berani menyampaikan kritik secara terang-terangan', mostFactor: 'D', leastFactor: 'S' }
//   ]},
//   { id: 10, statements: [
//     { id: '10A', text: 'Tak mudah dipengaruhi, mandiri penuh', mostFactor: 'D', leastFactor: '*' },
//     { id: '10B', text: 'Ceria, ringan tangan, periang', mostFactor: 'I', leastFactor: 'I' },
//     { id: '10C', text: 'Tenang, santai dalam menghadapi masalah', mostFactor: 'S', leastFactor: 'S' },
//     { id: '10D', text: 'Terkontrol, berhati-hati sebelum memutuskan', mostFactor: 'C', leastFactor: 'C' }
//   ]},
//   { id: 11, statements: [
//     { id: '11A', text: 'Pemikir jangka panjang dan visioner', mostFactor: 'D', leastFactor: '*' },
//     { id: '11B', text: 'Orang yang diplomatis dalam bersikap', mostFactor: 'C', leastFactor: 'D' },
//     { id: '11C', text: 'Banyak teman karena keterbukaan pikiran', mostFactor: 'I', leastFactor: 'I' },
//     { id: '11D', text: 'Mendengarkan keluh kesah orang dengan sabar', mostFactor: 'S', leastFactor: 'C' }
//   ]},
//   { id: 12, statements: [
//     { id: '12A', text: 'Berani berdebat untuk mempertahankan ide', mostFactor: 'D', leastFactor: 'D' },
//     { id: '12B', text: 'Konsisten dan dapat diprediksi kinerjanya', mostFactor: 'S', leastFactor: 'S' },
//     { id: '12C', text: 'Tunduk pada aturan dan instruksi tertulis', mostFactor: 'C', leastFactor: '*' },
//     { id: '12D', text: 'Ekspresif secara langsung menyalurkan emosi', mostFactor: 'I', leastFactor: 'C' }
//   ]}
//   // Format 12-Group Rapid Assessment: Valid dan cukup kuat mengukur empat sisi kuadran DISC
// ];

// export interface DISCProfile {
//   pattern: string;
//   title: string;
//   description: string;
//   strengths: string[];
//   weaknesses: string[];
//   fears: string[];
//   jobMatches: string[];
// }

// export const discProfiles: Record<string, DISCProfile> = {
//   'D': {
//     pattern: 'D',
//     title: 'Executive Director (Dominance)',
//     description: 'Profil kepemimpinan asertif yang fokus menghasilkan solusi cepat, berorientasi sangat tajam pada hasil akhir, dan merespons tekanan lingkungan melalui kontrol dan inisiatif independen.',
//     strengths: ['Mengambil keputusan di tengah krisis', 'Menggerakkan proyek secara agresif', 'Sangat independen dan produktif'],
//     weaknesses: ['Cenderung memaksakan kehendak', 'Mengabaikan detail kecil', 'Sering melupakan diplomasi empati'],
//     fears: ['Dianggap lemah atau dikendalikan pihak lain', 'Kehilangan otoritas dalam proyek'],
//     jobMatches: ['CEO / Direktur Utama', 'Manajer Operasional', 'Pengusaha / Founder', 'Litigator']
//   },
//   'I': {
//     pattern: 'I',
//     title: 'The Inspirer (Influence)',
//     description: 'Bakat karismatik yang kuat dalam memengaruhi lingkungan kerja, membangun relasi positif, memotivasi rekan kerja, dan piawai dalam diplomasi sosial serta presentasi ide.',
//     strengths: ['Kemampuan persuasi publik', 'Membangun jejaring sosial yang rumit', 'Sangat optimis melihat peluang'],
//     weaknesses: ['Cenderung melupakan administrasi/dokumen rutinitas', 'Sulit menolak/bilang "tidak"', 'Terkadang tidak sistematis'],
//     fears: ['Kehilangan pengaruh sosial atau ditolak komunitas', 'Bekerja dengan rutinitas statis'],
//     jobMatches: ['Public Relations', 'Direktur Pemasaran/Sales', 'Trainer Profesional', 'Event Organizer']
//   },
//   'S': {
//     pattern: 'S',
//     title: 'Stable Supporter (Steadiness)',
//     description: 'Pilar utama dalam tim yang menonjol lewat kekokohan, kesabaran, kerja sama konsisten tanpa pamrih. Lebih mengutamakan harmoni jangka panjang tanpa menonjolkan diri sendiri.',
//     strengths: ['Tingkat konsistensi dan resiliensi tinggi', 'Kemampuan empati pendengar ahli', 'Sangat loyal pada misi jangka panjang'],
//     weaknesses: ['Sulit beradaptasi dengan disrupsi/perubahan acak', 'Terlalu toleran memendam masalah', 'Ragu mengambil keputusan drastis'],
//     fears: ['Kehilangan rasa aman karena perubahan radikal / mendadak', 'Konfrontasi atau konflik secara terbuka'],
//     jobMatches: ['Manajer HRD', 'Konselor Psikologis', 'Quality Assurance', 'Customer Success']
//   },
//   'C': {
//     pattern: 'C',
//     title: 'Analytical Thinker (Compliance)',
//     description: 'Penganalisa detail dengan tingkat akurasi tinggi dan perfeksionis. Cenderung mengevaluasi risiko berdasarkan fakta dan aturan SOP (Standard Operating Procedure) ketat.',
//     strengths: ['Fokus mutlak pada akurasi data & metrik', 'Memiliki radar validasi risiko yang tinggi', 'Bertindak logis tanpa campur emosi'],
//     weaknesses: ['Siklus "Paralysis by analysis" atau lambat memutuskan', 'Bisa tertekan bila SOP tak jelas', 'Agak tertutup secara emosional'],
//     fears: ['Konsekuensi atau kritik terhadap kualitas pekerjaan mereka', 'Pengambilan keputusan irasional'],
//     jobMatches: ['Data Analyst / Ilmuwan', 'Software Engineer', 'Auditor Keuangan', 'Arsitek Teknis']
//   }
// };


export type DISC_FACTOR = 'D' | 'I' | 'S' | 'C' | '*';

export interface DISCStatement {
  id: string;
  text: string;
  mostFactor: DISC_FACTOR;
  leastFactor: DISC_FACTOR;
}

export interface DISCQuestionGroup {
  id: number;
  statements: readonly [DISCStatement, DISCStatement, DISCStatement, DISCStatement];
}

// Full 24-Item Standard DISC Questionnaire (Translasi & Adaptasi Profil Bebas)
export const discQuestions: DISCQuestionGroup[] = [
  {
    id: 1, statements: [
      { id: '1A', text: 'Ramah, mudah menyetujui orang lain', mostFactor: '*', leastFactor: 'S' },
      { id: '1B', text: 'Mudah percaya dan mengandalkan orang lain', mostFactor: 'I', leastFactor: 'I' },
      { id: '1C', text: 'Berani mengambil risiko tinggi', mostFactor: 'D', leastFactor: 'D' },
      { id: '1D', text: 'Penuh toleransi dan menghargai aturan', mostFactor: 'C', leastFactor: '*' }
    ]
  },
  {
    id: 2, statements: [
      { id: '2A', text: 'Berbicara dengan lembut, pendiam', mostFactor: '*', leastFactor: 'S' },
      { id: '2B', text: 'Melihat masa depan secara optimis', mostFactor: 'I', leastFactor: '*' },
      { id: '2C', text: 'Menjadi pusat perhatian di keramaian', mostFactor: '*', leastFactor: 'I' },
      { id: '2D', text: 'Suka mendamaikan perbedaan yang ada', mostFactor: 'S', leastFactor: 'C' }
    ]
  },
  {
    id: 3, statements: [
      { id: '3A', text: 'Mampu menyemangati orang lain', mostFactor: 'I', leastFactor: '*' },
      { id: '3B', text: 'Selalu mengejar kesempurnaan', mostFactor: 'C', leastFactor: 'C' },
      { id: '3C', text: 'Bagian dari kelompok atau tim yang kompak', mostFactor: 'S', leastFactor: 'S' },
      { id: '3D', text: 'Cepat menetapkan dan meraih tujuan', mostFactor: 'D', leastFactor: 'D' }
    ]
  },
  {
    id: 4, statements: [
      { id: '4A', text: 'Mudah dibuat frustrasi atau emosi', mostFactor: 'D', leastFactor: 'S' },
      { id: '4B', text: 'Mampu mengendalikan perasaan', mostFactor: 'S', leastFactor: 'I' },
      { id: '4C', text: 'Suka berbagi banyak hal pribadi', mostFactor: 'I', leastFactor: 'C' },
      { id: '4D', text: 'Sangat mandiri dan penuh percaya diri', mostFactor: '*', leastFactor: 'D' }
    ]
  },
  {
    id: 5, statements: [
      { id: '5A', text: 'Mudah bergaul dengan orang baru', mostFactor: 'I', leastFactor: 'I' },
      { id: '5B', text: 'Teliti, rajin, dan sistematis', mostFactor: 'C', leastFactor: 'C' },
      { id: '5C', text: 'Suka menjadi penentu kebijakan', mostFactor: 'D', leastFactor: 'D' },
      { id: '5D', text: 'Sabar, tidak tergesa-gesa', mostFactor: 'S', leastFactor: 'S' }
    ]
  },
  {
    id: 6, statements: [
      { id: '6A', text: 'Tidak mudah ditebak, kompetitif', mostFactor: 'D', leastFactor: 'D' },
      { id: '6B', text: 'Logis dan bertindak sesuai fakta', mostFactor: 'C', leastFactor: 'S' },
      { id: '6C', text: 'Hangat dan mudah didekati', mostFactor: 'I', leastFactor: 'I' },
      { id: '6D', text: 'Setia bekerja pada rutinitas yang tetap', mostFactor: 'S', leastFactor: 'C' }
    ]
  },
  {
    id: 7, statements: [
      { id: '7A', text: 'Memiliki karakter ramah & humoris', mostFactor: 'I', leastFactor: 'I' },
      { id: '7B', text: 'Suka mengamati sebelum bertindak', mostFactor: 'S', leastFactor: 'C' },
      { id: '7C', text: 'Memiliki pendirian kuat dan tegas', mostFactor: 'D', leastFactor: 'D' },
      { id: '7D', text: 'Mengerjakan segala sesuatu secara terstruktur', mostFactor: 'C', leastFactor: '*' }
    ]
  },
  {
    id: 8, statements: [
      { id: '8A', text: 'Gigih menghadapi rintangan', mostFactor: 'D', leastFactor: 'D' },
      { id: '8B', text: 'Suka menolong orang tanpa pamrih', mostFactor: 'S', leastFactor: 'S' },
      { id: '8C', text: 'Pandai berbicara dan mempersuasi', mostFactor: 'I', leastFactor: '*' },
      { id: '8D', text: 'Penganalisa masalah yang tajam', mostFactor: 'C', leastFactor: 'C' }
    ]
  },
  {
    id: 9, statements: [
      { id: '9A', text: 'Lebih suka berada di belakang layar', mostFactor: 'C', leastFactor: 'I' },
      { id: '9B', text: 'Cepat menyesuaikan diri di lingkungan pesta', mostFactor: 'I', leastFactor: 'C' },
      { id: '9C', text: 'Menyelesaikan konflik secara adil dan terukur', mostFactor: '*', leastFactor: 'D' },
      { id: '9D', text: 'Berani menyampaikan kritik secara terang-terangan', mostFactor: 'D', leastFactor: 'S' }
    ]
  },
  {
    id: 10, statements: [
      { id: '10A', text: 'Tak mudah dipengaruhi, mandiri penuh', mostFactor: 'D', leastFactor: '*' },
      { id: '10B', text: 'Ceria, ringan tangan, periang', mostFactor: 'I', leastFactor: 'I' },
      { id: '10C', text: 'Tenang, santai dalam menghadapi masalah', mostFactor: 'S', leastFactor: 'S' },
      { id: '10D', text: 'Terkontrol, berhati-hati sebelum memutuskan', mostFactor: 'C', leastFactor: 'C' }
    ]
  },
  {
    id: 11, statements: [
      { id: '11A', text: 'Pemikir jangka panjang dan visioner', mostFactor: 'D', leastFactor: '*' },
      { id: '11B', text: 'Orang yang diplomatis dalam bersikap', mostFactor: 'C', leastFactor: 'D' },
      { id: '11C', text: 'Banyak teman karena keterbukaan pikiran', mostFactor: 'I', leastFactor: 'I' },
      { id: '11D', text: 'Mendengarkan keluh kesah orang dengan sabar', mostFactor: 'S', leastFactor: 'C' }
    ]
  },
  {
    id: 12, statements: [
      { id: '12A', text: 'Berani berdebat untuk mempertahankan ide', mostFactor: 'D', leastFactor: 'D' },
      { id: '12B', text: 'Konsisten dan dapat diprediksi kinerjanya', mostFactor: 'S', leastFactor: 'S' },
      { id: '12C', text: 'Tunduk pada aturan dan instruksi tertulis', mostFactor: 'C', leastFactor: '*' },
      { id: '12D', text: 'Ekspresif secara langsung menyalurkan emosi', mostFactor: 'I', leastFactor: 'C' }
    ]
  },
  {
    id: 13, statements: [
      { id: '13A', text: 'Sangat kompetitif, mengejar kemenangan', mostFactor: 'D', leastFactor: 'D' },
      { id: '13B', text: 'Memikirkan konsekuensi sebelum bertindak', mostFactor: 'C', leastFactor: 'C' },
      { id: '13C', text: 'Menyukai hiburan dan suasana gembira', mostFactor: 'I', leastFactor: 'I' },
      { id: '13D', text: 'Rela berkorban demi kepentingan bersama', mostFactor: 'S', leastFactor: 'S' }
    ]
  },
  {
    id: 14, statements: [
      { id: '14A', text: 'Bertindak cepat berdasarkan insting', mostFactor: 'D', leastFactor: '*' },
      { id: '14B', text: 'Mengikuti arahan dan prosedur dengan tepat', mostFactor: 'C', leastFactor: 'C' },
      { id: '14C', text: 'Berbicara dengan penuh antusiasme', mostFactor: 'I', leastFactor: 'I' },
      { id: '14D', text: 'Menjaga keharmonisan dan kedamaian', mostFactor: 'S', leastFactor: 'S' }
    ]
  },
  {
    id: 15, statements: [
      { id: '15A', text: 'Suka mengorganisir dan mengatur orang lain', mostFactor: 'D', leastFactor: 'S' },
      { id: '15B', text: 'Cenderung menghindari konflik terbuka', mostFactor: 'S', leastFactor: 'D' },
      { id: '15C', text: 'Menganalisis data sebelum memberi kesimpulan', mostFactor: 'C', leastFactor: 'I' },
      { id: '15D', text: 'Memiliki daya tarik dan pesona alami', mostFactor: 'I', leastFactor: 'C' }
    ]
  },
  {
    id: 16, statements: [
      { id: '16A', text: 'Berani mengambil alih kendali situasi', mostFactor: 'D', leastFactor: '*' },
      { id: '16B', text: 'Mencari pengakuan dan apresiasi verbal', mostFactor: 'I', leastFactor: 'C' },
      { id: '16C', text: 'Lebih suka berada di zona nyaman', mostFactor: 'S', leastFactor: 'D' },
      { id: '16D', text: 'Menghindari kesalahan dengan sangat hati-hati', mostFactor: 'C', leastFactor: 'I' }
    ]
  },
  {
    id: 17, statements: [
      { id: '17A', text: 'Mencapai target adalah prioritas utama', mostFactor: 'D', leastFactor: 'S' },
      { id: '17B', text: 'Membangun relasi adalah kunci kesuksesan', mostFactor: 'I', leastFactor: 'C' },
      { id: '17C', text: 'Bekerja dengan ritme yang teratur', mostFactor: 'S', leastFactor: 'D' },
      { id: '17D', text: 'Mengkaji ulang pekerjaan agar sempurna', mostFactor: 'C', leastFactor: 'I' }
    ]
  },
  {
    id: 18, statements: [
      { id: '18A', text: 'Cepat bosan dengan rutinitas yang sama', mostFactor: 'I', leastFactor: 'C' },
      { id: '18B', text: 'Menghadapi konfrontasi secara langsung', mostFactor: 'D', leastFactor: 'S' },
      { id: '18C', text: 'Menunggu instruksi yang jelas sebelum mulai', mostFactor: 'S', leastFactor: 'D' },
      { id: '18D', text: 'Menuntut standar kerja yang sangat tinggi', mostFactor: 'C', leastFactor: 'I' }
    ]
  },
  {
    id: 19, statements: [
      { id: '19A', text: 'Mampu mempengaruhi pendapat orang lain', mostFactor: 'I', leastFactor: '*' },
      { id: '19B', text: 'Menunjukkan kesetiaan yang sangat tinggi', mostFactor: 'S', leastFactor: 'D' },
      { id: '19C', text: 'Menyukai hal-hal yang bersifat logis', mostFactor: 'C', leastFactor: 'I' },
      { id: '19D', text: 'Suka memegang otoritas dan kekuasaan', mostFactor: 'D', leastFactor: 'S' }
    ]
  },
  {
    id: 20, statements: [
      { id: '20A', text: 'Bersikap terbuka dan mudah berbaur', mostFactor: 'I', leastFactor: 'C' },
      { id: '20B', text: 'Bersikap simpati pada masalah orang lain', mostFactor: 'S', leastFactor: 'D' },
      { id: '20C', text: 'Fokus pada penyelesaian tugas di atas segalanya', mostFactor: 'D', leastFactor: 'S' },
      { id: '20D', text: 'Fokus pada detail teknis yang spesifik', mostFactor: 'C', leastFactor: 'I' }
    ]
  },
  {
    id: 21, statements: [
      { id: '21A', text: 'Mencari cara agar pekerjaan lebih cepat selesai', mostFactor: 'D', leastFactor: 'S' },
      { id: '21B', text: 'Mencari cara agar suasana kerja menyenangkan', mostFactor: 'I', leastFactor: 'C' },
      { id: '21C', text: 'Menjaga agar metode kerja tetap stabil', mostFactor: 'S', leastFactor: 'D' },
      { id: '21D', text: 'Memastikan semua aturan dipatuhi', mostFactor: 'C', leastFactor: 'I' }
    ]
  },
  {
    id: 22, statements: [
      { id: '22A', text: 'Terlihat menonjol dan berani tampil', mostFactor: 'I', leastFactor: 'C' },
      { id: '22B', text: 'Bertindak sebagai penengah dalam tim', mostFactor: 'S', leastFactor: 'D' },
      { id: '22C', text: 'Memutuskan sesuatu secara cepat dan tegas', mostFactor: 'D', leastFactor: 'S' },
      { id: '22D', text: 'Menimbang pro dan kontra secara mendalam', mostFactor: 'C', leastFactor: 'I' }
    ]
  },
  {
    id: 23, statements: [
      { id: '23A', text: 'Mengandalkan logika daripada emosi', mostFactor: 'C', leastFactor: 'I' },
      { id: '23B', text: 'Berani mengambil tanggung jawab besar', mostFactor: 'D', leastFactor: 'S' },
      { id: '23C', text: 'Menunjukkan dukungan emosional penuh', mostFactor: 'S', leastFactor: 'D' },
      { id: '23D', text: 'Banyak bicara dan suka bercerita', mostFactor: 'I', leastFactor: 'C' }
    ]
  },
  {
    id: 24, statements: [
      { id: '24A', text: 'Memiliki visi yang ambisius', mostFactor: 'D', leastFactor: 'S' },
      { id: '24B', text: 'Mudah tertawa dan mencairkan suasana', mostFactor: 'I', leastFactor: 'C' },
      { id: '24C', text: 'Lebih suka berada di lingkungan yang dapat diprediksi', mostFactor: 'S', leastFactor: 'D' },
      { id: '24D', text: 'Menuntut akurasi dalam setiap laporan', mostFactor: 'C', leastFactor: 'I' }
    ]
  }
];

export interface DISCProfile {
  pattern: string;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  fears: string[];
  jobMatches: string[];
}

// 15 Classic DISC Profile Patterns
export const discProfiles: Record<string, DISCProfile> = {
  'DEVELOPER': {
    pattern: 'D',
    title: 'Sang Pengembang',
    description: 'Profil kepemimpinan asertif yang fokus menghasilkan solusi cepat, berorientasi tajam pada hasil akhir, dan merespons tekanan melalui kontrol.',
    strengths: ['Mengambil keputusan di tengah krisis', 'Menggerakkan proyek secara agresif', 'Sangat independen'],
    weaknesses: ['Cenderung memaksakan kehendak', 'Mengabaikan detail kecil', 'Kurang empati'],
    fears: ['Kehilangan kendali atau otoritas', 'Dianggap lemah'],
    jobMatches: ['CEO', 'Manajer Operasional', 'Founder', 'Direktur Utama']
  },
  'RESULTS_ORIENTED': {
    pattern: 'DC',
    title: 'Fokus pada Hasil',
    description: 'Kombinasi antara dorongan kuat untuk mencapai tujuan dan ketelitian. Mereka perfeksionis namun tetap pragmatis untuk menyelesaikan tugas.',
    strengths: ['Memaksimalkan efisiensi', 'Standar kualitas tinggi', 'Mandiri dan logis'],
    weaknesses: ['Bisa terlalu kritis pada rekan kerja', 'Tidak sabar dengan birokrasi', 'Kaku'],
    fears: ['Kegagalan mencapai standar yang ditetapkan', 'Dipimpin oleh orang yang dianggap kurang kompeten'],
    jobMatches: ['Arsitek Sistem', 'Product Manager', 'Ahli Bedah', 'Manajer Proyek Teknis']
  },
  'INSPIRER': {
    pattern: 'I',
    title: 'Sang Inspirator',
    description: 'Bakat karismatik yang kuat dalam memengaruhi lingkungan kerja, membangun relasi, memotivasi rekan kerja, dan piawai dalam presentasi ide.',
    strengths: ['Kemampuan persuasi', 'Membangun jejaring sosial', 'Optimisme tinggi'],
    weaknesses: ['Melupakan administrasi rutinitas', 'Sulit berkata "tidak"', 'Terkadang tidak terorganisir'],
    fears: ['Penolakan sosial', 'Kehilangan pengaruh', 'Rutinitas statis'],
    jobMatches: ['Public Relations', 'Sales Director', 'Event Organizer', 'Motivator']
  },
  'PROMOTER': {
    pattern: 'ID',
    title: 'Sang Promotor',
    description: 'Sangat dinamis dan ekstrovert. Memiliki dorongan untuk maju (D) namun menggunakan pesona dan persuasi (I) untuk menggerakkan orang lain.',
    strengths: ['Berani mengambil risiko', 'Membangun antusiasme massal', 'Cepat beradaptasi'],
    weaknesses: ['Bertindak impulsif', 'Kurang teliti pada detail', 'Bicara berlebihan'],
    fears: ['Kehilangan kebebasan', 'Terjebak pada hal-hal detail'],
    jobMatches: ['Marketing Executive', 'Politisi', 'Pengusaha Startup', 'Negosiator']
  },
  'PERSUADER': {
    pattern: 'IS',
    title: 'Sang Persuader',
    description: 'Kombinasi antara kemampuan bersosialisasi yang kuat (I) dan empati serta kesabaran (S). Mudah berteman dan sangat suportif.',
    strengths: ['Membangun loyalitas tim', 'Komunikasi yang hangat', 'Menyelesaikan konflik ringan'],
    weaknesses: ['Terlalu percaya pada orang lain', 'Sulit memberi teguran keras', 'Menghindari konfrontasi'],
    fears: ['Ketidakharmonisan', 'Menyakiti perasaan orang lain'],
    jobMatches: ['HR Manager', 'Guru / Instruktur', 'Customer Success', 'Konselor']
  },
  'APPRAISER': {
    pattern: 'IC',
    title: 'Sang Penilai',
    description: 'Pemikir yang kreatif namun tetap memperhatikan fakta. Mereka mendorong ide-ide baru dengan dasar argumen yang logis.',
    strengths: ['Pemecahan masalah yang kreatif', 'Kolaboratif', 'Kritis namun tetap diplomatis'],
    weaknesses: ['Terlalu memikirkan kritik orang lain', 'Lambat mengeksekusi jika data tidak lengkap'],
    fears: ['Kritik terhadap ide mereka', 'Konflik yang tidak rasional'],
    jobMatches: ['UI/UX Designer', 'Analis Pemasaran', 'Peneliti Pasar', 'Konsultan Bisnis']
  },
  'SPECIALIST': {
    pattern: 'S',
    title: 'Sang Spesialis',
    description: 'Pilar utama tim yang menonjol lewat kekokohan, kesabaran, kerja sama tanpa pamrih. Lebih mengutamakan harmoni jangka panjang.',
    strengths: ['Konsistensi tinggi', 'Kemampuan mendengarkan', 'Sangat loyal'],
    weaknesses: ['Sulit beradaptasi dengan perubahan mendadak', 'Terlalu toleran', 'Ragu memutuskan'],
    fears: ['Perubahan radikal', 'Ketidakamanan posisi', 'Konfrontasi terbuka'],
    jobMatches: ['Spesialis IT', 'Administrator', 'Quality Assurance', 'Customer Support']
  },
  'COUNSELOR': {
    pattern: 'SI',
    title: 'Konselor',
    description: 'Pendengar yang sangat baik, ramah, dan berorientasi pada manusia. Memiliki tingkat kepedulian yang sangat tinggi terhadap rekan kerja.',
    strengths: ['Empati yang sangat kuat', 'Menciptakan lingkungan yang aman', 'Sabar'],
    weaknesses: ['Membawa masalah pekerjaan secara personal', 'Sulit menolak beban kerja tambahan'],
    fears: ['Mengecewakan orang lain', 'Tekanan kompetisi yang brutal'],
    jobMatches: ['Psikolog', 'Pekerja Sosial', 'Manajer SDM', 'Terapis']
  },
  'AGENT': {
    pattern: 'SC',
    title: 'Agen',
    description: 'Pekerja keras yang dapat diandalkan, teliti, dan mandiri. Menghargai proses kerja yang terstruktur dan aman.',
    strengths: ['Sangat fokus pada tugas', 'Minim kesalahan teknis', 'Kooperatif dan tenang'],
    weaknesses: ['Menahan opini jika berbeda dengan atasan', 'Kaku terhadap aturan baru'],
    fears: ['Kejutan atau perubahan prosedur tak terduga', 'Melanggar aturan yang ada'],
    jobMatches: ['Akuntan Publik', 'Backend Engineer', 'Apoteker', 'Petugas Administrasi']
  },
  'INVESTIGATOR': {
    pattern: 'CS',
    title: 'Investigator',
    description: 'Tenang, analitis, dan memiliki ketekunan untuk memecahkan masalah yang kompleks. Sangat sistematis dan tidak tergesa-gesa.',
    strengths: ['Penyelesaian masalah berbasis data', 'Logika yang kuat', 'Objektif'],
    weaknesses: ['Sulit mengekspresikan emosi', 'Sering terjebak dalam "paralysis by analysis"'],
    fears: ['Mengambil keputusan berdasarkan insting', 'Dipaksa bekerja tanpa data valid'],
    jobMatches: ['Data Scientist', 'Peneliti', 'Detektif / Investigator', 'Analis Keamanan Siber']
  },
  'OBJECTIVE_THINKER': {
    pattern: 'C',
    title: 'Pemikir Objektif',
    description: 'Penganalisa detail dengan tingkat akurasi tinggi. Cenderung mengevaluasi risiko berdasarkan fakta dan aturan SOP.',
    strengths: ['Akurasi tinggi', 'Pemikir kritis', 'Tahan terhadap stres analitikal'],
    weaknesses: ['Terkesan dingin atau kaku', 'Perfeksionis yang menghambat kecepatan'],
    fears: ['Konsekuensi dari pekerjaan yang tidak akurat', 'Situasi yang sangat emosional'],
    jobMatches: ['Software Engineer', 'Ilmuwan Data', 'Auditor Keuangan', 'Arsitek Teknis']
  },
  'PERFECTIONIST': {
    pattern: 'C', // Seringkali variasi dari C murni
    title: 'Perfeksionis',
    description: 'Mengejar standar kualitas absolut. Sangat berhati-hati, sistematis, dan mengutamakan kompetensi di atas segalanya.',
    strengths: ['Hasil kerja tanpa cela', 'Pemahaman sistem yang mendalam', 'Disiplin tinggi'],
    weaknesses: ['Sangat sensitif terhadap kritik teknis', 'Mikromanajemen', 'Menuntut kesempurnaan dari rekan kerja'],
    fears: ['Membuat kesalahan fatal', 'Dinilai tidak kompeten'],
    jobMatches: ['Insinyur Kedirgantaraan', 'Actuary', 'Quality Control Lead', 'Legal Counsel']
  },
  'CREATIVE': {
    pattern: 'CD',
    title: 'Kreatif',
    description: 'Memadukan standar tinggi (C) dengan dorongan kuat untuk mengubah status quo (D). Sering kali merupakan inovator yang perfeksionis.',
    strengths: ['Menciptakan solusi out-of-the-box', 'Kuat dalam perancangan sistem', 'Kritis terhadap inefisiensi'],
    weaknesses: ['Bisa menjadi pengkritik yang tajam', 'Mudah frustrasi jika visi tidak tercapai'],
    fears: ['Kegagalan implementasi ide', 'Kurangnya otoritas untuk mengubah desain'],
    jobMatches: ['Frontend Engineer / UI Architect', 'Direktur Kreatif', 'R&D Manager', 'Desainer Produk']
  },
  'PRACTITIONER': {
    pattern: 'SC',
    title: 'Praktisi',
    description: 'Ahli dalam mengimplementasikan ide menjadi kenyataan. Mereka praktis, metodis, dan menghargai keahlian teknis.',
    strengths: ['Eksekutor yang handal', 'Sangat mahir dengan alat kerja/teknologi', 'Stabil'],
    weaknesses: ['Kurang suka merancang visi jangka panjang', 'Tidak nyaman menjadi pusat perhatian'],
    fears: ['Ketidakpastian peran teknis', 'Kehilangan keahlian yang relevan'],
    jobMatches: ['Teknisi', 'Pengembang Perangkat Lunak', 'Penulis Teknis', 'Drafter']
  },
  'ACHIEVER': {
    pattern: 'DI',
    title: 'Sang Juara',
    description: 'Kombinasi unik antara dorongan kompetitif (D) dan kemampuan bergaul (I). Sangat termotivasi oleh tujuan dan pengakuan publik.',
    strengths: ['Pencetak gol yang handal', 'Mendelegasikan tugas dengan baik', 'Mandiri sekaligus komunikatif'],
    weaknesses: ['Cepat bosan', 'Terlalu fokus pada citra kesuksesan', 'Kadang melewatkan proses'],
    fears: ['Kehilangan status atau prestise', 'Gagal mencapai target yang sudah diumumkan'],
    jobMatches: ['Pengusaha', 'Manajer Penjualan Regional', 'Sutradara', 'Konsultan Eksekutif']
  }
};