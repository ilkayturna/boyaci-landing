import React from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, ShieldAlert, Sparkles } from 'lucide-react';

export const RiskComparison: React.FC = () => {
  return (
    <section style={{ padding: '6rem 0', background: 'var(--color-bg-light)', borderBottom: '1px solid var(--color-border-light)' }}>
      <div className="container">
        <div className="section-header">
          <span className="tagline" style={{ margin: '0 auto 1rem auto' }}>BİLİNÇLİ SEÇİM REHBERİ</span>
          <h2>Büyük Hata Yapmaktan Kaçının: Gerçek Bir Karşılaştırma</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto' }}>
            Ev boyatmak sadece bir renk seçimi değildir; mahreminizi, eşyalarınızı ve bütçenizi birilerine emanet etmektir. Ucuz boyacılar ile yaşayabileceğiniz kabusları Turna Boya güvencesiyle sıfırlıyoruz.
          </p>
        </div>

        <div className="risk-comparison-grid">
          {/* Danger Card */}
          <div className="risk-card danger">
            <span className="risk-card-badge">SOKAK BOYACILARI (RİSK GRUBU)</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: '1px solid rgba(239, 68, 68, 0.15)', paddingBottom: '1rem' }}>
              <ShieldAlert size={28} style={{ color: '#EF4444' }} />
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#EF4444' }}>Olası Kabus Senaryoları</h3>
            </div>

            <div className="risk-item error">
              <XCircle size={18} style={{ color: '#EF4444', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>Gizli Sürpriz Maliyetler</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  "Astar çekmemiz gerekti", "Yol parası çıkmadı", "Rulo bitti" diyerek iş ortasında fiyatı iki katına çıkarırlar. İtiraz ederseniz işi yarım bırakıp giderler.
                </p>
              </div>
            </div>

            <div className="risk-item error">
              <XCircle size={18} style={{ color: '#EF4444', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>Güvenlik ve Sabıka Kaydı Belirsizliği</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  Evinize giren gündelik işçilerin kim olduğunu, sabıka kaydı durumunu bilemezsiniz. Ailenizin ve eşyalarınızın güvenliği tamamen şansa kalır.
                </p>
              </div>
            </div>

            <div className="risk-item error">
              <XCircle size={18} style={{ color: '#EF4444', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>Damlayan Boyalar ve Çizilen Eşyalar</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  Parkelere damlayan boyaları tinerle kazırlar, mobilyaları korumadan sürüklerler. Çatlakları alelacele kapatıp gittikten 3 ay sonra boya kabarmaya başlar.
                </p>
              </div>
            </div>

            <div className="risk-item error">
              <XCircle size={18} style={{ color: '#EF4444', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>Günlerce Süren Tozlu İnşaat Hali</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  "Bugün kurusun yarın geliriz" diye diye 1 günlük işi 1 haftaya yayarlar. Evinizde tozdan nefes alamazsınız, günlerce temizlik yapmak zorunda kalırsınız.
                </p>
              </div>
            </div>
          </div>

          {/* Safe Card */}
          <div className="risk-card safe" style={{ border: '2px solid var(--color-success)', boxShadow: '0 15px 35px -10px rgba(16, 185, 129, 0.15)' }}>
            <span className="risk-card-badge" style={{ background: 'var(--color-success)', color: 'white' }}>TURNA GÜVENCESİ</span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', borderBottom: '1px solid rgba(16, 185, 129, 0.15)', paddingBottom: '1rem' }}>
              <ShieldCheck size={28} style={{ color: '#10B981' }} />
              <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#10B981' }}>Kusursuz Hizmet Standartları</h3>
            </div>

            <div className="risk-item success">
              <CheckCircle2 size={18} style={{ color: '#10B981', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>Kuruşu Kuruşuna Sabit Fiyat Garantisi</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  Akıllı hesaplama ile teklif edilen bütçe neyse o ödenir. Malzeme, işçilik, yol, temizlik her şey dahildir. İş bitene kadar tek kuruş peşinat talep edilmez.
                </p>
              </div>
            </div>

            <div className="risk-item success">
              <CheckCircle2 size={18} style={{ color: '#10B981', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>Adli Sicili Temiz, Kadrolu ve Sigortalı Ekipler</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  Evinize sadece Turna bünyesinde kadrolu, sabıka kayıtları incelenmiş ve Jotun Academy teknik/etik eğitimlerinden geçmiş profesyonel ustalarımız girer.
                </p>
              </div>
            </div>

            <div className="risk-item success">
              <CheckCircle2 size={18} style={{ color: '#10B981', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>₺200.000 Allianz Eşya Sigortası & Muhafaza</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  Eşyalarınız pıt-pıt poşetlerle çift kat ambalajlanır, parkeler mavi koruyucu örtüyle kaplanır. Olası tüm hasarlar Allianz sigorta teminatı altındadır.
                </p>
              </div>
            </div>

            <div className="risk-item success">
              <CheckCircle2 size={18} style={{ color: '#10B981', minWidth: '18px', marginTop: '3px' }} />
              <div>
                <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.05rem' }}>1 Günde Teslim & Vakumlu Tozsuz Zımparalama</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.75 }}>
                  Endüstriyel vakumlu makinelerimiz sayesinde duvarlar sıfır tozla zımparalanır. Geniş ekibimiz sabah girer, akşam evinizi tertemiz boyanmış olarak teslim eder.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Persuasion text block */}
        <div style={{ marginTop: '3rem', textAlign: 'center', background: 'rgba(180, 83, 9, 0.03)', padding: '2rem', borderRadius: '16px', border: '1px dashed var(--color-accent)' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} style={{ color: 'var(--color-accent)' }} /> 
            <AlertTriangle size={18} style={{ color: 'var(--color-accent)' }} />
            Kendinize ve Evinize Saygı Gösterin
          </h4>
          <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.85 }}>
            Sadece birkaç bin TL daha ucuz diye sabıka kaydı belirsiz kişileri evinize sokup, haftalarca toz yutup, mobilyalarınızın çizilmesini riske atmayın. 
            Turna Boya ile <strong>sıfır risk</strong> alın, ödemeyi iş bittiğinde ve siz onay verdiğinizde yapın!
          </p>
        </div>
      </div>
    </section>
  );
};
