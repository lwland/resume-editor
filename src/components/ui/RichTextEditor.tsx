import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: placeholder ?? '请输入内容...' }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `p-1.5 rounded transition-colors ${
      active ? 'bg-blue-100 text-blue-600' : 'text-slate-500 hover:bg-slate-100'
    }`;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="flex gap-0.5 p-1.5 border-b border-slate-100 bg-slate-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive('bold'))}
          title="加粗"
        >
          <Bold size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive('italic'))}
          title="斜体"
        >
          <Italic size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive('bulletList'))}
          title="无序列表"
        >
          <List size={14} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={btnClass(editor.isActive('orderedList'))}
          title="有序列表"
        >
          <ListOrdered size={14} />
        </button>
      </div>
      {/* 编辑区 */}
      <div className="p-3 min-h-[80px] text-sm text-slate-700">
        <EditorContent editor={editor} className="tiptap-editor" />
      </div>
    </div>
  );
};

export default RichTextEditor;
