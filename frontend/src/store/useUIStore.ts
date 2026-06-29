import { create } from "zustand";

interface UIStore {
  isLoaded       : boolean;
  isMenuOpen     : boolean;
  isMobile       : boolean;
  activeProject  : string | null;
  setLoaded      : (v: boolean) => void;
  toggleMenu     : () => void;
  closeMenu      : () => void;
  setMobile      : (v: boolean) => void;
  setActiveProject: (id: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isLoaded       : false,
  isMenuOpen     : false,
  isMobile       : false,
  activeProject  : null,
  setLoaded      : (v) => set({ isLoaded: v }),
  toggleMenu     : () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu      : () => set({ isMenuOpen: false }),
  setMobile      : (v) => set({ isMobile: v }),
  setActiveProject: (id) => set({ activeProject: id }),
}));
