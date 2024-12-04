<template>
   <aside class="z-50 p-4">
      <div
         class="h-full flex flex-col rounded-xl shadow-md border bg-white border-muted-200 text-muted-700 dark:bg-muted-800 dark:border-muted-700 dark:text-muted-100 dark:shadow-muted-800/50"
         :class="[collapsed ? 'w-16' : 'w-64']"
      >
         <slot name="prefix" />

         <nav class="flex-1 p-4 space-y-2">
            <template
               v-for="item in menuItems"
               :key="item.label"
            >
               <template v-if="item.children && item.children.length > 0">
                  <div
                     class="flex gap-4 items-center p-2 rounded-lg text-sm cursor-pointer hover:bg-muted-100 dark:hover:bg-muted-700/60"
                     :class="{
                        'bg-primary-50 text-primary-500 border-s-2 border-primary-500 dark:text-primary-400 dark:font-medium dark:bg-primary-600/15 dark:border-primary-500 hover:!bg-primary-200/50 dark:hover:!bg-primary-600/25':
                           item.children.map(ch => ch.to).includes($route.path),
                     }"
                     @click="toggleMenu(item.label)"
                  >
                     <div class="flex gap-4 items-center">
                        <Icon :name="item.icon"/>
                        {{ item.label }}
                     </div>

                     <div class="flex-1 flex justify-end">
                           <Icon
                              name="lucide:chevron-down"
                              class="transition-transform duration-300"
                              :class="{ '-rotate-180': openMenu.includes(item.label) }"
                           />
                     </div>
                  </div>
                  <transition
                     @enter="onTransitionEnter"
                     @leave="onTransitionLeave"
                  >
                     <div
                        v-if="openMenu.includes(item.label)"
                        class="rounded-lg outline-dashed outline-2 outline-offset-2 outline-muted-200 space-y-2 p-2 mx-1 overflow-hidden dark:outline-muted-600/50"
                     >
                        <template
                           v-for="child in item.children"
                           :key="child.label"
                        >
                           <NuxtLink
                              :to="child.to"
                              class="flex gap-4 items-center p-2 rounded-lg text-sm hover:bg-muted-100 dark:hover:bg-muted-700/60"
                              :class="{
                                 'bg-primary-50 text-primary-500 dark:text-primary-400 dark:font-medium dark:bg-primary-600/15 dark:border-primary-500 hover:!bg-primary-200/50 dark:hover:!bg-primary-600/25':
                                    child.to === $route.path,
                              }"
                           >
                              <Icon :name="child.icon" />
                              {{ child.label }}
                           </NuxtLink>
                        </template>
                     </div>
                  </transition>
               </template>
               <NuxtLink
                  v-else
                  :to="item.to"
                  class="flex gap-4 items-center p-2 rounded-lg text-sm hover:bg-muted-100 dark:hover:bg-muted-700/60"
                  :class="{
                     'bg-primary-50 text-primary-500 border-s-2 border-primary-500 dark:text-primary-400 dark:font-medium dark:bg-primary-600/15 dark:border-primary-500 hover:!bg-primary-200/50 dark:hover:!bg-primary-600/25':
                        item.to === $route.path,
                  }"
               >
                  <Icon :name="item.icon" />
                  {{ item.label }}
               </NuxtLink>
            </template>
         </nav>

         <slot name="suffix"/>
      </div>
   </aside>
</template>

<script setup lang="ts">
const menuItems = useAppConfig().sidebar.routes
const collapsed = ref(false)
const openMenu = ref<string[]>([])

function toggleMenu(menuName: string) {
   if (openMenu.value.includes(menuName)) {
      openMenu.value = openMenu.value.filter((item) => item !== menuName)
      return
   }

   openMenu.value.push(menuName)
}

function onTransitionEnter(el: Element) {
   $transitionSlideDown(el as HTMLElement)
}

function onTransitionLeave(el: Element) {
   $transitionSlideUp(el as HTMLElement)
}
</script>
