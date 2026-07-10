import { create } from "zustand";

interface UIState {
  isSidebarOpen: boolean;
  activeModal: string | null;
  toggleSidebar: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUiStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  activeModal: null,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
}));