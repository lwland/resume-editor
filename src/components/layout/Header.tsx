import { FC } from 'react';
import { Download, FileText, Loader2, Save, FolderOpen } from 'lucide-react';

interface HeaderProps {
  onExport: () => void;
  exporting?: boolean;
  onSaveArchive: () => void;
  onImportArchive: () => void;
}

const Header: FC<HeaderProps> = ({ onExport, exporting, onSaveArchive, onImportArchive }) => {
  return (
    <header
      className="flex items-center justify-between px-5 bg-slate-800 shadow-sm"
      style={{ height: '56px', flexShrink: 0 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
          <FileText size={16} className="text-white" />
        </div>
        <span className="text-white font-semibold text-base tracking-wide">简历编辑器</span>
      </div>

      {/* 右侧操作区 */}
      <div className="flex items-center gap-2">
        {/* 导入档案 */}
        <button
          onClick={onImportArchive}
          className="flex items-center gap-1.5 bg-slate-600 hover:bg-slate-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          title="导入 .resume.json 档案文件恢复简历"
        >
          <FolderOpen size={14} />
          <span>导入档案</span>
        </button>

        {/* 保存档案 */}
        <button
          onClick={onSaveArchive}
          className="flex items-center gap-1.5 bg-slate-600 hover:bg-slate-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
          title="将当前简历保存为 .resume.json 档案文件"
        >
          <Save size={14} />
          <span>保存档案</span>
        </button>

        {/* 分隔线 */}
        <div className="w-px h-5 bg-slate-600" />

        {/* 下载 PDF */}
        <button
          onClick={onExport}
          disabled={exporting}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-colors"
        >
          {exporting ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <Download size={15} />
          )}
          <span>{exporting ? '生成中...' : '下载 PDF'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
