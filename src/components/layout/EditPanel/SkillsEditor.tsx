import { Plus, Trash2 } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { SkillItem } from '../../../types/resume';

const SkillsEditor: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { data, addModuleItem, updateModuleItem, deleteModuleItem } = useResumeStore();
  const module = data.modules.find((m) => m.id === moduleId);
  const items = module && 'items' in module ? (module as any).items as SkillItem[] : [];

  const addItem = () => {
    addModuleItem(moduleId, { id: `skill-${Date.now()}`, name: '', level: 3 });
  };

  const inputClass = "flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200";

  return (
    <div className="p-4 space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <input
            className={inputClass}
            value={item.name}
            placeholder="技能名称"
            onChange={(e) => updateModuleItem(moduleId, item.id, { name: e.target.value })}
          />
          {/* 等级 */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                onClick={() => updateModuleItem(moduleId, item.id, { level: i + 1 })}
                className={`w-4 h-4 rounded-full border transition-all ${
                  (item.level ?? 0) > i
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-white border-slate-300 hover:border-blue-400'
                }`}
              />
            ))}
          </div>
          <button onClick={() => deleteModuleItem(moduleId, item.id)} className="text-red-400 hover:text-red-500 flex-shrink-0">
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button
        onClick={addItem}
        className="w-full flex items-center justify-center gap-2 py-2 text-sm text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors mt-2"
      >
        <Plus size={14} />
        <span>添加技能</span>
      </button>
    </div>
  );
};

export default SkillsEditor;
