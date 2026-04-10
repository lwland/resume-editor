import { useResumeStore } from '../../../store/resumeStore';
import { LayoutAlign, HeaderStyle } from '../../../types/resume';
import { getTemplate } from '../../../templates/registry';

const THEME_COLORS = [
  { value: '#2563eb', name: '蓝' },
  { value: '#f97316', name: '橙' },
  { value: '#16a34a', name: '绿' },
  { value: '#9333ea', name: '紫' },
  { value: '#dc2626', name: '红' },
  { value: '#0891b2', name: '青' },
  { value: '#6b7280', name: '灰' },
  { value: '#1e293b', name: '黑' },
];

const LAYOUTS: { id: LayoutAlign; label: string }[] = [
  { id: 'left', label: '居左' },
  { id: 'center', label: '居中' },
  { id: 'fill', label: '平铺' },
];

const HEADER_STYLES: { id: HeaderStyle; label: string }[] = [
  { id: 'icon', label: '图标' },
  { id: 'text', label: '文字' },
  { id: 'plain', label: '纯内容' },
];

const StylePanel: React.FC = () => {
  const { data, updateMeta } = useResumeStore();
  const { themeColor, layout, headerStyle, templateId } = data.meta;
  const currentTemplate = getTemplate(templateId);

  return (
    <div className="p-4 space-y-5">
      <h3 className="text-sm font-semibold text-slate-700">样式设置</h3>

      {/* 主题色 */}
      <div>
        <div className="text-xs text-slate-500 mb-2">主题色</div>
        <div className="flex flex-wrap gap-2">
          {THEME_COLORS.map((c) => (
            <button
              key={c.value}
              title={c.name}
              onClick={() => updateMeta({ themeColor: c.value })}
              className="relative w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{
                background: c.value,
                borderColor: themeColor === c.value ? c.value : 'transparent',
                boxShadow: themeColor === c.value ? `0 0 0 2px white, 0 0 0 4px ${c.value}` : 'none',
              }}
            >
              <span className="sr-only">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 布局对齐 */}
      <div>
        <div className="text-xs text-slate-500 mb-2">布局对齐</div>
        <div className="flex gap-2">
          {LAYOUTS.map((l) => (
            <button
              key={l.id}
              onClick={() => updateMeta({ layout: l.id })}
              className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${
                layout === l.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* 头部信息展示风格 */}
      <div>
        <div className="text-xs text-slate-500 mb-2">信息展示</div>
        <div className="flex gap-2">
          {HEADER_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => updateMeta({ headerStyle: s.id })}
              className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${
                headerStyle === s.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 当前模板信息 */}
      <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
        <div className="text-xs text-slate-500 mb-1">当前模板</div>
        <div className="text-sm font-medium text-slate-700">{currentTemplate.name}</div>
        <div className="text-xs text-slate-400 mt-1 leading-relaxed">{currentTemplate.description}</div>
      </div>
    </div>
  );
};

export default StylePanel;
