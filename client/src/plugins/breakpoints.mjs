import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)
let screens = fullConfig.theme.screens
let breakpoints = {}
for(let key in screens){
  if("max" in screens[key]){
    breakpoints[key]={ maxWidth: screens[key].max }
  }
}
export default breakpoints