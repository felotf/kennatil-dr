import {
  Animal,
  type DiseaseView,
  type DrugView,
  type ManagementTipView,
  Variant_injection_oral_topical,
  Variant_mild_severe_moderate,
} from "../backend.d";

export const SAMPLE_DISEASES: DiseaseView[] = [
  {
    name: "East Coast Fever (ECF)",
    severity: Variant_mild_severe_moderate.severe,
    affectedAnimals: [Animal.cattle],
    symptoms: [
      "High fever (above 40°C)",
      "Swollen lymph nodes",
      "Respiratory distress",
      "Loss of appetite",
      "Nasal discharge",
      "Conjunctivitis",
    ],
    causes:
      "Theileria parva parasite transmitted by brown ear tick (Rhipicephalus appendiculatus)",
    treatment:
      "Buparvaquone (Butalex) 2.5mg/kg IM injection. Early treatment critical. Supportive therapy with NSAIDs.",
    prevention:
      "Tick control with acaricides, immunization (ITM - Infection and Treatment Method), pasture management",
  },
  {
    name: "Foot and Mouth Disease",
    severity: Variant_mild_severe_moderate.severe,
    affectedAnimals: [Animal.cattle, Animal.sheep, Animal.goats, Animal.pigs],
    symptoms: [
      "Blisters on feet and mouth",
      "Lameness",
      "Excessive salivation",
      "Fever",
      "Reduced milk production",
    ],
    causes: "Foot-and-mouth disease virus (FMDV) - highly contagious",
    treatment:
      "Supportive treatment only. Keep lesions clean. Antibiotics for secondary infections.",
    prevention:
      "Regular vaccination, quarantine of infected animals, strict biosecurity",
  },
  {
    name: "Newcastle Disease",
    severity: Variant_mild_severe_moderate.severe,
    affectedAnimals: [Animal.poultry],
    symptoms: [
      "Respiratory distress",
      "Twisting of neck",
      "Green diarrhea",
      "Swollen eyes",
      "Sudden drop in egg production",
    ],
    causes: "Avian Paramyxovirus type 1 (APMV-1)",
    treatment:
      "No specific treatment. Supportive care and antibiotics for secondary infections.",
    prevention: "Vaccination program, biosecurity measures, proper ventilation",
  },
  {
    name: "Bovine Respiratory Disease",
    severity: Variant_mild_severe_moderate.moderate,
    affectedAnimals: [Animal.cattle],
    symptoms: [
      "Coughing",
      "Nasal discharge",
      "Fever",
      "Labored breathing",
      "Reduced feed intake",
    ],
    causes: "Multiple pathogens including Mannheimia haemolytica, BRSV, BHV-1",
    treatment:
      "Broad-spectrum antibiotics (oxytetracycline, florfenicol). NSAIDs for fever.",
    prevention:
      "Vaccination, stress reduction, proper ventilation, quarantine new animals",
  },
  {
    name: "Canine Parvovirus",
    severity: Variant_mild_severe_moderate.severe,
    affectedAnimals: [Animal.dogs],
    symptoms: [
      "Severe bloody diarrhea",
      "Vomiting",
      "Lethargy",
      "Loss of appetite",
      "Fever",
    ],
    causes: "Canine parvovirus (CPV-2) - highly contagious",
    treatment:
      "IV fluid therapy, anti-emetics, antibiotics for secondary infections, nutritional support",
    prevention: "Core vaccination (DA2PP), quarantine unvaccinated dogs",
  },
  {
    name: "Mastitis",
    severity: Variant_mild_severe_moderate.moderate,
    affectedAnimals: [Animal.cattle, Animal.goats, Animal.sheep],
    symptoms: [
      "Swollen painful udder",
      "Abnormal milk (clots, blood)",
      "Fever",
      "Reduced milk yield",
      "Hard quarters",
    ],
    causes:
      "Bacterial infection: Staphylococcus aureus, Streptococcus agalactiae, E. coli",
    treatment:
      "Intramammary antibiotics, systemic antibiotics for severe cases, supportive therapy",
    prevention:
      "Proper milking hygiene, teat dipping, dry cow therapy, culling chronic cases",
  },
];

export const SAMPLE_DRUGS: DrugView[] = [
  {
    name: "Buparvaquone (Butalex)",
    drugClass: "Antiprotozoal",
    route: Variant_injection_oral_topical.injection,
    dosage:
      "2.5 mg/kg body weight IM, single dose. May repeat in 48-72 hours if no improvement.",
    indications: [
      "East Coast Fever (ECF)",
      "Tropical Theileriosis",
      "Corridor Disease",
    ],
    treats: ["East Coast Fever (ECF)"],
    quality: [
      "WHO approved",
      "Veterinary prescription required",
      "Cold chain storage 2-8°C",
    ],
    sideEffects: [
      "Local tissue reaction at injection site",
      "Temporary swelling",
      "Rare anaphylaxis",
    ],
    contraindications: [
      "Not for use in lactating dairy animals within 3 days of slaughter",
      "Avoid in severe renal impairment",
    ],
  },
  {
    name: "Oxytetracycline",
    drugClass: "Broad-spectrum Antibiotic",
    route: Variant_injection_oral_topical.injection,
    dosage: "10-20 mg/kg body weight IV/IM every 12-24 hours for 3-5 days",
    indications: [
      "Respiratory infections",
      "Tick-borne diseases",
      "Wound infections",
      "Brucellosis adjunct",
    ],
    treats: ["Bovine Respiratory Disease", "Anaplasmosis", "Ehrlichiosis"],
    quality: [
      "Broad spectrum activity",
      "Multiple formulations available",
      "Store at room temperature",
    ],
    sideEffects: [
      "GI upset with oral formulations",
      "Photosensitivity",
      "Pain at injection site",
      "Nephrotoxicity at high doses",
    ],
    contraindications: [
      "Avoid in young growing animals - affects bone development",
      "Not in pregnant animals",
      "Renal disease",
    ],
  },
  {
    name: "Albendazole",
    drugClass: "Anthelmintic (Dewormer)",
    route: Variant_injection_oral_topical.oral,
    dosage:
      "7.5-10 mg/kg orally. Cattle: 7.5mg/kg. Dogs/cats: 25-50mg/kg for 3-5 days.",
    indications: ["Roundworms", "Tapeworms", "Liver flukes", "Lungworms"],
    treats: ["Helminthiasis", "Fasciolosis", "Dictyocaulosis"],
    quality: [
      "Broad-spectrum anthelmintic",
      "Cost-effective",
      "Good safety margin",
    ],
    sideEffects: [
      "Occasional diarrhea",
      "Vomiting in small animals",
      "Avoid in early pregnancy",
    ],
    contraindications: [
      "Not for use in first 45 days of pregnancy in cattle",
      "Avoid in lactating dairy animals",
    ],
  },
  {
    name: "Ivermectin",
    drugClass: "Antiparasitic",
    route: Variant_injection_oral_topical.injection,
    dosage:
      "0.2 mg/kg SC injection. Pour-on: 0.5 mg/kg. Repeat in 2 weeks if needed.",
    indications: [
      "External parasites (mange, lice, ticks)",
      "Internal parasites (roundworms)",
      "Warble fly",
    ],
    treats: ["Sarcoptic Mange", "Demodicosis", "Gastrointestinal nematodes"],
    quality: [
      "Long-acting formula available",
      "WHO essential medicine",
      "Store below 30°C",
    ],
    sideEffects: ["Neurological signs at overdose", "Edema", "Lethargy"],
    contraindications: [
      "Contraindicated in Collies and related breeds (MDR1 mutation)",
      "Avoid in Chelonians",
    ],
  },
  {
    name: "Meloxicam",
    drugClass: "NSAID (Anti-inflammatory)",
    route: Variant_injection_oral_topical.injection,
    dosage:
      "0.5 mg/kg IV/SC single dose. Can give oral 0.1 mg/kg once daily for up to 5 days.",
    indications: [
      "Pain management",
      "Fever reduction",
      "Post-surgical inflammation",
      "Musculoskeletal disorders",
    ],
    treats: ["Post-operative pain", "Arthritis", "Mastitis fever"],
    quality: [
      "COX-2 selective - safer GI profile",
      "Rapid onset of action",
      "Veterinary formulation available",
    ],
    sideEffects: [
      "GI ulceration with prolonged use",
      "Renal effects",
      "Avoid in dehydrated animals",
    ],
    contraindications: [
      "Not with other NSAIDs or steroids",
      "Avoid in renal/hepatic insufficiency",
      "Not in pregnant or lactating animals",
    ],
  },
  {
    name: "Amoxicillin-Clavulanate",
    drugClass: "Beta-lactam Antibiotic",
    route: Variant_injection_oral_topical.oral,
    dosage:
      "12.5-20 mg/kg orally twice daily for 5-7 days. Adjust for renal impairment.",
    indications: [
      "Skin infections",
      "Urinary tract infections",
      "Respiratory infections",
      "Wound infections",
    ],
    treats: ["Pyoderma", "Otitis", "Periodontal disease"],
    quality: [
      "Excellent tissue penetration",
      "Beta-lactamase stable",
      "Palatable oral formulations",
    ],
    sideEffects: ["Diarrhea", "Vomiting", "Hypersensitivity reactions"],
    contraindications: [
      "Penicillin allergy",
      "Avoid in rabbits and guinea pigs (fatal colitis risk)",
    ],
  },
];

export const SAMPLE_MANAGEMENT_TIPS: ManagementTipView[] = [
  {
    animalType: Animal.cattle,
    tips: {
      vaccination:
        "Vaccinate against FMD every 6 months, BRD at weaning, Lumpy Skin Disease annually. Use ECF ITM for calves in endemic areas. Keep vaccination records updated.",
      feeding:
        "Provide 2-3% of body weight as dry matter daily. Balance ration with energy (maize, molasses), protein (cotton seed cake, lucerne), minerals and vitamins. Ensure clean water at all times (40-70L/day per adult).",
      healthMonitoring:
        "Check body condition score monthly (target 3.0-3.5). Monitor milk production, reproductive performance. Conduct regular FAMACHA checks for anaemia. Deworm every 3 months.",
      hygiene:
        "Clean and disinfect housing weekly. Maintain tick-free environment with regular acaricide spraying. Wash milking equipment with iodine solution before and after milking.",
      housing:
        "Provide 5-6 sq meters per adult animal in covered housing. Ensure good drainage, ventilation. Separate sick animals. Calving pen should be clean and isolated.",
    },
  },
  {
    animalType: Animal.poultry,
    tips: {
      vaccination:
        "Newcastle Disease vaccination (Lasota) at day 7, 21, then monthly. Gumboro at day 14 and 28. Marek's at day 1. Fowl Pox at 6-8 weeks in endemic areas.",
      feeding:
        "Provide 100-120g/bird/day of balanced feed. Starter (0-4 weeks): 22% protein. Grower (4-8 weeks): 18% protein. Layer feed: 16% protein with 3.5% calcium. Fresh water at all times.",
      healthMonitoring:
        "Monitor daily feed and water intake. Record egg production and FCR. Check for respiratory signs, diarrhea, drops in production. Post-mortem any unexpected deaths.",
      hygiene:
        "All-in, all-out production system. Clean and disinfect between batches. Footbaths at entry. Rodent and wild bird control. Proper litter management.",
      housing:
        "8-10 birds per sq meter for broilers, 6-7 for layers. Temperature: 35°C at day 1, reduce 3°C/week. Adequate ventilation, lighting program for layers (16h light/day).",
    },
  },
  {
    animalType: Animal.dogs,
    tips: {
      vaccination:
        "Core vaccines: Distemper, Parvovirus, Hepatitis, Rabies annually. Leptospirosis in high-risk areas. Puppies: series at 6, 9, 12 weeks then annually.",
      feeding:
        "Feed 2-3% of body weight daily. Puppies 3-4 meals/day. Adults 2 meals/day. Commercial complete diet or balanced home-cooked meals. Never feed chocolate, onions, grapes, xylitol.",
      healthMonitoring:
        "Annual veterinary wellness exams. Monthly heartworm prevention. Fecal check twice yearly. Dental check and cleaning as needed. Flea/tick prevention monthly.",
      hygiene:
        "Bathe monthly or as needed. Brush teeth 3x/week. Trim nails monthly. Clean ears weekly. Regular grooming reduces parasite burden.",
      housing:
        "Provide comfortable bedding, shelter from elements. Ensure secure fencing. Mental stimulation and exercise daily. Socialization from puppy stage.",
    },
  },
  {
    animalType: Animal.goats,
    tips: {
      vaccination:
        "CDT (Clostridium/Tetanus) annually, boosters for does 4 weeks pre-kidding. PPR vaccination in endemic areas every 3 years. Rabies annually.",
      feeding:
        "Provide quality hay/browse ad lib, 200-300g concentrate/day for lactating does. Mineral supplementation critical (copper, selenium). Fresh water always available.",
      healthMonitoring:
        "FAMACHA scoring for barber pole worm. Fecal egg counts before deworming. Check hoof condition monthly. Body condition scoring. Breeding soundness exam for bucks.",
      hygiene:
        "Trim hooves every 6-8 weeks. Keep bedding dry to prevent foot rot. Disinfect equipment. Isolate new animals for 30 days.",
      housing:
        "1.5-2 sq meters per adult in shelter. Good ventilation essential - goats susceptible to respiratory disease. Raised slatted floors help hygiene.",
    },
  },
];
