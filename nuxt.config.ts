import { createResolver } from "@nuxt/kit"
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
   devtools: { enabled: false },

   components: [
      {
         prefix: '',
         path: resolve('./components/core'),
         global: false
      },
      {
         prefix: '',
         path: resolve('./components/layouts'),
         global: false
      }
   ],

   dir: {
      assets: resolve('./assets')
   }
})
