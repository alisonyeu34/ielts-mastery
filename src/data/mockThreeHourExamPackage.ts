/**
 * Mock Data for 3-Hour Cognitive Stamina & Mental Fatigue Simulation
 * Step 96 / 100 - Full Continuous CD-IELTS Simulation Package (Listening -> Reading -> Writing)
 */

export interface ExamSectionDefinition {
  sectionId: 'listening' | 'reading' | 'writing_task1' | 'writing_task2';
  title: string;
  durationMinutes: number;
  startMinute: number;
  endMinute: number;
  totalQuestionsOrTasks: string;
  fatigueRiskDescriptionVi: string;
  taskPrompt: string;
  sampleInputContext?: string;
  modelAnswerOrPassage?: string;
}

export interface ThreeHourExamPackage {
  packageId: string;
  packageName: string;
  cambridgeStandard: string;
  totalDurationMinutes: number; // 180
  sections: ExamSectionDefinition[];
}

export const MOCK_THREE_HOUR_EXAM_PACKAGE: ThreeHourExamPackage = {
  packageId: 'pkg-cambridge-mock-18',
  packageName: 'Cambridge CD-IELTS Full-Length 180-Minute Simulation',
  cambridgeStandard: 'Authentic 3-Hour Non-Stop Sequence: Listening -> Reading -> Writing',
  totalDurationMinutes: 180,
  sections: [
    {
      sectionId: 'listening',
      title: 'Module 1: Listening (Sections 1 - 4)',
      durationMinutes: 40,
      startMinute: 0,
      endMinute: 40,
      totalQuestionsOrTasks: '40 Questions (4 Audio Tracks)',
      fatigueRiskDescriptionVi: 'Giai đoạn đầu: Mức độ tỉnh táo tối ưu, thính giác bén nhạy, nguy cơ rơi vào bẫy âm thanh do chủ quan.',
      taskPrompt: 'Listen to the 4 academic and social audio recordings and fill in answers under real-time audio playback.',
      sampleInputContext: 'Section 4 Topic: "Acoustic Ecology and Anthropogenic Marine Noise Pollution"'
    },
    {
      sectionId: 'reading',
      title: 'Module 2: Reading (Passages 1 - 3)',
      durationMinutes: 60,
      startMinute: 40,
      endMinute: 100,
      totalQuestionsOrTasks: '40 Questions (3 Dense Passages)',
      fatigueRiskDescriptionVi: 'Giai đoạn chuyển giao: Não bộ bắt đầu chịu áp lực phân tích ngữ nghĩa dày đặc, suy giảm khả năng quét từ khóa ở Passage 3.',
      taskPrompt: 'Read Passage 1 (History of Cartography), Passage 2 (Biomimetic Architectural Cooling), and Passage 3 (Epistemic Logic in Machine Consciousness) and answer 40 questions within 60 minutes.',
      sampleInputContext: 'Passage 3 requires hierarchical syntax disentangling and author stance detection.'
    },
    {
      sectionId: 'writing_task1',
      title: 'Module 3A: Writing Task 1 (Process / Map / Mixed)',
      durationMinutes: 20,
      startMinute: 100,
      endMinute: 120,
      totalQuestionsOrTasks: '1 Report (Min 150 Words)',
      fatigueRiskDescriptionVi: 'Khởi phát suy kiệt: Tốc độ xử lý số liệu bắt đầu chậm, xuất hiện các lỗi rơi mạo từ (a/an/the) và nhầm lẫn số liệu.',
      taskPrompt: 'The maps below show the urban transformation of Riverside Harbor between 1995 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
      modelAnswerOrPassage: 'The diagrams illustrate the extensive commercial redevelopment of Riverside Harbor over a twenty-five-year period from 1995 to 2020...'
    },
    {
      sectionId: 'writing_task2',
      title: 'Module 3B: Writing Task 2 (Peak Exhaustion Zone)',
      durationMinutes: 40,
      startMinute: 120,
      endMinute: 180,
      totalQuestionsOrTasks: '1 Discursive Essay (Min 250 Words)',
      fatigueRiskDescriptionVi: 'Vùng kiệt quệ nhận thức (Minute 120 - 180): Lượng glucose vỏ não trước trán cạn kiệt. Tần suất Backspace vọt lên 40%, nguy cơ đơ tư duy và sụp đổ cấu trúc ngữ pháp phức tạp.',
      taskPrompt: 'Some people argue that technological advancements have made modern human societies less resilient to systemic crises. Others believe that technology provides unprecedented crisis management capabilities. Discuss both views and give your own opinion.',
      sampleInputContext: 'Yêu cầu lập trường dứt khoát, cấu trúc nhượng bộ Concession Thesis và 2 thân bài Toulmin 6-Block.'
    }
  ]
};
