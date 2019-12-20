import Vue, { ComponentOptions } from "vue";

declare global {
  namespace Cypress {
    import Vue from "vue";

    interface Cypress {
      vue: Vue;
    }
  }
}

interface Options {
  mountId?: string;
  html?: string;
  base?: string;
  extensions: {
    components: any[];
    filters: any[];
    use: any[];
    plugins: any[];
    mixin: any[];
    mixins: any[];
  };
}

function mountVue<V extends Vue>(
  component: Vue.VueConstructor<V>,
  optionsOrProps?: Options
): () => void;

export = mountVue;
