export interface ExamQuestionItem {
  id: string;
  questionNumber: number;
  type: "completion" | "multiple_choice" | "tfng" | "matching";
  questionText: string;
  options?: Array<{ id: string; text: string }>;
  correctAnswer: string;
  sectionOrPassage: number; // 1, 2, 3, 4
}

export interface FullIELTSTestData {
  id: string;
  title: string;
  code: string;
  description: string;
  targetBand: number;
  durationsMinutes: {
    listening: number; // 35 mins
    reading: number; // 60 mins
    writing: number; // 60 mins
    speaking: number; // 14 mins
  };
  listening: {
    audioUrl: string;
    sections: Array<{
      sectionNumber: number;
      title: string;
      context: string;
      instructions: string;
      questions: ExamQuestionItem[];
    }>;
  };
  reading: {
    passages: Array<{
      passageNumber: number;
      title: string;
      subtitle: string;
      text: string;
      questions: ExamQuestionItem[];
    }>;
  };
  writing: {
    task1: {
      prompt: string;
      chartType: string;
      chartDescription: string;
      minWords: number;
    };
    task2: {
      prompt: string;
      essayType: string;
      minWords: number;
    };
  };
  speaking: {
    part1: {
      topic: string;
      questions: string[];
    };
    part2: {
      cueCardTopic: string;
      bulletPoints: string[];
      preparationTimeSeconds: number;
      speakingTimeSeconds: number;
    };
    part3: {
      topic: string;
      questions: string[];
    };
  };
}

export const MOCK_FULL_IELTS_TEST: FullIELTSTestData = {
  id: "cambridge_mock_19_full",
  title: "Cambridge Official Practice Test 19 (Academic)",
  code: "CAM-19-ACAD",
  description:
    "Bộ đề thi thử chuẩn hóa 100% Computer-delivered IELTS: Listening 40 câu, Reading 3 Passages 40 câu, Writing Task 1 & 2, và Speaking AI Interview 3 Parts.",
  targetBand: 7.5,
  durationsMinutes: {
    listening: 35,
    reading: 60,
    writing: 60,
    speaking: 14,
  },
  listening: {
    audioUrl: "https://actions.google.com/sounds/v1/science/chalkboard_writing.ogg",
    sections: [
      {
        sectionNumber: 1,
        title: "Section 1: Community Bicycle Club Registration",
        context: "A phone inquiry between a club coordinator and a prospective member.",
        instructions: "Write ONE WORD AND/OR A NUMBER for each answer.",
        questions: Array.from({ length: 10 }).map((_, idx) => ({
          id: `lis_q_${idx + 1}`,
          questionNumber: idx + 1,
          type: "completion",
          questionText:
            idx === 0
              ? "Member surname: {1}"
              : idx === 1
              ? "Preferred cycling route: around the {2}"
              : idx === 2
              ? "Emergency contact number: {3}"
              : idx === 3
              ? "Annual membership fee: ${4}"
              : `Cycling equipment requirement: {${idx + 1}}`,
          correctAnswer:
            idx === 0 ? "Harrison" : idx === 1 ? "lake" : idx === 2 ? "07892441890" : idx === 3 ? "85" : "helmet",
          sectionOrPassage: 1,
        })),
      },
      {
        sectionNumber: 2,
        title: "Section 2: City Heritage Museum Guided Tour",
        context: "A museum curator introducing a newly renovated historical wing.",
        instructions: "Choose the correct letter, A, B, or C.",
        questions: Array.from({ length: 10 }).map((_, idx) => ({
          id: `lis_q_${idx + 11}`,
          questionNumber: idx + 11,
          type: "multiple_choice",
          questionText: `According to the curator, what is the key feature of exhibit zone ${idx + 11}?`,
          options: [
            { id: "A", text: "Interactive digital touchscreens and 3D holograms." },
            { id: "B", text: "Original 18th-century maritime artifacts." },
            { id: "C", text: "A dedicated workshop for school groups." },
          ],
          correctAnswer: "A",
          sectionOrPassage: 2,
        })),
      },
      {
        sectionNumber: 3,
        title: "Section 3: Academic Tutorial on Sustainable Architecture",
        context: "Two postgraduate students discussing their thesis proposal with their tutor.",
        instructions: "Choose the correct letter, A, B, or C.",
        questions: Array.from({ length: 10 }).map((_, idx) => ({
          id: `lis_q_${idx + 21}`,
          questionNumber: idx + 21,
          type: "multiple_choice",
          questionText: `What do both students agree was the main obstacle in their preliminary survey for Q${idx + 21}?`,
          options: [
            { id: "A", text: "Insufficient sample size from residential zones." },
            { id: "B", text: "High cost of thermal imaging equipment." },
            { id: "C", text: "Conflicting local zoning regulations." },
          ],
          correctAnswer: "B",
          sectionOrPassage: 3,
        })),
      },
      {
        sectionNumber: 4,
        title: "Section 4: Dense Lecture on Biomimetic Materials",
        context: "A university lecture on bio-inspired engineering in extreme environments.",
        instructions: "Write ONE WORD ONLY for each answer.",
        questions: Array.from({ length: 10 }).map((_, idx) => ({
          id: `lis_q_${idx + 31}`,
          questionNumber: idx + 31,
          type: "completion",
          questionText: `Synthetic polymers inspired by lotus leaves provide superior water {${idx + 31}}.`,
          correctAnswer: "repellence",
          sectionOrPassage: 4,
        })),
      },
    ],
  },
  reading: {
    passages: [
      {
        passageNumber: 1,
        title: "Passage 1: The Evolution of Early Chronometers",
        subtitle: "How John Harrison solved the legendary longitude problem at sea.",
        text: `For centuries, navigating open oceans remained an extraordinarily hazardous endeavor. While latitude could be readily calculated by measuring the altitude of the sun or Polaris above the horizon, determining longitude required an accurate measurement of time at a known reference point. In 1714, the British Parliament enacted the Longitude Act, offering a monumental prize of £20,000 to anyone who could develop a method to determine a ship's longitude to within thirty nautical miles after a six-week transatlantic voyage.

Self-taught Yorkshire carpenter and clockmaker John Harrison dedicated over four decades to crafting marine timekeepers capable of operating reliably amidst ship vibrations, erratic temperature fluctuations, and humidity. Harrison's revolutionary breakthrough, the H4 marine chronometer completed in 1759, discarded massive pendulum mechanisms in favor of a fast-beating balance wheel regulated by a bimetallic strip that compensated for thermal expansion. During rigorous sea trials aboard HMS Deptford to Jamaica in 1761, H4 lost a mere 5.1 seconds over eighty-one days at sea, heralding an era of safe global maritime trade.`,
        questions: Array.from({ length: 13 }).map((_, idx) => ({
          id: `read_q_${idx + 1}`,
          questionNumber: idx + 1,
          type: idx < 6 ? "tfng" : "completion",
          questionText:
            idx === 0
              ? "Determining longitude was easier than calculating latitude for ancient navigators."
              : idx === 1
              ? "The British Parliament offered a prize to solve the longitude measurement challenge."
              : idx === 2
              ? "Harrison had formal academic training in horology from Cambridge University."
              : `The H4 marine chronometer utilized a bimetallic strip to balance {${idx + 1}}.`,
          correctAnswer: idx === 0 ? "FALSE" : idx === 1 ? "TRUE" : idx === 2 ? "FALSE" : "temperature",
          sectionOrPassage: 1,
        })),
      },
      {
        passageNumber: 2,
        title: "Passage 2: The Neurobiology of Memory Consolidation During Sleep",
        subtitle: "Investigating how slow-wave oscillations transfer short-term traces to the neocortex.",
        text: `Sleep was long regarded by neuroscientists as a passive state of physiological quiescence. However, modern neuroimaging and electrophysiological recordings reveal that the sleeping brain orchestrates a highly complex, active biological protocol vital for cognitive longevity. Specifically, memory consolidation—the progressive stabilization of newly encoded episodic traces—relies on an intricate dialogue between the hippocampus and the neocortex during non-rapid eye movement (NREM) slow-wave sleep.

During waking hours, the hippocampus acts as a temporary buffer, rapidly encoding transient experiences with high synaptic plasticity. During subsequent slow-wave sleep, coordinated neuronal replay occurs: cortical slow oscillations (less than 1 Hz) synchronize thalamocortical sleep spindles with hippocampal sharp-wave ripples. This precise phase-locked coupling drives the bidirectional transfer of memory representations from the labile hippocampal repository to durable neocortical networks, shielding long-term memories from retroactive interference and decay.`,
        questions: Array.from({ length: 13 }).map((_, idx) => ({
          id: `read_q_${idx + 14}`,
          questionNumber: idx + 14,
          type: idx < 7 ? "matching" : "multiple_choice",
          questionText: `According to Paragraph B, what is the primary function of sharp-wave ripples in Q${idx + 14}?`,
          options: [
            { id: "A", text: "To transfer short-term memory traces to the permanent neocortex." },
            { id: "B", text: "To eliminate toxic metabolic waste from the brainstem." },
            { id: "C", text: "To induce rapid eye movements during dream states." },
          ],
          correctAnswer: "A",
          sectionOrPassage: 2,
        })),
      },
      {
        passageNumber: 3,
        title: "Passage 3: The Philosophy of Technological Determinism in Modern Society",
        subtitle: "Examining whether technological evolution autonomously shapes human cultural trajectories.",
        text: `Technological determinism posits that autonomous technological innovation acts as the principal driving force steering societal, economic, and moral evolution. Advanced by theorists such as Thorstein Veblen and Marshall McLuhan, this philosophical stance asserts that human agency is subordinate to the internal logic of technical systems. Under this paradigm, institutions, legal frameworks, and social norms inevitably reshape themselves to accommodate emergent technologies rather than the reverse.

Conversely, proponents of the Social Construction of Technology (SCOT) argue that technological artifacts are socially shaped throughout their genesis. Rather than emerging ex nihilo with predetermined social trajectories, innovations undergo interpretive flexibility, where divergent stakeholder groups—from policymakers to end-users—negotiate design choices, regulatory constraints, and cultural adoption. Contemporary debates surrounding artificial intelligence governance reflect this dialectic tension between fatalistic determinism and deliberate human stewardship.`,
        questions: Array.from({ length: 14 }).map((_, idx) => ({
          id: `read_q_${idx + 27}`,
          questionNumber: idx + 27,
          type: "multiple_choice",
          questionText: `Which statement best encapsulates the author's argument regarding SCOT in Q${idx + 27}?`,
          options: [
            { id: "A", text: "Technological systems evolve entirely independently of human values." },
            { id: "B", text: "Human stakeholders actively shape and negotiate technological trajectories." },
            { id: "C", text: "Legal frameworks are completely powerless against emergent technologies." },
          ],
          correctAnswer: "B",
          sectionOrPassage: 3,
        })),
      },
    ],
  },
  writing: {
    task1: {
      prompt:
        "The line graph below shows the percentage of energy generated from renewable sources in four European nations between 2000 and 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chartType: "Line Graph",
      chartDescription:
        "Four nations: Denmark (surged from 20% to 75%), Germany (rose steadily from 10% to 55%), France (modest increase from 15% to 30%), and Poland (gradual rise from 5% to 22%).",
      minWords: 150,
    },
    task2: {
      prompt:
        "Some educators believe that artificial intelligence tools should be completely banned in schools to protect students' critical thinking abilities. Others argue that AI should be systematically integrated into school curricula. Discuss both views and give your own opinion.",
      essayType: "Discussion Essay (Discuss both views and give your opinion)",
      minWords: 250,
    },
  },
  speaking: {
    part1: {
      topic: "Hometown & Leisure Habits",
      questions: [
        "Let's talk about your hometown. What do you like most about living there?",
        "Do you prefer spending your free time outdoors or indoors?",
        "How have your leisure activities changed compared to when you were younger?",
      ],
    },
    part2: {
      cueCardTopic: "Describe an impactful scientific or technological discovery that has changed human life.",
      bulletPoints: [
        "What the discovery was",
        "When and how you first learned about it",
        "How it affects people's daily routines",
        "And explain why you consider it to be so profound.",
      ],
      preparationTimeSeconds: 60,
      speakingTimeSeconds: 120,
    },
    part3: {
      topic: "Artificial Intelligence, Automation & Future Society",
      questions: [
        "In what ways might artificial intelligence transform traditional white-collar professions in the next decade?",
        "Do you think governments should regulate algorithmic decisions in healthcare and judicial systems?",
        "How can educational institutions ensure students develop human empathy alongside technological literacy?",
      ],
    },
  },
};
