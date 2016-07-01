class @CleverList
  constructor: (@content) ->
    @tpl = {} # templates
    @def =  # default settings
      append: '.'
      last: ' and '
      others: ' others'
      comma: ', '
      limit: 3
      type: 'string'

  toSentence: (arr) ->
    if arr.length > @def.limit+1 then last = "#{arr.length-@def.limit}#{@def.others}"; arr = arr.splice(0,@def.limit) else last = arr.pop()
    unless arr.length then last else "#{arr.join(@def.comma)}#{@def.last}#{last}"

  addTemplate: (template, settings) ->
    @tpl[template] = settings

  withTemplate: (template, content) ->
    @content = content
    if @tpl[template] then currentTemplate = @tpl[template] else console.error 'Template not found.'
    for k of @def
      if currentTemplate[k] then @def[k] = currentTemplate[k]
    @result()

  objectToLink: ->
    @objectToArray()
    for i, k in @content
      el = document.createElement("a")
      if @wasObject
        [el.innerText, el.href] = [@resolveobject('attributes.name', i), @resolveobject('attributes.url', i)]
      else
        [el.innerText, el.href] = [i[0], i[1]]
      @content[k] = el.outerHTML

  objectToArray: ->
    @content = @resolveobject('data', @content)
    @wasObject = true

  resolveobject: (path, obj, safe) ->
    path.split('.').reduce ((prev, curr) ->
      if !safe then prev[curr] else if prev then prev[curr] else undefined
    ), obj or self

  result: ->
    if @def.type is 'link' then @objectToLink()
    "#{@toSentence(@content)}#{@def.append}"
