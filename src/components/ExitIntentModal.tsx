import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface ExitIntentModalProps {
  onActionClick: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onActionClick }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasShown, setHasShown] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse left the top of the viewport (indicating closing tab/window)
      if (e.clientY < 20 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  // Countdown timer logic
  useEffect(() => {
    if (!isVisible || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, timeLeft]);

  // If time runs out, auto-dismiss
  useEffect(() => {
    if (timeLeft === 0) {
      setIsVisible(false);
    }
  }, [timeLeft]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAction = () => {
    setIsVisible(false);
    onActionClick();
  };

  if (!isVisible) return null;

  return (
    <div className="exit-intent-overlay">
      <div className="exit-intent-modal">
        <button 
          onClick={handleClose} 
          style={{ 
            position: 'absolute', 
            top: '1.5rem', 
            right: '1.5rem', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            opacity: 0.6,
            color: 'inherit'
          }}
          title="Kapat"
        >
          <X size={24} />
        </button>

        <div className="exit-warning-header">
          <ShieldAlert size={32} />
          <span>Kazanılmış Haklarınızı Kaybetmeyin!</span>
        </div>

        <p style={{ fontSize: '1rem', opacity: 0.9, margin: '1rem 0' }}>
          Sayfadan ayrılmak üzeresiniz. Eğer şimdi ayrılırsanız, adınıza tanımlanan tüm ücretsiz kampanyalar ve fiyat sabitleme hakkınız <strong>iptal edilecektir.</strong>
        </p>

        {/* Dynamic Countdown Circle */}
        <div className="exit-timer-circle">
          {timeLeft}
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', marginTop: '-0.8rem', marginBottom: '1.5rem' }}>
          Süre dolmadan teklifinizi kilitleyin!
        </div>

        {/* Benefits list */}
        <div style={{ 
          background: 'rgba(220, 38, 38, 0.03)', 
          border: '1px solid rgba(220, 38, 38, 0.15)', 
          borderRadius: '12px', 
          padding: '1.2rem', 
          marginBottom: '2rem',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <CheckCircle2 size={16} style={{ color: '#10B981' }} />
            <span>₺2.500 Değerinde Ücretsiz 3D Mimar Renk Seçim Raporu</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <CheckCircle2 size={16} style={{ color: '#10B981' }} />
            <span>Orijinal Fiziksel Jotun Kartela Seti (Adresinize Ücretsiz Kargo)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <CheckCircle2 size={16} style={{ color: '#10B981' }} />
            <span>Haziran Sonuna Kadar %100 Sabit Fiyat ve %0 Peşinat Garantisi</span>
          </div>
        </div>

        {/* Call to Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <button 
            onClick={handleAction} 
            className="btn-primary" 
            style={{ 
              width: '100%', 
              justifyContent: 'center', 
              fontSize: '1.1rem', 
              padding: '1rem',
              backgroundColor: '#DC2626',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}
          >
            Haklarımı Koru & Ücretsiz Teklif Al
          </button>
          
          <button 
            onClick={handleClose} 
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '0.85rem', 
              opacity: 0.5, 
              cursor: 'pointer',
              textDecoration: 'underline',
              color: 'inherit'
            }}
          >
            Hayır, ₺2.500 değerindeki haklarımdan vazgeçiyorum.
          </button>
        </div>
      </div>
    </div>
  );
};
