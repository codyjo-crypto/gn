import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ASSESSMENT_QUESTIONS, MASCOT_IMAGES } from '../data/programData';
import { ResilientImage } from './ResilientImage';

interface AssessmentViewProps {
  answers: Record<number, 'yes' | 'no'>;
  onAnswer: (questionId: number, value: 'yes' | 'no') => void;
  onCompleteYesFlow: () => void;
  onBackToWelcome: () => void;
}

export function AssessmentView({
  answers,
  onAnswer,
  onCompleteYesFlow,
  onBackToWelcome,
}: AssessmentViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [declinedQuestionId, setDeclinedQuestionId] = useState<number | null>(null);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQuestion = ASSESSMENT_QUESTIONS[currentIndex];
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectYes = () => {
    setDeclinedQuestionId(null);
    onAnswer(currentQuestion.id, 'yes');

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onCompleteYesFlow();
    }
  };

  const handleSelectNo = () => {
    onAnswer(currentQuestion.id, 'no');
    setDeclinedQuestionId(currentQuestion.id);
  };

  const handlePrevious = () => {
    setDeclinedQuestionId(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      onBackToWelcome();
    }
  };

  return (
    <section className="max-w-[1100px] mx-auto px-6 py-10 lg:py-16">
      {/* Top Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <button
            type="button"
            onClick={handlePrevious}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentIndex === 0 ? '처음 화면으로' : '이전 질문'}</span>
          </button>

          <div className="text-sm font-semibold text-slate-700 tabular-nums">
            {currentIndex + 1} / {totalQuestions} 단계
          </div>
        </div>

        <div
          className="w-full h-2 bg-slate-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
        >
          <div
            className="h-full bg-[#1D4ED8] transition-transform duration-200 ease-out origin-left"
            style={{ transform: `scaleX(${progressPercent / 100})` }}
          />
        </div>
      </div>

      {/* Main 2-Column Assessment Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left: Mascot Guide Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
              <span className="font-semibold text-slate-800">강남이 · 수준 진단 도우미</span>
              <span className="tabular-nums">{currentQuestion.numberLabel}</span>
            </div>

            <div className="aspect-square w-full max-w-[280px] mx-auto rounded-xl overflow-hidden bg-[#F8FAFC] mb-5">
              <ResilientImage
                src={MASCOT_IMAGES.quiz}
                alt="체크리스트와 돋보기를 들고 생각하는 강남이 캐릭터"
                fallbackTitle="강남이 진단 중"
                className="w-full h-full object-contain"
                containerClassName="w-full h-full"
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-700 leading-relaxed">
                {declinedQuestionId === currentQuestion.id
                  ? '“잠깐 고민되셨나요? 아직 익숙하지 않더라도 강남구청 AI 교육에서는 기초부터 차근차근 함께 배울 수 있어요!”'
                  : `“${currentQuestion.mascotTip}”`}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Active Sequential Question Card */}
        <div className="lg:col-span-7 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentQuestion.id}-${declinedQuestionId ?? 'ask'}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 bg-white border border-slate-200 rounded-2xl p-7 sm:p-10 flex flex-col justify-between"
            >
              {declinedQuestionId === currentQuestion.id ? (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#1D4ED8] mb-3">
                      부담 갖지 않으셔도 괜찮아요
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-4">
                      기초부터 배우고 싶다면 언제든 시작할 수 있습니다
                    </h2>
                    <p className="text-base text-slate-600 leading-relaxed mb-8">
                      강남구청 AI 교육은 코딩이나 AI 경험이 전혀 없는 대학생도 쉽게
                      적응할 수 있는 입문 반부터 운영하고 있습니다. 마음을 정하셨다면
                      다시 응답하거나 바로 교육 신청 화면을 확인해 보세요.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setDeclinedQuestionId(null)}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] text-sm font-semibold text-white bg-[#1D4ED8] rounded-xl hover:bg-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>질문으로 돌아가기</span>
                    </button>

                    <button
                      type="button"
                      onClick={onCompleteYesFlow}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>교육 신청 화면 둘러보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                      <span className="font-semibold text-[#1D4ED8] tabular-nums">
                        {currentQuestion.id}.
                      </span>
                      <span>대학생 AI 역량 및 목표 확인</span>
                      <span aria-hidden="true">·</span>
                      <span>필수 응답</span>
                    </div>

                    <h2 className="text-2xl sm:text-[1.85rem] font-bold tracking-tight text-slate-900 leading-[1.35] mb-5">
                      {currentQuestion.id}. {currentQuestion.question}
                    </h2>

                    <p className="text-base text-slate-600 leading-[1.7] mb-8">
                      {currentQuestion.detailText}
                    </p>
                  </div>

                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={handleSelectYes}
                        className={`flex items-center justify-between px-6 py-4 min-h-[56px] rounded-xl border text-left font-semibold transition-all cursor-pointer active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                          answers[currentQuestion.id] === 'yes'
                            ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                            : 'bg-[#1D4ED8] border-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                        }`}
                      >
                        <span className="text-base">예</span>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-100">
                          {currentIndex === totalQuestions - 1 ? '신청 화면으로' : '다음 질문'}
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSelectNo}
                        className="flex items-center justify-between px-6 py-4 min-h-[56px] rounded-xl border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 text-left font-semibold transition-all cursor-pointer active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                      >
                        <span className="text-base">아니오</span>
                        <span className="text-xs font-medium text-slate-500">고민 중이에요</span>
                      </button>
                    </div>

                    {/* Step Dots Summary */}
                    <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
                      {ASSESSMENT_QUESTIONS.map((q, idx) => {
                        const isDone = answers[q.id] === 'yes' && idx < currentIndex;
                        const isActive = idx === currentIndex;
                        return (
                          <div
                            key={q.id}
                            className={`flex items-center gap-1.5 ${
                              isActive
                                ? 'text-slate-900 font-semibold'
                                : isDone
                                ? 'text-[#1D4ED8] font-medium'
                                : 'text-slate-400'
                            }`}
                          >
                            {isDone ? (
                              <Check className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={2.5} />
                            ) : (
                              <span className="tabular-nums">{q.id}.</span>
                            )}
                            <span>{idx === 0 ? '실전 AI' : idx === 1 ? '전문가 목표' : '디지털 리더'}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
