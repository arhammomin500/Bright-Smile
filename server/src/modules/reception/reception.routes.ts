import { Router } from 'express';
import { asyncHandler } from '../../lib/http.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import { validate } from '../../middleware/validate.js';
import {
  listAppointmentsSchema,
  changeStatusSchema,
  rescheduleSchema,
  assignDoctorSchema,
  staffCreateSchema,
} from '../appointments/appointments.schemas.js';
import { z } from 'zod';
import * as ctrl from './reception.controller.js';

const router = Router();

// Everything here requires a staff session.
router.use(authenticate, authorize('RECEPTION', 'ADMIN', 'DOCTOR'));

router.get('/dashboard', asyncHandler(ctrl.dashboard));

router.get(
  '/appointments',
  validate({ query: listAppointmentsSchema }),
  asyncHandler(ctrl.listAppointments),
);
router.post(
  '/appointments',
  validate({ body: staffCreateSchema }),
  asyncHandler(ctrl.createStaffAppointment),
);
router.get('/appointments/:id', asyncHandler(ctrl.getAppointment));
router.patch(
  '/appointments/:id/status',
  validate({ body: changeStatusSchema }),
  asyncHandler(ctrl.updateStatus),
);
router.patch(
  '/appointments/:id/reschedule',
  validate({ body: rescheduleSchema }),
  asyncHandler(ctrl.reschedule),
);
router.patch(
  '/appointments/:id/assign',
  validate({ body: assignDoctorSchema }),
  asyncHandler(ctrl.assignDoctor),
);
router.patch(
  '/appointments/:id/notes',
  validate({ body: z.object({ internalNotes: z.string().max(4000) }) }),
  asyncHandler(ctrl.updateNotes),
);

export default router;
