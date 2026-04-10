import { useResumeStore } from '../../../store/resumeStore';
import { SkillsModule } from '../../../types/resume';
import RichTextEditor from '../../ui/RichTextEditor';

const SkillsEditor: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { data, updateModule } = useResumeStore();
  const module = data.modules.find((m) => m.id === moduleId) as SkillsModule | undefined;
  if (!module) return null;

  return (
    <div className="p-4">
      <p className="text-xs text-slate-400 mb-2">
        支持有序/无序列表、加粗等格式，推荐按技能方向分类描述
      </p>
      <RichTextEditor
        value={module.content}
        onChange={(html) => updateModule(moduleId, { content: html } as any)}
        placeholder="如：&#10;• 编程语言：Java / Python / TypeScript，熟悉 JVM 调优&#10;• 框架：Spring Boot / React / Node.js&#10;• 数据库：MySQL / Redis / MongoDB"
      />
    </div>
  );
};

export default SkillsEditor;
