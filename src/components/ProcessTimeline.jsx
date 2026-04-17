// src/components/ProcessTimeline.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import TimerIcon from '@mui/icons-material/Timer';
import DescriptionIcon from '@mui/icons-material/Description';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

const GlassCard = styled.div`
  background: #FFFFFF;
  border-radius: 16px;
  border: 1px solid #DCE1E6;
  margin-bottom: 24px;
  padding: 28px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1E3A5F;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StepRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px 20px;
  background: ${props => props.$active ? '#F5F7FA' : 'transparent'};
  border-radius: 12px;
  transition: all 0.2s ease;
`;

const StepIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${props => {
    if (props.$status === 'completed') return '#1E3A5F';
    if (props.$status === 'running') return '#C4A43A';
    return '#E8ECEF';
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepName = styled.div`
  font-weight: 600;
  color: ${props => props.$active ? '#1E3A5F' : '#6B7A8A'};
  font-size: 14px;
  letter-spacing: 0.2px;
`;

const StepStatus = styled.div`
  font-size: 12px;
  color: ${props => {
    if (props.$status === 'completed') return '#2C6E49';
    if (props.$status === 'running') return '#C4A43A';
    return '#A0AAB5';
  }};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`;

const StepScore = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1E3A5F;
  min-width: 70px;
  text-align: right;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const ProgressSection = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #E8ECEF;
`;

const ProgressBar = styled.div`
  height: 4px;
  background: #E8ECEF;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.$width}%;
  background: #1E3A5F;
  transition: width 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1);
  border-radius: 2px;
`;

const ProgressStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  font-size: 12px;
  color: #6B7A8A;
`;

const getStepIcon = (stepId) => {
  const icons = {
    0: <DescriptionIcon sx={{ fontSize: 20 }} />,
    1: <TextFieldsIcon sx={{ fontSize: 20 }} />,
    2: <DescriptionIcon sx={{ fontSize: 20 }} />,
    3: <MenuBookIcon sx={{ fontSize: 20 }} />,
    4: <LibraryBooksIcon sx={{ fontSize: 20 }} />,
    5: <AttachFileIcon sx={{ fontSize: 20 }} />,
    6: <ContentPasteSearchIcon sx={{ fontSize: 20 }} />,
    7: <PictureAsPdfIcon sx={{ fontSize: 20 }} />
  };
  return icons[stepId] || <PendingIcon sx={{ fontSize: 20 }} />;
};

const ProcessTimeline = ({ steps, currentStep, stepResults }) => {
  const totalSteps = steps.length;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <GlassCard>
      <Title>
        <TimerIcon sx={{ fontSize: 20, color: '#1E3A5F' }} />
        VKR Audit — Assessment Process
      </Title>
      
      <TimelineContainer>
        {steps.map((step, idx) => {
          let status = 'pending';
          if (idx < currentStep) status = 'completed';
          else if (idx === currentStep) status = 'running';
          
          const result = stepResults[idx];
          
          return (
            <StepRow key={step.id} $active={status === 'running'}>
              <StepIcon $status={status}>
                {status === 'completed' ? <CheckCircleIcon sx={{ fontSize: 20 }} /> : getStepIcon(step.id)}
              </StepIcon>
              <StepContent>
                <StepName $active={status === 'running'}>{step.name}</StepName>
                <StepStatus $status={status}>
                  {status === 'completed' && 'Completed'}
                  {status === 'running' && 'In Progress...'}
                  {status === 'pending' && 'Pending'}
                </StepStatus>
              </StepContent>
              {result && (
                <StepScore>
                  {result.score}/{result.max}
                </StepScore>
              )}
            </StepRow>
          );
        })}
      </TimelineContainer>
      
      <ProgressSection>
        <ProgressBar>
          <ProgressFill $width={progress} />
        </ProgressBar>
        <ProgressStats>
          <span>Overall Progress</span>
          <span>{Math.round(progress)}%</span>
        </ProgressStats>
      </ProgressSection>
    </GlassCard>
  );
};

export default ProcessTimeline;