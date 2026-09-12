/**
 * Mock Data for Academic Shorthand & Stenographic Studio (IELTS Listening Section 4 - Step 78)
 * 4 High-Density Cambridge Section 4 Academic Monologues with Shorthand Cues & Strict Singular/Plural Keys
 */

export interface ShorthandQuestion {
  id: string;
  questionNumber: number;
  sectionContext: string;
  sentencePrompt: string; // e.g. "Primary source of toxic accumulation was found in the ______ of deep-sea sharks."
  preText: string;
  postText: string;
  expectedAnswer: string;
  acceptableAlternatives: string[];
  maxWords: number; // 1 or 2
  distractor: string;
  shorthandNoteCue: string;
  timestampSeconds: number;
  acousticNote: string;
  singularPluralTrapWarning?: string;
}

export interface Section4Lecture {
  id: string;
  title: string;
  academicDiscipline: string;
  accent: "British" | "Australian" | "American" | "Canadian";
  speakerName: string;
  durationSeconds: number;
  introTranscript: string;
  audioSections: {
    title: string;
    startSec: number;
    endSec: number;
    transcriptSnippet: string;
  }[];
  questions: ShorthandQuestion[];
  modelShorthandSheet: {
    bulletPoints: string[];
  };
}

export const MOCK_SECTION4_LECTURES: Section4Lecture[] = [
  {
    id: "sec4_marine_microplastics",
    title: "Deep-Sea Microplastics & Trophic Bioaccumulation",
    academicDiscipline: "Marine Biology & Ecotoxicology",
    accent: "British",
    speakerName: "Dr. Alistair Finch (Oceanographic Institute)",
    durationSeconds: 180,
    introTranscript: "Good morning everyone. Today we turn our attention to the abyssal benthic zones, specifically examining how synthetic anthropogenic debris permeates the deepest ocean trenches...",
    audioSections: [
      {
        title: "Section A: Oceanic Transport & Particle Settlement",
        startSec: 0,
        endSec: 50,
        transcriptSnippet: "When microplastics degrade, they do not remain suspended indefinitely at the surface. Rather, organic matter binds to the synthetic fragments, creating what oceanographers call marine snow. This aggregates into dense particles that descend at rapid velocity towards the seafloor."
      },
      {
        title: "Section B: Ingestion & Biological Vectors",
        startSec: 50,
        endSec: 110,
        transcriptSnippet: "In our 2023 expedition to the Mariana Trench, amphipods and benthic detritivores were examined. Contrary to initial hypotheses blaming floating nets, the primary vector of internal toxicity was microscopic fibres shed from industrial textiles. High concentrations were detected in the digestive enzymes and lipid tissues of scavengers."
      },
      {
        title: "Section C: Trophic Cascades & Apex Predators",
        startSec: 110,
        endSec: 180,
        transcriptSnippet: "As these detritivores are consumed by apex bathypelagic predators such as sleeper sharks, bioamplification occurs. Notably, while muscular tissue exhibited moderate contamination, excessive toxic residues were localized primarily within the livers of these specimens, severely compromising their reproductive longevity."
      }
    ],
    questions: [
      {
        id: "q31",
        questionNumber: 31,
        sectionContext: "Sedimentation Mechanism",
        sentencePrompt: "Microplastics bind with organic material to form ______ which accelerate downward movement.",
        preText: "Microplastics bind with organic material to form",
        postText: "which accelerate downward movement.",
        expectedAnswer: "particles",
        acceptableAlternatives: ["dense particles"],
        maxWords: 1,
        distractor: "snow",
        shorthandNoteCue: "microplastic + organic → dense \\inc particle descent",
        timestampSeconds: 30,
        acousticNote: "Lecturer mentions 'marine snow' as a metaphor before stating that it aggregates into dense particles.",
        singularPluralTrapWarning: "Must be plural 'particles' (countable noun following 'form')."
      },
      {
        id: "q32",
        questionNumber: 32,
        sectionContext: "Vector Identification",
        sentencePrompt: "The main source of oceanic contamination stemmed from synthetic ______ rather than abandoned nets.",
        preText: "The main source of oceanic contamination stemmed from synthetic",
        postText: "rather than abandoned nets.",
        expectedAnswer: "fibres",
        acceptableAlternatives: ["fibers"],
        maxWords: 1,
        distractor: "nets",
        shorthandNoteCue: "vector ≠ nets; vector = \\ind synthetic fibres",
        timestampSeconds: 75,
        acousticNote: "British spelling 'fibres' or US 'fibers' accepted.",
        singularPluralTrapWarning: "Plural 'fibres' is mandatory."
      },
      {
        id: "q33",
        questionNumber: 33,
        sectionContext: "Biological Impact",
        sentencePrompt: "Toxin accumulation was recorded in the ______ of scavenger organisms.",
        preText: "Toxin accumulation was recorded in the",
        postText: "of scavenger organisms.",
        expectedAnswer: "enzymes",
        acceptableAlternatives: ["digestive enzymes"],
        maxWords: 1,
        distractor: "tissues",
        shorthandNoteCue: "toxins localized in \\bio enzymes of amphipods",
        timestampSeconds: 95,
        acousticNote: "Lecturer clarifies 'digestive enzymes and lipid tissues'.",
        singularPluralTrapWarning: "Plural 'enzymes' required."
      },
      {
        id: "q34",
        questionNumber: 34,
        sectionContext: "Apex Predator Pathology",
        sentencePrompt: "In deep-water sharks, the highest density of plastic pollutants was discovered in their ______.",
        preText: "In deep-water sharks, the highest density of plastic pollutants was discovered in their",
        postText: ".",
        expectedAnswer: "livers",
        acceptableAlternatives: ["liver"],
        maxWords: 1,
        distractor: "muscles",
        shorthandNoteCue: "apex predators: muscle = moderate, \\to livers = severe \\inc",
        timestampSeconds: 145,
        acousticNote: "Speaker contrasts muscular tissue with livers.",
        singularPluralTrapWarning: "Plural 'livers' matches 'in their livers'."
      },
      {
        id: "q35",
        questionNumber: 35,
        sectionContext: "Ecological Consequence",
        sentencePrompt: "The chemical exposure caused a significant reduction in the animals' ______ longevity.",
        preText: "The chemical exposure caused a significant reduction in the animals'",
        postText: "longevity.",
        expectedAnswer: "reproductive",
        acceptableAlternatives: [],
        maxWords: 1,
        distractor: "metabolic",
        shorthandNoteCue: "exposure \\to \\dec reproductive longevity",
        timestampSeconds: 165,
        acousticNote: "Adjective specifying type of longevity.",
        singularPluralTrapWarning: "Adjective form 'reproductive' required."
      }
    ],
    modelShorthandSheet: {
      bulletPoints: [
        "microplastics + org matter → marine snow (particles) ↓ seabed",
        "vector ≠ nets | vector = synthetic fibres ← textiles",
        "internal tox detected in digestive enzymes",
        "apex predators (sharks): muscles ≈ mod, livers = extreme tox",
        "severe env damage → ↓ reproductive longevity"
      ]
    }
  },
  {
    id: "sec4_urban_passive_cooling",
    title: "Urban Microclimates & Biomimetic Passive Ventilation",
    academicDiscipline: "Architectural Engineering & Urban Climatology",
    accent: "Australian",
    speakerName: "Prof. Rowan Gallagher",
    durationSeconds: 180,
    introTranscript: "In modern megacities, thermal radiation trapped by asphalt canyons causes what we term the Urban Heat Island effect...",
    audioSections: [
      {
        title: "Section A: Thermal Absorption Dynamics",
        startSec: 0,
        endSec: 55,
        transcriptSnippet: "Conventional concrete and dark bituminous surfaces possess high thermal mass, retaining solar insolation throughout daylight hours. At night, this heat radiates back into narrow street corridors, creating perpetual thermal stress."
      },
      {
        title: "Section B: Termite Mound Biomimicry",
        startSec: 55,
        endSec: 120,
        transcriptSnippet: "To circumvent prohibitive air-conditioning costs, architects in Harare modeled the Eastgate Centre on subterranean termite mounds. These structures maintain internal equilibrium using convective airflow tunnels and porous clay chimneys that expel hot air through chimney pressure."
      },
      {
        title: "Section C: Vegetation & Phase-Change Materials",
        startSec: 120,
        endSec: 180,
        transcriptSnippet: "Integrating vertical gardens further amplifies evapotranspiration. When combined with phase-change paraffin tiles embedded into ceilings, structural cooling energy demand was reduced by approximately thirty-five percent."
      }
    ],
    questions: [
      {
        id: "q36",
        questionNumber: 36,
        sectionContext: "Heat Island Genesis",
        sentencePrompt: "Heat is continuously stored during daylight due to the high thermal ______ of concrete structures.",
        preText: "Heat is continuously stored during daylight due to the high thermal",
        postText: "of concrete structures.",
        expectedAnswer: "mass",
        acceptableAlternatives: ["masses"],
        maxWords: 1,
        distractor: "radiation",
        shorthandNoteCue: "concrete = high thermal mass \\to stores heat",
        timestampSeconds: 30,
        acousticNote: "Technical term 'thermal mass'.",
        singularPluralTrapWarning: "Uncountable 'mass'."
      },
      {
        id: "q37",
        questionNumber: 37,
        sectionContext: "Biological Inspiration",
        sentencePrompt: "Ventilation blueprints were adapted from the internal design of ______ mounds.",
        preText: "Ventilation blueprints were adapted from the internal design of",
        postText: "mounds.",
        expectedAnswer: "termite",
        acceptableAlternatives: ["termites"],
        maxWords: 1,
        distractor: "ant",
        shorthandNoteCue: "model ← termite mounds w/ airflow tunnels",
        timestampSeconds: 70,
        acousticNote: "Singular noun adjunct 'termite'.",
        singularPluralTrapWarning: "Must be 'termite'."
      },
      {
        id: "q38",
        questionNumber: 38,
        sectionContext: "Airflow Mechanisms",
        sentencePrompt: "Heated air is vented outward using natural ______ pressure.",
        preText: "Heated air is vented outward using natural",
        postText: "pressure.",
        expectedAnswer: "chimney",
        acceptableAlternatives: ["convective"],
        maxWords: 1,
        distractor: "wind",
        shorthandNoteCue: "hot air out \\from clay chimney pressure",
        timestampSeconds: 105,
        acousticNote: "'chimney pressure' stated explicitly.",
        singularPluralTrapWarning: "Singular 'chimney'."
      },
      {
        id: "q39",
        questionNumber: 39,
        sectionContext: "Vegetative Integration",
        sentencePrompt: "Living wall systems decrease regional temperature through the process of ______.",
        preText: "Living wall systems decrease regional temperature through the process of",
        postText: ".",
        expectedAnswer: "evapotranspiration",
        acceptableAlternatives: [],
        maxWords: 1,
        distractor: "photosynthesis",
        shorthandNoteCue: "vert gardens → \\inc evapotranspiration → \\dec temp",
        timestampSeconds: 135,
        acousticNote: "Complex polysyllabic biological term.",
        singularPluralTrapWarning: "Careful with spelling."
      },
      {
        id: "q40",
        questionNumber: 40,
        sectionContext: "Energy Savings",
        sentencePrompt: "Phase-change paraffin tiles are typically installed inside the ______ of modern eco-buildings.",
        preText: "Phase-change paraffin tiles are typically installed inside the",
        postText: "of modern eco-buildings.",
        expectedAnswer: "ceilings",
        acceptableAlternatives: ["ceiling"],
        maxWords: 1,
        distractor: "walls",
        shorthandNoteCue: "paraffin tiles in ceilings → \\dec energy by 35%",
        timestampSeconds: 160,
        acousticNote: "'embedded into ceilings'.",
        singularPluralTrapWarning: "Plural 'ceilings' matches transcript."
      }
    ],
    modelShorthandSheet: {
      bulletPoints: [
        "concrete / bitumen = high thermal mass → nocturnal heat release",
        "Harare Eastgate Centre ← modeled on termite mounds",
        "air circulation ← porous clay chimneys & convective tunnels",
        "vertical gardens → ↑ evapotranspiration → ↓ ambient heat",
        "paraffin tiles in ceilings → ↓ energy use ≈ 35%"
      ]
    }
  },
  {
    id: "sec4_dendrochronology_climate",
    title: "Tree-Ring Dating & Anatolian Megadroughts",
    academicDiscipline: "Archaeological Geochemistry",
    accent: "American",
    speakerName: "Dr. Elena Vasquez (Cornell Tree-Ring Laboratory)",
    durationSeconds: 180,
    introTranscript: "Dendrochronology offers an unvarnished calendar of Earth's historic atmospheric conditions...",
    audioSections: [
      {
        title: "Section A: Juniper Specimen Preservation",
        startSec: 0,
        endSec: 60,
        transcriptSnippet: "In the arid central plateau of Anatolia, ancient wooden burial chambers constructed from ancient juniper logs have remained intact for millennia, undisturbed by fungal decay."
      },
      {
        title: "Section B: Isotopic Variations in Cellulose",
        startSec: 60,
        endSec: 120,
        transcriptSnippet: "By extracting carbon and oxygen isotopes from micro-shavings of annual rings, we can pinpoint not merely annual precipitation, but specific summer humidity. A narrower ring spacing combined with elevated carbon-13 ratios directly reflects severe moisture deficits."
      },
      {
        title: "Section C: The 1177 BCE Collapse",
        startSec: 120,
        endSec: 180,
        transcriptSnippet: "Our data demonstrated three successive years of unprecedented drought beginning in 1198 BCE. This caused widespread harvest failures, triggering social upheaval and the collapse of the Hittite imperial capital of Hattusa."
      }
    ],
    questions: [
      {
        id: "q41",
        questionNumber: 41,
        sectionContext: "Wood Specimen Origin",
        sentencePrompt: "Archaeological beams were primarily preserved from ancient ______ timber.",
        preText: "Archaeological beams were primarily preserved from ancient",
        postText: "timber.",
        expectedAnswer: "juniper",
        acceptableAlternatives: ["pine"],
        maxWords: 1,
        distractor: "cedar",
        shorthandNoteCue: "wood samples ← preserved ancient juniper logs",
        timestampSeconds: 40,
        acousticNote: "Type of tree genus.",
        singularPluralTrapWarning: "Singular 'juniper'."
      },
      {
        id: "q42",
        questionNumber: 42,
        sectionContext: "Chemical Markers",
        sentencePrompt: "Analysis of ______ ratios within tree cellulose reveals historical humidity levels.",
        preText: "Analysis of",
        postText: "ratios within tree cellulose reveals historical humidity levels.",
        expectedAnswer: "oxygen",
        acceptableAlternatives: ["carbon"],
        maxWords: 1,
        distractor: "nitrogen",
        shorthandNoteCue: "extract carbon & oxygen isotopes \\from cellulose",
        timestampSeconds: 85,
        acousticNote: "'carbon and oxygen isotopes'.",
        singularPluralTrapWarning: "Singular noun 'oxygen'."
      },
      {
        id: "q43",
        questionNumber: 43,
        sectionContext: "Structural Indicators",
        sentencePrompt: "Severe water shortage is physically represented by narrower ______ between growth rings.",
        preText: "Severe water shortage is physically represented by narrower",
        postText: "between growth rings.",
        expectedAnswer: "spacing",
        acceptableAlternatives: ["spaces"],
        maxWords: 1,
        distractor: "widths",
        shorthandNoteCue: "narrower ring spacing + \\inc C13 → \\dec moisture",
        timestampSeconds: 105,
        acousticNote: "'narrower ring spacing'.",
        singularPluralTrapWarning: "Uncountable 'spacing'."
      },
      {
        id: "q44",
        questionNumber: 44,
        sectionContext: "Crisis Catalysts",
        sentencePrompt: "Historical texts show the civilization endured three consecutive seasons of ______.",
        preText: "Historical texts show the civilization endured three consecutive seasons of",
        postText: ".",
        expectedAnswer: "drought",
        acceptableAlternatives: ["droughts"],
        maxWords: 1,
        distractor: "frost",
        shorthandNoteCue: "3 yrs consecutive drought (1198 BCE) → harvest failure",
        timestampSeconds: 140,
        acousticNote: "'unprecedented drought'.",
        singularPluralTrapWarning: "Singular 'drought'."
      },
      {
        id: "q45",
        questionNumber: 45,
        sectionContext: "Societal Aftermath",
        sentencePrompt: "The agricultural catastrophe ultimately precipitated the abandonment of the imperial ______.",
        preText: "The agricultural catastrophe ultimately precipitated the abandonment of the imperial",
        postText: ".",
        expectedAnswer: "capital",
        acceptableAlternatives: ["city"],
        maxWords: 1,
        distractor: "monuments",
        shorthandNoteCue: "harvest failure → collapse of imperial capital (Hattusa)",
        timestampSeconds: 170,
        acousticNote: "'imperial capital of Hattusa'.",
        singularPluralTrapWarning: "Singular 'capital'."
      }
    ],
    modelShorthandSheet: {
      bulletPoints: [
        "specimens = ancient juniper logs w/o fungal rot",
        "sample prep: carbon & oxygen isotopes from cellulose rings",
        "narrow ring spacing + ↑ C-13 = extreme moisture deficit",
        "1198 BCE: 3 yrs consecutive drought → widespread crop loss",
        "econ collapse → downfall of Hittite capital"
      ]
    }
  },
  {
    id: "sec4_mycelium_biocomposites",
    title: "Mycelium Bio-Composites & Circular Construction",
    academicDiscipline: "Sustainable Biomaterials Engineering",
    accent: "Canadian",
    speakerName: "Dr. Marcus Tremblay",
    durationSeconds: 180,
    introTranscript: "As the construction sector accounts for nearly 40% of global carbon emissions, bio-fabricated mycelium composites present an unprecedented frontier...",
    audioSections: [
      {
        title: "Section A: Growth Substrates & Inoculation",
        startSec: 0,
        endSec: 55,
        transcriptSnippet: "The cultivation process begins by inoculating agricultural waste such as hemp husks or sawdust with fungal hyphae. Over a five to seven day incubation window in dark bioreactors, the fungal network digests the lignin, binding the loose fibres into a rigid composite matrix."
      },
      {
        title: "Section B: Thermal & Acoustic Properties",
        startSec: 55,
        endSec: 120,
        transcriptSnippet: "Once baked in kilns to arrest growth, the dried panels display exceptional thermal conductivity, outperforming synthetic polystyrene. Furthermore, the micro-porous matrix provides superior acoustic dampening, especially for low-frequency vibrations."
      },
      {
        title: "Section C: Fire Retardance & Biodegradability",
        startSec: 120,
        endSec: 180,
        transcriptSnippet: "When subjected to open flame, mycelium forms an insulative layer of carbonaceous char rather than releasing toxic fumes. At end-of-life, the material biodegrades completely in soil within twelve weeks, enriching nutrient levels."
      }
    ],
    questions: [
      {
        id: "q46",
        questionNumber: 46,
        sectionContext: "Substrate Composition",
        sentencePrompt: "Fungal spores are combined with leftover agricultural ______ like hemp husks.",
        preText: "Fungal spores are combined with leftover agricultural",
        postText: "like hemp husks.",
        expectedAnswer: "waste",
        acceptableAlternatives: ["residues"],
        maxWords: 1,
        distractor: "crops",
        shorthandNoteCue: "hyphae + ag waste (hemp husks) in bioreactors",
        timestampSeconds: 30,
        acousticNote: "'agricultural waste'.",
        singularPluralTrapWarning: "Uncountable 'waste'."
      },
      {
        id: "q47",
        questionNumber: 47,
        sectionContext: "Biological Binding",
        sentencePrompt: "Fungal hyphae naturally break down the ______ in plant material to create cohesion.",
        preText: "Fungal hyphae naturally break down the",
        postText: "in plant material to create cohesion.",
        expectedAnswer: "lignin",
        acceptableAlternatives: ["cellulose"],
        maxWords: 1,
        distractor: "protein",
        shorthandNoteCue: "fungus digests lignin → binds loose fibres",
        timestampSeconds: 50,
        acousticNote: "Scientific term 'lignin'.",
        singularPluralTrapWarning: "Uncountable chemical compound."
      },
      {
        id: "q48",
        questionNumber: 48,
        sectionContext: "Acoustic Performance",
        sentencePrompt: "The microscopic pores are particularly effective at neutralizing low-frequency ______.",
        preText: "The microscopic pores are particularly effective at neutralizing low-frequency",
        postText: ".",
        expectedAnswer: "vibrations",
        acceptableAlternatives: ["vibration", "noises"],
        maxWords: 1,
        distractor: "frequencies",
        shorthandNoteCue: "micro-pores → dampens low-freq vibrations",
        timestampSeconds: 110,
        acousticNote: "'low-frequency vibrations'.",
        singularPluralTrapWarning: "Plural 'vibrations'."
      },
      {
        id: "q49",
        questionNumber: 49,
        sectionContext: "Fire Resistance",
        sentencePrompt: "Under direct heat, the material develops a protective shield of ______.",
        preText: "Under direct heat, the material develops a protective shield of",
        postText: ".",
        expectedAnswer: "char",
        acceptableAlternatives: ["carbon"],
        maxWords: 1,
        distractor: "ash",
        shorthandNoteCue: "flame test: forms carbonaceous char w/o toxic gas",
        timestampSeconds: 145,
        acousticNote: "'carbonaceous char'.",
        singularPluralTrapWarning: "Singular 'char'."
      },
      {
        id: "q50",
        questionNumber: 50,
        sectionContext: "Decomposition Lifecycle",
        sentencePrompt: "Disposed panels decompose into organic matter in approximately twelve ______.",
        preText: "Disposed panels decompose into organic matter in approximately twelve",
        postText: ".",
        expectedAnswer: "weeks",
        acceptableAlternatives: ["wks"],
        maxWords: 1,
        distractor: "months",
        shorthandNoteCue: "end of life: biodegrades completely in 12 wks",
        timestampSeconds: 165,
        acousticNote: "'within twelve weeks'.",
        singularPluralTrapWarning: "Plural 'weeks' following number twelve."
      }
    ],
    modelShorthandSheet: {
      bulletPoints: [
        "hyphae + ag waste (hemp) → digests lignin → rigid composite",
        "baked in kilns → arrest growth",
        "thermal performance > polystyrene",
        "pores → absorb low-freq vibrations",
        "flame → protective char w/o toxic fumes; decomp in 12 weeks"
      ]
    }
  }
];
