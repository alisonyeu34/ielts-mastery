/**
 * Mock Memory Palace Cue Card Prompts & 4-Room Pedagogy Data
 * IELTS Speaking Part 2 Cognitive Architecture (Band 7.5 - 8.5+)
 */

import { SensoryAdjective } from '../lib/memoryPalacePacer';

export interface MemoryPalacePrompt {
  id: string;
  topic: string;
  category: 'Decision' | 'Person' | 'Conflict' | 'Place' | 'Technology' | 'Literature' | 'Environment' | 'Culture' | 'Challenge' | 'History' | 'Creativity' | 'Society';
  cueCardSubPrompts: string[];
  samplePalacePlan: {
    room1: {
      title: string;
      keywords: string[];
      notes: string;
    };
    room2: {
      title: string;
      keywords: string[];
      sensoryFocus: string;
      notes: string;
    };
    room3: {
      title: string;
      keywords: string[];
      conflictType: string;
      notes: string;
    };
    room4: {
      title: string;
      keywords: string[];
      philosophicalThesis: string;
      notes: string;
    };
  };
  sensorySuggestions: SensoryAdjective[];
  band8Transcript: string;
  examinerNotes: string[];
}

export const MOCK_MEMORY_PALACE_PROMPTS: MemoryPalacePrompt[] = [
  {
    id: 'mp-01',
    topic: 'Describe an ambitious decision you made that significantly transformed your perspective.',
    category: 'Decision',
    cueCardSubPrompts: [
      'What the decision was and when you made it',
      'What alternatives you were contemplating',
      'What obstacles or friction you encountered',
      'And explain how this decision fundamentally altered your worldview.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Crossroad',
        keywords: ['Undergrad crossroad', 'Corporate vs Startup', 'Autumn 2022'],
        notes: 'To trace the genesis of this encounter, I must cast my mind back to late 2022, when I stood at an existential fork in the road between a lucrative corporate offer and an unproven tech venture.'
      },
      room2: {
        title: 'Room 2: Sensory Immersion',
        keywords: ['Incandescent monitors', 'Pungent espresso', 'Cacophonous debates'],
        sensoryFocus: 'Sight & Scent & Sound',
        notes: 'Stepping into our ramshackle incubator, the visual landscape was dominated by incandescent monitors and whiteboard scribbles, engulfed by the pungent aroma of roasted espresso.'
      },
      room3: {
        title: 'Room 3: The Crucible & Near-Collapse',
        keywords: ['Sudden cash drought', 'Hostile pivot', 'Visceral anxiety'],
        conflictType: 'Financial impasse & ideological strain',
        notes: 'However, our trajectory took an unforeseen pivot when seed capital dried up overnight, thrusting our team into a visceral battle against insolvency and self-doubt.'
      },
      room4: {
        title: 'Room 4: Balcony of Hindsight',
        keywords: ['Calculated resilience', 'Epistemic autonomy', 'Future outlook'],
        philosophicalThesis: 'True agency is forged in volatile ambiguity rather than predictable comfort.',
        notes: 'Perched upon the balcony of hindsight, I now recognize that choosing uncertainty dismantled my fear of failure, instilling an enduring cognitive resilience.'
      }
    },
    sensorySuggestions: [
      { dimension: 'sight', word: 'incandescent', ipa: '/ˌɪn.kænˈdes.ənt/', meaningVi: 'sáng rực rỡ', example: 'Incandescent screens illuminating late-night brainstorming', band: 'C2' },
      { dimension: 'sound', word: 'cacophonous', ipa: '/kəˈkɑː.fə.nəs/', meaningVi: 'huyên náo hỗn tạp', example: 'Cacophonous clash of competing architectural visions', band: 'C2' },
      { dimension: 'scent', word: 'pungent', ipa: '/ˈpʌn.dʒənt/', meaningVi: 'nồng nàn xốc khứu giác', example: 'Pungent aroma of dark roasted arabica', band: 'C1' },
      { dimension: 'emotion', word: 'visceral', ipa: '/ˈvɪs.ər.əl/', meaningVi: 'bản năng, thấu tâm can', example: 'A visceral dread of letting down colleagues', band: 'C2' }
    ],
    band8Transcript: 'To trace the genesis of this milestone, I must cast my mind back to the autumn of 2022, when I reached an existential crossroad upon completing my undergraduate studies. I had been offered a comfortable corporate traineeship with a blue-chip financial conglomerate; yet, simultaneously, an opportunity arose to co-found a high-risk educational technology startup.\n\nStepping into the tactile reality of that decision, our cramped co-working studio was engulfed in a distinctive sensory atmosphere. The incandescent glow of multi-monitor arrays illuminated whiteboard diagrams, while the air hung heavy with the pungent scent of double-shot espresso and the cacophonous banter of exhausted developers.\n\nHowever, the narrative took an unforeseen pivot around the four-month mark. Our primary venture angel withdrew commitments unexpectedly, precipitating a severe cash-flow drought. We were thrust into a crucible of visceral tension, forced to execute an immediate operational pivot within forty-eight sleepless hours.\n\nPerched upon the balcony of hindsight, I now realize that this trial by fire was invaluable. It fundamentally recalibrated my risk calculus: true security is not derived from static institutions, but from adaptive resilience. Looking ahead, this profound revelation continues to anchor my professional philosophy.',
    examinerNotes: [
      'Fluency & Coherence: Perfect 4-room pacing (30s genesis, 30s sensory, 30s crisis, 30s reflection).',
      'Lexical Resource: Rich sensory palette (incandescent, cacophonous, crucible, visceral tension).',
      'Grammar: Sophisticated syntactic inversion and participial modifiers.'
    ]
  },
  {
    id: 'mp-02',
    topic: 'Describe a memorable encounter with an exceptional mentor who altered your academic trajectory.',
    category: 'Person',
    cueCardSubPrompts: [
      'Who this mentor was and where you met them',
      'What subject or discipline they guided you through',
      'What pedagogical methods made them extraordinary',
      'And explain the profound imprint they left on your intellectual curiosity.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & First Lecture',
        keywords: ['Spring 2021', 'Prof. Montgomery', 'Vast auditorium'],
        notes: 'To trace the genesis of this intellectual awakening, I must reflect upon my sophomore semester in 2021 when I attended an introductory epistemology seminar led by Dr. Montgomery.'
      },
      room2: {
        title: 'Room 2: The Socratic Atmosphere',
        keywords: ['Sonorous voice', 'Hushed silence', 'Weathered leather books'],
        sensoryFocus: 'Sound & Touch & Sight',
        notes: 'The lecture hall possessed a hushed reverence, punctuated by his sonorous voice and the rustic rustle of antique manuscripts that adorned his podium.'
      },
      room3: {
        title: 'Room 3: The Intellectual Impasse',
        keywords: ['Thesis dismantled', 'Cognitive dissonance', 'Methodological reset'],
        conflictType: 'Ego destruction & dialectical challenge',
        notes: 'However, my complacency was shattered during a 1-on-1 supervision when he systematically dismantled my superficial essay, compelling me to rebuild my thesis from scratch.'
      },
      room4: {
        title: 'Room 4: The Balcony of Legacy',
        keywords: ['Epistemic humility', 'Intellectual rigor', 'Lifelong compass'],
        philosophicalThesis: 'True education is not the filling of a vessel, but the kindling of a critical flame.',
        notes: 'Looking back from a broader perspective, Dr. Montgomery instilled in me a deep sense of epistemic humility that continues to guide my research approach.'
      }
    },
    sensorySuggestions: [
      { dimension: 'sound', word: 'sonorous', ipa: '/ˈsɑː.nər.əs/', meaningVi: 'trầm ấm vang vọng', example: 'A sonorous baritone commanding immediate attention', band: 'C2' },
      { dimension: 'sound', word: 'hushed', ipa: '/hʌʃt/', meaningVi: 'tĩnh mịch trang nghiêm', example: 'Hushed stillness settling over the lecture theatre', band: 'C1' },
      { dimension: 'touch', word: 'tactile', ipa: '/ˈtæk.taɪl/', meaningVi: 'mang tính xúc chạm thực tế', example: 'The tactile roughness of heavy vellum manuscripts', band: 'C2' },
      { dimension: 'emotion', word: 'apprehensive', ipa: '/ˌæp.rəˈhen.sɪv/', meaningVi: 'bồn chồn lo âu', example: 'Apprehensive anticipation before defending my draft', band: 'C1' }
    ],
    band8Transcript: 'To trace the genesis of this academic turning point, I must cast my mind back to the spring of 2021, during my second year of university. I had enrolled in an advanced linguistics seminar presided over by Emeritus Professor Julian Montgomery, a renowned scholar in cognitive semantics.\n\nStepping into his lecture hall, the environment was charged with a palpable aura of scholarly devotion. The hushed, reverent stillness of eighty students was only broken by Dr. Montgomery\'s sonorous voice and the tactile rustle of weathered manuscripts. He never relied on standardized presentation slides; instead, he animated abstract theories through spontaneous, incandescent dialectics.\n\nHowever, the watershed moment occurred midway through term during a mandatory dissertation review. Having submitted what I presumed was an airtight paper, Dr. Montgomery dissected my core premise with surgical precision, exposing glaring logical fallacies. For forty-five agonizing minutes, I experienced intense cognitive dissonance as my intellectual complacency was systematically dismantled.\n\nPerched upon the balcony of hindsight, I now realize that this intellectual humilation was the greatest pedagogical gift. He taught me that genuine scholarship demands relentless self-interrogation rather than defensive rationalization. Moving forward, this commitment to epistemic rigor remains my steadfast academic compass.',
    examinerNotes: [
      'Lexical Diversity: Sophisticated collocations (epistemic rigor, cognitive dissonance, surgical precision).',
      'Pacing: Flawless distribution across time anchors without filler hesitations.',
      'Fluency: Seamless transition from sensory classroom depiction into intellectual crisis.'
    ]
  },
  {
    id: 'mp-03',
    topic: 'Describe a challenging conflict or impasse you navigated during a high-stakes project.',
    category: 'Conflict',
    cueCardSubPrompts: [
      'What the project was and what role you assumed',
      'Why the conflict or disagreement emerged',
      'How you mediated and defused the escalating tension',
      'And explain what you discovered about human diplomacy and collaborative resilience.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Context',
        keywords: ['Cross-functional Hackathon', 'Team Lead', 'Winter 2023'],
        notes: 'To trace the genesis of this high-stakes encounter, I must revisit the winter of 2023 when I served as lead coordinator for an inter-university civic technology competition.'
      },
      room2: {
        title: 'Room 2: Sensory Pressure',
        keywords: ['Sweltering server room', 'Ticking clock', 'Frayed nerves'],
        sensoryFocus: 'Touch & Sound & Emotion',
        notes: 'The room felt sweltering under the hum of overheating server racks, while the relentless ticking of the digital countdown exacerbated everyone\'s frayed nerves.'
      },
      room3: {
        title: 'Room 3: The Irreconcilable Clash',
        keywords: ['UI vs Backend schism', 'Walkout threat', 'Radical empathy bridge'],
        conflictType: 'Ideological architectural divide',
        notes: 'At 3:00 AM, our lead designer and backend architect reached an irreconcilable deadlock over data privacy protocols, threatening a project-derailing walkout.'
      },
      room4: {
        title: 'Room 4: Balcony of Diplomacy',
        keywords: ['Constructive compromise', 'Collaborative synergy', 'Leadership maturity'],
        philosophicalThesis: 'Effective leadership is the art of holding divergent truths in productive tension.',
        notes: 'Looking back from a reflective vantage point, defusing that crisis transformed my understanding of conflict from a destructive liability into a catalyst for deeper cohesion.'
      }
    },
    sensorySuggestions: [
      { dimension: 'touch', word: 'sweltering', ipa: '/ˈswel.tɚ.ɪŋ/', meaningVi: 'nóng bức ngột ngạt', example: 'Sweltering atmosphere inside the unventilated hackathon basement', band: 'C1' },
      { dimension: 'sound', word: 'cacophonous', ipa: '/kəˈkɑː.fə.nəs/', meaningVi: 'chát chúa huyên náo', example: 'Cacophonous barrage of overlapping heated arguments', band: 'C2' },
      { dimension: 'emotion', word: 'visceral', ipa: '/ˈvɪs.ər.əl/', meaningVi: 'cảm xúc nghẹt thở', example: 'A visceral weight of imminent collective failure', band: 'C2' },
      { dimension: 'sight', word: 'kaleidoscopic', ipa: '/kəˌlaɪ.dəˈskɑː.pɪk/', meaningVi: 'biến đổi chóng mặt', example: 'A kaleidoscopic flurry of error logs cascading down the screen', band: 'C2' }
    ],
    band8Transcript: 'To trace the genesis of this high-stakes ordeal, I must cast my mind back to late 2023, when I was appointed project coordinator for an inter-university hackathon aiming to construct an open-source urban disaster response platform.\n\nStepping into our competition bunker, the sensory pressure was palpable. The air in the basement was sweltering and thick with the hum of cooling fans, while the relentless glare of terminal screens created an intense, almost claustrophobic atmosphere. Frayed nerves were amplified by the relentless countdown timer ticking down the final ten hours.\n\nHowever, an acute crisis erupted at approximately 3:00 AM when a fundamental philosophical schism materialized between our lead UX designer and lead systems engineer. One insisted on an ultra-secure encryption framework that increased input latency, while the other demanded frictionless speed. Voices escalated, threats of abandonment were traded, and the entire endeavor hovered on the brink of total collapse. Recognizing the imminent peril, I intervened not by imposing top-down authority, but by staging a fifteen-minute structured mediation that reframed their conflicting demands as complementary pillars.\n\nPerched upon the balcony of hindsight, I recognize that this episode was an indispensable masterclass in organizational psychology. It demonstrated that friction is not inherently toxic; rather, when channeled with emotional equilibrium, divergent perspectives yield a far more robust synthesis.',
    examinerNotes: [
      'Discourse Management: Masterful use of narrative tension and resolution.',
      'Idiomatic & Lexical Precision: "philosophical schism", "imminent peril", "emotional equilibrium".',
      'Pacing: Natural 4-stage progression with clear temporal markers.'
    ]
  },
  {
    id: 'mp-04',
    topic: 'Describe an awe-inspiring architectural marvel or cultural sanctuary you visited.',
    category: 'Place',
    cueCardSubPrompts: [
      'Where this place is and when you traveled there',
      'What architectural or structural features fascinated you',
      'What sensory emotions you experienced while exploring it',
      'And explain why this sanctuary left an indelible impression on your soul.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Journey',
        keywords: ['Kyoto temples', 'Autumn dawn 2022', 'Ryoan-ji zen garden'],
        notes: 'To trace the genesis of this transcendent pilgrimage, I must return to the autumn of 2022, when I undertook a solitary expedition to Kyoto.'
      },
      room2: {
        title: 'Room 2: Sensory Tapestry',
        keywords: ['Velvety moss', 'Petrichor after rain', 'Melodious bamboo flute'],
        sensoryFocus: 'Touch & Scent & Sound & Sight',
        notes: 'The temple courtyard offered a mesmerizing sensory landscape: velvety emerald moss carpets, the intoxicating petrichor of damp slate, and the faint melodies of bamboo water flutes.'
      },
      room3: {
        title: 'Room 3: The Paradoxical Rock Arrangement',
        keywords: ['15 stone enigma', 'Hidden vantage point', 'Existential realization'],
        conflictType: 'Cognitive paradox & perceptual limitation',
        notes: 'However, the profound mystery arose when contemplating the dry rock garden: from no single perspective could all 15 stones be viewed simultaneously, creating a deliberate visual paradox.'
      },
      room4: {
        title: 'Room 4: Balcony of Zen Philosophy',
        keywords: ['Wabi-sabi appreciation', 'Embracing imperfection', 'Mental tranquility'],
        philosophicalThesis: 'Completeness is an illusion of the ego; true peace lies in accepting human partiality.',
        notes: 'Perched upon the balcony of contemplation, this sanctuary dismantled my modern obsession with hyper-productivity, re-centering my life around mindful presence.'
      }
    },
    sensorySuggestions: [
      { dimension: 'touch', word: 'velvety', ipa: '/ˈvel.və.t̬i/', meaningVi: 'mịn màng êm ái', example: 'Velvety moss cloaking centuries-old temple stones', band: 'C1' },
      { dimension: 'scent', word: 'petrichor', ipa: '/ˈpet.rɪ.kɔːr/', meaningVi: 'mùi đất ẩm sau mưa', example: 'Pervasive petrichor mingling with cedar incense', band: 'C2' },
      { dimension: 'sound', word: 'melodious', ipa: '/məˈloʊ.di.əs/', meaningVi: 'du dương êm đềm', example: 'Melodious resonance of distant temple bells', band: 'C1' },
      { dimension: 'sight', word: 'picturesque', ipa: '/ˌpɪk.tʃərˈesk/', meaningVi: 'đẹp như tranh mặc thủy', example: 'Picturesque raked gravel mimicking ocean ripples', band: 'C1' }
    ],
    band8Transcript: 'To trace the genesis of this unforgettable journey, I must transport my thoughts back to October 2022, when I embarked on a contemplative solo excursion to the ancient Japanese capital of Kyoto, specifically seeking out the centuries-old Zen sanctuary of Ryoan-ji.\n\nStepping past the cedar gate at daybreak, I was immediately enveloped in a multi-layered sensory sanctuary. The air carried the intoxicating petrichor of morning rainfall mixed with the subtle fragrance of burning sandalwood. Beneath the maple canopy lay vast expanses of velvety emerald moss, while the only sound punctuating the hushed silence was the melodious, rhythmic trickle of a bamboo water pipe against smooth stone.\n\nHowever, the centerpiece of the sanctuary presents an intriguing perceptual riddle. The celebrated dry landscape garden consists of fifteen meticulously placed boulders upon raked white gravel. Yet, owing to deliberate optical engineering, it is geometrically impossible to perceive all fifteen stones simultaneously from any single vantage point on the veranda.\n\nPerched upon the balcony of philosophical hindsight, this structural paradox struck me with profound force. It embodies the Japanese aesthetic of wabi-sabi—the humility to accept that human comprehension is inherently partial and incomplete. That morning permanently recalibrated my relationship with perfectionism, providing a serene inner anchor that I carry to this day.',
    examinerNotes: [
      'Lexical Resource: Exquisite sensory lexicon (wabi-sabi, petrichor, perceptual riddle).',
      'Coherence & Cohesion: Effortless thematic flow from external landscape to internal philosophical realization.',
      'Fluency: Consistent academic cadence without pause or hesitation.'
    ]
  },
  {
    id: 'mp-05',
    topic: 'Describe a technological innovation that profoundly revolutionized your daily cognitive workflow.',
    category: 'Technology',
    cueCardSubPrompts: [
      'What technology or application it is and when you adopted it',
      'What legacy habits or friction it superseded',
      'What unexpected dependencies or learning curves arose',
      'And explain how it transformed your cognitive efficiency and creative output.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Fragmented Chaos',
        keywords: ['Fragmented notes', 'Second Brain system', 'Early 2023'],
        notes: 'To trace the genesis of my digital workflow overhaul, I must recall early 2023 when my research process was drowning in scattered sticky notes and disjointed documents.'
      },
      room2: {
        title: 'Room 2: The Graph Network Visuals',
        keywords: ['Luminescent node graph', 'Tactile keyboard shortcuts', 'Crystalline order'],
        sensoryFocus: 'Sight & Touch & Emotion',
        notes: 'Adopting bidirectional network software transformed my screen into a luminescent constellation of interconnected thoughts, operated via seamless tactile shortcuts.'
      },
      room3: {
        title: 'Room 3: The Over-Optimization Trap',
        keywords: ['Plugin rabbit hole', 'Productivity paralysis', 'Friction resolution'],
        conflictType: 'Technological obsession vs actual output',
        notes: 'However, a month in, I fell into the trap of over-engineering plugins, wasting dozens of hours building systems rather than producing substantive academic writing.'
      },
      room4: {
        title: 'Room 4: Balcony of Augmented Cognition',
        keywords: ['Cognitive scaffolding', 'Synthesized knowledge', 'Future scalability'],
        philosophicalThesis: 'Tools should serve as invisible prosthetics for thought, not burdensome temples of organization.',
        notes: 'From a mature perspective, streamlining the system unlocked exponential synthesis capacity, permanently elevating my intellectual productivity.'
      }
    },
    sensorySuggestions: [
      { dimension: 'sight', word: 'luminescent', ipa: '/ˌluː.mɪˈnes.ənt/', meaningVi: 'phát sáng kỳ ảo', example: 'A luminescent network graph visualizing dynamic concept links', band: 'C1' },
      { dimension: 'touch', word: 'tactile', ipa: '/ˈtæk.taɪl/', meaningVi: 'cảm giác xúc giác phím cơ', example: 'The tactile rhythm of mechanical keystrokes', band: 'C2' },
      { dimension: 'emotion', word: 'euphoric', ipa: '/juːˈfɔːr.ɪk/', meaningVi: 'hân hoan bứt phá', example: 'A euphoric sense of breakthrough when connecting distant ideas', band: 'C2' },
      { dimension: 'emotion', word: 'apprehensive', ipa: '/ˌæp.rəˈhen.sɪv/', meaningVi: 'lo âu phụ thuộc công nghệ', example: 'Felt mildly apprehensive regarding digital over-reliance', band: 'C1' }
    ],
    band8Transcript: 'To trace the genesis of this technological transition, I must cast my mind back to the beginning of 2023. At the time, my academic research was plagued by severe information fragmentation, with literature reviews scattered across disparate cloud drives and disorganized physical notebooks.\n\nEverything changed when I integrated a bidirectional networked knowledge tool into my routine. Visually, my workspace transformed from chaotic lists into a luminescent graph view—a living constellation of interconnected nodes where every scholarly reference dynamically hyperlinked to related arguments. Navigating this interface with tactile keyboard shortcuts delivered a remarkably fluid cognitive flow.\n\nHowever, the honeymoon phase encountered an unexpected friction point. I became seduced by the rabbit hole of obsessive customization, spending entire weekends configuring plugins and graph visualizers rather than writing substantive analyses. I realized that my tool had metastasized into a sophisticated form of procrastination.\n\nPerched upon the balcony of hindsight, stripping the tool down to its bare essentials liberated its true potential. It now functions not as an ornate digital museum, but as an invisible cognitive exoskeleton that amplifies my pattern recognition and conceptual synthesis across multidisciplinary domains.',
    examinerNotes: [
      'Lexical Sophistication: Metaphorical range ("cognitive exoskeleton", "living constellation", "information fragmentation").',
      'Structural Maturity: 4-room pacing avoids typical flat technical descriptions.',
      'Grammar: Complex nominalizations and conditional reflections.'
    ]
  },
  {
    id: 'mp-06',
    topic: 'Describe a profound book or piece of literature that challenged your foundational beliefs.',
    category: 'Literature',
    cueCardSubPrompts: [
      'What book it was and how you discovered it',
      'What core thesis or narrative captivated you',
      'What intellectual struggle or resistance you experienced while reading it',
      'And explain how it fundamentally reshaped your moral or philosophical outlook.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Antiquarian Bookshop',
        keywords: ['Rainy afternoon 2020', 'Thinking, Fast & Slow', 'Kahneman'],
        notes: 'To trace the genesis of this intellectual reckoning, I must return to a dreary afternoon in 2020 when I unearthed Daniel Kahneman\'s masterwork in a second-hand bookstore.'
      },
      room2: {
        title: 'Room 2: Sensory of Reading',
        keywords: ['Velvety yellowed pages', 'Aromatic aged paper', 'Hushed study'],
        sensoryFocus: 'Touch & Scent & Sound',
        notes: 'Submerged in a hushed corner of my study, the tactile sensation of heavy yellowed pages and the aromatic scent of aged binding accompanied my journey.'
      },
      room3: {
        title: 'Room 3: The Ego Shattering',
        keywords: ['Cognitive biases exposed', 'Illusion of rationality', 'Defensive denial'],
        conflictType: 'Psychological crisis of self-perception',
        notes: 'However, reading chapter after chapter triggered acute cognitive resistance as Kahneman systematically exposed the systemic cognitive fallacies governing my everyday judgments.'
      },
      room4: {
        title: 'Room 4: Balcony of Cognitive Humility',
        keywords: ['System 2 vigilance', 'Empathy for human bias', 'Evolving decisions'],
        philosophicalThesis: 'True wisdom begins with the sober acknowledgment of one\'s inherent irrationality.',
        notes: 'Reflecting from the balcony of hindsight, that book cured my intellectual arrogance, making me far more compassionate toward human error.'
      }
    },
    sensorySuggestions: [
      { dimension: 'touch', word: 'velvety', ipa: '/ˈvel.və.t̬i/', meaningVi: 'mịn như nhung', example: 'Velvety texture of vintage paper under my fingertips', band: 'C1' },
      { dimension: 'scent', word: 'aromatic', ipa: '/ˌær.əˈmæt̬.ɪk/', meaningVi: 'thơm nồng đặc trưng', example: 'Aromatic musk of ancient library stacks', band: 'C1' },
      { dimension: 'sound', word: 'hushed', ipa: '/hʌʃt/', meaningVi: 'yên ắng sâu lắng', example: 'Hushed stillness of twilight contemplation', band: 'C1' },
      { dimension: 'emotion', word: 'visceral', ipa: '/ˈvɪs.ər.əl/', meaningVi: 'chấn động tâm can', example: 'A visceral shock at uncovering my own confirmation biases', band: 'C2' }
    ],
    band8Transcript: 'To trace the genesis of this intellectual awakening, I must cast my mind back to the monsoon season of 2020, during the initial phases of global lockdowns. Stumbling upon Daniel Kahneman\'s seminal treatise, "Thinking, Fast and Slow," I anticipated a dry academic psychology text, unaware of the paradigm shift awaiting me.\n\nEngrossed in my private study, the reading experience was deeply immersive. The hushed solitude of late nights was accompanied by the aromatic scent of aging paper and the tactile friction of flipping dense, notation-filled pages. Every diagram illuminated the intricate machinery of human cognitive architecture.\n\nHowever, navigating the text provoked severe intellectual resistance. Kahneman did not merely theorize; he subjected the reader to empirical puzzles that repeatedly exposed my own vulnerability to anchoring biases, availability heuristics, and overconfidence. Experiencing firsthand how effortlessly my intuitive mind bypassed rigorous logic triggered an uncomfortable crisis of self-perception.\n\nPerched upon the balcony of hindsight, this humbling exposure was immensely liberating. It disabused me of the naive belief in infallible human rationality. In my present decision-making, I now deliberately institute "System 2" reflective pauses, cultivating a lifelong commitment to intellectual modesty and nuanced empathy.',
    examinerNotes: [
      'Discourse Nuance: Seamless integration of abstract cognitive concepts with personal growth.',
      'Range: Rich usage of C2 psychological and epistemological terms.',
      'Timing: Exact 120-second delivery model without rushing or lagging.'
    ]
  },
  {
    id: 'mp-07',
    topic: 'Describe an environmental initiative or conservation project you actively participated in.',
    category: 'Environment',
    cueCardSubPrompts: [
      'What the initiative was and where it took place',
      'What physical actions or tasks you undertook',
      'What environmental degradation or resistance you witnessed',
      'And explain the long-term ecological and community impact it generated.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Coastal Call',
        keywords: ['Mangrove reforestation', 'Summer 2023', 'Mekong Delta fringe'],
        notes: 'To trace the genesis of this ecological mission, I must look back to the blistering summer of 2023 when I volunteered for a coastal mangrove restoration campaign.'
      },
      room2: {
        title: 'Room 2: Sensory of the Mudflat',
        keywords: ['Biting salt spray', 'Pungent tidal silt', 'Cacophonous gulls'],
        sensoryFocus: 'Touch & Scent & Sound & Sight',
        notes: 'Wading into the coastal mudflats, we were met by the pungent sulfur of tidal silt, the biting sting of saline mist, and the cacophonous screech of coastal seabirds.'
      },
      room3: {
        title: 'Room 3: The Storm Surge Crisis',
        keywords: ['Flash tidal surge', 'Uprooted saplings', 'Midnight rescue'],
        conflictType: 'Natural adversity & physical exhaustion',
        notes: 'On our third night, an unseasonal storm surge threatened to sweep away 2,000 newly planted propagules, requiring an emergency midnight salvage effort.'
      },
      room4: {
        title: 'Room 4: Balcony of Ecological Stewardship',
        keywords: ['Living biosheild', 'Community ownership', 'Intergenerational pact'],
        philosophicalThesis: 'Nature conservation is not charity to the earth, but the preservation of our own collective future.',
        notes: 'Looking back from a broader perspective, watching those resilient saplings root firmly reinforced my belief in grassroots ecological action.'
      }
    },
    sensorySuggestions: [
      { dimension: 'touch', word: 'biting', ipa: '/ˈbaɪ.t̬ɪŋ/', meaningVi: 'buốt buốt rát rát', example: 'Biting sting of coastal brine and relentless sun', band: 'C1' },
      { dimension: 'scent', word: 'pungent', ipa: '/ˈpʌn.dʒənt/', meaningVi: 'nồng đậm mùi bùn khoáng', example: 'Pungent aroma of rich estuarine mangrove mud', band: 'C1' },
      { dimension: 'sound', word: 'cacophonous', ipa: '/kəˈkɑː.fə.nəs/', meaningVi: 'huyên náo rộn rã', example: 'Cacophonous squawking of returning migratory waders', band: 'C2' },
      { dimension: 'emotion', word: 'exhilarating', ipa: '/ɪɡˈzɪl.ə.reɪ.t̬ɪŋ/', meaningVi: 'phấn khích dâng trào', example: 'An exhilarating feeling of collective victory as the barrier held', band: 'C1' }
    ],
    band8Transcript: 'To trace the genesis of this conservation effort, I must cast my mind back to the summer of 2023, when I joined a youth-led ecological taskforce dedicated to restoring eroded mangrove estuaries in the lower coastal delta.\n\nStepping onto the intertidal mudflats, the experience engaged every single sense. We were knee-deep in rich, tactile mud that emitted a pungent, organic briny odor. The midday heat was relentless, with the biting glare of equatorial sunlight reflecting off the tidal flats, punctuated only by the cacophonous calls of coastal terns and plovers overhead.\n\nHowever, our expedition met a daunting obstacle on day four. An unexpected tropical depression triggered a ferocious tidal swell that threatened to uproot over three thousand delicate propagules we had painstakingly anchored. In torrential darkness, our entire brigade mobilized with headlamps, erecting makeshift bamboo baffles to absorb the hydraulic shock.\n\nPerched upon the balcony of hindsight, standing on that stabilized shoreline months later was profoundly moving. Those young trees now form a thriving green bio-shield against coastal typhoons. The project cemented my conviction that environmental resilience is achieved not through abstract discourse, but through dirty, determined community stewardship.',
    examinerNotes: [
      'Vocabulary: Specialized ecological lexicon (intertidal mudflats, bamboo baffles, propagules, bio-shield).',
      'Fluency: Dramatic narrative arc maintained across the 4 rooms.',
      'Pronunciation: Accurate intonation on descriptive sensory adjectives.'
    ]
  },
  {
    id: 'mp-08',
    topic: 'Describe a traditional festival or cultural rite of passage that evokes deep nostalgia.',
    category: 'Culture',
    cueCardSubPrompts: [
      'What the festival was and when you last celebrated it',
      'What ceremonial rituals and visual spectacles occurred',
      'What sensory fragrances, flavors, and melodies accompanied it',
      'And explain why this tradition serves as an emotional anchor in your identity.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Ancestral Village',
        keywords: ['Lunar New Year Eve', 'Grandparents’ ancestral home', 'Winter 2019'],
        notes: 'To trace the genesis of this cherished custom, I must revisit the winter of 2019, the last Lunar New Year we gathered in our ancestral village before rapid urbanization.'
      },
      room2: {
        title: 'Room 2: Sensory of the Communal Kitchen',
        keywords: ['Aromatic ginger & star anise', 'Luminescent paper lanterns', 'Sizzling hearth'],
        sensoryFocus: 'Scent & Sight & Sound',
        notes: 'The ancestral courtyard was illuminated by incandescent red lanterns, filled with the savory aroma of braised delicacies and the crackle of wood fires.'
      },
      room3: {
        title: 'Room 3: The Intergenerational Debate',
        keywords: ['Modernization tension', 'Preserving rituals', 'Emotional reconciliation'],
        conflictType: 'Tradition vs Modernity friction',
        notes: 'During midnight tea, a sharp discussion arose between younger cousins favoring minimalist digital gifts and elders mourning the erosion of solemn ancestral rites.'
      },
      room4: {
        title: 'Room 4: Balcony of Cultural Roots',
        keywords: ['Cultural continuity', 'Emotional sanctuary', 'Future legacy'],
        philosophicalThesis: 'Traditions are not worship of ashes, but the preservation of living fire across generations.',
        notes: 'Looking back from a reflective vantage point, that celebration solidified my appreciation for our cultural heritage as an unshakeable identity anchor.'
      }
    },
    sensorySuggestions: [
      { dimension: 'sight', word: 'incandescent', ipa: '/ˌɪn.kænˈdes.ənt/', meaningVi: 'đỏ rực ấm cúng', example: 'Incandescent red silk lanterns swaying in the night breeze', band: 'C2' },
      { dimension: 'scent', word: 'aromatic', ipa: '/ˌær.əˈmæt̬.ɪk/', meaningVi: 'thơm nức mũi', example: 'Aromatic steam rising from simmering pots of candied ginger', band: 'C1' },
      { dimension: 'sound', word: 'sonorous', ipa: '/ˈsɑː.nər.əs/', meaningVi: 'trầm hùng trang trọng', example: 'Sonorous strike of the ancestral bronze chime at midnight', band: 'C2' },
      { dimension: 'emotion', word: 'bittersweet', ipa: '/ˌbɪt̬.ɚˈswiːt/', meaningVi: 'bùi ngùi hoài niệm', example: 'A bittersweet awareness of aging elders gathered around the table', band: 'C1' }
    ],
    band8Transcript: 'To trace the genesis of this deep-seated nostalgia, I must cast my mind back to the Lunar New Year celebrations of 2019, which marked the final gathering in our ancestral northern homestead before the village was absorbed by suburban expansion.\n\nStepping into the courtyard on New Year\'s Eve was a masterclass in sensory immersion. Incandescent vermilion lanterns bathed the brick courtyard in a warm, festive luminescence. The air was saturated with the aromatic fragrance of burning agarwood incense, simmering pots of caramelized pork, and roasting star anise, while the sonorous laughter of four generations echoed against ancient roof tiles.\n\nHowever, a poignant tension surfaced around the midnight fire. A passionate debate emerged between the younger diaspora, who advocated for streamlining these labor-intensive rituals, and the patriarchs, who viewed the meticulous preparation of ancestral offerings as a sacred moral duty. Watching my grandfather defend each step with tearful eloquence brought an abrupt hush over the gathering.\n\nPerched upon the balcony of hindsight, I came to recognize that rituals are not archaic burdens, but vital psychic anchors in an increasingly transient world. That night forged an enduring commitment within me to safeguard these cultural threads, ensuring that the living fire of heritage is passed intact to future generations.',
    examinerNotes: [
      'Lexical Sophistication: "incandescent vermilion lanterns", "sacred moral duty", "transient world".',
      'Coherence: Natural transition between sensory nostalgia and generational friction.',
      'Grammatical Range: High density of compound-complex sentences with inversion.'
    ]
  },
  {
    id: 'mp-09',
    topic: 'Describe a high-pressure situation where you had to adapt spontaneously without preparation.',
    category: 'Challenge',
    cueCardSubPrompts: [
      'What the situation was and why you were unprepared',
      'What immediate panic or emotional turbulence you felt',
      'How you improvised and navigated through the crisis',
      'And explain what you learned about spontaneous problem-solving under pressure.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Sudden Catastrophe',
        keywords: ['Keynote keynote collapse', 'International symposium', 'Spring 2023'],
        notes: 'To trace the genesis of this ordeal, I must revisit a morning in 2023 when our scheduled keynote speaker fell severely ill ten minutes before opening remarks.'
      },
      room2: {
        title: 'Room 2: The Stage Sensory',
        keywords: ['Blinding spotlights', 'Cacophonous murmurs', 'Pounding heartbeat'],
        sensoryFocus: 'Sight & Sound & Emotion',
        notes: 'Stepping out under the incandescent halogen spotlights, I faced an auditorium of 300 expectant delegates, my heart pounding like a muffled drum.'
      },
      room3: {
        title: 'Room 3: The Spontaneous Pivot',
        keywords: ['No slides backup', 'Interactive Q&A pivot', 'Conversational mastery'],
        conflictType: 'Complete equipment and script void',
        notes: 'With the projector glitching simultaneously, I discarded all prepared text and transitioned into an impromptu roundtable discussion with the audience.'
      },
      room4: {
        title: 'Room 4: Balcony of Self-Reliance',
        keywords: ['Radical adaptability', 'Confidence under fire', 'Lifelong takeaway'],
        philosophicalThesis: 'Presence of mind is not the absence of fear, but the capacity to act decisively despite it.',
        notes: 'Looking back from a reflective vantage point, surviving that crisis cured my stage fright and proved that authenticity trumps rehearsed perfection.'
      }
    },
    sensorySuggestions: [
      { dimension: 'sight', word: 'incandescent', ipa: '/ˌɪn.kænˈdes.ənt/', meaningVi: 'chói lòa rực sáng', example: 'Incandescent stage lights blinding my peripheral vision', band: 'C2' },
      { dimension: 'sound', word: 'cacophonous', ipa: '/kəˈkɑː.fə.nəs/', meaningVi: 'xì xào ồn ào', example: 'Cacophonous buzz of restive conference delegates', band: 'C2' },
      { dimension: 'emotion', word: 'visceral', ipa: '/ˈvɪs.ər.əl/', meaningVi: 'nghẹt thở căng thẳng', example: 'A visceral surge of adrenaline constricting my vocal cords', band: 'C2' },
      { dimension: 'emotion', word: 'euphoric', ipa: '/juːˈfɔːr.ɪk/', meaningVi: 'hân hoan thở phào', example: 'A euphoric relief when the room erupted into applause', band: 'C2' }
    ],
    band8Transcript: 'To trace the genesis of this trial by fire, I must cast my mind back to an international sustainability symposium in mid-2023, where I was serving merely as an event coordinator. Ten minutes prior to the opening ceremony, our international keynote professor suffered acute food poisoning, leaving a 45-minute void before three hundred delegates.\n\nThrust into the breach with zero preparation, I ascended the stage. The sensory shock was visceral: blinding incandescent spotlights washed out the crowd into a sea of silhouettes, while a cacophonous murmur of restless anticipation echoed through the hall. My throat felt parched and my heart hammered violently against my ribs.\n\nHowever, disaster struck again when the technical console crashed, erasing all emergency slides. In that split second, I made an instinctive pivot: rather than delivering a hollow monologue, I stepped to the edge of the stage, acknowledged the mishap with humor, and transformed the plenary into a dynamic, Socratic town-hall forum on urban energy grids. Delegates leaned in, engaged fervently, and shared spontaneous field data.\n\nPerched upon the balcony of hindsight, that harrowing experience was transformative. It shattered my reliance on scripted perfection and taught me that authentic vulnerability, coupled with quick cognitive composure, can convert an impending catastrophe into an extraordinary triumph.',
    examinerNotes: [
      'Narrative Arc: Thrilling pacing that commands attention from start to finish.',
      'Fluency: Total absence of hesitation markers or unnatural pauses.',
      'Lexicon: Masterful command of idioms ("thrust into the breach", "trial by fire").'
    ]
  },
  {
    id: 'mp-10',
    topic: 'Describe a historical artefact or museum exhibition that left an indelible impression.',
    category: 'History',
    cueCardSubPrompts: [
      'What artefact or exhibition it was and where you saw it',
      'What historical context or craftsmanship it represented',
      'What atmosphere surrounded the display',
      'And explain why it altered your understanding of historical human resilience.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Museum Hall',
        keywords: ['British Museum', 'Rosetta Stone', 'Winter 2022'],
        notes: 'To trace the genesis of this encounter, I must revisit a gloomy December afternoon in 2022 when I visited the Egyptian gallery of the British Museum.'
      },
      room2: {
        title: 'Room 2: Sensory of the Antiquities Wing',
        keywords: ['Hushed marble galleries', 'Cold glass showcase', 'Luminescent spot lighting'],
        sensoryFocus: 'Sound & Sight & Touch',
        notes: 'The cavernous hall was bathed in a hushed twilight, where visitors stood spellbound before the dark, granodiorite slab illuminated by focused luminescent spotlights.'
      },
      room3: {
        title: 'Room 3: The Linguistic Decryption Enigma',
        keywords: ['Trilingual script', 'Centuries of silence', 'Champollion breakthrough'],
        conflictType: 'Centuries of lost meaning & intellectual persistence',
        notes: 'Standing mere inches away, I was struck by the realization that without this single broken stone, millennia of pharaonic civilization would have remained completely illegible.'
      },
      room4: {
        title: 'Room 4: Balcony of Human Memory',
        keywords: ['Fragility of knowledge', 'Power of translation', 'Enduring legacy'],
        philosophicalThesis: 'Language is the fragile vessel that shields human consciousness from historical oblivion.',
        notes: 'Perched upon the balcony of history, the Rosetta Stone served as a sobering testament to the fragility of cultural memory and the triumph of decipherment.'
      }
    },
    sensorySuggestions: [
      { dimension: 'sight', word: 'luminescent', ipa: '/ˌluː.mɪˈnes.ənt/', meaningVi: 'chiếu sáng dịu nhẹ', example: 'Luminescent beams catching the crisp carved hieroglyphic edges', band: 'C1' },
      { dimension: 'sound', word: 'hushed', ipa: '/hʌʃt/', meaningVi: 'im phăng phắc', example: 'A hushed reverential stillness amongst the international crowd', band: 'C1' },
      { dimension: 'touch', word: 'tactile', ipa: '/ˈtæk.taɪl/', meaningVi: 'cảm giác thô ráp cổ xưa', example: 'The tactile texture of rough, chisel-carved volcanic rock', band: 'C2' },
      { dimension: 'emotion', word: 'visceral', ipa: '/ˈvɪs.ər.əl/', meaningVi: 'choáng ngợp sâu xa', example: 'A visceral awe at confronting three millennia of preserved thought', band: 'C2' }
    ],
    band8Transcript: 'To trace the genesis of this memorable encounter, I must cast my mind back to a foggy December afternoon in 2022, during a visit to the monumental Egyptian antiquities wing of the British Museum.\n\nApproaching the central pavilion, the atmospheric staging was breathtaking. A hushed, almost sacred reverence filled the cavernous hall. Encased in protective glass and illuminated by precise, luminescent spotlights was the legendary Rosetta Stone—a jagged slab of dark granodiorite etched with three parallel scripts: Ancient Egyptian hieroglyphs, Demotic, and Ancient Greek.\n\nHowever, what truly arrested my attention was the profound intellectual struggle etched into its surface. For fourteen centuries, Egyptian hieroglyphs were regarded as impenetrable mystical symbols. It took decades of obsessive, painstaking decipherment by scholars like Champollion to unlock the phonetic key, rescuing an entire civilization\'s literature from eternal silence.\n\nPerched upon the balcony of historical reflection, that artefact served as a poignant reminder of the sheer fragility of human knowledge. It demonstrated that without linguistic bridges, our most majestic triumphs vanish into oblivion. It instilled in me a deep reverence for the humanities as the custodian of human memory.',
    examinerNotes: [
      'Pronunciation: Crisp academic phrasing with appropriate pausing and emphasis.',
      'Lexical: Eloquent vocabulary choice ("granodiorite", "impenetrable", "poignant reminder").',
      'Structure: Follows the 4-room memory palace model flawlessly.'
    ]
  },
  {
    id: 'mp-11',
    topic: 'Describe a creative endeavor (painting, musical composition, or writing) you struggled to complete.',
    category: 'Creativity',
    cueCardSubPrompts: [
      'What creative piece you set out to create',
      'What artistic medium you utilized and why',
      'What creative block or technical wall you collided with',
      'And explain the profound satisfaction when you finalized the work.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & The Blank Canvas',
        keywords: ['Oil painting portrait', 'Grandmother memorial', 'Spring 2022'],
        notes: 'To trace the genesis of this artistic journey, I must recall the spring of 2022 when I decided to paint a large-scale oil portrait of my late grandmother.'
      },
      room2: {
        title: 'Room 2: Sensory of the Studio',
        keywords: ['Pungent linseed oil & turpentine', 'Tactile bristles', 'Kaleidoscopic palette'],
        sensoryFocus: 'Scent & Touch & Sight',
        notes: 'My makeshift studio was filled with the pungent aroma of turpentine, with a kaleidoscopic palette of ochres and umbers spread across wooden easels.'
      },
      room3: {
        title: 'Room 3: The Uncanny Valley Impasse',
        keywords: ['Lifeless gaze', 'Scraped canvas in frustration', 'Midnight breakthrough'],
        conflictType: 'Artistic failure & emotional frustration',
        notes: 'For three weeks, the portrait remained trapped in an uncanny valley—the eyes appeared lifeless and synthetic, driving me to the verge of destroying the canvas.'
      },
      room4: {
        title: 'Room 4: Balcony of Artistic Truth',
        keywords: ['Embracing nuance', 'Cathartic completion', 'Enduring tribute'],
        philosophicalThesis: 'Art is not the replication of physical features, but the capture of fleeting spiritual resonance.',
        notes: 'Looking back from a reflective vantage point, completing that painting taught me that creative mastery requires working through profound doubt.'
      }
    },
    sensorySuggestions: [
      { dimension: 'scent', word: 'pungent', ipa: '/ˈpʌn.dʒənt/', meaningVi: 'nồng mùi dung môi', example: 'Pungent vapors of linseed oil and damar varnish', band: 'C1' },
      { dimension: 'sight', word: 'kaleidoscopic', ipa: '/kəˌlaɪ.dəˈskɑː.pɪk/', meaningVi: 'đa sắc biến ảo', example: 'A kaleidoscopic array of subtle skin-tone glazes', band: 'C2' },
      { dimension: 'touch', word: 'velvety', ipa: '/ˈvel.və.t̬i/', meaningVi: 'mịn màng êm ái', example: 'Velvety smooth brushstrokes blending wet into wet', band: 'C1' },
      { dimension: 'emotion', word: 'euphoric', ipa: '/juːˈfɔːr.ɪk/', meaningVi: 'hân hoan vỡ òa', example: 'A euphoric wave of catharsis when the final glaze dried', band: 'C2' }
    ],
    band8Transcript: 'To trace the genesis of this creative endeavor, I must cast my mind back to early 2022, following the passing of my maternal grandmother. As a personal tribute, I resolved to execute a realistic oil portrait capturing her seated by her favorite sunlit veranda.\n\nSetting up in my attic, the physical workspace offered a dense sensory retreat. The atmosphere was permeated by the pungent aroma of linseed oil and turpentine. My palette was a kaleidoscopic gradient of raw umber, cadmium yellow, and titanium white, while the tactile friction of boar-bristle brushes gliding across primed linen became my daily meditation.\n\nHowever, the project plunged into a severe creative crisis around week four. Despite meticulous proportional accuracy, the portrait felt strangely hollow—the eyes possessed a flat, lifeless gaze that failed to evoke her warm, mischievous spirit. Consumed by visceral frustration, I scraped away three days of work and contemplated abandoning the canvas entirely.\n\nPerched upon the balcony of hindsight, the breakthrough came when I stopped obsessing over photographic replication and focused on capturing the subtle play of warm light across her smile lines. When the final varnish dried, the work was deeply cathartic. It taught me that genuine art emerges only when one endures through the crucible of creative self-doubt.',
    examinerNotes: [
      'Artistic Lexicon: Specialized painting vocabulary ("linseed oil", "titanium white", "varnish", "primed linen").',
      'Pacing & Balance: Clean transition from studio setup to emotional impasse and resolution.',
      'Fluency: Expressive delivery demonstrating Band 8.5+ native ease.'
    ]
  },
  {
    id: 'mp-12',
    topic: 'Describe a significant community project that bridged social or generational divides.',
    category: 'Society',
    cueCardSubPrompts: [
      'What community initiative it was and who organized it',
      'What demographic or cultural groups were brought together',
      'What skepticism or initial friction had to be overcome',
      'And explain the enduring communal solidarity that resulted.'
    ],
    samplePalacePlan: {
      room1: {
        title: 'Room 1: Genesis & Divided Neighborhood',
        keywords: ['Community garden', 'Youth vs Retirees', 'Spring 2023'],
        notes: 'To trace the genesis of this social initiative, I must reflect on the spring of 2023 when our neighborhood converted a derelict industrial lot into a communal permaculture garden.'
      },
      room2: {
        title: 'Room 2: Sensory of the Urban Soil',
        keywords: ['Aromatic herbs', 'Petrichor after watering', 'Laughter and clatter'],
        sensoryFocus: 'Scent & Touch & Sound',
        notes: 'The neglected wasteland transformed into a vibrant sensory hub: rich smelling compost, fragrant rosemary bushes, and the clatter of trowels mingling with elderly storytelling.'
      },
      room3: {
        title: 'Room 3: The Initial Skepticism',
        keywords: ['Generational suspicion', 'Vandalism fears', 'Breaking bread bridge'],
        conflictType: 'Intergenerational mistrust & territory anxiety',
        notes: 'Initially, elderly residents feared tech-obsessed youth would neglect duties, while students resented perceived condescension, creating frosty silence during opening weeks.'
      },
      room4: {
        title: 'Room 4: Balcony of Social Capital',
        keywords: ['Intergenerational bonds', 'Mutual respect', 'Resilient community'],
        philosophicalThesis: 'Social cohesion is cultivated not through lofty speeches, but through shared physical labor on common soil.',
        notes: 'Looking back from a reflective vantage point, that garden regenerated not only urban soil, but the very social fabric of our neighborhood.'
      }
    },
    sensorySuggestions: [
      { dimension: 'scent', word: 'petrichor', ipa: '/ˈpet.rɪ.kɔːr/', meaningVi: 'mùi đất ẩm tươi mát', example: 'Refreshing petrichor rising from freshly irrigated raised beds', band: 'C2' },
      { dimension: 'scent', word: 'aromatic', ipa: '/ˌær.əˈmæt̬.ɪk/', meaningVi: 'thơm nồng thảo mộc', example: 'Aromatic wafts of crushed basil and mint leaves', band: 'C1' },
      { dimension: 'sound', word: 'melodious', ipa: '/məˈloʊ.di.əs/', meaningVi: 'vui tươi rộn rã', example: 'Melodious chatter bridging seven decades of age difference', band: 'C1' },
      { dimension: 'emotion', word: 'bittersweet', ipa: '/ˌbɪt̬.ɚˈswiːt/', meaningVi: 'bùi ngùi xúc động', example: 'A bittersweet triumph when harvesting the first communal crop', band: 'C1' }
    ],
    band8Transcript: 'To trace the genesis of this social initiative, I must cast my mind back to the spring of 2023, when our civic association resolved to transform a neglected, litter-strewn municipal lot into an intergenerational community garden.\n\nWithin two months, the barren wasteland underwent a stunning sensory metamorphosis. The air, once polluted by asphalt dust, became saturated with the uplifting petrichor of watered soil and the aromatic scent of flourishing heirloom herbs. The tactile rhythm of shoveling dark compost alongside retired neighbors, backed by the melodious laughter of local children, brought unprecedented vitality to our street.\n\nHowever, bridging the generational divide encountered early friction. The senior residents harbored deep skepticism, assuming teenage volunteers were merely seeking resume credentials and would abandon the crops during summer. The youth, conversely, felt alienated by rigid instructions. To dismantle this impasse, we instituted a weekly harvest potluck where elders shared traditional cultivation lore while teenagers taught digital crop-rotation scheduling.\n\nPerched upon the balcony of hindsight, that project was a masterclass in restorative social architecture. It demonstrated that community cohesion is not forged through abstract rhetoric, but through shared labor on common ground. It transformed isolated neighbors into an enduring, caring collective.',
    examinerNotes: [
      'Sociological Lexicon: "restorative social architecture", "intergenerational divide", "civic association".',
      'Timing Precision: Exactly 118 seconds with smooth transitions across all 4 rooms.',
      'Complexity: Rich use of non-finite clauses and balanced rhetorical triads.'
    ]
  }
];
