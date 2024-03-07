import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      sans: ['DM Sans', 'DM Sans fallback', ...defaultTheme.fontFamily.sans],
    },
  },
}
