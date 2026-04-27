import React, { forwardRef } from 'react'
import { Activity } from 'lucide-react'

interface SocialBadgeProps {
  participantName: string
  pattern: string
  title: string
  strengths: string[]
}

export const SocialBadge = forwardRef<HTMLDivElement, SocialBadgeProps>(({ participantName, pattern, title, strengths }, ref) => {
  return (
    <div 
      ref={ref}
      className="w-[1080px] h-[1080px] bg-slate-900 flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900 via-slate-900 to-black opacity-80" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <Activity className="w-[800px] h-[800px] text-teal-500 rotate-12" />
      </div>

      <div className="relative z-10 w-[800px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-16 shadow-2xl flex flex-col items-center text-center">
        <div className="mb-12 flex justify-center">
          {/* We use an img tag with explicit dimensions, but html-to-image might complain if it's not base64.
              In Next.js public folder, it usually works if we use relative paths correctly, or we can just omit it for safety and use pure CSS/Lucide. Let's use pure text for safety against CORS issues in html2canvas. */}
          <div className="text-3xl font-black text-white flex items-center gap-4">
            <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-slate-900">
              W
            </div>
            WARUNK DIGITAL
          </div>
        </div>
        
        <p className="text-teal-400 font-bold tracking-[0.3em] uppercase text-xl mb-4">Profil Perilaku Dominan</p>
        <h1 className="text-white text-7xl font-black mb-8 leading-tight">{participantName}</h1>
        
        <div className="bg-teal-500 text-slate-900 text-9xl font-black py-8 px-16 rounded-3xl mb-8 leading-none shadow-[0_0_50px_rgba(20,184,166,0.3)]">
          {pattern}
        </div>
        
        <h2 className="text-4xl text-teal-50 font-bold uppercase tracking-widest mb-12">"{title}"</h2>
        
        <div className="w-full bg-black/40 rounded-3xl p-10 border border-white/5">
          <p className="text-slate-400 font-bold tracking-widest uppercase mb-6">Kekuatan Utama</p>
          <div className="flex flex-col gap-4 text-left">
            {strengths.slice(0, 3).map((str, i) => (
              <p key={i} className="text-white text-2xl font-medium flex items-start gap-4">
                <span className="text-teal-500 font-bold">•</span> {str}
              </p>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-slate-500 text-xl font-medium tracking-wide">
          Dianalisis melalui Portal Psikometri Warunk Digital
        </div>
      </div>
    </div>
  )
})

SocialBadge.displayName = 'SocialBadge'
