//划取查询渲染
function renderwaiting(object) {
    const containerhtml = ` 
 <div id="rt-header">谛听-基于nlp的谣言检测系统</div>
<div id="rt-body">
    <textarea id="rt-textarea">${totextarea}</textarea>
    </br>
    <button id="rt-submit">查询</button>
    <hr/>
    
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object[0].source}</span>
    </br>
    <span class="${truth[0]}">${object[0].result}</span>
    <span class = "abstract">${object[0].abstract.substr(0, 100)}...</span>
    </div>    
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt1">有用</button>    
    <button class = 'rt-zbw' id="rt-zbw1">没用</button>

    <hr/>
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object[1].source}</span>
    </br>
    <span class="${truth[1]}">${object[1].result}</span>
    <span class = "abstract">${object[1].abstract.substr(0, 100)}...</span>
    </div>
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt2">有用</button>
    <button class = 'rt-zbw' id="rt-zbw2">没用</button>

    <hr/>
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object[2].source}</span>
    </br>
    <span class="${truth[2]}">${object[2].result}</span>
    <span ckass = "abstract">${object[2].abstract.substr(0, 100)}...</span>
    </div>
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt3">有用</button>
    <button class = 'rt-zbw' id="rt-zbw3">没用</button>

</div>

<div id="rt-footer"></div>
    `
    var container = document.getElementById("rt-container");
    container.innerHTML = containerhtml;
}

function render(object) {
    rendered = 1;
    for (i = 0; i <= 2; i++) {
        if (object[i].result.substr(0, 1) === '假' || object[i].result.substr(0, 1) === '疑' || object[i].result.substr(0, 1) === '谣') {
            truth[i] = 'rt-wrong';
        } else if (object[i].result.substr(0, 1) === '辟' || object[i].result.substr(0, 1) === '真' || object[i].result.substr(0, 1) === '新') {
            truth[i] = 'rt-trued';
        }
    }
    const containerhtml = ` 
<div id="rt-header">谛听-基于nlp的谣言检测系统</div>
<div id="rt-body">
    <textarea id="rt-textarea">${totextarea}</textarea>
    </br>
    <button id="rt-submit">查询</button>
    <hr/>
    
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object[0].source}</span>
    </br>
    <span class="${truth[0]}">${object[0].result}</span>
    <span class = "abstract">${object[0].abstract.substr(0, 100)}...</span>
    </div>    
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt1">有用</button>    
    <button class = 'rt-zbw' id="rt-zbw1">没用</button>

    <hr/>
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object[1].source}</span>
    </br>
    <span class="${truth[1]}">${object[1].result}</span>
    <span class = "abstract">${object[1].abstract.substr(0, 100)}...</span>
    </div>
    </br>
    <span style="font-weight: bold">此条辟谣有用吗：</span>
    <button class = 'rt-zbt' id="rt-zbt2">有用</button>
    <button class = 'rt-zbw' id="rt-zbw2">没用</button>

    <hr/>
    <div class = 'rt-divli'>
    <span class="rt-source">来源：${object[2].source}</span>
    </br>
    <span class="${truth[2]}">${object[2].result}</span>
    <span ckass = "abstract">${object[2].abstract.substr(0, 100)}...</span>
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
}

function second_render(object) {

    const containerhtml = ` 
<div id="rt-header">谛听-基于nlp的谣言检测系统</div>
<div id="rt-body">
    <textarea id="rt-textarea">${totextarea}</textarea>
    </br>
    <button id="rt-submit">查询</button>
    </br>
    <span class ='rt-weibospan'>谣言库中暂未查到相关信息，</span>
    <span class ='rt-weibospan'>为您在微博平台上查到相关信息</span>
    </br>
    <span class ='rt-weibospan'>用户名：${object.name}</span>
    </br>
    <span class ='rt-weibospan'>原文链接：${object.url}</span>
    </br>
    <span class ='rt-weibospan'>微博原文：${object.text}</span>
    </br>
    <span class ='rt-weibospan'>该用户可信度：${object.score}</span>
    <hr>
    <span class ='rt-weibospan'>其他用户对该信息的判断:</span>
    <span>真：${object.T}</span>
    <span>假：${object.F}</span>
    <span class ='rt-weibospan'>您认为该信息：</span>
    <button>真</button>
    <button>假</button>
</div>
    `
    const container = document.getElementById("rt-container");
    container.innerHTML = '';
    container.innerHTML = containerhtml;
}

