<script setup lang="ts">
import { twMerge } from 'tailwind-merge'

type Prop = {
   title: string
}

const props = withDefaults(defineProps<Prop>(), {
   title: ''
})

const computedClass = computed(() => {
   const attrs = useAttrs()
   return twMerge([
      'flex gap-4 items-center mb-4',
      typeof attrs.class === 'string' && attrs.class
   ])
})
</script>

<template>
   <div :class="computedClass">
      <BaseHeading
         as="h1"
         size="xl"
         weight="semibold"
         lead="normal"
      >
         {{ props.title }}
      </BaseHeading>

      <div class="flex-1 flex justify-end">
         <slot name="action" />
      </div>
   </div>
</template>
