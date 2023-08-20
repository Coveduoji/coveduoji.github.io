document.addEventListener('mousemove', function (e) {
    // 获取圆形光标1的元素
    var cursor1 = document.querySelector('.circle-cursor1');
    // 获取圆形光标2的元素
    var cursor2 = document.querySelector('.circle-cursor2');

    // 更新圆形光标1和光标2的位置，以鼠标的坐标为基准
    cursor1.style.transform = cursor2.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});
