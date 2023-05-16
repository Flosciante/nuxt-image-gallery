export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'zinc',
    button: {
      rounded: 'rounded-full',
      default: {
        color: 'transparent'
      },
      color: {
        transparent: {
          solid: 'text-gray-900 dark:text-white ring-1 ring-inset ring-gray-900/30 dark:ring-white/30 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200',
        },
      }
    },
  }
})
