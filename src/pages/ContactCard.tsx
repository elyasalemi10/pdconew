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
} from 'lucide-react';
import { toast } from 'sonner';
import { SEO } from '@/components/shared/SEO';

const LOGO_URL = "/images/pdcon-logo.webp";
const API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

type Lang = 'zh-CN' | 'zh-TW' | 'en';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'en', label: 'English' },
];

const T = {
  'zh-CN': {
    seoTitle: 'PDCON — 墨尔本房地产开发顾问',
    seoDesc: '留下您的联系方式，PDCON 将主动与您联系。墨尔本专业房地产开发、投资咨询与合资合作顾问。',
    heroLead: '让我们携手',
    heroAccent: '共创未来',
    intro:
      'PDCON 是一家位于墨尔本的房地产开发顾问公司。我们与投资者和业主携手合作，在开发、咨询及合资项目中释放资产价值——从可行性研究到项目竣工，全程为您提供专业指导。',
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
  },
  'zh-TW': {
    seoTitle: 'PDCON — 墨爾本房地產開發顧問',
    seoDesc: '留下您的聯絡方式，PDCON 將主動與您聯繫。墨爾本專業房地產開發、投資諮詢與合資合作顧問。',
    heroLead: '讓我們攜手',
    heroAccent: '共創未來',
    intro:
      'PDCON 是一家位於墨爾本的房地產開發顧問公司。我們與投資者及業主攜手合作，在開發、諮詢及合資項目中釋放資產價值——從可行性研究到項目竣工，全程為您提供專業指導。',
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
  },
  en: {
    seoTitle: 'Connect with PDCON — Property Development Consultants Melbourne',
    seoDesc:
      'Leave your details and PDCON will reach out. Expert property development, investment advisory, and joint venture consulting in Melbourne.',
    heroLead: "Let's Build",
    heroAccent: 'Together',
    intro:
      'PDCON is a Melbourne-based property development consultancy. We partner with investors and landowners to unlock value across development, advisory, and joint venture projects — guiding every step from feasibility to completion.',
    highlights: [
      { icon: Building2, title: 'Property Development', text: 'End-to-end project management for residential and development sites across Melbourne.' },
      { icon: TrendingUp, title: 'Investment Advisory', text: 'Strategic acquisition and feasibility guidance to maximise your returns.' },
      { icon: Handshake, title: 'Joint Ventures', text: 'Partnership opportunities that align capital, land, and expertise.' },
    ],
    addr: '7 Hammel Court, Hallam 3803, VIC',
    formTitle: 'Leave Your Details',
    formSubtitle: "Pop in your name and the best way to reach you — we'll do the rest.",
    nameLabel: 'Your Name',
    namePlaceholder: 'Jane Smith',
    phoneLabel: 'Phone',
    orLabel: 'or',
    emailLabel: 'Email',
    send: 'Send',
    sending: 'Sending…',
    note: 'Provide a phone number or email — whichever suits you best. 100% confidential.',
    successTitle: 'Thank You',
    successMsg: 'Your details are with us. A PDCON specialist will reach out shortly.',
    toastOk: 'Thanks — we will be in touch shortly.',
    toastFail: 'Failed to send. Please try again.',
    validationName: 'Please enter your name.',
    validation: 'Please provide either an email address or phone number.',
    phonePlaceholder: '+86 138 0000 0000',
  },
} as const;

export default function ContactCard() {
  const [lang, setLang] = useState<Lang>('zh-CN');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = T[lang];

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
          <div className="flex items-center justify-end gap-2 mb-8">
            <Languages size={16} className="text-muted-foreground" />
            <div className="inline-flex rounded-sm border border-border overflow-hidden">
              {LANGS.map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  className={`px-3 py-1.5 text-xs font-bold tracking-wide transition-colors ${
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
              className="space-y-10"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1 bg-accent" />
                  <img src={LOGO_URL} alt="PDCON" className="h-10 w-auto object-contain" />
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
                  {t.heroLead} <span className="text-accent">{t.heroAccent}</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{t.intro}</p>
              </div>

              <ul className="space-y-5">
                {t.highlights.map(({ icon: Icon, title, text }) => (
                  <li key={title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-primary shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="block font-heading font-bold text-primary">{title}</span>
                      <span className="block text-sm text-muted-foreground leading-relaxed">{text}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 pt-2 border-t border-primary/10">
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
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-primary">{t.phoneLabel}</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder={t.phonePlaceholder}
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
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
                        className="w-full bg-white border border-border p-4 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
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
