import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

/**
 * see https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
 */

export function registerVueComponents() {
  const requireComponent = require.context(
    '../components/icons',
    false,
    /[A-Z]\w+\.(vue|js)$/
  )

  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)

    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
        // Gets the file name regardless of folder depth
        fileName
          .split('/')
          .pop()
          .replace(/\.\w+$/, '')
      )
    )

    // Register component globally
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig
    )
  })
}
