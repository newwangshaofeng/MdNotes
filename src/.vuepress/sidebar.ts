import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/work/": "structure",

  "/demo/": "structure",
  "/other/": "structure",
  "/code-notes/": "structure",

  // "/": [
  //   "",
  //   {
  //     text: "工作",
  //     icon: "laptop-code",
  //     prefix: "work/",
  //     link: "work/",
  //     children: "structure",
  //   },
  //   {
  //     text: "案例",
  //     icon: "laptop-code",
  //     prefix: "demo/",
  //     link: "demo/",
  //     children: "structure",
  //   },
  //   {
  //     text: "文档",
  //     icon: "book",
  //     prefix: "guide/",
  //     children: "structure",
  //   },
  //   "slides",
  // ],
});
