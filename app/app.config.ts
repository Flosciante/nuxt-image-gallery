export default defineAppConfig({
  ui: {
    colors: {
      neutral: 'zinc',
      primary: 'green'
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      },
      compoundVariants: [{
        color: 'gray',
        variant: 'ghost',
        class: 'text-gray-400 bg-gray-900 ring-1 ring-gray-400 rounded-full hover:ring-gray-200 hover:text-gray-200 hover:bg-gray-900 transition-hover duration-200'
      },
      {
        color: 'primary',
        variant: 'ghost',
        class: 'text-primary-400 bg-gray-900 ring-1 ring-primary-400 rounded-full hover:ring-primary-300 hover:text-primary-300 hover:bg-gray-900 transition-hover duration-200'
      },
      {
        color: 'red',
        variant: 'ghost',
        class: 'text-red-400 bg-gray-900 ring-1 ring-red-400 rounded-full hover:ring-red-300 hover:text-red-300 hover:bg-gray-900 transition-hover duration-200'
      }]
    },
    tooltip: {
      slots: {
        content: 'bg-gray-900 ring-1 ring-gray-800',
        text: 'text-gray-200'
      }
    },
    slideover: {
      slots: {
        overlay: 'bg-gray-200/75 dark:bg-gray-800/50 backdrop-blur-md',
        content: 'bg-none flex-1 flex flex-col w-full focus:outline-none'
      }
    }
  }
})
