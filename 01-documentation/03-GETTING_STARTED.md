# RiskGen AI - 快速开始指南

## 🎉 重构完成！

恭喜！项目已经成功重构为模块化架构。所有代码现在更加清晰、易于维护。

## 📦 新的项目结构

```
fullstack_project/
├── index.html                 # 主页面（已更新引用）
├── style.css                  # 全局样式（未改动）
├── README.md                  # 项目说明（全新）
├── ARCHITECTURE.md            # 架构文档（全新）
├── GETTING_STARTED.md         # 本文档（全新）
├── app.js.backup              # 原 app.js 备份
│
├── js/                        # JavaScript 模块目录
│   ├── main.js               # 主入口文件
│   ├── config.js             # 配置和常量
│   ├── utils.js              # 工具函数
│   ├── store.js              # 数据存储管理
│   ├── router.js             # 路由管理
│   ├── dashboard.js          # Dashboard 页面
│   ├── workspace.js          # 工作区页面
│   ├── generation.js         # 风险生成页面
│   ├── report.js             # 风险报告页面
│   ├── knowledge.js          # 知识库页面
│   ├── mock_data.js          # Mock 数据（已移动）
│   └── knowledge_data.js     # 知识库数据（已移动）
│
└── docs/                      # 你的业务文档（未改动）
```

## 🚀 立即运行

### 方法 1: 使用 Python（推荐）

```bash
# 在项目目录下运行
python3 -m http.server 8000

# 然后访问
open http://localhost:8000
```

### 方法 2: 使用 Node.js

```bash
# 安装并使用 http-server
npx http-server -p 8000

# 然后访问
open http://localhost:8000
```

### 方法 3: 使用 VS Code

1. 安装 "Live Server" 扩展
2. 右键 `index.html`
3. 选择 "Open with Live Server"

## ✨ 重构亮点

### 1. 模块化架构

**之前**：
- 单个巨大的 `app.js` 文件（1286 行）
- 所有功能混在一起
- 难以维护和调试

**现在**：
- 12 个独立的模块文件
- 每个模块职责明确
- 易于理解和修改

### 2. 完善的注释

每个文件都有：
- 📝 文件级别的说明注释
- 📝 函数级别的 JSDoc 注释
- 📝 复杂逻辑的行内注释

示例：
```javascript
/**
 * 创建新项目
 * @param {string} name - 项目名称
 * @returns {Object} - 新创建的项目对象
 */
createProject(name) {
    // 实现代码...
}
```

### 3. 详细的文档

- ✅ `README.md` - 项目概述和使用指南
- ✅ `ARCHITECTURE.md` - 详细的技术架构文档
- ✅ 本文档 - 快速开始指南

## 🔍 代码导航指南

### 需要修改某个功能？查看这里：

| 功能 | 文件位置 |
|------|----------|
| 修改风险类别定义 | `js/config.js` |
| 修改数据存储逻辑 | `js/store.js` |
| 修改项目列表展示 | `js/dashboard.js` |
| 修改输入表单 | `js/workspace.js` |
| 修改生成流程 | `js/generation.js` |
| 修改报告展示 | `js/report.js` |
| 修改知识库 | `js/knowledge.js` |
| 修改 Mock 数据 | `js/mock_data.js` |
| 修改样式 | `style.css` |

### 需要添加新功能？

1. 在 `js/` 下创建新的模块文件
2. 在 `router.js` 中注册（如果需要）
3. 在对应的页面中调用

## 🐛 常见问题

### Q: 页面无法加载？

**A**: 确保使用本地服务器运行，不要直接双击 `index.html`。浏览器的同源策略会阻止 ES6 Modules 从 `file://` 协议加载。

### Q: 控制台出现模块加载错误？

**A**: 检查：
1. 是否使用了本地服务器
2. 浏览器是否支持 ES6 Modules（Chrome 61+, Firefox 60+, Safari 10.1+）
3. 文件路径是否正确

### Q: 数据丢失了？

**A**: 数据存储在浏览器的 LocalStorage 中。清除浏览器数据会导致数据丢失。这是 Demo 项目的正常行为。

### Q: Risk Report 页面显示空白？

**A**: 这个问题已经在重构中修复。现在会自动加载 Mock 数据用于展示。

## 🎯 下一步

1. **熟悉代码结构**
   - 阅读 `README.md` 了解项目概述
   - 阅读 `ARCHITECTURE.md` 了解技术细节
   - 浏览各个模块文件的注释

2. **测试功能**
   - 创建一个新项目
   - 填写项目信息
   - 生成风险评估
   - 查看报告

3. **自定义修改**
   - 修改颜色主题（`style.css` 的 `:root` 变量）
   - 添加新的风险类别（`js/config.js`）
   - 修改 Mock 数据（`js/mock_data.js`）

## 📚 学习资源

- **ES6 Modules**: [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules)
- **LocalStorage**: [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)
- **CSS Variables**: [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

## 🤝 需要帮助？

如果遇到问题：
1. 查看浏览器控制台的错误信息
2. 检查 `ARCHITECTURE.md` 中的调试技巧
3. 查看代码注释
4. 使用浏览器开发者工具调试

## 🎨 定制建议

### 修改颜色主题

编辑 `style.css` 中的 CSS 变量：

```css
:root {
    --primary-color: #2563EB;  /* 主色调 */
    --accent-color: #8B5CF6;   /* 强调色 */
    --risk-critical: #DC2626;  /* 严重风险 */
    --risk-high: #EA580C;      /* 高风险 */
    --risk-medium: #D97706;    /* 中等风险 */
    --risk-low: #16A34A;       /* 低风险 */
}
```

### 修改风险类别

编辑 `js/config.js`：

```javascript
export const RISK_CATEGORIES = {
    "Your New Category": [
        { id: "nc-01", level2: "Sub Category", level3: "Specific Risk" }
    ],
    // ... 其他类别
};
```

## ✅ 验证清单

确认以下功能正常工作：

- [ ] Dashboard 显示正常
- [ ] 可以创建新项目
- [ ] 可以打开项目工作区
- [ ] 可以填写项目信息
- [ ] 可以编辑 Prompt
- [ ] 可以生成风险评估（模拟）
- [ ] Risk Report 页面正常显示 Mock 数据
- [ ] 可以展开/收起风险卡片
- [ ] 快速导航功能正常
- [ ] Knowledge Base 显示历史案例
- [ ] 搜索和筛选功能正常

---

**🎉 重构完成时间**: 2025-12-29  
**📦 模块总数**: 12 个  
**📝 文档总数**: 3 个  
**💯 代码质量**: 大幅提升

祝开发愉快！🚀

