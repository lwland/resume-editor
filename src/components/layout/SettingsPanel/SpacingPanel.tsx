import { RotateCcw } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import SliderField from '../../ui/SliderField';

const SpacingPanel: React.FC = () => {
  const { data, updateSpacing, resetSpacing } = useResumeStore();
  const { moduleGap, lineHeight, pagePadding } = data.meta.spacing;

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">间距设置</h3>

      <SliderField
        label="模块上下间距"
        value={moduleGap}
        min={0}
        max={60}
        step={2}
        leftLabel="紧凑"
        rightLabel="宽松"
        onChange={(v) => updateSpacing({ moduleGap: v })}
      />

      <SliderField
        label="行间距"
        value={lineHeight}
        min={1.2}
        max={2.5}
        step={0.05}
        leftLabel="紧凑"
        rightLabel="宽松"
        displayValue={lineHeight.toFixed(2)}
        onChange={(v) => updateSpacing({ lineHeight: v })}
      />

      <SliderField
        label="页面边距"
        value={pagePadding}
        min={24}
        max={80}
        step={4}
        leftLabel="窄"
        rightLabel="宽"
        onChange={(v) => updateSpacing({ pagePadding: v })}
      />

      <button
        onClick={resetSpacing}
        className="w-full mt-4 flex items-center justify-center gap-2 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-slate-700 transition-colors"
      >
        <RotateCcw size={14} />
        <span>恢复默认间距</span>
      </button>
    </div>
  );
};

export default SpacingPanel;
