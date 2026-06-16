import React, { useState } from 'react';
import { Home, ClipboardList, CheckCircle, ArrowRight, ArrowLeft, Phone, User, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuoteEstimator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [houseSize, setHouseSize] = useState<string>('');
  const [wallCondition, setWallCondition] = useState<string>('');
  const [paintQuality, setPaintQuality] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactLocation, setContactLocation] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<{ min: number; max: number } | null>(null);

  const totalSteps = 4;
  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  const handleNext = () => {
    if (step === 3) {
      calculatePrice();
    }
    setStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const calculatePrice = () => {
    // Basic premium pricing algorithm
    let basePriceMin = 12000;
    let basePriceMax = 18000;

    if (houseSize === '1+1') { basePriceMin = 9000; basePriceMax = 13000; }
    else if (houseSize === '2+1') { basePriceMin = 14000; basePriceMax = 20000; }
    else if (houseSize === '3+1') { basePriceMin = 19000; basePriceMax = 27000; }
    else if (houseSize === '4+1+') { basePriceMin = 26000; basePriceMax = 38000; }

    // Multipliers for wall condition
    let conditionMultiplier = 1.0;
    if (wallCondition === 'orta') conditionMultiplier = 1.15;
    if (wallCondition === 'kotu') conditionMultiplier = 1.35;

    // Multipliers for paint quality
    let qualityMultiplier = 1.0;
    if (paintQuality === 'premium') qualityMultiplier = 1.25;
    if (paintQuality === 'elite') qualityMultiplier = 1.6;

    setEstimatedPrice({
      min: Math.round(basePriceMin * conditionMultiplier * qualityMultiplier),
      max: Math.round(basePriceMax * conditionMultiplier * qualityMultiplier)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert("Lütfen isim ve telefon numarası alanlarını doldurunuz.");
      return;
    }
    
    // Trigger success confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStep(5); // Thank you page
  };

  return (
    <div className="glass-card fade-in">
      <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles size={22} style={{ color: 'var(--color-accent)' }} /> 
        Kişiselleştirilmiş Akıllı Teklif Hesaplayıcı
      </h3>

      {step <= 4 && (
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
        </div>
      )}

      {/* STEP 1: House Size */}
      {step === 1 && (
        <div className="estimator-step active">
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Dairenizin büyüklüğü nedir?</h4>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Malzeme miktarı ve işçilik süresini belirlemek için en önemli adımdır.</p>
          <div className="option-grid">
            {['1+1', '2+1', '3+1', '4+1+'].map((size) => (
              <div 
                key={size}
                className={`option-card ${houseSize === size ? 'selected' : ''}`}
                onClick={() => setHouseSize(size)}
              >
                <Home size={28} />
                <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{size}</div>
                <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', opacity: 0.7 }}>Daire Tipi</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={!houseSize}
              style={{ opacity: houseSize ? 1 : 0.5 }}
            >
              Sonraki Adım <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Wall Condition */}
      {step === 2 && (
        <div className="estimator-step active">
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Duvarlarınızın mevcut durumu nasıl?</h4>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Alçı tamiratı, zımpara ve astar ihtiyacını hesaplamak için duvar durumunuzu seçin.</p>
          <div className="option-grid">
            {[
              { id: 'iyi', label: 'Çok İyi', desc: 'Sadece renk değişimi, kırık/çatlak yok', icon: CheckCircle },
              { id: 'orta', label: 'Hafif Yıpranmış', desc: 'Ufak çatlaklar ve çivi delikleri var', icon: ClipboardList },
              { id: 'kotu', label: 'Tamirat Gerekiyor', desc: 'Derin çatlaklar, rutubet veya dökülme var', icon: Sparkles },
            ].map((cond) => {
              const IconComp = cond.icon;
              return (
                <div 
                  key={cond.id}
                  className={`option-card ${wallCondition === cond.id ? 'selected' : ''}`}
                  onClick={() => setWallCondition(cond.id)}
                >
                  <IconComp size={28} />
                  <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{cond.label}</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.3rem', opacity: 0.7 }}>{cond.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button className="btn-secondary" onClick={handleBack}>
              <ArrowLeft size={18} /> Geri
            </button>
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={!wallCondition}
              style={{ opacity: wallCondition ? 1 : 0.5 }}
            >
              Sonraki Adım <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Paint Quality & Decoy Effect */}
      {step === 3 && (
        <div className="estimator-step active">
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Hangi boya kalitesini tercih edersiniz?</h4>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Bütçe ve dayanıklılık beklentinize göre en uygun paketi seçin.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                id: 'standart',
                title: 'Ekonomik Standart',
                desc: 'Temel silinebilir su bazlı boya. Kir tutmaz, ekonomik bütçeler için uygundur.',
                features: ['Jotun veya Dyo Standart Seri', '1 Yıl İşçilik Garantisi', 'İki Kat Boya Uygulaması'],
                priceTag: 'Ekonomik Bütçe'
              },
              {
                id: 'premium',
                title: 'Kusursuz Lüks (En Çok Tercih Edilen)',
                desc: 'Antibakteriyel, tamamen silinebilir, kokusuz ipek mat boya. Çocuklu ve evcil hayvanlı evler için mükemmel.',
                features: ['Jotun Majestic veya Filli Boya Momento Max', '5 Yıl Çatlama & Soyulmama Garantisi', 'Ücretsiz Renk Kartelası Adrese Teslim', 'Eşyaların Kusursuz Muhafazası'],
                priceTag: 'Maksimum Fiyat/Performans',
                recommended: true
              },
              {
                id: 'elite',
                title: 'Elit Titanyum Koruma',
                desc: 'Leke tutmayan, hava alan ve kendi kendini temizleme özelliğine sahip ultra premium boya teknolojisi.',
                features: ['Jotun Majestic Beauty / Premium İthal Seriler', '10 Yıl Tam Garanti', 'Duvar İçi Nem ve Rutubet Koruma Kalkanı', '3D Renk Simülasyon Desteği'],
                priceTag: 'Üst Segment Yatırım'
              }
            ].map((quality) => (
              <div 
                key={quality.id}
                className={`glass-card ${paintQuality === quality.id ? 'selected' : ''}`}
                style={{ 
                  padding: '1.2rem', 
                  border: paintQuality === quality.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: quality.recommended ? 'rgba(180, 83, 9, 0.02)' : 'transparent'
                }}
                onClick={() => setPaintQuality(quality.id)}
              >
                {quality.recommended && (
                  <span style={{ 
                    position: 'absolute', 
                    top: '-12px', 
                    right: '20px', 
                    background: 'var(--color-accent)', 
                    color: 'white', 
                    fontSize: '0.75rem', 
                    fontWeight: 700, 
                    padding: '2px 10px', 
                    borderRadius: '10px' 
                  }}>
                    EN POPÜLER SEÇENEK
                  </span>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h5 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{quality.title}</h5>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600 }}>{quality.priceTag}</span>
                </div>
                <p style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', opacity: 0.8 }}>{quality.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
                  {quality.features.map((f, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.2rem', opacity: 0.9 }}>
                      <CheckCircle size={12} style={{ color: 'var(--color-success)' }} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button className="btn-secondary" onClick={handleBack}>
              <ArrowLeft size={18} /> Geri
            </button>
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={!paintQuality}
              style={{ opacity: paintQuality ? 1 : 0.5 }}
            >
              Fiyat Teklifini Gör <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Lead Form (Reciprocity & Commitment) */}
      {step === 4 && (
        <div className="estimator-step active">
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--color-accent)' }} /> 
            Teklifiniz Hazırlandı!
          </h4>
          <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Seçtiğiniz kriterlere göre tahmini bütçeniz: 
            <strong style={{ display: 'block', fontSize: '1.6rem', color: 'var(--color-accent)', margin: '0.5rem 0' }}>
              ₺{estimatedPrice?.min.toLocaleString('tr-TR')} - ₺{estimatedPrice?.max.toLocaleString('tr-TR')}
            </strong>
            <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block' }}>
              *Kdv ve tüm malzemeler dahildir. Eşyaların taşınması ve örtülmesi fiyata dahildir.
            </span>
          </p>

          <form onSubmit={handleSubmit} style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '1.5rem' }}>
            <div style={{ background: 'var(--color-accent-soft)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--color-accent)' }}>
              <strong>🎁 Reciprocity Hediyesi:</strong> Telefon numaranızı girerek teklifinizi kaydettiğinizde, eviniz için <strong>₺2.500 değerindeki Ücretsiz 3D Renk Simülasyonu</strong> ve <strong>Orijinal Kartela Seti</strong> adresinize hediye edilecektir.
            </div>

            <div className="form-group">
              <label htmlFor="name" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <User size={16} /> Adınız Soyadınız
              </label>
              <input 
                type="text" 
                id="name" 
                className="form-control"
                placeholder="Örn. Ahmet Yılmaz"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Phone size={16} /> Telefon Numaranız
              </label>
              <input 
                type="tel" 
                id="phone" 
                className="form-control"
                placeholder="Örn. 0555 123 4567"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={16} /> İlçe / Bölge
              </label>
              <input 
                type="text" 
                id="location" 
                className="form-control"
                placeholder="Örn. Kadıköy, Ataşehir"
                value={contactLocation}
                onChange={(e) => setContactLocation(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button type="button" className="btn-secondary" onClick={handleBack}>
                <ArrowLeft size={18} /> Geri
              </button>
              <button type="submit" className="btn-primary">
                Garantili Teklifi Kaydet & Yer Ayırt <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 5: Success / Thank You (Liking & Trust) */}
      {step === 5 && (
        <div className="estimator-step active" style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%', 
            background: 'var(--color-success)', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            fontSize: '2rem'
          }}>
            ✓
          </div>
          <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Tebrikler, Teklifiniz ve Hediyeleriniz Güvence Altında!</h4>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Sayın <strong style={{ color: 'var(--color-accent)' }}>{contactName}</strong>, <strong>₺2.500 değerindeki Ücretsiz 3D Renk Simülasyonu</strong> ve <strong>Fiziksel Kartela Setiniz</strong> profilinize tanımlandı. 
            Boyama koordinatörümüz 10 dakika içerisinde sizi arayarak randevunuzu teyit edecektir.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '300px', margin: '0 auto' }}>
            <a href="tel:05337766843" className="btn-primary flex-center" style={{ textDecoration: 'none' }}>
              <Phone size={18} /> Müşteri Hattını Hemen Ara
            </a>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              Acil aramalar için doğrudan hat: <strong>0533 776 68 43</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
