BOM 包含内容：  
1.Window， JavaScript 层级中的顶层对象， 表示浏览器窗口。  
2.Navigator， 包含客户端浏览器的信息。  
3.History， 包含了浏览器窗口访问过的 URL。  
4.Location， 包含了当前 URL 的信息。  
5.Screen, 包含客户端显示屏的信息。  
[参考文档](https://github.com/huyaocode/webKnowledge/blob/master/0-%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80/JS/BOM.md)

#### 1. window

window 是 javaScript 中的顶级对象，全局对象。表示窗口的相关信息。

#### 2. Navigator 对象

Navigator 对象包含的属性描述了正在使用的浏览器。 可以使用这些属性进行平台专用的配置。如获取浏览器的版本，名称等。

#### 3. History 对象

History 对象包含用户（在浏览器窗口中） 访问过的 URL。
| 方法/属性 | 描述 |
| --------- | --------------------------------- |
| length | 返回浏览器历史列表中的 URL 数量。 |
| back() | 加载 history 列表中的前一个 URL。 |
| forward() | 加载 history 列表中的下一个 URL。 |
| go() | 加载 history 列表中的某个具体页面 |

#### 4. Location 对象

Location 对象包含当前 URL 相关的信息。
| 属性 | 描述 |
| -------- | -------------------------------------------- |
| hash | 设置或返回从井号 (#) 开始的 URL（锚） 。 |
| host | 设置或返回主机名和当前 URL 的端口号。 |
| hostname | 设置或返回当前 URL 的主机名。 |
| href | 设置或返回完整的 URL。 |
| pathname | 设置或返回当前 URL 的路径部分。 |
| port | 设置或返回当前 URL 的端口号。 |
| protocol | 设置或返回当前 URL 的协议。 |
| search | 置或返回从问号 (?) 开始的 URL（查询部分） 。 |

| 方法            | 描述                                                            |
| --------------- | --------------------------------------------------------------- |
| assign()        | 加载新的文档。                                                  |
| reload(‘force’) | 重新加载当前文档。参数可选，不填或填 false 则取浏览器缓存的文档 |
| replace()       | 用新的文档替换当前文档。                                        |

#### 5. Screen 对象

Screen 对象包含有关客户端显示屏幕的信息。
