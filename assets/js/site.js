const currentPage = document.body.dataset.page || "";
const designSystem = document.createElement('link');
designSystem.rel = 'stylesheet';
designSystem.href = 'assets/css/ai-blueprint.css';
document.head.append(designSystem);
const trustedTypesPolicy = window.trustedTypes?.createPolicy('gill-ai-labs', {
  createHTML: (value) => value
});
const trustedHTML = (value) => trustedTypesPolicy ? trustedTypesPolicy.createHTML(value) : value;
const links = [
  ["Services", "services.html"], ["AI Solutions", "ai-solutions.html"], ["Industries", "industries.html"], ["Case Studies", "case-studies.html"], ["Insights", "blog.html"], ["About", "about.html"]
];

function navigation() {
  return links.map(([label, href]) => {
    const isCurrentPage = currentPage === href.replace('.html', '');
    return `<a href="${href}" class="${isCurrentPage ? 'active' : ''}"${isCurrentPage ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join("");
}

const header = `<header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html" aria-label="Gill AI Labs home"><span class="brand-mark" aria-hidden="true">G</span>Gill AI Labs</a><nav class="nav-links" id="primary-navigation" aria-label="Primary navigation">${navigation()}</nav><div class="nav-actions"><button class="icon-button theme-toggle" type="button" aria-label="Switch color theme" title="Switch color theme">◐</button><a class="button button-secondary nav-consult" href="contact.html">Book a call</a><a class="button button-primary nav-assessment" href="ai-readiness.html">Free assessment</a><button class="icon-button menu-toggle" type="button" aria-label="Open navigation" aria-controls="primary-navigation" aria-expanded="false">☰</button></div></div></header>`;
const footer = `<footer class="site-footer"><div class="container"><aside class="footer-conversion" aria-labelledby="footer-conversion-title"><div><p class="eyebrow">A practical next step</p><h2 id="footer-conversion-title">Get the AI Readiness Checklist.</h2><p>Use our short planning guide to identify a valuable use case, the evidence to gather, and the risks to address before you build.</p></div><form class="footer-signup" action="thank-you.html" method="get"><label for="footer-email">Work email</label><div><input id="footer-email" name="email" type="email" required autocomplete="email" placeholder="you@company.com"><button class="button button-primary" type="submit">Send checklist <span aria-hidden="true">→</span></button></div><small>Practical notes only. Read our <a href="privacy-policy.html">privacy policy</a>.</small></form></aside><div class="footer-grid"><div><a class="brand" href="index.html" aria-label="Gill AI Labs home"><span class="brand-mark" aria-hidden="true">G</span>Gill AI Labs</a><p class="footer-blurb">Building AI products that transform businesses through thoughtful product strategy and dependable engineering.</p><ul class="trust-list" aria-label="Gill AI Labs trust commitments"><li>Senior-led delivery</li><li>Responsible AI</li><li>Privacy-aware</li></ul></div><div><p class="footer-title">Capabilities</p><div class="footer-links"><a href="services.html">AI Product Development</a><a href="ai-solutions.html">AI Solutions</a><a href="process.html">Our Process</a><a href="ai-readiness.html">AI Readiness Assessment</a><a href="technologies.html">Technology Stack</a><a href="pricing.html">Engagement Models</a></div></div><div><p class="footer-title">Company and Trust</p><div class="footer-links"><a href="about.html">About us</a><a href="leadership.html">Leadership</a><a href="responsible-ai.html">Responsible AI</a><a href="case-studies.html">Case Studies</a><a href="testimonials.html">Client Outcomes</a><a href="partners.html">Partner Ecosystem</a><a href="partner-program.html">Partner Program</a><a href="careers.html">Careers</a><a href="contact.html">Book a consultation</a></div></div><div><p class="footer-title">Learn and Connect</p><div class="footer-links"><a href="ai-labs.html">AI Labs</a><a href="blog.html">AI Insights</a><a href="ai-glossary.html">AI Glossary</a><a href="tools-templates.html">Tools and Templates</a><a href="resources.html">Resources</a><a href="events.html">Events and Workshops</a><a href="press.html">Press and Media</a><a href="faq.html">FAQ</a><a href="sitemap.html">Sitemap</a></div></div></div><div class="footer-bottom"><span>© <span data-year></span> Gill AI Labs. All rights reserved.</span><div class="footer-legal"><a href="privacy-policy.html">Privacy</a><a href="terms-conditions.html">Terms</a><a href="cookie-policy.html">Cookies</a></div></div></div></footer>`;

document.querySelector('[data-site-header]').innerHTML = trustedHTML(header);
document.querySelector('[data-site-footer]').innerHTML = trustedHTML(footer);
document.querySelectorAll('.brand[aria-label="Gill AI Labs home"]').forEach((brand) => {
  brand.removeAttribute('aria-label');
});
document.querySelector('[data-year]').textContent = new Date().getFullYear();

const footerBlurb = document.querySelector('.footer-blurb');
footerBlurb.textContent = 'Building Intelligent Software & Agentic AI Solutions for Modern Businesses.';

if (currentPage === 'faq') {
  const positioning = 'Custom software development and agentic AI solutions';
  const companyDescription = 'Gill AI Labs is a custom software development and agentic AI solutions company that designs and builds intelligent software, AI agents, automation systems, SaaS products, web apps, and mobile applications.';
  document.title = 'Custom Software & Agentic AI FAQ | Gill AI Labs';
  document.querySelector('meta[name="description"]')?.setAttribute('content', `Answers to common questions about ${positioning.toLowerCase()}, LLMs, RAG, automation, pricing, security, and working with Gill AI Labs.`);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', 'Clear answers about custom software, agentic AI systems, delivery, pricing, security, and support.');

  const companyQuestion = [...document.querySelectorAll('details')]
    .find((detail) => detail.querySelector('summary')?.textContent.trim() === 'What is Gill AI Labs?');
  companyQuestion?.querySelector('p')?.replaceChildren(companyDescription);

  const faqSchema = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .find((script) => JSON.parse(script.textContent)['@type'] === 'FAQPage');
  if (faqSchema) {
    const schema = JSON.parse(faqSchema.textContent);
    const companyAnswer = schema.mainEntity.find((entry) => entry.name === 'What is Gill AI Labs?');
    if (companyAnswer) companyAnswer.acceptedAnswer.text = companyDescription;
    faqSchema.textContent = JSON.stringify(schema);
  }
}

const enquiryEmail = 'hello@gillailabs.com';
const enquirySubjects = {
  contact: 'AI assessment enquiry',
  'ai-readiness': 'AI readiness assessment request',
  'partner-program': 'Partner programme enquiry',
  careers: 'Career enquiry'
};

const enquirySubject = (form) => {
  if (form.classList.contains('footer-signup') || form.closest('.lead-modal')) {
    return 'AI Readiness Checklist request';
  }
  return enquirySubjects[currentPage] || 'Gill AI Labs enquiry';
};

const enquiryFieldLabel = (form, fieldName) => {
  const control = [...form.elements].find((element) => element.name === fieldName);
  return control?.labels?.[0]?.textContent.trim()
    || control?.closest('label')?.querySelector('span')?.textContent.trim()
    || fieldName.replace(/[-_]/g, ' ');
};

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (!(form instanceof HTMLFormElement)) return;
  if (form.getAttribute('action') !== 'thank-you.html') return;
  if (!form.reportValidity()) return;

  event.preventDefault();
  const details = [...new FormData(form).entries()]
    .map(([fieldName, value]) => `${enquiryFieldLabel(form, fieldName)}: ${value}`);
  const body = ['Hello Gill AI Labs,', '', 'Please see my enquiry details:', '', ...details].join('\r\n');
  const mailto = `mailto:${enquiryEmail}?subject=${encodeURIComponent(enquirySubject(form))}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});

const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('gill-theme');
document.documentElement.dataset.theme = savedTheme === 'light' ? 'light' : 'dark';
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('gill-theme', nextTheme);
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const closeNavigation = ({ returnFocus = false } = {}) => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  menuToggle.textContent = '☰';
  if (returnFocus) menuToggle.focus();
};
const toggleNavigation = () => {
  const isOpen = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
};
menuToggle.addEventListener('click', toggleNavigation);
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeNavigation();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) closeNavigation({ returnFocus: true });
});

const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 12);
  backToTop.classList.toggle('visible', window.scrollY > 650);
}, { passive: true });
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const heroImages = {
  about: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85",
  services: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1000&q=85",
  "ai-solutions": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=85",
  industries: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
  technologies: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
  "case-studies": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85",
  portfolio: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=85",
  blog: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=85",
  resources: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
  careers: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
  pricing: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=85",
  contact: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85",
  faq: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=85",
  process: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=85",
  "ai-readiness": "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1000&q=85",
  "responsible-ai": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1000&q=85",
  testimonials: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=85",
  "ai-labs": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
  leadership: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85",
  partners: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=85",
  "ai-glossary": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
  "tools-templates": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1000&q=85",
  events: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=85",
  press: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1000&q=85",
  "partner-program": "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1000&q=85"
};

const pageHero = document.querySelector('.page-hero');
if (pageHero && heroImages[currentPage]) {
  pageHero.insertAdjacentHTML('beforeend', trustedHTML(`<img class="hero-art" src="${heroImages[currentPage]}" alt="" aria-hidden="true">`));
}

const motionTargets = document.querySelectorAll('.service-card,.case-card,.info-card,.article-card,.service-detail,.industry-card,.tech-group,.process-list li,.feature-list article,.case-study,.resource-banner');
motionTargets.forEach((target, index) => {
  target.classList.add('motion-item');
  target.style.setProperty('--motion-delay', `${Math.min(index % 4, 3) * 75}ms`);
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const motionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  motionTargets.forEach((target) => motionObserver.observe(target));

  const revealVisibleMotionItems = () => {
    motionTargets.forEach((target) => {
      if (target.getBoundingClientRect().top < window.innerHeight * 0.9) target.classList.add('is-visible');
    });
  };
  revealVisibleMotionItems();
  window.addEventListener('scroll', revealVisibleMotionItems, { passive: true });
} else {
  motionTargets.forEach((target) => target.classList.add('is-visible'));
}

let leadModalTrigger;
const closeLeadModal = () => {
  document.querySelector('.lead-modal')?.remove();
  leadModalTrigger?.focus();
};
const showLeadModal = () => {
  if (sessionStorage.getItem('gill-lead-modal')) return;
  sessionStorage.setItem('gill-lead-modal', 'seen');
  leadModalTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
  document.body.insertAdjacentHTML('beforeend', trustedHTML(`<div class="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title" aria-describedby="lead-modal-description"><div class="lead-modal-card"><button class="lead-modal-close" type="button" aria-label="Close offer">×</button><p class="eyebrow">AI opportunity brief</p><h2 id="lead-modal-title">Before you go, get a clearer next step.</h2><p id="lead-modal-description">Share your work email and we will send the AI Readiness Checklist.</p><form action="thank-you.html" method="get"><label class="sr-only" for="lead-email">Work email</label><input id="lead-email" required type="email" name="email" placeholder="you@company.com" autocomplete="email"><button class="button button-primary" type="submit">Send checklist <span aria-hidden="true">→</span></button></form></div></div>`));
  document.querySelector('.lead-modal-close')?.focus();
  document.querySelector('.lead-modal-close')?.addEventListener('click', closeLeadModal);
  document.querySelector('.lead-modal')?.addEventListener('click', (event) => {
    if (event.target.classList.contains('lead-modal')) closeLeadModal();
  });
};

document.addEventListener('keydown', (event) => {
  const modal = document.querySelector('.lead-modal');
  if (!modal) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeLeadModal();
  }
  if (event.key !== 'Tab') return;
  const focusable = [...modal.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first || !last) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

if (!window.matchMedia('(pointer: coarse)').matches) {
  document.addEventListener('mouseleave', (event) => {
    if (event.clientY < 8) showLeadModal();
  }, { once: true });
}
