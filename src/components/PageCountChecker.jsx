// src/components/PageCountChecker.jsx
import React from 'react';
import styled from 'styled-components';
import DescriptionIcon from '@mui/icons-material/Description';
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

const PageCountDisplay = styled.div`
  font-size: 48px;
  font-weight: 640;
  color: ${props => props.$passed ? '#2C6E49' : '#C23B22'};
  text-align: center;
  margin: 20px 0;
`;

const PageCountChecker = ({ text }) => {
  const wordCount = text.split(/\s+/).filter(w => w).length;
  const pageCount = Math.ceil(wordCount / 250);
  const requiredPages = 70;
  const passed = pageCount >= 65 && pageCount <= 75;
  
  let score = 0;
  if (pageCount >= 68 && pageCount <= 72) score = 15;
  else if (pageCount >= 65 && pageCount <= 75) score = 10;
  else if (pageCount >= 60 && pageCount <= 80) score = 5;
  else score = 0;

  return (
    <GlassCard>
      <SectionTitle><DescriptionIcon /> Объём работы</SectionTitle>
      <PageCountDisplay $passed={passed}>
        {pageCount} / {requiredPages} стр.
      </PageCountDisplay>
      <div style={{ textAlign: 'center', color: '#8E8E93', fontSize: 14 }}>
        {passed ? '✅ Объём соответствует требованиям' : '❌ Рекомендуемый объём 70 страниц'}
      </div>
      <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid #E5E5EA', fontWeight: 600, color: '#1E2A5E' }}>
        Баллов: {score}/15
      </div>
    </GlassCard>
  );
};

export default PageCountChecker;