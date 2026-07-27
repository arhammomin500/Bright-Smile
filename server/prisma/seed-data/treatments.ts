import type { TreatmentSeed } from './types.js';

export const treatments: TreatmentSeed[] = [
  {
    slug: 'general-dentistry',
    name: 'General Dentistry',
    category: 'General',
    icon: 'tooth',
    imageUrl: 'https://picsum.photos/seed/general-dentistry/800/600',
    shortDesc: 'Routine checkups, diagnostics, and everyday care that keep your whole family smiling.',
    overview:
      'General dentistry is the foundation of a healthy mouth and the front line against problems before they become painful or costly. At Bright Smile Dental Clinic, our general care combines thorough examinations, digital imaging, and gentle cleanings to catch cavities, gum concerns, and wear early, when treatment is simplest.\n\nEvery visit is unhurried and personal. We take time to explain what we see, answer your questions, and build a care plan that fits your life, your budget, and your comfort level. Whether you are here for a six-month checkup or addressing a nagging concern, you are treated as a partner in your own health.\n\nRegular general care also protects more than your teeth. The mouth is a window into overall wellness, and consistent visits help us spot signs that matter far beyond your smile.',
    symptoms: [
      'It has been more than six months since your last checkup',
      'Tooth sensitivity to hot, cold, or sweet foods',
      'Bleeding or tender gums when brushing',
      'Persistent bad breath or an unpleasant taste',
      'Visible staining, chips, or rough edges',
      'General anxiety about the current state of your oral health',
    ],
    process: [
      {
        title: 'Comprehensive Exam',
        description:
          'We review your medical history and examine your teeth, gums, bite, and soft tissues for any early warning signs.',
      },
      {
        title: 'Digital Imaging',
        description:
          'Low-radiation digital X-rays reveal what the eye cannot, including cavities between teeth and bone health.',
      },
      {
        title: 'Professional Cleaning',
        description:
          'Our hygienist removes plaque and tartar, then polishes your teeth to a smooth, fresh finish.',
      },
      {
        title: 'Personalized Plan',
        description:
          'We discuss findings openly and outline any recommended treatment, prioritized by urgency and your goals.',
      },
      {
        title: 'Prevention Coaching',
        description:
          'You leave with tailored brushing, flossing, and dietary guidance to keep problems from returning.',
      },
    ],
    benefits: [
      'Early detection of decay and gum disease',
      'Lower lifetime cost through prevention',
      'Fresher breath and a cleaner-feeling mouth',
      'A trusted dental home for the whole family',
      'Personalized advice grounded in your history',
      'Peace of mind between visits',
    ],
    recovery:
      'There is no downtime after a routine visit, and you can return to normal eating and activity right away. Any mild gum tenderness after cleaning usually settles within a day.',
    faqs: [
      {
        question: 'How often should I visit for a checkup?',
        answer:
          'Most patients do well with a checkup and cleaning every six months, though we may suggest more frequent visits based on your individual needs.',
      },
      {
        question: 'Are dental X-rays safe?',
        answer:
          'Yes. We use digital sensors that deliver a very low dose of radiation, and we only take images when they add real diagnostic value.',
      },
      {
        question: 'What if you find a problem?',
        answer:
          'We explain exactly what we see, show you the images, and walk through your options so you can make an informed, unpressured decision.',
      },
      {
        question: 'Do you see children as well as adults?',
        answer:
          'Absolutely. General dentistry covers patients of every age, and we love being a lifelong dental home for families.',
      },
    ],
    priceMin: 80,
    priceMax: 200,
    durationMin: 45,
    isFeatured: true,
    displayOrder: 1,
  },
  {
    slug: 'cosmetic-dentistry',
    name: 'Cosmetic Dentistry',
    category: 'Cosmetic',
    icon: 'sparkle',
    imageUrl: 'https://picsum.photos/seed/cosmetic-dentistry/800/600',
    shortDesc: 'Refine the color, shape, and harmony of your smile with artistry and precision.',
    overview:
      'Cosmetic dentistry blends dental science with a designer eye to create smiles that look natural, balanced, and unmistakably yours. From subtle refinements to complete transformations, our approach begins with understanding what you would change if you could, then engineering a result that fits your face and personality.\n\nWe use conservative, tooth-preserving techniques wherever possible, treating your natural enamel as a valuable resource. Digital previews let you see potential outcomes before any work begins, so there are no surprises, only confident decisions.\n\nA beautiful smile is more than aesthetics. Patients consistently tell us that renewed confidence changes how they speak, laugh, and show up in the world.',
    symptoms: [
      'Discoloration or stains that whitening alone cannot fix',
      'Chips, cracks, or worn edges on visible teeth',
      'Gaps or uneven spacing between teeth',
      'Teeth that appear too small, short, or misshapen',
      'Feeling self-conscious when you smile in photos',
      'A smile that looks tired or aged relative to your face',
    ],
    process: [
      {
        title: 'Smile Consultation',
        description:
          'We listen to your goals, photograph your smile, and assess the features that shape your ideal result.',
      },
      {
        title: 'Digital Design',
        description:
          'Using imaging and mock-ups, we craft a preview of your new smile for your review and input.',
      },
      {
        title: 'Treatment Selection',
        description:
          'Together we choose the right blend of whitening, bonding, veneers, or reshaping to reach your vision.',
      },
      {
        title: 'Careful Preparation',
        description:
          'We prepare only what is necessary, protecting healthy tooth structure at every step.',
      },
      {
        title: 'Artful Finishing',
        description:
          'Final restorations are placed, refined, and polished for a seamless, lifelike appearance.',
      },
    ],
    benefits: [
      'A natural-looking, personalized result',
      'Conservative techniques that preserve enamel',
      'Preview your outcome before committing',
      'Improved confidence in social and professional settings',
      'Durable materials that resist staining',
      'A smile designed to complement your unique features',
      'Long-lasting value from expert craftsmanship',
    ],
    recovery:
      'Most cosmetic procedures involve little to no downtime, and any sensitivity is typically mild and short-lived. We provide simple care guidance to keep your new smile bright.',
    faqs: [
      {
        question: 'Will my new smile look fake?',
        answer:
          'No. Our goal is natural harmony. We match shape, translucency, and shade to your face so results look like a healthier version of you.',
      },
      {
        question: 'Can I see the result before treatment?',
        answer:
          'Yes. Digital design and mock-ups let you preview and adjust your smile before any permanent work is done.',
      },
      {
        question: 'How long do cosmetic results last?',
        answer:
          'With good care, quality veneers and bonding can last many years. We review maintenance habits to protect your investment.',
      },
      {
        question: 'Is cosmetic work only about appearance?',
        answer:
          'Often it improves function too, correcting worn edges or bite issues while enhancing how your smile looks.',
      },
    ],
    priceMin: 300,
    priceMax: 3000,
    durationMin: 60,
    isFeatured: false,
    displayOrder: 2,
  },
  {
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    category: 'Restorative',
    icon: 'tooth',
    imageUrl: 'https://picsum.photos/seed/root-canal-treatment/800/600',
    shortDesc: 'Save a badly infected tooth and relieve severe pain with modern, comfortable endodontics.',
    overview:
      'A root canal has an outdated reputation for discomfort, but modern techniques make it no more eventful than a routine filling. The procedure removes infected tissue from inside the tooth, relieving the intense pain that comes with a deep infection while preserving your natural tooth.',
    symptoms: [
      'Severe, lingering toothache, especially when chewing',
      'Prolonged sensitivity to hot or cold that does not fade',
      'Swelling or tenderness in the nearby gum',
      'A darkening or discolored tooth',
      'A recurring pimple-like bump on the gum',
      'Pain that wakes you at night',
    ],
    process: [
      {
        title: 'Diagnosis and Imaging',
        description:
          'We confirm the infection with an exam and X-rays, mapping the internal anatomy of the tooth.',
      },
      {
        title: 'Gentle Numbing',
        description:
          'The area is thoroughly numbed so the procedure feels comfortable from start to finish.',
      },
      {
        title: 'Cleaning the Canals',
        description:
          'Infected tissue is carefully removed and the inner canals are disinfected and shaped.',
      },
      {
        title: 'Sealing',
        description:
          'The cleaned canals are filled and sealed to prevent reinfection.',
      },
      {
        title: 'Restoring the Tooth',
        description:
          'A crown or filling is placed to restore strength, function, and appearance.',
      },
    ],
    benefits: [
      'Immediate relief from severe tooth pain',
      'Saves your natural tooth from extraction',
      'Stops the spread of infection',
      'Restores normal chewing and biting',
      'Prevents shifting of neighboring teeth',
      'A durable, long-term solution',
    ],
    recovery:
      'Mild tenderness for a few days is normal and usually managed with over-the-counter pain relief. Most people return to work or school the same or next day.',
    faqs: [
      {
        question: 'Is a root canal painful?',
        answer:
          'With modern anesthesia the procedure is comfortable. Most patients say it relieves pain rather than causing it.',
      },
      {
        question: 'How many visits does it take?',
        answer:
          'Many root canals are completed in one or two visits, depending on the tooth and the severity of infection.',
      },
      {
        question: 'Why do I need a crown afterward?',
        answer:
          'A treated tooth can become brittle, so a crown protects it from fracture and restores full chewing strength.',
      },
      {
        question: 'Can I just have the tooth pulled instead?',
        answer:
          'Extraction is an option, but keeping your natural tooth is almost always healthier and more economical over time.',
      },
    ],
    priceMin: 400,
    priceMax: 1200,
    durationMin: 90,
    isFeatured: true,
    displayOrder: 3,
  },
  {
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'Surgical',
    icon: 'implant',
    imageUrl: 'https://picsum.photos/seed/dental-implants/800/600',
    shortDesc: 'Replace missing teeth with permanent, natural-looking implants that feel like your own.',
    overview:
      'Dental implants are the gold standard for replacing missing teeth, restoring not just the visible crown but the root beneath it. A small titanium post integrates with your jawbone to create a stable foundation that looks, feels, and functions like a natural tooth.\n\nUnlike bridges, implants do not rely on neighboring teeth for support, and they help preserve the jawbone that naturally shrinks after tooth loss. The result is a confident bite and a smile that stays secure through everything you eat and say.\n\nAt Bright Smile Dental Clinic we plan each implant with precise digital imaging, ensuring ideal placement and a comfortable, predictable journey from consultation to final crown.',
    symptoms: [
      'One or more missing teeth affecting your smile',
      'Difficulty chewing certain foods',
      'A loose or uncomfortable removable denture',
      'Shifting of teeth into a gap',
      'Bone loss in the jaw after an extraction',
      'Wanting a permanent alternative to bridges or dentures',
    ],
    process: [
      {
        title: 'Assessment and 3D Planning',
        description:
          'A detailed scan lets us evaluate bone and plan the exact position of your implant.',
      },
      {
        title: 'Implant Placement',
        description:
          'The titanium post is gently placed into the jaw under local anesthesia.',
      },
      {
        title: 'Healing and Integration',
        description:
          'Over a few months the implant fuses with the bone in a process called osseointegration.',
      },
      {
        title: 'Abutment Fitting',
        description:
          'A small connector is attached to link the implant with your new crown.',
      },
      {
        title: 'Crown Placement',
        description:
          'A custom crown is secured, completing a restoration that blends seamlessly with your smile.',
      },
    ],
    benefits: [
      'Looks and functions like a natural tooth',
      'Preserves jawbone and facial structure',
      'Does not damage neighboring healthy teeth',
      'Eat and speak with complete confidence',
      'A long-lasting, often lifetime solution',
      'Easy to care for like your natural teeth',
      'No slipping or adhesives',
    ],
    recovery:
      'Minor swelling and tenderness after placement usually resolve within a few days, and a soft-food diet is recommended briefly. Full integration takes a few months before the final crown is placed.',
    faqs: [
      {
        question: 'How long do dental implants last?',
        answer:
          'With good oral hygiene and regular checkups, implants can last decades and often a lifetime.',
      },
      {
        question: 'Is the procedure painful?',
        answer:
          'Placement is done under local anesthesia and most patients report far less discomfort than expected, comparable to an extraction.',
      },
      {
        question: 'Am I a candidate for implants?',
        answer:
          'Most healthy adults with adequate bone are candidates. A scan and consultation confirm suitability, and bone grafting can help when needed.',
      },
      {
        question: 'How do I care for my implant?',
        answer:
          'Brush and floss as you would a natural tooth, and keep up regular professional cleanings.',
      },
    ],
    priceMin: 1200,
    priceMax: 3500,
    durationMin: 90,
    isFeatured: true,
    displayOrder: 4,
  },
  {
    slug: 'braces',
    name: 'Braces',
    category: 'Orthodontics',
    icon: 'braces',
    imageUrl: 'https://picsum.photos/seed/braces/800/600',
    shortDesc: 'Straighten crowded or crooked teeth and correct your bite with proven orthodontic care.',
    overview:
      'Braces remain one of the most reliable ways to correct crowding, spacing, and bite problems for both teens and adults. By applying steady, gentle pressure over time, braces guide teeth into their ideal positions, improving both the look and the long-term health of your smile.\n\nModern brackets are smaller and more comfortable than ever, and we tailor each treatment plan to your goals and timeline. Beyond a straighter smile, proper alignment makes teeth easier to clean and reduces uneven wear on your bite.',
    symptoms: [
      'Crowded or overlapping teeth',
      'Noticeable gaps between teeth',
      'An overbite, underbite, or crossbite',
      'Difficulty cleaning between misaligned teeth',
      'Jaw discomfort linked to a poor bite',
      'A desire for lasting, structural alignment',
    ],
    process: [
      {
        title: 'Orthodontic Evaluation',
        description:
          'We assess your teeth, jaws, and bite with photos, scans, and X-rays to design your plan.',
      },
      {
        title: 'Bracket Placement',
        description:
          'Brackets are bonded to your teeth and connected with a wire that begins gentle alignment.',
      },
      {
        title: 'Regular Adjustments',
        description:
          'Periodic visits let us fine-tune the wires to keep your teeth moving safely toward their goal.',
      },
      {
        title: 'Progress Monitoring',
        description:
          'We track alignment and bite changes, adjusting the plan as your smile transforms.',
      },
      {
        title: 'Retention',
        description:
          'Once aligned, braces are removed and a retainer keeps your new smile in place.',
      },
    ],
    benefits: [
      'Effective for even complex alignment issues',
      'Improves bite function and comfort',
      'Makes teeth easier to clean',
      'Reduces uneven tooth wear',
      'Suitable for teens and adults',
      'A predictable, well-established treatment',
    ],
    recovery:
      'You may feel mild soreness for a few days after placement and adjustments, easily managed with soft foods and over-the-counter relief. There is no downtime from daily activities.',
    faqs: [
      {
        question: 'How long will I need to wear braces?',
        answer:
          'Treatment typically ranges from one to three years depending on complexity. We give you a personalized estimate at your consultation.',
      },
      {
        question: 'Do braces hurt?',
        answer:
          'You may feel pressure or tenderness for a few days after adjustments, but it is temporary and manageable.',
      },
      {
        question: 'Are there foods I should avoid?',
        answer:
          'Yes, very hard, sticky, or chewy foods can damage brackets. We provide a simple list to keep your braces safe.',
      },
      {
        question: 'Will I need a retainer afterward?',
        answer:
          'Retainers are essential to hold your results, and we will guide you on how long to wear yours.',
      },
    ],
    priceMin: 2000,
    priceMax: 6000,
    durationMin: 60,
    isFeatured: false,
    displayOrder: 5,
  },
  {
    slug: 'invisible-aligners',
    name: 'Invisible Aligners',
    category: 'Orthodontics',
    icon: 'aligner',
    imageUrl: 'https://picsum.photos/seed/invisible-aligners/800/600',
    shortDesc: 'Straighten your smile discreetly with clear, removable aligners and no metal brackets.',
    overview:
      'Invisible aligners offer a nearly undetectable way to straighten your teeth using a series of clear, custom-made trays. Each set is worn for a couple of weeks before progressing to the next, gradually guiding your teeth into alignment without wires or brackets.\n\nBecause the aligners are removable, you can eat what you love and clean your teeth normally, making them a convenient choice for busy adults and older teens. Digital planning shows you a preview of your final smile before you even begin.',
    symptoms: [
      'Mild to moderate crowding or spacing',
      'A desire to straighten teeth discreetly',
      'Preference for a removable option',
      'Wanting to avoid the look of metal braces',
      'A relapse after previous orthodontic work',
      'Interest in seeing results previewed digitally',
    ],
    process: [
      {
        title: 'Digital Scan',
        description:
          'A quick, comfortable scan captures a precise 3D model of your teeth with no messy impressions.',
      },
      {
        title: 'Treatment Preview',
        description:
          'We show you a simulation of how your smile will move step by step to its final result.',
      },
      {
        title: 'Custom Aligners',
        description:
          'A series of clear trays is crafted specifically for your teeth and treatment plan.',
      },
      {
        title: 'Progressive Wear',
        description:
          'You wear each set for about two weeks, changing to the next as your teeth shift.',
      },
      {
        title: 'Refinement and Retention',
        description:
          'We verify the final alignment and provide a retainer to protect your new smile.',
      },
    ],
    benefits: [
      'Virtually invisible while worn',
      'Removable for eating and cleaning',
      'No wires or brackets to irritate the mouth',
      'Preview your results before starting',
      'Fewer in-office adjustments',
      'Comfortable, smooth trays',
      'Great for image-conscious adults and teens',
    ],
    recovery:
      'There is no recovery period, though you may notice slight pressure for a day or two after switching to a new set. This tightness is a sign the aligners are working.',
    faqs: [
      {
        question: 'How many hours a day must I wear them?',
        answer:
          'For best results, aligners should be worn 20 to 22 hours daily, removing them only to eat, drink, and clean your teeth.',
      },
      {
        question: 'Are aligners as effective as braces?',
        answer:
          'For mild to moderate cases they are highly effective. Very complex issues may still be better suited to braces, which we will discuss honestly.',
      },
      {
        question: 'Will they affect my speech?',
        answer:
          'You might notice a slight lisp for the first day or two, which quickly disappears as you adjust.',
      },
      {
        question: 'How do I clean my aligners?',
        answer:
          'Rinse them and brush gently with a soft toothbrush. We provide simple care instructions to keep them clear.',
      },
    ],
    priceMin: 2500,
    priceMax: 7000,
    durationMin: 45,
    isFeatured: true,
    displayOrder: 6,
  },
  {
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    category: 'Cosmetic',
    icon: 'whitening',
    imageUrl: 'https://picsum.photos/seed/teeth-whitening/800/600',
    shortDesc: 'Brighten your smile several shades with safe, professional-grade whitening.',
    overview:
      'Professional teeth whitening is one of the fastest, most affordable ways to refresh your smile. Using dental-grade whitening agents and controlled application, we can lift years of stains from coffee, tea, and everyday life while protecting your enamel and gums.\n\nUnlike over-the-counter kits, our treatments are supervised for safety and tailored to your sensitivity level, delivering brighter, more even results you can trust. Whether you choose in-office whitening for immediate impact or a custom take-home kit, the difference is noticeable.',
    symptoms: [
      'Yellowing or dullness from coffee, tea, or red wine',
      'Stains from tobacco use',
      'A smile that looks aged or tired',
      'An upcoming event where you want to look your best',
      'Uneven color across your teeth',
      'Disappointment with drugstore whitening results',
    ],
    process: [
      {
        title: 'Shade Assessment',
        description:
          'We record your current shade and discuss the brightness you would like to achieve.',
      },
      {
        title: 'Preparation and Protection',
        description:
          'Your gums and lips are protected so the whitening agent works safely on the enamel.',
      },
      {
        title: 'Whitening Application',
        description:
          'A professional-strength gel is applied and activated to break down stains.',
      },
      {
        title: 'Progress Check',
        description:
          'We monitor the change and repeat as needed to reach your target shade comfortably.',
      },
      {
        title: 'Aftercare Guidance',
        description:
          'You receive tips and optional take-home trays to maintain and extend your results.',
      },
    ],
    benefits: [
      'Noticeably brighter smile in a single visit',
      'Safe, dentist-supervised process',
      'Customized to your sensitivity level',
      'More even and predictable than home kits',
      'Boosts confidence quickly',
      'Optional take-home maintenance',
    ],
    recovery:
      'Temporary sensitivity to hot or cold is common for a day or two and fades on its own. Avoiding deeply staining foods and drinks for a short period helps your results last.',
    faqs: [
      {
        question: 'How white will my teeth get?',
        answer:
          'Most patients brighten several shades. Results vary by starting color and the nature of your stains, which we assess beforehand.',
      },
      {
        question: 'Does whitening damage enamel?',
        answer:
          'Professional whitening is safe when supervised. We protect your gums and monitor sensitivity throughout the process.',
      },
      {
        question: 'How long do results last?',
        answer:
          'Results can last many months to a year or more, depending on your habits. Take-home touch-ups help maintain brightness.',
      },
      {
        question: 'Will whitening work on crowns or veneers?',
        answer:
          'Whitening only affects natural teeth. We will plan around existing restorations so your smile stays even.',
      },
    ],
    priceMin: 250,
    priceMax: 700,
    durationMin: 60,
    isFeatured: true,
    displayOrder: 7,
  },
  {
    slug: 'veneers',
    name: 'Veneers',
    category: 'Cosmetic',
    icon: 'veneer',
    imageUrl: 'https://picsum.photos/seed/veneers/800/600',
    shortDesc: 'Transform chipped, stained, or uneven teeth with thin, custom porcelain shells.',
    overview:
      'Veneers are thin, custom-made shells bonded to the front of your teeth to instantly correct color, shape, and minor alignment concerns. Crafted from high-quality porcelain, they mimic the light-reflecting qualities of natural enamel for a result that is both beautiful and believable.\n\nBecause veneers can address several issues at once, they are a popular choice for a comprehensive smile upgrade with minimal removal of natural tooth structure. Each veneer is designed to suit your facial features and desired look, then bonded securely for lasting wear.',
    symptoms: [
      'Permanent stains that whitening cannot remove',
      'Chipped or worn front teeth',
      'Small gaps between teeth',
      'Slightly crooked or uneven teeth',
      'Teeth that look too small or misshapen',
      'Wanting a lasting, camera-ready smile',
    ],
    process: [
      {
        title: 'Smile Design',
        description:
          'We plan the shape, shade, and proportions of your veneers to match your goals and features.',
      },
      {
        title: 'Minimal Preparation',
        description:
          'A very thin layer of enamel is gently shaped to make room for the veneer.',
      },
      {
        title: 'Impressions and Temporaries',
        description:
          'We capture precise impressions and place temporary veneers while yours are crafted.',
      },
      {
        title: 'Custom Fabrication',
        description:
          'Skilled technicians create your porcelain veneers to exact specifications.',
      },
      {
        title: 'Bonding',
        description:
          'Your veneers are carefully bonded, refined, and polished for a flawless finish.',
      },
    ],
    benefits: [
      'Corrects color, shape, and minor alignment at once',
      'Highly stain-resistant porcelain',
      'Natural, light-reflecting appearance',
      'Conservative removal of tooth structure',
      'Long-lasting with proper care',
      'Dramatic, confidence-boosting results',
      'Customized to your unique smile',
    ],
    recovery:
      'You can return to normal activity immediately, with only brief sensitivity possible after preparation. We recommend avoiding very hard foods to protect your veneers long term.',
    faqs: [
      {
        question: 'Are veneers reversible?',
        answer:
          'Because a small amount of enamel is removed, traditional veneers are considered permanent, so we plan carefully to be sure you love the design.',
      },
      {
        question: 'How long do veneers last?',
        answer:
          'With good care, quality porcelain veneers commonly last ten to fifteen years or more before needing replacement.',
      },
      {
        question: 'Do veneers stain?',
        answer:
          'Porcelain resists staining well. Limiting habits like heavy coffee or tobacco use helps keep them looking their best.',
      },
      {
        question: 'Will they look natural?',
        answer:
          'Yes. We match the shape, shade, and translucency to your face so your veneers blend seamlessly.',
      },
    ],
    priceMin: 800,
    priceMax: 2500,
    durationMin: 90,
    isFeatured: false,
    displayOrder: 8,
  },
  {
    slug: 'smile-makeover',
    name: 'Smile Makeover',
    category: 'Cosmetic',
    icon: 'smile',
    imageUrl: 'https://picsum.photos/seed/smile-makeover/800/600',
    shortDesc: 'A fully personalized combination of treatments to redesign your entire smile.',
    overview:
      'A smile makeover is a comprehensive, custom plan that combines multiple treatments to transform your smile as a whole rather than one tooth at a time. It is the ultimate expression of cosmetic dentistry, tailored to your face, goals, and lifestyle.\n\nAt Bright Smile Dental Clinic, your makeover might blend whitening, veneers, crowns, gum contouring, and alignment into one cohesive design. We begin with a detailed consultation and digital preview so you can see and shape the outcome before treatment begins.\n\nThe result is more than a beautiful smile. It is a renewed sense of confidence that shows in every conversation, photograph, and first impression.',
    symptoms: [
      'Multiple cosmetic concerns you want addressed together',
      'A smile that looks worn, aged, or uneven',
      'Discoloration combined with chips or gaps',
      'Gummy or asymmetrical smile lines',
      'Previous dental work that no longer matches',
      'A major life event you want to look your best for',
    ],
    process: [
      {
        title: 'In-Depth Consultation',
        description:
          'We explore your goals, examine your smile, and discuss what a complete transformation could involve.',
      },
      {
        title: 'Digital Smile Design',
        description:
          'A detailed preview lets you visualize and refine your future smile before any treatment.',
      },
      {
        title: 'Coordinated Treatment Plan',
        description:
          'We sequence procedures such as whitening, veneers, and contouring into one seamless roadmap.',
      },
      {
        title: 'Phased Treatment',
        description:
          'Your makeover is completed in comfortable stages, keeping you informed at every step.',
      },
      {
        title: 'Final Reveal',
        description:
          'We refine and polish the finished result, then plan maintenance to protect your investment.',
      },
    ],
    benefits: [
      'A completely personalized transformation',
      'Addresses multiple concerns in one cohesive plan',
      'Preview and shape your result in advance',
      'Balanced, harmonious final appearance',
      'Dramatic boost in confidence',
      'Durable, high-quality materials',
      'A smile designed around your whole face',
    ],
    recovery:
      'Because a makeover combines several treatments, recovery varies by plan, though most steps involve minimal downtime. We coordinate timing so you stay comfortable throughout the journey.',
    faqs: [
      {
        question: 'How long does a smile makeover take?',
        answer:
          'It depends on the treatments involved. Some makeovers finish in a few weeks, while more complex plans span several months.',
      },
      {
        question: 'Can I see my new smile beforehand?',
        answer:
          'Yes. Digital smile design and mock-ups let you preview and adjust the outcome before treatment begins.',
      },
      {
        question: 'Is a makeover only about looks?',
        answer:
          'It often improves function too, correcting bite issues and worn teeth while enhancing appearance.',
      },
      {
        question: 'How do I maintain my results?',
        answer:
          'Good hygiene, regular checkups, and protecting against habits like grinding help keep your new smile looking its best.',
      },
    ],
    priceMin: 4000,
    priceMax: 15000,
    durationMin: 120,
    isFeatured: true,
    displayOrder: 9,
  },
  {
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    category: 'Pediatric',
    icon: 'child',
    imageUrl: 'https://picsum.photos/seed/pediatric-dentistry/800/600',
    shortDesc: 'Gentle, friendly dental care that helps children build healthy habits for life.',
    overview:
      'Pediatric dentistry focuses on the unique needs of growing smiles, from a baby’s first tooth through the teenage years. Our goal is to make every visit positive and reassuring so children grow up viewing the dentist as a friend rather than a fear.\n\nWe combine gentle techniques with plenty of patience and encouragement, teaching young patients how to care for their teeth in ways they can understand and enjoy. Early, consistent care sets the stage for a lifetime of strong, healthy smiles.',
    symptoms: [
      'Your child’s first tooth has appeared',
      'It is time for a first or routine checkup',
      'Signs of early childhood cavities',
      'Thumb-sucking or pacifier concerns',
      'Difficulty getting your child to brush',
      'Questions about growth, spacing, or baby teeth',
    ],
    process: [
      {
        title: 'Warm Welcome',
        description:
          'We help your child feel at ease with a friendly, kid-focused introduction to the visit.',
      },
      {
        title: 'Gentle Exam',
        description:
          'We check teeth, gums, and development, watching for cavities and growth concerns.',
      },
      {
        title: 'Cleaning and Fluoride',
        description:
          'A gentle cleaning and fluoride treatment help protect young enamel from decay.',
      },
      {
        title: 'Fun Education',
        description:
          'We teach brushing and healthy habits in a playful, encouraging way children remember.',
      },
      {
        title: 'Prevention Plan',
        description:
          'We share tailored guidance for parents to support strong smiles at home.',
      },
    ],
    benefits: [
      'Builds positive associations with dental care',
      'Early detection of cavities and growth issues',
      'Fluoride and sealants to prevent decay',
      'Age-appropriate education for lasting habits',
      'A gentle, patient, child-friendly approach',
      'Guidance and reassurance for parents',
    ],
    recovery:
      'Routine pediatric visits require no recovery, and children can return to normal play and eating right away. We keep every appointment gentle and low-stress.',
    faqs: [
      {
        question: 'When should my child first see a dentist?',
        answer:
          'We recommend a first visit by the first birthday or when the first tooth appears, whichever comes first.',
      },
      {
        question: 'Are baby teeth really that important?',
        answer:
          'Yes. Baby teeth guide adult teeth into place and are essential for eating, speaking, and confidence.',
      },
      {
        question: 'How do you handle a nervous child?',
        answer:
          'We use patience, simple explanations, and a friendly pace, letting your child set the tone so trust builds naturally.',
      },
      {
        question: 'What are dental sealants?',
        answer:
          'Sealants are thin protective coatings placed on back teeth to shield the grooves where cavities often start.',
      },
    ],
    priceMin: 90,
    priceMax: 300,
    durationMin: 45,
    isFeatured: false,
    displayOrder: 10,
  },
  {
    slug: 'wisdom-tooth-removal',
    name: 'Wisdom Tooth Removal',
    category: 'Surgical',
    icon: 'wisdom',
    imageUrl: 'https://picsum.photos/seed/wisdom-tooth-removal/800/600',
    shortDesc: 'Safe, comfortable removal of problematic wisdom teeth to protect your smile.',
    overview:
      'Wisdom teeth often lack the room to emerge properly, leading to pain, crowding, or infection. When these third molars become impacted or difficult to clean, removing them protects the health of your surrounding teeth and gums.\n\nOur team makes the experience as smooth and comfortable as possible, using careful planning and gentle technique. We explain every step in advance and provide clear aftercare so your recovery is calm and predictable.',
    symptoms: [
      'Pain or pressure at the back of the mouth',
      'Swelling or tenderness around the gums',
      'Difficulty opening the jaw fully',
      'Recurring infections near a partially erupted tooth',
      'Crowding or shifting of nearby teeth',
      'Food repeatedly trapping behind the molars',
    ],
    process: [
      {
        title: 'Evaluation and Imaging',
        description:
          'X-rays reveal the position of the wisdom teeth and their relationship to nerves and roots.',
      },
      {
        title: 'Comfort Planning',
        description:
          'We discuss anesthesia and sedation options to keep you relaxed and pain-free.',
      },
      {
        title: 'Gentle Extraction',
        description:
          'The tooth is carefully removed, sectioned if needed, to minimize trauma.',
      },
      {
        title: 'Site Care',
        description:
          'The area is cleaned and, when appropriate, sutured to support healing.',
      },
      {
        title: 'Recovery Guidance',
        description:
          'You receive clear aftercare instructions and a plan for comfortable healing.',
      },
    ],
    benefits: [
      'Relieves pain and pressure',
      'Prevents crowding and shifting of teeth',
      'Reduces risk of infection and cysts',
      'Easier oral hygiene afterward',
      'Comfort-focused, well-planned procedure',
      'Clear support throughout recovery',
    ],
    recovery:
      'Swelling and mild discomfort typically peak within two to three days and then improve steadily. A soft-food diet, rest, and following aftercare instructions help you heal smoothly within about a week.',
    faqs: [
      {
        question: 'Do all wisdom teeth need to be removed?',
        answer:
          'Not always. If they are healthy, properly positioned, and cleanable, they can often stay. We recommend removal only when there is a clear benefit.',
      },
      {
        question: 'Will the procedure hurt?',
        answer:
          'The extraction itself is done under anesthesia so you are comfortable. Mild soreness afterward is normal and manageable.',
      },
      {
        question: 'How long is the recovery?',
        answer:
          'Most people feel much better within a few days and largely recovered in about a week, depending on the complexity.',
      },
      {
        question: 'What is dry socket?',
        answer:
          'It is a painful condition when the healing clot is dislodged. Following aftercare, especially avoiding straws and smoking, greatly reduces the risk.',
      },
    ],
    priceMin: 250,
    priceMax: 900,
    durationMin: 60,
    isFeatured: false,
    displayOrder: 11,
  },
  {
    slug: 'tooth-extraction',
    name: 'Tooth Extraction',
    category: 'Surgical',
    icon: 'extraction',
    imageUrl: 'https://picsum.photos/seed/tooth-extraction/800/600',
    shortDesc: 'Gentle removal of a damaged or unrestorable tooth with comfort as the priority.',
    overview:
      'Although we always aim to preserve natural teeth, sometimes a tooth is too damaged, decayed, or infected to save. In these cases, a careful extraction relieves pain and protects the rest of your mouth from further problems.\n\nWe prioritize your comfort throughout, using effective numbing and a gentle approach. After removal, we discuss replacement options such as implants or bridges so you can restore both function and appearance.',
    symptoms: [
      'Severe decay that cannot be restored',
      'A tooth fractured below the gum line',
      'Advanced gum disease loosening a tooth',
      'Persistent infection not resolved by other care',
      'Overcrowding requiring space for alignment',
      'A painful tooth affecting daily life',
    ],
    process: [
      {
        title: 'Assessment',
        description:
          'We examine the tooth and take X-rays to confirm extraction is the best option.',
      },
      {
        title: 'Numbing',
        description:
          'The area is fully numbed for a comfortable, pain-free procedure.',
      },
      {
        title: 'Careful Removal',
        description:
          'The tooth is gently loosened and removed with minimal disturbance to the surrounding tissue.',
      },
      {
        title: 'Site Preparation',
        description:
          'We clean the socket and support clot formation for healthy healing.',
      },
      {
        title: 'Replacement Planning',
        description:
          'We discuss options to fill the gap and preserve your bite and smile.',
      },
    ],
    benefits: [
      'Relieves pain from a failing tooth',
      'Stops the spread of infection',
      'Protects neighboring teeth and gums',
      'Comfort-focused, gentle technique',
      'Clear aftercare for smooth healing',
      'A path toward restoring the gap',
    ],
    recovery:
      'Minor bleeding and tenderness are normal for the first day and ease quickly with rest and aftercare. Most people return to routine activities within a day or two while the socket heals over the following weeks.',
    faqs: [
      {
        question: 'Does an extraction hurt?',
        answer:
          'The procedure is done under local anesthesia so you stay comfortable. Some soreness afterward is normal and easily managed.',
      },
      {
        question: 'Should I replace the extracted tooth?',
        answer:
          'Usually yes. Replacing a missing tooth prevents shifting and bone loss. We will review options like implants or bridges.',
      },
      {
        question: 'How do I care for the site afterward?',
        answer:
          'Avoid straws, smoking, and vigorous rinsing at first, eat soft foods, and follow the aftercare steps we provide.',
      },
      {
        question: 'How long until I feel normal?',
        answer:
          'Most discomfort fades within a few days, with the socket continuing to heal quietly over the next couple of weeks.',
      },
    ],
    priceMin: 120,
    priceMax: 450,
    durationMin: 45,
    isFeatured: false,
    displayOrder: 12,
  },
  {
    slug: 'crowns-and-bridges',
    name: 'Crowns & Bridges',
    category: 'Restorative',
    icon: 'crown',
    imageUrl: 'https://picsum.photos/seed/crowns-and-bridges/800/600',
    shortDesc: 'Restore damaged or missing teeth with durable, natural-looking crowns and bridges.',
    overview:
      'Crowns and bridges are time-tested restorations that rebuild strength and fill gaps in your smile. A crown caps a weakened or damaged tooth to restore its shape and function, while a bridge replaces one or more missing teeth by anchoring to healthy neighbors.\n\nCrafted from strong, tooth-colored materials, these restorations blend naturally with your smile while standing up to daily use. We design each one for a precise, comfortable fit that protects your bite for years to come.',
    symptoms: [
      'A cracked, weakened, or large-filling tooth',
      'A tooth restored after root canal treatment',
      'One or more missing teeth in a row',
      'Difficulty chewing on a compromised tooth',
      'Worn or misshapen teeth needing coverage',
      'A gap causing neighboring teeth to shift',
    ],
    process: [
      {
        title: 'Evaluation',
        description:
          'We assess the affected teeth and determine whether a crown or bridge best fits your needs.',
      },
      {
        title: 'Preparation',
        description:
          'The supporting teeth are gently shaped to receive the restoration.',
      },
      {
        title: 'Impressions',
        description:
          'Precise impressions or scans capture the details needed for a perfect fit.',
      },
      {
        title: 'Temporary Restoration',
        description:
          'A temporary crown or bridge protects the area while your custom piece is made.',
      },
      {
        title: 'Final Placement',
        description:
          'Your restoration is fitted, adjusted, and cemented for lasting comfort and function.',
      },
    ],
    benefits: [
      'Restores strength to damaged teeth',
      'Fills gaps from missing teeth',
      'Natural, tooth-colored appearance',
      'Restores comfortable chewing',
      'Prevents shifting of remaining teeth',
      'Durable and long-lasting',
      'Protects and preserves your bite',
    ],
    recovery:
      'You may notice brief sensitivity around a newly prepared tooth, which typically settles within a few days. Once the final restoration is placed, you can eat and smile with full confidence.',
    faqs: [
      {
        question: 'How long do crowns and bridges last?',
        answer:
          'With good care they commonly last ten to fifteen years or longer, depending on the material and your oral habits.',
      },
      {
        question: 'Will my crown look natural?',
        answer:
          'Yes. We match the shade and shape to your surrounding teeth so it blends seamlessly.',
      },
      {
        question: 'Is getting a crown painful?',
        answer:
          'Preparation is done under local anesthesia and is comfortable. Any mild sensitivity afterward is temporary.',
      },
      {
        question: 'How do I care for a bridge?',
        answer:
          'Brush normally and clean beneath the bridge with the special floss or tools we recommend to keep it healthy.',
      },
    ],
    priceMin: 600,
    priceMax: 2500,
    durationMin: 90,
    isFeatured: false,
    displayOrder: 13,
  },
  {
    slug: 'dentures',
    name: 'Dentures',
    category: 'Restorative',
    icon: 'denture',
    imageUrl: 'https://picsum.photos/seed/dentures/800/600',
    shortDesc: 'Comfortable, natural-looking full or partial dentures to restore your smile and bite.',
    overview:
      'Dentures remain a trusted, cost-effective way to replace missing teeth and restore the ability to eat, speak, and smile with confidence. Modern dentures are far more comfortable and natural-looking than those of the past, custom-fitted to the contours of your mouth.\n\nWhether you need a full set or a partial to fill specific gaps, we focus on a secure fit and a lifelike appearance. We also guide you through the adjustment period so your new dentures feel like a natural part of your daily life.',
    symptoms: [
      'Multiple missing teeth affecting your smile',
      'Difficulty chewing a full range of foods',
      'A sunken facial appearance from tooth loss',
      'Loose or ill-fitting existing dentures',
      'Self-consciousness when speaking or smiling',
      'Wanting an affordable tooth-replacement option',
    ],
    process: [
      {
        title: 'Consultation',
        description:
          'We assess your gums and remaining teeth to determine the best denture solution for you.',
      },
      {
        title: 'Impressions and Measurements',
        description:
          'Detailed impressions and bite records ensure a comfortable, accurate fit.',
      },
      {
        title: 'Try-In',
        description:
          'A trial denture lets us confirm fit, appearance, and bite before finalizing.',
      },
      {
        title: 'Fabrication',
        description:
          'Your custom dentures are crafted with natural-looking teeth and gum shades.',
      },
      {
        title: 'Fitting and Adjustment',
        description:
          'We fit your dentures and fine-tune them for comfort and confident function.',
      },
    ],
    benefits: [
      'Restores the ability to chew and speak',
      'Supports facial structure and appearance',
      'Natural-looking, custom-shaded teeth',
      'A cost-effective replacement option',
      'Full and partial solutions available',
      'Improved confidence in daily life',
    ],
    recovery:
      'It is normal for new dentures to feel unusual for a few weeks as your mouth adjusts and any sore spots are refined. We schedule follow-ups to fine-tune the fit for lasting comfort.',
    faqs: [
      {
        question: 'How long does it take to adjust to dentures?',
        answer:
          'Most people adapt within a few weeks. Speaking and eating become easier with practice, and we adjust the fit as needed.',
      },
      {
        question: 'Can I eat normally with dentures?',
        answer:
          'Yes, though we suggest starting with softer foods and gradually returning to a normal diet as you gain confidence.',
      },
      {
        question: 'How do I clean my dentures?',
        answer:
          'Remove and rinse them after meals, brush daily with a denture cleaner, and soak them overnight as directed.',
      },
      {
        question: 'Can dentures be secured with implants?',
        answer:
          'Yes. Implant-supported dentures offer extra stability, and we can discuss whether that option suits you.',
      },
    ],
    priceMin: 800,
    priceMax: 3000,
    durationMin: 60,
    isFeatured: false,
    displayOrder: 14,
  },
  {
    slug: 'gum-treatment',
    name: 'Gum Treatment',
    category: 'General',
    icon: 'gum',
    imageUrl: 'https://picsum.photos/seed/gum-treatment/800/600',
    shortDesc: 'Treat and reverse gum disease to protect your teeth and overall health.',
    overview:
      'Healthy gums are the foundation of a healthy smile, yet gum disease often develops quietly until it threatens the bone and teeth. Our gum treatments target infection and inflammation early, halting progression and helping your gums heal.\n\nFrom deep cleanings to more advanced periodontal care, we tailor treatment to the stage of the disease. Because gum health is closely linked to overall wellness, caring for your gums protects far more than your smile.',
    symptoms: [
      'Red, swollen, or tender gums',
      'Bleeding when brushing or flossing',
      'Persistent bad breath',
      'Receding gums or teeth that look longer',
      'Loose or shifting teeth',
      'Pus or tenderness around the gum line',
    ],
    process: [
      {
        title: 'Periodontal Assessment',
        description:
          'We measure gum pockets and evaluate bone health to determine the stage of gum disease.',
      },
      {
        title: 'Deep Cleaning',
        description:
          'Scaling and root planing remove plaque and tartar from below the gum line.',
      },
      {
        title: 'Targeted Therapy',
        description:
          'When needed, we apply antibacterial treatments to help the gums heal.',
      },
      {
        title: 'Reevaluation',
        description:
          'We check your response to treatment and confirm the gums are recovering.',
      },
      {
        title: 'Maintenance Plan',
        description:
          'A personalized cleaning schedule and home-care routine keep gum disease from returning.',
      },
    ],
    benefits: [
      'Stops the progression of gum disease',
      'Reduces bleeding and inflammation',
      'Helps prevent tooth loss',
      'Freshens breath',
      'Protects supporting bone',
      'Supports overall health',
    ],
    recovery:
      'After a deep cleaning your gums may feel tender and teeth slightly sensitive for a few days. These effects fade quickly, and consistent home care keeps your gums on the path to health.',
    faqs: [
      {
        question: 'Can gum disease be reversed?',
        answer:
          'Early-stage gum disease is often reversible with treatment and good home care. Advanced stages can be managed to protect your teeth.',
      },
      {
        question: 'Is scaling and root planing painful?',
        answer:
          'The area is numbed for comfort, and any soreness afterward is mild and short-lived.',
      },
      {
        question: 'Why do my gums bleed?',
        answer:
          'Bleeding usually signals inflammation from plaque buildup. It is an early warning sign worth addressing promptly.',
      },
      {
        question: 'How can I prevent gum disease?',
        answer:
          'Daily brushing and flossing, along with regular professional cleanings, are the best defense against gum problems.',
      },
    ],
    priceMin: 200,
    priceMax: 1500,
    durationMin: 60,
    isFeatured: false,
    displayOrder: 15,
  },
  {
    slug: 'laser-dentistry',
    name: 'Laser Dentistry',
    category: 'General',
    icon: 'laser',
    imageUrl: 'https://picsum.photos/seed/laser-dentistry/800/600',
    shortDesc: 'Precise, minimally invasive treatments using advanced dental laser technology.',
    overview:
      'Laser dentistry uses focused light energy to perform a range of treatments with remarkable precision and comfort. From gum contouring to treating decay and infection, lasers often mean less bleeding, reduced discomfort, and faster healing than traditional methods.\n\nBecause laser treatment is so precise, it targets only the intended tissue while preserving the healthy area around it. Many procedures can be done with less need for anesthesia, making visits calmer and more comfortable.',
    symptoms: [
      'Uneven or excessive gum tissue',
      'A gummy smile you would like refined',
      'Gum inflammation requiring treatment',
      'Sensitivity that may benefit from laser therapy',
      'Preference for a minimally invasive approach',
      'Anxiety about traditional dental instruments',
    ],
    process: [
      {
        title: 'Evaluation',
        description:
          'We determine whether laser treatment is well suited to your specific condition.',
      },
      {
        title: 'Preparation',
        description:
          'The area is prepared and, when needed, minimal anesthesia is applied for comfort.',
      },
      {
        title: 'Laser Treatment',
        description:
          'The laser precisely targets tissue while limiting bleeding and disturbance to healthy areas.',
      },
      {
        title: 'Immediate Care',
        description:
          'We ensure the treated site is clean and comfortable before you leave.',
      },
      {
        title: 'Follow-Up',
        description:
          'We monitor healing and confirm the treatment achieved the intended result.',
      },
    ],
    benefits: [
      'Minimally invasive and precise',
      'Often less bleeding and swelling',
      'Reduced need for anesthesia',
      'Faster, more comfortable healing',
      'Preserves surrounding healthy tissue',
      'Lower risk of infection',
      'A calmer treatment experience',
    ],
    recovery:
      'Laser procedures typically involve minimal discomfort and quick healing, with many patients resuming normal activity the same day. We provide simple aftercare tips to support smooth recovery.',
    faqs: [
      {
        question: 'Is laser dentistry safe?',
        answer:
          'Yes. Dental lasers are a well-established, precise technology used routinely for a variety of gum and tooth treatments.',
      },
      {
        question: 'Does it hurt?',
        answer:
          'Laser treatment is often more comfortable than traditional methods and may require little or no anesthesia.',
      },
      {
        question: 'What can lasers treat?',
        answer:
          'Lasers help with gum contouring, treating gum disease, removing certain lesions, and more. We will advise if it fits your needs.',
      },
      {
        question: 'Is healing really faster?',
        answer:
          'Because lasers are precise and gentle on tissue, many patients experience less swelling and quicker recovery.',
      },
    ],
    priceMin: 200,
    priceMax: 1200,
    durationMin: 45,
    isFeatured: false,
    displayOrder: 16,
  },
  {
    slug: 'dental-cleaning',
    name: 'Dental Cleaning',
    category: 'Preventive',
    icon: 'cleaning',
    imageUrl: 'https://picsum.photos/seed/dental-cleaning/800/600',
    shortDesc: 'A thorough professional cleaning to remove plaque, tartar, and stains.',
    overview:
      'A professional dental cleaning removes the hardened plaque and tartar that brushing alone cannot reach, keeping your teeth and gums healthy between checkups. It is one of the simplest and most effective ways to prevent cavities and gum disease.\n\nOur hygienists work gently and thoroughly, leaving your teeth polished and your mouth feeling fresh. Along the way we point out any areas that need extra attention at home, helping you keep your smile in top condition.',
    symptoms: [
      'It has been six months or more since your last cleaning',
      'Visible tartar buildup along the gum line',
      'Surface stains from coffee, tea, or tobacco',
      'Gums that bleed slightly when brushing',
      'A rough or filmy feeling on your teeth',
      'A desire to maintain a fresh, healthy mouth',
    ],
    process: [
      {
        title: 'Quick Exam',
        description:
          'We take a brief look at your teeth and gums to note anything that needs attention.',
      },
      {
        title: 'Plaque and Tartar Removal',
        description:
          'Special instruments gently remove buildup from your teeth and along the gum line.',
      },
      {
        title: 'Polishing',
        description:
          'A professional polish smooths the tooth surface and lifts surface stains.',
      },
      {
        title: 'Flossing and Rinse',
        description:
          'We floss thoroughly and rinse to clear away any remaining debris.',
      },
      {
        title: 'Home-Care Tips',
        description:
          'You receive tailored advice to keep your teeth clean and healthy between visits.',
      },
    ],
    benefits: [
      'Removes plaque and hardened tartar',
      'Helps prevent cavities and gum disease',
      'Lifts surface stains for a brighter smile',
      'Freshens breath',
      'Supports long-term oral health',
      'Quick, comfortable, and affordable',
    ],
    recovery:
      'There is no downtime after a cleaning, and you can eat and drink normally right away. Gums may feel slightly tender briefly if there was buildup, easing within a day.',
    faqs: [
      {
        question: 'How often should I get a cleaning?',
        answer:
          'Every six months suits most people, though some benefit from more frequent cleanings based on their gum health.',
      },
      {
        question: 'Does a cleaning hurt?',
        answer:
          'Cleanings are generally comfortable. Mild sensitivity can occur if there is significant buildup or gum inflammation.',
      },
      {
        question: 'Will cleaning whiten my teeth?',
        answer:
          'It removes surface stains and can brighten your smile, though it is different from whitening treatments.',
      },
      {
        question: 'Can I skip cleanings if I brush well?',
        answer:
          'Even great brushing cannot remove hardened tartar. Professional cleanings reach what home care cannot.',
      },
    ],
    priceMin: 80,
    priceMax: 180,
    durationMin: 30,
    isFeatured: false,
    displayOrder: 17,
  },
  {
    slug: 'dental-filling',
    name: 'Dental Filling',
    category: 'Restorative',
    icon: 'filling',
    imageUrl: 'https://picsum.photos/seed/dental-filling/800/600',
    shortDesc: 'Repair cavities quickly with durable, natural-looking tooth-colored fillings.',
    overview:
      'A dental filling restores a tooth damaged by decay, sealing out further problems and returning it to full function. Modern tooth-colored fillings blend seamlessly with your natural enamel, so repairs are virtually invisible.\n\nThe procedure is quick and comfortable, and catching cavities early keeps treatment simple. We remove only the decayed portion and restore the tooth with a strong, lifelike material designed to last.',
    symptoms: [
      'A toothache or sensitivity when eating',
      'A visible hole or dark spot on a tooth',
      'Sensitivity to sweet, hot, or cold foods',
      'A rough or chipped edge on a tooth',
      'Food frequently catching in one spot',
      'A cavity found during a routine checkup',
    ],
    process: [
      {
        title: 'Diagnosis',
        description:
          'We examine the tooth and confirm the extent of decay, sometimes with an X-ray.',
      },
      {
        title: 'Numbing',
        description:
          'The area is gently numbed so the procedure is comfortable.',
      },
      {
        title: 'Removing Decay',
        description:
          'The decayed portion is carefully removed, preserving as much healthy tooth as possible.',
      },
      {
        title: 'Placing the Filling',
        description:
          'A tooth-colored material is layered, shaped, and hardened to restore the tooth.',
      },
      {
        title: 'Polishing',
        description:
          'We adjust your bite and polish the filling for a smooth, natural finish.',
      },
    ],
    benefits: [
      'Stops decay from spreading',
      'Restores normal chewing function',
      'Natural, tooth-colored appearance',
      'Quick, single-visit treatment',
      'Preserves healthy tooth structure',
      'Comfortable and affordable',
    ],
    recovery:
      'You can return to normal activity right away, though brief sensitivity to temperature is common and fades within a few days. Numbness from anesthesia wears off within a couple of hours.',
    faqs: [
      {
        question: 'How long does a filling last?',
        answer:
          'Tooth-colored fillings commonly last many years with good care, depending on size, location, and your habits.',
      },
      {
        question: 'Will the filling be noticeable?',
        answer:
          'No. We match the shade to your tooth so the filling blends in naturally.',
      },
      {
        question: 'Is getting a filling painful?',
        answer:
          'The tooth is numbed beforehand, so the procedure is comfortable. Mild sensitivity afterward is normal and temporary.',
      },
      {
        question: 'Why fix a cavity that does not hurt?',
        answer:
          'Cavities often cause no pain until they are advanced. Treating them early prevents bigger, costlier problems later.',
      },
    ],
    priceMin: 120,
    priceMax: 400,
    durationMin: 45,
    isFeatured: false,
    displayOrder: 18,
  },
  {
    slug: 'full-mouth-rehabilitation',
    name: 'Full Mouth Rehabilitation',
    category: 'Restorative',
    icon: 'rehab',
    imageUrl: 'https://picsum.photos/seed/full-mouth-rehabilitation/800/600',
    shortDesc: 'Comprehensive restoration of function, health, and beauty across your entire mouth.',
    overview:
      'Full mouth rehabilitation is a comprehensive approach for patients with extensive dental concerns affecting multiple teeth, the bite, and overall function. It combines restorative and cosmetic treatments into one coordinated plan to rebuild a healthy, comfortable, and attractive smile.\n\nThis is transformative dentistry for those dealing with worn, broken, or missing teeth, chronic bite problems, or the effects of long-term neglect or trauma. At Bright Smile Dental Clinic, we plan each phase meticulously, balancing health, function, and aesthetics for a lasting result.\n\nBecause every mouth is different, your rehabilitation is entirely personalized, sequenced for comfort and delivered by a team focused on restoring both your smile and your quality of life.',
    symptoms: [
      'Multiple missing, worn, or broken teeth',
      'Chronic jaw pain or bite problems',
      'Widespread decay or failing restorations',
      'Difficulty chewing or eating comfortably',
      'Severe tooth wear from grinding',
      'A history of trauma affecting many teeth',
    ],
    process: [
      {
        title: 'Comprehensive Evaluation',
        description:
          'We thoroughly assess your teeth, gums, bite, and jaw to understand the full picture.',
      },
      {
        title: 'Master Treatment Plan',
        description:
          'We design a coordinated, phased plan addressing health, function, and appearance.',
      },
      {
        title: 'Foundational Care',
        description:
          'We first address any gum disease, decay, or infection to build a healthy base.',
      },
      {
        title: 'Restorative Phase',
        description:
          'Crowns, bridges, implants, or other restorations rebuild strength and structure.',
      },
      {
        title: 'Final Refinement',
        description:
          'We perfect the bite and aesthetics, then plan long-term maintenance.',
      },
    ],
    benefits: [
      'Restores full chewing function',
      'Relieves chronic bite and jaw discomfort',
      'Rebuilds a healthy, attractive smile',
      'Addresses multiple issues in one plan',
      'Personalized, carefully sequenced treatment',
      'Durable, high-quality restorations',
      'A major boost to quality of life',
    ],
    recovery:
      'Because rehabilitation spans several treatments, recovery varies by phase, with each step planned for comfort and steady progress. We guide you closely throughout the journey and adjust as needed.',
    faqs: [
      {
        question: 'How long does full mouth rehabilitation take?',
        answer:
          'It depends on complexity, ranging from a few months to a year or more, completed in comfortable phases.',
      },
      {
        question: 'Is it a single procedure?',
        answer:
          'No, it is a coordinated series of treatments tailored to your needs and sequenced for the best outcome.',
      },
      {
        question: 'Will it be painful?',
        answer:
          'Each step is done with comfort in mind, using anesthesia and sedation options as appropriate.',
      },
      {
        question: 'Who needs full mouth rehabilitation?',
        answer:
          'It suits patients with widespread dental problems affecting function, health, and appearance across many teeth.',
      },
    ],
    priceMin: 5000,
    priceMax: 25000,
    durationMin: 120,
    isFeatured: false,
    displayOrder: 19,
  },
  {
    slug: 'emergency-dental-care',
    name: 'Emergency Dental Care',
    category: 'Emergency',
    icon: 'emergency',
    imageUrl: 'https://picsum.photos/seed/emergency-dental-care/800/600',
    shortDesc: 'Fast, compassionate care for dental emergencies when you need relief right away.',
    overview:
      'Dental emergencies can strike without warning, from sudden severe pain to a knocked-out tooth or a broken restoration. When they do, prompt care can save a tooth and bring much-needed relief.\n\nWe prioritize emergency patients, working quickly to diagnose the problem, ease your pain, and stabilize the situation. Our calm, reassuring approach helps you feel supported during a stressful moment, and we explain your options clearly so you can decide what comes next.',
    symptoms: [
      'Severe or sudden toothache',
      'A knocked-out or dislodged tooth',
      'A cracked, broken, or chipped tooth',
      'Swelling in the mouth, face, or jaw',
      'A lost filling or crown causing pain',
      'Bleeding or trauma to the mouth',
    ],
    process: [
      {
        title: 'Rapid Contact',
        description:
          'Reach out and describe your situation so we can advise you and prioritize your visit.',
      },
      {
        title: 'Urgent Assessment',
        description:
          'On arrival we quickly examine the problem and identify the source of pain or damage.',
      },
      {
        title: 'Pain Relief',
        description:
          'Our first priority is making you comfortable and relieving acute pain.',
      },
      {
        title: 'Stabilizing Treatment',
        description:
          'We address the emergency to protect the tooth and prevent the problem from worsening.',
      },
      {
        title: 'Follow-Up Plan',
        description:
          'We outline any further treatment needed to fully restore your tooth and smile.',
      },
    ],
    benefits: [
      'Prompt relief from acute pain',
      'Priority scheduling for emergencies',
      'May save a damaged or knocked-out tooth',
      'Prevents complications from worsening',
      'Calm, reassuring support in a crisis',
      'Clear guidance on next steps',
    ],
    recovery:
      'Recovery depends on the emergency treated, and we provide specific aftercare to support healing and comfort. We also schedule any follow-up needed to complete your care.',
    faqs: [
      {
        question: 'What counts as a dental emergency?',
        answer:
          'Severe pain, swelling, bleeding, a knocked-out tooth, or a broken restoration all warrant urgent care. When in doubt, contact us.',
      },
      {
        question: 'What should I do if a tooth is knocked out?',
        answer:
          'Keep it moist, ideally in milk or by placing it back in the socket, and reach us as quickly as possible for the best chance to save it.',
      },
      {
        question: 'How soon can I be seen?',
        answer:
          'We prioritize emergencies and aim to see you as quickly as possible to relieve pain and protect your tooth.',
      },
      {
        question: 'How can I manage pain until my visit?',
        answer:
          'Over-the-counter pain relief and a cold compress can help. We will give specific guidance when you contact us.',
      },
    ],
    priceMin: 100,
    priceMax: 600,
    durationMin: 45,
    isFeatured: false,
    displayOrder: 20,
  },
];
