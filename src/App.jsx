import React, { useState, createContext, useContext, useEffect, useMemo, useCallback, memo } from 'react';
import './index.css';

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

// Contact Details
const CONTACT = {
  phone: import.meta.env.VITE_PHONE || '9951264364',
  email: import.meta.env.VITE_EMAIL || 'contact@a1buildingservices.com',
  whatsapp: import.meta.env.VITE_WHATSAPP || '919951264364'
};

// Icons with Official Styles - Memoized to prevent re-renders
const PhoneIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
));
const MailIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0 1.1.9 2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
));
const WhatsAppLogo = memo(() => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.896a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" fill="white" /></svg>
));

const translations = {
  en: {
    nav: ['Home', 'Services', 'Contact'],
    hero: {
      title: 'Protect Your Building, Protect Your Health',
      subtitle: 'Premium Water Tank Cleaning & Leakage Proofing Solutions',
      cta: 'Get a Free Quote'
    },
    services: {
      subtitle: 'What We Do',
      title: 'Our Premium Services',
      items: [
        { title: 'Water Tank Cleaning', desc: 'Advanced 6-step cleaning process for crystal clear, safe water.' },
        { title: 'Roof Leakage Proofing', desc: 'Permanent leakage solutions with modern waterproofing technology.' },
        { title: 'Home Disinfection', desc: 'Complete sanitization for a healthy living environment.' }
      ]
    },
    contact: {
      title: 'Get In Touch',
      name: 'Your Name',
      phone: 'Phone Number',
      location: 'Location / Area',
      pincode: 'Pincode',
      message: 'Service Needed / Message',
      submit: 'Send Request',
      success: 'Thank you! We will call you shortly.'
    }
  },
  te: {
    nav: ['హోమ్', 'సేవలు', 'సంప్రదించండి'],
    hero: {
      title: 'మీ భవనాన్ని రక్షించుకోండి, మీ ఆరోగ్యాన్ని కాపాడుకోండి',
      subtitle: 'అత్యుత్తమ వాటర్ ట్యాంక్ క్లీనింగ్ & లీకేజీ ప్రూఫింగ్ సేవలు',
      cta: 'ఉచిత కోట్ పొందండి'
    },
    services: {
      subtitle: 'మేము ఏమి చేస్తాము',
      title: 'మా సేవలు',
      items: [
        { title: 'వాటర్ ట్యాంక్ క్లీనింగ్', desc: 'నమ్మకమైన 6-దశల క్లీనింగ్ ప్రాసెస్.' },
        { title: 'రూఫ్ లీకేజీ ప్రూఫింగ్', desc: 'ఆధునిక టెక్నాలజీతో శాశ్వత లీకేజీ పరిష్కారాలు.' },
        { title: 'ఇంటి క్రిమిసంహారక', desc: 'ఆరోగ్యకరమైన జీవనం కోసం పూర్తి సానిటైజేషన్.' }
      ]
    },
    contact: {
      title: 'సంప్రదించండి',
      name: 'మీ పేరు',
      phone: 'ఫోన్ నంబర్',
      location: 'ప్రాంతం / ఏరియా',
      pincode: 'పిన్ కోడ్',
      message: 'మీకు కావలసిన సేవ',
      submit: 'పంపండి',
      success: 'ధన్యవాదాలు! మేము మిమ్మల్ని త్వరలో సంప్రదిస్తాము.'
    }
  }
};

function App() {
  const [lang, setLang] = useState('en');
  const t = useMemo(() => translations[lang], [lang]);

  const toggleLang = useCallback(() => setLang(l => l === 'en' ? 'te' : 'en'), []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang }}>
      <div className="app-container">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <ContactSection />
        <Footer />
        <WhatsAppBtn />
        <ContactFAB />
      </div>
    </LanguageContext.Provider>
  );
}

// Components
const Navbar = () => {
  const { t, toggleLang, lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`nav-fixed ${scrolled ? 'nav-scrolled' : 'nav-transparent'}`}>
      <div className="container flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div
            style={{
              height: '40px',
              width: '40px',
              borderRadius: '50%',
              backgroundImage: 'url(/round_logo_optimized.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: '2px solid var(--accent)',
              backgroundColor: 'white',
              flexShrink: 0
            }}
            role="img"
            aria-label="A1 Building Services Logo"
          />
          <h1 className="heading-sm" style={{ margin: 0, fontSize: 'clamp(0.9rem, 3vw, 1.3rem)', whiteSpace: 'nowrap' }}>
            <span className="text-accent">A1</span> Building Services
          </h1>
        </div>

        {/* Right side - Language toggle only (desktop nav links hidden on mobile via CSS) */}
        <div className="flex gap-4 items-center">
          <div className="nav-links">
            {t.nav.map((item, i) => (
              <a key={i} href={`#section-${i}`} className="text-muted hover:text-accent font-medium">
                {item}
              </a>
            ))}
          </div>
          <button onClick={toggleLang} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}>
            {lang === 'en' ? 'తెలుగు' : 'EN'}
          </button>
        </div>
      </div>
    </nav>
  );
};

// Floating Contact FAB (Phone + Email)
const ContactFAB = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.75rem'
      }}
    >
      {/* Expandable options */}
      <div
        style={{
          display: open ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '0.5rem',
          animation: 'fadeIn 0.2s ease'
        }}
      >
        <a
          href={`tel:${CONTACT.phone}`}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--accent)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s'
          }}
          aria-label="Call Us"
        >
          <PhoneIcon />
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'var(--brand-secondary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s'
          }}
          aria-label="Email Us"
        >
          <MailIcon />
        </a>
      </div>

      {/* Main FAB button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--brand-primary)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(15, 23, 42, 0.3)',
          transition: 'transform 0.3s, background 0.3s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)'
        }}
        aria-label="Contact options"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section id="section-0" className="section flex items-center justify-center animate-fade-in"
      style={{ minHeight: '100vh', paddingTop: '100px', background: 'radial-gradient(circle at top right, #f1f5f9 0%, #ffffff 100%)' }}>

      {/* Decorative Blobs */}
      <div className="blob" style={{ top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'rgba(202, 138, 4, 0.1)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
      <div className="blob" style={{ bottom: '10%', left: '-10%', width: '400px', height: '400px', background: 'rgba(15, 23, 42, 0.05)', borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>

      <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
        <h2 className="heading-lg delay-100 animate-fade-in">{t.hero.title}</h2>
        <p className="text-muted delay-200 animate-fade-in" style={{ fontSize: '1.5rem', marginBottom: '3rem', maxWidth: '800px', marginInline: 'auto' }}>
          {t.hero.subtitle}
        </p>
        <div className="delay-300 animate-fade-in">
          <a href="#section-2" className="btn btn-primary">{t.hero.cta}</a>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const { t } = useLanguage();
  return (
    <section id="section-1" className="section" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '4rem' }}>
          <h2 className="heading-sm text-accent">{t.services.subtitle}</h2>
          <h3 className="heading-md">{t.services.title}</h3>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {t.services.items.map((item, i) => (
            <div key={i} className="card">
              <div style={{
                width: '60px', height: '60px',
                background: 'var(--brand-primary)',
                color: 'var(--accent)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', fontWeight: 'bold',
                marginBottom: '1.5rem',
                boxShadow: 'var(--shadow-md)'
              }}>
                {i + 1}
              </div>
              <h4 className="heading-sm" style={{ color: 'var(--brand-primary)' }}>{item.title}</h4>
              <p className="text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="section-2" className="section" style={{ position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="glass" style={{ padding: '3rem 2rem' }}>
          <h3 className="heading-md text-center">{t.contact.title}</h3>

          {success ? (
            <div className="text-center animate-fade-in" style={{ padding: '2rem', color: 'var(--brand-primary)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h3 className="heading-sm">{t.contact.success}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <input name="name" type="text" placeholder={t.contact.name} required />
                <input name="phone" type="tel" placeholder={t.contact.phone} required />
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                <input name="location" type="text" placeholder={t.contact.location} required />
                <input name="pincode" type="text" placeholder={t.contact.pincode} pattern="[0-9]{6}" maxLength="6" required />
              </div>
              <textarea name="message" rows="4" placeholder={t.contact.message} required></textarea>
              <div className="text-center" style={{ marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Sending...' : t.contact.submit}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer style={{ padding: '3rem 0', textAlign: 'center', background: 'var(--brand-primary)', color: 'white' }}>
    <div className="container">
      <div style={{ marginBottom: '1.5rem' }}>
        <span className="heading-sm" style={{ color: 'white' }}>A1 Building Services</span>
      </div>
      <p className="text-muted" style={{ color: '#94a3b8' }}>&copy; {new Date().getFullYear()} A1 Building Services. All rights reserved.</p>
    </div>
  </footer>
);

const WhatsAppBtn = () => (
  <a
    href={`https://wa.me/${CONTACT.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    className="z-50 animate-fade-in"
    style={{
      position: 'fixed',
      bottom: '2rem', /* ~32px, clearly floating */
      right: '2rem', /* ~32px */
      backgroundColor: '#25D366',
      borderRadius: '50%',
      width: '64px', height: '64px',
      boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'transform 0.3s'
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    aria-label="Chat on WhatsApp"
  >
    <WhatsAppLogo />
  </a>
);

export default App;

