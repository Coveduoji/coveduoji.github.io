import tkinter as tk
from tkinter import ttk, filedialog
from bs4 import BeautifulSoup
import os

def add_image_to_html(image_url, img_class):
    # 构建要添加的图片的<img>标签
    new_image_tag = f'<img class="image {img_class}" src="{image_url}" alt="{image_url}" onclick="focusImage(this)" />'

    # 读取原始HTML文件内容
    with open('photowall.html', 'r', encoding='utf-8') as file:
        html_content = file.read()

    # 使用BeautifulSoup解析HTML内容
    soup = BeautifulSoup(html_content, 'html.parser')

    # 找到图片集合的<div>标签
    gallery_div = soup.find('div', class_='gallery')
    if gallery_div is None:
        raise ValueError("无法在HTML内容中找到图片集合的<div>标签")

    # 在图片集合的<div>标签后插入新的<img>标签
    gallery_div.append(BeautifulSoup(new_image_tag, 'html.parser'))

    # 将更新后的HTML内容写回到原始文件中
    with open('photowall.html', 'w', encoding='utf-8') as file:
        file.write(str(soup))

    result_label.config(text="图片链接添加成功", fg="green")

def delete_image_from_html(image_url):
    # 读取原始HTML文件内容
    with open('photowall.html', 'r', encoding='utf-8') as file:
        html_content = file.read()

    # 使用BeautifulSoup解析HTML内容
    soup = BeautifulSoup(html_content, 'html.parser')

    # 查找包含指定图片链接的<img>标签
    image_tags = soup.find_all('img', src=image_url)
    if not image_tags:
        raise ValueError("未找到要删除的图片链接")

    # 删除所有包含指定图片链接的<img>标签
    for img_tag in image_tags:
        img_tag.decompose()

    # 将更新后的HTML内容写回到原始文件中
    with open('photowall.html', 'w', encoding='utf-8') as file:
        file.write(str(soup))

    result_label.config(text="图片链接删除成功", fg="green")

def browse_file():
    file_path = filedialog.askopenfilename(initialdir=os.getcwd(), title="选择图片", filetypes=(("Image Files", "*.jpg;*.jpeg;*.png;*.gif"), ("All Files", "*.*")))
    if file_path:
        relative_path = os.path.relpath(file_path, os.getcwd())
        entry_url.delete(0, tk.END)
        entry_url.insert(0, relative_path)

def on_submit():
    # 获取输入框中的图片链接和img_class
    image_url = entry_url.get()
    img_class = entry_class.get()

    try:
        # 根据按钮的状态执行不同的操作
        if var.get() == 1:  # 添加图片
            add_image_to_html(image_url, img_class)
        elif var.get() == 2:  # 删除图片
            delete_image_from_html(image_url)

        # 清空输入框
        entry_url.delete(0, tk.END)
        entry_class.delete(0, tk.END)

        result_label.config(text="操作成功", fg="green")
    except Exception as e:
        result_label.config(text=str(e), fg="red")

# 创建主窗口
window = tk.Tk()
window.title("图片链接管理")
window.geometry("500x300")  # 设置窗口大小
window.configure(bg="#f0f0f0")  # 设置背景色

# 设置字体和颜色
font_style = ("Arial", 12)
label_color = "#333333"

# 创建图片链接输入框及标签
label_url = tk.Label(window, text="图片链接:", font=font_style, fg=label_color, bg="#f0f0f0")
label_url.grid(row=0, column=0, padx=10, pady=5, sticky="w")
entry_url = tk.Entry(window, width=30, font=font_style)
entry_url.grid(row=0, column=1, padx=10, pady=5)
browse_button = tk.Button(window, text="浏览", command=browse_file, font=font_style)
browse_button.grid(row=0, column=2, padx=5, pady=5)

# 创建年份输入框及标签
label_class = tk.Label(window, text="年份:", font=font_style, fg=label_color, bg="#f0f0f0")
label_class.grid(row=1, column=0, padx=10, pady=5, sticky="w")
entry_class = tk.Entry(window, width=30, font=font_style)
entry_class.grid(row=1, column=1, padx=10, pady=5)

# 创建按钮
var = tk.IntVar()

add_button = ttk.Radiobutton(window, text="添加图片", variable=var, value=1)
add_button.grid(row=2, column=0, padx=10, pady=5, sticky="w")

delete_button = ttk.Radiobutton(window, text="删除图片", variable=var, value=2)
delete_button.grid(row=3, column=0, padx=10, pady=5, sticky="w")

button = tk.Button(window, text="执行操作", command=on_submit, font=font_style, bg="#007bff", fg="white")
button.grid(row=4, column=0, columnspan=2, padx=10, pady=10)

# 创建操作结果标签
result_label = tk.Label(window, text="", font=font_style, bg="#f0f0f0")
result_label.grid(row=5, column=0, columnspan=2, padx=10, pady=5)

# 启动主循环
window.mainloop()
