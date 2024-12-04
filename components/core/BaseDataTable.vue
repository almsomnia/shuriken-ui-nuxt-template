<script setup lang="ts" generic="T extends Record<string, unknown>[] | undefined">
import NotFound1 from '~assets/svg/not-found-1.svg'

type Prop = {
   data: T
   columns: {
      title?: string
      key: string
      colSpan?: number
   }[]
   total: number | undefined
   loading: boolean
}

const props = withDefaults(defineProps<Prop>(), {
   data: undefined,
   total: 0,
})

const page = defineModel<number>("page", { required: true })
const perPage = defineModel<number>("perPage", { required: true })
const search = defineModel<string | undefined>("search", { required: false })

const perPageOptions = [5, 10, 20, 50, 100]
const isSearchEnabled = computed(() => search.value !== undefined)

function showData(item: NonNullable<T>[number], column: Prop['columns'][number]) {
   if (column.key.includes(".")) {
      const keys = column.key.split(".")
      return keys.reduce((item, key) => item[key] as never, item)
   }
   return item[column.key]
}
</script>

<template>
   <div>
      <div class="w-full">
         <div class="flex flex-col">
            <div class="flex items-center gap-4 mb-2">
               <slot name="header">
                  <BaseInput
                     v-if="isSearchEnabled"
                     v-model="search"
                     icon="lucide:search"
                     placeholder="Search..."
                  />
               </slot>

               <div class="flex-1 flex justify-end">
                  <BaseSelect v-model="perPage">
                     <option
                        v-for="option in perPageOptions"
                        :value="option"
                     >
                        {{ option }} per page
                     </option>
                  </BaseSelect>
               </div>
            </div>

            <BaseProgress
               v-if="props.loading"
               size="xs"
               rounded="sm"
               class="mb-2"
            />

            <div v-else class="mb-3"></div>

            <div class="mb-4 border-muted-200 dark:border-muted-700 border rounded-md transition-colors duration-300 overflow-x-auto">
               <div class="inline-block min-w-full align-middle">
                  <div>
                     <table class="divide-muted-200 dark:divide-muted-700 min-w-full table-fixed divide-y transition-colors duration-300">
                        <thead>
                           <tr>
                              <template v-for="column in props.columns">
                                 <th class="text-muted-700 dark:text-muted-400 text-left font-sans font-semibold tracking-wider text-xs uppercase dark:bg-muted-800 bg-white px-4 py-5 p-4 transition-colors duration-300">
                                    {{ column.title }}
                                 </th>
                              </template>
                           </tr>
                        </thead>
                        <tbody class="divide-muted-200 dark:divide-muted-700 dark:bg-muted-800 divide-y bg-white transition-colors duration-300">
                           <template v-if="props.data && props.data.length > 0">
                              <template
                                 v-for="(item, index) in props.data"
                                 :key="index"
                              >
                                 <tr class="hover:bg-muted-50 dark:hover:bg-muted-900 transition-colors duration-300">
                                    <td
                                       v-for="column in props.columns"
                                       class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-muted-100 p-4"
                                    >
                                       <div class="flex items-center">
                                          <slot
                                             :name="`row.${column.key}`"
                                             :value="showData(item, column) as any"
                                             :data="item"
                                             :column="column"
                                          >
                                             {{ showData(item, column) }}
                                          </slot>
                                       </div>
                                    </td>
                                 </tr>
                              </template>
                           </template>
                           <template v-else>
                              <tr class="" v-if="!props.loading">
                                 <td class="font-alt whitespace-nowrap text-sm text-muted-800 dark:text-muted-100 p-4" colspan="100%">
                                    <BasePlaceholderPage
                                       title="No data found"
                                    >
                                       <template #image>
                                          <img :src="NotFound1" alt="" class="dark:invert">
                                       </template>
                                    </BasePlaceholderPage>
                                 </td>
                              </tr>
                           </template>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            <BasePagination
               class="col-span-4 col-start-9"
               :classes="{ list: '!bg-transparent !border-0', buttons: '!bg-transparent !border-0', button: '!border' }"
               :item-per-page="perPage"
               :total-items="props.total"
               v-model:current-page="page"
               :max-link-displayed="5"
            />
         </div>
      </div>
   </div>
</template>
