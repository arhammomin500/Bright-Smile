import { Router } from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import doctorRoutes from './modules/doctors/doctors.routes.js';
import treatmentRoutes from './modules/treatments/treatments.routes.js';
import appointmentRoutes from './modules/appointments/appointments.routes.js';
import receptionRoutes from './modules/reception/reception.routes.js';
import patientRoutes from './modules/patients/patients.routes.js';
import slotRoutes from './modules/slots/slots.routes.js';
import notificationRoutes from './modules/notifications/notifications.routes.js';
import contentRoutes from './modules/content/content.routes.js';

const api = Router();

api.get('/health', (_req, res) => res.json({ success: true, data: { status: 'ok', ts: Date.now() } }));

// Public
api.use('/auth', authRoutes);
api.use('/doctors', doctorRoutes);
api.use('/treatments', treatmentRoutes);
api.use('/appointments', appointmentRoutes);
api.use('/content', contentRoutes);

// Staff (auth enforced inside each router)
api.use('/reception', receptionRoutes);
api.use('/patients', patientRoutes);
api.use('/slots', slotRoutes);
api.use('/notifications', notificationRoutes);

export default api;
