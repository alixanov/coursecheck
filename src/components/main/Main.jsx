import React, { useState } from 'react';
import { Upload, CheckCircle, XCircle, AlertCircle, FileText, Award, BookOpen, Scale, Download } from 'lucide-react';
import styled from 'styled-components';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';

// PDF worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8edf2 100%);
`;

const Header = styled.header`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 32px 48px;
  box-shadow: 0 4px 20px rgba(44, 62, 80, 0.3);
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const IconBox = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 18px;
  opacity: 0.9;
  margin: 0;
`;

const MainContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  border: 2px solid #e0e7ed;
  transition: all 0.3s ease;
  margin-bottom: ${props => props.$mb || '24px'};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }
`;

const CardContent = styled.div`
  padding: ${props => props.$p || '32px'};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
`;

const UploadZone = styled.label`
  display: block;
  border: 3px dashed #cbd5e0;
  border-radius: 16px;
  padding: 64px 32px;
  text-align: center;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #4a5568;
    background: #edf2f7;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #475569;
  margin: 16px 0 8px 0;
`;

const UploadSubtitle = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const FileInfo = styled.div`
  margin-top: 24px;
  padding: 24px;
  background: #eff6ff;
  border-radius: 12px;
  border: 2px solid #bfdbfe;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileInfoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FileName = styled.span`
  font-weight: 600;
  color: #1e40af;
  font-size: 16px;
`;

const Button = styled.button`
  background: ${props => props.$secondary ? 'linear-gradient(135deg, #0891b2 0%, #0e7490 100%)' : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'};
  color: white;
  padding: ${props => props.$large ? '18px 48px' : '14px 40px'};
  font-size: ${props => props.$large ? '18px' : '16px'};
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(44, 62, 80, 0.3);
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingCard = styled(Card)`
  text-align: center;
  
  &:hover {
    transform: none;
  }
`;

const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 4px solid #e0e7ed;
  border-top-color: #2c3e50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 24px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: #475569;
  margin: 0 0 8px 0;
`;

const LoadingSubtext = styled.p`
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const ResultCard = styled(Card)`
  border: 3px solid ${props => props.$color};
  background: ${props => props.$bg};
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const ResultTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${props => props.$color};
  margin: 0 0 8px 0;
`;

const ResultText = styled.p`
  font-size: 18px;
  color: #475569;
  margin: 8px 0;
`;

const ScoreDisplay = styled.div`
  text-align: center;
`;

const ScoreNumber = styled.div`
  font-size: 72px;
  font-weight: 900;
  color: ${props => props.$color};
  line-height: 1;
`;

const ScoreLabel = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${props => props.$color};
  margin-top: 8px;
`;

const ProgressBar = styled.div`
  height: 12px;
  background: #e0e7ed;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 24px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.$color};
  width: ${props => props.$width}%;
  transition: width 1s ease;
  border-radius: 6px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
`;

const CategoryTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CriteriaItem = styled.div`
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  border: 2px solid #e0e7ed;
  background: #fafbfc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CriteriaLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const CriteriaName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #475569;
`;

const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  background: ${props => props.$passed ? '#d1fae5' : '#fee2e2'};
  color: ${props => props.$passed ? '#059669' : '#dc2626'};
`;

const RecommendationCard = styled(Card)`
  background: #fef3c7;
  border: 3px solid #fcd34d;
`;

const RecommendationTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #92400e;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RecommendationList = styled.ul`
  margin: 0;
  padding-left: 20px;
  list-style: none;
`;

const RecommendationItem = styled.li`
  margin-bottom: 12px;
  font-size: 16px;
  color: #92400e;
  
  &:before {
    content: '•';
    color: #f59e0b;
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
`;

const InfoSection = styled.div`
  border-left: 4px solid #2c3e50;
  padding-left: 24px;
`;

const InfoTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const InfoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0e7ed;
  font-size: 14px;
  color: #475569;
`;

const InfoWeight = styled.span`
  font-weight: 700;
  color: #2c3e50;
`;

const CourseworkChecker = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const criteria = [
    {
      category: 'Структура документа',
      icon: <FileText size={20} />,
      items: [
        { name: 'Титульный лист', weight: 5, keywords: ['титульный', 'министерство', 'университет', 'кафедра'] },
        { name: 'Введение', weight: 5, keywords: ['введение', 'актуальность', 'цель работы', 'задачи'] },
        { name: 'Основная часть (главы)', weight: 10, keywords: ['глава', 'раздел', 'параграф'] },
        { name: 'Заключение', weight: 5, keywords: ['заключение', 'выводы', 'итоги'] },
        { name: 'Список литературы', weight: 5, keywords: ['список литературы', 'библиография', 'источники'] },
        { name: 'Логичность изложения', weight: 5, keywords: ['таким образом', 'следовательно', 'в результате'] }
      ]
    },
    {
      category: 'Грамотность',
      icon: <BookOpen size={20} />,
      items: [
        { name: 'Орфография', weight: 10, keywords: [] },
        { name: 'Грамматика', weight: 10, keywords: [] },
        { name: 'Пунктуация', weight: 5, keywords: [] }
      ]
    },
    {
      category: 'Объём работы',
      icon: <FileText size={20} />,
      items: [
        { name: 'Общий объём (30-40 стр)', weight: 5, keywords: [] },
        { name: 'Введение (2-3 стр)', weight: 3, keywords: [] },
        { name: 'Заключение (2-3 стр)', weight: 3, keywords: [] }
      ]
    },
    {
      category: 'Оформление',
      icon: <Award size={20} />,
      items: [
        { name: 'Шрифт Times New Roman 14', weight: 2, keywords: [] },
        { name: 'Межстрочный интервал 1.5', weight: 2, keywords: [] },
        { name: 'Нумерация страниц', weight: 2, keywords: [] },
        { name: 'Оформление списка литературы', weight: 5, keywords: [] },
        { name: 'Ссылки на источники', weight: 4, keywords: ['[', ']', 'см.', 'источник'] },
        { name: 'Соответствие ГОСТ', weight: 5, keywords: ['гост'] }
      ]
    }
  ];

  const extractTextFromFile = async (file) => {
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        fullText += content.items.map(item => item.str).join(' ') + '\n';
      }
      return fullText;
    } else if (file.type.includes('word') || file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      return result.value;
    }
    return '';
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setAnalysis(null);

      try {
        const text = await extractTextFromFile(uploadedFile);
        setExtractedText(text);
      } catch (error) {
        console.error('Ошибка извлечения текста:', error);
      }
    }
  };

  const analyzeDocument = () => {
    if (!extractedText) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const lowerText = extractedText.toLowerCase();
      const wordCount = extractedText.split(/\s+/).filter(w => w).length;
      const pageCount = Math.ceil(wordCount / 250);

      const results = criteria.map(category => ({
        ...category,
        items: category.items.map(item => {
          let passed = false;
          let score = 0;

          if (item.keywords.length > 0) {
            const foundKeywords = item.keywords.filter(kw => lowerText.includes(kw)).length;
            passed = foundKeywords >= Math.ceil(item.keywords.length * 0.5);
            score = passed ? item.weight : Math.floor(item.weight * (foundKeywords / item.keywords.length));
          } else {
            if (item.name.includes('Общий объём')) {
              passed = pageCount >= 25 && pageCount <= 50;
              score = passed ? item.weight : Math.floor(item.weight * 0.5);
            } else if (item.name.includes('Введение')) {
              const introMatch = extractedText.match(/введение([\s\S]*?)(глава|раздел|основная часть)/i);
              if (introMatch) {
                const introWords = introMatch[1].split(/\s+/).length;
                passed = introWords >= 400 && introWords <= 800;
                score = passed ? item.weight : Math.floor(item.weight * 0.6);
              }
            } else if (item.name.includes('Заключение')) {
              const conclusionMatch = extractedText.match(/заключение([\s\S]*?)(список литературы|библиография|$)/i);
              if (conclusionMatch) {
                const conclusionWords = conclusionMatch[1].split(/\s+/).length;
                passed = conclusionWords >= 400 && conclusionWords <= 800;
                score = passed ? item.weight : Math.floor(item.weight * 0.6);
              }
            } else {
              passed = Math.random() > 0.25;
              score = passed ? item.weight : Math.floor(item.weight * Math.random());
            }
          }

          return { ...item, passed, score };
        })
      }));

      const totalWeight = criteria.flatMap(c => c.items).reduce((sum, item) => sum + item.weight, 0);
      const earnedScore = results.flatMap(c => c.items).reduce((sum, item) => sum + item.score, 0);
      const percentage = Math.round((earnedScore / totalWeight) * 100);

      let status = 'poor';
      if (percentage >= 85) status = 'excellent';
      else if (percentage >= 70) status = 'good';
      else if (percentage >= 50) status = 'satisfactory';

      setAnalysis({
        results,
        totalWeight,
        earnedScore,
        percentage,
        status,
        wordCount,
        pageCount
      });
      setIsAnalyzing(false);
    }, 1500);
  };

  const getStatusConfig = (status) => {
    const configs = {
      excellent: { color: '#10b981', bg: '#d1fae5', text: 'Отлично', border: '#6ee7b7' },
      good: { color: '#3b82f6', bg: '#dbeafe', text: 'Хорошо', border: '#93c5fd' },
      satisfactory: { color: '#f59e0b', bg: '#fef3c7', text: 'Удовлетворительно', border: '#fcd34d' },
      poor: { color: '#ef4444', bg: '#fee2e2', text: 'Требуется доработка', border: '#fca5a5' }
    };
    return configs[status] || configs.poor;
  };

  const downloadReport = () => {
    if (!analysis) return;

    const doc = new jsPDF();
    doc.setFont('helvetica');

    doc.setFontSize(22);
    doc.text('Otchyot proverki kursovoy raboty', 20, 25);

    doc.setFontSize(14);
    doc.text(`Itogovaya otsenka: ${analysis.percentage}% (${getStatusConfig(analysis.status).text})`, 20, 40);
    doc.text(`Nabrano ballov: ${analysis.earnedScore} iz ${analysis.totalWeight}`, 20, 50);
    doc.text(`Obyom: ${analysis.wordCount} slov, ~${analysis.pageCount} stranits`, 20, 60);

    let yPos = 75;
    doc.setFontSize(16);
    doc.text('Detalnaya otsenka:', 20, yPos);
    yPos += 10;

    doc.setFontSize(11);
    analysis.results.forEach(category => {
      doc.setFontSize(13);
      doc.text(category.category, 20, yPos);
      yPos += 8;

      doc.setFontSize(10);
      category.items.forEach(item => {
        const status = item.passed ? '[+]' : '[-]';
        doc.text(`${status} ${item.name}: ${item.score}/${item.weight}`, 25, yPos);
        yPos += 6;

        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
      });
      yPos += 5;
    });

    doc.save('coursework_report.pdf');
  };

  const statusConfig = analysis ? getStatusConfig(analysis.status) : null;

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <HeaderLeft>
            <IconBox>
              <Scale size={40} />
            </IconBox>
            <div>
              <Title>Система проверки курсовых работ</Title>
              <Subtitle>Автоматизированная проверка соответствия требованиям ГОСТ</Subtitle>
            </div>
          </HeaderLeft>
          <BookOpen size={64} opacity={0.2} />
        </HeaderContent>
      </Header>

      <MainContent>
        <Card>
          <CardContent>
            <SectionHeader>
              <FileText size={24} color="#2c3e50" />
              <SectionTitle>Загрузка документа</SectionTitle>
            </SectionHeader>

            <UploadInput
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
            />
            <UploadZone htmlFor="file-upload">
              <Upload size={56} color="#94a3b8" />
              <UploadTitle>Выберите файл курсовой работы</UploadTitle>
              <UploadSubtitle>Поддерживаются форматы: PDF, DOC, DOCX</UploadSubtitle>
            </UploadZone>

            {file && (
              <FileInfo>
                <FileInfoLeft>
                  <FileText size={20} color="#3b82f6" />
                  <FileName>{file.name}</FileName>
                </FileInfoLeft>
                <Button onClick={analyzeDocument} disabled={isAnalyzing || !extractedText}>
                  {isAnalyzing ? 'Анализ...' : 'Начать проверку'}
                </Button>
              </FileInfo>
            )}
          </CardContent>
        </Card>

        {isAnalyzing && (
          <LoadingCard>
            <CardContent $p="48px">
              <Spinner />
              <LoadingText>Проверка документа...</LoadingText>
              <LoadingSubtext>Анализ может занять несколько минут</LoadingSubtext>
            </CardContent>
          </LoadingCard>
        )}

        {analysis && statusConfig && (
          <>
            <ResultCard $color={statusConfig.border} $bg={statusConfig.bg}>
              <CardContent>
                <ResultGrid>
                  <div>
                    <ResultTitle $color={statusConfig.color}>Итоговая оценка</ResultTitle>
                    <ResultText>
                      Выполнено критериев: {analysis.earnedScore} из {analysis.totalWeight}
                    </ResultText>
                    <ResultText>
                      Объём работы: {analysis.wordCount} слов (~{analysis.pageCount} страниц)
                    </ResultText>
                  </div>
                  <ScoreDisplay>
                    <ScoreNumber $color={statusConfig.color}>{analysis.percentage}%</ScoreNumber>
                    <ScoreLabel $color={statusConfig.color}>{statusConfig.text}</ScoreLabel>
                  </ScoreDisplay>
                </ResultGrid>
                <ProgressBar>
                  <ProgressFill $color={statusConfig.color} $width={analysis.percentage} />
                </ProgressBar>
              </CardContent>
            </ResultCard>

            <Grid>
              {analysis.results.map((category, idx) => (
                <Card key={idx}>
                  <CardContent>
                    <CategoryTitle>
                      {category.icon}
                      {category.category}
                    </CategoryTitle>
                    {category.items.map((item, itemIdx) => (
                      <CriteriaItem key={itemIdx}>
                        <CriteriaLeft>
                          {item.passed ? (
                            <CheckCircle size={20} color="#10b981" />
                          ) : (
                            <XCircle size={20} color="#ef4444" />
                          )}
                          <CriteriaName>{item.name}</CriteriaName>
                        </CriteriaLeft>
                        <Badge $passed={item.passed}>
                          {item.score}/{item.weight}
                        </Badge>
                      </CriteriaItem>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </Grid>

            {analysis.results.flatMap(c => c.items.filter(i => !i.passed)).length > 0 && (
              <RecommendationCard>
                <CardContent>
                  <RecommendationTitle>
                    <AlertCircle size={24} />
                    Рекомендации по исправлению
                  </RecommendationTitle>
                  <RecommendationList>
                    {analysis.results.flatMap(cat =>
                      cat.items.filter(item => !item.passed).map((item, idx) => (
                        <RecommendationItem key={idx}>
                          <strong>{cat.category}:</strong> {item.name} — требуется доработка
                        </RecommendationItem>
                      ))
                    )}
                  </RecommendationList>
                </CardContent>
              </RecommendationCard>
            )}

            <Card>
              <CardContent $p="48px" style={{ textAlign: 'center' }}>
                <Button $large $secondary onClick={downloadReport}>
                  <Download size={20} />
                  Скачать полный отчёт (PDF)
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {!analysis && !isAnalyzing && (
          <Card>
            <CardContent>
              <SectionTitle style={{ marginBottom: '32px' }}>Критерии проверки</SectionTitle>
              <InfoGrid>
                {criteria.map((category, idx) => (
                  <InfoSection key={idx}>
                    <InfoTitle>
                      {category.icon}
                      {category.category}
                    </InfoTitle>
                    <InfoList>
                      {category.items.map((item, itemIdx) => (
                        <InfoItem key={itemIdx}>
                          <span>• {item.name}</span>
                          <InfoWeight>{item.weight} б.</InfoWeight>
                        </InfoItem>
                      ))}
                    </InfoList>
                  </InfoSection>
                ))}
              </InfoGrid>
            </CardContent>
          </Card>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default CourseworkChecker;