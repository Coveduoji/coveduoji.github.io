

function getHitokoto() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://v1.hitokoto.cn");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var hitokoto = response.hitokoto; // 获取一言内容
                var from = response.from; // 获取来源
                var sentenceElement = document.getElementById("sentence");
                var sourceElement = document.getElementById("source");
                sentenceElement.innerText = hitokoto; // 显示一言句子
                sourceElement.innerText = "——" + from; // 显示来源
            } else {
                console.log("请求失败：" + xhr.status);
            }
        }
    };
    xhr.send();
}

window.onload = function () {
    getHitokoto();

    var style = document.createElement('style');
    style.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(style);
};

