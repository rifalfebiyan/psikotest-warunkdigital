import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { pdfBase64, email, name } = await request.json()

    if (!pdfBase64 || !email) {
      return NextResponse.json({ status: 'error', message: 'Data PDF atau email tidak ditemukan.' }, { status: 400 })
    }

    const smtpUser = process.env.SMTP_EMAIL
    const smtpPass = process.env.SMTP_PASSWORD

    if (!smtpUser || !smtpPass) {
      console.error('[Email] SMTP_EMAIL atau SMTP_PASSWORD belum dikonfigurasi')
      return NextResponse.json({
        status: 'error',
        message: 'Konfigurasi SMTP belum lengkap di server.'
      }, { status: 500 })
    }

    // Clean up base64 string (remove data URI prefix if present)
    const base64Content = pdfBase64.replace(/^data:application\/pdf;base64,/, '')

    // Create reusable transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const pdfBuffer = Buffer.from(base64Content, 'base64')
    const filename = `LAPORAN_DISC_${name.toUpperCase().replace(/ /g, '_')}.pdf`

    console.log(`[Email] Mengirim ke: ${email}, Nama: ${name}, PDF size: ${Math.round(pdfBuffer.length / 1024)}KB`)

    // Send mail
    const info = await transporter.sendMail({
      from: `"Warunk Digital - Portal Asesmen" <${smtpUser}>`,
      to: email,
      subject: `Hasil Asesmen DISC - ${name.toUpperCase()}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 3px solid #0d9488;">
            <h1 style="color: #0f172a; font-size: 22px; margin: 0;">Laporan Hasil Asesmen</h1>
            <p style="color: #0d9488; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px;">Portal Warunk Digital</p>
          </div>
          <p style="color: #334155; font-size: 15px; line-height: 1.6;">Halo, <strong>${name}</strong>!</p>
          <p style="color: #475569; font-size: 14px; line-height: 1.6;">Terima kasih telah mengikuti asesmen perilaku di Portal Warunk Digital. Terlampir adalah laporan hasil asesmen DISC Anda dalam format PDF.</p>
          <div style="background: #f0fdfa; border-left: 4px solid #0d9488; padding: 14px 18px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <p style="color: #0f766e; font-size: 13px; margin: 0;"><strong>📎 File terlampir:</strong> ${filename}</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 11px; color: #94a3b8; text-align: center;">Dokumen ini bersifat rahasia dan dihasilkan secara otomatis oleh sistem Portal Asesmen Warunk Digital.<br/>© 2026 Warunk Digital Indonesia</p>
        </div>
      `,
      attachments: [
        {
          filename,
          content: pdfBuffer,
          contentType: 'application/pdf',
        }
      ]
    })

    console.log(`[Email] Berhasil terkirim! Message ID: ${info.messageId}`)

    return NextResponse.json({ status: 'success', messageId: info.messageId })
  } catch (error: any) {
    console.error('[Email] Gagal kirim:', error?.message || error)
    return NextResponse.json({
      status: 'error',
      message: `Gagal mengirim email: ${error?.message || 'Unknown error'}`
    }, { status: 500 })
  }
}
