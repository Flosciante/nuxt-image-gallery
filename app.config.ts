export default defineAppConfig({
  ui: {
    primary: 'white',
    gray: 'zinc',
    button: {
      color: {
        gray: {
          ghost: 'text-gray-400 bg-gray-900 ring-1 ring-gray-400 rounded-full hover:ring-gray-200 hover:text-gray-200 hover:bg-gray-900 transition-hover duration-200'
        },
        green: {
          ghost: 'text-green-400 bg-gray-900 ring-1 ring-green-400 rounded-full hover:ring-green-300 hover:text-green-300 hover:bg-gray-900 transition-hover duration-200'
        },
        red: {
          ghost: 'text-red-400 bg-gray-900 ring-1 ring-red-400 rounded-full hover:ring-red-300 hover:text-red-300 hover:bg-gray-900 transition-hover duration-200'
        }
      }
    },
    tooltip: {
      background: 'bg-gray-900',
      color: 'text-gray-200',
      ring: 'ring-1 ring-gray-800'
    },
    slideover: {
      background: '',
      base: 'flex-1 flex flex-col w-full focus:outline-none',
      overlay: {
        background: 'bg-gray-200/75 dark:bg-gray-800/50 backdrop-blur-md'
      }
    },
    range: {
      thumb: {
        color: 'dark:text-gray-100'
      },
      progress: {
        color: 'dark:text-gray-100',
        rounded: 'rounded-s-lg',
        background: 'bg-gray-500 dark:bg-gray-100'
      }
    }
  }
})
