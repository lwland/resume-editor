import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUIStore } from '../../../store/uiStore';
import { useResumeStore } from '../../../store/resumeStore';
import ModuleList from './ModuleList';
import ProfileEditor from './ProfileEditor';
import EducationEditor from './EducationEditor';
import ExperienceEditor from './ExperienceEditor';
import SkillsEditor from './SkillsEditor';
import ProjectEditor from './ProjectEditor';
import AwardEditor from './AwardEditor';
import SummaryEditor from './SummaryEditor';

const MODULE_LABELS: Record<string, string> = {
  profile: '基本信息',
  education: '教育背景',
  experience: '工作经历',
  internship: '实习经历',
  skills: '专业技能',
  project: '项目经历',
  award: '荣誉证书',
  summary: '自我评价',
  custom: '自定义模块',
};

const EditPanel: React.FC = () => {
  const { activeModuleId, isEditPanelCollapsed, toggleEditPanel } = useUIStore();
  const { data } = useResumeStore();

  const activeModule = data.modules.find((m) => m.id === activeModuleId);
  const activeLabelKey = activeModuleId === 'profile' ? 'profile' : activeModule?.type ?? '';
  const activeLabel = MODULE_LABELS[activeLabelKey] ?? '编辑';

  const renderEditor = () => {
    if (activeModuleId === 'profile') {
      return <ProfileEditor />;
    }
    if (!activeModule) return null;

    switch (activeModule.type) {
      case 'education':
        return <EducationEditor moduleId={activeModule.id} />;
      case 'experience':
      case 'internship':
        return <ExperienceEditor moduleId={activeModule.id} />;
      case 'skills':
        return <SkillsEditor moduleId={activeModule.id} />;
      case 'project':
        return <ProjectEditor moduleId={activeModule.id} />;
      case 'award':
        return <AwardEditor moduleId={activeModule.id} />;
      case 'summary':
      case 'custom':
        return <SummaryEditor moduleId={activeModule.id} />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col bg-white border-l border-slate-200 transition-all duration-300 relative"
      style={{ width: isEditPanelCollapsed ? '0px' : '340px', flexShrink: 0, overflow: 'hidden' }}
    >
      {/* 折叠/展开按钮 */}
      <button
        onClick={toggleEditPanel}
        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-6 h-12 bg-white border border-slate-200 rounded-l-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
        title={isEditPanelCollapsed ? '展开编辑面板' : '收起编辑面板'}
      >
        {isEditPanelCollapsed ? <ChevronLeft size={12} /> : <ChevronRight size={12} />}
      </button>

      {!isEditPanelCollapsed && (
        <>
          {/* 模块管理列表（上半部分） */}
          <div className="border-b border-slate-100 overflow-y-auto" style={{ maxHeight: '240px', minHeight: '180px' }}>
            <ModuleList />
          </div>

          {/* 内容编辑区（下半部分） */}
          <div className="flex-1 overflow-y-auto">
            {/* 编辑区标题 */}
            <div className="sticky top-0 bg-white border-b border-slate-100 px-4 py-2.5 z-10">
              <span className="text-sm font-semibold text-slate-700">{activeLabel}</span>
            </div>

            {/* 编辑器内容 */}
            {renderEditor()}
          </div>
        </>
      )}
    </div>
  );
};

export default EditPanel;
