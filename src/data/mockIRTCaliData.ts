/**
 * Mock Data for IRT 3PL Calibration & Predictive Multivariate Psychometrics
 * Step 97 / 100 - Authentic Cambridge Items with Calibrated (a, b, c) Parameters
 */

import { IRTItemParameters } from '@/lib/irtEngine';

export const MOCK_IRT_CALIBRATED_ITEMS: IRTItemParameters[] = [
  // Listening Section 1 & 2 (Low difficulty, Moderate discrimination)
  {
    id: 'irt-l-01',
    itemNumber: 1,
    skillSection: 'listening',
    passageOrSection: 'Listening Section 1 (Hotel Booking)',
    questionText: 'The guest requested a room with a view of the ______ on the 4th floor.',
    correctAnswer: 'harbour',
    a: 1.15, // Discrimination
    b: -1.80, // Difficulty (Band 4.5 threshold)
    c: 0.0, // Completion (no guessing)
    cognitiveDimension: 'verbatim_scan'
  },
  {
    id: 'irt-l-02',
    itemNumber: 2,
    skillSection: 'listening',
    passageOrSection: 'Listening Section 1 (Car Rental Registration)',
    questionText: 'Insurance policy number is ______ (contains spelling self-correction trap).',
    correctAnswer: 'TX7890B',
    a: 1.35,
    b: -1.20, // Band 5.5 threshold
    c: 0.0,
    cognitiveDimension: 'verbatim_scan'
  },
  {
    id: 'irt-l-03',
    itemNumber: 3,
    skillSection: 'listening',
    passageOrSection: 'Listening Section 2 (Park Renovation Map)',
    questionText: 'Where is the newly constructed medicinal herb garden located on the map?',
    correctAnswer: 'North-East quadrant adjacent to the duck pond',
    a: 1.55,
    b: -0.40, // Band 6.0 - 6.5 threshold
    c: 0.25,
    cognitiveDimension: 'syntactic_inference'
  },

  // Listening Section 3 & 4 (High discrimination, High difficulty)
  {
    id: 'irt-l-04',
    itemNumber: 4,
    skillSection: 'listening',
    passageOrSection: 'Listening Section 3 (Tutor Discussion on Marine Biology)',
    questionText: 'Why did Jack initially disagree with Dr. Foster’s hypothesis regarding coral bleaching?',
    correctAnswer: 'He believed thermal anomalies were localized rather than systemic.',
    a: 1.85, // High discrimination (separates Band 6.5 from 7.5+)
    b: 0.85, // Band 7.5 difficulty
    c: 0.25,
    cognitiveDimension: 'epistemic_stance'
  },
  {
    id: 'irt-l-05',
    itemNumber: 5,
    skillSection: 'listening',
    passageOrSection: 'Listening Section 4 (Acoustic Compression in Cetacean Sonar)',
    questionText: 'Anthropogenic low-frequency sonar interferes with humpback navigation by inducing ______ in the inner ear.',
    correctAnswer: 'acoustic cavitation',
    a: 2.10, // Extreme discrimination
    b: 1.65, // Band 8.0+ difficulty
    c: 0.0,
    cognitiveDimension: 'acoustic_compression'
  },
  {
    id: 'irt-l-06',
    itemNumber: 6,
    skillSection: 'listening',
    passageOrSection: 'Listening Section 4 (Dense Lecture Telemetry)',
    questionText: 'The velocity threshold at which hydrodynamic cavitation occurs in turbine blades is ______ meters per second.',
    correctAnswer: '48.5',
    a: 1.95,
    b: 2.10, // Band 8.5 difficulty
    c: 0.0,
    cognitiveDimension: 'acoustic_compression'
  },

  // Reading Passage 1 & 2 (Factual scanning to relational syntax)
  {
    id: 'irt-r-01',
    itemNumber: 7,
    skillSection: 'reading',
    passageOrSection: 'Reading Passage 1 (History of Silk Cultivation)',
    questionText: 'According to Paragraph 2, what penalty was imposed on anyone attempting to smuggle silkworm eggs out of China?',
    correctAnswer: 'immediate execution',
    a: 1.05,
    b: -1.60,
    c: 0.0,
    cognitiveDimension: 'verbatim_scan'
  },
  {
    id: 'irt-r-02',
    itemNumber: 8,
    skillSection: 'reading',
    passageOrSection: 'Reading Passage 2 (Geothermal Energy in Volcanic Basins)',
    questionText: 'Binary cycle power plants differ from dry steam plants because they use ______ with a lower boiling point than water.',
    correctAnswer: 'an organic fluid',
    a: 1.40,
    b: -0.15,
    c: 0.0,
    cognitiveDimension: 'syntactic_inference'
  },
  {
    id: 'irt-r-03',
    itemNumber: 9,
    skillSection: 'reading',
    passageOrSection: 'Reading Passage 2 (Urban Falconry)',
    questionText: 'Which heading best encapsulates the economic dilemmas explored in Paragraph D?',
    correctAnswer: 'Balancing biodiversity expenditure against public infrastructure deficits',
    a: 1.70,
    b: 0.70,
    c: 0.25,
    cognitiveDimension: 'syntactic_inference'
  },

  // Reading Passage 3 (Abstract Epistemology & Polarity Traps)
  {
    id: 'irt-r-04',
    itemNumber: 10,
    skillSection: 'reading',
    passageOrSection: 'Reading Passage 3 (Epistemic Logic in Machine Learning)',
    questionText: 'What does the author imply about probabilistic neural networks in complex judicial sentencing?',
    correctAnswer: 'Their lack of explainable causality violates constitutional due process.',
    a: 2.25, // Gold standard Cambridge discrimination
    b: 1.45, // Band 8.0
    c: 0.25,
    cognitiveDimension: 'epistemic_stance'
  },
  {
    id: 'irt-r-05',
    itemNumber: 11,
    skillSection: 'reading',
    passageOrSection: 'Reading Passage 3 (Evolutionary Morphology of Syntax)',
    questionText: 'The author mentions Chomsky’s universal grammar hypothesis in order to ______.',
    correctAnswer: 'contrast innate genetic structures with iterative cultural feedback loops',
    a: 2.30,
    b: 1.95, // Band 8.5
    c: 0.25,
    cognitiveDimension: 'epistemic_stance'
  },
  {
    id: 'irt-r-06',
    itemNumber: 12,
    skillSection: 'reading',
    passageOrSection: 'Reading Passage 3 (Quantum Decoherence in Photosynthesis)',
    questionText: 'Recent femtosecond spectroscopy data demonstrates that quantum coherence in avian cryptochromes is ______.',
    correctAnswer: 'sustained by protein vibration rather than thermal isolation',
    a: 2.45, // Maximum Cambridge discrimination
    b: 2.40, // Band 8.5 - 9.0 ceiling
    c: 0.25,
    cognitiveDimension: 'epistemic_stance'
  }
];
