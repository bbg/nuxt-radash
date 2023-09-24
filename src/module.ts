import { addImports, createResolver, defineNuxtModule } from "@nuxt/kit";
import * as radash from "./runtime/radash";

export interface ModuleOptions {
  /**
   * Prefix to be added before every radash function
   *
   * `false` to disable uppercasing
   *
   * @defaultValue `use`
   */
  prefix: false | string;
  /**
   * Functions that starts with this keywords will be skipped by prefix
   *
   * `false` to disable uppercasing
   *
   * @defaultValue 'is'
   */
  prefixSkip: string | string[] | false;
  /**
   * Iterable of string pairs to alias each function
   *
   * @defaultValue []
   */
  alias: Iterable<[string, string]>;
  /**
   * Upper case first letter after prefix
   *
   * `false` to disable uppercasing
   *
   * @defaultValue true
   */
  upperAfterPrefix: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-radash",
    configKey: "radash",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    prefix: "use",
    prefixSkip: "is",
    alias: [],
    upperAfterPrefix: true,
  },
  setup(options) {
    const { resolve } = createResolver(import.meta.url);

    const aliasMap = new Map<string, string>(options.alias);
    const prefixSkip = options.prefixSkip
      ? radash.isArray(options.prefixSkip)
        ? options.prefixSkip
        : [options.prefixSkip]
      : [];
    for (const name of Object.keys(radash)) {
      const alias = aliasMap.has(name) ? aliasMap.get(name)! : name;
      const prefix =
        (!prefixSkip.some((key) => alias.startsWith(key)) && options.prefix) ||
        "";
      const as = prefix
        ? prefix + (options.upperAfterPrefix ? radash.pascal(alias) : alias)
        : alias;
      addImports({ name, as, from: resolve("./runtime/radash") });
    }
  },
});
