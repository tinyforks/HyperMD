// HyperMD, copyright (c) by laobubu
// Distributed under an MIT license: http://laobubu.net/HyperMD/LICENSE
//
// POWERPACK for "addon/fold-emoji"
//
// Use emoji-toolkit to lookup emojis and render emoji `:smile:` :smile:
//
// :warning: **License**:
//
// Please follow https://joypixels.com/licenses/free if you use this powerpack.
// 使用前請注意閱讀 emoji-toolkit 使用許可
//

import * as _emoji_toolkit_module from 'emoji-toolkit'
import { defaultOption, EmojiChecker, EmojiRenderer } from '../addon/fold-emoji'

import 'emoji-toolkit/extras/css/joypixels.min.css'

/** emojiToolkit doesn't have AMD declaration. load it from browser if needed */
var emojiToolkit: typeof _emoji_toolkit_module = _emoji_toolkit_module || this['emoji-toolkit'] || window['joypixels']

export const emojiToolkitChecker: EmojiChecker = (text) => emojiToolkit.shortnameToUnicode(text) != text;
export const emojiToolkitRenderer: EmojiRenderer = (text) => {
  var html = emojiToolkit.shortnameToImage(text)
  if (!/^<img /i.test(html)) return null

  var attr = /([\w-]+)="(.+?)"/g
  var ans = document.createElement("img")
  var t: RegExpMatchArray
  while (t = attr.exec(html)) ans.setAttribute(t[1], t[2])
  return ans
}

// Update default EmojiChecker and EmojiRenderer
if (emojiToolkit) {
  defaultOption.emojiChecker = emojiToolkitChecker
  defaultOption.emojiRenderer = emojiToolkitRenderer
} else {
  console.error("[HyperMD] PowerPack fold-emoji-with-emoji-toolkit loaded, but emoji-toolkit not found.")
}
