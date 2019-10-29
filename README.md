# gitbook plugin

A plugin for GitBook is a node package that can be published on NPM. It has to follow the name convention: gitbook-plugin-*name*.

## npm publish

举例来说: gitbook-plugin-nonocast-style
- github新建repo
- yarn init创建package
- 随便写一个index.js

index.js
```
console.log("hello world");
```

然后就可以发布了,
- `npm login`, 成功后会显示`Logged in as nonocast on https://registry.npmjs.org/.`
- `npm publish`, 成功后就可以去npmjs.org上查看, README.md就是npm package的说明

验证一下,
- 再新建一个nodejs, `yarn init`
- `yarn add gitbook-plugin-nonocast-style`
- `require 'gitbook-plugin-nonocast-style`
- `node index.js` output: hello world

## plugin 约定

1. 需要在package.json中增加engine属性
  ```
  "engines": {
    "gitbook": "*"
  }
  ```

2. index.js 基本结构:
```
module.exports = {
  websites: {},
  hooks: {},
  blocks: {},
  filters: {}
};
```

- websites: 扩展资源, 额外增加css或js的reference
  ```js
  // Extend website resources and html
  website: {
    assets: "./book",
    js: [
      "test.js"
    ],
    css: [
      "test.css"
    ],
    html: {
      "html:start": function() {
          return "<!-- Start book "+this.options.title+" -->"
      },
      "html:end": function() {
          return "<!-- End of book "+this.options.title+" -->"
      },

      "head:start": "<!-- head:start -->",
      "head:end": "<!-- head:end -->",

      "body:start": "<!-- body:start -->",
      "body:end": "<!-- body:end -->"
    }
  }
  ```

- hooks: 钩子

  ```js
  // Hook process during build
  hooks: {
    // For all the hooks, this represent the current generator

    // This is called before the book is generated
    "init": function() {
        console.log("init!");
    },

    // This is called after the book generation
    "finish": function() {
        console.log("finish!");
    }
  }
  ```

- blocks: 对标签进行扩展

  ```js
  // Extend templating blocks
  blocks: {
      // Author will be able to write "{% myTag %}World{% endMyTag %}"
      myTag: {
          process: function(blk) {
              return "Hello "+blk.body;
          }
      }
  },
  ```

- filters: 扩展标签

  ```js
  // Extend templating filters
  filters: {
    // Author will be able to write "{{ 'test'|myFilter }}"
    myFilter: function(s) {
      return "Hello "+s;
    }
  }
  ```

### 获取配置参数
- 先判断是否存在对应plugin的配置块: `this.options.pluginsConfig["nonocast-style"]`
- 具体参数: `this.options.pluginsConfig["tbfed-pagefooter"][title]`


### 本地测试plugin
- plugin 目录: `npm link`
- gitbook 目录: `npm link gitbook-plugin-nonocast-style`