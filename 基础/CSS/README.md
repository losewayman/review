### 1. css 有哪些样式选择器

1. 内联样式，权值 1000，样式直接写在标签上，是除 !important 外优先级最高的
2. id 选择器，权重 100，格式 "#id"
3. 类选择权，属性选择器，伪类选择器，权重 10，格式".classname","a[href="xxx"]","a:hover"
4. 标签选择器，伪元素选择器，权重 1
5. 相邻兄弟选择器，后代选择器，通配符选择器，权重 0

属性选择器：选择某个标签带有指定属性的元素  
伪类选择权：添加到选择器的关键字，指定要选择的元素的特殊状态常见的有 hover，active 等  
伪元素选择器：伪元素是一个附加至选择器末的关键词，允许你对被选择元素的特定部分修改样式。

- ::after，用来创建一个伪元素，作为已选中元素的最后一个子元素，通常会配合 content 属性来为该元素添加装饰内容。这个虚拟元素默认是行内元素。
- ::before,同::after,不过它是作为已选中元素的第一个子元素。
- 其他...

相邻兄弟选择器: 介于两个选择器之间，当第二个元素紧跟在第一个元素之后，并且两个元素都是属于同一个父元素的子元素，则第二个元素将被选中。  
后代选择器:（通常用单个空格（ ）字符表示）组合了两个选择器，如果第二个选择器匹配的元素具有与第一个选择器匹配的祖先（父母，父母的父母，父母的父母的父母等）元素，则它们将被选择。
选择器列表：用','表示，可以对多个选择器选中的元素应用样式。

#### \*注意事项

- !important 声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。可以理解为优先级相同，最后出现的样式生效，因为它更“近”。近的会覆盖远的。

### 2. link 和@import 引入 CSS 有什么区别

1.link 是 html 的标签，除了引入样式表还有其他功能，@import 是 CSS2.1 以后提供的用来导入样式表的语法。  
2.加载页面时，link 的样式表可以并行下载，@import 因为要等样式表开始解析时才会开始下载，是串行下载的，过多嵌套会有问题。
3.@import 引入的样式会被置于样式表顶部，下面有相同样式时会被覆盖。

### 3. 垂直水平居中一个元素

#### 块级元素垂直水平居中

1.父元素相对定位，子元素绝对定位，子元素 top,left 各 50%，transform: translate(-50%, -50%);如果知道子元素的宽高，还可以 margin-top,margin-left 各负的子元素宽高一半。  
2.父元素相对定位，子元素绝对定位，子元素 top,left,right,bottom 设为 0，margin:auto; 3.父元素设置 flex,justify-content: center;align-items: center;  
4.父元素 display:flex;子元素使用 margin:auto;

#### 行内元素垂直水平居中

1.text-align:center 水平居中，line-height 设置为和 height 一样。

### 4. 各种布局

[布局代码](./%E5%B8%83%E5%B1%80.html)

#### 实现一个三栏布局，左右固定宽度，中间自适应

1.使用绝对定位，左右分别靠在左右边上，中间距两边间距为左右宽度。

```
.layout-1-left{
    position: absolute;
    width: 200px;
    left:0;
    height: 100px;
    background-color:bisque;
}
.layout-1-center{
    position: absolute;
    left:200px;
    right: 200px;
    height: 100px;
    background-color: aquamarine;
}
.layout-1-right{
    position: absolute;
    width: 200px;
    right:0;
    height: 100px;
    background-color:bisque;
}
```

2.使用 flex,左右定宽，中间 flex:1

```
        .layout-2{
            display: flex;
        }
        .layout-2-left{
            width: 200px;
            height: 100px;
            background-color:bisque;
        }
        .layout-2-center{
            flex:1;
            height: 100px;
            background-color: aquamarine;
        }
        .layout-2-right{
            width: 200px;
            height: 100px;
            background-color:bisque;
        }
```

#### 实现一个两栏布局，左固定宽度，右自适应

1.左定宽 float:left,右边生成 BFC

```
        .layout-3{
           height: 100px;
           overflow: hidden;
        }
        .layout-3-left{
            float: left;
            width: 200px;
            background-color: aquamarine;
        }
        .layout-3-right{
            overflow: hidden;
            height: 100px;
            background-color:bisque;
        }
```

### 5. Flex 布局

[参考文档](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)  
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。  
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。

### 容器属性

#### flex-direction

决定主轴排列方向  
flex-direction: row | row-reverse | column | column-reverse;

#### flex-wrap

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行。  
flex-wrap: nowrap | wrap | wrap-reverse;

#### justify-content

justify-content 属性定义了项目在主轴上的对齐方式。  
justify-content: flex-start | flex-end | center | space-between | space-around;

#### align-items

align-items 属性定义项目在交叉轴上如何对齐。  
align-items: flex-start | flex-end | center | baseline | stretch;

#### align-content

align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。  
align-content: flex-start | flex-end | center | space-between | space-around | stretch;

### 项目属性

flex 内部子元素默认按主轴从左到右按顺序排列，默认不换行  
当子元素的总宽度不超过容器宽度时子元素 width 属性生效（不写默认按内容撑开），超过时按宽度成比例分配总宽度(因为 flex-shrink 默认 1)。

#### order

order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0。

#### flex-grow

flex-grow 属性定义项目的放大比例，默认为 0。意思是如果存在剩余空间（主轴方向上一行中未被子元素填充的宽度部分），则按照份数分配剩余空间到设置此属性的元素上。

#### flex-shrink

flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。flex 容器内子元素总宽度超过容器宽度时子元素宽度会等比例缩小就是因为此属性默认 1，默认缩小，如果值为 0，则超过时不会缩小。

#### flex-basis

flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间。默认值是 auto，即元素本来大小。效果与 width 有些相似，在 flex 布局中比 width 优先级高。

#### flex 属性

flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。
该属性有两个快捷值：auto (1 1 auto)（自动填充缩放） 和 none (0 0 auto)（按照元素本身设置尺寸布局）。
