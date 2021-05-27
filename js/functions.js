

function moveBtn(e) {
    const btn = document.getElementById('rt-button');
    btn.style.top = pos.y + "px";
    btn.style.left = pos.x + "px";

}

function showBtn() {
    btnexis = 1;
    document.getElementById("rt-button").style.visibility = "visible";//visible,hidden.
}

function hideBtn() {
    btnexis = 0;
    document.getElementById("rt-button").style.visibility = "hidden";//visible,hidden.
}

function getMousePos(e) {
    var scrollX = window.pageXOffset;
    var scrollY = window.pageYOffset;
    var x = e.clientX + scrollX;
    var y = e.clientY + scrollY;
    console.log(e.clientY, e.clientX);
    console.log(scrollY, scrollX);
    pos.x = x;
    pos.y = y;
    console.log(pos.y, pos.x);
}

function moveContainer(e) {
    const container = document.getElementById('rt-container');
    container.style.top = pos.y + "px";
    container.style.left = pos.x + "px";
}

function showContainer() {
    containerexis = 1;
    document.getElementById("rt-container").style.visibility = "visible";
    document.getElementById("rt-button").style.visibility = "hidden";
    renderwaiting(inform);
    sendtoBackground(text, -1);
    text = "";//清空text

}

function hideContainer() {
    var c = document.getElementById("rt-container");
    c.style.visibility = "hidden";//visible,hidden
    containerexis = 0;
    c.innerHTML = '';
    console.log("清空渲染");
    inform = [
        {
            result: "",
            source: "",
            abstract: "请稍后"
        },
        {
            result: "",
            source: "",
            abstract: "请稍后"
        },
        {
            result: "",
            source: "",
            abstract: "请稍后"
        }

    ];
    rendered = 0;

}

function sendtoBackground(text, signal) {
    var messages = {
        sentence: text,
        signal: signal
    };
    chrome.runtime.sendMessage(messages);    //向background.js发送信息


    var messagejson = JSON.stringify(messages);//为了打印转成json
    //message是js对象，messagejson是json字符串
    console.log('messagejson->\n' + messagejson);
}
