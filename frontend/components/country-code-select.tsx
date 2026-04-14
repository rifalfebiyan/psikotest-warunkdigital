"use client"

import React from "react"
import { cn } from "@/lib/utils"

export interface Country {
  name: string
  code: string
  flag: string
}

export const countries: Country[] = [
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "USA", code: "+1", flag: "🇺🇸" },
  { name: "UK", code: "+44", flag: "🇬🇧" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
]

interface CountryCodeSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  className?: string
}

export function CountryCodeSelect({ value, onChange, disabled, className }: CountryCodeSelectProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10",
        )}
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.code} ({c.name})
          </option>
        ))}
      </select>
      <div className="flex items-center gap-2 px-3 h-12 bg-slate-50 border border-slate-200 border-r-0 rounded-l-xl text-slate-700 font-medium whitespace-nowrap">
        <span>{countries.find((c) => c.code === value)?.flag}</span>
        <span>{value}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-1 opacity-50"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}
