/**
 * based on :
 *
 * - https://vuejs.org/v2/guide/components-registration.html#Automatic-Global-Registration-of-Base-Components
 *
 * - https://forum.vuejs.org/t/vue-3-automatic-component-registration/105275/3
 *
 * - https://vitejs.dev/guide/features.html#glob-import
 */

import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

export async function registerComponents(app) {
  const components = import.meta.globEager("/src/components/icons/*.vue");

  for (const path in components) {
    const component = components[path];
    const componentName = getComponentNameInPascalCase(path);

    // Register component globally
    app.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      component.default || component
    );
  }
}

function getComponentNameInPascalCase(path) {
  return upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      path
        .split("/")
        .pop()
        .replace(/\.\w+$/, "")
    )
  );
}
