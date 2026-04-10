import { Layout, Type, Palette, AlignJustify } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { LeftPanelTab } from '../../types/resume';

const tabs: { id: LeftPanelTab; icon: React.ReactNode; label: string }[] = [
  { id: 'template', icon: <Layout size={18} />, label: '模板' },
  { id: 'font', icon: <Type size={18} />, label: '文字' },
  { id: 'style', icon: <Palette size={18} />, label: '样式' },
  { id: 'spacing', icon: <AlignJustify size={18} />, label: '间距' },
];

const LeftToolbar: React.FC = () => {
  const { leftPanelTab, setLeftPanelTab } = useUIStore();

  return (
    <div className="flex flex-col items-center py-3 gap-1 bg-white border-r border-slate-200" style={{ width: '64px', flexShrink: 0 }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setLeftPanelTab(tab.id)}
          className={`flex flex-col items-center gap-1 w-12 py-2 rounded-lg transition-all text-xs ${
            leftPanelTab === tab.id
              ? 'bg-blue-50 text-blue-600'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          {tab.icon}
          <span className="text-[10px] font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default LeftToolbar;
