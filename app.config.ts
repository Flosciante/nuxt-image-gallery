export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'zinc',
    button: {
      default: {
        color: 'transparent',
      },
      color: {
        transparent: {
          solid: 'text-gray-900 dark:text-white ring-1 ring-inset ring-gray-900/30 dark:ring-white/30 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200',
        },
        green: {
          outline: 'ring-1 ring-inset ring-green-700/70 text-green-500 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950 focus-visible:ring-2 focus-visible:ring-green-500 dark:focus-visible:ring-green-400',
        },
      },
    },
    slideover: {
      background: '',
      base: 'flex-1 flex flex-col w-full focus:outline-none',
      overlay: {
        background: 'bg-gray-200/75 dark:bg-gray-800/50 backdrop-blur-md',
      },
    },
    range: {
      thumb: {
        color: 'dark:text-gray-100',
      },
      progress: {
        color: 'dark:text-gray-100',
        rounded: 'rounded-s-lg',
        background: 'bg-gray-500 dark:bg-gray-100',
      },
    },
  },
})
