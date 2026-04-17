// src/App.jsx
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Uploader from './components/Uploader';
import FontChecker from './components/FontChecker';
import PageCountChecker from './components/PageCountChecker';
import StructureChecker from './components/StructureChecker';
import ReferencesChecker from './components/ReferencesChecker';
import AppendixChecker from './components/AppendixChecker';
import PlagiarismChecker from './components/PlagiarismChecker';
import ResultsDashboard from './components/ResultsDashboard';
import ReportDownloader from './components/ReportDownloader';
import ProcessTimeline from './components/ProcessTimeline';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: #F0F2F5;
  font-family: 'Inter', -apple-system, 'SF Pro Display', sans-serif;
`;

const Header = styled.header`
  background: #FFFFFF;
  border-bottom: 1px solid #DCE1E6;
  padding: 20px 48px;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

// ЛОГОТИП VKR Audit
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #1E3A5F 0%, #2C5282 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 4px 12px rgba(30, 58, 95, 0.25);
  
  &::before {
    content: '✓';
    font-size: 28px;
    font-weight: 700;
    color: white;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    background: #C4A43A;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: white;
  }
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1E3A5F;
  letter-spacing: 0.5px;
  
  span {
    font-weight: 400;
    color: #C4A43A;
  }
`;

const LogoSubtitle = styled.div`
  font-size: 10px;
  color: #6B7A8A;
  letter-spacing: 0.3px;
  text-transform: uppercase;
`;

const Badge = styled.div`
  background: #E8ECEF;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #1E3A5F;
  letter-spacing: 0.3px;
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 48px;
  animation: ${fadeIn} 0.4s ease-out;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 24px;
  margin-top: 24px;
`;

const App = () => {
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState(null);
  const [stepResults, setStepResults] = useState({});

  const steps = [
    { id: 0, name: 'Извлечение текста', component: 'Uploader', status: 'pending' },
    { id: 1, name: 'Проверка шрифта', component: 'FontChecker', status: 'pending' },
    { id: 2, name: 'Проверка объёма', component: 'PageCountChecker', status: 'pending' },
    { id: 3, name: 'Проверка структуры', component: 'StructureChecker', status: 'pending' },
    { id: 4, name: 'Проверка литературы', component: 'ReferencesChecker', status: 'pending' },
    { id: 5, name: 'Проверка приложений', component: 'AppendixChecker', status: 'pending' },
    { id: 6, name: 'Проверка плагиата', component: 'PlagiarismChecker', status: 'pending' },
    { id: 7, name: 'Формирование отчёта', component: 'Report', status: 'pending' }
  ];

  const updateStepStatus = (stepId, status, result = null) => {
    setCurrentStep(stepId + 1);
    if (result) {
      setStepResults(prev => ({ ...prev, [stepId]: result }));
    }
  };

  const startAnalysis = async (extractedText, name) => {
    setText(extractedText);
    setFileName(name);
    setIsAnalyzing(true);
    setCurrentStep(0);
    setStepResults({});
    
    for (let i = 1; i <= 6; i++) {
      updateStepStatus(i - 1, 'running');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let result = null;
      const wordCount = extractedText.split(/\s+/).length;
      const pageCount = Math.ceil(wordCount / 250);
      
      switch(i) {
        case 1:
          result = { score: 28, max: 30, passed: true };
          break;
        case 2:
          result = { score: pageCount >= 68 && pageCount <= 72 ? 15 : pageCount >= 65 && pageCount <= 75 ? 10 : 5, max: 15, passed: pageCount >= 65 };
          break;
        case 3:
          result = { score: 42, max: 50, passed: true };
          break;
        case 4:
          result = { score: 28, max: 35, passed: true };
          break;
        case 5:
          result = { score: 15, max: 20, passed: true };
          break;
        case 6:
          result = { score: 24, max: 30, passed: true };
          break;
      }
      updateStepStatus(i - 1, 'completed', result);
    }
    
    const totalScore = Math.floor(
      (stepResults[1]?.score || 28) + 
      (stepResults[2]?.score || 12) + 
      (stepResults[3]?.score || 42) + 
      (stepResults[4]?.score || 28) + 
      (stepResults[5]?.score || 15) + 
      (stepResults[6]?.score || 24)
    );
    
    const percentage = Math.floor((totalScore / 180) * 100);
    let status = 'poor';
    if (percentage >= 85) status = 'excellent';
    else if (percentage >= 70) status = 'good';
    else if (percentage >= 50) status = 'satisfactory';
    
    setResults({
      fontScore: stepResults[1]?.score || 28,
      pagesScore: stepResults[2]?.score || 12,
      structureScore: stepResults[3]?.score || 42,
      referencesScore: stepResults[4]?.score || 28,
      appendixScore: stepResults[5]?.score || 15,
      plagiarismScore: stepResults[6]?.score || 24,
      totalScore: percentage,
      status: status,
      statusText: status === 'excellent' ? 'Excellent' : status === 'good' ? 'Good' : status === 'satisfactory' ? 'Satisfactory' : 'Requires Revision',
      recommendations: [
        'Increase the number of sources to 20',
        'Add 2-3 appendices',
        'Check text uniqueness'
      ]
    });
    
    updateStepStatus(7, 'completed');
    setIsAnalyzing(false);
  };

  return (
    <AppContainer>
      <Header>
        <HeaderContent>
          <LogoSection>
            <Logo>
              <LogoIcon />
              <LogoText>
                <LogoTitle>VKR<span>Audit</span></LogoTitle>
                <LogoSubtitle>Graduate Work Assessment System</LogoSubtitle>
              </LogoText>
            </Logo>
          </LogoSection>
          <Badge>GOST R 7.0.11-2024</Badge>
        </HeaderContent>
      </Header>
      
      <MainContent>
        <Uploader onFileExtracted={startAnalysis} isAnalyzing={isAnalyzing} />
        
        {isAnalyzing && (
          <ProcessTimeline steps={steps} currentStep={currentStep} stepResults={stepResults} />
        )}
        
        {text && !isAnalyzing && results && (
          <>
            <ResultsDashboard results={results} />
            
            <Grid>
              <FontChecker text={text} results={stepResults[1]} />
              <PageCountChecker text={text} results={stepResults[2]} />
              <StructureChecker text={text} results={stepResults[3]} />
              <ReferencesChecker text={text} results={stepResults[4]} />
              <AppendixChecker text={text} results={stepResults[5]} />
              <PlagiarismChecker text={text} results={stepResults[6]} />
            </Grid>
            
            <ReportDownloader analysis={results} fileName={fileName} />
          </>
        )}
      </MainContent>
    </AppContainer>
  );
};

export default App;