import { useState, useEffect } from 'react';
import { 
  Paintbrush, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Star, 
  ChevronRight, 
  HelpCircle, 
  MessageSquare, 
  Sun, 
  Moon, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { BeforeAfter } from './components/BeforeAfter';
import { QuoteEstimator } from './components/QuoteEstimator';
import { InteractivePalette } from './components/InteractivePalette';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Auto-scarcity: calculate how many slots are left today
  const [availableSlots, setAvailableSlots] = useState<number>(3);
  
  useEffect(() => {
    // Simulate active browsing slot depletion to trigger psychological urgency
    const interval = setTimeout(() => {
      setAvailableSlots(2);
    }, 12000);
    return () => clearTimeout(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const faqs = [
    {
      q: "Eşyalarımı nasıl koruyorsunuz? Boya damlar mı?",
      a: "Asla. Çalışma başlamadan önce tüm eşyalarınız odanın ortasına toplanır, çift kat koruyucu pıt-pıt naylonla sarılır. Parkeleriniz ise özel yapışkanlı kalın mavi zemin koruyucu örtüyle kaplanır. Süpürgelikler, maskeleme bantlarıyla milimetrik olarak kapatılır. İş bittiğinde evinizden tek bir toz tanesi çıkmaz."
    },
    {
      q: "Boya işi gerçekten 1 günde biter mi?",
      a: "Evet. Dairenizin boyutuna göre (1+1, 2+1, 3+1) uzman ekiplerimiz kişi sayısını önceden planlar. Örneğin, 3+1 daireler için aynı anda 4 profesyonel boya ustamız çalışır. Jotun'un hızlı kuruyan ipek mat boya teknolojisi sayesinde sabah 08:30'da başlayıp akşam 18:00'de evinizi tertemiz teslim ederiz."
    },
    {
      q: "Ödemeyi ne zaman yapıyorum?",
      a: "Müşterilerimize duyduğumuz güvenin göstergesi olarak sıfır peşinatla çalışıyoruz. Malzeme dahil tüm süreç bittikten, duvarları inceleyip elinizle dokunup onay verdikten sonra ödemeyi yaparsınız. Güven odaklı bu yaklaşımımız bizi Maps'te en yüksek puanlı usta yaptı."
    },
    {
      q: "Duvarlarda rutubet veya soyulma varsa ne yapıyorsunuz?",
      a: "Basit boyacılar gibi üstünü boyayıp geçmiyoruz. Rutubetli veya çatlak alanları önce kazıyor, ardından özel nem engelleyici astar ve tamir harçlarıyla alt yapıyı sıfırlıyoruz. Bu sayede uyguladığımız boya 10 yıl boyunca solmadan ve soyulmadan kalıyor."
    }
  ];

  return (
    <div className="app-shell">
      {/* 1. Psychological Urgency (Scarcity Banner) */}
      <div className="scarcity-banner">
        <AlertTriangle size={16} />
        <span>BU HAFTA İÇİN ANADOLU VE AVRUPA YAKASI'NDA SON <strong>{availableSlots} REZERVASYON</strong> KONTENJANI KALDI!</span>
      </div>

      {/* 2. Header */}
      <header>
        <div className="container header-inner">
          <a href="#" className="logo">
            <Paintbrush style={{ color: 'var(--color-accent)' }} />
            <span>Kusursuz</span>Boya
          </a>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} style={{ color: 'var(--color-accent)' }} /> 08:30 - 20:00 (Her Gün)
            </span>
            <button 
              className="theme-toggle" 
              onClick={toggleDarkMode}
              title={darkMode ? "Aydınlık Mod" : "Karanlık Mod"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="tel:08503089452" className="btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <Phone size={14} /> 0850 308 9452
            </a>
          </nav>
        </div>
      </header>

      {/* 3. Hero Section (Authority & Specificity) */}
      <section className="hero">
        <div className="container grid-2">
          <div className="hero-content fade-in">
            <span className="tagline">GOOGLE HARİTALAR KULLANICILARINA ÖZEL</span>
            <h1 style={{ marginBottom: '1rem' }}>
              Milimetrik Kenar Hassasiyeti ile <span className="highlight-text">1 Günde</span> Tozsuz Boya Uygulaması
            </h1>
            <p style={{ fontSize: '1.15rem', opacity: 0.85, marginBottom: '2rem' }}>
              Eşyalarınızı çift kat koruyucu naylonla kaplıyoruz, tek bir damla boya damlatmadan, Jotun premium boyalarıyla evinizi 1 günde baştan yaratıyoruz. <strong>%100 Memnuniyet Garantisi</strong> & Sıfır Peşinat.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#quote-section" className="btn-primary" style={{ textDecoration: 'none', fontSize: '1.05rem', padding: '1rem 2rem' }}>
                Akıllı Hesaplayıcı ile Fiyat Al <ChevronRight size={18} />
              </a>
              <a href="https://wa.me/905330000000?text=Merhaba,%20boya%20teklifi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
                <MessageSquare size={18} style={{ color: '#25D366' }} /> WhatsApp Danışma Hattı
              </a>
            </div>

            <div className="trust-badge-row">
              <div className="trust-badge">
                <ShieldCheck size={18} />
                <span>10 Yıl Solmama Garantisi</span>
              </div>
              <div className="trust-badge">
                <Star size={18} style={{ fill: 'var(--color-accent-light)', color: 'var(--color-accent-light)' }} />
                <span>Google Maps'te 4.9 Puan (180+ Yorum)</span>
              </div>
            </div>
          </div>

          {/* Before/After Visual Contrast Slider */}
          <div className="fade-in delay-1" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <h4 style={{ textAlign: 'center', marginBottom: '1rem', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span>↔</span> Parmağınızla Kaydırarak Kaliteyi Keşfedin
              </h4>
              <BeforeAfter 
                beforeImage="/room_before.png" 
                afterImage="/room_after.png" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Social Proof & Local Focus Section (Google Maps Optimization) */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <div className="maps-badge" style={{ marginBottom: '1rem' }}>
              <MapPin size={12} /> Yakın Zamanda Tamamlanan Projelerimiz
            </div>
            <h2>Çevrenizdeki Evler Nasıl Boyandı?</h2>
            <p>Son 14 gün içerisinde mahallenizde tamamladığımız gerçek işlerin sahipleri konuşuyor.</p>
          </div>

          <div className="reviews-grid">
            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60" alt="Müşteri 1" className="reviewer-avatar" />
                <div className="reviewer-info">
                  <h4>Selin Alpay</h4>
                  <p>Kadıköy, Moda — 3+1 Daire</p>
                </div>
              </div>
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: 'var(--color-accent-light)' }} />)}
              </div>
              <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                "Google Haritalar'daki yorumlara bakarak tercih ettim. Başta 1 günde biteceğine inanmamıştım ama sabah gelen 4 kişilik ekip o kadar planlıydı ki şok oldum. Eşyaları korumak için gösterdikleri özen duvar işinden daha temizdi. Jotun Majestic seçtik, renkler tam istediğimiz gibi."
              </p>
            </div>

            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" alt="Müşteri 2" className="reviewer-avatar" />
                <div className="reviewer-info">
                  <h4>Kaan Şenyurt</h4>
                  <p>Ataşehir, Barbaros — 2+1 Daire</p>
                </div>
              </div>
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: 'var(--color-accent-light)' }} />)}
              </div>
              <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                "Sıfır peşinat sistemi beni ikna etti. İş bitene kadar hiç ödeme yapmadım. Zımpara makinesinin vakumlu olması sayesinde evde neredeyse hiç toz çıkmadı. Özellikle tavan kenarlarındaki milimetrik çizgiler işçiliğin kalitesini gösteriyor."
              </p>
            </div>

            <div className="review-card">
              <div className="reviewer-profile">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60" alt="Müşteri 3" className="reviewer-avatar" />
                <div className="reviewer-info">
                  <h4>Meral Demir</h4>
                  <p>Beşiktaş, Levent — 1+1 Ofis</p>
                </div>
              </div>
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} style={{ fill: 'var(--color-accent-light)' }} />)}
              </div>
              <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                "Ofisimizin renk değişimi için anlaştık. Akıllı hesaplayıcıdaki teklif neyse tam olarak o fiyatı ödedim, sonradan ek masraf çıkarmadılar. Renk seçimi konusunda 3D görselleştirme desteği kararsızlığımızı çözdü."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Section (Colors Palette & Quote Estimator) */}
      <section className="evidence-section" id="quote-section">
        <div className="container grid-2">
          {/* Left: Color Visualizer */}
          <InteractivePalette />

          {/* Right: Step-by-Step Quote Estimator */}
          <QuoteEstimator />
        </div>
      </section>

      {/* 6. Reciprocity Value Section */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.02))' }}>
        <div className="container">
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center', padding: '3.5rem 2rem' }}>
            <div style={{ 
              background: 'var(--color-accent-soft)', 
              color: 'var(--color-accent)', 
              padding: '0.5rem 1.5rem', 
              borderRadius: '30px', 
              fontSize: '0.85rem', 
              fontWeight: 700 
            }}>
              ÜCRETSİZ PREMIUM KARTELET SETİ & RENK DANIŞMANLIĞI
            </div>
            <h2 style={{ maxWidth: '800px', margin: 0 }}>Sadece Boyamıyoruz, Evinizi Profesyonel Mimarlarla Tasarlıyoruz</h2>
            <p style={{ maxWidth: '700px', margin: 0, opacity: 0.85 }}>
              Kararsız mısınız? Hangi odanın hangi renkle daha büyük veya sakin görüneceğini bilmiyor musunuz? Fiyat teklifinizi aldıktan sonra, uzman renk mimarımız evinize gelerek ışık analizine göre size özel renk şemaları hazırlar.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} /> Ücretsiz Keşif & Analiz
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} /> Gerçek Boya Kartelası Teslimi
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600 }}>
                <CheckCircle2 size={18} style={{ color: 'var(--color-success)' }} /> 3D Görselleştirme Raporu
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Authority FAQs */}
      <section className="evidence-section" style={{ borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Sıkça Sorulan Sorular</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="glass-card"
                style={{ 
                  padding: '1.2rem', 
                  cursor: 'pointer',
                  borderRadius: '12px',
                  backgroundColor: activeFaq === idx ? 'rgba(0,0,0,0.02)' : 'transparent'
                }}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HelpCircle size={18} style={{ color: 'var(--color-accent)' }} /> {faq.q}
                  </h4>
                  <span style={{ fontSize: '1.2rem', fontWeight: 600 }}>{activeFaq === idx ? '−' : '+'}</span>
                </div>
                {activeFaq === idx && (
                  <p style={{ margin: '1rem 0 0 0', fontSize: '0.95rem', opacity: 0.8, borderTop: '1px solid var(--color-border-light)', paddingTop: '1rem', lineHeight: '1.6' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action floating bottom right for mobile traffic */}
      <a 
        href="https://wa.me/905330000000?text=Merhaba,%20hızlı%20boya%20teklifi%20almak%20istiyorum." 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50px',
          padding: '0.8rem 1.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          textDecoration: 'none',
          fontWeight: 700,
          zIndex: 999,
          fontFamily: 'var(--font-sans)',
          transition: 'var(--transition-smooth)'
        }}
        className="whatsapp-float"
      >
        <MessageSquare size={20} />
        <span>Hızlı Teklif (WhatsApp)</span>
      </a>

      {/* 9. Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-col">
            <h4 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'white', marginBottom: '1rem' }}>
              <Paintbrush style={{ color: 'var(--color-accent)', marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} size={20} />
              Kusursuz Boya Teknolojileri
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>
              İstanbul genelinde 1.400'den fazla konut ve ofis projesinde kusursuzluğu tescil edilmiş profesyonel boya hizmeti sunuyoruz. Google Maps entegrasyonu ve sıfır peşinat güvencesiyle daima yanınızdayız.
            </p>
          </div>
          <div className="footer-col">
            <h4>Hizmet Bölgeleri</h4>
            <ul>
              <li><a href="#quote-section">Kadıköy & Ataşehir</a></li>
              <li><a href="#quote-section">Beşiktaş & Levent</a></li>
              <li><a href="#quote-section">Üsküdar & Beykoz</a></li>
              <li><a href="#quote-section">Şişli & Sarıyer</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>İletişim</h4>
            <ul>
              <li>Müşteri Destek: <strong>0850 308 9452</strong></li>
              <li>E-posta: <strong>info@kusursuzboya.com</strong></li>
              <li>Merkez: Moda Cd. No:142 Kadıköy / İstanbul</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} Kusursuz Boya. Tüm hakları saklıdır. Google Haritalar yönlendirme sayfasıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
