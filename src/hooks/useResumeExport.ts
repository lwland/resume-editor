import { useRef, useState } from 'react';
import { useResumeStore } from '../store/resumeStore';

const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

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
      await new Promise((r) => setTimeout(r, 150));

      const SCALE = 2;

      // 1. 一次性截取完整长图
      const fullCanvas = await html2canvas(element, {
        scale: SCALE,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.scrollHeight,
      });

      const pdf = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });

      // A4 页高对应的像素数（canvas 坐标系）
      const pageHeightPx = Math.floor(A4_HEIGHT_PT * (fullCanvas.width / A4_WIDTH_PT));
      const totalPx = fullCanvas.height;

      // 2. 计算每页的安全分页点
      const pageBreaks = calcPageBreaks(fullCanvas, pageHeightPx, totalPx);

      // 3. 逐页截图并写入 PDF
      for (let i = 0; i < pageBreaks.length - 1; i++) {
        const top = pageBreaks[i];
        const bottom = pageBreaks[i + 1];
        const sliceH = bottom - top;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = fullCanvas.width;
        pageCanvas.height = sliceH;

        const ctx = pageCanvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, sliceH);
        ctx.drawImage(fullCanvas, 0, top, fullCanvas.width, sliceH, 0, 0, fullCanvas.width, sliceH);

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.92);
        // 按比例计算该分片在 PDF 上的实际高度
        const imgHeightPt = (sliceH / fullCanvas.width) * A4_WIDTH_PT;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_PT, imgHeightPt);
      }

      pdf.save(`${data.profile.name || '我的简历'}-简历.pdf`);
    } catch (err) {
      console.error('PDF 导出失败:', err);
      alert('PDF 导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  return { previewRef, exportPDF, exporting };
};

/**
 * 计算所有分页断点（像素位置数组）。
 * 策略：从每页理想结束行向上扫描，找第一条"白色空白行"作为实际分页点。
 */
function calcPageBreaks(
  canvas: HTMLCanvasElement,
  pageHeightPx: number,
  totalPx: number,
): number[] {
  const breaks: number[] = [0];
  let cursor = 0;

  while (cursor + pageHeightPx < totalPx) {
    const idealEnd = cursor + pageHeightPx;
    const safeEnd = findWhiteLine(canvas, idealEnd, Math.min(60, pageHeightPx * 0.06));
    breaks.push(safeEnd);
    cursor = safeEnd;
  }

  breaks.push(totalPx);
  return breaks;
}

/**
 * 从 `start` 向上扫描最多 `scanRange` 像素，
 * 返回第一条像素均为接近白色（>230）的行的 Y 坐标。
 * 找不到则返回 `start`（原始位置兜底）。
 */
function findWhiteLine(canvas: HTMLCanvasElement, start: number, scanRange: number): number {
  const ctx = canvas.getContext('2d')!;
  const sampleX = Math.floor(canvas.width * 0.05);
  const sampleW = Math.floor(canvas.width * 0.9);

  for (let y = start; y > start - scanRange; y--) {
    if (y <= 0) break;
    const data = ctx.getImageData(sampleX, y, sampleW, 1).data;
    let isBlank = true;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 230 || data[i + 1] < 230 || data[i + 2] < 230) {
        isBlank = false;
        break;
      }
    }
    if (isBlank) return y;
  }

  return start;
}
