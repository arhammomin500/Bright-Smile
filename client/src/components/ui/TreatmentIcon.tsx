import type { SvgIconProps } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ConstructionIcon from '@mui/icons-material/Construction';
import GrainIcon from '@mui/icons-material/Grain';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BrushIcon from '@mui/icons-material/Brush';
import DiamondIcon from '@mui/icons-material/Diamond';
import BoltIcon from '@mui/icons-material/Bolt';
import SpaIcon from '@mui/icons-material/Spa';

// Maps a treatment "icon" key (from seed data) to a Material icon component.
const MAP: Record<string, React.ComponentType<SvgIconProps>> = {
  tooth: MedicalServicesIcon,
  sparkle: AutoAwesomeIcon,
  implant: ConstructionIcon,
  braces: GrainIcon,
  aligner: SpaIcon,
  whitening: WbSunnyIcon,
  veneer: DiamondIcon,
  smile: EmojiEmotionsIcon,
  child: ChildCareIcon,
  wisdom: BiotechIcon,
  extraction: LocalHospitalIcon,
  crown: DiamondIcon,
  denture: MedicalServicesIcon,
  gum: FavoriteIcon,
  laser: BoltIcon,
  cleaning: CleaningServicesIcon,
  filling: BrushIcon,
  rehab: HealthAndSafetyIcon,
  emergency: LocalHospitalIcon,
  shield: HealthAndSafetyIcon,
};

// `name` is omitted from SvgIconProps first to avoid clashing with the DOM
// `name` attribute (which would narrow the type and reject `string | null`).
export function TreatmentIcon({ name, ...props }: Omit<SvgIconProps, 'name'> & { name?: string | null }) {
  const Cmp = (name && MAP[name]) || MedicalServicesIcon;
  return <Cmp {...props} />;
}
