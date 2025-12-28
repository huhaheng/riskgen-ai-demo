# 📊 如何更新 Demo 展示数据

> 给不懂代码的人的超级简单指南 🎯

## 🎬 Demo 时展示的数据在哪里？

所有在 **Risk Report** 页面展示的数据都来自这个文件：

```
js/demo_data.js
```

## 🔄 如何更新数据？

### 方法 1：直接编辑文件（推荐）

1. **打开文件**
   ```
   用任何文本编辑器打开：js/demo_data.js
   ```

2. **找到数据区域**
   - 找到 `var BACKEND_DATA_JSON = [` 这一行
   - 下面的内容就是展示的数据

3. **替换数据**
   - 把你的新数据粘贴进去
   - **重要**：保持数据格式不变
   - 保存文件

4. **查看效果**
   - 刷新浏览器页面（按 F5）
   - 数据立即更新！

### 方法 2：从 JSON 文件复制（如果你有 JSON 文件）

1. **准备你的数据**
   - 假设你有一个 `my_data.json` 文件
   - 用文本编辑器打开它，全选复制（Ctrl+A, Ctrl+C）

2. **打开 demo_data.js**
   ```
   用文本编辑器打开：js/demo_data.js
   ```

3. **替换数据**
   - 找到 `var BACKEND_DATA_JSON = [` 这一行
   - 删除后面的 `[` 到 `];` 之间的所有内容
   - 粘贴你复制的数据
   - 确保格式是：
     ```javascript
     var BACKEND_DATA_JSON = [
         // 你的数据粘贴在这里
     ];
     ```

4. **保存并刷新**
   - 保存文件
   - 刷新浏览器

## 📋 数据格式说明

每个风险项目的格式如下：

```javascript
{
    "is_applicable": "true",  // 是否适用："true" 或 "false"
    "non_applicable_reason": null,  // 如果不适用，填写原因
    "risk_details": {
        "risk_title": "风险标题",
        "inherent_risk_rating": "High",  // Critical/High/Medium/Low
        "triggers": [
            "触发因素1",
            "触发因素2"
        ],
        "consequences": [
            "后果1",
            "后果2"
        ],
        "mitigating_actions": [
            {
                "description": "缓解措施描述",
                "owner": "责任人",
                "target_completion_date": "完成日期"
            }
        ],
        "stakeholder_comments": [
            {
                "role": "Risk Owner",
                "rating": "Medium",
                "justification": "评审意见..."
            }
        ]
    }
}
```

## ⚠️ 重要提示

1. **保留格式**
   - 不要删除 `var BACKEND_DATA_JSON = [` 这一行
   - 不要删除最后的 `];`
   - 保持所有的逗号、引号、括号

2. **风险等级必须是这四个之一**
   - `"Critical"` - 严重
   - `"High"` - 高
   - `"Medium"` - 中
   - `"Low"` - 低

3. **检查是否成功**
   - 刷新页面后打开浏览器控制台（F12）
   - 应该看到：`📊 Demo Data Loaded: X risk items`
   - X 是你的风险数量

## 🚀 在公司电脑上 Demo

### 准备工作

1. **复制整个项目文件夹**
   ```
   把 fullstack_project 文件夹复制到公司电脑
   ```

2. **更新数据**
   ```
   按照上面的方法更新 js/demo_data.js
   ```

3. **启动服务器**
   ```bash
   # 在项目目录下运行
   cd fullstack_project
   python3 -m http.server 8000
   
   # 或使用快捷脚本
   ./start.sh
   ```

4. **打开浏览器**
   ```
   访问: http://localhost:8000
   ```

### Demo 流程

1. **创建项目**
   - 点击 "New Project"
   - 输入项目名称

2. **查看报告**
   - 点击左侧的 "Risk Report" 标签
   - 自动展示你更新的数据

3. **展示功能**
   - 可以点击风险卡片展开查看详情
   - 可以使用搜索和筛选功能
   - 可以查看左侧的快速导航

## 🆘 常见问题

### Q: 修改数据后页面没变化？
**A**: 刷新浏览器（按 F5 或 Ctrl+R），如果还不行，按 Ctrl+Shift+R 强制刷新

### Q: 页面显示错误？
**A**: 检查 js/demo_data.js 文件格式是否正确：
- 逗号、引号、括号是否配对
- `var BACKEND_DATA_JSON = [` 和 `];` 是否完整

### Q: 如何快速恢复原来的数据？
**A**: 
1. 打开 `docs/data.json`（这是你的原始数据备份）
2. 复制内容
3. 粘贴回 `js/demo_data.js`

## 💡 小技巧

### 快速查看数据
在浏览器控制台（F12）输入：
```javascript
BACKEND_DATA_JSON
```
可以看到当前加载的所有数据

### 查看数据数量
在浏览器控制台输入：
```javascript
BACKEND_DATA_JSON.length
```
可以看到有多少个风险项

### 查看第一个风险
在浏览器控制台输入：
```javascript
BACKEND_DATA_JSON[0]
```
可以看到第一个风险的详细信息

---

## 📞 需要帮助？

如果遇到问题：
1. 检查浏览器控制台（F12）的错误信息
2. 确认 `js/demo_data.js` 文件格式正确
3. 确保使用本地服务器运行（不要直接双击打开 HTML）

**🎉 现在你可以轻松更新 Demo 数据了！**

