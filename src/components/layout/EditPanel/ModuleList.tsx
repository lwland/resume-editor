import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { useResumeStore } from '../../../store/resumeStore';
import { useUIStore } from '../../../store/uiStore';
import { ResumeModule } from '../../../types/resume';

// 单个可排序模块行
const SortableModuleItem: React.FC<{
  module: ResumeModule;
  isActive: boolean;
  onClick: () => void;
  onToggleVisibility: (e: React.MouseEvent) => void;
}> = ({ module, isActive, onClick, onToggleVisibility }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all border ${
        isActive
          ? 'bg-blue-50 border-blue-200 text-blue-700'
          : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-600'
      } ${!module.visible ? 'opacity-50' : ''}`}
      onClick={onClick}
    >
      {/* 拖拽手柄 */}
      <button
        {...attributes}
        {...listeners}
        className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing flex-shrink-0 touch-none"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical size={14} />
      </button>

      {/* 模块名称 */}
      <span className="flex-1 text-sm font-medium truncate">{module.title}</span>

      {/* 显隐切换按钮 */}
      <button
        onClick={onToggleVisibility}
        className={`opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${
          module.visible ? 'text-slate-400 hover:text-slate-600' : 'text-slate-300 hover:text-slate-500'
        }`}
        title={module.visible ? '隐藏模块' : '显示模块'}
      >
        {module.visible ? <Eye size={14} /> : <EyeOff size={14} />}
      </button>
    </div>
  );
};

const ModuleList: React.FC = () => {
  const { data, reorderModules, toggleModuleVisibility } = useResumeStore();
  const { activeModuleId, setActiveModuleId } = useUIStore();
  const modules = [...data.modules].sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderModules(String(active.id), String(over.id));
    }
  };

  return (
    <div className="px-3 py-2">
      <div className="text-xs text-slate-400 px-1 mb-2 font-medium">拖拽排序 · 点击编辑</div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={modules.map((m) => m.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-1">
            {/* 基本信息（不可排序，固定在顶部） */}
            <div
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all border ${
                activeModuleId === 'profile'
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200 text-slate-600'
              }`}
              onClick={() => setActiveModuleId('profile')}
            >
              <div className="w-3.5 flex-shrink-0" />
              <span className="flex-1 text-sm font-medium">基本信息</span>
            </div>

            {modules.map((module) => (
              <SortableModuleItem
                key={module.id}
                module={module}
                isActive={activeModuleId === module.id}
                onClick={() => setActiveModuleId(module.id)}
                onToggleVisibility={(e) => {
                  e.stopPropagation();
                  toggleModuleVisibility(module.id);
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ModuleList;
