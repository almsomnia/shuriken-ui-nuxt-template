<script setup lang="ts">
type Prop = {
   accept?: string
   error?: string
}

const props = withDefaults(defineProps<Prop>(), {
   accept: undefined,
})

const model = defineModel<FileList | null>({ required: true })
</script>

<template>
   <div class="flex flex-col">
      <BaseInputFileHeadless
         v-slot="{ open, remove, preview, drop, files }"
         v-model="model"
         :accept="props.accept"
      >
         <div
            role="button"
            tabindex="-1"
            class=""
            @dragenter.stop.prevent
            @dragover.stop.prevent
            @drop="drop"
         >
            <div
               v-if="!files?.length"
               class="nui-focus border-muted-300 dark:border-muted-700 hover:border-muted-400 focus:border-muted-400 dark:hover:border-muted-600 dark:focus:border-muted-700 group cursor-pointer rounded-lg border-[3px] border-dashed p-8 transition-colors duration-300"
               :class="{ '!border-danger-500': props.error }"
               tabindex="0"
               role="button"
               @click="open"
               @keydown.enter.prevent="open"
            >
               <div class="p-5 text-center">
                  <Icon
                     name="mdi-light:cloud-upload"
                     class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 mb-2 h-10 w-10 transition-colors duration-300"
                  />

                  <h4 class="text-muted-400 font-sans text-sm">Drop image to upload</h4>

                  <div>
                     <span class="text-muted-400 font-sans text-[0.7rem] font-semibold uppercase"> Or </span>
                  </div>

                  <label
                     for="file"
                     class="text-muted-400 group-hover:text-primary-500 group-focus:text-primary-500 cursor-pointer font-sans text-sm underline underline-offset-4 transition-colors duration-300"
                  >
                     Select image
                  </label>
               </div>
            </div>

            <ul
               v-else
               class="mt-6 space-y-2"
            >
               <li
                  v-for="file in files"
                  :key="file.name"
               >
                  <div
                     class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 relative flex items-center justify-end gap-2 rounded-xl border bg-white p-3"
                     :class="{ '!border-danger-500': props.error }"
                  >
                     <div class="flex-1 flex items-center gap-2">
                        <div class="shrink-0">
                           <img
                              v-if="file.type.startsWith('image')"
                              class="h-14 w-14 rounded-xl object-cover object-center"
                              :src="preview(file).value"
                              alt="Image preview"
                           />
                        </div>

                        <div class="font-sans">
                           <span class="text-muted-800 dark:text-muted-100 line-clamp-1 block text-sm">
                              {{ file.name }}
                           </span>

                           <span class="text-muted-400 block text-xs"> {{ file.size }} B </span>
                        </div>
                     </div>

                     <div class="flex gap-2">
                        <button
                           class="border-muted-200 hover:border-primary-500 text-muted-700 dark:text-muted-200 hover:text-primary-600 dark:border-muted-700 dark:bg-muted-900 dark:hover:border-primary-500 dark:hover:text-primary-600 relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors duration-300"
                           type="button"
                           tooltip="Remove"
                           @click.prevent="remove(file)"
                        >
                           <Icon
                              name="lucide:x"
                              class="h-4 w-4"
                           />

                           <span class="sr-only">Remove</span>
                        </button>
                     </div>
                  </div>
               </li>
            </ul>
         </div>
      </BaseInputFileHeadless>
      <BaseInputHelpText
         v-if="props.error"
         color="danger"
      >
         {{ props.error }}
      </BaseInputHelpText>
   </div>
</template>
