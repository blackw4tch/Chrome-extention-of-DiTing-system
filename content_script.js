var pos = {
    x: 1,
    y: 1
};//鼠标位置初始化
var buttonpos = {};//按钮位置初始化
var alldivpos = {};//rt-alldiv位置初始化
var text = "";//划取的值初始化
var totextarea = '';//显示在文本框中的值初始化
var containerexis = 0;
var btnexis = 0;
var zhudonged = 0;//标记主动推送是否执行guo
var inform = [
    {
        result: "",
        source: "",
        abstract: "请稍后..."
    },
    {
        result: "",
        source: "",
        abstract: "请稍后..."
    },
    {
        result: "",
        source: "",
        abstract: "请稍后..."
    }

];
var rendered = 0;
var truth = {};
var shownum = {};
var weibo = [{}];
var divid = 1;

// 按钮查询textarea中的值
function chaxunbtn() {
    var text = document.getElementById('rt-textarea').value;
    console.log(text);
    var messages = {
        sentence: text,
        signal: -1
    };
    chrome.runtime.sendMessage(messages);

    var messagejson = JSON.stringify(messages);
    console.log('messagejson->\n' + messagejson);
}



function checkInbox(e) {
    if (containerexis === 0) {
        return true
    } else {
        var obj = document.getElementById("rt-container")
        var x = Number(e.clientX) // 鼠标相对屏幕横坐标
        var y = Number(e.clientY) // 鼠标相对屏幕纵坐标
        var div_x = Number(obj.getBoundingClientRect().left) // obj相对屏幕的横坐标
        var div_x_width = Number(
            obj.getBoundingClientRect().left + obj.clientWidth
        ) // obj相对屏幕的横坐标+width

        var div_y = Number(obj.getBoundingClientRect().top) // obj相对屏幕的纵坐标
        var div_y_height = Number(
            obj.getBoundingClientRect().top + obj.clientHeight
        ) // obj相对屏幕的纵坐标+height

        if (x > div_x && x < div_x_width && y > div_y && y < div_y_height) {
            return true;
        } else {
            hideContainer()

        }
    }
}
function checkInbtn(e) {
    if (btnexis === 0) {
        return true;
    } else {
        var obj = document.getElementById("rt-button")
        var x = Number(e.clientX) // 鼠标相对屏幕横坐标
        var y = Number(e.clientY) // 鼠标相对屏幕纵坐标

        var div_x = Number(obj.getBoundingClientRect().left) // obj相对屏幕的横坐标
        var div_x_width = Number(
            obj.getBoundingClientRect().left + obj.clientWidth
        ) // obj相对屏幕的横坐标+width
        var div_y = Number(obj.getBoundingClientRect().top) // obj相对屏幕的纵坐标
        var div_y_height = Number(
            obj.getBoundingClientRect().top + obj.clientHeight
        ) // obj相对屏幕的纵坐标+height

        if (x > div_x && x < div_x_width && y > div_y && y < div_y_height) {
            return true;
        } else {
            hideBtn()
        }
    }
}
function mouseUp(e) {
    if (containerexis === 1 || btnexis === 1) {
        return;
    }//如果已经出现按钮就不再启动
    if (window.getSelection) {
        text = window.getSelection().toString();
        totextarea = text;
        if (text.length >= 2) //防误触阈值
        {
            getMousePos(e);
            //获取鼠标位置
            console.log(text);
            moveBtn(e);
            moveContainer(e);
            showBtn();
            document.getElementById("rt-button").addEventListener("click", showContainer, false);

        }
    }
}
//开始监听
document.addEventListener("mouseup", mouseUp, false);
document.addEventListener("mousedown", checkInbox, false);
document.addEventListener("mousedown", checkInbtn, false);
//监听background.js发送来的消息
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.sig == 0) {
            zhudongtuisong_render(request.level, request.divid);
        } else if (request.sig == 1) {
            zhudongtuisong_second_render(request.level, request.divid);
        } else if (request.sig == 2) {
            console.log(request);
            zhudongtuisong_third_render(request);
        } else if (request.sig == -1) {
            //popup发送消息开始主动推送
            zhudongtuisong();
            return;
        } else if (request.sig == -2){
            second_render(request);
        } else {
            var reqparse = JSON.parse(request);
            for (i = 0; i <= 2; i++) {
                if (reqparse[i]) {
                    if (reqparse[i].hasOwnProperty('abstract')) {
                        inform[i] = reqparse[i];
                    }
                }
            }
            console.log(inform);
            if (rendered == 0) {
                render(inform);
                document.getElementById("rt-submit").addEventListener('click', chaxunbtn, false);
                totextarea = '';
            }
        }
    })
