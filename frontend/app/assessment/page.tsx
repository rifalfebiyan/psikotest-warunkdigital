"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAssessmentStore } from "@/store/assessment"
import { Button } from "@/components/ui/button"
import { Activity, ShieldCheck, ArrowRight, Loader } from "lucide-react"

export default function AssessmentPage() {
  const router = useRouter()
  const { participant, answers, setAnswer } = useAssessmentStore()
  
  const [questions, setQuestions] = useState<any[]>([])
  const [isLoadingApi, setIsLoadingApi] = useState(true)
  const [currentGroupIdx, setCurrentGroupIdx] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined' && !participant) {
      router.replace("/")
      return
    }

    const API_BASE = process.env.NEXT_PUBLIC_ASSESSMENT_API_URL || ""

    // Call API "Self-Hosted"
    fetch(`${API_BASE}/api/assessment`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setQuestions(data.data.questions)
        }
        setIsLoadingApi(false)
      })
      .catch(err => {
        console.error("Failed fetching API", err)
        setIsLoadingApi(false)
      })
  }, [participant, router])

  // Auto redirect when finished to prevent "stuck" feeling
  const isFinished = questions.length > 0 && currentGroupIdx >= questions.length

  useEffect(() => {
    if (isFinished) {
      const timer = setTimeout(() => {
        router.push("/result")
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [isFinished, router])
  
  if (isLoadingApi) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 p-6">
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center gap-4 text-teal-600 font-medium">
          <Loader className="w-10 h-10 animate-spin" />
          <span className="tracking-widest">MENGHUBUNGKAN KE SERVER API...</span>
        </motion.div>
      </div>
    )
  }

  if (!questions || questions.length === 0) return null

  const currentGroup = questions[currentGroupIdx]

  const handleSelect = (statementId: string, type: 'most' | 'least') => {
    setAnswer(currentGroup.id, type, statementId)
  }

  const currentAns = answers[currentGroup?.id] || {}
  const canProceed = currentAns.most && currentAns.least && (currentAns.most !== currentAns.least)

  const goNext = () => {
    if (!canProceed) return
    setCurrentGroupIdx(prev => prev + 1)
  }

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 bg-white p-12 rounded-3xl shadow-xl shadow-slate-200"
        >
          <div className="relative">
            <Loader className="w-16 h-16 text-teal-600 animate-spin" />
            <Activity className="w-6 h-6 text-teal-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Memproses Ke Server Sentral</h2>
            <p className="text-slate-500">Menganalisis hasil dari database API.</p>
          </div>
          <Button onClick={() => router.push("/result")} className="mt-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-8 h-12 shadow-md">
            Lihat Hasil Asesmen
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans flex flex-col">
      <header className="px-8 py-4 border-b border-slate-200 bg-white flex justify-between items-center z-10 shadow-sm sticky top-0">
        <div className="flex items-center gap-4">
          <img src="/wk.png" alt="Logo" className="h-9 w-auto" />
          <div className="h-8 w-px bg-slate-200" />
          <div className="text-sm font-medium text-slate-600">
            Nama Peserta: <span className="text-slate-900 font-semibold">{participant?.name || 'Anonim'}</span>
          </div>
        </div>
        <div className="text-xs font-semibold text-teal-700 px-4 py-1.5 bg-teal-50 rounded-full border border-teal-100 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500" />
          TAHAP {currentGroupIdx + 1} / {questions.length}
        </div>
      </header>

      <div className="h-1.5 bg-slate-100 w-full relative">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-teal-500 rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentGroupIdx / questions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 relative flex items-center justify-center p-6 sm:p-12">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentGroup.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl"
          >
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 md:p-14 shadow-xl shadow-slate-200/50">
              
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Pernyataan Perilaku</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Pilih <strong className="text-teal-600 bg-teal-50 px-2 py-0.5 rounded">PALING (P)</strong> yang menggambarkan diri Anda, dan <strong className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded">KURANG (K)</strong> yang tidak menggambarkan diri Anda.
                </p>
              </div>

              <div className="space-y-4 md:space-y-3">
                <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 px-6 mb-2 hidden sm:grid">
                  <div />
                  <div className="text-center font-bold text-teal-600 text-sm w-16">Paling</div>
                  <div className="text-center font-bold text-rose-600 text-sm w-16">Kurang</div>
                </div>

                {currentGroup.statements.map((stmt: any) => {
                  const isMost = currentAns.most === stmt.id
                  const isLeast = currentAns.least === stmt.id

                  return (
                    <div key={stmt.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto] gap-4 sm:gap-x-6 items-center group bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 transition-all hover:bg-slate-100/70 hover:border-slate-300">
                      <div className="w-full text-base sm:text-lg text-slate-700 font-medium sm:px-2 text-center sm:text-left">
                        {stmt.text}
                      </div>

                      <div className="flex gap-4 sm:contents w-full justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="sm:hidden text-xs font-bold text-teal-600 uppercase">Paling (P)</span>
                          <button 
                            onClick={() => handleSelect(stmt.id, 'most')}
                            disabled={isLeast}
                            className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all ${isMost ? 'bg-teal-50 border-teal-500 text-teal-600 shadow-sm' : 'bg-white border-slate-200 hover:border-teal-300'} ${isLeast ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-100' : 'cursor-pointer'}`}
                            aria-label="Pilih Paling"
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isMost ? 'border-teal-500 bg-teal-500' : 'border-slate-300 bg-white'}`}>
                              {isMost && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </button>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                          <span className="sm:hidden text-xs font-bold text-rose-600 uppercase">Kurang (K)</span>
                          <button 
                            onClick={() => handleSelect(stmt.id, 'least')}
                            disabled={isMost}
                            className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all ${isLeast ? 'bg-rose-50 border-rose-500 text-rose-600 shadow-sm' : 'bg-white border-slate-200 hover:border-rose-300'} ${isMost ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-100' : 'cursor-pointer'}`}
                            aria-label="Pilih Kurang"
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isLeast ? 'border-rose-500 bg-rose-500' : 'border-slate-300 bg-white'}`}>
                              {isLeast && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-12 flex justify-end pt-6 border-t border-slate-100">
                <Button 
                  onClick={goNext}
                  disabled={!canProceed}
                  className="h-14 px-8 bg-slate-900 border-slate-800 text-white hover:bg-teal-600 hover:border-teal-600 rounded-xl text-base font-semibold transition-all disabled:opacity-40 flex items-center gap-3 shadow-md"
                >
                  Simpan & Lanjutkan
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
