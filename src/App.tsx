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
  CheckCircle2
} from 'lucide-react';
import { BeforeAfter } from './components/BeforeAfter';
import { QuoteEstimator } from './components/QuoteEstimator';
import { InteractivePalette } from './components/InteractivePalette';
import { RiskComparison } from './components/RiskComparison';
import { ExitIntentModal } from './components/ExitIntentModal';

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Next realistically available appointment date
  const [nextAvailableDate, setNextAvailableDate] = useState<string>('');

  const scrollToEstimator = () => {
    const element = document.getElementById('quote-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // If we need to focus/scroll to early-location input
      const input = document.getElementById('early-location');
      if (input) {
        (input as HTMLInputElement).focus();
      }
    }
  };

  useEffect(() => {
    // Dynamically calculate the next available weekday (e.g. today + 2 days, skipping Sunday)
    const today = new Date();
    const targetDate = new Date(today);
    // Add 2 days, if Sunday (0) or Saturday (6), adjust so it's a weekday
    targetDate.setDate(today.getDate() + 2);
    if (targetDate.getDay() === 0) {
      targetDate.setDate(targetDate.getDay() + 1); // move Sunday to Monday
    } else if (targetDate.getDay() === 6) {
      targetDate.setDate(targetDate.getDay() + 2); // move Saturday to Monday
    }
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', weekday: 'long' };
    setNextAvailableDate(targetDate.toLocaleDateString('tr-TR', options));
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
      q: "Boya işi gerçekten 1 günde biter mi? Kaliteden ödün veriliyor mu?",
      a: "Evet, 1+1, 2+1 ve 3+1 daireler için 1 günde tamamlanır. Bunu daire büyüklüğüne göre uzman ekiplerimizin sayısını artırarak sağlıyoruz (örneğin 3+1 daireye 4 profesyonel usta girer). Ancak kaliteden asla ödün vermeyiz: Eğer duvarlarınızda derin alçı tamiratı veya yoğun nem/rutubet varsa, aceleye getirilmiş uygulama yapmayız. Bu gibi durumlarda, zemin hazırlığı ve nem kurutma için ek yarım gün veya 1 gün planlarız. Zemin tam olarak hazır olmadan boyama işlemine geçmeyiz."
    },
    {
      q: "4+1, dubleks, villa veya geniş ofisler de 1 günde mi biter?",
      a: "Hayır. Villa, dubleks veya 4+1 gibi geniş ölçekli projelerde iş planını büyüklüğe göre 2 veya 3 güne yayarak planlıyoruz. Kaliteli zımpara, astar kuruma süreleri ve ince kestirme işçiliklerinin kusursuz olması için bu tip projelerde özel geniş ekiplerimizle adım adım ilerliyoruz."
    },
    {
      q: "Ödemeyi ne zaman yapıyorum?",
      a: "Müşterilerimize duyduğumuz güvenin göstergesi olarak sıfır peşinatla çalışıyoruz. Malzeme dahil tüm süreç bittikten, duvarları inceleyip elinizle dokunup onay verdikten sonra ödemeyi yaparsınız. Güven odaklı bu yaklaşımımız bizi Maps'te en yüksek puanlı usta yaptı."
    },
    {
      q: "Duvarlarda rutubet veya soyulma varsa ne yapıyorsunuz?",
      a: "Basit boyacılar gibi nemli bölgeyi hemen kapatıp geçmiyoruz. Sorunlu bölgeleri kazıdıktan sonra nem kurutucu endüstriyel fanlarla kurutuyor, özel nem/rutubet engelleyici astarlar ve yüksek mukavemetli tamir harçlarıyla zemini sıfırlıyoruz. Bu işlemler kuruma süresi gerektirdiğinden, gerekirse iş planına hazırlık günü ekleyerek işi 2 güne yayıyoruz."
    }
  ];

  return (
    <div className="app-shell">
      {/* Exit Intent reminder */}
      <ExitIntentModal onActionClick={scrollToEstimator} />

      {/* 1. Availability Status Banner */}
      <div className="scarcity-banner">
        <Clock size={16} />
        <span>TÜM İSTANBUL'DA HİZMETİNİZDEYİZ! En erken <strong>{nextAvailableDate}</strong> için randevu planlanabilir.</span>
      </div>

      {/* 2. Header */}
      <header>
        <div className="container header-inner">
          <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img src="/turna-boya-logo.png" alt="Turna Boya logo" width={40} height={40} style={{ borderRadius: '10px' }} />
            <span><span style={{ color: 'var(--color-accent)' }}>Turna</span> Kusursuz Boya</span>
          </a>
          
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} style={{ color: 'var(--color-accent)' }} /> 08:30 - 20:00 (Tüm İstanbul)
            </span>
            <button 
              className="theme-toggle" 
              onClick={toggleDarkMode}
              title={darkMode ? "Aydınlık Mod" : "Karanlık Mod"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="tel:05343435603" className="btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
              <Phone size={14} /> 0 534 343 56 03
            </a>
          </nav>
        </div>
      </header>

      {/* 3. Hero Section (Authority & Specificity) */}
      <section className="hero">
        <div className="container grid-2">
          <div className="hero-content fade-in">
            <span className="tagline">İSTANBUL GENELİ MOBİL EKİPLER</span>
            <h1 style={{ marginBottom: '1rem' }}>
              Sıfır Risk: Ödemeyi İş Bitiminde Yapın! <span className="highlight-text">1 Günde</span> Tozsuz Boya
            </h1>
            <p style={{ fontSize: '1.15rem', opacity: 0.85, marginBottom: '1.5rem' }}>
              İstanbul'un her ilçesindeyiz. Eşyalarınızı çift kat koruyucu naylonla kaplıyor, tek damla boya damlatmadan, Jotun boyalarıyla evinizi 1 günde teslim ediyoruz. %100 Beğenme Garantisi & Sıfır Peşinat.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button onClick={scrollToEstimator} className="btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>
                Akıllı Hesaplayıcı ile Fiyat Al <ChevronRight size={18} />
              </button>
              <a href="https://wa.me/905343435603?text=Merhaba,%20boya%20teklifi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem' }}>
                <MessageSquare size={18} style={{ color: '#25D366' }} /> WhatsApp Danışma Hattı
              </a>
            </div>

            <div className="trust-badge-row">
              <div className="trust-badge">
                <ShieldCheck size={18} />
                <span>Boyayı Beğenmezseniz Ödemeyin</span>
              </div>
              <div className="trust-badge">
                <Star size={18} style={{ fill: 'var(--color-accent-light)', color: 'var(--color-accent-light)' }} />
                <span>Sıfır Peşinat, Ödeme İş Bitince</span>
              </div>
            </div>

            <div className="trust-badge-row" style={{ marginTop: '1rem', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--color-border-light)' }} className="brand-trust-badge">
                <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>JOTUN</span> Boyaları Kullanıyoruz
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.08)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid var(--color-border-light)' }} className="brand-trust-badge">
                <ShieldCheck size={14} /> Vakumlu Tozsuz Zımpara
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

      {/* Sıfır Risk & Güven Güvencemiz */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg-light)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tagline" style={{ margin: '0 auto 1rem auto' }}>SIFIR RİSK HİZMET MODELİ</span>
            <h2>Evinizi Boyatırken Kafanızda Tek Bir Soru İşareti Kalmasın</h2>
            <p>Sıradan boyacıların yaşattığı tüm stresleri ortadan kaldırıyoruz. Turna Boya ile tamamen güvendesiniz.</p>
          </div>
          
          <div className="reviews-grid" style={{ marginTop: '3rem' }}>
            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Sıfır Peşinat & Ödeme Sonra</h3>
              </div>
              <p style={{ fontSize: '0.95rem', opacity: 0.85, margin: 0, lineHeight: 1.6 }}>
                Önden kapora veya peşinat ödemezsiniz. Evinizi boyayıp teslim ettikten, siz de duvarları tek tek inceleyip elinizle dokunup onay verdikten sonra ödemeyi yaparsınız.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>₺200.000 Eşya Hasar Teminatı</h3>
              </div>
              <p style={{ fontSize: '0.95rem', opacity: 0.85, margin: 0, lineHeight: 1.6 }}>
                Çalışma sırasında parkeleriniz, mobilyalarınız ve değerli eşyalarınız çift kat koruyucu örtüyle kaplanır. Oluşabilecek en ufak hasar teminatımız altındadır.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(180, 83, 9, 0.1)', color: '#B45309', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>%100 Beğenme Garantisi</h3>
              </div>
              <p style={{ fontSize: '0.95rem', opacity: 0.85, margin: 0, lineHeight: 1.6 }}>
                İşçilikten veya renkten memnun kalmazsanız, ekibimiz siz "Kusursuz olmuş" diyene kadar düzeltmeleri ücretsiz yapar. Sadece memnuniyeti satın alırsınız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Comparison Section */}
      <RiskComparison />

      {/* Nasıl Çalışıyoruz */}
      <section style={{ padding: '6rem 0', background: 'var(--color-bg-light)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div className="section-header">
            <span className="tagline" style={{ margin: '0 auto 1rem auto' }}>SÜREÇ</span>
            <h2>1 Günlük Boya Sürecimiz Nasıl İşliyor?</h2>
            <p>Her adımda ne yaptığımızı baştan biliyorsunuz, sürprizle karşılaşmıyorsunuz.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>1. ADIM</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0 0.5rem 0' }}>Yerinde veya Uzaktan Keşif</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: 1.5 }}>
                Dairenizin büyüklüğünü ve duvar durumunu değerlendirip net bir fiyat aralığı veriyoruz.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>2. ADIM</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0 0.5rem 0' }}>Koruma ve Hazırlık</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: 1.5 }}>
                Eşyalarınız çift kat naylonla, zeminleriniz koruyucu örtüyle kaplanır. Vakumlu makinelerle tozsuz zımparalama yapılır.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>3. ADIM</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0 0.5rem 0' }}>Jotun Boya Uygulaması</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: 1.5 }}>
                Seçtiğiniz renk ve kalitede, iki kat boya uygulaması yapılır.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent)' }}>4. ADIM</span>
              <h4 style={{ fontSize: '1.1rem', margin: '0.4rem 0 0.5rem 0' }}>Kontrol ve Ödeme</h4>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, margin: 0, lineHeight: 1.5 }}>
                Duvarları birlikte kontrol ederiz. Memnun kaldıysanız ödemeyi o zaman yaparsınız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ekip Yaklaşımımız */}
      <section style={{ padding: '6rem 0', background: 'rgba(0,0,0,0.01)', borderBottom: '1px solid var(--color-border-light)' }} className="team-safety-section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="tagline">EKİP YAKLAŞIMIMIZ</span>
              <h2 style={{ marginTop: '1rem' }}>Evinizi Kime Emanet Ettiğinizi Biliyorsunuz</h2>
              <p style={{ opacity: 0.85, marginBottom: '2rem' }}>
                Ev boyatırken sadece işin kalitesi değil, evinizin güvenliği de önemlidir. Bu yüzden süreci baştan sona şeffaf tutuyoruz.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ minWidth: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }} className="flex-center">
                    ✓
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem' }}>Sıfır Peşinat</h5>
                    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>İş bitip siz duvarları onaylamadan hiçbir ödeme talep etmeyiz.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ minWidth: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }} className="flex-center">
                    ✓
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem' }}>Sabit Fiyat Garantisi</h5>
                    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>Akıllı hesaplayıcıda verdiğimiz teklif, iş bitiminde ödeyeceğiniz tutardır. Sürpriz ek ücret çıkmaz.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ minWidth: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-accent-soft)', color: 'var(--color-accent)' }} className="flex-center">
                    ✓
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 0.2rem 0', fontSize: '1rem' }}>Vakumlu Tozsuz Çalışma</h5>
                    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>Endüstriyel vakumlu zımpara makineleriyle evinizde toz bırakmadan çalışırız.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80" alt="Boya çalışması illüstrasyonu" style={{ width: '100%', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-elevated)' }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(15,23,42,0.9)', color: 'white', padding: '1rem', borderRadius: '8px', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Eviniz Emin Ellerde</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '0.2rem' }}>Sıfır peşinat modeli ve şeffaf fiyatlandırmayla kusursuz hizmet.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Google Yorumları CTA */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <div className="maps-badge" style={{ marginBottom: '1rem' }}>
              <MapPin size={12} /> Google İşletme Profilimiz
            </div>
            <h2>Yeni Açıldık, Bizi Google'da Takip Edin</h2>
            <p>Turna Boya yeni bir marka. Uydurma yorum koymak yerine, işlerimizi tamamladıkça biriken gerçek Google yorumlarımızı burada göreceksiniz.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <a
              href="https://www.google.com/search?q=Turna+Boya"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '1rem 2rem' }}
            >
              <Star size={18} /> Google'da Profilimizi İnceleyin
            </a>
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
        href="https://wa.me/905343435603?text=Merhaba,%20hızlı%20boya%20teklifi%20almak%20istiyorum." 
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
              Turna Kusursuz Boya Teknolojileri
            </h4>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>
              İstanbul genelinde konut ve ofisler için Jotun boyalarıyla, sıfır peşinat ve şeffaf fiyatlandırmayla boya badana hizmeti sunuyoruz.
            </p>
          </div>
          <div className="footer-col">
            <h4>Hizmet Bölgeleri</h4>
            <ul>
              <li><a href="#quote-section">Bakırköy, Yeşilköy & Florya</a></li>
              <li><a href="#quote-section">Kadıköy, Ataşehir & Üsküdar</a></li>
              <li><a href="#quote-section">Beşiktaş, Levent & Şişli</a></li>
              <li><a href="#quote-section">Tüm İstanbul (Avrupa & Anadolu Yakası)</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>İletişim</h4>
            <ul>
              <li>Müşteri Destek: <strong>0 534 343 56 03</strong></li>
              <li>Merkez: Kartaltepe Mh. İncirli Cd. No:48 Bakırköy / İstanbul</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <p style={{ margin: 0, fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} Turna Kusursuz Boya. Tüm hakları saklıdır. Google Haritalar yönlendirme sayfasıdır.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
