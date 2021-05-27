//因为页面DOM不能访问content_script，所以需要把要和DOM互动的js代码注入页面
//script初始化


//alldiv初始化
const alldiv = document.createElement("div");
document.body.appendChild(alldiv);
alldiv.setAttribute("id", "rt-alldiv");

//style初始化
// const style = document.createElement('style');
// style.innerHTML = cssstyle;
// alldiv.appendChild(style);

//btn初始化
const btn = document.createElement("button");
document.body.appendChild(btn);
btn.setAttribute("type", "button");
btn.setAttribute("id", "rt-button");
// btn.setAttribute("onclick","showContainer()")
//btn.innerText='谣言检测';
btn.innerText = '谛听';
document.getElementById("rt-button").style.visibility = "hidden";//visible,hidden.

//container初始化
const container = document.createElement("div");
alldiv.appendChild(container);
container.setAttribute("id", "rt-container");
document.getElementById("rt-container").style.visibility = "hidden";//visible,hidden.