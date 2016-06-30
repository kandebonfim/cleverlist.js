class @CleverList
  constructor: (@content, @limit = 3) ->
    return "#{@toSentence(@content, @limit)} liked your foto."

  toSentence: (arr, limit) ->
    if arr.length > limit+1 and limit then last = "#{arr.length-limit} others"; arr = arr.splice(0,limit) else last = arr.pop()
    unless arr.length then last else "#{arr.join(', ')} and #{last}"
