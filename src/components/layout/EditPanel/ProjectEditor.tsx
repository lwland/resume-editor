import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { ProjectItem } from '../../../types/resume';
import EndDatePicker from '../../ui/EndDatePicker';
import RichTextEditor from '../../ui/RichTextEditor';

const ProjectEditor: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { data, addModuleItem, updateModuleItem, deleteModuleItem } = useResumeStore();
  const module = data.modules.find((m) => m.id === moduleId);
  const items = module && 'items' in module ? (module as any).items as ProjectItem[] : [];
  const [expanded, setExpanded] = useState<string | null>(items[0]?.id ?? null);

  const addItem = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      techStack: '',
      description: '',
      responsibilities: '',
    };
    addModuleItem(moduleId, newItem);
    setExpanded(newItem.id);
  };

  const inputClass =
    'w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400';

  return (
    <div className="p-4 space-y-3">
      {items.map((item) => (
        <div key={item.id} className="border border-slate-200 rounded-lg overflow-hidden">
          {/* 折叠头 */}
          <button
            className="w-full flex items-center justify-between px-3 py-2.5 bg-slate-50 hover:bg-slate-100"
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <span className="text-sm font-medium text-slate-700">{item.name || '新增项目'}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); deleteModuleItem(moduleId, item.id); }}
                className="text-red-400 hover:text-red-500 p-0.5 rounded"
              >
                <Trash2 size={13} />
              </button>
              {expanded === item.id
                ? <ChevronUp size={14} className="text-slate-400" />
                : <ChevronDown size={14} className="text-slate-400" />}
            </div>
          </button>

          {/* 展开内容 */}
          {expanded === item.id && (
            <div className="p-3 space-y-2.5 border-t border-slate-100">
              {/* 项目名称 */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">项目名称</label>
                <input
                  className={inputClass}
                  value={item.name}
                  placeholder="项目名称"
                  onChange={(e) => updateModuleItem(moduleId, item.id, { name: e.target.value })}
                />
              </div>

              {/* 担任角色 */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">担任角色</label>
                <input
                  className={inputClass}
                  value={item.role}
                  placeholder="如：项目负责人、前端开发"
                  onChange={(e) => updateModuleItem(moduleId, item.id, { role: e.target.value })}
                />
              </div>

              {/* 时间区间 */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">开始时间</label>
                  <input
                    className={inputClass}
                    type="month"
                    value={item.startDate}
                    onChange={(e) => updateModuleItem(moduleId, item.id, { startDate: e.target.value })}
                  />
                </div>
                <div>
                  <EndDatePicker
                    value={item.endDate}
                    onChange={(val) => updateModuleItem(moduleId, item.id, { endDate: val })}
                    inputClass={inputClass}
                  />
                </div>
              </div>

              {/* 技术栈 */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">技术栈</label>
                <input
                  className={inputClass}
                  value={item.techStack}
                  placeholder="如：React / Node.js / MySQL"
                  onChange={(e) => updateModuleItem(moduleId, item.id, { techStack: e.target.value })}
                />
              </div>

              {/* 项目描述 */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">项目描述</label>
                <RichTextEditor
                  value={item.description}
                  onChange={(html) => updateModuleItem(moduleId, item.id, { description: html })}
                  placeholder="项目背景、目标、规模等简要介绍..."
                />
              </div>

              {/* 核心工作内容 */}
              <div>
                <label className="block text-xs text-slate-500 mb-1">核心工作内容</label>
                <RichTextEditor
                  value={item.responsibilities}
                  onChange={(html) => updateModuleItem(moduleId, item.id, { responsibilities: html })}
                  placeholder="描述你负责的具体工作、核心贡献和量化成果..."
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
        <Plus size={14} /><span>添加项目</span>
      </button>
    </div>
  );
};

export default ProjectEditor;
