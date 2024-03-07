export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'zinc',
    button: {
      color: {
        gray: {
          ghost: 'text-gray-400 bg-gray-900 ring-1 ring-gray-400 rounded-full hover:ring-gray-200 hover:text-gray-200 hover:bg-gray-900 transition-hover duration-200',
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
