//为主动推送增加id
function sendtoBackground_zd(text, uid, divid, signal) {
    var messages = {
        text: text,
        id: uid,
        divid: divid,
        signal: signal
    };
    chrome.runtime.sendMessage(messages);

    async function test() {
        await sleep(1000)
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    test()
    messages.signal = 1;//向background.js发送信息
    chrome.runtime.sendMessage(messages);    //向background.js发送信息

}

//主动推送渲染
function zhudongtuisong_render(level, id) {
    // console.log("第一次查询")
    var getdiv = document.getElementById(id);
    if (level == 0) {
        getdiv.classList.add('rt-orange');
    }
    if (level == 1) {
        getdiv.classList.add('rt-red');
    }
}

function zhudongtuisong_second_render(level, id) {
    // console.log('第二次查询');
    var getdiv = document.getElementById(id);
    if (level == 0) {
        getdiv.classList.add('rt-green');
    }
    if (level == 1) {
        getdiv.classList.add('rt-red');
    }
}

function zhudongtuisong_third_render(object) {
    for (i = 0; i <= 2; i++) {
        if (object.result[0].news[i].result.substr(0, 1) === '假' || object.result[0].news[i].result.substr(0, 1) === '疑' || object.result[0].news[i].result.substr(0, 1) === '谣') {
            truth[i] = 'rt-wrong';
        } else if (object.result[0].news[i].result.substr(0, 1) === '辟' || object.result[0].news[i].result.substr(0, 1) === '真' || object.result[0].news[i].result.substr(0, 1) === '新') {
            truth[i] = 'rt-trued';
        }
    }
    var containerhtml = `
<div id="rt-header">谛听-基于nlp的谣言检测系统</div>
<div id="rt-body">
    <div id = 'kxd-div'>
    <span>该用户的可信度为：${object.score}</span>
    </div>
    <hr/>
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object.result[0].news[0].source}</span>
    </br>
    <span class="${truth[0]}">${object.result[0].news[0].result}</span>
    <span class = "abstract">${object.result[0].news[0].abstract.substr(0, 100)}...</span>
    </div>
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt1">有用</button>
    <button class = 'rt-zbw' id="rt-zbw1">没用</button>

    <hr/>
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object.result[0].news[1].source}</span>
    </br>
    <span class="${truth[1]}">${object.result[0].news[1].result}</span>
    <span class = "abstract">${object.result[0].news[1].abstract.substr(0, 100)}...</span>
    </div>
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt2">有用</button>
    <button class = 'rt-zbw' id="rt-zbw2">没用</button>

    <hr/>
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object.result[0].news[2].source}</span>
    </br>
    <span class="${truth[2]}">${object.result[0].news[2].result}</span>
    <span ckass = "abstract">${object.result[0].news[2].abstract.substr(0, 100)}...</span>
    </div>
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt3">有用</button>
    <button class = 'rt-zbw' id="rt-zbw3">没用</button>

</div>

<div id="rt-footer"></div>
    `
    const container = document.getElementById("rt-container");
    container.innerHTML = '';
    container.innerHTML = containerhtml;
    document.getElementById("rt-container").style.visibility = "visible";
}

function zd_showContainer(e) {
    var obj = {
        id: weibo[e.target.id].id,
        uid: weibo[e.target.id].uid,
        text: weibo[e.target.id].text,
        signal: 2
    };
    chrome.runtime.sendMessage(obj);
    console.log("第三次查询");
    getMousePos(e);
    moveContainer();
    containerexis = 1;
    document.getElementById("rt-container").style.visibility = "visible";
    renderwaiting(inform);
}
function zhudongtuisong() {

//脚本中console.log()用于调试，后期可注释掉，也可不注释，没啥影响

// weibo_obj就是对应的当前这条微博的对象
// weibo_obj={id:"xxxxx",text="xxxxxx"}

//这里根据具体内容改，也就是在这里写 在父标签中 一个子标签的内容 比如插一段<p> 或者 一个 <button>
// var 标签 = document.createElement("标签名");
// 标签.innerText = "文本";
// result.appendChild(标签)
    var url = window.location;
    // if (url.host == "d.weibo.com") {
    //     var body = document.getElementsByTagName('html')[0].outerHTML;
    //     var evaluator = new XPathEvaluator();
    //     var xpath = '//*[contains(@id,"_Core_NewMixFeed")]/div/div[@node-type="feed_list"]';
    //     var parent = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //      i = 1;
    //     var n = parent.childElementCount;
    //     while (1) {
    //
    //         //如果有展开全文，则点击
    //         var opt = evaluator.evaluate(xpath + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@class='WB_text W_f14']/a[@class='WB_text_opt']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //         if (opt) {
    //             opt.click();
    //         }
    //         i++;
    //         if (i == n) break;
    //     }
    //     setTimeout(function () {
    //         i = 1
    //         while (1) {
    //             // var weibo = [];
    //             //result2为展开全文后的文本标签，result1为没有展开全文的文本标签
    //             var result1 = evaluator.evaluate(xpath + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@class='WB_text W_f14']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //             var result2 = evaluator.evaluate(xpath + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@node-type='feed_list_content_full']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //             var div = evaluator.evaluate(xpath + "/div[" + i + "]", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //
    //
    //             if (result2) {
    //                 var tbinfo = div.getAttribute("tbinfo");
    //                 var uidarray = tbinfo.match(/\d+/g);
    //                 var uid = uidarray[0];
    //
    //                 console.log(result2);
    //
    //                 var weibo_obj = {id:i,uid: uid, text: result2.outerText};
    //
    //                 weibo.push(weibo_obj);
    //
    //                 //weibo_obj就是当前微博对应的对象，有id和text
    //
    //                 console.log(weibo_obj);
    //                 sendtoBackground_zd(weibo_obj.text, weibo_obj.id, i, 0);
    //                 //在对应标签下添加新的子标签  也就是在这添加按钮*******
    //                 var p = document.createElement("button");
    //                 p.setAttribute("type", "button");
    //                 p.setAttribute("class", 'shows');
    //                 p.setAttribute("id", i);
    //                 result1.appendChild(p)
    //                 //******************************
    //             } else {
    //                 var tbinfo = div.getAttribute("tbinfo");
    //                 var uidarray = tbinfo.match(/\d+/g);
    //                 var uid = uidarray[0];
    //
    //                 console.log(result1);
    //
    //                 var weibo_obj = {id:i,uid: uid, text: result1.outerText}
    //
    //                 weibo.push(weibo_obj);
    //                 //weibo_obj就是当前微博对应的对象，有id和text
    //                 console.log(weibo_obj);
    //                 sendtoBackground_zd(weibo_obj.text, weibo_obj.id, i, 0);
    //                 //在对应标签下添加新的子标签  也就是在这添加按钮*******
    //                 var p = document.createElement("button");
    //                 p.setAttribute("type", "button");
    //                 p.setAttribute("class", 'shows');
    //                 p.setAttribute("id", i);
    //                 result1.appendChild(p)
    //                 //*********************************
    //             }
    //             i++;
    //
    //             if (i == n) break;
    //         };
    //     }, 500);
    // };

    if (url.host == "weibo.com") {

        var eva = new XPathEvaluator();
        var pan = 0;
        if (eva.evaluate('//*[contains(@id,"Pl_Official_WeiboDetail_")]/div/div/div/div[@class="WB_feed_detail clearfix"]/div[@class="WB_detail"]/div[@class="WB_text W_f14"]', document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext()) pan = 2;
        else pan = 1;
        if (pan == 1) {
            console.log('pan=1')
            var body = document.getElementsByTagName('html')[0].outerHTML;
            var evaluator = new XPathEvaluator();
            var xpath1 = '//*[contains(@id,"_Official_MyProfileFeed")]/div[@node-type="feed_list"]';

            var xpath2 = '//*[contains(@id,"_content_homefeed")]/div/div[@node-type="feed_list"]';
            var parent1 = evaluator.evaluate(xpath1, document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();

            var parent2 = evaluator.evaluate(xpath2, document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();

            if (parent2) {
                console.log('parent2=1')
                var i = 1;
                var n = parent2.childElementCount;
                while (1) {

                    var opt = evaluator.evaluate(xpath2 + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@class='WB_text W_f14']/a[@class='WB_text_opt']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                    if (opt) {
                        opt.click();
                    }
                    i++;
                    if (i == n) break;
                }
                setTimeout(function () {
                    i = 1
                    while (1) {
                        var result1 = evaluator.evaluate(xpath2 + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@class='WB_text W_f14']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                        var result2 = evaluator.evaluate(xpath2 + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@node-type='feed_list_content_full']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                        var div = evaluator.evaluate(xpath2 + "/div[" + i + "]", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();

                        if (result2) {
                            console.log('result2=1');

                            var tbinfo = div.getAttribute("tbinfo");
                            var uidarray = tbinfo.match(/\d+/g);
                            var uid = uidarray[0];

                            var weibo_obj = {id: i, uid: uid, text: result2.outerText};
                            weibo.push(weibo_obj);
                            //weibo_obj就是当前微博对应的对象，有id和text
                            console.log(weibo_obj);

                            sendtoBackground_zd(weibo_obj.text, weibo_obj.uid, i, 0);
                            //在对应标签下添加新的子标签  也就是在这添加按钮*******
                            var p = document.createElement("button");
                            p.setAttribute("type", "button");
                            p.setAttribute("class", 'shows');
                            p.setAttribute("id", i);
                            result1.appendChild(p)
                            // document.getElementById(i).addEventListener('click',zd_showContainer,false);
                            //*****************************
                        } else {
                            console.log('result2=0')
                            var tbinfo = div.getAttribute("tbinfo");
                            var uidarray = tbinfo.match(/\d+/g);
                            var uid = uidarray[0];

                            // console.log(result1);

                            var weibo_obj = {id: i, uid: uid, text: result1.outerText}

                            weibo.push(weibo_obj);
                            //weibo_obj就是当前微博对应的对象，有id和text
                            console.log(weibo_obj);
                            sendtoBackground_zd(weibo_obj.text, weibo_obj.uid, i, 0);
                            //在对应标签下添加新的子标签  也就是在这添加按钮*******
                            var p = document.createElement("button");
                            p.setAttribute("type", "button");
                            p.setAttribute("class", 'shows');
                            p.setAttribute("id", i);
                            result1.appendChild(p);
                            document.getElementById(i).addEventListener('click', function (e) {
                                zd_showContainer(e);
                            }, false);

                            //************************
                        }

                        i++;
                        if (i == n) break;
                    }
                    ;
                }, 500);
            }
            ;
            if (parent1) {
                console.log('parent1=1')
                var i = 1;

                var n = parent1.childElementCount;
                while (1) {

                    var opt = evaluator.evaluate(xpath1 + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@class='WB_text W_f14']/a[@class='WB_text_opt']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                    if (opt) {
                        opt.click();
                    }
                    i++;
                    if (i == n) break;
                }
                setTimeout(function () {
                    i = 1
                    while (1) {
                        if (!(evaluator.evaluate(xpath1 + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@class='WB_text W_f14']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext())) {
                            i++;
                            continue;
                        }

                        // var weibo = []
                        var result1 = evaluator.evaluate(xpath1 + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@class='WB_text W_f14']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                        var result2 = evaluator.evaluate(xpath1 + "/div[" + i + "]/div[@class='WB_feed_detail clearfix']/div[@class='WB_detail']/div[@node-type='feed_list_content_full']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
                        var div = evaluator.evaluate(xpath1 + "/div[" + i + "]", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();

                        if (result2) {
                            console.log('result2=1')
                            var tbinfo = div.getAttribute("tbinfo");
                            var uidarray = tbinfo.match(/\d+/g);
                            var uid = uidarray[0];

                            var weibo_obj = {id: i, uid: uid, text: result2.outerText};

                            weibo.push(weibo_obj);

                            //weibo_obj就是当前微博对应的对象，有id和text
                            console.log(weibo_obj);

                            // console.log(result2);
                            //在对应标签下添加新的子标签  也就是在这添加按钮*******
                            var p = document.createElement("button");
                            p.setAttribute("type", "button");
                            p.setAttribute("class", 'shows');
                            p.setAttribute("id", i);
                            result1.appendChild(p)
                            //************************
                        } else
                            console.log('result2=0')
                        var tbinfo = div.getAttribute("tbinfo");
                        var uidarray = tbinfo.match(/\d+/g);
                        var uid = uidarray[0];
                        var weibo_obj = {id: i, uid: uid, text: result1.outerText};

                        weibo.push(weibo_obj);

                        //weibo_obj就是当前微博对应的对象，有id和text
                        console.log(weibo_obj);
                        sendtoBackground_zd(weibo_obj.text, weibo_obj.uid, i, 0);
                        //在对应标签下添加新的子标签  也就是在这添加按钮*******
                        var p = document.createElement("button");
                        p.setAttribute("type", "button");
                        p.setAttribute("class", 'shows');
                        p.setAttribute("id", i);
                        result1.appendChild(p)
                        //****************************
                        i++;
                        if (i == n) break;
                    }
                    ;
                }, 500);
            }
        }
        if (pan == 2) {
            console.log(111)
            // var weibo = [];
            var body = document.getElementsByTagName('html')[0].outerHTML;
            var evaluator = new XPathEvaluator();
            var xpath = '//*[contains(@id,"Official_WeiboDetail_")]/div/div/div/div[@class="WB_feed_detail clearfix"]/div[@class="WB_detail"]/div[@class="WB_text W_f14"]';
            var result = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
            var divxpath = '//*[contains(@id,"Official_WeiboDetail_")]/div/div/div';
            var div = evaluator.evaluate(divxpath, document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
            var tbinfo = div.getAttribute("tbinfo");
            var uidarray = tbinfo.match(/\d+/g);
            var uid = uidarray[0];
            var weibo_obj = {id: i, uid: uid, text: result.outerText};

            weibo.push(weibo_obj);
            console.log(weibo_obj);

            // console.log(result);

            //在对应标签下添加新的子标签  也就是在这添加按钮*******
            var p = document.createElement("button");
            p.setAttribute("type", "button");
            p.setAttribute("class", 'shows');
            p.setAttribute("id", i);
            result1.appendChild(p)
            // document.getElementById(i).addEventListener('click',zd_showContainer,false);

            //**********************
        }
    }
    ;


    // if (url.host == "s.weibo.com") {
    //     var body = document.getElementsByTagName('html')[0].outerHTML;
    //     var evaluator = new XPathEvaluator();
    //     var xpath = '//*[contains(@id,"_feedlist_index")]/div[1]';
    //     var parent = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //     var i = 1;
    //     var n = parent.childElementCount;
    //     while (1) {
    //         // var weibo = [];
    //         var pan1 = 0
    //         var opt = evaluator.evaluate(xpath + "/div[" + i + "]/div[@class='card']/div[@class='card-feed']/div[@class='content']/p[@node-type='feed_list_content_full']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //         var txt = evaluator.evaluate(xpath + "/div[" + i + "]/div[@class='card']/div[@class='card-feed']/div[@class='content']/p[@node-type='feed_list_content']", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //         var uid_a = evaluator.evaluate(xpath + "/div[" + i + "]/div[@class='card']/div[@class='card-feed']/div[@class='avator']/a", document.documentElement, null, XPathResult.ANY_TYPE, null).iterateNext();
    //         if (opt) {
    //             var href = uid_a.getAttribute("href");
    //             var uidarray = href.match(/\d+/g);
    //             var uid = uidarray[0];
    //             var weibo_obj = {id: uid, text: opt.outerText};
    //             weibo.push(weibo_obj);
    //             console.log(opt);
    //             console.log(weibo_obj);
    //             //在对应标签下添加新的子标签  也就是在这添加按钮*******
    //             var p = document.createElement("p");
    //             p.innerText = "文本";
    //             opt.parentElement.appendChild(p)
    //             pan1 = 1;
    //             //************
    //         }
    //         if (txt && pan1 == 0) {
    //             var href = uid_a.getAttribute("href");
    //             var uidarray = href.match(/\d+/g);
    //             var uid = uidarray[0];
    //             var weibo_obj = {id:i,uid: uid, text: txt.outerText};
    //             weibo.push(weibo_obj);
    //
    //             console.log(txt);
    //             console.log(weibo_obj);
    //             sendtoBackground_zd(weibo_obj.text, weibo_obj.id, i, 0);
    //             //在对应标签下添加新的子标签  也就是在这添加按钮*******
    //             var p = document.createElement("button");
    //             p.setAttribute("type", "button");
    //             p.setAttribute("class", 'shows');
    //             p.setAttribute("id", i);
    //             result1.appendChild(p)
    //             //************
    //         }
    //         i++;
    //         if (i == n) break;
    //     }
    //     ;
    // }
}