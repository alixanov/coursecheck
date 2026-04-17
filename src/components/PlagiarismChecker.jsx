// src/components/PlagiarismChecker.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

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

const ProgressBar = styled.div`
  height: 8px;
  background: #E5E5EA;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$width}%;
  background: ${props => props.$color};
  transition: width 0.6s ease;
`;

const ScoreLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  color: ${props => props.$color};
`;

const PlagiarismChecker = ({ text }) => {
  const [plagiarismScore, setPlagiarismScore] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (text) {
      setIsChecking(true);
      // Эмуляция проверки плагиата
      setTimeout(() => {
        // Простая эмуляция: ищем повторяющиеся фразы
        const words = text.split(/\s+/);
        const uniqueWords = new Set(words);
        const uniquenessRatio = (uniqueWords.size / words.length) * 100;
        const score = Math.min(100, Math.max(0, Math.floor(uniquenessRatio)));
        setPlagiarismScore(score);
        setIsChecking(false);
      }, 1500);
    }
  }, [text]);

  const getScoreColor = (score) => {
    if (score >= 80) return '#2C6E49';
    if (score >= 60) return '#C47E2E';
    return '#C23B22';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Низкий риск плагиата';
    if (score >= 60) return 'Средний риск плагиата';
    return 'Высокий риск плагиата';
  };

  let scoreValue = 0;
  if (plagiarismScore !== null) {
    if (plagiarismScore >= 80) scoreValue = 30;
    else if (plagiarismScore >= 60) scoreValue = 20;
    else if (plagiarismScore >= 40) scoreValue = 10;
    else scoreValue = 0;
  }

  return (
    <GlassCard>
      <SectionTitle><ContentPasteSearchIcon /> Проверка на плагиат</SectionTitle>
      {isChecking ? (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ width: 48, height: 48, border: '3px solid #E5E5EA', borderTopColor: '#1E2A5E', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#8E8E93' }}>Анализ уникальности текста...</p>
        </div>
      ) : plagiarismScore !== null ? (
        <>
          <ProgressBar>
            <ProgressFill $width={plagiarismScore} $color={getScoreColor(plagiarismScore)} />
          </ProgressBar>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 640, color: getScoreColor(plagiarismScore) }}>
                {plagiarismScore}%
              </div>
              <ScoreLabel $color={getScoreColor(plagiarismScore)}>{getScoreText(plagiarismScore)}</ScoreLabel>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 24, fontWeight: 640, color: '#1E2A5E' }}>{scoreValue}/30</div>
              <div style={{ fontSize: 12, color: '#8E8E93' }}>баллов</div>
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0', color: '#8E8E93' }}>
          Ожидание загрузки текста...
        </div>
      )}
    </GlassCard>
  );
};

export default PlagiarismChecker;