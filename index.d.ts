import Vue, { ComponentOptions } from "vue";

declare global {
  namespace Cypress {
    import Vue from "vue";
    import { Wrapper, VueClass } from '@vue/test-utils';

    interface Cypress {
      vue: Vue;
      $vue: Wrapper<Vue>
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
  component: Vue.VueConstructor,
  optionsOrProps?: Options
): () => void;

export = mountVue;
