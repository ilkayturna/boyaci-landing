import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface ExitIntentModalProps {
  onActionClick: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ onActionClick }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasShown, setHasShown] = useState<boolean>(false);

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
          <span>Ayrılmadan Önce Teklifinizi Alın</span>
        </div>

        <p style={{ fontSize: '1rem', opacity: 0.9, margin: '1rem 0' }}>
          30 saniyenizi ayırıp akıllı hesaplayıcıyı doldurursanız, dairenize özel net fiyat aralığını hemen görebilirsiniz.
        </p>

        {/* Benefits list */}
        <div style={{
          background: 'rgba(180, 83, 9, 0.03)',
          border: '1px solid rgba(180, 83, 9, 0.15)',
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
            <span>Sıfır Peşinat, Ödeme İş Bitince</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <CheckCircle2 size={16} style={{ color: '#10B981' }} />
            <span>Sabit Fiyat, Ek Ücret Yok</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', fontWeight: 600 }}>
            <CheckCircle2 size={16} style={{ color: '#10B981' }} />
            <span>Vakumlu Tozsuz Uygulama</span>
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
              padding: '1rem'
            }}
          >
            Ücretsiz Fiyat Teklifi Al
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
            Şimdi değil
          </button>
        </div>
      </div>
    </div>
  );
};
