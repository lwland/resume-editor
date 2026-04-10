import { useResumeStore } from '../store/resumeStore';
import { ResumeData } from '../types/resume';

/** 简历档案文件的版本号，方便未来做兼容处理 */
const ARCHIVE_VERSION = 1;

interface ResumeArchive {
  version: number;
  exportedAt: string;
  data: ResumeData;
}

export const useResumeArchive = () => {
  const { data, resetToData } = useResumeStore();

  /** 导出当前简历为 .resume.json 文件 */
  const exportArchive = () => {
    const archive: ResumeArchive = {
      version: ARCHIVE_VERSION,
      exportedAt: new Date().toISOString(),
      data,
    };

    const json = JSON.stringify(archive, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.profile.name || '我的简历'}-${
      new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')
    }.resume.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /** 从 .resume.json 文件导入并恢复简历 */
  const importArchive = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.resume.json';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const raw = ev.target?.result as string;
          const parsed = JSON.parse(raw) as ResumeArchive;

          // 基础校验
          if (!parsed.data || !parsed.data.meta || !parsed.data.profile) {
            alert('文件格式不正确，请选择有效的简历档案文件（.resume.json）');
            return;
          }

          // 版本兼容提示（预留）
          if (parsed.version && parsed.version > ARCHIVE_VERSION) {
            if (!window.confirm('此档案由更新版本生成，可能存在兼容性问题，是否继续导入？')) {
              return;
            }
          }

          resetToData(parsed.data);
          alert(`已成功恢复「${parsed.data.profile.name || '未命名'}」的简历档案`);
        } catch {
          alert('文件解析失败，请确认文件完整且未被修改');
        }
      };

      reader.readAsText(file, 'utf-8');
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  return { exportArchive, importArchive };
};
