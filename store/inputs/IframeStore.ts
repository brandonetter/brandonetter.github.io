import { create } from 'zustand';

interface IframeState {
  html: string;
  ref?: HTMLIFrameElement;
  setRef: (ref: HTMLIFrameElement | undefined) => void;
  setHtml: (html: string) => void;
}

const useIframeStore = create<IframeState>(set => ({
  html: '',
  ref: undefined,
  setHtml: (html: string) => set({ html }),
  setRef: (ref: HTMLIFrameElement | undefined) => set({ ref }),
}));

export default useIframeStore;
