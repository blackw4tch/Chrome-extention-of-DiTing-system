var a = {};
var tabid=0;
var btnsig = {sig:0};

chrome.runtime.onMessage.addListener(
    function (messages, sender, sendResponse) {
        tabid = sender.tab.id;
        console.log("signal:"+messages.signal);
        if (messages.signal === -1) {
            //划词
            let url = "https://www.tsunaley.cn/checks?sentence=" + messages.sentence;
            fetch(url, {
                method: 'GET'
            })
                .then((res) => {
                    var responsetext = res.text();
                    return responsetext;
                })
                .then((res) => {
                    a = res;
                    console.log('1');
                    console.log(a);
                    if(JSON.parse(a).length===1){
                        console.log("weibo");
                        let url2='https://www.tsunaley.cn/weibo?sentence=' + messages.sentence;
                        fetch(url2, {
                            method: 'GET'
                        })
                            .then((res) => {
                                var responsetext = res.text();
                                return responsetext;
                            })
                            .then((res) => {
                                var c = JSON.parse(res);
                                c.sig=-2
                                console.log('2');
                                console.log(c);
                                chrome.tabs.sendMessage(tabid, c);
                            })}
                    chrome.tabs.sendMessage(tabid, a);

                })

        }
        //主动推送第一次查询
        if (messages.signal === 0) {
            let url = "https://www.tsunaley.cn/recent?text=" + messages.text;
            fetch(url, {
                method: 'GET',
            })
                .then((res) => {
                    var responsetext = res.text();
                    return responsetext;
                })
                .then((res) => {
                    var b = JSON.parse(res);
                    b.sig = 0;
                    b.divid=messages.id;
                    console.log(b.divid);
                    chrome.tabs.sendMessage(tabid, b);
                })
        }
            //主动推送第二次查询
        if (messages.signal === 1) {
            btnsig.sig = 1;
            let url = "https://www.tsunaley.cn/second?text=" + messages.text;
            fetch(url, {
                method: 'GET',
            })
                .then((res) => {
                    var responsetext = res.text();
                    return responsetext;
                })
                .then((res) => {
                    var d = JSON.parse(res);
                    d.sig = 1;
                    d.divid=messages.divid;
                    console.log(d.divid);
                    chrome.tabs.sendMessage(tabid, d);
                })
        }
        //主动第三次推送
        if(messages.signal === 2){
            console.log('第三次推送');
            console.log(messages.text);
            let url = "https://www.tsunaley.cn/show?id=" + messages.uid + "&text=" + messages.text;
            console.log(url);
            fetch(url, {
                method: 'GET',
            })
                .then((res) => {
                    var responsetext = res.text();
                    return responsetext;
                })
                .then((res) => {
                    var e = JSON.parse(res);
                    e.sig = 2;
                    e.divid=messages.id;
                    console.log('e');
                    console.log(e);
                    chrome.tabs.sendMessage(tabid, e);
                })
        }
    }
)
