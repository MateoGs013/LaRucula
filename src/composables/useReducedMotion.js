import { onMounted, onUnmounted, ref } from 'vue';

const mediaQuery = '(prefers-reduced-motion: reduce)';

export function useReducedMotion() {
  const prefersReducedMotion = ref(false);
  let cleanup = () => {};

  onMounted(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const queryList = window.matchMedia(mediaQuery);
    const sync = (event) => {
      prefersReducedMotion.value = event.matches;
    };

    sync(queryList);

    if (queryList.addEventListener) {
      queryList.addEventListener('change', sync);
      cleanup = () => queryList.removeEventListener('change', sync);
      return;
    }

    queryList.addListener(sync);
    cleanup = () => queryList.removeListener(sync);
  });

  onUnmounted(() => {
    cleanup();
  });

  return prefersReducedMotion;
}
