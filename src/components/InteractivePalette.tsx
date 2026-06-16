import React, { useState } from 'react';
import { Sparkles, Check } from 'lucide-react';

interface ColorOption {
  id: string;
  name: string;
  code: string;
  psychology: string;
  mood: string;
}

const colorsList: ColorOption[] = [
  {
    id: 'sakin-kum',
    name: 'Mermer Safir & Sakin Kum',
    code: '#EADFD2',
    psychology: 'Huzur, Ferahlık & Dengeli Zihin',
    mood: 'Oturma odası ve salonlar için stres azaltıcı zemin yaratır.'
  },
  {
    id: 'sisli-orman',
    name: 'Sisli Zeytin',
    code: '#8F9779',
    psychology: 'Doğal Odaklanma, Canlılık & Dinginlik',
    mood: 'Yatak odası ve çalışma alanları için konsantrasyon destekleyici.'
  },
  {
    id: 'kozmik-gri',
    name: 'Kozmik Bulut',
    code: '#D2D7DF',
    psychology: 'Minimalizm, Kararlılık & Modern Güven',
    mood: 'Modern banyo ve antreler için sofistike, genişletici etki.'
  },
  {
    id: 'antik-kil',
    name: 'Sıcak Kil Terakota',
    code: '#D19C7F',
    psychology: 'Sıcaklık, Yaratıcılık & İştah Açıcı Enerji',
    mood: 'Mutfak ve yemek odalarında sıcak, samimi sohbet ortamı sağlar.'
  },
  {
    id: 'kraliyet-mavi',
    name: 'Okyanus Derinliği',
    code: '#2B3E50',
    psychology: 'Prestij, Karizma & Sonsuz Derinlik',
    mood: 'Tek duvar (accent wall) uygulamalarında TV arkası için idealdir.'
  }
];

export const InteractivePalette: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(colorsList[0]);

  return (
    <div className="glass-card fade-in">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <div className="maps-badge" style={{ marginBottom: '1rem' }}>
            <Sparkles size={12} /> Renk Psikolojisi Keşfi
          </div>
          <h4 style={{ fontSize: '1.4rem', marginBottom: '0.8rem' }}>Eviniz Hangi Duyguyu Yansıtmalı?</h4>
          <p style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Renklerin insan psikolojisi üzerindeki etkileri kanıtlanmıştır. Doğru renk seçimi, evdeki yaşam kalitenizi doğrudan artırır.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {colorsList.map((color) => (
              <div 
                key={color.id}
                onClick={() => setSelectedColor(color)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '0.8rem', 
                  borderRadius: '12px',
                  border: selectedColor.id === color.id ? '2px solid var(--color-accent)' : '1px solid var(--color-border-light)',
                  cursor: 'pointer',
                  backgroundColor: selectedColor.id === color.id ? 'rgba(180, 83, 9, 0.02)' : 'transparent',
                  transition: 'var(--transition-fast)'
                }}
              >
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  backgroundColor: color.code,
                  border: '2px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {selectedColor.id === color.id && <Check size={18} style={{ color: color.id === 'sakin-kum' || color.id === 'kozmik-gri' ? '#000' : '#FFF' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{color.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '0.1rem' }}>
                    {color.psychology}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Living Room SVG Mockup */}
        <div style={{ 
          background: 'var(--color-border-light)', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          position: 'relative', 
          aspectRatio: '4/3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid var(--color-border-light)'
        }}>
          {/* Back wall (Dynamic Color) */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '65%', 
            backgroundColor: selectedColor.code,
            transition: 'background-color 0.6s ease'
          }}>
            {/* Elegant wall framing details */}
            <div style={{ 
              position: 'absolute', 
              top: '20px', 
              left: '20px', 
              right: '20px', 
              bottom: '20px', 
              border: '1px solid rgba(255,255,255,0.2)',
              pointerEvents: 'none'
            }}></div>
            <div style={{ 
              position: 'absolute', 
              top: '30%', 
              left: '10%', 
              width: '120px', 
              height: '80px', 
              background: 'rgba(255,255,255,0.15)', 
              border: '4px solid white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '0.6rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Sanat Eseri
            </div>
          </div>

          {/* Floor */}
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            width: '100%', 
            height: '35%', 
            backgroundColor: '#D6C5B3', /* Oak wood color */
            backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.02) 50%)',
            backgroundSize: '30px 100%'
          }}></div>

          {/* Sofa (Minimalist SVG-like representation using absolute div styling) */}
          <div style={{ 
            position: 'absolute', 
            bottom: '10%', 
            left: '25%', 
            width: '50%', 
            height: '25%', 
            backgroundColor: '#1E293B', /* Dark charcoal modern sofa */
            borderRadius: '8px 8px 0 0',
            boxShadow: '0 8px 15px rgba(0,0,0,0.15)'
          }}>
            {/* Sofa Cushions */}
            <div style={{ display: 'flex', height: '80%' }}>
              <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)', margin: '4px', borderRadius: '4px', backgroundColor: '#334155' }}></div>
              <div style={{ flex: 1, margin: '4px', borderRadius: '4px', backgroundColor: '#334155' }}></div>
            </div>
            {/* Sofa Legs */}
            <div style={{ position: 'absolute', bottom: '-8px', left: '10%', width: '6px', height: '8px', backgroundColor: '#582F0E' }}></div>
            <div style={{ position: 'absolute', bottom: '-8px', right: '10%', width: '6px', height: '8px', backgroundColor: '#582F0E' }}></div>
          </div>

          {/* Plant Lamp */}
          <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: '20px', height: '100px' }}>
            <div style={{ width: '2px', height: '80px', backgroundColor: '#475569', margin: '0 auto' }}></div>
            <div style={{ width: '24px', height: '16px', backgroundColor: '#F59E0B', borderRadius: '12px 12px 0 0', boxShadow: '0 0 10px #F59E0B' }}></div>
          </div>

          <div style={{ 
            position: 'absolute', 
            bottom: '10px', 
            right: '15px', 
            backgroundColor: 'rgba(15,23,42,0.85)', 
            color: 'white', 
            padding: '4px 10px', 
            borderRadius: '4px', 
            fontSize: '0.7rem', 
            fontWeight: 600 
          }}>
            Etki: {selectedColor.mood}
          </div>
        </div>
      </div>
    </div>
  );
};
