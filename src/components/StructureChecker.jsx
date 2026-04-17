// src/components/StructureChecker.jsx
import React from 'react';
import styled from 'styled-components';
import MenuBookIcon from '@mui/icons-material/MenuBook';
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

const SubSection = styled.div`
  margin-left: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 12px;
  border-left: 2px solid #E5E5EA;
`;

const StructureChecker = ({ text }) => {
  const lowerText = text.toLowerCase();
  
  // Проверка основных разделов
  const hasIntroduction = lowerText.includes('введение');
  const hasChapter1 = lowerText.includes('глава 1') || lowerText.includes('глава1');
  const hasChapter2 = lowerText.includes('глава 2') || lowerText.includes('глава2');
  const hasChapter3 = lowerText.includes('глава 3') || lowerText.includes('глава3');
  const hasConclusion = lowerText.includes('заключение');
  const hasBibliography = lowerText.includes('список литературы') || lowerText.includes('библиография');
  const hasAppendix = lowerText.includes('приложение') || lowerText.includes('приложения');
  
  // Проверка подразделов
  const hasSection11 = lowerText.includes('1.1') || lowerText.includes('1.1.');
  const hasSection12 = lowerText.includes('1.2') || lowerText.includes('1.2.');
  const hasSection13 = lowerText.includes('1.3') || lowerText.includes('1.3.');
  const hasSection14 = lowerText.includes('1.4') || lowerText.includes('1.4.');
  
  const hasSection21 = lowerText.includes('2.1') || lowerText.includes('2.1.');
  const hasSection22 = lowerText.includes('2.2') || lowerText.includes('2.2.');
  const hasSection23 = lowerText.includes('2.3') || lowerText.includes('2.3.');
  const hasSection24 = lowerText.includes('2.4') || lowerText.includes('2.4.');
  const hasSection25 = lowerText.includes('2.5') || lowerText.includes('2.5.');
  
  const hasSection31 = lowerText.includes('3.1') || lowerText.includes('3.1.');
  const hasSection32 = lowerText.includes('3.2') || lowerText.includes('3.2.');
  const hasSection33 = lowerText.includes('3.3') || lowerText.includes('3.3.');
  const hasSection34 = lowerText.includes('3.4') || lowerText.includes('3.4.');
  const hasSection35 = lowerText.includes('3.5') || lowerText.includes('3.5.');
  
  // Подсчёт баллов
  let score = 0;
  
  // Введение (5 баллов)
  if (hasIntroduction) score += 5;
  
  // Главы (5 баллов каждая)
  if (hasChapter1) score += 5;
  if (hasChapter2) score += 5;
  if (hasChapter3) score += 5;
  
  // Подразделы главы 1 (1 балл каждый)
  if (hasSection11) score += 1;
  if (hasSection12) score += 1;
  if (hasSection13) score += 1;
  if (hasSection14) score += 1;
  
  // Подразделы главы 2 (1 балл каждый)
  if (hasSection21) score += 1;
  if (hasSection22) score += 1;
  if (hasSection23) score += 1;
  if (hasSection24) score += 1;
  if (hasSection25) score += 1;
  
  // Подразделы главы 3 (1 балл каждый)
  if (hasSection31) score += 1;
  if (hasSection32) score += 1;
  if (hasSection33) score += 1;
  if (hasSection34) score += 1;
  if (hasSection35) score += 1;
  
  // Заключение (5 баллов)
  if (hasConclusion) score += 5;
  
  // Список литературы (5 баллов)
  if (hasBibliography) score += 5;
  
  // Приложения (3 балла)
  if (hasAppendix) score += 3;

  const mainSections = [
    { name: 'Введение', passed: hasIntroduction },
    { name: 'Глава 1', passed: hasChapter1 },
    { name: 'Глава 2', passed: hasChapter2 },
    { name: 'Глава 3', passed: hasChapter3 },
    { name: 'Заключение', passed: hasConclusion },
    { name: 'Список литературы', passed: hasBibliography },
    { name: 'Приложения', passed: hasAppendix }
  ];

  const subsectionsChapter1 = [
    { name: '1.1 Анализ требований', passed: hasSection11 },
    { name: '1.2 Анализ существующих решений', passed: hasSection12 },
    { name: '1.3 Формализация требований', passed: hasSection13 },
    { name: '1.4 Постановка задачи', passed: hasSection14 }
  ];

  const subsectionsChapter2 = [
    { name: '2.1 Выбор технологий', passed: hasSection21 },
    { name: '2.2 Архитектура системы', passed: hasSection22 },
    { name: '2.3 Алгоритмы оценки', passed: hasSection23 },
    { name: '2.4 Интерфейс', passed: hasSection24 },
    { name: '2.5 База данных', passed: hasSection25 }
  ];

  const subsectionsChapter3 = [
    { name: '3.1 Реализация модулей', passed: hasSection31 },
    { name: '3.2 Интеграция компонентов', passed: hasSection32 },
    { name: '3.3 Тестирование', passed: hasSection33 },
    { name: '3.4 Анализ результатов', passed: hasSection34 },
    { name: '3.5 Оценка эффективности', passed: hasSection35 }
  ];

  return (
    <GlassCard>
      <SectionTitle><MenuBookIcon /> Структура документа</SectionTitle>
      
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 8, color: '#1E2A5E' }}>Основные разделы</div>
        {mainSections.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
            <span style={{ fontSize: 14 }}>{item.name}</span>
            {item.passed ? <CheckCircleIcon sx={{ fontSize: 18, color: '#2C6E49' }} /> : <CancelIcon sx={{ fontSize: 18, color: '#C23B22' }} />}
          </div>
        ))}
      </div>
      
      <SubSection>
        <div style={{ fontWeight: 600, marginBottom: 8, color: '#1E2A5E' }}>Глава 1 (подразделы)</div>
        {subsectionsChapter1.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ fontSize: 13, color: '#3A3A3C' }}>{item.name}</span>
            {item.passed ? <CheckCircleIcon sx={{ fontSize: 16, color: '#2C6E49' }} /> : <CancelIcon sx={{ fontSize: 16, color: '#C23B22' }} />}
          </div>
        ))}
      </SubSection>
      
      <SubSection>
        <div style={{ fontWeight: 600, marginBottom: 8, color: '#1E2A5E' }}>Глава 2 (подразделы)</div>
        {subsectionsChapter2.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ fontSize: 13, color: '#3A3A3C' }}>{item.name}</span>
            {item.passed ? <CheckCircleIcon sx={{ fontSize: 16, color: '#2C6E49' }} /> : <CancelIcon sx={{ fontSize: 16, color: '#C23B22' }} />}
          </div>
        ))}
      </SubSection>
      
      <SubSection>
        <div style={{ fontWeight: 600, marginBottom: 8, color: '#1E2A5E' }}>Глава 3 (подразделы)</div>
        {subsectionsChapter3.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
            <span style={{ fontSize: 13, color: '#3A3A3C' }}>{item.name}</span>
            {item.passed ? <CheckCircleIcon sx={{ fontSize: 16, color: '#2C6E49' }} /> : <CancelIcon sx={{ fontSize: 16, color: '#C23B22' }} />}
          </div>
        ))}
      </SubSection>
      
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #E5E5EA', fontWeight: 600, color: '#1E2A5E' }}>
        Баллов: {score}/50
      </div>
    </GlassCard>
  );
};

export default StructureChecker;