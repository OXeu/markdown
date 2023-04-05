import life.xeu.markdown.AstParser
import kotlin.test.Test

class AstTest {
    @Test
    fun simpleTest(){
        val raw = """<h1> 你好 </h1>"""
        val tree = AstParser.parse(raw)
        println(tree)
    }
    @Test
    fun simpleTest2(){
        // 错误规则
        val raw = """<h1> 你好<p>就斤斤计较</p> </aa></h1><h2>Hello</h2>"""
        val tree = AstParser.parse(raw)
        println(raw)
        println("=======")
        println(tree)
    }
    @Test
    fun simpleTest3(){
        // 属性测试
        val raw = """<center/><h1 class=1 attr="Hello" checked> 你好<p>Hello</p> </aa></h1>"""
        val tree = AstParser.parse(raw)
        println("\n=======")
        println(tree)
    }
}