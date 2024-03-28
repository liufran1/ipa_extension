Building an extension that reads out the pronounciation of text that is detected as [International Phonetic Alphabet](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) notation

**To Do**
* Detect text properly using regex
* Action on page load - https://developer.chrome.com/docs/extensions/reference/api/action#inject_a_content_script_on_click
* Call a pronouncer to read the text out, like http://ipa-reader.xyz/ - AWS Polly provides this https://cuttlesoft.com/blog/2018/09/13/pronouncing-things-with-amazons-polly/. Would want to lock it down so the user configures the lambda