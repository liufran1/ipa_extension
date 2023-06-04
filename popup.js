document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('highlightButton');
  button.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: highlightIPA
      });
    });
  });

  function highlightIPA() {
    // var ipaRegex = \/\\b([a-zA-Zɑɔæɛəɜɪiːɨʉuːʊɒɔːœɶʏʌɤɯˈˌ]+|[ˈˌ][a-zA-Zɑɔæɛəɜɪiːɨʉuːʊɒɔːœɶʏʌɤɯ]+)/g;
// creating the actual regex is difficult due to the different characters used
    // see unicode block range https://jrgraphix.net/research/unicode_blocks.php
    var ipaRegex = '\/([\u0020-\u1FFF]+|[ˈˌ][\u0020-\u1FFF])\/g';

    // var ipaRegex = 'Grand Prix'
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];
        if (node.nodeType === 3) { //look at all text nodes in the html
          var text = node.nodeValue;          
          var replacedText = text.replace(ipaRegex, '<span style="background-color: yellow;">$&</span>');
          console.log(replacedText)
          if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
  //           var span = document.createElement('span');

  //           element.replaceChild(span, node);
  //             span.style.backgroundColor = 'yellow';
  // span.innerHTML = replacedText;
  // var fragment = document.createDocumentFragment();
  // var span = document.createElement('span');
  // span.style.backgroundColor = 'yellow';
  // span.innerHTML = replacedText;
  // fragment.appendChild(span);
  // element.replaceChild(fragment, node);
          }
        }
      }
      // http://ipa-reader.xyz/
    }
  }

  // function highlightIPA() {
  //   // var ipaRegex = 'Grand Prix'
  //   // var ipaRegex = '/\\b([a-zA-Zɑɔæɛəɜɪiːɨʉuːʊɒɔːœɶʏʌɤɯˈˌ]+|[ˈˌ][a-zA-Zɑɔæɛəɜɪiːɨʉuːʊɒɔːœɶʏʌɤɯ]+)///g';
  //   document.body.innerHTML = document.body.innerHTML.replace(ipaRegex, '<span style="background-color: yellow;">$&</span>');

  // }
//   function highlightIPA() {
//   // var ipaRegex = /\\b([a-zA-Zɑɔæɛəɜɪiːɨʉuːʊɒɔːœɶʏʌɤɯˈˌ]+|[ˈˌ][a-zA-Zɑɔæɛəɜɪiːɨʉuːʊɒɔːœɶʏʌɤɯ]+)/g;
//   var ipaRegex = 'Grand Prix'
//   var elements = document.getElementsByTagName('*');
//   for (var i = 0; i < elements.length; i++) {
//     var element = elements[i];
//     var hasReplaced = false; // Flag to track replacement

//     for (var j = 0; j < element.childNodes.length; j++) {
//       var node = element.childNodes[j];
      
//       if (node.nodeType === 3) {
//         var text = node.nodeValue;
//         var replacedText = text.replace(ipaRegex, '<span style="background-color: yellow;">$&</span>');
        
//         if (replacedText !== text) {
//           console.log(replacedText)
//           if (!hasReplaced) {
//             var span = document.createElement('span');
//             span.style.backgroundColor = 'yellow';
//             hasReplaced = true;
//             element.replaceChild(span, node);
//             span.innerHTML = replacedText;
//           } else {
//             var span = document.createElement('span');
//             span.style.backgroundColor = 'yellow';
//             span.innerHTML = replacedText;
//             node.parentNode.insertBefore(span, node.nextSibling);
//           }
//         }
//       }
//     }
//   }
// }

});
