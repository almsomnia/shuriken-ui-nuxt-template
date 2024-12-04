<template>
   <div class="py-4 flex gap-4 justify-between items-center">
      <BaseBreadcrumb
         :items="props.breadcrumb"
         separator="dot"
         :classes="{ list: '!mb-0' }"
      />

      <BaseThemeToggle/>
   </div>
</template>

<script setup lang="ts">
type Prop = {
   breadcrumb: any[]
}

const props = defineProps<Prop>()
</script>
