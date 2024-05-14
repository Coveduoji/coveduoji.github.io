// 获取名为 "container" 的 DOM 元素
const container = document.querySelector(".container");

// 获取所有具有 "image" 类名的 DOM 元素，并将其转换为数组
const images = Array.from(document.querySelectorAll(".image"));

// 定义一个用于将数组随机排序的函数
function shuffleArray(array) {
    // 从数组末尾开始循环
    for (let i = array.length - 1; i > 0; i--) {
        // 生成一个随机索引 j，范围在 0 到 i 之间
        const j = Math.floor(Math.random() * (i + 1));

        // 使用解构赋值交换数组中索引为 i 和 j 的元素
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 调用 shuffleArray 函数以随机排序 images 数组中的元素
shuffleArray(images);

// 清空 container 元素的内部内容
container.innerHTML = "";

// 遍历 images 数组中的每个元素，并将其添加到 container 元素中
images.forEach((image) => {
    container.appendChild(image);
});

// 定义一个用于根据分类筛选图片的函数，接受一个 categories 参数
function filterImages(categories) {
    // 获取具有 "image" 类名的所有 DOM 元素
    var images = document.getElementsByClassName("image");

    // 获取具有 "category" 类名的所有 DOM 元素
    var categoryElements = document.getElementsByClassName("category");

    // 移除所有 categoryElements 元素的 "active" 类名，取消激活状态
    for (var i = 0; i < categoryElements.length; i++) {
        categoryElements[i].classList.remove("active");
    }

    // 循环遍历 images 数组中的每个元素
    for (var i = 0; i < images.length; i++) {
        var image = images[i];

        // 如果传入的 categories 为 "all"，显示所有图片
        if (categories === "all") {
            image.style.display = "block";
        }
        // 否则，如果图片具有传入的 categories 类名，显示图片
        else if (image.classList.contains(categories)) {
            image.style.display = "block";
        }
        // 否则，隐藏图片
        else {
            image.style.display = "none";
        }
    }

    // 获取触发事件的元素，即当前点击的分类
    var currentCategory = event.target;

    // 为当前分类添加 "active" 类名，表示激活状态
    currentCategory.classList.add("active");
}

