import { FormEvent, useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import {
  ApplicationSubmission,
  CURRICULUM_TRACKS,
  MASCOT_IMAGES,
  SkillLevelId,
} from '../data/programData';
import { ResilientImage } from './ResilientImage';

interface ApplicationViewProps {
  answers: Record<number, 'yes' | 'no'>;
  existingSubmission: ApplicationSubmission | null;
  isSubmittedView: boolean;
  onSubmitApplication: (submission: ApplicationSubmission) => void;
  onEditSubmission: () => void;
  onBackToAssessment: () => void;
  onBackToWelcome: () => void;
}

const SKILL_LEVEL_OPTIONS: {
  id: SkillLevelId;
  label: string;
  description: string;
}[] = [
  {
    id: 'entry',
    label: '입문 단계',
    description: 'AI 툴을 처음 다루거나 간단한 질문 정도만 써봤어요',
  },
  {
    id: 'intermediate',
    label: '활용 단계',
    description: '과제·팀플에 AI를 쓰고 있고 직접 서비스를 만들어보고 싶어요',
  },
  {
    id: 'advanced',
    label: '심화 단계',
    description: '코딩·API 연동 경험이 있고 AI 에이전트와 리더 활동에 도전할래요',
  },
];

function formatKoreanPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export function ApplicationView({
  answers,
  existingSubmission,
  isSubmittedView,
  onSubmitApplication,
  onEditSubmission,
  onBackToAssessment,
  onBackToWelcome,
}: ApplicationViewProps) {
  const [skillLevel, setSkillLevel] = useState<SkillLevelId>(
    existingSubmission?.skillLevel ?? 'intermediate'
  );
  const [name, setName] = useState(existingSubmission?.name ?? '');
  const [university, setUniversity] = useState(existingSubmission?.university ?? '');
  const [majorAndYear, setMajorAndYear] = useState(existingSubmission?.majorAndYear ?? '');
  const [phone, setPhone] = useState(existingSubmission?.phone ?? '');
  const [email, setEmail] = useState(existingSubmission?.email ?? '');
  const [motivation, setMotivation] = useState(existingSubmission?.motivation ?? '');
  const [agreed, setAgreed] = useState(Boolean(existingSubmission));
  const [formError, setFormError] = useState<string | null>(null);

  const selectedTrack =
    CURRICULUM_TRACKS.find((t) => t.id === skillLevel) ?? CURRICULUM_TRACKS[1];

  const yesCount = Object.values(answers).filter((v) => v === 'yes').length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('성명을 입력해 주세요.');
      return;
    }
    if (!university.trim() || !majorAndYear.trim()) {
      setFormError('소속 대학교와 전공·학년 정보를 입력해 주세요.');
      return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setFormError('올바른 휴대폰 번호(10~11자리)를 입력해 주세요.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('올바른 이메일 주소를 입력해 주세요.');
      return;
    }
    if (!agreed) {
      setFormError('교육 신청을 위해 개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    const receiptCode =
      existingSubmission?.receiptNumber ??
      `GN-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;

    const submission: ApplicationSubmission = {
      receiptNumber: receiptCode,
      name: name.trim(),
      university: university.trim(),
      majorAndYear: majorAndYear.trim(),
      phone: formatKoreanPhone(phone),
      email: email.trim(),
      skillLevel,
      motivation: motivation.trim(),
      submittedAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      answers,
    };

    onSubmitApplication(submission);
  };

  if (isSubmittedView && existingSubmission) {
    const submittedTrack =
      CURRICULUM_TRACKS.find((t) => t.id === existingSubmission.skillLevel) ??
      CURRICULUM_TRACKS[1];

    return (
      <section className="max-w-[960px] mx-auto px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200">
            <div className="md:col-span-4 flex justify-center">
              <div className="aspect-square w-full max-w-[230px] rounded-xl overflow-hidden bg-[#F8FAFC]">
                <ResilientImage
                  src={MASCOT_IMAGES.apply}
                  alt="학사모와 합격증을 들고 축하하는 강남이 캐릭터"
                  fallbackTitle="신청 완료 축하"
                  className="w-full h-full object-contain"
                  containerClassName="w-full h-full"
                />
              </div>
            </div>

            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#059669] mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>수강 신청이 정상적으로 접수되었습니다</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3">
                {existingSubmission.name}님의 강남구청 AI 교육 신청을 환영합니다
              </h1>

              <p className="text-base text-slate-600 leading-relaxed mb-5">
                선택하신 역량 수준에 맞춰 배정 안내 및 오리엔테이션 일정을 입력하신 이메일과
                연락처로 안내해 드립니다.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600">
                <span>
                  접수 번호:{' '}
                  <strong className="font-mono-tabular text-slate-900">
                    {existingSubmission.receiptNumber}
                  </strong>
                </span>
                <span aria-hidden="true">·</span>
                <span>신청일: {existingSubmission.submittedAt}</span>
              </div>
            </div>
          </div>

          <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">신청자 정보</div>
              <div className="text-base font-semibold text-slate-900">
                {existingSubmission.name}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {existingSubmission.university} · {existingSubmission.majorAndYear}
              </div>
              <div className="text-sm text-slate-600 mt-1 tabular-nums">
                {existingSubmission.phone} · {existingSubmission.email}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-slate-500 mb-1">배정 예정 트랙</div>
              <div className="text-base font-semibold text-[#1D4ED8]">
                {submittedTrack.title}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                {submittedTrack.schedule}
              </div>
              <div className="text-sm text-slate-600 mt-1">
                수준 평가 결과: {submittedTrack.levelLabel}
              </div>
            </div>
          </div>

          {existingSubmission.motivation && (
            <div className="py-6 border-b border-slate-200">
              <div className="text-xs font-medium text-slate-500 mb-1.5">지원 동기</div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {existingSubmission.motivation}
              </p>
            </div>
          )}

          <div className="pt-8 flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onEditSubmission}
              className="px-5 py-2.5 min-h-[44px] text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              신청 정보 수정하기
            </button>

            <button
              type="button"
              onClick={onBackToWelcome}
              className="px-6 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-[#1D4ED8] rounded-xl hover:bg-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap"
            >
              처음 화면으로 돌아가기
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="max-w-[1160px] mx-auto px-6 py-10 lg:py-14">
      <div className="mb-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToAssessment}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>수준 평가 다시 확인하기</span>
        </button>

        <span className="text-sm text-slate-500 tabular-nums">
          수준 평가 응답 완료 ({yesCount}/3 긍정 응답)
        </span>
      </div>

      {/* Top Celebration Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-3 flex justify-center">
            <div className="aspect-square w-full max-w-[180px] rounded-xl overflow-hidden bg-[#F8FAFC]">
              <ResilientImage
                src={MASCOT_IMAGES.apply}
                alt="강남구청 AI 교육 신청을 축하하며 응원하는 강남이 캐릭터"
                fallbackTitle="강남이 응원"
                className="w-full h-full object-contain"
                containerClassName="w-full h-full"
              />
            </div>
          </div>

          <div className="md:col-span-9">
            <p className="text-sm font-semibold text-[#1D4ED8] mb-2">
              수준 평가 완료 · 강남구청 AI 교육 신청 단계
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-3">
              디지털 리더로 성장할 준비가 되셨군요!
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              아래에서 현재 본인의 AI 활용 수준을 선택해 맞춤 커리큘럼을 확인하고,
              대학생 교육 신청서를 작성해 주세요.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={2.5} />
                실전 AI 디지털 교육 희망
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={2.5} />
                AI 전문가 성장 의지 확인
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1D4ED8]" strokeWidth={2.5} />
                캠퍼스 디지털 리더 도전
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Application Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Self Skill Check & Recommended Track */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
            <h2 className="text-lg font-bold text-slate-900 mb-1.5">
              01. 나의 현재 AI 실력 확인
            </h2>
            <p className="text-sm text-slate-600 mb-5">
              현재 경험에 가장 가까운 단계를 선택하면 맞춤 반이 추천됩니다.
            </p>

            <div className="space-y-3" role="radiogroup" aria-label="현재 AI 활용 수준">
              {SKILL_LEVEL_OPTIONS.map((option) => {
                const isSelected = skillLevel === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSkillLevel(option.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                      isSelected
                        ? 'border-[#1D4ED8] bg-[#EFF6FF]'
                        : 'border-slate-200 bg-[#F8FAFC] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-sm font-bold ${
                          isSelected ? 'text-[#1D4ED8]' : 'text-slate-900'
                        }`}
                      >
                        {option.label}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isSelected ? 'text-[#1D4ED8]' : 'text-slate-400'
                        }`}
                      >
                        {isSelected ? '선택됨' : '선택'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2">
              <span className="text-[#1D4ED8] font-semibold">추천 교육 트랙</span>
              <span aria-hidden="true">·</span>
              <span>{selectedTrack.capacity}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {selectedTrack.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {selectedTrack.summary}
            </p>
            <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div>
                <span className="font-semibold text-slate-800">일정:</span>{' '}
                {selectedTrack.schedule}
              </div>
              <div>
                <span className="font-semibold text-slate-800">결과물:</span>{' '}
                {selectedTrack.outcome}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Application Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8"
            noValidate
          >
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-[#1D4ED8]" />
              <h2 className="text-xl font-bold text-slate-900">
                02. 강남구청 AI 교육 수강 신청서
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-6 pb-6 border-b border-slate-200">
              입력하신 정보는 수강생 선발 및 교육 안내 발송 용도로만 안전하게 사용됩니다.
            </p>

            {formError && (
              <div
                role="alert"
                className="mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-sm font-medium text-red-700"
              >
                {formError}
              </div>
            )}

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="student-name"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    성명 <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="김강남"
                    className="w-full px-4 py-2.5 min-h-[44px] text-sm text-slate-900 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-phone"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    연락처 (휴대폰) <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="student-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatKoreanPhone(e.target.value))}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-2.5 min-h-[44px] text-sm text-slate-900 bg-[#F8FAFC] border border-slate-200 rounded-xl tabular-nums focus:bg-white focus:border-[#1D4ED8] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="student-univ"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    소속 대학교 <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="student-univ"
                    type="text"
                    required
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="예: 강남대학교"
                    className="w-full px-4 py-2.5 min-h-[44px] text-sm text-slate-900 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-major"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    전공 및 학년 <span className="text-[#DC2626]">*</span>
                  </label>
                  <input
                    id="student-major"
                    type="text"
                    required
                    value={majorAndYear}
                    onChange={(e) => setMajorAndYear(e.target.value)}
                    placeholder="예: 경영학과 3학년"
                    className="w-full px-4 py-2.5 min-h-[44px] text-sm text-slate-900 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="student-email"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  이메일 <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  id="student-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.ac.kr"
                  className="w-full px-4 py-2.5 min-h-[44px] text-sm text-slate-900 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="student-motivation"
                    className="block text-sm font-semibold text-slate-800"
                  >
                    지원 동기 및 만들어보고 싶은 AI 프로젝트
                  </label>
                  <span className="text-xs text-slate-400 tabular-nums">
                    {motivation.length} / 300
                  </span>
                </div>
                <textarea
                  id="student-motivation"
                  rows={4}
                  maxLength={300}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder="교육을 통해 배우고 싶은 점이나 캠퍼스 디지털 리더로서 해보고 싶은 활동을 자유롭게 적어주세요."
                  className="w-full px-4 py-3 text-sm text-slate-900 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:bg-white focus:border-[#1D4ED8] focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#1D4ED8] rounded cursor-pointer"
                  />
                  <span className="text-sm text-slate-600 leading-snug">
                    강남구청 AI 교육 운영 및 선발 안내를 위한 개인정보 수집·이용에
                    동의합니다. (필수)
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                신청 트랙: <strong className="text-slate-800">{selectedTrack.title}</strong>
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 min-h-[48px] text-base font-semibold text-white bg-[#1D4ED8] rounded-xl hover:bg-[#1E40AF] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                교육 신청 완료하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
