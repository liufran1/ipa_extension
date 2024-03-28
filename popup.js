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

});

function findElementsWithRegex(regexPattern) {
  let matchedElements = [];

  // Select all elements on the webpage
  let allElements = document.querySelectorAll('*');

  // Iterate through each element
  allElements.forEach(element => {
    // Check if the element's text content matches the regex pattern
    if (regexPattern.test(element.textContent)) {
      // If it matches, add it to the list of matched elements
      matchedElements.push(element);
    }
  });

  return matchedElements;
}

function replaceRegex(element, regexPattern) {
  let matches = element.textContent.matchAll(regexPattern);
  console.log(matches)
  matches.forEach(match => {
    // console.log(match)

    let highlightedHtml = element.innerHTML.replace(match[1], '<span class="highlighted">$&</span>');
    element.innerHTML = highlightedHtml;
  })
}

function highlightIPA() {
  // creating the actual regex is difficult due to the different characters used
  // see unicode block range https://jrgraphix.net/research/unicode_blocks.php
  // var ipaRegex = '\/([\u0020-\u1FFF]+|[ˈˌ][\u0020-\u1FFF])\/g';
  const ipaRegex = [/IPA: \[([\u0020-\u1FFF]+|[ˈˌ][\u0020-\u1FFF])\]/g, /\/([\u0020-\u1FFF]+|[ˈˌ][\u0020-\u1FFF])\//g]
  ipaRegex.forEach(regexPattern => {
    let matchedElements = findElementsWithRegex(regexPattern);

    matchedElements.forEach(element => {
      replaceRegex(element, regexPattern)
    })
  })
}