import { Check } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { TEMPLATES } from '../../../templates/registry';

const TemplatePanel: React.FC = () => {
  const { data, updateMeta } = useResumeStore();
  const currentTemplateId = data.meta.templateId;

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">选择模板</h3>
      <div className="grid grid-cols-2 gap-3">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => updateMeta({ templateId: tpl.id })}
            className={`relative rounded-lg overflow-hidden border-2 transition-all text-left ${
              currentTemplateId === tpl.id
                ? 'border-blue-500 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* 模板缩略图占位 */}
            <div
              className="w-full flex items-center justify-center"
              style={{
                height: '110px',
                background: tpl.id === 'dark-tech' ? '#0f172a' : tpl.id === 'minimal-gray' ? '#f9fafb' : '#f0f7ff',
                fontSize: '11px',
                color: tpl.id === 'dark-tech' ? '#94a3b8' : '#64748b',
              }}
            >
              <div className="text-center px-2">
                <div className="font-bold mb-1" style={{ color: tpl.id === 'dark-tech' ? '#e2e8f0' : '#1e293b' }}>
                  {tpl.name}
                </div>
                <div className="text-[10px] leading-tight opacity-70">{tpl.description}</div>
              </div>
            </div>
            {/* 选中标记 */}
            {currentTemplateId === tpl.id && (
              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={12} className="text-white" />
              </div>
            )}
            <div className="px-2 py-1.5 bg-white border-t border-slate-100">
              <span className="text-xs font-medium text-slate-700">{tpl.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplatePanel;
