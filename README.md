## Shuriken UI Nuxt Template

This is an extendable Nuxt Layer built on top of [`@shuriken-ui/nuxt`](https://github.com/shuriken-ui/nuxt/), designed to provide a streamlined and customizable collection of components and templates for Nuxt 3 projects.

## Installation

```bash
pnpm install -D @almsomnia/shuriken-ui-nuxt-template
```

## Usage

```ts
// nuxt.config.ts
export default defineNuxtConfig({
   extends: [
      '@almsomnia/shuriken-ui-nuxt-template'
   ]
})
```
> **Note**: This is a [layer](https://nuxt.com/docs/getting-started/layers) and not a module, so you must extend your config with it.


## Configuration

> See [Shuriken UI documentation](https://shurikenui.com/docs/guide/theming/configuration) for more details.

```ts
// app.config.ts
export default defineAppConfig({
   /**
    * Shuriken UI layer configuration
    */
   nui: {
      /**
       * Set default properties for BaseButton component
       */
      BaseButton: {
         variant: 'pastel',
         rounded: 'md'
      },

      // ...
   }
})
```

## Contributing

Contributions are welcome! To contribute:

- Clone this [repository](https://github.com/almsomnia/shuriken-ui-nuxt-template).
- Install dependencies.
   ```bash
   pnpm install
   ```
- Make changes and ensure compability.
- Submit a pull request.

## License

This package is licensed under the [MIT License](https://mit-license.org/)

## Acknowledgement

This package is built on amazing [Shuriken UI](https://shurikenui.com/). Special thanks to the contributors and the community for their support.
