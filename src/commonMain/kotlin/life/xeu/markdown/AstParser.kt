package life.xeu.markdown

/**
 * String XML to AST life.xeu.markdown.Element Tree
 * Support the following xml features:
 * - element and its key-value pairs (including none value key)
 * - comment
 */
sealed class Node {
    abstract fun string(): String
}

// <tag attr="value" checked> <sub/> Text </tag>
data class Element(
    val name: String,
    val attrs: Map<String, String?> = mapOf(),
    val children: MutableList<Node> = mutableListOf()
) : Node() {
    override fun string(): String {
        return (if (children.isEmpty()) "" else
            children.joinToString(",\n", prefix = "\n", postfix = "\n") {
                it.string()
            }).trimMargin()
    }

    override fun toString(): String {
        return """$name(${attrs.map { map -> "${map.key} => ${map.value}" }.joinToString(", ")}){${
            if (children.isEmpty()) "" else
                children.joinToString(",\n", prefix = "\n", postfix = "\n") {
                    it.toString().prependIndent()
                }
        }}""".trimMargin()
    }
}

data class Text(val value: String) : Node() {
    override fun string(): String {
        return value
    }

    override fun toString(): String {
        return "text($value)"
    }
}

object AstParser {
    fun parse(xml: String): Element {
        val chars = xml.toCharArray()
        var pos = 0
        return buildAST {
            var state = State.Default
            // something else <tag attr="value"> something </tag>
            var closeTag = false
            var selfClose = false // 自闭和，如：<br/>
            var tagNameCache = ""
            var attrNameCache = ""
            var attrValueCache = ""
            val attrsCache = hashMapOf<String, String?>()
            var textCache = ""

            while (pos < chars.size) {
                val c = chars[pos]
                when (state) {
                    // 默认状态，未进入标签内部
                    State.Default -> {
                        when (c) {
                            '<' -> {
                                state = State.InTag
                                // 将 text push进上一个node
                                if (textCache.isNotBlank()) {
                                    appendNode(Text(textCache.trim()))
                                    textCache = ""
                                }
                                pos += 1
                            }

                            else -> {
                                textCache += c
                                pos += 1
                            }
                        }
                    }
                    // 开始匹配标签
                    State.InTag -> {
                        when (c) {
                            ' ' -> {
                                if (!closeTag) {
                                    // 标签名结束
                                    state = State.AttrIdle
                                }
                                pos += 1
                            }

                            '>' -> {
                                if (tagNameCache.isNotBlank()) {
                                    if (closeTag) {
                                        popNode(tagNameCache)
                                    } else {
                                        pushNode(Element(tagNameCache, attrsCache.toMap()))
                                        if (selfClose) {
                                            popNode(tagNameCache)
                                        }
                                    }
                                }
                                state = State.Default
                                selfClose = false
                                closeTag = false
                                tagNameCache = ""
                                attrNameCache = ""
                                attrValueCache = ""
                                textCache = ""
                                attrsCache.clear()
                                pos += 1
                            }

                            '/' -> {
                                if (tagNameCache.isBlank() && !closeTag) {
                                    closeTag = true
                                } else {
                                    selfClose = true
                                }
                                pos += 1
                            }

                            else -> {
                                tagNameCache += c
                                pos += 1
                            }
                        }
                    }

                    State.AttrName -> {
                        when (c) {
                            '=' -> {
                                state = State.AttrValue
                                pos += 1
                            }

                            ' ' -> {
                                pos += 1
                            }

                            '>' -> {
                                attrsCache[attrNameCache] = ""
                                state = State.InTag
                            }

                            else -> {
                                attrNameCache += c
                                pos += 1
                            }
                        }
                    }

                    State.AttrValue -> {
                        when (c) {
                            '"' -> {
                                state = State.AttrValueInString
                                pos += 1
                            }

                            ' ' -> {
                                if (attrNameCache.isNotBlank()) {
                                    attrsCache[attrNameCache] = attrValueCache
                                    attrNameCache = ""
                                    attrValueCache = ""
                                }
                                state = State.AttrIdle
                                pos += 1
                            }

                            '>' -> {
                                state = State.InTag
                            }

                            else -> {
                                attrValueCache += c
                                pos += 1
                            }
                        }
                    }

                    State.AttrValueInString -> {
                        when (c) {
                            '"' -> {
                                if (chars[pos - 1] != '\\') {
                                    state = State.AttrIdle
                                    // 单属性结束
                                    attrsCache[attrNameCache] = attrValueCache
                                    attrNameCache = ""
                                    attrValueCache = ""
                                } else {
                                    // 考虑转义 \"
                                    attrValueCache = attrValueCache.substring(0, attrValueCache.length - 1) + c
                                }
                                pos += 1
                            }

                            else -> {
                                attrValueCache += c
                                pos += 1
                            }
                        }
                    }
                    // 属性空闲状态，在属性之间的空格或属性结束后的空格时会出现
                    State.AttrIdle -> {
                        when (c) {
                            ' ' -> pos += 1 //跳过空格
                            '>' -> {
                                state = State.InTag
                            }

                            else -> {
                                // 属性开始,不pos++消耗该char
                                state = State.AttrName
                            }
                        }
                    }

                }
            }
        }
    }
}

enum class State {
    Default, InTag, AttrName, AttrValue, AttrIdle, AttrValueInString
}

fun buildAST(builder: ASTBuilder.() -> Unit): Element {
    val ast = ASTBuilder()
    ast.builder()
    return ast.tree()
}

class ASTBuilder {
    private val stack: MutableList<Element> = mutableListOf()
    private val root = Element("root")

    init {
        stack.add(root)
    }

    fun pushNode(node: Element) {
        stack.last().children.add(node)
        stack.add(node)
    }

    fun appendNode(node: Node) {
        stack.last().children.add(node)
    }

    fun popNode(name: String) {
        if (stack.any { it.name == name }) {
            // 存在，开始移除
            while (stack.last().name != name) {
                stack.removeLast()
            }
            stack.removeLastOrNull()
        }
        // 否则忽略该结束标签
    }

    fun tree(): Element = root
}