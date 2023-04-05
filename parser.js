(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'markdown-js-legacy'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'markdown-js-legacy'.");
    }
    root['markdown-js-legacy'] = factory(typeof this['markdown-js-legacy'] === 'undefined' ? {} : this['markdown-js-legacy'], kotlin);
  }
}(this, function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var joinToString = Kotlin.kotlin.collections.joinToString_fmv235$;
  var trimMargin = Kotlin.kotlin.text.trimMargin_rjktp$;
  var toString = Kotlin.toString;
  var prependIndent = Kotlin.kotlin.text.prependIndent_rjktp$;
  var toCharArray = Kotlin.kotlin.text.toCharArray_pdl1vz$;
  var toMap = Kotlin.kotlin.collections.toMap_abgq59$;
  var isBlank = Kotlin.kotlin.text.isBlank_gw00vp$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var Unit = Kotlin.kotlin.Unit;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var last = Kotlin.kotlin.collections.last_2p1efm$;
  var equals = Kotlin.equals;
  var removeLast = Kotlin.kotlin.collections.removeLast_vvxzk3$;
  var removeLastOrNull = Kotlin.kotlin.collections.removeLastOrNull_vvxzk3$;
  var emptyMap = Kotlin.kotlin.collections.emptyMap_q3lmfv$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var HashMap_init = Kotlin.kotlin.collections.HashMap_init_q3lmfv$;
  var throwCCE = Kotlin.throwCCE;
  var trim = Kotlin.kotlin.text.trim_gw00vp$;
  var Collection = Kotlin.kotlin.collections.Collection;
  var RegexOption = Kotlin.kotlin.text.RegexOption;
  var Pair = Kotlin.kotlin.Pair;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var Exception = Kotlin.kotlin.Exception;
  var replace = Kotlin.kotlin.text.replace_680rmw$;
  var lines = Kotlin.kotlin.text.lines_gw00vp$;
  var repeat = Kotlin.kotlin.text.repeat_94bcnn$;
  var unboxChar = Kotlin.unboxChar;
  var isDigit = Kotlin.kotlin.text.isDigit_myv2d0$;
  var isWhitespace = Kotlin.kotlin.text.isWhitespace_myv2d0$;
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var Regex_init = Kotlin.kotlin.text.Regex_init_61zpoe$;
  var Regex_init_0 = Kotlin.kotlin.text.Regex_init_sb3q2$;
  var get_indices = Kotlin.kotlin.text.get_indices_gw00vp$;
  var StringBuilder_init = Kotlin.kotlin.text.StringBuilder_init;
  Element.prototype = Object.create(Node.prototype);
  Element.prototype.constructor = Element;
  Text.prototype = Object.create(Node.prototype);
  Text.prototype.constructor = Text;
  State.prototype = Object.create(Enum.prototype);
  State.prototype.constructor = State;
  function Node() {
  }
  Node.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Node',
    interfaces: []
  };
  function Element(name, attrs, children) {
    if (attrs === void 0) {
      attrs = emptyMap();
    }
    if (children === void 0) {
      children = ArrayList_init();
    }
    Node.call(this);
    this.name = name;
    this.attrs = attrs;
    this.children = children;
  }
  function Element$string$lambda(it) {
    return it.string();
  }
  Element.prototype.string = function () {
    return trimMargin(this.children.isEmpty() ? '' : joinToString(this.children, ',\n', '\n', '\n', void 0, void 0, Element$string$lambda));
  };
  function Element$toString$lambda(it) {
    return prependIndent(it.toString());
  }
  Element.prototype.toString = function () {
    var tmp$ = this.name + '(';
    var $receiver = this.attrs;
    var destination = ArrayList_init_0($receiver.size);
    var tmp$_0;
    tmp$_0 = $receiver.entries.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination.add_11rb$(item.key + ' => ' + toString(item.value));
    }
    return trimMargin(tmp$ + joinToString(destination, ', ') + '){' + (this.children.isEmpty() ? '' : joinToString(this.children, ',\n', '\n', '\n', void 0, void 0, Element$toString$lambda)) + '}');
  };
  Element.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Element',
    interfaces: [Node]
  };
  Element.prototype.component1 = function () {
    return this.name;
  };
  Element.prototype.component2 = function () {
    return this.attrs;
  };
  Element.prototype.component3 = function () {
    return this.children;
  };
  Element.prototype.copy_v25ifp$ = function (name, attrs, children) {
    return new Element(name === void 0 ? this.name : name, attrs === void 0 ? this.attrs : attrs, children === void 0 ? this.children : children);
  };
  Element.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.attrs) | 0;
    result = result * 31 + Kotlin.hashCode(this.children) | 0;
    return result;
  };
  Element.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.attrs, other.attrs) && Kotlin.equals(this.children, other.children)))));
  };
  function Text(value) {
    Node.call(this);
    this.value = value;
  }
  Text.prototype.string = function () {
    return this.value;
  };
  Text.prototype.toString = function () {
    return 'text(' + this.value + ')';
  };
  Text.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Text',
    interfaces: [Node]
  };
  Text.prototype.component1 = function () {
    return this.value;
  };
  Text.prototype.copy_61zpoe$ = function (value) {
    return new Text(value === void 0 ? this.value : value);
  };
  Text.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  Text.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.value, other.value))));
  };
  function AstParser() {
    AstParser_instance = this;
  }
  function AstParser$parse$lambda(closure$pos, closure$chars) {
    return function ($receiver) {
      var state = State$Default_getInstance();
      var closeTag = false;
      var selfClose = false;
      var tagNameCache = '';
      var attrNameCache = '';
      var attrValueCache = '';
      var attrsCache = HashMap_init();
      var textCache = '';
      while (closure$pos.v < closure$chars.length) {
        var c = closure$chars[closure$pos.v];
        switch (state.name) {
          case 'Default':
            if (c === 60) {
              state = State$InTag_getInstance();
              if (!isBlank(textCache)) {
                var $receiver_0 = textCache;
                var tmp$;
                $receiver.appendNode_lb08ax$(new Text(trim(Kotlin.isCharSequence(tmp$ = $receiver_0) ? tmp$ : throwCCE()).toString()));
                textCache = '';
              }
              closure$pos.v = closure$pos.v + 1 | 0;
            } else {
              textCache += String.fromCharCode(c);
              closure$pos.v = closure$pos.v + 1 | 0;
            }

            break;
          case 'InTag':
            switch (c) {
              case 32:
                if (!closeTag) {
                  state = State$AttrIdle_getInstance();
                }

                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              case 62:
                if (!isBlank(tagNameCache)) {
                  if (closeTag) {
                    $receiver.popNode_61zpoe$(tagNameCache);
                  } else {
                    $receiver.pushNode_4idenf$(new Element(tagNameCache, toMap(attrsCache)));
                    if (selfClose) {
                      $receiver.popNode_61zpoe$(tagNameCache);
                    }
                  }
                }

                state = State$Default_getInstance();
                selfClose = false;
                closeTag = false;
                tagNameCache = '';
                attrNameCache = '';
                attrValueCache = '';
                textCache = '';
                attrsCache.clear();
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              case 47:
                if (isBlank(tagNameCache) && !closeTag) {
                  closeTag = true;
                } else {
                  selfClose = true;
                }

                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              default:
                tagNameCache += String.fromCharCode(c);
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
            }

            break;
          case 'AttrName':
            switch (c) {
              case 61:
                state = State$AttrValue_getInstance();
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              case 32:
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              case 62:
                var key = attrNameCache;
                attrsCache.put_xwzc9p$(key, '');
                state = State$InTag_getInstance();
                break;
              default:
                attrNameCache += String.fromCharCode(c);
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
            }

            break;
          case 'AttrValue':
            switch (c) {
              case 34:
                state = State$AttrValueInString_getInstance();
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              case 32:
                if (!isBlank(attrNameCache)) {
                  var key_0 = attrNameCache;
                  var value = attrValueCache;
                  attrsCache.put_xwzc9p$(key_0, value);
                  attrNameCache = '';
                  attrValueCache = '';
                }

                state = State$AttrIdle_getInstance();
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              case 62:
                state = State$InTag_getInstance();
                break;
              default:
                attrValueCache += String.fromCharCode(c);
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
            }

            break;
          case 'AttrValueInString':
            if (c === 34) {
              if (closure$chars[closure$pos.v - 1 | 0] !== 92) {
                state = State$AttrIdle_getInstance();
                var key_1 = attrNameCache;
                var value_0 = attrValueCache;
                attrsCache.put_xwzc9p$(key_1, value_0);
                attrNameCache = '';
                attrValueCache = '';
              } else {
                var $receiver_1 = attrValueCache;
                var endIndex = attrValueCache.length - 1 | 0;
                attrValueCache = $receiver_1.substring(0, endIndex) + String.fromCharCode(toBoxedChar(c));
              }
              closure$pos.v = closure$pos.v + 1 | 0;
            } else {
              attrValueCache += String.fromCharCode(c);
              closure$pos.v = closure$pos.v + 1 | 0;
            }

            break;
          case 'AttrIdle':
            switch (c) {
              case 32:
                closure$pos.v = closure$pos.v + 1 | 0;
                break;
              case 62:
                state = State$InTag_getInstance();
                break;
              default:
                state = State$AttrName_getInstance();
                break;
            }

            break;
        }
      }
      return Unit;
    };
  }
  AstParser.prototype.parse_61zpoe$ = function (xml) {
    var chars = toCharArray(xml);
    var pos = {v: 0};
    return buildAST(AstParser$parse$lambda(pos, chars));
  };
  AstParser.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'AstParser',
    interfaces: []
  };
  var AstParser_instance = null;
  function AstParser_getInstance() {
    if (AstParser_instance === null) {
      new AstParser();
    }
    return AstParser_instance;
  }
  function State(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function State_initFields() {
    State_initFields = function () {
    };
    State$Default_instance = new State('Default', 0);
    State$InTag_instance = new State('InTag', 1);
    State$AttrName_instance = new State('AttrName', 2);
    State$AttrValue_instance = new State('AttrValue', 3);
    State$AttrIdle_instance = new State('AttrIdle', 4);
    State$AttrValueInString_instance = new State('AttrValueInString', 5);
  }
  var State$Default_instance;
  function State$Default_getInstance() {
    State_initFields();
    return State$Default_instance;
  }
  var State$InTag_instance;
  function State$InTag_getInstance() {
    State_initFields();
    return State$InTag_instance;
  }
  var State$AttrName_instance;
  function State$AttrName_getInstance() {
    State_initFields();
    return State$AttrName_instance;
  }
  var State$AttrValue_instance;
  function State$AttrValue_getInstance() {
    State_initFields();
    return State$AttrValue_instance;
  }
  var State$AttrIdle_instance;
  function State$AttrIdle_getInstance() {
    State_initFields();
    return State$AttrIdle_instance;
  }
  var State$AttrValueInString_instance;
  function State$AttrValueInString_getInstance() {
    State_initFields();
    return State$AttrValueInString_instance;
  }
  State.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'State',
    interfaces: [Enum]
  };
  function State$values() {
    return [State$Default_getInstance(), State$InTag_getInstance(), State$AttrName_getInstance(), State$AttrValue_getInstance(), State$AttrIdle_getInstance(), State$AttrValueInString_getInstance()];
  }
  State.values = State$values;
  function State$valueOf(name) {
    switch (name) {
      case 'Default':
        return State$Default_getInstance();
      case 'InTag':
        return State$InTag_getInstance();
      case 'AttrName':
        return State$AttrName_getInstance();
      case 'AttrValue':
        return State$AttrValue_getInstance();
      case 'AttrIdle':
        return State$AttrIdle_getInstance();
      case 'AttrValueInString':
        return State$AttrValueInString_getInstance();
      default:
        throwISE('No enum constant life.xeu.markdown.State.' + name);
    }
  }
  State.valueOf_61zpoe$ = State$valueOf;
  function buildAST(builder) {
    var ast = new ASTBuilder();
    builder(ast);
    return ast.tree();
  }
  function ASTBuilder() {
    this.stack_0 = ArrayList_init();
    this.root_0 = new Element('root');
    this.stack_0.add_11rb$(this.root_0);
  }
  ASTBuilder.prototype.pushNode_4idenf$ = function (node) {
    last(this.stack_0).children.add_11rb$(node);
    this.stack_0.add_11rb$(node);
  };
  ASTBuilder.prototype.appendNode_lb08ax$ = function (node) {
    last(this.stack_0).children.add_11rb$(node);
  };
  ASTBuilder.prototype.popNode_61zpoe$ = function (name) {
    var $receiver = this.stack_0;
    var any$result;
    any$break: do {
      var tmp$;
      if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
        any$result = false;
        break any$break;
      }
      tmp$ = $receiver.iterator();
      while (tmp$.hasNext()) {
        var element = tmp$.next();
        if (equals(element.name, name)) {
          any$result = true;
          break any$break;
        }
      }
      any$result = false;
    }
     while (false);
    if (any$result) {
      while (!equals(last(this.stack_0).name, name)) {
        removeLast(this.stack_0);
      }
      removeLastOrNull(this.stack_0);
    }
  };
  ASTBuilder.prototype.tree = function () {
    return this.root_0;
  };
  ASTBuilder.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ASTBuilder',
    interfaces: []
  };
  function MarkdownParser() {
    MarkdownParser_instance = this;
  }
  MarkdownParser.prototype.preprocessLinkAndImage_0 = function ($receiver) {
    return $receiver;
  };
  function MarkdownParser$parse$lambda(closure$codeList) {
    return function (it) {
      closure$codeList.add_11rb$(new Pair(it.groupValues.get_za3lpa$(1), it.groupValues.get_za3lpa$(2)));
      return '<pre id=' + '"' + (closure$codeList.size - 1 | 0) + '"' + '/>';
    };
  }
  function MarkdownParser$parse$lambda_0(closure$linkList) {
    return function (it) {
      closure$linkList.add_11rb$(it.groupValues.get_za3lpa$(2));
      return '[' + it.groupValues.get_za3lpa$(1) + '](<link>' + (closure$linkList.size - 1 | 0) + '<\/link>)';
    };
  }
  function MarkdownParser$parse$lambda$lambda(closure$codeList) {
    return function (it) {
      try {
        var id = toInt(it.groupValues.get_za3lpa$(1));
        if (closure$codeList.size > id) {
          var code = closure$codeList.get_za3lpa$(id);
          var lang = !isBlank(code.first) ? 'language=' + '"' + code.first + '"' : '';
          return '<pre ' + lang + '>' + code.second + '<\/pre>';
        } else {
          return it.value;
        }
      } catch (e) {
        if (Kotlin.isType(e, Exception)) {
          return it.value;
        } else
          throw e;
      }
    };
  }
  function MarkdownParser$parse$lambda$lambda_0(closure$linkList) {
    return function (it) {
      try {
        var id = toInt(it.groupValues.get_za3lpa$(1));
        if (closure$linkList.size > id) {
          return closure$linkList.get_za3lpa$(id);
        } else {
          return it.value;
        }
      } catch (e) {
        if (Kotlin.isType(e, Exception)) {
          return it.value;
        } else
          throw e;
      }
    };
  }
  MarkdownParser.prototype.parse_61zpoe$ = function (markdown) {
    var codeList = ArrayList_init();
    var linkList = ArrayList_init();
    var preprocess = Regex_init_0('```([A-Za-z0-9-_]*)\n([\\W\\w]*?)```', RegexOption.MULTILINE).replace_20wsma$(markdown, MarkdownParser$parse$lambda(codeList));
    preprocess = Regex_init('\\[([^\\n]*?)]\\(([^\\n]*?)\\)').replace_20wsma$(preprocess, MarkdownParser$parse$lambda_0(linkList));
    var $receiver = preprocess;
    var tmp$;
    var tmp$_0 = this.makeParagraph_0(this.makeTable_0(this.makeList_0(this.makeLinkAndImage_0(this.makeCodeBlock_0(this.makeQuote_0(this.makeEmphasize_0(this.makeHeadingAtx_0(this.preprocessLinkAndImage_0(this.makeFastLink_0(this.makeDivider_0(trim(Kotlin.isCharSequence(tmp$ = $receiver) ? tmp$ : throwCCE()).toString() + '\n')))))))))));
    var tmp$_1 = Regex_init('<pre id="([0-9]+)"/>').replace_20wsma$(tmp$_0, MarkdownParser$parse$lambda$lambda(codeList));
    preprocess = Regex_init('<link>([0-9]+)<\/link>').replace_20wsma$(tmp$_1, MarkdownParser$parse$lambda$lambda_0(linkList));
    return preprocess;
  };
  function MarkdownParser$makeCheckBox$lambda(it) {
    var values = it.groupValues;
    var check = values.get_za3lpa$(1);
    var label = values.get_za3lpa$(2);
    return '<checkbox checked=' + '"' + (equals(check, ' ') ? 'false' : 'true') + '"' + '>' + label + '<\/checkbox>';
  }
  MarkdownParser.prototype.makeCheckBox_0 = function ($receiver) {
    return Regex_init_0('\\[([xX ])] ([^\\n]+$)', RegexOption.MULTILINE).replace_20wsma$($receiver, MarkdownParser$makeCheckBox$lambda);
  };
  MarkdownParser.prototype.makeParagraph_0 = function ($receiver) {
    return replace($receiver, '\n', '<br/>');
  };
  function MarkdownParser$makeQuote$lambda(this$MarkdownParser) {
    return function (it) {
      return '<blockquote>' + this$MarkdownParser.makeQuote_0(trimMargin(it.value, '>')) + '<\/blockquote>';
    };
  }
  MarkdownParser.prototype.makeQuote_0 = function ($receiver) {
    return Regex_init_0('^(\\s*>[\\W\\w]+?\\n)+', RegexOption.MULTILINE).replace_20wsma$($receiver, MarkdownParser$makeQuote$lambda(this));
  };
  function MarkdownParser$makeList$lambda(this$MarkdownParser) {
    return function (it) {
      return this$MarkdownParser.makeListHtml_0(it, 'ol');
    };
  }
  function MarkdownParser$makeList$lambda_0(this$MarkdownParser) {
    return function (it) {
      return this$MarkdownParser.makeListHtml_0(it, 'ul');
    };
  }
  MarkdownParser.prototype.makeList_0 = function ($receiver) {
    var tmp$ = Regex_init_0('^(\\s*[0-9](.|\\)) [\\W\\w]+?\\n)+', RegexOption.MULTILINE).replace_20wsma$($receiver, MarkdownParser$makeList$lambda(this));
    return Regex_init_0('^(\\s*[*+\\-] [\\W\\w]+?\\n)+', RegexOption.MULTILINE).replace_20wsma$(tmp$, MarkdownParser$makeList$lambda_0(this));
  };
  MarkdownParser.prototype.makeListHtml_0 = function ($receiver, tag) {
    var curLevel = {v: 0};
    var $receiver_0 = StringBuilder_init();
    $receiver_0.append_pdl1vj$('<' + tag + '>');
    var tmp$;
    tmp$ = lines($receiver.value).iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (!isBlank(element)) {
        var level = this.trimLevel_0(element);
        if (level > curLevel.v) {
          $receiver_0.append_pdl1vj$(repeat('<' + tag + '>', level - curLevel.v | 0));
        } else if (level < curLevel.v) {
          $receiver_0.append_pdl1vj$(repeat('<\/' + tag + '>', curLevel.v - level | 0));
        }
        curLevel.v = level;
        var tmp$_0;
        var $receiver_0_0 = Kotlin.isCharSequence(tmp$_0 = element) ? tmp$_0 : throwCCE();
        var trimStart$result;
        trimStart$break: do {
          var tmp$_0_0, tmp$_1, tmp$_2, tmp$_3;
          tmp$_0_0 = get_indices($receiver_0_0);
          tmp$_1 = tmp$_0_0.first;
          tmp$_2 = tmp$_0_0.last;
          tmp$_3 = tmp$_0_0.step;
          for (var index = tmp$_1; index <= tmp$_2; index += tmp$_3) {
            var c = toBoxedChar($receiver_0_0.charCodeAt(index));
            if (!(isDigit(unboxChar(c)) || isWhitespace(unboxChar(c)) || unboxChar(c) === 42 || unboxChar(c) === 43 || unboxChar(c) === 45 || unboxChar(c) === 46)) {
              trimStart$result = Kotlin.subSequence($receiver_0_0, index, $receiver_0_0.length);
              break trimStart$break;
            }
          }
          trimStart$result = '';
        }
         while (false);
        $receiver_0.append_pdl1vj$('<li>' + this.makeCheckBox_0(trimStart$result.toString()) + '<\/li>');
      }
    }
    $receiver_0.append_pdl1vj$(repeat('<\/' + tag + '>', curLevel.v + 1 | 0));
    return $receiver_0.toString();
  };
  MarkdownParser.prototype.trimLevel_0 = function ($receiver) {
    var tmp$;
    var count = 0;
    tmp$ = iterator($receiver);
    while (tmp$.hasNext()) {
      var c = unboxChar(tmp$.next());
      var tmp$_0;
      tmp$_0 = count;
      var tmp$_1;
      switch (c) {
        case 32:
          tmp$_1 = 1;
          break;
        case 9:
          tmp$_1 = 4;
          break;
        default:
          break;
      }
      count = tmp$_0 + tmp$_1 | 0;
    }
    return count === 0 ? 0 : ((count - 1 | 0) / 4 | 0) + 1 | 0;
  };
  MarkdownParser.prototype.makeHeadingAtx_0 = function ($receiver) {
    var regex = Regex_init_0('######+ ([^\n]+?)\n', RegexOption.MULTILINE);
    var replacement = '<h6>$1<\/h6>';
    var tmp$ = regex.replace_x2uqeu$($receiver, replacement);
    var regex_0 = Regex_init_0('##### ([^\n]+?)\n', RegexOption.MULTILINE);
    var replacement_0 = '<h5>$1<\/h5>';
    var tmp$_0 = regex_0.replace_x2uqeu$(tmp$, replacement_0);
    var regex_1 = Regex_init_0('#### ([^\n]+?)\n', RegexOption.MULTILINE);
    var replacement_1 = '<h4>$1<\/h4>';
    var tmp$_1 = regex_1.replace_x2uqeu$(tmp$_0, replacement_1);
    var regex_2 = Regex_init_0('### ([^\n]+?)\n', RegexOption.MULTILINE);
    var replacement_2 = '<h3>$1<\/h3>';
    var tmp$_2 = regex_2.replace_x2uqeu$(tmp$_1, replacement_2);
    var regex_3 = Regex_init_0('## ([^\n]+?)\n', RegexOption.MULTILINE);
    var replacement_3 = '<h2>$1<\/h2>';
    var tmp$_3 = regex_3.replace_x2uqeu$(tmp$_2, replacement_3);
    var regex_4 = Regex_init_0('# ([^\n]+?)\n', RegexOption.MULTILINE);
    var replacement_4 = '<h1>$1<\/h1>';
    return regex_4.replace_x2uqeu$(tmp$_3, replacement_4);
  };
  MarkdownParser.prototype.makeDivider_0 = function ($receiver) {
    return Regex_init_0('^(-{3,}|={3,}|\\*{3,})\\s*$', RegexOption.MULTILINE).replace_x2uqeu$($receiver, '<hr/>');
  };
  MarkdownParser.prototype.makeEmphasize_0 = function ($receiver) {
    var regex = Regex_init('\\*\\*([^*\\n][^\\n]*?)\\*\\*');
    var replacement = '<strong>$1<\/strong>';
    var tmp$ = regex.replace_x2uqeu$($receiver, replacement);
    var regex_0 = Regex_init('\\*([^*\\n]+?)\\*');
    var replacement_0 = '<em>$1<\/em>';
    var tmp$_0 = regex_0.replace_x2uqeu$(tmp$, replacement_0);
    var regex_1 = Regex_init('__([^_\\n][^\\n]*?)__');
    var replacement_1 = '<strong>$1<\/strong>';
    var tmp$_1 = regex_1.replace_x2uqeu$(tmp$_0, replacement_1);
    var regex_2 = Regex_init('_([^\\n_]+?)_');
    var replacement_2 = '<em>$1<\/em>';
    var tmp$_2 = regex_2.replace_x2uqeu$(tmp$_1, replacement_2);
    var regex_3 = Regex_init('~~([^\\n_]+?)~~');
    var replacement_3 = '<del>$1<\/del>';
    return regex_3.replace_x2uqeu$(tmp$_2, replacement_3);
  };
  MarkdownParser.prototype.makeCodeBlock_0 = function ($receiver) {
    var regex = Regex_init('`([^\\n_]*?)`');
    var replacement = '<code>$1<\/code>';
    return regex.replace_x2uqeu$($receiver, replacement);
  };
  function MarkdownParser$makeTable$lambda$lambda(s) {
    var tmp$;
    if (!isBlank(s)) {
      var tmp$_0;
      tmp$ = '<th>' + trim(Kotlin.isCharSequence(tmp$_0 = s) ? tmp$_0 : throwCCE()).toString() + '<\/th>';
    } else
      tmp$ = '';
    return tmp$;
  }
  function MarkdownParser$makeTable$lambda$lambda$lambda(s) {
    var tmp$;
    if (!isBlank(s)) {
      var tmp$_0;
      tmp$ = '<th>' + trim(Kotlin.isCharSequence(tmp$_0 = s) ? tmp$_0 : throwCCE()).toString() + '<\/th>';
    } else
      tmp$ = '';
    return tmp$;
  }
  function MarkdownParser$makeTable$lambda$lambda_0(rowString) {
    if (!isBlank(rowString)) {
      return joinToString(split(rowString, ['|']), '', '<tr>', '<\/tr>', void 0, void 0, MarkdownParser$makeTable$lambda$lambda$lambda);
    } else {
      return '';
    }
  }
  function MarkdownParser$makeTable$lambda(it) {
    var lines_0 = lines(it.value);
    if (lines_0.size > 2) {
      var head = lines_0.get_za3lpa$(0);
      var body = lines_0.subList_vux9f0$(2, lines_0.size);
      var headHtml = joinToString(split(head, ['|']), '', '<thead><tr>', '<\/tr><\/thead>', void 0, void 0, MarkdownParser$makeTable$lambda$lambda);
      var bodyHtml = joinToString(body, '', '<tbody>', '<\/tbody>', void 0, void 0, MarkdownParser$makeTable$lambda$lambda_0);
      return '<table>' + headHtml + bodyHtml + '<\/table>';
    } else {
      return it.value;
    }
  }
  MarkdownParser.prototype.makeTable_0 = function ($receiver) {
    return Regex_init_0('((\\|[^\\n|]+)+\\|)\\s*(\\|[-\\s:]+?)+\\|\\s*((\\|[^\\n|]+)+\\|\\s*)+', RegexOption.MULTILINE).replace_20wsma$($receiver, MarkdownParser$makeTable$lambda);
  };
  MarkdownParser.prototype.makeFastLink_0 = function ($receiver) {
    var regex = Regex_init('<([^\\n]+?(?:://|@)[^\\n]+?)>');
    var replacement = '<a href="$1">$1<\/a>';
    return regex.replace_x2uqeu$($receiver, replacement);
  };
  MarkdownParser.prototype.makeLinkAndImage_0 = function ($receiver) {
    var regex = Regex_init('!\\[([^\\n]*?)]\\(([^\\n]*?)\\)');
    var replacement = '<br/><img src="$2">$1<\/img><br/>';
    var tmp$ = regex.replace_x2uqeu$($receiver, replacement);
    var regex_0 = Regex_init('\\[([^\\n]*?)]\\(([^\\n]*?)\\)');
    var replacement_0 = '<a href="$2">$1<\/a>';
    return regex_0.replace_x2uqeu$(tmp$, replacement_0);
  };
  MarkdownParser.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'MarkdownParser',
    interfaces: []
  };
  var MarkdownParser_instance = null;
  function MarkdownParser_getInstance() {
    if (MarkdownParser_instance === null) {
      new MarkdownParser();
    }
    return MarkdownParser_instance;
  }
  var package$life = _.life || (_.life = {});
  var package$xeu = package$life.xeu || (package$life.xeu = {});
  var package$markdown = package$xeu.markdown || (package$xeu.markdown = {});
  package$markdown.Node = Node;
  package$markdown.Element = Element;
  package$markdown.Text = Text;
  Object.defineProperty(package$markdown, 'AstParser', {
    get: AstParser_getInstance
  });
  Object.defineProperty(State, 'Default', {
    get: State$Default_getInstance
  });
  Object.defineProperty(State, 'InTag', {
    get: State$InTag_getInstance
  });
  Object.defineProperty(State, 'AttrName', {
    get: State$AttrName_getInstance
  });
  Object.defineProperty(State, 'AttrValue', {
    get: State$AttrValue_getInstance
  });
  Object.defineProperty(State, 'AttrIdle', {
    get: State$AttrIdle_getInstance
  });
  Object.defineProperty(State, 'AttrValueInString', {
    get: State$AttrValueInString_getInstance
  });
  package$markdown.State = State;
  package$markdown.buildAST_kgbvtj$ = buildAST;
  package$markdown.ASTBuilder = ASTBuilder;
  Object.defineProperty(package$markdown, 'MarkdownParser', {
    get: MarkdownParser_getInstance
  });
  Kotlin.defineModule('markdown-js-legacy', _);
  return _;
}));

//# sourceMappingURL=markdown-js-legacy.js.map
