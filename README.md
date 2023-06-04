Building an extension that reads out the pronounciation of text that is detected as (International Phonetic Alphabet)[https://en.wikipedia.org/wiki/International_Phonetic_Alphabet] notation

**To Do**
* Detect text properly using regex
* Insert span when text is detected - currently the way the loop over all html elements is set up results in an infinite loop as new spans are detected
* Call a pronouncer to read the text out, like http://ipa-reader.xyz/