1.HTML5 是 HTML 的新标准，新增加了很多特性如

1. 语义化标签
2. 媒体标签，audio,video
3. canvans 元素
4. 本地存储 localStorage,sessionStoreage
5. 拖拽
6. 表单控件  
   ...

---

### 1. src 和 href 的区别

1.src 通常用来引用外部资源，指向的内容会替换元素本身的内容。src 会将其指向的资源下载并应用到文档内，当浏览器解析到该元素时，会暂停其他资源的下载和处理直到执行完毕。常用标签如\<script>,\<img>,\<iframe>,\<video>.  
2.href 表示超文本引用，指向一些外部资源与当前页面构建链接联系，不会替换元素本身的内容，当浏览器识别到他指向的文件时，就会并行下载，不会停止对当前文档的处理。常用标签如\<link>,\<a>.

### 2. DOCTYPE 的作用

DOCTYPE 是一种文档类型定义(DTD,Document Type Defination)，目的是告诉浏览器以怎样的文档类型标准定义去解析当前文档。不同的渲染模式会影响浏览器对 css 的解析。  
DTD 是什么？追溯到很久以前，SGML 是一种古老的标记语言，HTML 脱胎于 SGML，SGML 用 DTD 来定义文档类型，在 HTML4.0.1 的版本中，有 3 种 DTD,严格模式，过度模式，frameset 模式。  
浏览器渲染页面的两种模式：
CSS1Compat: 标准模式，浏览器以 W3C 的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
BackCompat: 怪异模式/混杂模式，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。  
html 文档不指定 DTD 浏览器就会以 BackCompat 模式解析文档。

### 3. HTML 头部标签

\<head>标签包含所有的头部标签元素，可以添加到头部的元素标签有 \<title>, \<style>, \<meta>, \<link>, \<script>, \<noscript> 和 \<base>。

#### 1.\<title>标签

定义文档的标题

#### 2. \<base>标签

base 标签有两个属性，href 和 target。
生效的标签包括\<a>、\<img>、\<link>、\<form>  
一般 base 标签放在 head 标签首位，这样也会对 head 内其他标签生效
href 为页面上所有的<font color="red">相对链接(路径)</font>规定默认的 URL。
target 指定链接打开的方式，优先级低，使用链接的地方没指定时才使用。

#### 3. \<mata>标签

meta 标签提供有关页面的元信息，meta 标签的属性定义了与文档相关联的名称/值对。 常见属性：  
name：属性通常与 content 属性共同构成一个名称/值对。常见的有 keywords(关键字)，author(作者)，description(网站介绍)viewport(css 移动设备适配规范)等等。  
content: 定义与 http-equiv 或 name 属性相关的元信息。  
http-equiv: 把 content 属性关联到 HTTP 头部,所有允许的值都是特定 HTTP 头部的名称。  
charset: 规定 HTML 文档的字符编码。

当 name 为 viewport（视口）时 content 对应的一些值

- width,值为正整数或“device-width”(设备宽度)，定义 viewport 的宽度，如果值为正整数，则单位为像素。
- initial-scale，定义设备宽度与 viewport 大小之间的缩放比例。取值范围 0.0-10.0，一般取 1.0。
- maximum-scale，定义缩放的最大值。
- minimum-scale，定义缩放的最小值。
- user-scalable，是否可以缩放当前页面，yes 是可以，no 是禁止。默认 yes.

#### 4. link 标签

HTML 外部资源链接元素 (\<link>) 规定了当前文档与外部资源的关系。
常见属性

- href: 此属性指定被链接资源的 URL。 URL 可以是绝对的，也可以是相对的。
- rel: 此属性命名链接文档与当前文档的关系。值必须是[链接类型](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Link_types),常见的值有“stylesheet”,“icon”,“apple-touch-icon”,“prefetch”,“preload”。
- type: 这个属性被用于定义链接的内容的类型。这个属性的值应该是像 text/html，text/css 等 MIME 类型。
- sizes: 只有在 rel 为 icon 时生效,这个属性定义了包含相应资源的可视化媒体中的 icons 的大小。
- as: 该属性仅在\<link>元素设置了 rel="preload" 或者 rel="prefetch" 时才能使用。它规定了<link>元素加载的内容的类型。值有“audio”，“image”，“font”，“script”，“vodeo”等。
- media：这个属性规定了外部资源适用的媒体类型。它的值必须是"媒体查询"。这个属性使得用户代理能选择最适合设备运行的媒体类型。

#### 5. \<noscript>标签

js 脚本被禁用时显示的内容，正常情况下不会展示。

### 3.BFC 块格式化上下文

BFC 是一个独立的容器，在这个容器的元素布局不受外部影响，也不会影响到外部布局。bfc 计算高度时会计算浮动元素的高度。

#### 生成 BFC

1.根元素：\<html>  
2.浮动元素：float 值不为 none  
3.绝对定位元素：position 为 absolute 或 fixed  
4.行内块元素：display 值为 inline-block  
5.overflow 值不为 visible  
6.弹性元素：display 值为 flex

#### 可解决问题

1.高度塌陷问题，如给一个元素设置浮动后脱离文档流，为不影响原来布局可以在外包裹 bfc.  
2.外边距重叠，两个盒子 margin 上下相邻，会取较大的一方。设置为 bfc 以后就不会重叠。
