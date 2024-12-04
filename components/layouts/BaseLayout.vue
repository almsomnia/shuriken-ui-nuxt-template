<template>
   <div class="relative min-h-screen bg-muted-50 dark:bg-muted-900 dark:text-muted-100">
      <BaseSidebar class="fixed inset-y-0" />
      <main class="ms-72 me-4 mb-4 relative z-10 min-h-[calc(100vh-1rem)]">
         <div class="pt-4">
            <BaseHeader class="mb-4" />
            <div class="min-h-full">
               <slot />
            </div>
         </div>
      </main>
   </div>
</template>