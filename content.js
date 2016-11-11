
$('input, textarea').on('paste',pasteEventProcess);



function pasteEventProcess(e){
	var pastedData = e.originalEvent.clipboardData.getData('text');
    console.log(pastedData);

    chrome.runtime.sendMessage({pasted: pastedData}, function(response) {
    	if (response.dl){
    		console.log("has the response from background script." + response.dl);	
    	}
  		
	});
}