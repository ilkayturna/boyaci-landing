import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Clock, CheckCircle2, Paintbrush } from 'lucide-react';

interface NotificationItem {
  id: number;
  time: string;
  message: string;
  icon: 'clock' | 'spark' | 'check' | 'paint';
}

const mockNotifications: NotificationItem[] = [
  {
    id: 1,
    time: '1 dakika önce',
    message: 'Şişli\'den Merve Y. 3+1 dairesini Jotun Sakin Kum rengi ile boyatmak için randevu aldı.',
    icon: 'check'
  },
  {
    id: 2,
    time: '3 dakika önce',
    message: 'Kadıköy\'den Ahmet K. akıllı fiyat hesaplaması yaparak ₺2.500 hediye paketini kilitledi.',
    icon: 'spark'
  },
  {
    id: 3,
    time: 'Az önce',
    message: 'Beşiktaş\'tan Kemal Usta ve ekibi yarın sabahki proje için onaylandı.',
    icon: 'paint'
  },
  {
    id: 4,
    time: '5 dakika önce',
    message: 'Bakırköy\'den Selin B. \'Kusursuz Lüks\' paketi için yer ayırttı.',
    icon: 'check'
  },
  {
    id: 5,
    time: 'Şu anda',
    message: 'Turna Mobil Ekibi Ataşehir bölgesindeki 3. projesini tamamladı ve teslim etti.',
    icon: 'paint'
  },
  {
    id: 6,
    time: '2 dakika önce',
    message: 'Ataşehir\'den Burak D. evinin 3D Mimar simülasyonu için onay verdi.',
    icon: 'spark'
  },
  {
    id: 7,
    time: '4 dakika önce',
    message: 'Üsküdar\'dan Fatma G. sıfır peşinat modeliyle salon boyama kaydı oluşturdu.',
    icon: 'clock'
  }
];

export const LiveNotifications: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState<NotificationItem | null>(null);
  const indexRef = useRef<number>(0);

  useEffect(() => {
    // Show first notification after 4 seconds
    const startTimeout = setTimeout(() => {
      showNextNotification();
    }, 4000);

    return () => clearTimeout(startTimeout);
  }, []);

  const showNextNotification = () => {
    const nextIndex = indexRef.current >= mockNotifications.length - 1 ? 0 : indexRef.current + 1;
    indexRef.current = nextIndex;
    setCurrentNotification(mockNotifications[nextIndex]);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setCurrentNotification(null);
    }, 5000);

    // Schedule next notification in 12 seconds (5s showing + 7s pause)
    setTimeout(() => {
      showNextNotification();
    }, 12000);
  };

  if (!currentNotification) return null;

  const renderIcon = () => {
    switch (currentNotification.icon) {
      case 'check':
        return <CheckCircle2 size={18} style={{ color: '#10B981' }} />;
      case 'spark':
        return <Sparkles size={18} style={{ color: '#F59E0B' }} />;
      case 'paint':
        return <Paintbrush size={18} style={{ color: 'var(--color-accent)' }} />;
      case 'clock':
      default:
        return <Clock size={18} style={{ color: '#3B82F6' }} />;
    }
  };

  return (
    <div className="toast-container">
      <div className="notification-toast">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            {renderIcon()}
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.6 }}>
              {currentNotification.time}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.4, fontWeight: 500, color: 'inherit', opacity: 0.9 }}>
            {currentNotification.message}
          </p>
        </div>
      </div>
    </div>
  );
};
