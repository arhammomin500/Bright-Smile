import { prisma } from '../lib/prisma.js';
import { sendMail, emailLayout } from '../lib/email.js';
import type { NotificationType } from '../constants/enums.js';

interface CreateNotificationInput {
  type: NotificationType;
  title: string;
  message: string;
  // Target either a specific user, a patient, and/or broadcast to a staff role.
  userId?: number | null;
  patientId?: number | null;
  audienceRole?: 'RECEPTION' | 'ADMIN' | null;
  relatedType?: string;
  relatedId?: number;
  // Optional email
  email?: { to: string; subject: string; html: string } | null;
}

// Creates an in-app notification and (optionally) sends an email.
// SMS/WhatsApp/Push are represented as channels and are "ready" to wire up.
export async function notify(input: CreateNotificationInput): Promise<void> {
  await prisma.notification.create({
    data: {
      type: input.type,
      channel: 'IN_APP',
      title: input.title,
      message: input.message,
      userId: input.userId ?? null,
      patientId: input.patientId ?? null,
      audienceRole: input.audienceRole ?? null,
      relatedType: input.relatedType ?? null,
      relatedId: input.relatedId ?? null,
    },
  });

  if (input.email) {
    try {
      await sendMail({
        to: input.email.to,
        subject: input.email.subject,
        html: input.email.html,
      });
      // Record that an email channel notification was dispatched.
      await prisma.notification.create({
        data: {
          type: input.type,
          channel: 'EMAIL',
          title: input.email.subject,
          message: input.message,
          userId: input.userId ?? null,
          patientId: input.patientId ?? null,
          relatedType: input.relatedType ?? null,
          relatedId: input.relatedId ?? null,
          isRead: true,
        },
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[notification email failed]', err);
    }
  }
}

export { emailLayout };
