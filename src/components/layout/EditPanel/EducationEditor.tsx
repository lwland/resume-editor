import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { EducationItem } from '../../../types/resume';

const EducationEditor: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { data, addModuleItem, updateModuleItem, deleteModuleItem } = useResumeStore();
  const module = data.modules.find((m) => m.id === moduleId);
  const items = module && 'items' in module ? (module as any).items as EducationItem[] : [];
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id ?? null);

  const addItem = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '本科',
      major: '',
      startDate: '',
      endDate: '',
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
            className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <span className="text-sm font-medium text-slate-700">{item.school || '新增教育经历'}</span>
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
                <label className="block text-xs text-slate-500 mb-1">学校名称</label>
                <input className={inputClass} value={item.school} placeholder="学校名称" onChange={(e) => updateModuleItem(moduleId, item.id, { school: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">学历</label>
                  <select className={inputClass} value={item.degree} onChange={(e) => updateModuleItem(moduleId, item.id, { degree: e.target.value })}>
                    <option>专科</option>
                    <option>本科</option>
                    <option>硕士</option>
                    <option>博士</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">专业</label>
                  <input className={inputClass} value={item.major} placeholder="专业名称" onChange={(e) => updateModuleItem(moduleId, item.id, { major: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">入学时间</label>
                  <input className={inputClass} type="month" value={item.startDate} onChange={(e) => updateModuleItem(moduleId, item.id, { startDate: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">毕业时间</label>
                  <input className={inputClass} type="month" value={item.endDate} onChange={(e) => updateModuleItem(moduleId, item.id, { endDate: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">备注（成绩、荣誉等）</label>
                <input className={inputClass} value={item.description ?? ''} placeholder="如：GPA 3.8/4.0" onChange={(e) => updateModuleItem(moduleId, item.id, { description: e.target.value })} />
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
        <span>添加教育经历</span>
      </button>
    </div>
  );
};

export default EducationEditor;
