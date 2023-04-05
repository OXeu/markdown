# Markdown 解析器
## 实现
### 1. Markdown to XML
使用正则表达式将Markdown替换为XML格式的文件，可根据实际使用需求更改生成的
XML格式

具体实现文件 `MarkdownParser.kt`

#### Example
```markdown
## Heading Atx 2
### Heading Atx 3
#### Heading Atx 4
##### Heading Atx 5
###### Heading Atx 6
####### Heading Atx 7
**Divider**
-----
__Bold___Italic_***BoldItalic***
<https://fast.link/test>
[This is a link](https://this.is.a.link)
![Image as this](https://img.com/test-image)
|Table | Hello | Test|
| ---  | ----- | ----|
| Android|  iOS | Windows    |
| Flyme  | MIUI | HarmonyOS  |
| Linux  | macOS| Windows 10 |
========
> This is a quote
> > Quote in quote
> **Bold Quote***Italic* And `code` Test
```CodeFence
Just for fun ! Don't worry `Hello` *Italic*
===============
/```
- List Test
-  Okay
    - Sub List
    - Sub List 2
  - Unnormal List
    - [ ] Check Box
- I'm Back
1. Ordered List
2. How about it
    - Insert some thing Others
3. Oh my gosh!I think it did not work!
    4. Just for test,don't worry!
Any else?
seems nothing!
Okay, **Run it!**
```

```xml
<h2>Heading Atx 2</h2>
<h3>Heading Atx 3</h3>
<h4>Heading Atx 4</h4>
<h5>Heading Atx 5</h5>
<h6>Heading Atx 6</h6>
<h6>Heading Atx 7</h6>
<strong>Divider</strong>
<br/>
<hr/>
<br/>
<strong>Bold</strong><em>Italic</em><em><strong>BoldItalic</strong></em><br/>
<a href="https://fast.link/test">https://fast.link/test</a>
<br/>
<a href="https://this.is.a.link">This is a link</a><br/><br/>
<img src="https://img.com/test-image">Image as this</img><br/><br/>
<table>
    <thead>
        <tr><th>Table</th>
            <th>Hello</th>
            <th>Test</th>
        </tr>
    </thead>
    <tbody>
        <tr><th>Android</th>
            <th>iOS</th>
            <th>Windows</th>
        </tr>
        <tr><th>Flyme</th>
            <th>MIUI</th>
            <th>HarmonyOS</th>
        </tr>
        <tr><th>Linux</th>
            <th>macOS</th>
            <th>Windows 10</th>
        </tr>
    </tbody>
</table>
<hr/>
<br/>
<blockquote> This is a quote
    <br/>
    <blockquote> Quote in quote</blockquote>
    <strong>Bold Quote</strong><em>Italic</em> And <code>code</code> Test
</blockquote>
<pre language="CodeFence">
    Just for fun ! Don't worry `Hello` *Italic*
    ===============
</pre>
<br/>
<ul>
    <li>List Test</li>
    <li>Okay</li>
    <ul><li>Sub List</li>
        <li>Sub List 2</li>
        <li>Unnormal List</li>
        <li><checkbox checked="false">Check Box</checkbox></li>
    </ul>
    <li>I'm Back</li>
</ul>
<ol>
    <li>Ordered List</li>
    <li>How about it</li>
</ol>
        - Insert some thing Others<br/>
<ol>
    <li>Oh my gosh!I think it did not work!</li>
    <ol>
        <li>Just for test,don't worry!</li>
    </ol>
</ol>
        Any else?<br/>
        seems nothing!<br/>
        Okay, <strong>Run it!</strong>
<br/>
```

### 2. XML to AST Tree
使用有限状态机将XML解析为可遍历的AST Tree结构  
实现文件：`AstParser.kt`
#### Feature  
- 支持忽略异常闭合标签
- 兼容未关闭标签
- 支持属性
- 支持无值属性，如 `<input checked/>`
- 支持自闭合标签
#### Example
```xml
<center/>
<unclosed-tag>
    <h1 class=1 attr="Hello" checked>你好<p>Hello</p></aa></h1>
```

```text
root(){
    center(){},
    unclosed-tag(){
        h1(class => 1, attr => Hello, checked => ){
            text(你好),
            p(){
                text(Hello)
            }
        }
    }
}
```

## Js使用
