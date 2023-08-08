import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "知识库",
  description: "王绍峰的知识库",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
