// Generates a self-contained A4 one-pager PDF with PDCON's contact info
// (no form) for sending to clients in China when the site is unreachable.
// Run: node scripts/make-onepager.js
import { readFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const b64 = (p) => readFileSync(join(root, p)).toString('base64');

const interLatin = b64('public/fonts/inter-UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2');
const groteskLatin = b64('public/fonts/spacegrotesk-V8mDoQDjQSkFtoMM3T6r8E7mPbF4Cw.woff2');
const logo = b64('public/images/pdcon-logo.webp');

const NAVY = '#002B49';
const GOLD = '#C5A059';
const RED = '#C5283D';
const REDRIB = '#9E1B2F';
const MUTED = '#5b6b76';
const SECONDARY = '#eef0f1';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

// Fetch a Noto Sans SC subset containing only `chars` (headless Chromium has no CJK
// system font; a full CJK font would be multi-MB, so we subset to what's used).
async function fetchNotoSubset(chars) {
  const url =
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap&text=' +
    encodeURIComponent(chars);
  const css = await (await fetch(url, { headers: { 'User-Agent': UA } })).text();
  const faces = [];
  const re = /font-weight:\s*(\d+);[\s\S]*?src:\s*url\((https:\/\/[^)]+)\)\s*format\('woff2'\)/g;
  let m;
  while ((m = re.exec(css))) {
    const buf = Buffer.from(await (await fetch(m[2], { headers: { 'User-Agent': UA } })).arrayBuffer());
    faces.push(
      `@font-face{font-family:'Noto Sans SC';font-weight:${m[1]};font-display:swap;src:url(data:font/woff2;base64,${buf.toString('base64')}) format('woff2');}`
    );
  }
  if (!faces.length) throw new Error('Could not fetch Noto Sans SC subset');
  return faces.join('\n');
}

// One lantern (matches the site's inline SVG).
const lantern = `
<svg viewBox="0 0 36 84" width="46" height="107" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="18" y1="0" x2="18" y2="9" stroke="${GOLD}" stroke-width="1.5" />
  <rect x="11" y="8" width="14" height="5" rx="1.5" fill="${GOLD}" />
  <ellipse cx="18" cy="34" rx="15" ry="19" fill="${RED}" />
  <ellipse cx="18" cy="34" rx="14" ry="19" fill="none" stroke="${REDRIB}" stroke-width="0.8" opacity="0.45" />
  <ellipse cx="18" cy="34" rx="7.5" ry="19" fill="none" stroke="${REDRIB}" stroke-width="0.8" opacity="0.5" />
  <line x1="18" y1="15" x2="18" y2="53" stroke="${REDRIB}" stroke-width="0.8" opacity="0.4" />
  <ellipse cx="18" cy="16" rx="9" ry="2.5" fill="${GOLD}" />
  <ellipse cx="18" cy="52" rx="9" ry="2.5" fill="${GOLD}" />
  <rect x="13" y="51" width="10" height="4" rx="1.5" fill="${GOLD}" />
  <line x1="18" y1="55" x2="18" y2="66" stroke="${GOLD}" stroke-width="1.5" />
  <path d="M18 66 l-3.5 14 M18 66 v15 M18 66 l3.5 14" stroke="${RED}" stroke-width="1.6" stroke-linecap="round" />
</svg>`;

const icon = (paths) =>
  `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="${NAVY}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const icons = {
  phone: icon('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'),
  mail: icon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>'),
  pin: icon('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),
  chat: icon('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>'),
  globe: icon('<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'),
};

const highlights = [
  { t: '房地产开发', s: 'Property Development', d: '为墨尔本各类住宅及开发用地提供全程项目管理。' },
  { t: '投资咨询', s: 'Investment Advisory', d: '提供战略性收购与可行性分析建议，助您实现回报最大化。' },
  { t: '合资合作', s: 'Joint Ventures', d: '整合资金、土地与专业经验的合作机会。' },
];
const contacts = [
  { i: icons.phone, l: '电话 Phone', v: '0408 255 259' },
  { i: icons.mail, l: '电子邮箱 Email', v: 'info@pdcon.com.au' },
  { i: icons.chat, l: '微信 WeChat', v: 'wxid_fnnejlj2t74u12' },
  { i: icons.pin, l: '地址 Address', v: '7 Hammel Court, Hallam 3803, 维多利亚州 VIC' },
  { i: icons.globe, l: '网站 Website', v: 'pdcon.com.au' },
];

const body = `<body>
  <div class="top">
    <div class="bar"></div>
    <img class="logo" src="data:image/webp;base64,${logo}" alt="PDCON"/>
  </div>

  <h1 class="cjk-h">让我们携手<span class="accent">共创未来</span></h1>
  <p class="intro">PDCON 是一家位于墨尔本的房地产开发顾问公司。我们与投资者和业主携手合作，在开发、咨询及合资项目中释放资产价值，从可行性研究到项目竣工，全程为您提供专业指导。<br/>PDCON is a Melbourne-based property development consultancy, partnering with investors and landowners across development, advisory, and joint venture projects.</p>

  <div class="idiom">
    ${lantern}
    <div class="word"><div class="chars cjk-h">安居乐业</div><div class="rule"></div></div>
    ${lantern}
  </div>
  <div class="idiom-sub">愿您在墨尔本安居乐业，家业兴旺。 &nbsp;·&nbsp; Ān jū lè yè: a place to settle, a life to enjoy.</div>

  <div class="hls">
    ${highlights
      .map(
        (h, n) => `<div class="hl">
      <div class="num cjk-h">0${n + 1}</div>
      <div><div class="title cjk-h">${h.t}<span>${h.s}</span></div><div class="desc">${h.d}</div></div>
    </div>`
      )
      .join('')}
  </div>

  <div class="contact">
    <h2 class="cjk-h">联系我们 &nbsp; Get in touch</h2>
    <div class="cgrid">
      ${contacts
        .map(
          (c) => `<div class="crow"><div class="ic">${c.i}</div>
        <div><div class="lbl">${c.l}</div><div class="val">${c.v}</div></div></div>`
        )
        .join('')}
    </div>
    <div style="text-align:center"><span class="confidential">100% 保密 · Confidential</span></div>
  </div>

  <div class="foot">Property Development Consultants · Melbourne, Australia</div>
</body></html>`;

// Subset only the CJK ideographs + CJK/fullwidth punctuation actually used.
const cjkChars = [...new Set(body.match(/[　-〿＀-￯一-鿿]/g) || [])].join('');
const notoFaces = await fetchNotoSubset(cjkChars);

const head = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<style>
@font-face{font-family:'Inter';font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${interLatin}) format('woff2');}
@font-face{font-family:'Space Grotesk';font-weight:300 700;font-display:swap;src:url(data:font/woff2;base64,${groteskLatin}) format('woff2');}
${notoFaces}
:root{--navy:${NAVY};--gold:${GOLD};--muted:${MUTED};--sec:${SECONDARY};}
*{margin:0;padding:0;box-sizing:border-box;}
@page{size:A4;margin:0;}
html,body{width:210mm;height:297mm;}
body{
  font-family:'Inter','Noto Sans SC',sans-serif;
  color:var(--navy);background:#fff;
  padding:16mm 15mm;display:flex;flex-direction:column;
}
.cjk-h{font-family:'Space Grotesk','Noto Sans SC',sans-serif;}
.top{display:flex;align-items:center;gap:14px;}
.bar{width:46px;height:5px;background:var(--gold);}
.logo{height:44px;}
h1{font-size:40px;line-height:1.15;font-weight:700;margin-top:22px;}
h1 .accent{color:var(--gold);}
.intro{font-size:13.5px;line-height:1.85;color:var(--muted);margin-top:16px;max-width:165mm;}
.idiom{display:flex;align-items:flex-end;justify-content:center;gap:34px;margin:26px 0 6px;}
.idiom .word{text-align:center;padding-bottom:10px;}
.idiom .chars{font-size:38px;font-weight:700;letter-spacing:.22em;text-indent:.22em;}
.idiom .rule{width:70px;height:2px;background:var(--gold);margin:12px auto 0;}
.idiom-sub{text-align:center;font-style:italic;color:var(--muted);font-size:12.5px;margin-bottom:4px;}
.hls{display:flex;flex-direction:column;gap:14px;margin-top:26px;}
.hl{display:flex;gap:14px;align-items:flex-start;}
.hl .num{flex:0 0 auto;width:34px;height:34px;border-radius:50%;background:var(--sec);
  display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--gold);font-size:14px;}
.hl .title{font-weight:700;font-size:15px;}
.hl .title span{color:var(--muted);font-weight:500;font-size:11px;letter-spacing:.08em;text-transform:uppercase;margin-left:8px;}
.hl .desc{color:var(--muted);font-size:12.5px;line-height:1.6;margin-top:2px;}
.contact{margin-top:auto;border-top:1px solid #e2e6e9;padding-top:20px;}
.contact h2{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);font-weight:700;margin-bottom:16px;}
.cgrid{display:grid;grid-template-columns:1fr 1fr;gap:14px 34px;}
.crow{display:flex;align-items:center;gap:12px;}
.crow .ic{flex:0 0 auto;width:38px;height:38px;border-radius:50%;background:var(--sec);display:flex;align-items:center;justify-content:center;}
.crow .lbl{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:700;}
.crow .val{font-size:14px;font-weight:700;}
.foot{margin-top:18px;text-align:center;font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:var(--muted);}
.confidential{display:inline-flex;align-items:center;gap:7px;background:#f8f4ec;border:1px solid #eadfc6;color:${GOLD};
  font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;padding:7px 12px;border-radius:2px;margin-top:14px;}
</style></head>`;

const html = head + body;

const outDir = join(root, 'public');
mkdirSync(outDir, { recursive: true });
const out = join(outDir, 'PDCON-contact.pdf');

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluateHandle('document.fonts.ready');
await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('Wrote', out);
