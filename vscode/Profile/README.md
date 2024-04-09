# [Profiles](https://code.visualstudio.com/docs/editor/profiles)

Profiles 的作用是为不同的项目使用不同的配置项。

可选的配置         | 我的说明
-------------------|---------
Settings           | 不单独配置。
Keyboard Shortcuts | 不单独配置。
Snippets           | 不单独配置。
User Tasks         | 不单独配置。
UI State           | 不单独配置。
Extensions         | 目前只配置了这个

## 全局扩展

全局扩展，表示开启了“Apply Extensions to all Profiles”。

只将我经常使用的扩展和每个项目都会用到的扩展列入全局扩展，这意味着这些扩展不会专门添加到项目的 `.vscode/extensions.json`。

Extensions ID                         | 说明
--------------------------------------|--------------------------------------------------
pkief.material-icon-theme             | Material Icon Theme
darkriszty.markdown-table-prettify    | Markdown Table Prettifier
shd101wyy.markdown-preview-enhanced   | Markdown Preview Enhanced
streetsidesoftware.code-spell-checker | Code Spell Checker
formulahendry.code-runner             | Code Runner
donjayamanne.githistory               | Git History 用了挺久的，但当我熟练 gitLen 后，未来可能被 gitLen 代替。
eamodio.gitlens                       | GitLens — Git supercharged 新增，感觉未来会经常用
davidanson.vscode-markdownlint        | markdownlint 新增，感觉未来会经常用

## 前端项目 Profiles

### 前端（基本）

前端基本，指的是包含 html, css, js 文件。

Extensions ID                       | 说明
------------------------------------|---------------------------------
ritwickdey.liveserver               | Live Server
mikebovenlander.formate             | formate: CSS/LESS/SCSS formatter
kisstkondoros.vscode-gutter-preview | Image preview
emeraldwalk.runonsave               | Run on Save
formulahendry.auto-rename-tag       | Auto Rename Tag
dbaeumer.vscode-eslint              | ESLint
esbenp.prettier-vscode              | Prettier - Code formatter

## Python Profiles

Extensions ID                       | 说明
------------------------------------|--------------
ms-python.python                    | Python
ms-python.vscode-pylance            | 附加在 Python 中
ms-toolsai.jupyter                  | Jupyter
ms-toolsai.vscode-jupyter-cell-tags | 附加在 Jupyter 中
ms-toolsai.jupyter-keymap           | 附加在 Jupyter 中
ms-toolsai.jupyter-renderers        | 附加在 Jupyter 中
ms-toolsai.vscode-jupyter-slideshow | 附加在 Jupyter 中

## C/C++ Profiles

Extensions ID                     | 说明
----------------------------------|------------------
ms-vscode.cpptools-extension-pack | C/Cpp 工具扩展包
ms-vscode.cpptools                | 附加在 C/Cpp 工具扩展包中。
ms-vscode.cpptools-themes         | 附加在 C/Cpp 工具扩展包中。
ms-vscode.cmake-tools             | 附加在 C/Cpp 工具扩展包中。
twxs.cmake                        | 附加在 C/Cpp 工具扩展包中。
