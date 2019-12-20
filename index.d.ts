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
  extensions?: {
    components?: {[name: string]: any};
    filters?: {[name: string]: any};
    use?: any[];
    plugins?: any[];
    mixin?: any[];
    mixins?: any[];
  };
}

declare function mountVue<V extends Vue>(
  component: Vue.VueConstructor<V>,
  optionsOrProps?: Options
): () => void;

export = mountVue;
