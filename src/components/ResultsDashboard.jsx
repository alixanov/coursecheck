// src/components/ResultsDashboard.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const GlassCard = styled.div`
  background: #1E3A5F;
  border-radius: 16px;
  margin-bottom: 24px;
  padding: 28px 32px;
  color: white;
  animation: ${fadeIn} 0.4s ease-out;
  box-shadow: 0 4px 16px rgba(30, 58, 95, 0.15);
`;

const ScoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const ScoreItem = styled.div`
  text-align: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: transform 0.2s ease;
  &:hover { transform: translateY(-2px); background: rgba(255, 255, 255, 0.12); }
`;

const ScoreValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const ScoreLabel = styled.div`
  font-size: 11px;
  opacity: 0.7;
  margin-top: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProgressBar = styled.div`
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 24px;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$width}%;
  background: ${props => props.$color || '#C4A43A'};
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1);
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px;
  background: ${props => props.$color};
  border-radius: 40px;
  font-size: 14px;
  font-weight: 600;
`;

const getStatusConfig = (status) => {
  const configs = {
    excellent: { color: '#2C6E49', text: 'Excellent', icon: <CheckCircleIcon sx={{ fontSize: 18 }} />, grade: 'A' },
    good: { color: '#3A6B4B', text: 'Good', icon: <CheckCircleIcon sx={{ fontSize: 18 }} />, grade: 'B' },
    satisfactory: { color: '#C4A43A', text: 'Satisfactory', icon: <WarningIcon sx={{ fontSize: 18 }} />, grade: 'C' },
    poor: { color: '#C23B22', text: 'Requires Revision', icon: <ErrorIcon sx={{ fontSize: 18 }} />, grade: 'D' }
  };
  return configs[status] || configs.poor;
};

const ResultsDashboard = ({ results }) => {
  const totalScore = results?.totalScore || 0;
  const status = results?.status || 'poor';
  const statusConfig = getStatusConfig(status);
  
  return (
    <GlassCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <DashboardIcon />
        <div>
          <div style={{ fontSize: 14, opacity: 0.7, letterSpacing: 0.5 }}>VKR Audit — FINAL SCORE</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{totalScore}%</div>
        </div>
      </div>
      
      <ProgressBar>
        <ProgressFill $width={totalScore} $color={statusConfig.color} />
      </ProgressBar>
      
      <ScoreGrid>
        <ScoreItem><ScoreValue>{results?.fontScore || 0}/30</ScoreValue><ScoreLabel>Font</ScoreLabel></ScoreItem>
        <ScoreItem><ScoreValue>{results?.pagesScore || 0}/15</ScoreValue><ScoreLabel>Volume</ScoreLabel></ScoreItem>
        <ScoreItem><ScoreValue>{results?.structureScore || 0}/50</ScoreValue><ScoreLabel>Structure</ScoreLabel></ScoreItem>
        <ScoreItem><ScoreValue>{results?.referencesScore || 0}/35</ScoreValue><ScoreLabel>References</ScoreLabel></ScoreItem>
        <ScoreItem><ScoreValue>{results?.appendixScore || 0}/20</ScoreValue><ScoreLabel>Appendices</ScoreLabel></ScoreItem>
        <ScoreItem><ScoreValue>{results?.plagiarismScore || 0}/30</ScoreValue><ScoreLabel>Uniqueness</ScoreLabel></ScoreItem>
      </ScoreGrid>
      
      <StatusRow>
        <div style={{ fontSize: 13, opacity: 0.8 }}>Work Status</div>
        <StatusBadge $color={statusConfig.color}>
          {statusConfig.icon}
          {statusConfig.text}
        </StatusBadge>
      </StatusRow>
    </GlassCard>
  );
};

export default ResultsDashboard;