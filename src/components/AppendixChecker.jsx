// src/components/AppendixChecker.jsx
import React from 'react';
import styled from 'styled-components';
import AttachFileIcon from '@mui/icons-material/AttachFile';
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

const AppendixChecker = ({ text }) => {
  const lowerText = text.toLowerCase();
  
  const hasAppendix = lowerText.includes('приложение') || lowerText.includes('приложения');
  
  // Подсчёт количества приложений
  let appendixCount = 0;
  if (hasAppendix) {
    const appendixMatches = text.match(/приложение\s+[А-ЯA-Z]/gi);
    appendixCount = appendixMatches ? appendixMatches.length : 0;
  }
  
  let score = 0;
  if (hasAppendix) score += 10;
  if (appendixCount >= 3) score += 10;
  else if (appendixCount >= 1) score += 5;

  return (
    <GlassCard>
      <SectionTitle><AttachFileIcon /> Приложения</SectionTitle>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
        <span style={{ fontSize: 14 }}>Наличие приложений</span>
        {hasAppendix ? <CheckCircleIcon sx={{ fontSize: 18, color: '#2C6E49' }} /> : <CancelIcon sx={{ fontSize: 18, color: '#C23B22' }} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '0.5px solid #F0F0F2' }}>
        <span style={{ fontSize: 14 }}>Количество ({appendixCount}/3)</span>
        {appendixCount >= 3 ? <CheckCircleIcon sx={{ fontSize: 18, color: '#2C6E49' }} /> : <CancelIcon sx={{ fontSize: 18, color: '#C23B22' }} />}
      </div>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #E5E5EA', fontWeight: 600, color: '#1E2A5E' }}>
        Баллов: {score}/20
      </div>
    </GlassCard>
  );
};

export default AppendixChecker;