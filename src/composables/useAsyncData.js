import { onMounted, ref } from 'vue';

export function useAsyncData(loader, options = {}) {
  const data = ref(options.initialValue ?? null);
  const loading = ref(Boolean(options.immediate));
  const error = ref(null);

  async function execute(...args) {
    loading.value = true;
    error.value = null;

    try {
      const result = await loader(...args);
      data.value = result;
      return result;
    } catch (err) {
      error.value = err;
      return data.value;
    } finally {
      loading.value = false;
    }
  }

  if (options.immediate) {
    onMounted(() => {
      void execute();
    });
  }

  return {
    data,
    loading,
    error,
    execute,
  };
}
