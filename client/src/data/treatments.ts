// Treatment catalog — the clinic's REAL services, supplied by the owner on
// 16 Oct 2026 ("Our Dental Treatments", 12 services with their included
// procedures). Prices are intentionally 0/0 → shown as "On consultation"
// until the owner publishes fees. `related` is computed below.
import type { Treatment } from '@/lib/types';

type BaseTreatment = Omit<Treatment, 'related'>;

const BASE: BaseTreatment[] = [
  {
    id: 1,
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'Implants & Surgery',
    icon: 'implant',
    imageUrl: '/images/dental-surgery.jpg',
    shortDesc: 'Permanent, natural-looking replacement for one tooth, several teeth, or a full smile.',
    overview:
      'A dental implant is a small titanium post that takes the place of a missing tooth root, topped with a crown that looks and works like a natural tooth. It is the closest modern dentistry comes to growing a tooth back — stable, comfortable, and kind to the neighbouring teeth.\n\nAt Bright Smile Dental Clinic & Implant Centre, every implant journey starts with a consultation and careful treatment planning, so you know exactly what to expect before anything begins.',
    includes: [
      'Single Tooth Replacement',
      'Multiple Tooth Replacement',
      'Full-Mouth Dental Implants',
      'Implant-Supported Crowns and Bridges',
      'Implant Consultation and Treatment Planning',
    ],
    symptoms: [
      'One or more missing teeth',
      'A loose or failing bridge or denture',
      'Difficulty chewing comfortably',
      'A gap that affects your confidence',
      'Bone loss after an old extraction',
    ],
    process: [
      { title: 'Consultation & Planning', description: 'We examine your mouth, discuss options, and plan the implant position and timeline.' },
      { title: 'Implant Placement', description: 'The implant is placed gently under local anaesthesia — most patients are surprised how comfortable it is.' },
      { title: 'Healing Period', description: 'Over a few months the implant bonds with your bone, forming a solid foundation.' },
      { title: 'Crown or Bridge Fitting', description: 'A custom crown or bridge is fixed on top, matched to your natural teeth.' },
    ],
    benefits: [
      'Looks, feels and works like a natural tooth',
      'Does not grind down neighbouring teeth',
      'Helps preserve the jawbone',
      'A long-lasting solution with good care',
      'From a single tooth to a full mouth',
    ],
    recovery:
      'Mild soreness for a couple of days is normal and settles with simple pain relief. Most patients return to work the next day; we guide you on eating and cleaning while it heals.',
    faqs: [
      { question: 'Is getting an implant painful?', answer: 'The placement is done under local anaesthesia, so you feel pressure but not pain. Most patients say it was easier than they expected.' },
      { question: 'How long do implants last?', answer: 'With good oral hygiene and regular check-ups, implants can last many years — often decades.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 60,
    isFeatured: true,
  },
  {
    id: 2,
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    category: 'Root Canal & Fillings',
    icon: 'tooth',
    imageUrl: '/images/dental-xray-review.jpg',
    shortDesc: 'Save a badly decayed or infected tooth — gently, and in a single visit where suitable.',
    overview:
      'A root canal treatment (RCT) removes infection from inside the tooth so you can keep your natural tooth instead of losing it. Modern techniques make the procedure far more comfortable than its old reputation suggests.\n\nWhere the tooth is suitable, we complete the treatment in a single visit, and protect the result with a crown so the tooth stays strong for years.',
    includes: [
      'Root Canal Treatment (RCT)',
      'Single-Visit Root Canal Treatment, where suitable',
      'Re-Root Canal Treatment',
      'Post and Core Treatment',
      'Dental Crowns After Root Canal Treatment',
    ],
    symptoms: [
      'Severe toothache, especially while chewing',
      'Lingering sensitivity to hot or cold',
      'A darkened or discoloured tooth',
      'Swelling or a pimple-like spot on the gum',
      'Pain that wakes you at night',
    ],
    process: [
      { title: 'Diagnosis & X-ray', description: 'We confirm the infection and explain whether a single-visit RCT is suitable for your tooth.' },
      { title: 'Gentle Cleaning', description: 'Under local anaesthesia, the infected tissue is removed and the canals are cleaned and shaped.' },
      { title: 'Sealing', description: 'The canals are filled and sealed to keep the infection from returning.' },
      { title: 'Crown Protection', description: 'A crown is placed over the treated tooth to restore full strength and chewing comfort.' },
    ],
    benefits: [
      'Keeps your natural tooth',
      'Relieves the pain of infection quickly',
      'Single-visit option where suitable',
      'Re-treatment available for old root canals',
      'Crown protection for long-term strength',
    ],
    recovery:
      'Mild tenderness for a day or two is normal. Avoid chewing hard food on the tooth until the final crown is fitted.',
    faqs: [
      { question: 'Is a root canal painful?', answer: 'No — the treatment is done under local anaesthesia and actually relieves the pain the infection was causing.' },
      { question: 'Do I really need a crown afterwards?', answer: 'In most cases yes. A treated tooth becomes brittle, and a crown protects it from cracking.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 60,
    isFeatured: true,
  },
  {
    id: 3,
    slug: 'braces-and-aligners',
    name: 'Braces & Teeth Alignment',
    category: 'Orthodontics',
    icon: 'braces',
    imageUrl: '/images/clear-aligner.jpg',
    shortDesc: 'Straighten crooked teeth, close gaps, and correct your bite — with braces or clear aligners.',
    overview:
      'Well-aligned teeth are easier to clean, more comfortable to chew with, and great for confidence. We offer the full range of alignment options — classic metal braces, less-visible ceramic braces, and removable clear aligners.\n\nAfter an assessment, we recommend the option that fits your teeth, your lifestyle, and your budget, and guide you through every adjustment until the result is right.',
    includes: [
      'Metal Braces',
      'Ceramic Braces',
      'Clear Aligners',
      'Correction of Crooked Teeth',
      'Correction of Spacing Between Teeth',
      'Bite Correction',
    ],
    symptoms: [
      'Crooked or crowded teeth',
      'Gaps between teeth',
      'Upper and lower teeth that do not meet properly',
      'Difficulty cleaning overlapping teeth',
      'Hesitating to smile in photos',
    ],
    process: [
      { title: 'Alignment Assessment', description: 'We study your teeth and bite, and discuss which option — metal, ceramic, or aligners — suits you best.' },
      { title: 'Fitting / First Aligners', description: 'Braces are fitted, or your first set of clear aligners is delivered with full instructions.' },
      { title: 'Regular Adjustments', description: 'Short periodic visits keep your teeth moving on plan.' },
      { title: 'Retention', description: 'Once aligned, retainers keep your new smile in place.' },
    ],
    benefits: [
      'Straighter, easier-to-clean teeth',
      'Better bite and chewing comfort',
      'Nearly invisible options available',
      'Suitable for teens and adults',
      'A confident, lasting smile',
    ],
    recovery:
      'Some pressure for a few days after each adjustment or new aligner is normal and fades quickly.',
    faqs: [
      { question: 'Braces or clear aligners — which is better?', answer: 'It depends on your teeth and lifestyle. Aligners are nearly invisible and removable; braces handle some corrections more efficiently. We advise honestly after examining you.' },
      { question: 'How long does alignment take?', answer: 'Most treatments take months to a couple of years depending on the correction needed. We give you a realistic estimate at the assessment.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 45,
    isFeatured: true,
  },
  {
    id: 4,
    slug: 'crowns-and-bridges',
    name: 'Dental Crowns & Bridges',
    category: 'Restorative',
    icon: 'crown',
    imageUrl: '/images/dental-examination.jpg',
    shortDesc: 'Strong, natural-looking caps and bridges to restore damaged or missing teeth.',
    overview:
      'A crown is a custom cap that restores a weak, broken, or root-canal-treated tooth to full strength and appearance. A bridge uses crowns on neighbouring teeth to replace one or more missing teeth without surgery.\n\nWe offer zirconia, ceramic, and metal-ceramic options and help you choose the right balance of strength, appearance, and budget for each tooth.',
    includes: [
      'Zirconia Crowns',
      'Ceramic Crowns',
      'Metal-Ceramic Crowns',
      'Dental Bridges',
      'Replacement of Damaged or Missing Teeth',
    ],
    symptoms: [
      'A cracked, chipped, or badly worn tooth',
      'A tooth weakened by a large filling or root canal',
      'One or more missing teeth',
      'A discoloured or misshapen tooth',
    ],
    process: [
      { title: 'Tooth Preparation', description: 'The tooth is shaped to make room for the crown, comfortably under local anaesthesia.' },
      { title: 'Impressions', description: 'Precise impressions are taken so your crown or bridge fits perfectly.' },
      { title: 'Temporary Protection', description: 'A temporary crown protects the tooth while your final one is crafted.' },
      { title: 'Final Fitting', description: 'The finished crown or bridge is checked for fit, bite, and shade, then fixed in place.' },
    ],
    benefits: [
      'Restores full chewing strength',
      'Natural, tooth-coloured options (zirconia/ceramic)',
      'Protects weakened teeth from fracture',
      'Replaces missing teeth without surgery',
    ],
    recovery:
      'You can eat normally once the final crown is cemented; slight sensitivity for a few days is normal.',
    faqs: [
      { question: 'Which crown material is best?', answer: 'Zirconia and ceramic look most natural and are metal-free; metal-ceramic is a durable, economical choice for back teeth. We recommend per tooth.' },
      { question: 'How long do crowns last?', answer: 'Typically many years — good brushing, flossing, and regular check-ups make the biggest difference.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 45,
    isFeatured: false,
  },
  {
    id: 5,
    slug: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry & Smile Makeovers',
    category: 'Cosmetic',
    icon: 'sparkle',
    imageUrl: '/images/happy-patient.jpg',
    shortDesc: 'Teeth whitening, veneers, bonding, and complete smile designing — the smile you want.',
    overview:
      'Cosmetic dentistry is about helping you smile without hesitation. From brightening your natural teeth to reshaping chipped edges or designing a complete makeover, each plan is personal and starts with what YOU want to change.\n\nWe always show you what is achievable before we begin, and we only recommend what genuinely suits your face and your teeth.',
    includes: [
      'Teeth Whitening',
      'Dental Veneers',
      'Smile Designing',
      'Cosmetic Dental Bonding',
      'Tooth-Coloured Restorations',
      'Aesthetic Dental Rehabilitation',
    ],
    symptoms: [
      'Stained or yellowed teeth',
      'Chipped or uneven front teeth',
      'Small gaps you would like closed',
      'Old dark fillings that show when you smile',
      'A smile you hide in photos',
    ],
    process: [
      { title: 'Smile Consultation', description: 'We listen to what you want to change and examine your teeth, gums, and smile line.' },
      { title: 'Personal Plan', description: 'You get a clear plan — whitening, bonding, veneers, or a combination — with honest advice.' },
      { title: 'Treatment', description: 'The work is done gently and precisely, often in just one or two visits.' },
      { title: 'Final Polish & Review', description: 'We fine-tune shade and shape until you love the result.' },
    ],
    benefits: [
      'A visibly brighter, more even smile',
      'Minimally invasive options first',
      'Natural-looking, tooth-coloured materials',
      'Boosted confidence in photos and person',
    ],
    recovery:
      'Most cosmetic treatments need no downtime. Mild sensitivity after whitening settles within a day or two.',
    faqs: [
      { question: 'Is teeth whitening safe?', answer: 'Yes — professional whitening done under dental supervision is safe for your enamel. We check your teeth first and choose the right strength.' },
      { question: 'What is a smile makeover?', answer: 'A personalised combination of treatments — whitening, bonding, veneers, alignment — planned together to improve your whole smile.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 60,
    isFeatured: true,
  },
  {
    id: 6,
    slug: 'tooth-coloured-fillings',
    name: 'Tooth-Coloured Fillings',
    category: 'Root Canal & Fillings',
    icon: 'filling',
    imageUrl: '/images/dental-procedure.jpg',
    shortDesc: 'Invisible composite fillings for cavities, chips, and replacing old metal fillings.',
    overview:
      'Cavities happen — the fix should be invisible. Composite (tooth-coloured) fillings bond directly to your tooth, restoring strength while matching the natural shade so nobody can tell where the cavity was.\n\nWe also replace old or failing fillings and rebuild broken or chipped corners of teeth in a single visit.',
    includes: [
      'Composite Fillings',
      'Treatment of Dental Cavities',
      'Replacement of Old Fillings',
      'Restoration of Broken or Chipped Teeth',
    ],
    symptoms: [
      'A visible hole or dark spot on a tooth',
      'Food catching between or inside teeth',
      'Sensitivity to sweets, hot, or cold',
      'An old filling that is cracked or stained',
      'A chipped corner of a tooth',
    ],
    process: [
      { title: 'Cavity Check', description: 'We locate the decay and confirm how deep it goes.' },
      { title: 'Gentle Removal', description: 'The decayed part is removed, keeping as much healthy tooth as possible.' },
      { title: 'Layered Filling', description: 'Composite is bonded in thin layers and shaped to your natural anatomy.' },
      { title: 'Bite Polish', description: 'The filling is checked against your bite and polished smooth.' },
    ],
    benefits: [
      'Matches your natural tooth shade',
      'Usually completed in one visit',
      'Preserves healthy tooth structure',
      'Stops decay before it reaches the nerve',
    ],
    recovery:
      'You can eat as soon as any numbness wears off. Brief sensitivity near a deep filling is normal.',
    faqs: [
      { question: 'How long do composite fillings last?', answer: 'Typically several years or more with good care. We check them at every routine visit.' },
      { question: 'Should I replace my old metal fillings?', answer: 'Only if they are failing, cracked, or you want a natural look — we advise honestly rather than replacing for the sake of it.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 30,
    isFeatured: false,
  },
  {
    id: 7,
    slug: 'teeth-cleaning-gum-care',
    name: 'Teeth Cleaning & Gum Care',
    category: 'Preventive',
    icon: 'cleaning',
    imageUrl: '/images/dentist-with-patient.jpg',
    shortDesc: 'Professional scaling and polishing, gum disease care, and healthy-gum coaching.',
    overview:
      'Healthy gums are the foundation of every healthy smile. Professional cleaning removes the plaque and tartar that brushing cannot, keeping gums firm, breath fresh, and teeth secure.\n\nIf gums are already inflamed or bleeding, we treat gingivitis and provide periodontal care to stop the problem from progressing — and show you how to keep it away.',
    includes: [
      'Professional Teeth Cleaning (Scaling and Polishing)',
      'Gum Disease Evaluation',
      'Treatment of Gingivitis',
      'Periodontal Care',
      'Oral Hygiene Instructions',
    ],
    symptoms: [
      'Bleeding gums when brushing',
      'Bad breath that keeps returning',
      'Visible tartar near the gum line',
      'Red, swollen, or receding gums',
      'It has been over six months since your last cleaning',
    ],
    process: [
      { title: 'Gum Evaluation', description: 'We assess gum health and measure any problem areas.' },
      { title: 'Scaling', description: 'Ultrasonic scaling gently lifts away tartar above and below the gum line.' },
      { title: 'Polishing', description: 'Teeth are polished smooth so plaque struggles to stick again.' },
      { title: 'Home-Care Coaching', description: 'You leave with simple, personalised brushing and flossing guidance.' },
    ],
    benefits: [
      'Fresher breath immediately',
      'Healthier, firmer gums',
      'Prevents gum disease and tooth loss',
      'A smooth, clean feeling you can taste',
    ],
    recovery:
      'None — you can eat and drink normally right after. Slight gum tenderness settles within a day.',
    faqs: [
      { question: 'Does scaling damage or loosen teeth?', answer: 'No — this is a myth. Scaling removes the tartar that was harming your gums; any looseness you feel was caused by the tartar, not the cleaning.' },
      { question: 'How often should I get my teeth cleaned?', answer: 'Every six months for most people; more often if you are prone to tartar or gum problems.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 30,
    isFeatured: true,
  },
  {
    id: 8,
    slug: 'tooth-extraction-oral-surgery',
    name: 'Tooth Extraction & Oral Surgery',
    category: 'Implants & Surgery',
    icon: 'extraction',
    imageUrl: '/images/bright-smile.jpg',
    shortDesc: 'Gentle removal of damaged teeth and wisdom teeth, with minor oral surgery where needed.',
    overview:
      'When a tooth truly cannot be saved — or a wisdom tooth is causing pain — removing it gently and safely is the kindest option. We take time with anaesthesia so the procedure itself is comfortable, and we plan replacements before extraction wherever possible.\n\nMinor oral surgical procedures are performed where indicated, always with clear aftercare instructions.',
    includes: [
      'Simple Tooth Extraction',
      'Surgical Tooth Extraction',
      'Wisdom Tooth Removal',
      'Removal of Severely Damaged Teeth',
      'Minor Oral Surgical Procedures, where indicated',
    ],
    symptoms: [
      'A wisdom tooth causing pain or swelling',
      'A tooth broken beyond repair',
      'Severe decay below the gum line',
      'A loose tooth from advanced gum disease',
      'Recurring infection around the same tooth',
    ],
    process: [
      { title: 'Assessment & X-ray', description: 'We confirm the tooth cannot be saved and plan the safest removal.' },
      { title: 'Comfortable Anaesthesia', description: 'We make sure you are fully numb before anything begins.' },
      { title: 'Gentle Removal', description: 'The tooth is removed with modern, minimal-trauma techniques.' },
      { title: 'Aftercare Plan', description: 'Clear instructions — and replacement options — so you heal quickly and well.' },
    ],
    benefits: [
      'Immediate relief from a painful tooth',
      'Prevents infection from spreading',
      'Modern techniques, faster healing',
      'Replacement planned from day one',
    ],
    recovery:
      'Bite on gauze for the first hour and rest for the day; mild swelling settles in 2–3 days. Follow the aftercare sheet and avoid smoking while the socket heals.',
    faqs: [
      { question: 'Will the extraction hurt?', answer: 'You will feel pressure but not pain — we never start until you are completely numb.' },
      { question: 'Do all wisdom teeth need removal?', answer: 'No. Only wisdom teeth causing pain, infection, decay, or crowding need to come out — we advise after an X-ray.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 30,
    isFeatured: false,
  },
  {
    id: 9,
    slug: 'pediatric-dentistry',
    name: "Pediatric Dentistry (Children's Dentistry)",
    category: 'Preventive',
    icon: 'child',
    imageUrl: '/images/smiling-dentist.jpg',
    shortDesc: "Gentle, friendly dental care for kids — check-ups, fillings, fluoride, and milk-teeth care.",
    overview:
      'A child’s first dental experiences shape a lifetime of oral health. Our children’s dentistry is gentle, unhurried, and friendly — we help kids feel safe in the chair and make visits something they do not fear.\n\nFrom routine check-ups and fluoride protection to fillings and milk-teeth treatment, we look after growing smiles and teach great brushing habits along the way.',
    includes: [
      'Dental Check-ups for Children',
      'Fluoride Treatment',
      'Dental Fillings for Children',
      'Preventive Dental Care',
      'Treatment of Milk Teeth',
      'Oral Hygiene Education',
    ],
    symptoms: [
      'Your child complains of tooth pain',
      'Visible spots or holes on milk teeth',
      'No dental visit yet by age three',
      'Thumb-sucking or mouth-breathing habits',
      'Fear of the dentist from a past experience',
    ],
    process: [
      { title: 'Friendly Introduction', description: 'We let your child explore and get comfortable before any examination.' },
      { title: 'Gentle Check-up', description: 'Teeth and gums are checked with plenty of patience and zero pressure.' },
      { title: 'Preventive Care', description: 'Cleaning and fluoride protect young teeth against cavities.' },
      { title: 'Treatment & Coaching', description: 'Any fillings are done gently, and kids leave with fun, simple brushing instructions.' },
    ],
    benefits: [
      'Positive early dental experiences',
      'Cavity protection with fluoride',
      'Milk teeth preserved until their natural time',
      'Good habits that last a lifetime',
    ],
    recovery:
      'Children bounce back fast — most treatments need no downtime at all.',
    faqs: [
      { question: 'Milk teeth fall out anyway — why treat them?', answer: 'Milk teeth hold space for adult teeth and matter for eating and speech. Losing them too early can cause crowding problems later.' },
      { question: 'When should my child first see a dentist?', answer: 'Around their first birthday, or when the first teeth appear — early visits keep everything on track and fear-free.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 30,
    isFeatured: true,
  },
  {
    id: 10,
    slug: 'dentures',
    name: 'Dentures & Tooth Replacement',
    category: 'Restorative',
    icon: 'denture',
    imageUrl: '/images/doctor-consult.jpg',
    shortDesc: 'Comfortable complete and partial dentures, plus repair and relining where available.',
    overview:
      'Missing several teeth — or all of them — should never mean giving up comfortable eating and confident smiling. Modern dentures are lighter, better-fitting, and more natural-looking than ever.\n\nWe make complete dentures, removable partial dentures, and handle repair and relining where available, always fitted and adjusted until they feel right.',
    includes: [
      'Complete Dentures',
      'Removable Partial Dentures',
      'Replacement of Missing Teeth',
      'Denture Repair and Relining, where available',
    ],
    symptoms: [
      'Many or all teeth missing',
      'An old denture that has become loose',
      'Difficulty eating the foods you enjoy',
      'A cracked or broken denture',
    ],
    process: [
      { title: 'Assessment', description: 'We examine your gums and any remaining teeth and discuss the best type of denture for you.' },
      { title: 'Impressions & Measurements', description: 'Precise moulds ensure a snug, comfortable fit.' },
      { title: 'Try-in & Fitting', description: 'You preview the denture before it is finished; the final fit is adjusted carefully.' },
      { title: 'Review & Aftercare', description: 'Follow-up adjustments make sure eating and speaking feel natural.' },
    ],
    benefits: [
      'Eat and speak comfortably again',
      'Natural-looking replacement teeth',
      'Supports facial structure',
      'Repair and relining keep old dentures useful',
    ],
    recovery:
      'New dentures take a week or two of practice to feel natural — we schedule adjustments until yours fit perfectly.',
    faqs: [
      { question: 'Will dentures look fake?', answer: 'Modern dentures are matched to your face and natural gum shade — most people cannot tell at all.' },
      { question: 'Are implant options better than dentures?', answer: 'Implants are more fixed and stable but cost more. We explain both honestly so you can choose what fits your needs and budget.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 45,
    isFeatured: false,
  },
  {
    id: 11,
    slug: 'preventive-dentistry',
    name: 'Preventive Dentistry & Dental Check-ups',
    category: 'Preventive',
    icon: 'shield',
    imageUrl: '/images/hero-clinic-room.jpg',
    shortDesc: 'Routine examinations and early detection that keep small problems from becoming big ones.',
    overview:
      'The cheapest, most comfortable dental treatment is the one you never need. Routine check-ups let us spot cavities, gum problems, and wear at the earliest stage — when fixing them is quick and simple.\n\nEvery examination ends with honest, personalised advice and a clear plan, prioritised by what actually matters for your health.',
    includes: [
      'Routine Dental Examinations',
      'Comprehensive Oral Health Check-ups',
      'Preventive Dental Advice',
      'Early Detection of Dental Problems',
      'Personalised Treatment Planning',
    ],
    symptoms: [
      'It has been more than six months since a check-up',
      'Occasional sensitivity you keep ignoring',
      'A family history of dental problems',
      'You want a clear picture of your oral health',
    ],
    process: [
      { title: 'Full Examination', description: 'Teeth, gums, bite, and soft tissues are checked thoroughly.' },
      { title: 'Early Detection', description: 'Problems are caught at the stage where treatment is simplest.' },
      { title: 'Honest Discussion', description: 'We explain what we found in plain language — and what can safely wait.' },
      { title: 'Personal Plan', description: 'A prioritised plan matched to your health, time, and budget.' },
    ],
    benefits: [
      'Problems caught early cost less to fix',
      'No surprises — you always know where you stand',
      'A personal plan, not a sales pitch',
      'Peace of mind between visits',
    ],
    recovery: 'None — a check-up has no downtime at all.',
    faqs: [
      { question: 'How often should I have a check-up?', answer: 'Every six months suits most people. We may suggest a different interval based on your individual risk.' },
      { question: 'What if you find a problem?', answer: 'We explain it honestly, show you the options, and let you decide — nothing is ever done without your understanding.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 30,
    isFeatured: false,
  },
  {
    id: 12,
    slug: 'emergency-dental-care',
    name: 'Emergency Dental Care',
    category: 'Emergency',
    icon: 'emergency',
    imageUrl: '/images/clinic-reception.jpg',
    shortDesc: 'Urgent assessment for toothache, infections, and broken teeth — call us right away.',
    overview:
      'Dental emergencies rarely pick a convenient time. Severe toothache, swelling, or a broken tooth deserves urgent attention — both to relieve the pain and to protect the tooth.\n\nCall or WhatsApp us on +91 93712 23464 and we will guide you immediately and arrange an urgent assessment.',
    includes: [
      'Toothache Evaluation',
      'Management of Dental Infections',
      'Treatment of Broken or Chipped Teeth',
      'Emergency Dental Extractions, where indicated',
      'Urgent Dental Assessment',
    ],
    symptoms: [
      'Severe or constant toothache',
      'Swelling of the gum, cheek, or face',
      'A tooth broken in an accident',
      'A knocked-out or loosened tooth',
      'Bleeding that does not stop',
    ],
    process: [
      { title: 'Call Us First', description: 'Phone or WhatsApp — we give immediate first-aid guidance and arrange your visit.' },
      { title: 'Urgent Assessment', description: 'We find the cause fast with an examination and X-ray if needed.' },
      { title: 'Pain Relief', description: 'The first priority is getting you out of pain — today.' },
      { title: 'Definitive Treatment Plan', description: 'Once comfortable, we plan the proper fix, from fillings to RCT or extraction.' },
    ],
    benefits: [
      'Fast relief from severe pain',
      'Infections controlled before they spread',
      'Broken teeth protected and restored',
      'Clear guidance from the first phone call',
    ],
    recovery:
      'Depends on the treatment needed — we explain your aftercare clearly before you leave.',
    faqs: [
      { question: 'What should I do with a knocked-out tooth?', answer: 'Hold it by the crown (not the root), keep it moist in milk or saliva, and reach us as fast as possible — minutes matter.' },
      { question: 'What helps toothache until I reach you?', answer: 'Over-the-counter pain relief and a cold compress can help. Call us — we will guide you specifically and see you urgently.' },
    ],
    priceMin: 0,
    priceMax: 0,
    durationMin: 30,
    isFeatured: false,
  },
];

const toRelated = (t: BaseTreatment) => ({
  id: t.id,
  slug: t.slug,
  name: t.name,
  shortDesc: t.shortDesc,
  imageUrl: t.imageUrl,
  icon: t.icon,
});

export const TREATMENTS: Treatment[] = BASE.map((t) => {
  const picks = BASE.filter((o) => o.id !== t.id && o.category === t.category).slice(0, 3);
  if (picks.length < 3) {
    for (const o of BASE) {
      if (picks.length >= 3) break;
      if (o.id !== t.id && o.isFeatured && !picks.some((p) => p.id === o.id)) picks.push(o);
    }
  }
  return { ...t, related: picks.map(toRelated) };
});
