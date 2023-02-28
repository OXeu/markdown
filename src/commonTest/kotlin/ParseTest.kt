import life.xeu.markdown.MarkdownParser
import kotlin.test.Test
import kotlin.test.assertEquals

class ParseTest {

    @Test
    fun makeTest() {
        val result =
            MarkdownParser.parse(
                """
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
            ```
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
        """.trimIndent()
            )
        println("==============")
        println(result)
        println("==============")
        println(MarkdownParser.parse("[This is a link](https://this.is.a.link)"))
    }
    @Test
    fun testHeadingAtx(){
        assertParse("""# Heading Atx""","<h1>Heading Atx</h1>","H1 parse failed.")
        assertParse("""## Heading Atx""","<h2>Heading Atx</h2>","H2 parse failed.")
        assertParse("""### Heading Atx""","<h3>Heading Atx</h3>","H3 parse failed.")
        assertParse("""#### Heading Atx""","<h4>Heading Atx</h4>","H4 parse failed.")
        assertParse("""##### Heading Atx""","<h5>Heading Atx</h5>","H5 parse failed.")
        assertParse("""###### Heading Atx""","<h6>Heading Atx</h6>","H6 parse failed.")
        assertParse("""########### Heading Atx""","<h6>Heading Atx</h6>","H6+ parse failed.")
    }
    @Test
    fun testEmphasize(){
        assertParse("""**Bold**""","<strong>Bold</strong><br/>")
        assertParse("""*Italic*""","<em>Italic</em><br/>")
        assertParse("""***Bold And Italic***""","<em><strong>Bold And Italic</strong></em><br/>")
    }
    @Test
    fun testDivider(){
        assertParse("""=========""","<hr/>")
        assertParse("""--------""","<hr/>")
        assertParse("""*******""","<hr/>")
    }
}

private fun assertParse(input: String, expect: String, msg: String? = null) {
    assertEquals(expect, MarkdownParser.parse(input), msg)
}