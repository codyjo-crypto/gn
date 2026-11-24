import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import {
  CURRICULUM_TRACKS,
  MASCOT_IMAGES,
  PROGRAM_HIGHLIGHTS,
} from '../data/programData';
import { ResilientImage } from './ResilientImage';

interface WelcomeViewProps {
  onStartAssessment: () => void;
  onDirectApply: () => void;
}

export function WelcomeView({ onStartAssessment, onDirectApply }: WelcomeViewProps) {
  const scrollToTracks = () => {
    const el = document.getElementById('curriculum-tracks');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Split Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Welcome Message & Primary Action */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-500 mb-4">
              강남구 대학생 디지털 인재 양성 과정 · 2026 상반기 모집
            </p>

            <h1 className="text-[clamp(2rem,3.8vw,3.35rem)] font-bold tracking-tight leading-[1.2] text-slate-900 mb-6">
              강남구청 AI 교육에
              <br />
              오신 것을 환영합니다
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-[1.7] max-w-[54ch] mb-8">
              강의실 밖에서 만나는 실전 AI 워크플로우부터 나만의 서비스 구현까지.
              강남구 마스코트 강남이와 함께 현재 나의 AI 활용 역량을 확인하고
              딱 맞는 무료 교육 트랙을 신청해 보세요.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                type="button"
                onClick={onStartAssessment}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] text-base font-semibold text-white bg-[#1D4ED8] rounded-xl hover:bg-[#1E40AF] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <span>수준 평가</span>
                <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
              </button>

              <button
                type="button"
                onClick={scrollToTracks}
                className="inline-flex items-center justify-center px-6 py-3.5 min-h-[48px] text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                커리큘럼 먼저 보기
              </button>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>소요 시간 1분 이내</span>
              <span aria-hidden="true">·</span>
              <span>서울권 대학생 및 휴학생 누구나</span>
              <span aria-hidden="true">·</span>
              <span>3단계 간단 진단 후 즉시 신청</span>
            </div>
          </div>

          {/* Right Column: Cute Character Mascot Greeting */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <span className="font-semibold text-slate-800">강남이 · AI 학습 메이트</span>
                <span>캠퍼스 안내 중</span>
              </div>

              <div className="relative aspect-square w-full max-w-[340px] mx-auto rounded-xl overflow-hidden bg-[#F8FAFC] mb-6">
                <ResilientImage
                  src={MASCOT_IMAGES.welcome}
                  alt="강남구청 AI 교육 마스코트 강남이가 대학생을 반갑게 맞이하는 일러스트"
                  fallbackTitle="강남이 캐릭터"
                  className="w-full h-full object-contain"
                  containerClassName="w-full h-full"
                />
              </div>

              <div className="pt-4 border-t border-slate-200/80">
                <p className="text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
                  “안녕! 나는 강남구청 AI 교육 메이트 강남이야.
                  아래 <strong className="text-[#1D4ED8] font-semibold">수준 평가</strong> 버튼을 누르면
                  너에게 꼭 맞는 교육 트랙을 바로 찾아줄게!”
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4-Column Program Highlights Strip */}
      <section
        id="program-overview"
        className="border-y border-slate-200 bg-white"
      >
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-slate-200">
            {PROGRAM_HIGHLIGHTS.map((item, idx) => (
              <div
                key={item.label}
                className={idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'}
              >
                <div className="text-2xl font-bold tracking-tight text-[#1D4ED8] tabular-nums mb-1.5">
                  {item.metric}
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1.5">
                  {item.label}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Innovation Lounge Showcase */}
      <section id="campus-lounge" className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <ResilientImage
                src={MASCOT_IMAGES.campus}
                alt="강남구 청년 AI 교육 공간에서 대학생들이 노트북으로 협업하는 모습"
                fallbackTitle="강남 청년 AI 캠퍼스"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#1D4ED8] mb-3">
              오프라인 실습 및 협업 라운지
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-4 leading-snug">
              전공은 달라도, AI로 문제를 푸는 즐거움은 같으니까
            </h2>
            <p className="text-base text-slate-600 leading-[1.7] mb-6">
              강남구 역삼·선릉 일대 청년 AI 라운지에서 다양한 대학의 친구들과 팀을 이뤄
              실습합니다. 단순 시청형 강의가 아니라 내 전공과 관심사에 바로 적용하는
              결과물을 완성합니다.
            </p>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" strokeWidth={2.5} />
                <span>비전공자·문과생도 따라오는 단계별 실습 가이드</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" strokeWidth={2.5} />
                <span>주차별 오피스 아워 및 현직자 코드·프롬프트 리뷰</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#1D4ED8] mt-0.5 shrink-0" strokeWidth={2.5} />
                <span>수료 후 교내 디지털 리더 스터디 운영 지원</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum Tracks */}
      <section id="curriculum-tracks" className="border-t border-slate-200 bg-white py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-2">
                수준별 맞춤 커리큘럼
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                나의 실력에 맞춘 3가지 교육 트랙
              </h2>
            </div>
            <button
              type="button"
              onClick={onStartAssessment}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-[#1D4ED8] rounded-lg hover:bg-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap shrink-0 self-start md:self-auto"
            >
              <span>수준 평가로 트랙 찾기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CURRICULUM_TRACKS.map((track) => (
              <article
                key={track.id}
                className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
                    <span className="font-mono-tabular text-[#1D4ED8] font-semibold">
                      {track.indexLabel}
                    </span>
                    <span>{track.levelLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{track.capacity}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                    {track.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {track.summary}
                  </p>

                  <ul className="space-y-2.5 text-sm text-slate-700 mb-6 pt-5 border-t border-slate-200">
                    {track.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2">
                        <span className="text-[#1D4ED8] font-bold leading-5" aria-hidden="true">
                          ·
                        </span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                  <div className="font-medium text-slate-800">{track.schedule}</div>
                  <div>수료 혜택: {track.outcome}</div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                어느 트랙이 맞을지 고민된다면?
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                3가지 간단한 질문에 답하면 바로 신청 화면으로 연결됩니다.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onStartAssessment}
                className="px-6 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#1D4ED8] rounded-xl hover:bg-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap"
              >
                수준 평가 시작
              </button>
              <button
                type="button"
                onClick={onDirectApply}
                className="px-5 py-3 min-h-[44px] text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
              >
                교육 소개 다시 보기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
