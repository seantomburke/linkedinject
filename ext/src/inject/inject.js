var enabled = true;

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log(request, sender, sendResponse);

        if(request.action === 'getEnabled'){
            console.log('sending get enabled!');
            sendResponse({enabled: enabled});
        }
        else if(request.action === 'showIn'){
            showIn();
            enabled = request.enabled;
            sendResponse({enabled: enabled});
        }
        else if(request.action === 'hideIn'){
            hideIn();
            enabled = request.enabled;
            sendResponse({enabled: enabled});
        }

    });

if(enabled){
    showIn();
}else{
    hideIn();
}

function showIn(){
    console.log('Showing IN');
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            $('p,h1,h2,h3,h4,h5,h6,a,span').each(function (i, el) {
                el.innerHTML = addIn(el.innerHTML);
            });
        }

    }, 10);

    function addIn(innerHTML){
        var html = $.parseHTML(innerHTML),
            t = '';
        if(html === null){
            return t;
        }
        $.each(html, function(i, el){
            if(el.nodeName === '#text'){
                t += el.textContent.replace(/in/gi, "<div class='linkedinject'>in</div>");
            }
            else {
                t += el.outerHTML;
            }
        });
        return t;
    }
}

function hideIn() {
    console.log('hiding IN');
    $('div.linkedinject').each(function(i,el){
        el.outerHTML = 'in';
    });
}

