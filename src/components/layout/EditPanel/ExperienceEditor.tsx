import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { ExperienceItem } from '../../../types/resume';
import RichTextEditor from '../../ui/RichTextEditor';
import EndDatePicker from '../../ui/EndDatePicker';

const ExperienceEditor: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { data, addModuleItem, updateModuleItem, deleteModuleItem } = useResumeStore();
  const module = data.modules.find((m) => m.id === moduleId);
  const items = module && 'items' in module ? (module as any).items as ExperienceItem[] : [];
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id ?? null);

  const addItem = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      department: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    addModuleItem(moduleId, newItem);
    setExpanded(newItem.id);
  };

  const inputClass = "w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400";

  return (
    <div className="p-4 space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <span className="text-sm font-medium text-slate-700">{item.company || '新增经历'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); deleteModuleItem(moduleId, item.id); }}
                className="text-red-400 hover:text-red-500 p-0.5 rounded"
              >
                <Trash2 size={13} />
              </button>
              {expanded === item.id ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </div>
          </button>

          {expanded === item.id && (
            <div className="p-3 space-y-2.5 border-t border-slate-100">
              <div>
                <label className="block text-xs text-slate-500 mb-1">公司名称</label>
                <input className={inputClass} value={item.company} placeholder="公司名称" onChange={(e) => updateModuleItem(moduleId, item.id, { company: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">所在部门</label>
                <input className={inputClass} value={item.department ?? ''} placeholder="如：技术中台部、搜索推荐组" onChange={(e) => updateModuleItem(moduleId, item.id, { department: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">职位名称</label>
                <input className={inputClass} value={item.position} placeholder="如：Java 后端工程师" onChange={(e) => updateModuleItem(moduleId, item.id, { position: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">开始时间</label>
                  <input className={inputClass} type="month" value={item.startDate} onChange={(e) => updateModuleItem(moduleId, item.id, { startDate: e.target.value })} />
                </div>
                <div>
                  <EndDatePicker
                    value={item.endDate}
                    onChange={(val) => updateModuleItem(moduleId, item.id, { endDate: val })}
                    inputClass={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">工作描述</label>
                <RichTextEditor
                  value={item.description}
                  onChange={(html) => updateModuleItem(moduleId, item.id, { description: html })}
                  placeholder="描述工作职责和成果，建议使用条目列表..."
                />
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
      >
        <Plus size={14} />
        <span>添加经历</span>
      </button>
    </div>
  );
};

export default ExperienceEditor;
