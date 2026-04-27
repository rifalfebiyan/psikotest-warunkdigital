"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAssessmentStore } from "@/store/assessment"
import { Activity, HeartPulse, AlertCircle } from "lucide-react"
import { CountryCodeSelect } from "@/components/country-code-select"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const router = useRouter()
  const setParticipant = useAssessmentStore((state) => state.setParticipant)
  const clearAssessment = useAssessmentStore((state) => state.clearAssessment)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const [countryCode, setCountryCode] = useState("+62")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Bersihkan data assessment lama saat masuk ke halaman registrasi
    // agar tidak terjadi pencampuran data antar peserta (State tidak di-clear issue)
    clearAssessment()
  }, [clearAssessment])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi"
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nama minimal 3 karakter"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Alamat email wajib diisi"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    const phoneDigits = formData.phone.replace(/\D/g, "")
    if (formData.phone && (phoneDigits.length < 8 || phoneDigits.length > 15)) {
      newErrors.phone = "Nomor telepon harus antara 8-15 digit"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Combine country code and phone for the final storage
    const fullPhone = formData.phone ? `${countryCode}${formData.phone.replace(/^0+/, "")}` : ""

    setParticipant({
      ...formData,
      phone: fullPhone,
      testDate: new Date().toISOString(),
    })

    // Brief delay for UX feel
    setTimeout(() => {
      router.push("/assessment")
    }, 500)
  }

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans selection:bg-teal-500 selection:text-white flex items-center justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-teal-50/80 to-transparent pointer-events-none" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-teal-200/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[60%] bg-blue-200/40 blur-[120px] rounded-full pointer-events-none" />

      <main className="z-10 w-full max-w-7xl px-5 sm:px-8 md:px-12 py-12 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-20 items-center mx-auto">
        {/* Left Column: Typography & Concept */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-teal-600 font-medium">
              <img src="/wk.png" alt="Logo" className="h-8 w-auto" />
              <span className="tracking-wide">Portal Asesmen Perilaku</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Asesmen <br />
              <span className="text-teal-600">Perilaku Psikologis</span>
            </h1>

            {/* <p className="text-lg text-slate-600 max-w-md leading-relaxed">
              Dapatkan pemahaman mendalam tentang kecenderungan perilaku, gaya kerja, dan pola komunikasi Anda melalui instrumen diagnostik yang tervalidasi secara profesional.
            </p> */}
          </div>

          <div className="flex gap-4 items-center mt-4">
            <div className="h-12 w-1.5 bg-teal-500 rounded-full" />
            <span className="text-sm text-slate-500 font-medium">Data dijamin kerahasiaannya dan dienkripsi untuk menjaga privasi profil perilaku Anda.</span>
          </div>
        </motion.div>

        {/* Right Column: Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-teal-500" />

            <div className="mb-6 flex flex-col items-center text-center">
              <img src="/wk.png" alt="Logo" className="h-48 w-auto -my-16 object-contain" />
              <h3 className="text-2xl font-bold text-slate-800 mt-2">Registrasi Peserta</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-600">Nama Lengkap Sesuai Identitas *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: "" })
                  }}
                  className={cn(
                    "bg-slate-50 border-slate-200 text-slate-800 rounded-xl h-12 px-4 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-all font-medium",
                    errors.name && "border-rose-400 focus-visible:ring-rose-500"
                  )}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.name && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium italic">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-600">Alamat Email (Untuk Pengiriman Hasil) *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: "" })
                  }}
                  className={cn(
                    "bg-slate-50 border-slate-200 text-slate-800 rounded-xl h-12 px-4 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-all font-medium",
                    errors.email && "border-rose-400 focus-visible:ring-rose-500"
                  )}
                  placeholder="email@contoh.com"
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium italic">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-slate-600">Nomor Telepon Pendamping / Pribadi</Label>
                <div className="flex">
                  <CountryCodeSelect
                    value={countryCode}
                    onChange={setCountryCode}
                  />
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: "" })
                    }}
                    className={cn(
                      "bg-slate-50 border-slate-200 text-slate-800 rounded-r-xl rounded-l-none h-12 px-4 focus-visible:ring-teal-500 focus-visible:border-teal-500 transition-all font-medium flex-1",
                      errors.phone && "border-rose-400 focus-visible:ring-rose-500 z-10"
                    )}
                    placeholder="812xxxxx"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1 font-medium italic">
                    <AlertCircle className="w-3 h-3" /> {errors.phone}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 mt-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-base font-semibold transition-all duration-300 shadow-md shadow-teal-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Mempersiapkan...</span>
                  </div>
                ) : (
                  "Mulai Asesmen"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
