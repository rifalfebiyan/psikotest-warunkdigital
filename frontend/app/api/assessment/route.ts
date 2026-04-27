import { NextResponse } from 'next/server'
import { discQuestions, discProfiles } from '@/data/disc-data'
import { supabase } from '@/lib/supabase'

// Ini adalah simulasi "Self-Hosted API" menggunakan data Open Source
// yang berjalan di sisi backend Next.js (Serverless Function).
// Di masa depan, URL ini bisa diganti dengan endpoint Python IPIP.

export async function GET() {
  // Simulasi delay jaringan (latency) agar terasa seperti memanggil API eksternal
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return NextResponse.json({
    status: 'success',
    source: 'Self-Hosted IPIP/DISC Internal API',
    data: {
      questions: discQuestions,
      totalGroups: discQuestions.length
    }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { answers } = body
    
    // API logic untuk mengkalkulasi profil secara server-side
    // Mencegah logic bocor ke sisi client (keamanan algoritma)
    
    const scoreMost = { D: 0, I: 0, S: 0, C: 0, '*': 0 }
    const scoreLeast = { D: 0, I: 0, S: 0, C: 0, '*': 0 }

    Object.entries(answers).forEach(([groupId, ans]: [string, any]) => {
      const group = discQuestions.find(g => g.id === Number(groupId))
      if (!group) return
      const mostStmt = group.statements.find(s => s.id === ans.most)
      const leastStmt = group.statements.find(s => s.id === ans.least)

      if (mostStmt) scoreMost[mostStmt.mostFactor] += 1
      if (leastStmt) scoreLeast[leastStmt.leastFactor] += 1
    })

    const chartData = ['D', 'I', 'S', 'C'].map((factor) => {
      const f = factor as Exclude<keyof typeof scoreMost, '*'>
      const m = scoreMost[f]
      const l = scoreLeast[f]
      const c = m - l
      return { name: factor, most: m, least: l, change: c }
    })

    // Urutkan faktor berdasarkan skor 'change' tertinggi
    const sortedFactors = [...chartData].sort((a, b) => b.change - a.change)
    const topOne = sortedFactors[0].name
    const topTwo = sortedFactors[1].name
    const pattern2 = `${topOne}${topTwo}`
    const pattern1 = topOne

    // Cari profil berdasarkan pola 2-faktor first, then fallback to 1-faktor
    let profileEntry = Object.entries(discProfiles).find(([_, p]) => p.pattern === pattern2)
    if (!profileEntry) {
      profileEntry = Object.entries(discProfiles).find(([_, p]) => p.pattern === pattern1)
    }
    
    if (!profileEntry) {
      // Fallback: gunakan profil Mixed jika tidak ada pattern yang cocok
      console.warn(`Profil DISC tidak ditemukan untuk pattern "${pattern2}" atau "${pattern1}". Menggunakan fallback.`)
    }

    const profile = profileEntry ? profileEntry[1] : {
      pattern: pattern2,
      title: 'Profil Campuran',
      description: `Anda memiliki kombinasi unik dari faktor ${topOne} dan ${topTwo} yang tidak mengikuti pola klasik. Ini menunjukkan fleksibilitas dan keragaman karakter.`,
      strengths: ['Adaptif terhadap berbagai situasi', 'Memiliki perspektif yang beragam', 'Fleksibel dalam pendekatan'],
      weaknesses: ['Bisa sulit menentukan prioritas gaya kerja', 'Kadang tidak konsisten dalam pendekatan'],
      fears: ['Dipaksa memilih satu gaya kerja saja', 'Lingkungan yang terlalu kaku'],
      jobMatches: ['Konsultan', 'Manajer Proyek', 'Generalis HR', 'Business Development']
    }

    // ==== SIMPAN KE SUPABASE ====
    // Ambil data peserta dari payload form (asumsi dikirim dari app/result/page.tsx)
    const participant = body.participant || { name: 'Anonim', email: 'anon@mail.com', phone: '' }
    
    if (supabase) {
      const { error: dbError } = await supabase
        .from('assessments')
        .insert([{
          name: participant.name,
          email: participant.email,
          phone: participant.phone,
          raw_answers: answers,
          profile_pattern: profile.pattern,
          profile_title: profile.title,
          score_most: scoreMost,
          score_least: scoreLeast,
          chart_data: chartData
        }])
        
      if (dbError) {
        // Kita hanya melakukan log agar user tidak terganggu jika gagal save
        console.error("Gagal menyimpan ke Supabase:", dbError)
      }
    }

    return NextResponse.json({
      status: 'success',
      data: {
        chartData,
        profile
      }
    })
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Invalid data processed' }, { status: 400 })
  }
}
