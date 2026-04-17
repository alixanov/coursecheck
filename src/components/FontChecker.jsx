// src/components/FontChecker.jsx (пример для всех компонентов)
import React from 'react';
import styled from 'styled-components';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const Card = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #DCE1E6;
  padding: 24px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  &:hover { box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04); transform: translateY(-2px); }
`;

const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #1E3A5F;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const ScoreDisplay = styled.div`
  text-align: center;
  padding: 20px 0;
`;

const ScoreNumber = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: ${props => props.$passed ? '#2C6E49' : '#C23B22'};
  font-feature-settings: 'tnum';
`;

const ScoreMax = styled.div`
  font-size: 14px;
  color: #6B7A8A;
  margin-top: 8px;
`;

const StatusText = styled.div`
  font-size: 13px;
  margin-top: 12px;
  color: ${props => props.$passed ? '#2C6E49' : '#C23B22'};
  font-weight: 500;
`;

const FontChecker = ({ text, results }) => {
  if (results) {
    return (
      <Card>
        <CardTitle><TextFieldsIcon sx={{ fontSize: 18 }} /> Шрифт и форматирование</CardTitle>
        <ScoreDisplay>
          <ScoreNumber $passed={results.passed}>{results.score}/{results.max}</ScoreNumber>
          <StatusText $passed={results.passed}>
            {results.passed ? 'Соответствует требованиям' : 'Требуется доработка'}
          </StatusText>
        </ScoreDisplay>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardTitle><TextFieldsIcon sx={{ fontSize: 18 }} /> Шрифт и форматирование</CardTitle>
      <ScoreDisplay>
        <div style={{ color: '#A0AAB5' }}>Ожидание проверки...</div>
      </ScoreDisplay>
    </Card>
  );
};

export default FontChecker;