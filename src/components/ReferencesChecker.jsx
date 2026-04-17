// src/components/ReferencesChecker.jsx
import React from 'react';
import styled from 'styled-components';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const GlassCard = styled.div`
  background: rgba(255,255,255,0.96);
  border-radius: 28px;
  border: 0.5px solid rgba(30,42,94,0.08);
  margin-bottom: 20px;
  padding: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 590;
  color: #1E2A5E;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E5EA;
`;

const ReferencesChecker = ({ text }) => {
  const lowerText = text.toLowerCase();
  
  // Проверка наличия списка литературы
  const hasBibliography = lowerText.includes('список литературы') || lowerText.includes('библиография');
  
  // Подсчёт количества источников
  let sourcesCount = 0;
  if (hasBibliography) {
    const bibliographyMatch = text.match(/(список литературы|библиография)[\s\S]*?(?=глава|приложение|$)/i);
    if (bibliographyMatch) {
      sourcesCount = (bibliographyMatch[0].match(/\d{4}/g) || []).length;
    }
  }
  
  // Проверка ссылок в тексте
  const hasInlineReferences = /\[\d+\]|\([А-Яа-я]+\s\d{4}\)/.test(text);
  
  // Проверка формата по ГОСТ (простая эмуляция)
  const hasGOSTFormat = /\.\s*[А-Яа-я]\.\s*[А-Яа-я]\./.test(text) || /[А-Я][а-я]+\.[\s]*[А-Я][а-я]+\.[\s]*[А-Я][а-я]+/.test(text);
  
  // Подсчёт баллов
  let score = 0;
  if (hasBibliography) score += 10;
  if (hasInlineReferences) score += 10;
  if (sourcesCount >= 20) score += 10;
  else if (sourcesCount >= 15) score += 7;
  else if (sourcesCount >= 10) score += 5;
  else if (sourcesCount >= 5) score += 3;
  
  if (hasGOSTFormat) score += 5;

  const items = [
    { name: 'Наличие списка литературы', passed: hasBibliography },
    { name: 'Наличие ссылок в тексте', passed: hasInlineReferences },
    { name: `Количество источников (${sourcesCount}/20)`, passed: sourcesCount >= 20 },
    { name: 'Оформление по ГОСТ', passed: hasGOSTFormat }
  ];

  return (
    <GlassCard>
      <SectionTitle><LibraryBooksIcon /> Список литературы и ссылки</SectionTitle>
      {items.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid #F0F0F2' }}>
          <span style={{ fontSize: 14 }}>{item.name}</span>
          {item.passed ? <CheckCircleIcon sx={{ fontSize: 18, color: '#2C6E49' }} /> : <CancelIcon sx={{ fontSize: 18, color: '#C23B22' }} />}
        </div>
      ))}
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #E5E5EA', fontWeight: 600, color: '#1E2A5E' }}>
        Баллов: {score}/35
      </div>
    </GlassCard>
  );
};

export default ReferencesChecker;