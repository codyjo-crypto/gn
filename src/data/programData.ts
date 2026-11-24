export type AppStep = 'welcome' | 'assessment' | 'application' | 'submitted';

export type SkillLevelId = 'entry' | 'intermediate' | 'advanced';

export interface AssessmentQuestion {
  id: number;
  numberLabel: string;
  question: string;
  mascotTip: string;
  detailText: string;
}

export interface CurriculumTrack {
  id: SkillLevelId;
  indexLabel: string;
  levelLabel: string;
  title: string;
  summary: string;
  schedule: string;
  capacity: string;
  topics: string[];
  outcome: string;
}

export interface ApplicationSubmission {
  receiptNumber: string;
  name: string;
  university: string;
  majorAndYear: string;
  phone: string;
  email: string;
  skillLevel: SkillLevelId;
  motivation: string;
  submittedAt: string;
  answers: Record<number, 'yes' | 'no'>;
}

export const MASCOT_IMAGES = {
  welcome: '/src/assets/images/mascot_welcome_1795479630199.jpg',
  quiz: '/src/assets/images/mascot_quiz_1795479630662.jpg',
  apply: '/src/assets/images/mascot_apply_1795479631183.jpg',
  campus: '/src/assets/images/gangnam_ai_campus_1795479633963.jpg',
} as const;

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    numberLabel: '질문 01',
    question: '대학교에서 가르치지 않는 AI 디지털 교육을 원하나요?',
    mascotTip: '전공 교재에는 아직 안 나오는 최신 생성형 AI 워크플로우와 실무 도구들을 직접 다뤄볼 수 있어요.',
    detailText: '현업 AI 엔지니어와 디자이너가 실제 프로젝트에 쓰는 프롬프트 설계, 자동화, AI 코딩 도구를 실습합니다.',
  },
  {
    id: 2,
    numberLabel: '질문 02',
    question: '강남구청의 독보적인 AI 교육 프로그램으로 AI 전문가가 되고 싶은가요?',
    mascotTip: '비전공자도 걱정 없어요! 수준별 맞춤 트랙으로 포트폴리오까지 완성할 수 있도록 강남이가 응원할게요.',
    detailText: '8주 집중 과정과 전담 멘토링, 강남 청년 AI 해커톤을 통해 누구나 실전 역량을 갖춘 인재로 성장합니다.',
  },
  {
    id: 3,
    numberLabel: '질문 03',
    question: '학교에서 디지털 리더가 되어 다양한 활동을 주도적으로 하고 싶은가요?',
    mascotTip: '마지막 질문이에요! 수료 후에는 캠퍼스 AI 스터디와 프로젝트를 이끄는 디지털 리더로 활동하게 됩니다.',
    detailText: '강남구청 수료증 발급 및 대학생 디지털 리더 커뮤니티 네트워킹, 프로젝트 발표회 기회가 주어집니다.',
  },
];

export const CURRICULUM_TRACKS: CurriculumTrack[] = [
  {
    id: 'entry',
    indexLabel: '01.',
    levelLabel: '입문 · AI 첫걸음',
    title: '생성형 AI 실무 & 프롬프트 기초반',
    summary: '코딩 경험이 없어도 ChatGPT, Gemini, Notion AI를 연결해 나만의 학습·업무 자동화 도구를 만드는 입문 트랙입니다.',
    schedule: '매주 토요일 10:00 - 13:00 · 8주 과정',
    capacity: '정원 30명',
    topics: [
      '리서치·문서 작성 생산성을 3배 높이는 구조화 프롬프트',
      'AI 이미지·발표 자료 제작 및 데이터 요약 실습',
      '노코드 자동화로 나만의 캠퍼스 일정·자료 비서 만들기',
    ],
    outcome: '실무 활용 포트폴리오 2건 및 강남구청 수료증',
  },
  {
    id: 'intermediate',
    indexLabel: '02.',
    levelLabel: '활용 · 서비스 빌딩',
    title: '바이브코딩 & AI 웹 서비스 프로덕트반',
    summary: '전공 과제나 동아리에서 아이디어를 직접 웹 서비스로 구현해 보고 싶은 대학생을 위한 실전 프로덕트 제작 트랙입니다.',
    schedule: '매주 목요일 19:00 - 21:30 · 8주 과정',
    capacity: '정원 25명',
    topics: [
      'AI 코딩 어시스턴트 기반 웹 앱 UI/UX 설계 및 구현',
      'Gemini API를 활용한 맞춤형 AI 튜터·요약 서비스 제작',
      '사용자 테스트 및 강남 AI 데모데이 서비스 피칭',
    ],
    outcome: '배포 완료된 AI 웹 프로덕트 1건 및 멘토 리뷰',
  },
  {
    id: 'advanced',
    indexLabel: '03.',
    levelLabel: '심화 · 리더 & 에이전트',
    title: 'AI 에이전트 & 캠퍼스 디지털 리더반',
    summary: 'API 연동과 RAG·멀티 에이전트 아키텍처를 설계하고, 교내 AI 스터디 및 해커톤을 이끄는 심화 리더십 트랙입니다.',
    schedule: '매주 토요일 14:00 - 17:00 · 8주 과정',
    capacity: '정원 20명',
    topics: [
      'RAG 지식 검색 파이프라인 및 함수 호출 에이전트 설계',
      '팀 기반 실전 AI 서비스 배포 및 성능 평가 체계 구축',
      '캠퍼스 디지털 리더 워크숍 및 현직자 커리어 멘토링',
    ],
    outcome: '캠퍼스 AI 리더 임명장 및 우수팀 프로젝트 지원',
  },
];

export const PROGRAM_HIGHLIGHTS = [
  {
    metric: '100% 무료',
    label: '강남구 전액 지원',
    description: '교육비, 실습 클라우드 API 크레딧, 교재까지 전액 무료 지원',
  },
  {
    metric: '8주 집중',
    label: '실습 중심 커리큘럼',
    description: '이론 암기가 아닌 매주 결과물을 만드는 프로젝트 기반 수업',
  },
  {
    metric: '1:6 멘토링',
    label: '현직자 전담 코칭',
    description: '판교·강남 현직 AI 엔지니어 및 프로덕트 디자이너 밀착 피드백',
  },
  {
    metric: '리더 인증',
    label: '수료증 및 네트워킹',
    description: '강남구청장 명의 수료증 및 대학생 AI 리더 커뮤니티 연계',
  },
];
