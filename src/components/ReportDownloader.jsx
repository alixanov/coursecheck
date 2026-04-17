// src/components/ReportDownloader.jsx
import React, { useRef } from 'react';
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Button = styled.button`
  background: white;
  color: #1E3A5F;
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid #DCE1E6;
  border-radius: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
  width: 100%;
  justify-content: center;
  &:hover { background: #F5F7FA; border-color: #1E3A5F; }
`;

const ReportTemplate = styled.div`
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 800px;
  background: white;
  padding: 48px;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  color: #1E3A5F;
  line-height: 1.5;
`;

const LogoReport = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const LogoIconReport = styled.div`
  width: 48px;
  height: 48px;
  background: #1E3A5F;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
`;

const LogoTextReport = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1E3A5F;
  span { font-weight: 400; color: #C4A43A; }
`;

const ReportTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #1E3A5F;
  margin-bottom: 8px;
  text-align: center;
`;

const ReportSubtitle = styled.p`
  font-size: 12px;
  color: #6B7A8A;
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #E8ECEF;
`;

const SectionTitle = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #1E3A5F;
  margin: 20px 0 12px 0;
  padding-bottom: 6px;
  border-bottom: 1px solid #E8ECEF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ScoreRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 13px;
  border-bottom: 0.5px solid #F0F2F5;
`;

const TotalScore = styled.div`
  background: #1E3A5F;
  color: white;
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  margin: 20px 0;
`;

const Footer = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E8ECEF;
  font-size: 10px;
  color: #A0AAB5;
  text-align: center;
`;

const ReportDownloader = ({ analysis, fileName }) => {
  const reportRef = useRef(null);

  const downloadReport = async () => {
    if (!analysis || !reportRef.current) return;
    
    try {
      const canvas = await html2canvas(reportRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      doc.save(`VKRAudit_Report_${fileName?.replace(/\.[^/.]+$/, '') || 'GraduateWork'}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
    }
  };

  const getScoreColor = (score, max) => {
    const percentage = (score / max) * 100;
    return percentage >= 70 ? '#2C6E49' : percentage >= 50 ? '#C4A43A' : '#C23B22';
  };

  return (
    <>
      <ReportTemplate ref={reportRef}>
        <LogoReport>
          <LogoIconReport>✓</LogoIconReport>
          <LogoTextReport>VKR<span>Audit</span></LogoTextReport>
        </LogoReport>
        
        <ReportTitle>VKR AUDIT REPORT</ReportTitle>
        <ReportSubtitle>Graduate Work Assessment Report</ReportSubtitle>
        
        <ScoreRow><span>📄 File:</span><span>{fileName || 'Not specified'}</span></ScoreRow>
        <ScoreRow><span>📅 Date:</span><span>{new Date().toLocaleDateString('en-US')}</span></ScoreRow>
        
        <SectionTitle>Assessment Results</SectionTitle>
        
        <ScoreRow>
          <span>🖨️ Font & Formatting (Times New Roman, 14pt, 1.15 line spacing)</span>
          <span style={{ fontWeight: 700, color: getScoreColor(analysis.fontScore || 0, 30) }}>{analysis.fontScore || 0} / 30</span>
        </ScoreRow>
        
        <ScoreRow>
          <span>📄 Volume (70 pages required)</span>
          <span style={{ fontWeight: 700, color: getScoreColor(analysis.pagesScore || 0, 15) }}>{analysis.pagesScore || 0} / 15</span>
        </ScoreRow>
        
        <ScoreRow>
          <span>📑 Structure (Introduction, 3 chapters, Conclusion, subsections)</span>
          <span style={{ fontWeight: 700, color: getScoreColor(analysis.structureScore || 0, 50) }}>{analysis.structureScore || 0} / 50</span>
        </ScoreRow>
        
        <ScoreRow>
          <span>📚 References & Citations</span>
          <span style={{ fontWeight: 700, color: getScoreColor(analysis.referencesScore || 0, 35) }}>{analysis.referencesScore || 0} / 35</span>
        </ScoreRow>
        
        <ScoreRow>
          <span>📎 Appendices</span>
          <span style={{ fontWeight: 700, color: getScoreColor(analysis.appendixScore || 0, 20) }}>{analysis.appendixScore || 0} / 20</span>
        </ScoreRow>
        
        <ScoreRow>
          <span>🔍 Text Uniqueness</span>
          <span style={{ fontWeight: 700, color: getScoreColor(analysis.plagiarismScore || 0, 30) }}>{analysis.plagiarismScore || 0} / 30</span>
        </ScoreRow>
        
        <TotalScore>
          <div style={{ fontSize: 12, opacity: 0.8 }}>FINAL SCORE</div>
          <div style={{ fontSize: 32, fontWeight: 700 }}>{analysis.totalScore || 0}%</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>{analysis.statusText || 'Requires Revision'}</div>
        </TotalScore>
        
        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <>
            <SectionTitle>Recommendations</SectionTitle>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {analysis.recommendations.map((rec, idx) => (
                <li key={idx} style={{ fontSize: 12, marginBottom: 8, color: '#3A3A3C' }}>{rec}</li>
              ))}
            </ul>
          </>
        )}
        
        <Footer>
          <div>Report generated by VKR Audit System</div>
          <div>© 2026 — All Rights Reserved</div>
        </Footer>
      </ReportTemplate>
      
      <Button onClick={downloadReport}>
        <DownloadIcon /> Download Report (PDF)
      </Button>
    </>
  );
};

export default ReportDownloader;