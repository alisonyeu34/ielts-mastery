/**
 * Mock Cognitive Reading Dataset: Dense Cambridge Passage 3 Texts
 * Designed specifically for Vanishing Text and Multi-Word RSVP Anti-Regression Training.
 */

export interface CognitiveCheckpointQuestion {
  checkpointIndex: number;
  triggerParagraphIndex: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  timeLimitSeconds: number;
}

export interface CognitiveReadingPassage {
  id: string;
  title: string;
  subTitle: string;
  academicDomain: string;
  wordCount: number;
  recommendedWpm: number;
  paragraphs: string[];
  checkpoints: CognitiveCheckpointQuestion[];
}

export const MOCK_COGNITIVE_PASSAGES: CognitiveReadingPassage[] = [
  {
    id: "cog_passage_01",
    title: "The Evolutionary Architecture of Epistemological Skepticism",
    subTitle: "Why Human Rationality Evolved for Social Coalitions Rather than Objective Truth",
    academicDomain: "Cognitive Evolutionary Psychology & Epistemology",
    wordCount: 865,
    recommendedWpm: 260,
    paragraphs: [
      "For centuries, classical Enlightenment philosophers conceived of human rationality as a pristine, domain-general logic engine engineered to decipher empirical realities. However, contemporary evolutionary psychologists, spearheaded by Dr. Hugo Mercier and Dan Sperber, have fundamentally dismantled this Cartesian assumption. The Argumentative Theory of Reason posits that human cognitive faculties evolved not to discern solitary metaphysical truths, but rather to persuade interlocutors, justify personal actions within egalitarian hunter-gatherer bands, and evaluate the deceptive assertions of social competitors.",
      "Under this evolutionary framework, what classical logicians disparage as cognitive flaws—such as confirmation bias, motivated reasoning, and myside bias—actually function as highly adaptive Darwinian specializations. In ancestral pleistocene environments, a hominid who impartially scrutinized every piece of contradictory evidence would squander vital metabolic bandwidth, while one who relentlessly defended their tribal coalition's orthodoxy ensured mutual physical protection and resource sharing.",
      "Furthermore, neuro-imaging studies utilizing functional magnetic resonance imaging (fMRI) reveal that when individuals encounter socio-political evidence contradicting their deeply held identity narratives, the dorsolateral prefrontal cortex (responsible for dispassionate analytical reasoning) exhibits marked hypo-activation. Conversely, the amygdala and anterior insular cortex illuminate vigorously, processing logical counter-arguments through the same neural circuitry that responds to existential physical predation. Reason, in its biological essence, operates as an ideological defense mechanism rather than a truth-seeking algorithm.",
      "Ultimately, recognizing the social lineage of human cognition carries profound ramifications for modern democratic governance and academic inquiry. Individual thinkers, operating in cognitive isolation, are virtually incapable of overcoming their ingrained cognitive blind spots. Only through institutional dialectical architectures—such as rigorous double-blind peer review, legal adversarial courtroom proceedings, and robust adversarial debate—can collective epistemological progress be synthesized from flawed individual perspectives.",
    ],
    checkpoints: [
      {
        checkpointIndex: 1,
        triggerParagraphIndex: 1, // After Paragraphs 0 & 1
        question: "According to the Argumentative Theory of Reason in paragraphs 1 and 2, confirmation bias evolved primarily to:",
        options: [
          "Enable individual humans to accurately calculate complex mathematical probabilities",
          "Protect tribal coalitions and persuade social peers rather than discover objective truths",
          "Accelerate the neurological degeneration of the prefrontal cortex",
          "Compensate for inadequate nutritional intake in ancestral environments",
        ],
        correctIndex: 1,
        explanation:
          "Đoạn 1 và 2 khẳng định lý trí tiến hóa để thuyết phục đồng loại và bảo vệ liên minh bộ lạc ('persuade interlocutors... defended their tribal coalition orthodoxy'), chứ không phải để tìm kiếm chân lý khách quan đơn độc.",
        timeLimitSeconds: 15,
      },
      {
        checkpointIndex: 2,
        triggerParagraphIndex: 3, // After Paragraphs 2 & 3
        question: "What conclusion does the author reach regarding the overcoming of cognitive blind spots in paragraph 4?",
        options: [
          "Single individuals can easily eliminate all biases through intense solitary meditation",
          "Collective adversarial institutions like peer review are necessary to synthesize truth from biased individuals",
          "Democratic governance should be replaced by automated algorithmic decision-making",
          "Neuro-imaging technology will permanently rewire the human amygdala",
        ],
        correctIndex: 1,
        explanation:
          "Đoạn 4 chỉ ra: 'Individual thinkers... are virtually incapable of overcoming their ingrained cognitive blind spots. Only through institutional dialectical architectures... can collective epistemological progress be synthesized'.",
        timeLimitSeconds: 15,
      },
    ],
  },
  {
    id: "cog_passage_02",
    title: "Quantum Thermodynamics & The Microscopic Arrow of Time",
    subTitle: "Reconciling Reversible Quantum Mechanics with Irreversible Macroscopic Entropy",
    academicDomain: "Theoretical Physics & Philosophy of Science",
    wordCount: 890,
    recommendedWpm: 280,
    paragraphs: [
      "The macroscopic universe marches relentlessly forward along a unidirectional chronological axis—a phenomenon universally denoted as the Thermodynamic Arrow of Time. Sir Arthur Eddington first codified this temporal asymmetry via the Second Law of Thermodynamics, which dictates that the net entropy of any isolated physical system must inexorably increase over time. Eggs shatter upon collision with floorboards, coffee cools to room temperature, and stars exhaust their hydrogen reserves, yet the reverse sequences are never observed in physical reality.",
      "Paradoxically, the fundamental micro-physical laws that govern subatomic interactions—from Newton's classical mechanics to Schrödinger's quantum wave equation—are entirely time-symmetric. If one were to mathematically reverse the sign of the time variable (t -> -t) in any fundamental subatomic collision, the resulting trajectory would remain entirely permissible within the canonical laws of quantum electrodynamics. This glaring contradiction between microscopic reversibility and macroscopic irreversibility constitutes one of the most profound unresolved enigmas in theoretical physics.",
      "Recent breakthroughs in quantum information theory suggest that the emergence of macroscopic irreversibility is an artifact of quantum entanglement with the external environment—a process known as decoherence. When a microscopic quantum system interacts with trillions of surrounding thermal photons and air molecules, the phase relationships between its quantum states become irreversibly scrambled into the surrounding universe. Consequently, local entropy increases not because information is destroyed, but because it becomes hopelessly dispersed across vast macroscopic degrees of freedom.",
    ],
    checkpoints: [
      {
        checkpointIndex: 1,
        triggerParagraphIndex: 1,
        question: "What constitutes the central paradox described in paragraphs 1 and 2?",
        options: [
          "Stars generate too much hydrogen to permit accurate thermodynamic calculations",
          "Microscopic subatomic equations are time-reversible, yet the macroscopic universe is strictly irreversible",
          "The Second Law of Thermodynamics has been proven fundamentally flawed in laboratories",
          "Quantum wave equations cannot account for the gravitational attraction of planets",
        ],
        correctIndex: 1,
        explanation:
          "Đoạn 2 nêu rõ mâu thuẫn trung tâm: các định luật lượng tử vi mô hoàn toàn đối xứng theo thời gian (time-symmetric), trong khi vũ trụ vĩ mô lại không thể đảo ngược (strictly irreversible).",
        timeLimitSeconds: 15,
      },
    ],
  },
];
