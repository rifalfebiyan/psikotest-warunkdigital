"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts"
import { pdf } from "@react-pdf/renderer"
import { DetailedReportPDF } from "@/components/pdf/DetailedReportPDF"
import { SocialBadge } from "@/components/SocialBadge"
import { useAssessmentStore } from "@/store/assessment"
import { Button } from "@/components/ui/button"
import {
  Download,
  Activity,
  User,
  TrendingUp,
  ShieldAlert,
  BrainCircuit,
  FileBadge,
  Printer,
  Calendar,
  Fingerprint,
  Mail,
  Phone,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Share2,
  Image as ImageIcon
} from "lucide-react"

export default function ResultPage() {
  const router = useRouter()
  const { participant, answers, blurCount } = useAssessmentStore()
  const reportRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  const [isGeneratingResult, setIsGeneratingResult] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isEmailing, setIsEmailing] = useState(false)
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [reportData, setReportData] = useState<any>(null)
  const [reportId, setReportId] = useState<string>('')
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // Generate static ID once on mount so it doesn't change on re-renders (Fixes random ID issue)
    setReportId(Math.floor(Math.random() * 90000 + 10000).toString())

    if (!participant) {
      router.replace("/")
      return
    }

    const API_BASE = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL || ""

    fetch(`${API_BASE}/api/assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, participant })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setReportData(data.data)
        }
        setIsGeneratingResult(false)
      })
      .catch(err => {
        console.error("Scoring failed", err)
        setIsGeneratingResult(false)
        setHasError(true)
      })
  }, [participant, router, answers])

  if (hasError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 p-6">
        <div className="flex flex-col items-center gap-4 text-rose-600 font-medium bg-white p-8 rounded-2xl shadow-sm border border-rose-100 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-rose-500" />
          <h2 className="text-xl font-bold text-slate-900">Gagal Memproses Asesmen</h2>
          <p className="text-slate-500 text-sm">Maaf, terjadi kesalahan saat memproses hasil tes Anda. Silakan coba lagi atau hubungi administrator.</p>
          <Button onClick={() => window.location.reload()} className="mt-4 bg-slate-900 hover:bg-slate-800 text-white border-0 shadow-md h-11 px-8 rounded-xl font-bold">
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  if (isGeneratingResult || !reportData || !participant) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 p-6">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-4 text-teal-600 font-medium"
        >
          <div className="w-16 h-16 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin" />
          <span className="tracking-[0.2em] uppercase text-[10px] font-black">Proses Otentikasi Digital...</span>
        </motion.div>
      </div>
    )
  }

  const { chartData, profile } = reportData

  // Helper: suppress console warnings during html2canvas (lab() color warning)
  const captureElement = async (element: HTMLElement, quality: number = 1.0) => {
    const { toPng } = await import('html-to-image')
    
    // Save original styles
    const origMargin = element.style.margin
    const origWidth = element.style.width
    const origMaxWidth = element.style.maxWidth
    const origMinWidth = element.style.minWidth
    
    // Force fixed layout for capture (remove mx-auto, force A4 width)
    element.style.margin = '0'
    element.style.width = '794px'
    element.style.maxWidth = '794px'
    element.style.minWidth = '794px'
    
    // Small delay to let browser reflow
    await new Promise(r => setTimeout(r, 100))
    
    const dataUrl = await toPng(element, {
      quality,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
    })
    
    // Restore original styles
    element.style.margin = origMargin
    element.style.width = origWidth
    element.style.maxWidth = origMaxWidth
    element.style.minWidth = origMinWidth
    
    return dataUrl
  }

  const createPdfBlob = async (quality: number = 2.0) => {
    const chartEl = document.getElementById("chart-section")
    let chartImageBase64 = ""
    if (chartEl) {
      chartImageBase64 = await captureElement(chartEl, quality)
    }

    const logoUrl = typeof window !== 'undefined' ? `${window.location.origin}/wk.png` : undefined
    const doc = <DetailedReportPDF participant={participant} profile={profile} chartImageBase64={chartImageBase64} reportId={reportId} logoUrl={logoUrl} />
    const blob = await pdf(doc).toBlob()
    return blob
  }

  const handleDownloadPdf = async () => {
    if (isExporting) return

    try {
      setIsExporting(true)
      const blob = await createPdfBlob(2.0)
      
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `LAPORAN_DISC_${participant.name.toUpperCase().replace(/ /g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleSendEmail = async () => {
    if (isEmailing) return
    
    try {
      setIsEmailing(true)
      setEmailStatus('sending')

      const blob = await createPdfBlob(1.5)
      
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      await new Promise(resolve => { reader.onloadend = resolve })
      const pdfBase64 = reader.result as string

      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pdfBase64,
          email: participant.email,
          name: participant.name
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        setEmailStatus('success')
        setTimeout(() => setEmailStatus('idle'), 5000)
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      console.error('Email failed:', error)
      setEmailStatus('error')
      setTimeout(() => setEmailStatus('idle'), 5000)
    } finally {
      setIsEmailing(false)
    }
  }

  const handleShareBadge = async () => {
    if (!badgeRef.current || isSharing) return
    try {
      setIsSharing(true)
      const dataUrl = await captureElement(badgeRef.current, 2.0)
      
      const res = await fetch(dataUrl)
      const blob = await res.blob()
      const file = new File([blob], 'disc-badge.png', { type: 'image/png' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Profil Perilaku DISC Saya',
          text: `Saya adalah seorang ${profile.title}. Ini adalah profil perilaku dominan saya berdasarkan asesmen DISC.`,
          files: [file]
        })
      } else {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = `BADGE_${participant.name.toUpperCase().replace(/ /g, '_')}.png`
        link.click()
      }
    } catch (error) {
      console.error('Share failed', error)
    } finally {
      setIsSharing(false)
    }
  }

  const renderChart = (dataKey: string, strokeColor: string, title: string, subtitle: string) => (
    <div className="flex flex-col h-full">
      <div className="mb-4 border-l-2 border-slate-200 pl-3">
        <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-tighter">{title}</h3>
        <p className="text-[9px] text-slate-400 font-medium leading-none mt-0.5 uppercase">{subtitle}</p>
      </div>
      <div className="h-44 w-full bg-slate-50/50 rounded-lg p-2 border border-slate-100">
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
            <Area type="monotone" dataKey={dataKey} stroke={strokeColor} strokeWidth={2} fill={strokeColor} fillOpacity={0.05} dot={{ fill: strokeColor, r: 3, strokeWidth: 1, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-100/30 text-slate-800 font-sans pb-12">

      {/* Official Clinical Control Bar (Non-Printable) */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[100] print:hidden shadow-sm">
        <div className="max-w-[210mm] mx-auto h-16 px-4 flex items-center justify-between gap-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 text-slate-900 hover:text-teal-600 font-bold text-[10px] uppercase tracking-[0.15em] transition-all group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white group-hover:bg-teal-600 transition-colors shadow-lg shadow-slate-900/10">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">Kembali ke Portal</span>
            <span className="sm:hidden">Kembali</span>
          </button>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleSendEmail}
              disabled={isEmailing}
              className={`h-10 px-4 md:px-6 text-[10px] font-black uppercase tracking-widest gap-2 shadow-lg shrink-0 rounded-xl border-0 disabled:opacity-50 transition-all ${
                emailStatus === 'success' ? 'bg-emerald-500 hover:bg-emerald-600' : 
                emailStatus === 'error' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-slate-900 hover:bg-slate-800'
              } text-white`}
            >
              {emailStatus === 'sending' ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : emailStatus === 'success' ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : emailStatus === 'error' ? (
                <AlertCircle className="w-3.5 h-3.5" />
              ) : (
                <Mail className="w-3.5 h-3.5" />
              )}
              <span>
                {emailStatus === 'sending' ? 'Mengirim...' : 
                 emailStatus === 'success' ? 'Terkirim!' : 
                 emailStatus === 'error' ? 'Gagal' : 'Kirim via Email'}
              </span>
            </Button>

            <Button
              onClick={handleShareBadge}
              disabled={isSharing}
              variant="outline"
              className="h-10 px-4 md:px-6 text-[10px] font-black uppercase tracking-widest border-teal-200 hover:bg-teal-50 text-teal-700 gap-2 shrink-0 rounded-xl disabled:opacity-50"
            >
              {isSharing ? (
                <div className="w-4 h-4 border-2 border-teal-300 border-t-teal-600 rounded-full animate-spin" />
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline">{isSharing ? 'Memproses...' : 'Bagikan Badge'}</span>
              <span className="md:hidden">{isSharing ? '...' : 'Share'}</span>
            </Button>

            <Button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              variant="outline"
              className="h-10 px-4 md:px-6 text-[10px] font-black uppercase tracking-widest border-slate-200 hover:bg-slate-50 text-slate-600 gap-2 shrink-0 rounded-xl disabled:opacity-50"
            >
              {isExporting ? (
                <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span className="hidden md:inline">{isExporting ? 'Proses...' : 'Simpan PDF'}</span>
              <span className="md:hidden">{isExporting ? '...' : 'PDF'}</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-6 md:pt-10 px-0 sm:px-4">
        {/* Official Sheet Container */}
        <div
          ref={reportRef}
          className="w-full max-w-[210mm] min-h-screen lg:min-h-[297mm] mx-auto bg-white shadow-2xl lg:border border-slate-200 overflow-hidden relative lg:rounded-sm"
        >
          {/* Medical Watermark Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <Activity className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] rotate-12" />
          </div>

          {/* Header Section */}
          <header className="p-6 md:p-12 border-b-[3px] border-slate-900 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 bg-slate-50/50 relative">
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 md:w-16 shrink-0">
                  <img src="/wk.png" alt="WK Logo" className="w-full h-auto" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-slate-900 uppercase leading-none">Laporan Hasil Asesmen</h1>
                  <p className="text-[9px] md:text-[11px] font-bold text-teal-600 uppercase tracking-[0.25em] leading-none mt-2">Analisis Perilaku Warunk Digital</p>
                </div>
              </div>
              <div className="pt-1">
                <div className="inline-flex items-center gap-2.5 bg-teal-600/10 text-teal-700 text-[10px] md:text-[11px] font-black px-4 py-2 uppercase tracking-widest rounded-lg border border-teal-200/50">
                  <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                  Dokumen Resmi : Rahasia
                </div>
                {(blurCount || 0) >= 3 && (
                  <div className="inline-flex items-center gap-2.5 bg-rose-600/10 text-rose-700 text-[10px] md:text-[11px] font-black px-4 py-2 uppercase tracking-widest rounded-lg border border-rose-200/50 mt-2 md:mt-0 md:ml-3">
                    <AlertCircle className="w-3.5 h-3.5" />
                    LOW VALIDITY - FOKUS TERGANGGU
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between md:flex-col items-center md:items-end gap-4 pt-6 md:pt-0 border-t md:border-t-0 border-slate-200/60">
              <div className="bg-white p-2.5 border border-slate-200 rounded-xl shadow-sm shrink-0">
                <Fingerprint className="w-7 h-7 md:w-10 md:h-10 text-slate-300 mx-auto" />
              </div>
              <div className="text-right">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Metadata Validasi</p>
                <p className="text-xs md:text-sm font-mono font-black text-slate-900 bg-slate-100 px-2 py-1 rounded">ID-PX:{reportId || '-----'}</p>
              </div>
            </div>
          </header>

          <div className="p-6 md:p-10 space-y-8 md:space-y-10 relative z-10">

            {/* Section 1: Data Peserta */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-teal-500" />
                <h2 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-widest">Bagian A: Identitas Peserta</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-slate-50 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Nama Subjek</p>
                      <p className="text-sm font-black text-slate-800 uppercase leading-none">{participant.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Email Kontak</p>
                      <p className="text-xs md:text-sm font-bold text-slate-700 truncate">{participant.email}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Tanggal Asesmen</p>
                      <p className="text-sm font-bold text-slate-800 leading-none">{new Date(participant.testDate || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <div>
                      <p className="text-[8px] font-bold text-slate-400 uppercase leading-none mb-1">Nomor Telepon</p>
                      <p className="text-sm font-bold text-slate-700 leading-none">{participant.phone || '(No Contact)'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Psychometric Charts */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-4 bg-teal-500" />
                <h2 className="text-[10px] md:text-xs font-black text-slate-900 uppercase tracking-widest">Bagian B: Pemetaan Perilaku</h2>
              </div>
              <div id="chart-section" className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 bg-white p-4 rounded-xl">
                {renderChart('most', '#0ea5e9', 'I: Persona Sosial', 'Ekspektasi')}
                {renderChart('least', '#f43f5e', 'II: Kondisi Alami', 'Di Bawah Tekanan')}
                {renderChart('change', '#14b8a6', 'III: Sintesis Inti', 'Perilaku Terintegrasi')}
              </div>
            </section>

            {/* Section 3: Professional Insights */}
            <section className="pt-4 border-t border-slate-100">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Pattern Badge */}
                <div className="flex-shrink-0 flex flex-col items-center justify-start p-6 bg-slate-900 rounded-2xl text-white w-full md:w-52 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-teal-500" />
                  <p className="text-[8px] font-black tracking-widest uppercase mb-4 text-teal-400">Pola</p>
                  <div className="text-5xl md:text-6xl font-black mb-2 leading-none font-sans">{profile.pattern}</div>
                  <div className="text-[10px] font-black uppercase text-center border-t border-white/20 pt-3 w-full opacity-90 tracking-tighter leading-tight">
                    {profile.title.replace('The ', '')}
                  </div>
                </div>

                {/* Summary Text */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Ringkasan Eksekutif</h3>
                    <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed italic border-l-4 border-teal-100 pl-4">
                      "{profile.description}"
                    </p>
                  </div>

                  {/* Scaled Indicators */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {chartData.map((d: any) => (
                      <div key={d.name} className="space-y-1">
                        <div className="flex justify-between items-end">
                          <span className="text-[8px] font-black text-slate-900">{d.name} FACTOR</span>
                          <span className="text-[9px] font-bold text-slate-400">{d.change > 0 ? `+${d.change}` : d.change}</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full">
                          <div
                            className={`h-full rounded-full ${d.name === 'D' ? 'bg-rose-400' : d.name === 'I' ? 'bg-amber-400' : d.name === 'S' ? 'bg-blue-400' : 'bg-teal-400'}`}
                            style={{ width: `${Math.min(100, Math.max(10, ((d.change + 24) / 48) * 100))}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Lists Summary */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-4 border-t border-slate-100">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-teal-600" /> Kekuatan Utama
                  </h4>
                  <ul className="space-y-2">
                    {profile.strengths.slice(0, 3).map((s: string, i: number) => (
                      <li key={i} className="text-[11px] font-medium text-slate-600 flex gap-2">
                        <span className="text-teal-500 font-bold">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <ShieldAlert className="w-3 h-3 text-rose-600" /> Risiko Perilaku
                  </h4>
                  <ul className="space-y-2">
                    {profile.fears.slice(0, 3).map((f: string, i: number) => (
                      <li key={i} className="text-[11px] font-medium text-slate-600 flex gap-2">
                        <span className="text-rose-500 font-bold">•</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-4">Rekomendasi Karir / Industri</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.jobMatches.map((job: string) => (
                      <span key={job} className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-tighter">
                        {job}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200/50 space-y-2">
                  <p className="text-[8px] text-slate-400 font-medium italic leading-relaxed">
                    *Berdasarkan metrik perilaku dominan yang terekam pada instrumen DISC IPIP-15.
                  </p>
                  <div className="bg-rose-50/50 border border-rose-100 p-3 rounded-lg">
                    <p className="text-[8px] text-rose-600/80 font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Penafian Profesional</p>
                    <p className="text-[8px] text-slate-500 font-medium leading-relaxed text-justify">
                      Laporan ini dihasilkan secara terkomputerisasi melalui platform swa-asesmen (self-assessment). Hasil ini memberikan indikator kecenderungan perilaku dan <strong>bukan</strong> merupakan alat diagnostik psikologi klinis berlisensi. Keputusan strategis terkait rekrutmen atau asesmen kompetensi sebaiknya diverifikasi lebih lanjut oleh psikolog atau asesor profesional.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Validation Footer Section */}
            <footer className="pt-12 md:pt-20 grid grid-cols-1 md:grid-cols-[2fr_1fr] items-end gap-10">
              <div className="text-[8px] text-slate-400 font-medium space-y-2">
                <p>Dokumen elektronik rahasia yang dihasilkan oleh Portal Psikometri Warunk Digital.</p>
                <p>© 2026 Warunk Digital Indonesia</p>
                <div className="flex items-center gap-4 pt-4 grayscale opacity-40">
                  <FileBadge className="w-8 h-8 md:w-10 md:h-10" />
                  <div className="h-3 w-24 md:h-4 md:w-32 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="text-center space-y-4 md:space-y-2">
                <div className="space-y-1">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Validator Berwenang</p>
                  <div className="flex justify-center h-16 items-center overflow-hidden">
                    <img src="/wk.png" alt="Signature Logo" className="h-20 w-auto opacity-100 scale-[1.65] transform transition-transform" />
                  </div>
                  <div className="h-[1px] w-full bg-slate-300" />
                  <p className="text-[10px] md:text-xs font-black text-slate-800 uppercase tracking-tighter mt-2">ID TERVALIDASI SISTEM</p>
                  <p className="text-[8px] font-bold text-teal-600 uppercase">Tanda Tangan Digital Otomatis</p>
                </div>
              </div>
            </footer>
          </div>

          {/* Vertical Side Print Marker */}
          <div className="absolute right-0 top-1/2 -rotate-90 translate-x-12 p-2 hidden lg:block opacity-20">
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.5em]">LAPORAN PSIKOMETRI TERSERTIFIKASI</p>
          </div>
        </div>
      </div>

      {/* Hidden Social Badge for capture */}
      <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
        <SocialBadge 
          ref={badgeRef}
          participantName={participant.name}
          pattern={profile.pattern}
          title={profile.title}
          strengths={profile.strengths}
        />
      </div>
    </div>
  )
}
