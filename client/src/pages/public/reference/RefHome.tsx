import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CallIcon from '@mui/icons-material/Call';
import VerifiedIcon from '@mui/icons-material/Verified';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import PrecisionManufacturingOutlinedIcon from '@mui/icons-material/PrecisionManufacturingOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import SanitizerOutlinedIcon from '@mui/icons-material/SanitizerOutlined';

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import './reference.css';

import { CLINIC, whatsappLink } from '@/lib/clinic';
import { IMG } from '@/data/images';
import { useTreatments, useDoctors, useTestimonials } from '@/lib/queries';
import { usePageMeta } from '@/lib/usePageMeta';
import { RefSlider } from './RefSlider';
import { CompareSlider } from './CompareSlider';
import { CountUp } from './CountUp';

// Short display names for the 12 treatments (slider tiles / footer links).
const SHORT: Record<string, string> = {
  'dental-implants': 'Dental Implants',
  'root-canal-treatment': 'Root Canal Treatment',
  'braces-and-aligners': 'Braces & Aligners',
  'crowns-and-bridges': 'Crowns & Bridges',
  'cosmetic-dentistry': 'Cosmetic Dentistry',
  'tooth-coloured-fillings': 'Tooth-Coloured Fillings',
  'teeth-cleaning-gum-care': 'Cleaning & Gum Care',
  'tooth-extraction-oral-surgery': 'Extraction & Oral Surgery',
  'pediatric-dentistry': "Children's Dentistry",
  dentures: 'Dentures',
  'preventive-dentistry': 'Preventive Check-ups',
  'emergency-dental-care': 'Emergency Dental Care',
};

const CLINIC_SPACES = [
  { img: IMG.clinicTreatmentRoomWide, t: 'Modern Treatment Room' },
  { img: IMG.clinicDesk, t: 'Reception Desk' },
  { img: IMG.clinicWaiting, t: 'Comfortable Waiting Area' },
  { img: IMG.clinicCeiling, t: 'Bright, Clean Operatory' },
  { img: IMG.clinicLogoWall, t: 'Our Signature Logo Wall' },
  { img: IMG.clinicEntrance, t: 'Ground-Floor Entrance' },
  { img: IMG.clinicQuoteWall, t: 'Make Your Smile Brighter' },
];

const TECH = [
  { img: IMG.clinicTreatmentRoomWide, t: 'Fully Equipped Dental Chair' },
  { img: IMG.clinicCeiling, t: 'LED-Lit Treatment Room' },
  { img: IMG.clinicCertificatesWide, t: 'Qualified & Registered Dentist' },
  { img: IMG.clinicCertificatesShelf, t: 'Certificates & Training' },
];

const WHY = [
  { icon: <ScheduleIcon />, t: 'Open Mon–Sat, Two Sessions', d: 'Morning 10 AM – 2:30 PM and evening 6 – 10:30 PM; Sundays by appointment.' },
  { icon: <SchoolOutlinedIcon />, t: 'Qualified Dental Surgeon', d: 'Dr. Afaque Khan — BDS (MUHS), Reg. No. A-47915, 5+ years of experience.' },
  { icon: <MedicalServicesOutlinedIcon />, t: 'Dental & Implant Centre', d: 'Implants and complete tooth replacement planned right here in the clinic.' },
  { icon: <SpaOutlinedIcon />, t: 'Painless-First Approach', d: 'Gentle techniques and clear explanations at every step of treatment.' },
  { icon: <SanitizerOutlinedIcon />, t: 'Strict Sterilisation', d: 'Instruments sterilised and surfaces disinfected for every single patient.' },
  { icon: <StarRoundedIcon />, t: '5.0★ Rated on Google', d: 'Rated five stars by our patients on our Google Business listing.' },
];

const BEFORE_AFTER = [
  { t: 'Front Tooth Restoration', b: '/images/clinic/result-restoration-before.webp', a: '/images/clinic/result-restoration-after.webp' },
  { t: 'Decay Removal & Filling', b: '/images/clinic/result-filling-before.webp', a: '/images/clinic/result-filling-after.webp' },
];

function ToothSvg({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <path
        d="M22 12.1c-2.2-1.3-4.3-1.3-6-.5-2.5 1.1-3.8 3.5-3.8 6.4 0 2.6.7 5 1.3 7.3.5 1.9 1 3.9 1.5 5.6.3 1.2.9 2.3 2 2.3 1 0 1.4-1 1.7-2.3.3-1.1.6-2.4 1.2-3.1.4-.5 1-.8 2.1-.8s1.7.3 2.1.8c.6.7.9 2 1.2 3.1.3 1.3.7 2.3 1.7 2.3 1.1 0 1.7-1.1 2-2.3.5-1.7 1-3.7 1.5-5.6.6-2.3 1.3-4.7 1.3-7.3 0-2.9-1.3-5.3-3.8-6.4-1.7-.8-3.8-.8-6 .5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleG({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-label="Google">
      <path fill="#FBBC05" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
      <path fill="#EA4335" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
      <path fill="#34A853" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
      <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => (
        <StarRoundedIcon key={i} />
      ))}
    </>
  );
}

export default function RefHome() {
  usePageMeta();
  const { data: treatments } = useTreatments();
  const { data: doctors } = useDoctors();
  const { data: testimonials } = useTestimonials();
  const doctor = doctors?.[0];

  const [menuOpen, setMenuOpen] = useState(false);
  const [subOpen, setSubOpen] = useState<'about' | 'treat' | null>(null);
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showDock, setShowDock] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    // rootMargin: the fixed 78px header hides the top of the screen, so a row tucked under it counts as scrolled away
    const io = new IntersectionObserver(
      ([e]) => setShowDock(!e.isIntersecting && e.boundingClientRect.top < 78),
      { rootMargin: '-78px 0px 0px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setSubOpen(null);
  };

  return (
    <div className="ref">
      {/* ── 1 · Header ── */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="cf">
          <Link to="/" className="logo" aria-label="Bright Smile Dental Clinic — home">
            <img src="/images/logo-brightsmile.webp" alt="Dr. Afaque's Bright Smile Dental Clinic & Implant Centre" />
          </Link>
          <button type="button" className="btnMenu" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <MenuRoundedIcon />
          </button>
        </div>
      </header>
      <div className="headerSpacer" aria-hidden="true" />

      {/* ── 2 · Off-canvas menu ── */}
      <div className={`offcanvas ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="oc-head">
          <img src="/images/logo-brightsmile.webp" alt="Bright Smile" />
          <button type="button" className="btnMenu" aria-label="Close menu" onClick={closeMenu}>
            <CloseRoundedIcon />
          </button>
        </div>
        <nav className="oc-body">
          <button type="button" className="oc-link" onClick={() => setSubOpen(subOpen === 'about' ? null : 'about')}>
            About Us {subOpen === 'about' ? <ExpandMoreRoundedIcon fontSize="small" /> : <ChevronRightRoundedIcon fontSize="small" />}
          </button>
          {subOpen === 'about' && (
            <div className="oc-sub">
              <Link to="/about" onClick={closeMenu}>About the Clinic</Link>
              <Link to="/dentist" onClick={closeMenu}>Dr. Afaque Khan</Link>
            </div>
          )}
          <button type="button" className="oc-link" onClick={() => setSubOpen(subOpen === 'treat' ? null : 'treat')}>
            Treatments {subOpen === 'treat' ? <ExpandMoreRoundedIcon fontSize="small" /> : <ChevronRightRoundedIcon fontSize="small" />}
          </button>
          {subOpen === 'treat' && (
            <div className="oc-sub">
              {(treatments ?? []).map((t) => (
                <Link key={t.slug} to={`/treatments/${t.slug}`} onClick={closeMenu}>
                  {SHORT[t.slug] ?? t.name}
                </Link>
              ))}
            </div>
          )}
          <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
          <Link to="/reviews" onClick={closeMenu}>Reviews</Link>
          <Link to="/book-appointment" onClick={closeMenu}>Book Appointment</Link>
          <Link to="/contact" onClick={closeMenu}>Contact us</Link>
        </nav>
        <div className="oc-foot">
          Follow Us
          <div className="soc">
            <a href={CLINIC.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon />
            </a>
          </div>
        </div>
      </div>

      <main>
        {/* ── 3 · Hero ── */}
        <section className="mobileHero" style={{ backgroundImage: `url(${IMG.clinicTreatmentRoomWide})`, backgroundPosition: 'right 62%' }}>
          <div className="cf">
            <div className="heroCol">
              <h1 className="large_heading">Gentle Dental Care in Bhiwandi</h1>
              <p className="heroSub">
                <AccessTimeFilledIcon /> Open 6 Days a Week
              </p>
            </div>
          </div>
        </section>

        {/* ── 4 · Badge card ── */}
        <div className="bottomBanner">
          <div className="cf">
            <div className="bbCard">
              <div className="bbItem">
                <span className="ic"><GoogleG /></span>
                <p className="v">{CLINIC.googleRating}</p>
                <p className="l">Google Rating</p>
                <span className="stars"><Stars /></span>
              </div>
              <div className="bbItem">
                <span className="ic"><SchoolOutlinedIcon /></span>
                <p className="l">BDS (MUHS)<br />Qualified</p>
              </div>
              <div className="bbItem">
                <span className="ic"><EmojiEventsOutlinedIcon /></span>
                <p className="l">Dental Clinic<br />&amp; Implant<br />Centre</p>
              </div>
              <div className="bbItem">
                <span className="ic"><ScheduleIcon /></span>
                <p className="v">6 Days</p>
                <p className="l">Open a Week</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── 5 · Book / WhatsApp ── */}
        <div className="cf">
          <div className="ctaRow" ref={ctaRef}>
            <Link to="/book-appointment" className="btnTheme btnNavy">
              <CalendarMonthIcon /> Book Appointment
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btnTheme btnWa">
              <WhatsAppIcon /> WhatsApp Now
            </a>
          </div>
        </div>

        {/* ── 6 · Stats card ── */}
        <section className="sec">
          <div className="cf">
            <div className="statCard">
              <div className="statItem">
                <span className="ic"><ToothSvg size={28} /></span>
                <p className="v"><CountUp to={12} suffix="+" /></p>
                <p className="l">Treatments</p>
              </div>
              <div className="statItem">
                <span className="ic"><GroupsIcon /></span>
                <p className="v"><CountUp to={400} suffix="+" /></p>
                <p className="l">Happy Patients</p>
              </div>
              <div className="statItem">
                <span className="ic"><WorkspacePremiumIcon /></span>
                <p className="v"><CountUp to={5} suffix="+" /></p>
                <p className="l">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7 · Doctor ── */}
        <section className="sec">
          <div className="cf">
            <p className="eyebrow">Meet Your Dentist</p>
            <h2 className="h2">Expert Care, Gentle Hands</h2>
            <article className="docCard">
              <div className="docPhoto">
                <img src={IMG.doctorPortrait} alt="Dr. Afaque Khan, Dental Surgeon & Implantologist at Bright Smile" />
                <span className="docRating"><StarRoundedIcon /> {CLINIC.googleRating} Google</span>
                <span className="docReg"><VerifiedIcon /> Reg. No. A-47915</span>
              </div>
              <div className="docBody">
                <h3>{doctor?.fullName ?? 'Dr. Afaque Khan'}</h3>
                <p className="docRole">Dental Surgeon &amp; Implantologist</p>
                <p className="docQual">BDS (MUHS) · Founder, Bright Smile Dental Clinic</p>
                <div className="docFacts">
                  <div><b>{doctor?.experienceYears ?? 5}+</b><span>Years Experience</span></div>
                  <div><b>BDS</b><span>MUHS Qualified</span></div>
                  <div><b>{doctor?.languages.length ?? 3}</b><span>Languages</span></div>
                </div>
                <p className="docBio">
                  Known for gentle, painless treatment and honest advice — Dr. Khan explains every
                  option clearly so you can decide with confidence. Speaks English, Hindi &amp; Marathi.
                </p>
                <div className="docTags">
                  <span>Dental Implants</span>
                  <span>Root Canal</span>
                  <span>Smile Makeovers</span>
                  <span>Kids&apos; Dentistry</span>
                </div>
                <div className="docBtns">
                  <Link to="/dentist" className="btnTheme btnBlueO">View Profile</Link>
                  <Link to="/book-appointment" className="btnTheme btnNavy"><CalendarMonthIcon /> Book a Visit</Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ── 8 · Emergency band ── */}
        <section className="sec band center">
          <div className="cf">
            <div className="bandTop">
              <div className="iconNew"><ToothSvg /></div>
              <div style={{ textAlign: 'left' }}>
                <h2>Tooth pain? Don&apos;t wait.</h2>
                <p className="sub">Same-day visits during clinic hours.</p>
              </div>
            </div>
            <a href={CLINIC.phoneHref} className="callPill">
              <span className="ci"><CallIcon /></span>
              <span style={{ textAlign: 'left' }}>
                <p className="t1">Call Now</p>
                <p className="t2">{CLINIC.phone}</p>
              </span>
            </a>
            <p className="hrs">Mon–Sat · 10–2:30 &amp; 6–10:30 · Sun by appointment</p>
          </div>
        </section>

        {/* ── 9 · Clinic spaces slider ── */}
        <section className="sec">
          <div className="cf">
            <p className="eyebrow">Features &amp; Excellence</p>
            <h2 className="h2">A Modern, Newly Built Clinic</h2>
            <div style={{ marginTop: 24 }}>
              <RefSlider show={3} showWide={4}>
                {CLINIC_SPACES.map((s) => (
                  <div className="featItem" key={s.t}>
                    <img src={s.img} alt={s.t} loading="lazy" />
                    <h4>{s.t}</h4>
                  </div>
                ))}
              </RefSlider>
            </div>
          </div>
        </section>

        {/* ── 10 · Spotlight ── */}
        <section className="sec spot center">
          <div className="cf">
            <div className="spotLogo">
              <svg viewBox="0 0 70 26" fill="none" aria-hidden="true">
                <path d="M4 6c8 14 54 14 62 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <span className="wm">dental <b>implants</b></span>
            </div>
            <h2 className="h2">
              Fixed Teeth That Feel Natural.
              <span className="g">Planned With Care.</span>
            </h2>
            <p className="lead">
              Replace missing teeth with implants placed and restored at our implant centre — assessed
              and explained clearly before any treatment begins.
            </p>
            <div className="spotList">
              <div className="spotRow">
                <span className="ic"><VisibilityOffOutlinedIcon /></span>
                <div>
                  <h3>Natural Look &amp; Feel</h3>
                  <p>Crowns matched to the colour of your own teeth.</p>
                </div>
              </div>
              <div className="spotRow">
                <span className="ic"><PrecisionManufacturingOutlinedIcon /></span>
                <div>
                  <h3>Built to Last</h3>
                  <p>Titanium implants that bond with the jawbone for lasting strength.</p>
                </div>
              </div>
              <div className="spotRow">
                <span className="ic"><EventAvailableOutlinedIcon /></span>
                <div>
                  <h3>Clear Step-by-Step Plan</h3>
                  <p>Every stage explained before we begin.</p>
                </div>
              </div>
            </div>
            <Link to="/treatments/dental-implants" className="btnTheme btnNavy">Know More</Link>
          </div>
        </section>

        {/* ── 11 · Treatments slider ── */}
        <section className="sec">
          <div className="cf">
            <h2 className="h2" style={{ marginTop: 0 }}>All Treatments Under 1 Roof</h2>
            <div style={{ marginTop: 16 }}>
              <RefSlider show={3} showWide={5}>
                {(treatments ?? []).map((t) => (
                  <Link className="trItem" key={t.slug} to={`/treatments/${t.slug}`} style={{ display: 'block' }}>
                    <img src={t.imageUrl ?? IMG.clinicTreatmentRoom} alt={t.name} loading="lazy" />
                    <p>{SHORT[t.slug] ?? t.name}</p>
                  </Link>
                ))}
              </RefSlider>
            </div>
          </div>
        </section>

        {/* ── 12 · Technology slider ── */}
        <section className="sec bgGray">
          <div className="cf">
            <h2 className="h2" style={{ marginTop: 0 }}>Clinic &amp; Equipment</h2>
            <p className="lead">
              Comprehensive dental care — from check-ups and fillings to implants and extractions — all
              in our clean, modern clinic.
            </p>
            <div style={{ marginTop: 24 }}>
              <RefSlider show={2} showWide={3}>
                {TECH.map((s) => (
                  <div className="techItem" key={s.t}>
                    <div className="techCard">
                      <img src={s.img} alt={s.t} loading="lazy" />
                      <div className="body"><h3>{s.t}</h3></div>
                    </div>
                  </div>
                ))}
              </RefSlider>
            </div>
          </div>
        </section>

        {/* ── 13 · Treatment specialties accordion ── */}
        <section className="sec">
          <div className="cf">
            <h2 className="h2 navy center" style={{ marginTop: 0 }}>Treatment Specialties</h2>
            <div className="accList">
              {(treatments ?? []).map((t) => {
                const open = openAcc === t.slug;
                return (
                  <div
                    key={t.slug}
                    className="itemBoxTab"
                    role="button"
                    tabIndex={0}
                    aria-expanded={open}
                    onClick={() => setOpenAcc(open ? null : t.slug)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setOpenAcc(open ? null : t.slug)}
                  >
                    <h3>
                      {SHORT[t.slug] ?? t.name} <span>{open ? '−' : '+'}</span>
                    </h3>
                    {open && (
                      <>
                        <ul>
                          {(t.includes ?? []).map((i) => (
                            <li key={i}>{i}</li>
                          ))}
                        </ul>
                        <Link className="more" to={`/treatments/${t.slug}`} onClick={(e) => e.stopPropagation()}>
                          View details →
                        </Link>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 14 · Why choose us ── */}
        <section className="sec bgGray">
          <div className="cf">
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="h2">Why Choose Bright Smile Dental Clinic?</h2>
            <p className="lead" style={{ marginTop: 4 }}>
              Modern, honest and affordable dental care. We pride ourselves on gentle treatment and on
              explaining every option clearly — your comfort is our top priority.
            </p>
            <div className="whyList">
              {WHY.map((w) => (
                <div className="whyItem" key={w.t}>
                  <span className="ic">{w.icon}</span>
                  <div>
                    <h3>{w.t}</h3>
                    <p>{w.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 15 · Virtual tour ── */}
        <section className="sec">
          <div className="cf">
            <h2 className="h2 navy center" style={{ marginTop: 0 }}>Take a Look Inside Bright Smile</h2>
            <a className="tour" href={CLINIC.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Watch clinic videos on Instagram">
              <img src={IMG.clinicLogoWall} alt="Inside Bright Smile Dental Clinic" loading="lazy" />
              <span className="play"><PlayArrowRoundedIcon /></span>
            </a>
          </div>
        </section>

        {/* ── 16 · Before & after ── */}
        <section className="sec bgGray">
          <div className="cf">
            <p className="eyebrow">Real Results</p>
            <h2 className="h2">Before &amp; After</h2>
            <p className="lead">Real patient results at Bright Smile — drag the handle to compare.</p>
            <div className="baRow">
              {BEFORE_AFTER.map((c) => (
                <div className="baItem" key={c.t}>
                  <CompareSlider before={c.b} after={c.a} alt={c.t} />
                  <h3>{c.t}</h3>
                </div>
              ))}
            </div>
            <div className="center" style={{ marginTop: 16 }}>
              <Link to="/gallery" className="btnTheme btnNavy">View Full Gallery</Link>
            </div>
          </div>
        </section>

        {/* ── 17 · Patient reviews ── */}
        <section className="sec">
          <div className="cf">
            <p className="eyebrow">Patient Reviews</p>
            <h2 className="h2">Loved by Our Patients</h2>
            <p className="lead">Real reviews from Bright Smile patients on Google.</p>
            <p className="rating">
              <span className="st"><Stars /></span> <b>{CLINIC.googleRating}</b> / 5 on Google
            </p>
            <div style={{ marginTop: 18 }}>
              <RefSlider show={1} showWide={2} interval={4000} arrows={false} dots className="revSlider">
                {(testimonials ?? []).map((t) => (
                  <div key={t.id} className="revSlide">
                    <article className="revCard">
                      <div className="revTop">
                        <span className="revStars" aria-label={`${t.rating} out of 5 stars`}><Stars n={t.rating} /></span>
                        <GoogleG size={20} />
                      </div>
                      <p className="revText">&ldquo;{t.content}&rdquo;</p>
                      <div className="revWho">
                        <span className="av">{t.patientName.charAt(0)}</span>
                        <div>
                          <div className="nm">{t.patientName}</div>
                          <div className="src"><VerifiedIcon /> {[t.treatment, 'Google review'].filter(Boolean).join(' · ')}</div>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </RefSlider>
            </div>
            <div className="center" style={{ marginTop: 16 }}>
              <a href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer" className="btnTheme btnNavy">
                View All Reviews
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── 18 · Footer ── */}
      <footer className="footer">
        <div className="cf">
          <span className="flogo"><img src="/images/logo-brightsmile.webp" alt="Bright Smile Dental Clinic" /></span>
          <p className="about">
            At Bright Smile Dental Clinic &amp; Implant Centre, we treat every patient like family. With
            modern equipment, strict sterilisation and gentle care from Dr. Afaque Khan, we deliver
            comprehensive dental treatment in a calm, welcoming environment.
          </p>

          <h4>Treatment</h4>
          <div className="fGrid">
            {(treatments ?? []).map((t) => (
              <Link key={t.slug} className="fl" to={`/treatments/${t.slug}`}>
                {SHORT[t.slug] ?? t.name}
              </Link>
            ))}
          </div>

          <h4>Contact Us</h4>
          <a className="fc" href={CLINIC.phoneHref}><CallIcon /> {CLINIC.phone}</a>
          <a className="fc" href={whatsappLink()} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp {CLINIC.phone}</a>
          <a className="fc" href={`mailto:${CLINIC.email}`}><EmailOutlinedIcon /> {CLINIC.email}</a>
          <span className="fc" style={{ display: 'flex', gap: 6, fontSize: 13, lineHeight: '19.5px', padding: '5px 0' }}>
            <AccessTimeIcon sx={{ fontSize: 15, mt: '2px' }} /> Mon–Sat: 10 AM – 2:30 PM &amp; 6 – 10:30 PM · Sun: by appointment
          </span>
          <a className="fc" href={CLINIC.mapsUrl} target="_blank" rel="noopener noreferrer"><PlaceIcon /> {CLINIC.address}</a>

          <div className="fSoc">
            <a href={CLINIC.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
            <a href={`mailto:${CLINIC.email}`} aria-label="Email"><EmailOutlinedIcon /></a>
          </div>

          <div className="fBottom">
            <p className="cp">© {new Date().getFullYear()} Bright Smile Dental Clinic. All rights reserved.</p>
            <div className="links">
              <Link to="/gallery">Gallery</Link>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Services</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ── 19 · Go-top + fixed bottom bar ── */}
      <button
        type="button"
        className={`goTop ${scrolled ? 'show' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpwardRoundedIcon />
      </button>
      <nav className={`footerBottom ${showDock ? 'show' : ''}`} aria-label="Quick actions" aria-hidden={!showDock}>
        <a href={CLINIC.phoneHref} tabIndex={showDock ? 0 : -1}>
          <CallIcon /> Call
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" tabIndex={showDock ? 0 : -1}>
          <WhatsAppIcon /> WhatsApp
        </a>
        <Link to="/book-appointment" tabIndex={showDock ? 0 : -1}>
          <CalendarMonthIcon /> Book
        </Link>
      </nav>
    </div>
  );
}
