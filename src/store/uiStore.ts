import { create } from 'zustand';
import { LeftPanelTab } from '../types/resume';

interface UIStore {
  leftPanelTab: LeftPanelTab;
  activeModuleId: string | null;
  isEditPanelCollapsed: boolean;

  setLeftPanelTab: (tab: LeftPanelTab) => void;
  setActiveModuleId: (id: string | null) => void;
  toggleEditPanel: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  leftPanelTab: null,
  activeModuleId: 'profile',
  isEditPanelCollapsed: false,

  setLeftPanelTab: (tab) =>
    set((state) => ({
      leftPanelTab: state.leftPanelTab === tab ? null : tab,
    })),

  setActiveModuleId: (id) => set({ activeModuleId: id }),

  toggleEditPanel: () =>
    set((state) => ({ isEditPanelCollapsed: !state.isEditPanelCollapsed })),
}));
