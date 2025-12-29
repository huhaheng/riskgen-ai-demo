# 📤 如何上传到 GitHub

> 超级简单的 GitHub 上传和下载指南

---

## 🎯 方案概述

1. **在家里电脑**：把代码上传到 GitHub
2. **在公司电脑**：从 GitHub 下载代码
3. **好处**：随时随地同步，版本管理

---

## 第一部分：在家里电脑上传代码

### 步骤 1：在 GitHub 创建仓库

1. **登录 GitHub**：https://github.com
2. **点击右上角的 "+"** → 选择 "New repository"
3. **填写信息**：
   - Repository name: `riskgen-ai-demo`（或你喜欢的名字）
   - Description: `RiskGen AI - Operational Risk Assessment Demo`
   - 选择 **Public**（公开）或 **Private**（私有，推荐）
   - ❌ **不要勾选** "Add a README file"（我们已经有了）
4. **点击 "Create repository"**

### 步骤 2：初始化 Git（在你的项目文件夹）

打开终端，运行以下命令：

```bash
# 1. 进入项目目录
cd /Users/andrew/.gemini/antigravity/scratch/fullstack_project

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 创建第一个提交
git commit -m "Initial commit: RiskGen AI Demo Project"
```

### 步骤 3：连接到 GitHub 并上传

在 GitHub 创建仓库后，页面会显示类似的命令，复制运行：

```bash
# 连接到 GitHub（替换成你的 GitHub 用户名和仓库名）
git remote add origin https://github.com/你的用户名/riskgen-ai-demo.git

# 上传代码
git branch -M main
git push -u origin main
```

**示例**（假设你的 GitHub 用户名是 `andrew`）：
```bash
git remote add origin https://github.com/andrew/riskgen-ai-demo.git
git branch -M main
git push -u origin main
```

### 步骤 4：验证上传成功

1. 刷新 GitHub 页面
2. 应该能看到所有文件
3. ✅ 上传完成！

---

## 第二部分：在公司电脑下载代码

### 步骤 1：安装 Git（如果没有）

**检查是否已安装**：
```bash
git --version
```

**如果未安装**：
- Windows: 下载 https://git-scm.com/download/win
- Mac: 终端运行 `git`，系统会提示安装
- 或直接从 GitHub 网页下载 ZIP 文件（见下面的方案 B）

### 步骤 2A：使用 Git Clone（推荐）

```bash
# 1. 进入你想存放代码的目录
cd ~/Desktop

# 2. Clone 仓库（替换成你的仓库地址）
git clone https://github.com/你的用户名/riskgen-ai-demo.git

# 3. 进入项目目录
cd riskgen-ai-demo
```

### 步骤 2B：直接下载 ZIP（不需要 Git）

1. 打开你的 GitHub 仓库页面
2. 点击绿色的 **"Code"** 按钮
3. 选择 **"Download ZIP"**
4. 下载后解压到任意目录

### 步骤 3：启动项目

```bash
# 使用 VS Code Live Server
# 或者运行：
python -m http.server 8000
```

---

## 🔄 更新代码流程

### 在家里修改后更新到 GitHub

```bash
cd /Users/andrew/.gemini/antigravity/scratch/fullstack_project

# 1. 添加修改
git add .

# 2. 提交修改
git commit -m "更新数据或修复bug"

# 3. 推送到 GitHub
git push
```

### 在公司电脑获取最新代码

```bash
cd riskgen-ai-demo

# 拉取最新代码
git pull
```

---

## 🔒 私有仓库设置（推荐）

如果是公司项目，建议设置为 **Private**（私有）：

### 创建时选择 Private
- 创建仓库时选择 **Private**
- 只有你自己能看到

### 在公司电脑访问私有仓库

第一次需要登录：
```bash
# Clone 时会提示输入 GitHub 用户名和密码
git clone https://github.com/你的用户名/riskgen-ai-demo.git

# 或使用 Personal Access Token（更安全）
```

**提示**：现在 GitHub 不支持密码登录，需要使用 Personal Access Token：
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token
3. 复制 token（只显示一次！）
4. Clone 时用 token 代替密码

---

## 📝 快速命令参考

### 首次上传
```bash
cd /Users/andrew/.gemini/antigravity/scratch/fullstack_project
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

### 在家里更新
```bash
git add .
git commit -m "更新说明"
git push
```

### 在公司下载
```bash
# 第一次
git clone https://github.com/你的用户名/仓库名.git

# 以后更新
git pull
```

---

## 🎯 推荐做法

### 方案 1：使用 Git（推荐，适合经常更新）
- ✅ 版本管理
- ✅ 随时同步
- ✅ 可以回退
- ❌ 需要学习 Git 基础

### 方案 2：直接下载 ZIP（最简单，适合一次性 Demo）
- ✅ 不需要 Git
- ✅ 简单直接
- ✅ 适合公司电脑限制多的情况
- ❌ 每次更新需要重新下载

---

## 💡 对你来说最简单的方式

**如果你对 Git 不熟悉**，我推荐：

### 上传方式：使用 GitHub Desktop（图形界面）

1. **下载 GitHub Desktop**：https://desktop.github.com
2. **登录 GitHub 账号**
3. **点击 "Add" → "Add Existing Repository"**
4. **选择你的项目文件夹**
5. **点击 "Publish repository"**
6. ✅ 完成！超简单！

### 下载方式：在公司电脑

1. **打开 GitHub 网页**：https://github.com/你的用户名/仓库名
2. **点击绿色 "Code" 按钮**
3. **选择 "Download ZIP"**
4. **解压到任意目录**
5. ✅ 完成！

---

## 🆘 需要帮助？

如果你想用命令行方式（Git），我可以：
1. 帮你执行 Git 命令
2. 创建好仓库
3. 推送代码

你只需要告诉我：
- 你的 GitHub 用户名
- 想用什么仓库名

或者你可以：
- 使用 GitHub Desktop（图形界面，最简单）
- 直接网页下载 ZIP（最快）

---

**🎯 你想用哪种方式？告诉我，我帮你完成！** 😊

