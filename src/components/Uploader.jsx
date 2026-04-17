// src/components/Uploader.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArticleIcon from '@mui/icons-material/Article';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const UploadZone = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px dashed ${props => props.$hasFile ? '#2C6E49' : '#DCE1E6'};
  border-radius: 16px;
  padding: 48px 32px;
  background: ${props => props.$hasFile ? '#F5F9F5' : '#FFFFFF'};
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover { border-color: #1E3A5F; background: #F5F7FA; }
`;

const UploadInput = styled.input`display: none;`;

const FileInfo = styled.div`
  margin-top: 20px;
  padding: 16px 20px;
  background: #F9F9FB;
  border-radius: 12px;
  border: 1px solid #E8ECEF;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: ${props => props.$success ? '#2C6E49' : '#1E3A5F'};
`;

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

const Uploader = ({ onFileExtracted, isAnalyzing }) => {
  const [fileName, setFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtracted, setIsExtracted] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      setFileName(file.name);
      setIsExtracted(false);
      const text = await extractTextFromFile(file);
      setIsExtracted(true);
      onFileExtracted(text, file.name);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <UploadInput type="file" id="file-upload" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
      <UploadZone htmlFor="file-upload" $hasFile={fileName}>
        <CloudUploadIcon sx={{ fontSize: 48, color: fileName ? '#2C6E49' : '#A0AAB5' }} />
        <h3 style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: fileName ? '#2C6E49' : '#1E3A5F' }}>
          {fileName ? 'File Uploaded' : 'Upload Graduate Work'}
        </h3>
        <p style={{ color: '#A0AAB5', fontSize: 13, marginTop: 8 }}>
          {fileName ? fileName : 'Supported formats: PDF, DOC, DOCX'}
        </p>
      </UploadZone>
      
      {fileName && (
        <FileInfo>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ArticleIcon sx={{ color: '#1E3A5F' }} />
            <span style={{ fontWeight: 500, fontSize: 14 }}>{fileName}</span>
          </div>
          <StatusBadge $success={isExtracted}>
            {isLoading ? (
              <>⏳ Extracting text...</>
            ) : isExtracted ? (
              <><CheckCircleIcon sx={{ fontSize: 18 }} /> Text extracted</>
            ) : (
              <>⏳ Processing...</>
            )}
          </StatusBadge>
        </FileInfo>
      )}
    </div>
  );
};

export default Uploader;