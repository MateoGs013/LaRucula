<script setup>
import SectionHeading from '@/components/layout/SectionHeading.vue';
import PageShell from '@/components/layout/PageShell.vue';
import SectionShell from '@/components/layout/SectionShell.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
</script>

<template>
  <PageShell>
    <SectionShell>
      <div class="frame-soft p-6 md:p-8 lg:p-10">
        <SectionHeading
          eyebrow="404"
          title="This page is not part of the current dining route."
          lede="The route scaffold is working, but this destination does not exist yet."
          heading-tag="h1"
          size="compact"
          data-reveal
        >
          <BaseButton to="/" class="mt-4" data-reveal>
            Return home
          </BaseButton>
        </SectionHeading>
      </div>
    </SectionShell>
  </PageShell>
</template>
