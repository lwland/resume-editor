import { useRef, useState } from 'react';
import { useResumeStore } from '../store/resumeStore';

export const useResumeExport = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { data } = useResumeStore();
  const [exporting, setExporting] = useState(false);

  const exportPDF = async () => {
    if (!previewRef.current || exporting) return;
    setExporting(true);

    try {
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');

      const element = previewRef.current;

      // 短暂延迟确保 DOM 稳定
      await new Promise((r) => setTimeout(r, 100));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: 595,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });

      const pdfWidth = 595.28;
      const pdfHeight = 841.89;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `${data.profile.name || '我的简历'}-简历.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF 导出失败:', error);
      alert('PDF 导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  return { previewRef, exportPDF, exporting };
};
