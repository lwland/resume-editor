import React, { useRef, useEffect, useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { getTemplate } from '../../templates/registry';

interface PreviewCanvasProps {
  previewRef: React.RefObject<HTMLDivElement>;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ previewRef }) => {
  const { data } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(841);

  const template = getTemplate(data.meta.templateId);
  const TemplateComponent = template.component;

  // 自适应缩放
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const padding = 48;
        const availableWidth = containerWidth - padding;
        const resumeWidth = 595;
        const newScale = Math.min(1, availableWidth / resumeWidth);
        setScale(newScale);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // 更新简历内容高度（用于正确的缩放占位）
  useEffect(() => {
    if (previewRef.current) {
      setContentHeight(previewRef.current.offsetHeight);
    }
  });

  // 缩小后真实占用高度 = 原始高度 × scale
  const scaledHeight = contentHeight * scale;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-auto py-8 px-6"
      style={{ background: '#e8ecf0', minWidth: 0 }}
    >
      {/* 外层容器固定缩放后的高度，防止内容塌陷 */}
      <div
        className="mx-auto"
        style={{ width: '595px', height: `${scaledHeight}px`, position: 'relative' }}
      >
        <div
          style={{
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <div
            ref={previewRef}
            style={{
              boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
              borderRadius: '2px',
              background: '#fff',
              width: '595px',
            }}
          >
            <TemplateComponent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCanvas;
