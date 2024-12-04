<script setup lang="ts">
import { twMerge } from "tailwind-merge"

type Prop = {
   title: string
   persist?: boolean
   classes?: {
      width?: string
   }
}

type Emit = {
   (e: "close"): void
}

const props = withDefaults(defineProps<Prop>(), {
   title: "",
   persist: false,
})

const emit = defineEmits<Emit>()

const show = defineModel<boolean>({ required: true })
const keystrokeListener = ref<() => void>()

const widthClass = computed(() => twMerge([
   "min-w-64 max-w-7xl",
   props.classes?.width || ''
]))

watch(
   show,
   (value) => {
      if (value) {
         keystrokeListener.value = onKeyStroke("Escape", close)
      } else {
         keystrokeListener.value?.()
      }
   },
   { immediate: true }
)

function close() {
   show.value = false
   emit("close")
}

function handleCloseDialog(value: boolean) {
   if (props.persist) return
   show.value = value
}
</script>

<template>
   <HeadlessTransitionRoot
      :show="show"
      as="template"
   >
      <HeadlessDialog
         @close="handleCloseDialog"
         class="relative z-50"
      >
         <HeadlessTransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
         >
            <div
               class="fixed inset-0 bg-muted-950/50"
               aria-hidden="true"
            />
         </HeadlessTransitionChild>
         <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
            <div class="fixed inset-0 w-screen overflow-y-auto">
               <div class="flex min-h-full items-center justify-center p-4">
                  <HeadlessTransitionChild
                     enter="duration-300 ease-out"
                     enter-from="opacity-0 scale-95"
                     enter-to="opacity-100 scale-100"
                     leave="duration-200 ease-in"
                     leave-from="opacity-100 scale-100"
                     leave-to="opacity-0 scale-95"
                  >
                     <HeadlessDialogPanel
                        class="rounded-md border bg-muted-50 border-muted-300 dark:border-muted-700 dark:bg-muted-800 text-muted-800 dark:text-muted-100 shadow-2xl shadow-muted-950/60 relative"
                        :class="[widthClass]"
                     >
                        <BaseButtonClose
                           class="absolute top-0 right-0 mt-2.5 mr-2.5"
                           size="md"
                           @click="close"
                        />
                        <div class="p-6 pb-0">
                           <HeadlessDialogTitle
                              as="h3"
                              class="mb-4 text-lg font-semibold"
                           >
                              {{ props.title }}
                           </HeadlessDialogTitle>
                           <div class="text-sm leading-6">
                              <slot />
                           </div>
                        </div>
                        <div v-if="$slots.footer" class="px-6 py-4">
                           <div class="flex justify-end gap-2">
                              <slot name="footer" />
                           </div>
                        </div>
                     </HeadlessDialogPanel>
                  </HeadlessTransitionChild>
               </div>
            </div>
         </div>
      </HeadlessDialog>
   </HeadlessTransitionRoot>
</template>
