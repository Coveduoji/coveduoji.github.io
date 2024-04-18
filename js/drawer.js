document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleDrawer');
    const closeButton = document.getElementById('closeDrawer');
    const drawer = document.getElementById('myDrawer');

    // 点击打开抽屉的按钮时触发的事件处理函数
    toggleButton.addEventListener('click', function() {
        // 切换抽屉的打开状态类名
        drawer.classList.toggle('open');

        // 如果抽屉已经打开，则隐藏打开抽屉按钮
        if (drawer.classList.contains('open')) {
            toggleButton.style.display = 'none';
        } else {
            toggleButton.style.display = ''; // 恢复按钮的默认显示方式
        }
    });

    // 点击关闭抽屉的按钮时触发的事件处理函数
    closeButton.addEventListener('click', function() {
        drawer.classList.remove('open');
        toggleButton.style.display = ''; // 恢复按钮的默认显示方式
    });

    // 点击文档任意位置关闭抽屉的事件处理函数
    document.addEventListener('click', function(event) {
        // 检查点击事件的目标是否在抽屉容器内部或者是打开抽屉按钮本身
        const isClickInsideDrawer = drawer.contains(event.target);
        const isClickOnToggleButton = event.target === toggleButton;

        // 如果点击事件的目标不在抽屉容器内部且不是打开抽屉按钮本身，则关闭抽屉
        if (!isClickInsideDrawer && !isClickOnToggleButton) {
            drawer.classList.remove('open');
            toggleButton.style.display = ''; // 恢复按钮的默认显示方式
        }
    });

});
