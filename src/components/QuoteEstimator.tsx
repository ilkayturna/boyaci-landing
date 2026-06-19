import React, { useState, useEffect } from 'react';
import { Home, ClipboardList, CheckCircle, ArrowRight, ArrowLeft, Phone, User, MapPin, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PainterInfo {
  name: string;
  rating: string;
  reviews: number;
  experience: number;
  photo: string;
  specialty: string;
}

const localPainters: Record<string, PainterInfo> = {
  default: {
    name: "Kemal Usta & Ekipleri",
    rating: "4.9",
    reviews: 240,
    experience: 18,
    photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=120&auto=format&fit=crop&q=80",
    specialty: "Jotun Premium Uygulama Lideri"
  },
  anadolu: {
    name: "Mustafa Usta & Mobil Kadrosu",
    rating: "4.9",
    reviews: 185,
    experience: 14,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    specialty: "Milimetrik Kestirme Uzmanı"
  },
  avrupa: {
    name: "Orhan Usta & Turna Altın Ekibi",
    rating: "5.0",
    reviews: 312,
    experience: 20,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    specialty: "Vakumlu Tozsuz Zımpara & Hızlı Teslim Lideri"
  }
};

export const QuoteEstimator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [houseSize, setHouseSize] = useState<string>('');
  const [wallCondition, setWallCondition] = useState<string>('');
  const [paintQuality, setPaintQuality] = useState<string>('');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactLocation, setContactLocation] = useState<string>('');
  const [allocatedPainter, setAllocatedPainter] = useState<PainterInfo>(localPainters.default);
  const [estimatedPrice, setEstimatedPrice] = useState<{ min: number; max: number } | null>(null);

  const totalSteps = 5;
  const progressPercent = ((step - 1) / (totalSteps - 1)) * 100;

  // Auto-transition loader step
  useEffect(() => {
    if (step === 4) {
      // Determine painter based on location keyword
      const loc = contactLocation.toLowerCase();
      if (loc.includes('kadikoy') || loc.includes('uskudar') || loc.includes('atasehir') || loc.includes('kartal') || loc.includes('anadolu')) {
        setAllocatedPainter(localPainters.anadolu);
      } else if (loc.includes('besiktas') || loc.includes('sisli') || loc.includes('levent') || loc.includes('bakirkoy') || loc.includes('avrupa')) {
        setAllocatedPainter(localPainters.avrupa);
      } else {
        setAllocatedPainter(localPainters.default);
      }

      const timer = setTimeout(() => {
        calculatePrice();
        setStep(5);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [step, contactLocation]);

  const handleNext = () => {
    if (step === 3) {
      setStep(4); // Go to allocation loader
    } else {
      setStep(prev => Math.min(prev + 1, totalSteps + 1)); // step + 1 represents thank you page
    }
  };

  const handleBack = () => {
    if (step === 5) {
      setStep(3); // skip loader when going back
    } else {
      setStep(prev => Math.max(prev - 1, 1));
    }
  };

  const calculatePrice = () => {
    let basePriceMin = 12000;
    let basePriceMax = 18000;

    if (houseSize === '1+1') { basePriceMin = 9000; basePriceMax = 13000; }
    else if (houseSize === '2+1') { basePriceMin = 14000; basePriceMax = 20000; }
    else if (houseSize === '3+1') { basePriceMin = 19000; basePriceMax = 27000; }
    else if (houseSize === '4+1+') { basePriceMin = 26000; basePriceMax = 38000; }

    let conditionMultiplier = 1.0;
    if (wallCondition === 'orta') conditionMultiplier = 1.15;
    if (wallCondition === 'kotu') conditionMultiplier = 1.35;

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
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStep(6); // Thank you page
  };

  return (
    <div className="glass-card fade-in" style={{ scrollMarginTop: '100px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Sparkles size={22} style={{ color: 'var(--color-accent)' }} /> 
        Kişiselleştirilmiş Akıllı Teklif Hesaplayıcı
      </h3>

      {step <= 5 && (
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem', opacity: 0.8 }}>
            <span>İlerleme Durumu</span>
            <span>Adım {step} / 5</span>
          </div>
          <div className="progress-bar-container" style={{ marginBottom: 0 }}>
            <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      )}

      {/* STEP 1: House Size */}
      {step === 1 && (
        <div className="estimator-step active">
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Dairenizin büyüklüğü nedir?</h4>
          <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '1.5rem' }}>Malzeme miktarı ve işçilik süresini belirlemek için en önemli adımdır.</p>
          
          {/* Location field moved up to customize allocated painter early */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="early-location" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} /> Bulunduğunuz İlçe / Mahalle (İstanbul)
            </label>
            <input 
              type="text" 
              id="early-location" 
              className="form-control"
              placeholder="Örn. Kadıköy, Bakırköy, Beşiktaş"
              value={contactLocation}
              onChange={(e) => setContactLocation(e.target.value)}
              style={{ borderStyle: 'dashed' }}
            />
            <span style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '0.2rem', display: 'block' }}>
              *Bulunduğunuz konuma en yakın ve Google Haritalar puanı en yüksek usta ekibini eşleştirmek için gereklidir.
            </span>
          </div>

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

      {/* STEP 3: Paint Quality */}
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

      {/* STEP 4: Simulated Painter Allocation Loader (Social Proof / Commitment) */}
      {step === 4 && (
        <div className="estimator-step active allocation-loader">
          <div className="spinner"></div>
          <div>
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 800 }}>Müsait Turna Ekipleri Taranıyor...</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, maxWidth: '480px', margin: '0 auto' }}>
              Bulunduğunuz bölgeye en yakın, Google Haritalar puanı en yüksek kadrolu ustalarımızın uygunluk durumları sorgulanıyor.
            </p>
          </div>
          <div style={{ width: '100%', maxWidth: '350px', background: 'rgba(0,0,0,0.02)', padding: '0.8rem', borderRadius: '8px', fontSize: '0.8rem', opacity: 0.7 }}>
            ✓ Bölge analizi yapılıyor... <br />
            ✓ Jotun sertifikası doğrulanıyor... <br />
            ✓ Yoğunluk takvimi eşleştiriliyor...
          </div>
        </div>
      )}

      {/* STEP 5: Lead Form with Calculated Price & Painter Info (Liking & Commitment) */}
      {step === 5 && (
        <div className="estimator-step active">
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} style={{ color: 'var(--color-accent)' }} /> 
            Teklifiniz ve Ustanız Hazır!
          </h4>
          
          <div style={{ 
            background: 'var(--color-accent-soft)', 
            padding: '1.5rem', 
            borderRadius: '12px', 
            border: '1px solid var(--color-accent)',
            marginBottom: '1.5rem' 
          }}>
            <span style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', fontWeight: 800 }}>Hesaplanan Net Fiyat Aralığı</span>
            <strong style={{ display: 'block', fontSize: '2rem', color: 'var(--color-accent)', margin: '0.2rem 0' }}>
              ₺{estimatedPrice?.min.toLocaleString('tr-TR')} - ₺{estimatedPrice?.max.toLocaleString('tr-TR')}
            </strong>
            <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block', lineHeight: '1.4' }}>
              *<strong>Her şey dahil net fiyat garantisi:</strong> Malzeme, çift kat ambalajlama, vakumlu zımpara, Jotun premium boyaları ve detay temizlik fiyata dahildir. Sürpriz ek ücret çıkmaz.
            </span>
          </div>

          {/* Matched Painter Block */}
          <div style={{ 
            border: '2px solid var(--color-success)', 
            borderRadius: '12px', 
            padding: '1.2rem', 
            marginBottom: '1.5rem',
            background: 'rgba(16, 185, 129, 0.01)',
            position: 'relative'
          }}>
            <span style={{ 
              position: 'absolute', 
              top: '-10px', 
              left: '15px', 
              background: 'var(--color-success)', 
              color: 'white', 
              fontSize: '0.7rem', 
              fontWeight: 800, 
              padding: '2px 8px', 
              borderRadius: '8px'
            }}>
              BÖLGENİZE ATANAN EN YÜKSEK PUANLI USTA
            </span>

            <div className="painter-card" style={{ border: 'none', background: 'none', padding: 0, marginTop: 0 }}>
              <img src={allocatedPainter.photo} alt={allocatedPainter.name} className="painter-avatar" />
              <div>
                <h5 style={{ margin: '0 0 0.3rem 0', fontSize: '1.1rem', fontWeight: 800 }}>{allocatedPainter.name}</h5>
                <span style={{ fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                  {allocatedPainter.specialty}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', color: 'var(--color-accent-light)' }}>
                    <Star size={14} style={{ fill: 'var(--color-accent-light)' }} />
                    <span style={{ fontWeight: 800 }}>{allocatedPainter.rating}</span>
                  </div>
                  <span style={{ opacity: 0.7 }}>({allocatedPainter.reviews}+ Ev Teslimi)</span>
                  <span style={{ opacity: 0.7 }}>•</span>
                  <span style={{ opacity: 0.7 }}>{allocatedPainter.experience} Yıl Deneyim</span>
                </div>
              </div>
            </div>
            
            <p style={{ margin: '0.8rem 0 0 0', fontSize: '0.8rem', opacity: 0.8, borderTop: '1px dashed rgba(16, 185, 129, 0.2)', paddingTop: '0.8rem' }}>
              ⚠️ <strong>Yoğun Kontenjan Uyarısı:</strong> Bulunduğunuz ilçede {allocatedPainter.name} ekibinin bu hafta için sadece <strong>1 adet</strong> boş randevu kontenjanı kalmıştır. Bu ekibi ve ₺2.500 değerindeki kampanya haklarınızı kaybetmemek için lütfen formu eksiksiz doldurun.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
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
                <MapPin size={16} /> İlçe / Mahalle
              </label>
              <input 
                type="text" 
                id="location" 
                className="form-control"
                placeholder="Örn. Kadıköy, Bakırköy"
                value={contactLocation}
                onChange={(e) => setContactLocation(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
              <button type="button" className="btn-secondary" onClick={handleBack}>
                <ArrowLeft size={18} /> Geri
              </button>
              <button type="submit" className="btn-primary" style={{ backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)', color: 'white' }}>
                {allocatedPainter.name.split(' ')[0]}'i ve Fiyatı Rezerve Et <ArrowRight size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 6: Success / Thank You (Liking & Trust) */}
      {step === 6 && (
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
          <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Tebrikler, Kemal Usta ve Hediyeleriniz Rezerve Edildi!</h4>
          <p style={{ opacity: 0.9, fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
            Sayın <strong style={{ color: 'var(--color-accent)' }}>{contactName}</strong>, seçtiğiniz tarihte <strong>{allocatedPainter.name}</strong> ekibi adınıza geçici olarak bloke edilmiştir. 
            Ayrıca <strong>₺2.500 değerindeki Ücretsiz 3D Mimar Raporu</strong> ve <strong>Fiziksel Kartela Setiniz</strong> adresinize gönderilmek üzere onaylanmıştır. 
            Boyama koordinatörümüz 10 dakika içerisinde sizi arayarak teyit işlemini tamamlayacaktır.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '300px', margin: '0 auto' }}>
            <a href="tel:05343435603" className="btn-primary flex-center" style={{ textDecoration: 'none' }}>
              <Phone size={18} /> Koordinatörü Hemen Ara
            </a>
            <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              Doğrudan ve Hızlı Onay Hattı: <strong>0 534 343 56 03</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

