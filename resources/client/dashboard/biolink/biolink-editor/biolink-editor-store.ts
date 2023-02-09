import create from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {Biolink, BiolinkAppearance} from '@app/dashboard/biolink/biolink';

interface BiolinkEditorState {
  appearance: BiolinkAppearance | null;
  appearanceIsDirty: boolean;
  setAppearanceIsDirty: (isDirty: boolean) => void;
  biolink: Omit<Biolink, 'appearance'> | null;
  updateAppearance: (payload: BiolinkAppearance) => void;
  setBiolink: (biolink: Biolink) => void;
}

export const useBiolinkEditorStore = create<BiolinkEditorState>()(
  immer((set, get) => ({
    appearance: null,
    appearanceIsDirty: false,
    setAppearanceIsDirty: (isDirty: boolean) => {
      set(state => {
        state.appearanceIsDirty = isDirty;
      });
    },
    biolink: null,
    setBiolink: biolink => {
      set(state => {
        state.biolink = biolink;
        // don't override user appearance changes in the editor when biolink reloads from backend
        if (!state.appearanceIsDirty) {
          state.appearance = biolink.appearance?.config || null;
        }
      });
    },
    updateAppearance(payload: BiolinkAppearance) {
      set(state => {
        state.appearanceIsDirty = true;
        state.appearance = {
          ...state.appearance,
          ...payload,
        };
      });
    },
  }))
);

export function biolinkEditorState() {
  return useBiolinkEditorStore.getState();
}
