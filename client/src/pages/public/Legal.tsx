import { Box, Container, Typography } from '@mui/material';
import { brand } from '@/theme/theme';
import { CLINIC } from '@/lib/clinic';
import { usePageMeta } from '@/lib/usePageMeta';

function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box>
      <Box sx={{ bgcolor: brand.mist, pt: { xs: '86px', md: '116px' }, pb: 4, borderBottom: `1px solid ${brand.line}` }}>
        <Container>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.3rem' }, color: 'text.primary' }}>
            {title}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, '& p': { color: 'text.secondary', mb: 2 }, '& h2': { fontSize: '1.15rem', fontWeight: 800, mt: 3, mb: 1, color: 'text.primary' } }}>
        {children}
      </Container>
    </Box>
  );
}

export function Privacy() {
  usePageMeta('Privacy Policy — BrightSmile Dental Clinic');
  return (
    <LegalShell title="Privacy Policy">
      <Typography component="h2">What this website collects</Typography>
      <Typography component="p">
        This website is an informational, static website. It has no accounts, no databases, and it
        does not store or transmit any personal information you type into it.
      </Typography>
      <Typography component="h2">Appointment requests and messages</Typography>
      <Typography component="p">
        When you use the appointment or contact features, the website prepares a message and opens
        your own WhatsApp or email application. The message is sent by you, from your own app,
        directly to the clinic — this website never receives or stores it.
      </Typography>
      <Typography component="h2">Third-party services</Typography>
      <Typography component="p">
        Pages may load images and an embedded map from third-party providers (such as Google Maps),
        which may set their own cookies subject to their own privacy policies.
      </Typography>
      <Typography component="h2">Contact</Typography>
      <Typography component="p">
        For any privacy question, contact the clinic at {CLINIC.phone} or {CLINIC.email}.
      </Typography>
    </LegalShell>
  );
}

export function Terms() {
  usePageMeta('Terms & Conditions — BrightSmile Dental Clinic');
  return (
    <LegalShell title="Terms & Conditions">
      <Typography component="h2">Informational content</Typography>
      <Typography component="p">
        The content on this website is provided for general information about the clinic and its
        services. It is not medical advice. Please consult the dentist for advice about your own
        dental health.
      </Typography>
      <Typography component="h2">Appointments</Typography>
      <Typography component="p">
        Appointment requests made through this website are requests only. An appointment is
        confirmed only when the clinic responds and confirms a time with you directly.
      </Typography>
      <Typography component="h2">Pricing</Typography>
      <Typography component="p">
        Any prices shown are indicative. The exact cost of treatment is confirmed by the clinic
        after consultation.
      </Typography>
    </LegalShell>
  );
}
