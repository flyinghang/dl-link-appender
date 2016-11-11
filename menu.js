var links = "";


function updateClipboard(data){
  var t = document.createTextNode(data);

  document.body.append(t);

  var range = document.createRange();
  range.selectNode(t);
  window.getSelection().addRange(range);

  try {
    var successful = document.execCommand('copy');  
    var msg = successful ? 'successful' : 'unsuccessful';  
    console.log('Copy command was ' + msg);  
  }catch (err){
    console.log("copy failed.");
  }


  window.getSelection().removeAllRanges();

  document.body.removeChild(t);

}

// A generic onclick callback function.
function genericOnClick(info, tab) {
  //console.log("the links: " + links);
  //console.log("get url: " + info.linkUrl);

  links = links + "\r\n\r\n"+ info.linkUrl;

  updateClipboard(links);
}


// Create a parent item and two children.
//var parent = chrome.contextMenus.create({"title": "Link To DL List"});


// Create one test item for each context type.
var id1 = chrome.contextMenus.create({"title": "Append Link to Clipboard", "contexts":["link"],
                                      "onclick": genericOnClick});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.pasted == links)

      console.log(pasted);
      console.log(links);
      console.log('links are pasted, now clear it all');

      links = "";

      sendResponse({dl: "clear buffer OK"});
  });