import { useResumeStore } from '../../../store/resumeStore';
import RichTextEditor from '../../ui/RichTextEditor';

const SummaryEditor: React.FC<{ moduleId: string }> = ({ moduleId }) => {
  const { data, updateModule } = useResumeStore();
  const module = data.modules.find((m) => m.id === moduleId);
  const content = module && 'content' in module ? (module as any).content as string : '';

  return (
    <div className="p-4">
      <RichTextEditor
        value={content}
        onChange={(html) => updateModule(moduleId, { content: html } as any)}
        placeholder="描述你的个人特点、核心竞争力..."
      />
    </div>
  );
};

export default SummaryEditor;
