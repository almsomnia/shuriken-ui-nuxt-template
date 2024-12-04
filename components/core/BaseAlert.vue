<template>
   <Transition @enter="(e) => $transitionFadeIn(e as HTMLElement)" @leave="(e) => $transitionFadeOut(e as HTMLElement)">
      <BaseMessage
         v-if="model"
         icon
         rounded="md"
         :color="props.severity"
      >
         {{ props.message }}
      </BaseMessage>
   </Transition>
</template>

<script setup lang="ts">
type Props = {
   message: string
   severity: "default" | "primary" | "success" | "info" | "warning" | "danger" | "muted" | "default-contrast" | "muted-contrast" | undefined
}

const props = withDefaults(defineProps<Props>(), {
   severity: "default"
})

const model = defineModel<boolean>({ required: true })
</script>
