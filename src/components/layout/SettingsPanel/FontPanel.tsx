import { useResumeStore } from '../../../store/resumeStore';
import { FontFamily } from '../../../types/resume';
import SliderField from '../../ui/SliderField';

const fonts: { id: FontFamily; label: string; preview: string }[] = [
  { id: 'default', label: '默认黑体', preview: '字' },
  { id: 'source-sans', label: '思源黑体', preview: '字' },
  { id: 'source-serif', label: '思源宋体', preview: '字' },
  { id: 'lxgw', label: '霞鹜文楷', preview: '字' },
  { id: 'inter', label: 'Inter + 黑体', preview: 'A字' },
];

const FontPanel: React.FC = () => {
  const { data, updateMeta } = useResumeStore();
  const { font, fontSize, language } = data.meta;

  return (
    <div className="p-4 space-y-5">
      <h3 className="text-sm font-semibold text-slate-700">文字设置</h3>

      {/* 语言切换 */}
      <div>
        <div className="text-xs text-slate-500 mb-2">简历语言</div>
        <div className="flex gap-2">
          {(['zh', 'en'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => updateMeta({ language: lang })}
              className={`flex-1 py-1.5 text-sm rounded-lg border transition-all ${
                language === lang
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {lang === 'zh' ? '中文' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {/* 字体选择 */}
      <div>
        <div className="text-xs text-slate-500 mb-2">字体</div>
        <div className="space-y-1.5">
          {fonts.map((f) => (
            <button
              key={f.id}
              onClick={() => updateMeta({ font: f.id })}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-sm transition-all ${
                font === f.id
                  ? 'bg-blue-50 border-blue-400 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="w-6 h-6 bg-slate-100 rounded text-center text-sm leading-6 font-medium">
                {f.preview}
              </span>
              <span className="text-xs">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 字号 */}
      <div>
        <SliderField
          label="字号"
          value={fontSize}
          min={80}
          max={120}
          step={5}
          displayValue={`${fontSize}%`}
          onChange={(v) => updateMeta({ fontSize: v })}
        />
        <div className="flex gap-2 mt-2">
          {([['小', 85], ['标准', 100], ['大', 115]] as const).map(([label, val]) => (
            <button
              key={label}
              onClick={() => updateMeta({ fontSize: val })}
              className={`flex-1 text-xs py-1 rounded border transition-all ${
                fontSize === val
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FontPanel;
