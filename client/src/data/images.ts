// Central registry of site photography (all URLs visually verified).
// Swap any entry for the clinic's real photos — one place to update.
const u = (id: string, w = 900) => `https://images.unsplash.com/${id}?w=${w}&q=75&auto=format&fit=crop`;

export const IMG = {
  doctorPortrait: u('photo-1612349317150-e413f6a5b16d', 800),
  heroClinic: u('photo-1629909613654-28e377c37b09', 1200),
  clinicReception: u('photo-1598256989800-fe5f95da9787', 1200),
  clinicInterior: u('photo-1595152772835-219674b2a8a6', 1000),
  dentistPatient: u('photo-1606811841689-23dfddce3e95', 1000),
  dentistExam: u('photo-1612277795421-9bc7706a4a34', 900),
  aligner: u('photo-1609840114035-3c981b782dfe', 700),
  smile: u('photo-1618498082410-b4aa22193b38', 700),
  smilingDentist: u('photo-1643297654416-05795d62e39c', 700),
  xray: u('photo-1588776814546-1ffcf47267a5', 700),
  surgery: u('photo-1551601651-2a8555f1a136', 700),
  procedure: u('photo-1571772996211-2f02c9727629', 700),
};
