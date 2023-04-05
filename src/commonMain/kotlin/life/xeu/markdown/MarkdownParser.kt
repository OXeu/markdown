package life.xeu.markdown

import life.xeu.markdown.MarkdownParser.makeLinkAndImage

object MarkdownParser {


    // 预处理链接 & 图片
    private fun String.preprocessLinkAndImage() = this
    fun parse(markdown: String): String {
        val codeList = mutableListOf<Pair<String,String>>()
        val linkList = mutableListOf<String>()
        var preprocess = "```([A-Za-z0-9-_]*)\n([\\W\\w]*?)```".toRegex(RegexOption.MULTILINE).replace(markdown) {
            codeList.add(Pair(it.groupValues[1],it.groupValues[2]))
            "<pre id=\"${codeList.size-1}\"/>"
        }
        preprocess = """\[([^\n]*?)\]\(([^\n]*?)\)""".toRegex().replace(preprocess){
            linkList.add(it.groupValues[2])
            "[${it.groupValues[1]}](<link>${linkList.size-1}</link>)"
        }
        preprocess = preprocess.run {
            trim().plus("\n")
                .makeDivider()
                .makeFastLink()
                .preprocessLinkAndImage()
                .makeHeadingAtx()
                .makeEmphasize()
                .makeQuote()
                .makeCodeBlock()
                .makeLinkAndImage()
                .makeList()
                .makeTable()
                .makeParagraph()
                //代码还原
                .replace("""<pre id="([0-9]+)"/>""".toRegex()) {
                    try {
                        val id = it.groupValues[1].toInt()
                        if (codeList.size > id) {
                            val code = codeList[id]
                            val lang = if(code.first.isNotBlank()) """language="${code.first}"""" else ""
                            """<pre $lang>${code.second}</pre>"""
                        } else {
                            it.value
                        }
                    } catch (e: Exception) {
                        it.value
                    }
                } // 链接还原
                .replace("""<link>([0-9]+)</link>""".toRegex()) {
                    try {
                        val id = it.groupValues[1].toInt()
                        if (linkList.size > id) {
                            linkList[id]
                        } else {
                            it.value
                        }
                    } catch (e: Exception) {
                        it.value
                    }
                }
        }
        return preprocess
    }
    // <code id="1"/>

    // 待办事项勾选框
    private fun String.makeCheckBox() =
        this.replace("""\[([xX ])\] ([^\n]+${'$'})""".toRegex(RegexOption.MULTILINE)) {
            val values = it.groupValues
            val check = values.get(1)
            val label = values.get(2)
            "<checkbox checked=\"${if (check == " ") "false" else "true"}\">$label</checkbox>"
        }

    private fun String.makeParagraph() =
        this.replace("\n", "<br/>")
//        this.replace("""^([^\n]*?)${'$'}""".toRegex(RegexOption.MULTILINE), "<p>$1</p>")

    private fun String.makeQuote(): String = this
        .replace("""^(\s*>[\W\w]+?\n)+""".toRegex(RegexOption.MULTILINE)) {
            "<blockquote>" + it.value.trimMargin(">").makeQuote() + "</blockquote>"
        }

    // 无序列表 & 有序列表 & 待办清单

    private fun String.makeList(): String = this
        .replace("""^(\s*[0-9](.|\)) [\W\w]+?\n)+""".toRegex(RegexOption.MULTILINE)) {
            return@replace it.makeListHtml("ol")
        }
        .replace("""^(\s*[*+\-] [\W\w]+?\n)+""".toRegex(RegexOption.MULTILINE)) {
            return@replace it.makeListHtml("ul")
        }

    private fun MatchResult.makeListHtml(tag: String): String {
        var curLevel = 0
        return buildString {
            append("<$tag>")
            value.lines().forEach {
                if (it.isNotBlank()) {
                    val level = it.trimLevel()
                    if (level > curLevel) {
                        append("<$tag>".repeat(level - curLevel))
                    } else if (level < curLevel) {
                        append("</$tag>".repeat(curLevel - level))
                    }
                    curLevel = level
                    append(
                        "<li>${
                            it.trimStart { c ->
                                c.isDigit() || c.isWhitespace() || c == '*' || c == '+' || c == '-' || c == '.'
                            }.makeCheckBox()
                        }</li>"
                    )
                }
            }
            append("</$tag>".repeat(curLevel+1))
        }
    }

    private fun String.trimLevel(): Int {
        var count = 0
        for (c in this) {
            count += when (c) {
                ' ' -> 1
                '\t' -> 4
                else -> break
            }
        }
        return if (count == 0) 0 else (count - 1) / 4 + 1
    }

    // 标题
    private fun String.makeHeadingAtx() = this
        .replace("######+ ([^\n]+?)\n".toRegex(RegexOption.MULTILINE), "<h6>$1</h6>")
        .replace("##### ([^\n]+?)\n".toRegex(RegexOption.MULTILINE), "<h5>$1</h5>")
        .replace("#### ([^\n]+?)\n".toRegex(RegexOption.MULTILINE), "<h4>$1</h4>")
        .replace("### ([^\n]+?)\n".toRegex(RegexOption.MULTILINE), "<h3>$1</h3>")
        .replace("## ([^\n]+?)\n".toRegex(RegexOption.MULTILINE), "<h2>$1</h2>")
        .replace("# ([^\n]+?)\n".toRegex(RegexOption.MULTILINE), "<h1>$1</h1>")

    // 分割线
    private fun String.makeDivider() = this
        .replace("""^(-{3,}|={3,}|\*{3,})\s*${'$'}""".toRegex(RegexOption.MULTILINE), "<hr/>")

    // 强调
    private fun String.makeEmphasize() = this
        .replace("""\*\*([^*\n][^\n]*?)\*\*""".toRegex(), "<strong>$1</strong>")
        .replace("""\*([^*\n]+?)\*""".toRegex(), "<em>$1</em>")
        .replace("""__([^_\n][^\n]*?)__""".toRegex(), "<strong>$1</strong>")
        .replace("""_([^\n_]+?)_""".toRegex(), "<em>$1</em>")
        .replace("""~~([^\n_]+?)~~""".toRegex(), "<del>$1</del>")

    // 代码块
    private fun String.makeCodeBlock() = this
        .replace("""`([^\n_]*?)`""".toRegex(), "<code>$1</code>")

    // 表格
    // <table>
    // <thead><tr><th></th></tr></thead>
    // <tbody><tr><th></th></tr></tbody>
    // </table>
    private fun String.makeTable() = this
        .replace("""((\|[^\n|]+)+\|)\s*(\|[-\s:]+?)+\|\s*((\|[^\n|]+)+\|\s*)+""".toRegex(RegexOption.MULTILINE)) {
            val lines = it.value.lines()
            if (lines.size > 2) {
                val head = lines[0]
                val body = lines.subList(2, lines.size)
                val headHtml = head.split("|")
                    .joinToString(separator = "", prefix = "<thead><tr>", postfix = "</tr></thead>") { s ->
                        if (s.isNotBlank())
                            "<th>" + s.trim() + "</th>"
                        else ""
                    }
                val bodyHtml =
                    body.joinToString(separator = "", prefix = "<tbody>", postfix = "</tbody>") { rowString ->
                        if (rowString.isNotBlank()) {
                            rowString.split("|").joinToString(separator = "", prefix = "<tr>", postfix = "</tr>") { s ->
                                if (s.isNotBlank())
                                    "<th>" + s.trim() + "</th>"
                                else ""
                            }
                        } else {
                            ""
                        }
                    }
                "<table>$headHtml$bodyHtml</table>"
            } else {
                it.value
            }
        }

    // 生成快速链接，由于其会匹配<伪网址>，因此需要先匹配原始文本
    private fun String.makeFastLink() = this
        .replace("""<([^\n]+?(?:://|@)[^\n]+?)>""".toRegex(), """<a href="$1">$1</a>""")

    // 链接 & 图片
    private fun String.makeLinkAndImage() = this
        .replace("""!\[([^\n]*?)\]\(([^\n]*?)\)""".toRegex(), """<br/><img src="$2">$1</img><br/>""")
        .replace("""\[([^\n]*?)\]\(([^\n]*?)\)""".toRegex(), """<a href="$2">$1</a>""")

}
// ___ Bold ___
// *** === ----
//------
// - [ ] Check Box
//![描述]
//<https://Niheop.com>
// <Xeu@thank.com>