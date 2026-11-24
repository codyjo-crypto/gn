import { AppStep } from '../data/programData';

interface HeaderProps {
  currentStep: AppStep;
  hasSubmission: boolean;
  onNavigateWelcome: () => void;
  onStartAssessment: () => void;
  onScrollToSection: (sectionId: string) => void;
  onViewSubmission: () => void;
}

export function Header({
  currentStep,
  hasSubmission,
  onNavigateWelcome,
  onStartAssessment,
  onScrollToSection,
  onViewSubmission,
}: HeaderProps) {
  const handleNavClick = (sectionId: string) => {
    if (currentStep !== 'welcome') {
      onNavigateWelcome();
      setTimeout(() => onScrollToSection(sectionId), 60);
    } else {
      onScrollToSection(sectionId);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F8FAFC]/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <button
          type="button"
          onClick={onNavigateWelcome}
          className="text-lg font-bold tracking-tight text-slate-900 hover:text-[#1D4ED8] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
        >
          강남 AI 아카데미
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => handleNavClick('program-overview')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
          >
            교육 소개
          </button>
          <button
            type="button"
            onClick={onStartAssessment}
            className={`hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] ${
              currentStep === 'assessment' ? 'text-[#1D4ED8] font-semibold' : ''
            }`}
          >
            수준 평가
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('curriculum-tracks')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
          >
            커리큘럼
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('campus-lounge')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8]"
          >
            교육 공간
          </button>
        </nav>

        <div className="flex items-center shrink-0">
          {hasSubmission && currentStep !== 'submitted' ? (
            <button
              type="button"
              onClick={onViewSubmission}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              신청 확인증
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartAssessment}
              className="px-4 py-2 text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
            >
              수준 평가
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
