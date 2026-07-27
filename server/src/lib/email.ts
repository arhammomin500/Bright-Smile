import nodemailer, { type Transporter } from 'nodemailer';
import { env } from '../config/env.js';

// If SMTP is configured we use it; otherwise every message is logged to the
// console (a "dev transport"), so the whole flow works with zero setup.
let transporter: Transporter | null = null;

if (env.mail.host && env.mail.port) {
  transporter = nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    secure: env.mail.port === 465,
    auth: env.mail.user ? { user: env.mail.user, pass: env.mail.pass } : undefined,
  });
}

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail({ to, subject, html, text }: MailInput): Promise<void> {
  if (!transporter) {
    // eslint-disable-next-line no-console
    console.log(
      `\n📧 [DEV EMAIL] to=${to}\n   subject: ${subject}\n   ${text ?? html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 240)}\n`,
    );
    return;
  }
  await transporter.sendMail({ from: env.mail.from, to, subject, html, text });
}

// ── Branded email template ────────────────────────────────────────────
export function emailLayout(title: string, bodyHtml: string): string {
  return `
  <div style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;padding:24px;">
      <div style="background:linear-gradient(135deg,#1f6feb,#0a4bc2);border-radius:20px 20px 0 0;padding:28px 32px;">
        <div style="color:#fff;font-size:20px;font-weight:700;letter-spacing:.3px;">
          ✦ ${env.clinic.name}
        </div>
      </div>
      <div style="background:#ffffff;padding:32px;border-radius:0 0 20px 20px;box-shadow:0 10px 30px rgba(15,23,42,.08);">
        <h1 style="margin:0 0 16px;font-size:22px;color:#0f172a;">${title}</h1>
        ${bodyHtml}
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:20px;line-height:1.6;">
        ${env.clinic.name}<br/>
        ${env.clinic.phone} · Emergency: ${env.clinic.emergency}<br/>
        This is an automated message — please do not reply.
      </p>
    </div>
  </div>`;
}

export function button(label: string, url: string): string {
  return `<a href="${url}" style="display:inline-block;background:#1f6feb;color:#fff;text-decoration:none;padding:12px 24px;border-radius:12px;font-weight:600;margin:8px 0;">${label}</a>`;
}
