import { useUIStore } from '../../../store/uiStore';
import TemplatePanel from './TemplatePanel';
import FontPanel from './FontPanel';
import StylePanel from './StylePanel';
import SpacingPanel from './SpacingPanel';

const SettingsPanel: React.FC = () => {
  const { leftPanelTab } = useUIStore();

  if (!leftPanelTab) return null;

  return (
    <div
      className="bg-white border-r border-slate-200 overflow-y-auto"
      style={{ width: '300px', flexShrink: 0 }}
    >
      {leftPanelTab === 'template' && <TemplatePanel />}
      {leftPanelTab === 'font' && <FontPanel />}
      {leftPanelTab === 'style' && <StylePanel />}
      {leftPanelTab === 'spacing' && <SpacingPanel />}
    </div>
  );
};

export default SettingsPanel;
