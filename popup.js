var object = {};

window.onload = function () {
    document.getElementById("rt-pops").addEventListener("click", sendTocontentscript);
    const url = 'https://www.tsunaley.cn/news';
    fetch(url)
        .then((responsejson) => {
                responsetext = responsejson.text();
                return responsetext;
            }
        )
        .then((responsetext) => {
                console.log(responsetext);
                object = JSON.parse(responsetext);
                console.log(object);
                let title = document.getElementById('rtpop-title');
                title.innerText = object[0].title;
                let laiyuan = document.getElementById('rtpop-source');
                laiyuan.innerText = '来源：' + object[0].source;
                let result = document.getElementById("rtpop-result");
                result.innerText = object[0].result;
                let abstract = document.getElementById("rtpop-abstract");
                abstract.innerText = object[0].abstract;

            }
        )
}

function sendTocontentscript() {
    chrome.tabs.query({active: true, currentWindow: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {sig: -1},);
        });
}
