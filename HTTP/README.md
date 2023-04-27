## http 报文首部

### http 请求报文

- 报文首部
  - 请求行 // method,url,http 版本
  - 请求首部字段
  - 通用首部字段
  - 实体首部字段
- 报文主体

### http 响应报文

- 报文首部
  - 状态行 // http 版本，状态码
  - 响应首部字段
  - 通用首部字段
  - 实体首部字段
- 报文主体

### 实体首部字段

#### Expires

第一次请求以后服务端会将资源失效日期告知客户端，客户端缓存资源，当资源还没过期时请求资源会到缓存查找，当超时以后会重新向服务端请求。此字段是 HTTP/1.0 的字段，Cache-Control 字段在控制缓存上比 Expires 优先级高。

#### Last-Modified

Last-Modified 是服务器响应请求时，返回该资源文件在服务器最后被修改的时间

### 通用首部字段

#### Cache-Control

取值为：
public: 所有内容都将被缓存（客户端和代理服务器都可缓存）  
private: 所有内容只有客户端可以缓存，Cache-Control 的默认取值  
no-cache: 客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定  
no-store: 所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存  
max-age=xxx: 缓存内容将在 xxx 秒后失效

### 1. cors 跨域设置

Access-Control-Allow-Origin: 值只能为请求时 origin 具体值或\*，表示接受任意域名的请求。  
Access-Control-Allow-Credentials： 表示服务器是否允许发送 cookie。另外如果浏览器要发送 cookie，那么请求时需要设置 withCredentials：true，这样浏览器发送请求时才会带上 cookie。并且当浏览器要发送 cookie 时，Access-Control-Allow-Origin 不能设置为\*，必须指定明确的、与请求网页一致的域名。  
Access-Control-Expose-Headers：自定义返回的 header。

### 2. cors 简单请求与非简单请求

浏览器将 CORS 请求分成两类:简单请求 和 非简单请求  
简单请求特点：  
请求方法是 HEAD，GET，POST  
请求 header 不超出 Accept,Accept-Language,Content-Language,Last-Event-ID,Content-Type 只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

非简单请求就是不满足以上特点的请求：  
非简单请求在正式通信前发出一次预检请求，预检请求会询问服务器当前发出请求网页的域名是否允许请求，以及可以使用哪些 HTTP 动词和头信息字段。  
预检请求里有两个特殊字段：  
Access-Control-Request-Method： 原本请求用到的方法。  
Access-Control-Request-Headers： 该字段是一个逗号分隔的字符串，指定浏览器 CORS 请求会额外发送的头信息字段
