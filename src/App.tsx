import Header from './components/layout/Header';
import LeftToolbar from './components/layout/LeftToolbar';
import SettingsPanel from './components/layout/SettingsPanel';
import PreviewCanvas from './components/layout/PreviewCanvas';
import EditPanel from './components/layout/EditPanel';
import { useResumeExport } from './hooks/useResumeExport';
import { useResumeArchive } from './hooks/useResumeArchive';

function App() {
  const { previewRef, exportPDF, exporting } = useResumeExport();
  const { exportArchive, importArchive } = useResumeArchive();

  return (
    <div className="flex flex-col" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* 顶部导航栏 */}
      <Header
        onExport={exportPDF}
        exporting={exporting}
        onSaveArchive={exportArchive}
        onImportArchive={importArchive}
      />

      {/* 主体区域 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧竖向工具栏 */}
        <LeftToolbar />

        {/* 左侧设置面板（按需展开） */}
        <SettingsPanel />

        {/* 中间简历预览区 */}
        <PreviewCanvas previewRef={previewRef} />

        {/* 右侧编辑面板 */}
        <EditPanel />
      </div>
    </div>
  );
}

export default App;
