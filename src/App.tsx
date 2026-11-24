import { useEffect, useState } from 'react';
import { ApplicationView } from './components/ApplicationView';
import { AssessmentView } from './components/AssessmentView';
import { Header } from './components/Header';
import { WelcomeView } from './components/WelcomeView';
import { ApplicationSubmission, AppStep } from './data/programData';

const STORAGE_KEY = 'gangnam_ai_edu_submission_v1';

export default function App() {
  const [step, setStep] = useState<AppStep>('welcome');
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({});
  const [submission, setSubmission] = useState<ApplicationSubmission | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ApplicationSubmission) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleAnswer = (questionId: number, value: 'yes' | 'no') => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitApplication = (newSubmission: ApplicationSubmission) => {
    setSubmission(newSubmission);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSubmission));
    } catch {
      // Ignore storage quota errors
    }
    setStep('submitted');
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      <Header
        currentStep={step}
        hasSubmission={Boolean(submission)}
        onNavigateWelcome={() => setStep('welcome')}
        onStartAssessment={() => setStep('assessment')}
        onScrollToSection={handleScrollToSection}
        onViewSubmission={() => setStep('submitted')}
      />

      <main className="flex-1">
        {step === 'welcome' && (
          <WelcomeView
            onStartAssessment={() => setStep('assessment')}
            onDirectApply={() => handleScrollToSection('program-overview')}
          />
        )}

        {step === 'assessment' && (
          <AssessmentView
            answers={answers}
            onAnswer={handleAnswer}
            onCompleteYesFlow={() => setStep('application')}
            onBackToWelcome={() => setStep('welcome')}
          />
        )}

        {(step === 'application' || step === 'submitted') && (
          <ApplicationView
            answers={answers}
            existingSubmission={submission}
            isSubmittedView={step === 'submitted'}
            onSubmitApplication={handleSubmitApplication}
            onEditSubmission={() => setStep('application')}
            onBackToAssessment={() => setStep('assessment')}
            onBackToWelcome={() => setStep('welcome')}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-semibold text-slate-800">강남구청 AI 교육 운영지원단</span>
            <span aria-hidden="true">·</span>
            <span>서울특별시 강남구 대학생 디지털 인재 양성 프로그램</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setStep('welcome')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              처음 화면
            </button>
            <button
              type="button"
              onClick={() => setStep('assessment')}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              수준 평가
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
