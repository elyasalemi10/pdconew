import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Building2,
  Handshake,
  TrendingUp,
  Languages,
  Copy,
} from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/shared/SEO';

const LOGO_URL = "/images/pdcon-logo.webp";
const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';
// The WeChat ID people search for to add PDCON.
// NOTE: this should be your custom 微信号, not the internal wxid_ system ID.
const WECHAT_ID = 'wxid_fnnejlj2t74u12';

// Inline SVG lantern - no external image, so nothing loads from a blocked CDN.
function Lantern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 84" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* hanging string */}
      <line x1="18" y1="0" x2="18" y2="9" stroke="#C5A059" strokeWidth="1.5" />
      {/* top cap */}
      <rect x="11" y="8" width="14" height="5" rx="1.5" fill="#C5A059" />
      {/* body */}
      <ellipse cx="18" cy="34" rx="15" ry="19" fill="#C5283D" />
      {/* ribs */}
      <ellipse cx="18" cy="34" rx="14" ry="19" fill="none" stroke="#9E1B2F" strokeWidth="0.8" opacity="0.45" />
      <ellipse cx="18" cy="34" rx="7.5" ry="19" fill="none" stroke="#9E1B2F" strokeWidth="0.8" opacity="0.5" />
      <line x1="18" y1="15" x2="18" y2="53" stroke="#9E1B2F" strokeWidth="0.8" opacity="0.4" />
      {/* gold rims */}
      <ellipse cx="18" cy="16" rx="9" ry="2.5" fill="#C5A059" />
      <ellipse cx="18" cy="52" rx="9" ry="2.5" fill="#C5A059" />
      {/* bottom cap */}
      <rect x="13" y="51" width="10" height="4" rx="1.5" fill="#C5A059" />
      {/* tassel */}
      <line x1="18" y1="55" x2="18" y2="66" stroke="#C5A059" strokeWidth="1.5" />
      <path d="M18 66 l-3.5 14 M18 66 v15 M18 66 l3.5 14" stroke="#C5283D" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type Lang = 'zh-CN' | 'zh-TW' | 'en';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' },
];

const T = {
  'zh-CN': {
    seoTitle: 'PDCON | 墨尔本房地产开发顾问',
    seoDesc: '留下您的联系方式，PDCON 将主动与您联系。墨尔本专业房地产开发、投资咨询与合资合作顾问。',
    heroLead: '让我们携手',
    heroAccent: '共创未来',
    intro:
      'PDCON 是一家位于墨尔本的房地产开发顾问公司。我们与投资者和业主携手合作，在开发、咨询及合资项目中释放资产价值，从可行性研究到项目竣工，全程为您提供专业指导。',
    idiom: '安居乐业',
    idiomSub: '愿您在墨尔本安居乐业，家业兴旺。',
    highlights: [
      { icon: Building2, title: '房地产开发', text: '为墨尔本各类住宅及开发用地提供全程项目管理。' },
      { icon: TrendingUp, title: '投资咨询', text: '提供战略性收购与可行性分析建议，助您实现回报最大化。' },
      { icon: Handshake, title: '合资合作', text: '整合资金、土地与专业经验的合作机会。' },
    ],
    addr: '7 Hammel Court, Hallam 3803, 维多利亚州',
    formTitle: '留下您的联系方式',
    formSubtitle: '请填写您的姓名和方便的联系方式，其余交给我们。',
    nameLabel: '您的姓名',
    namePlaceholder: '请输入您的姓名',
    phoneLabel: '电话',
    orLabel: '或',
    emailLabel: '电子邮箱',
    send: '提交',
    sending: '提交中…',
    note: '电话或邮箱二者填其一即可。您的信息将严格保密。',
    successTitle: '感谢您',
    successMsg: '我们已收到您的信息，PDCON 专员将尽快与您联系。',
    toastOk: '提交成功，我们会尽快与您联系。',
    toastFail: '提交失败，请重试。',
    validationName: '请填写您的姓名。',
    validation: '请至少填写电话或电子邮箱其中一项。',
    phonePlaceholder: '+86 138 0000 0000',
    wechat: '添加微信',
    wechatIdLabel: '微信号',
    wechatCopied: '微信号已复制，请在微信中粘贴搜索并添加。',
  },
  'zh-TW': {
    seoTitle: 'PDCON | 墨爾本房地產開發顧問',
    seoDesc: '留下您的聯絡方式，PDCON 將主動與您聯繫。墨爾本專業房地產開發、投資諮詢與合資合作顧問。',
    heroLead: '讓我們攜手',
    heroAccent: '共創未來',
    intro:
      'PDCON 是一家位於墨爾本的房地產開發顧問公司。我們與投資者及業主攜手合作，在開發、諮詢及合資項目中釋放資產價值，從可行性研究到項目竣工，全程為您提供專業指導。',
    idiom: '安居樂業',
    idiomSub: '願您在墨爾本安居樂業，家業興旺。',
    highlights: [
      { icon: Building2, title: '房地產開發', text: '為墨爾本各類住宅及開發用地提供全程項目管理。' },
      { icon: TrendingUp, title: '投資諮詢', text: '提供策略性收購與可行性分析建議，助您實現回報最大化。' },
      { icon: Handshake, title: '合資合作', text: '整合資金、土地與專業經驗的合作機會。' },
    ],
    addr: '7 Hammel Court, Hallam 3803, 維多利亞州',
    formTitle: '留下您的聯絡方式',
    formSubtitle: '請填寫您的姓名和方便的聯絡方式，其餘交給我們。',
    nameLabel: '您的姓名',
    namePlaceholder: '請輸入您的姓名',
    phoneLabel: '電話',
    orLabel: '或',
    emailLabel: '電子郵箱',
    send: '提交',
    sending: '提交中…',
    note: '電話或郵箱二者填其一即可。您的資訊將嚴格保密。',
    successTitle: '感謝您',
    successMsg: '我們已收到您的資訊，PDCON 專員將盡快與您聯繫。',
    toastOk: '提交成功，我們會盡快與您聯繫。',
    toastFail: '提交失敗，請重試。',
    validationName: '請填寫您的姓名。',
    validation: '請至少填寫電話或電子郵箱其中一項。',
    phonePlaceholder: '+852 6000 0000',
    wechat: '加入微信',
    wechatIdLabel: '微信號',
    wechatCopied: '微信號已複製，請在微信中貼上搜尋並加入。',
  },
  en: {
    seoTitle: 'Connect with PDCON | Property Development Consultants Melbourne',
    seoDesc:
      'Leave your details and PDCON will reach out. Expert property development, investment advisory, and joint venture consulting in Melbourne.',
    heroLead: "Let's Build",
    heroAccent: 'Together',
    intro:
      'PDCON is a Melbourne-based property development consultancy. We partner with investors and landowners to unlock value across development, advisory, and joint venture projects, guiding every step from feasibility to completion.',
    idiom: '安居乐业',
    idiomSub: 'Ān jū lè yè: a place to settle, a life to enjoy.',
    highlights: [
      { icon: Building2, title: 'Property Development', text: 'End-to-end project management for residential and development sites across Melbourne.' },
      { icon: TrendingUp, title: 'Investment Advisory', text: 'Strategic acquisition and feasibility guidance to maximise your returns.' },
      { icon: Handshake, title: 'Joint Ventures', text: 'Partnership opportunities that align capital, land, and expertise.' },
    ],
    addr: '7 Hammel Court, Hallam 3803, VIC',
    formTitle: 'Leave Your Details',
    formSubtitle: "Pop in your name and the best way to reach you. We'll do the rest.",
    nameLabel: 'Your Name',
    namePlaceholder: 'Jane Smith',
    phoneLabel: 'Phone',
    orLabel: 'or',
    emailLabel: 'Email',
    send: 'Send',
    sending: 'Sending…',
    note: 'Provide a phone number or email, whichever suits you best. 100% confidential.',
    successTitle: 'Thank You',
    successMsg: 'Your details are with us. A PDCON specialist will reach out shortly.',
    toastOk: 'Thanks, we will be in touch shortly.',
    toastFail: 'Failed to send. Please try again.',
    validationName: 'Please enter your name.',
    validation: 'Please provide either an email address or phone number.',
    phonePlaceholder: '+86 138 0000 0000',
    wechat: 'Add us on WeChat',
    wechatIdLabel: 'WeChat ID',
    wechatCopied: 'WeChat ID copied. Paste it into WeChat search to add us.',
  },
} as const;

export default function ContactCard() {
  const [lang, setLang] = useState<Lang>('zh-CN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = T[lang];

  const copyIdToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
    } catch {
      // Clipboard API unavailable (older mobile browsers); fall back to selection copy.
      const ta = document.createElement('textarea');
      ta.value = WECHAT_ID;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch { /* no-op */ }
      document.body.removeChild(ta);
    }
  };

  const copyWechat = async () => {
    await copyIdToClipboard();
    toast.success(t.wechatCopied);
  };

  const openWechat = () => {
    // Copy the ID silently (no toast) as the reliable fallback.
    void copyIdToClipboard();
    // Best-effort: try to open the WeChat app to a chat. Only does anything on a
    // device with WeChat installed (and an existing contact); a harmless no-op
    // on desktop and where the scheme isn't handled.
    window.location.href = `weixin://dl/chat?${WECHAT_ID}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    if (!name?.trim()) {
      toast.error(t.validationName);
      return;
    }

    if (!email?.trim() && !phone?.trim()) {
      toast.error(t.validation);
      return;
    }

    setIsSubmitting(true);

    const data = {
      name: formData.get('name'),
      email,
      phone,
      projectType: `Business Card Enquiry (${lang})`,
      budget: '',
      message: 'Enquiry submitted via business card contact page.',
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(t.toastOk);
        (e.target as HTMLFormElement).reset();
        setSubmitted(true);
      } else {
        toast.error(t.toastFail);
      }
    } catch {
      toast.error(t.toastFail);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background" lang={lang}>
      <SEO title={t.seoTitle} url="/contact-2" description={t.seoDesc} />

      <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Language switcher */}
          <div className="flex flex-wrap items-center justify-end gap-2 mb-8">
            <Languages size={16} className="text-muted-foreground shrink-0" />
            <div className="inline-flex rounded-sm border border-border overflow-hidden">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`px-3.5 py-2.5 text-xs font-bold tracking-wide transition-colors ${
                    lang === code
                      ? 'bg-primary text-white'
                      : 'bg-white text-primary hover:bg-secondary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: About PDCON */}
            <motion.div
              key={`info-${lang}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 sm:space-y-10"
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-accent" />
                  <img src={LOGO_URL} alt="PDCON" className="h-10 w-auto object-contain" />
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
                  {t.heroLead} <span className="text-accent">{t.heroAccent}</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{t.intro}</p>
              </div>

              {/* Cultural idiom band with lanterns */}
              <div className="relative flex flex-col items-center text-center py-2">
                <div className="flex items-end justify-center gap-3 sm:gap-8">
                  <motion.div
                    className="origin-top shrink-0"
                    animate={{ rotate: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                  >
                    <Lantern className="h-14 sm:h-20 w-auto" />
                  </motion.div>
                  <div className="pb-3">
                    <div className="text-2xl sm:text-4xl font-heading font-bold text-primary tracking-[0.2em] sm:tracking-[0.25em] indent-[0.2em] sm:indent-[0.25em] whitespace-nowrap">
                      {t.idiom}
                    </div>
                    <div className="mx-auto mt-3 w-16 h-px bg-accent" />
                  </div>
                  <motion.div
                    className="origin-top shrink-0"
                    animate={{ rotate: [4, -4, 4] }}
                    transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut' }}
                  >
                    <Lantern className="h-14 sm:h-20 w-auto" />
                  </motion.div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground italic px-2">{t.idiomSub}</p>
              </div>

              <ul className="space-y-3 sm:space-y-5">
                {t.highlights.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-center sm:items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <Icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <span className="block font-heading font-bold text-primary text-sm sm:text-base">{title}</span>
                      <span className="hidden sm:block text-sm text-muted-foreground leading-relaxed">{text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-2 border-t border-primary/10">
                <a href="tel:+61408255259" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <span className="text-primary font-bold group-hover:text-accent transition-colors">0408 255 259</span>
                </a>
                <a href="mailto:info@pdcon.com.au" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="text-primary font-bold group-hover:text-accent transition-colors">info@pdcon.com.au</span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-primary">
                    <MapPin size={16} />
                  </div>
                  <span className="text-primary font-bold">{t.addr}</span>
                </div>

                {/* WeChat */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={openWechat}
                    aria-label={t.wechat}
                    className="flex items-center justify-center w-full bg-[#07C160] hover:bg-[#06AD56] py-4 transition-colors"
                  >
                    <img src="/wechat-icon.png" alt={t.wechat} className="h-7 w-auto object-contain" />
                  </button>
                  <button
                    type="button"
                    onClick={copyWechat}
                    className="hidden sm:flex flex-wrap items-center justify-center gap-x-2 gap-y-1 w-full text-[11px] text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <span className="uppercase tracking-widest font-bold">{t.wechatIdLabel}:</span>
                    <span className="font-mono text-primary break-all">{WECHAT_ID}</span>
                    <Copy size={12} className="opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              key={`form-${lang}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-secondary/30 p-6 sm:p-10 border border-secondary shadow-2xl relative lg:sticky lg:top-28"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 -z-10 rounded-bl-full" />

              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto text-accent">
                    <CheckCircle2 size={32} />
                  </div>
                  <h2 className="text-2xl font-heading font-bold text-primary">{t.successTitle}</h2>
                  <p className="text-muted-foreground">{t.successMsg}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-8">
                    <h2 className="text-2xl font-heading font-bold text-primary">{t.formTitle}</h2>
                    <p className="text-sm text-muted-foreground">{t.formSubtitle}</p>
                  </div>
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-primary">{t.nameLabel}</label>
                      <input
                        name="name"
                        placeholder={t.namePlaceholder}
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-base sm:text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-primary">{t.phoneLabel}</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-base sm:text-sm font-medium"
                      />
                    </div>
                    <div className="relative flex items-center gap-3">
                      <div className="flex-grow h-px bg-border" />
                      <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{t.orLabel}</span>
                      <div className="flex-grow h-px bg-border" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-primary">{t.emailLabel}</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="jane@example.com"
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-base sm:text-sm font-medium"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-none bg-primary hover:bg-primary/95 text-white py-6 font-heading font-bold uppercase tracking-wider text-xs sm:text-sm h-auto flex gap-3"
                    >
                      {isSubmitting ? t.sending : (
                        <>
                          {t.send} <Send size={16} />
                        </>
                      )}
                    </Button>
                    <p className="text-[11px] text-muted-foreground text-center leading-relaxed">{t.note}</p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
