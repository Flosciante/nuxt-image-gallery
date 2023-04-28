import type { Config } from 'tailwindcss'
import { iconsPlugin, getIconCollections } from '@egoist/tailwindcss-icons'

export default <Partial<Config>> {
  darkMode: 'class',
  plugins: [
    // https://github.com/egoist/tailwindcss-icons
    iconsPlugin({
      // Icons collection to use, see https://icones.js.org
      collections: getIconCollections([
        // 'heroicons',
        // 'ph'
      ]),
    })
  ]
}
