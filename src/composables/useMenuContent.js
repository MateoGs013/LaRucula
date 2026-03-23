import { computed, watch } from 'vue';

import { useAsyncData } from '@/composables/useAsyncData';
import { useLocale } from '@/composables/useLocale';
import { getMenuData, getMenuSnapshot } from '@/services/menuService';

export function useMenuContent() {
  const { locale } = useLocale();
  const initialMenu = getMenuSnapshot({ locale: locale.value });

  const { data, loading, error, execute } = useAsyncData(
    () => getMenuData({ locale: locale.value }),
    {
      initialValue: initialMenu,
      immediate: true,
    }
  );

  watch(
    locale,
    () => {
      void execute();
    },
    { flush: 'post' }
  );

  return {
    locale,
    menuData: computed(() => data.value ?? initialMenu),
    loading,
    error,
    reloadMenu: execute,
  };
}
