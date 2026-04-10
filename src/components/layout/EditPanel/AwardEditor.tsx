import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { AwardItem } from '../../../types/resume';

const AwardEditor: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { data, addModuleItem, updateModuleItem, deleteModuleItem } = useResumeStore();
  const module = data.modules.find((m) => m.id === moduleId);
  const items = module && 'items' in module ? (module as any).items as AwardItem[] : [];
  const [expanded, setExpanded] = useState<string | null>(null);

  const addItem = () => {
    const newItem: AwardItem = { id: `award-${Date.now()}`, name: '', date: '' };
    addModuleItem(moduleId, newItem);
    setExpanded(newItem.id);
  };

  const inputClass = "w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400";

  return (
    <div className="p-4 space-y-2">
      {items.map((item) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <span className="text-sm font-medium text-slate-700 truncate">{item.name || '新增荣誉'}</span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={(e) => { e.stopPropagation(); deleteModuleItem(moduleId, item.id); }} className="text-red-400 hover:text-red-500"><Trash2 size={13} /></button>
              {expanded === item.id ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
            </div>
          </button>
          {expanded === item.id && (
            <div className="p-3 space-y-2.5 border-t border-slate-100">
              <div><label className="block text-xs text-slate-500 mb-1">荣誉/证书名称</label><input className={inputClass} value={item.name} placeholder="名称" onChange={(e) => updateModuleItem(moduleId, item.id, { name: e.target.value })} /></div>
              <div><label className="block text-xs text-slate-500 mb-1">获得时间</label><input className={inputClass} type="month" value={item.date} onChange={(e) => updateModuleItem(moduleId, item.id, { date: e.target.value })} /></div>
              <div><label className="block text-xs text-slate-500 mb-1">备注说明</label><input className={inputClass} value={item.description ?? ''} placeholder="如：全公司仅 5% 获此荣誉" onChange={(e) => updateModuleItem(moduleId, item.id, { description: e.target.value })} /></div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addItem} className="w-full flex items-center justify-center gap-2 py-2 text-sm text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
        <Plus size={14} /><span>添加荣誉证书</span>
      </button>
    </div>
  );
};

export default AwardEditor;
