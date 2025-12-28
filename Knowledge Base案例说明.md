# 📚 Knowledge Base 历史案例说明

> 已创建的 4 个操作风险评估历史案例

---

## 🎯 案例概览

### 案例 1：GenAI 客服聊天机器人实施
**文档名称**: GenAI Customer Service Chatbot Implementation - Operational Risk Assessment

**项目背景**：
- 实施 GenAI 驱动的客服聊天机器人
- 用于会员福利查询和潜在客户开发
- 涉及 AI、数据隐私、同意管理

**关键信息**：
- **项目类型**: AI/ML Implementation
- **业务单元**: Customer Service & Digital
- **风险负责人**: Chief Customer Officer (EXCO)
- **项目规模**: Large (12 months)
- **识别风险**: 15 个（2 High, 8 Medium, 5 Low）

**关键风险**：
1. 会员数据生命周期治理不足（High）
2. 会员和同意数据使用不当（High）
3. AI 模型生成不准确的福利信息（Medium）

**技术栈**：
- Azure OpenAI, GenAI Hub, AIA+ mobile app
- 集成政策系统、理赔系统、代理 CRM

---

### 案例 2：核心保单管理系统云迁移
**文档名称**: Core Policy Administration System Cloud Migration - Risk Assessment

**项目背景**：
- 将核心保单管理系统从本地迁移到 Azure 云
- 涉及 300 万+ 保单数据
- 关键业务系统，影响所有产品线

**关键信息**：
- **项目类型**: System Migration
- **业务单元**: IT & Operations
- **风险负责人**: Chief Operations Officer (EXCO)
- **项目规模**: Enterprise (24 months)
- **识别风险**: 32 个（1 Critical, 7 High, 15 Medium, 9 Low）

**关键风险**：
1. 迁移期间数据丢失或损坏（Critical）⚠️
2. 系统停机时间过长影响保单服务（High）
3. 保单持有人数据的云安全控制不足（High）

**技术栈**：
- Legacy mainframe → Azure cloud
- Guidewire PolicyCenter, Azure SQL Database
- 集成代理系统、银行接口、理赔系统

**特别注意**：
- ⚠️ 由于业务关键性和高残余风险，需要 **CEO 签署**

---

### 案例 3：数字化直接营销平台增强
**文档名称**: Digital Direct Marketing Platform Enhancement - Risk Assessment

**项目背景**：
- 增强数字化直接营销平台
- 支持多渠道营销活动
- 加强同意管理和客户偏好跟踪

**关键信息**：
- **项目类型**: Platform Enhancement
- **业务单元**: Marketing & Distribution
- **风险负责人**: Chief Distribution Officer (EXCO)
- **项目规模**: Medium (9 months)
- **识别风险**: 18 个（3 High, 9 Medium, 6 Low）

**关键风险**：
1. 因同意管理漏洞导致直接营销不合规（High）
2. 延迟或失败的退出请求处理（High）
3. 跨渠道客户偏好数据不准确（Medium）

**合规要点**：
- 严格遵守 PDPO（个人资料私隐条例）
- 直接营销同意要求
- Legal 和 Compliance 深度参与

**技术栈**：
- Salesforce Marketing Cloud
- 同意管理模块, CDP
- 多渠道集成（email/SMS/WhatsApp/app）

---

### 案例 4：自动化核保决策引擎
**文档名称**: Automated Underwriting Decision Engine - Risk Assessment

**项目背景**：
- 实施自动化核保决策引擎
- 实现标准风险案例的直通处理
- 寿险和健康险自动核保

**关键信息**：
- **项目类型**: Automation & AI
- **业务单元**: Underwriting & New Business
- **风险负责人**: Chief Underwriting Officer (EXCO)
- **项目规模**: Large (15 months)
- **识别风险**: 24 个（5 High, 12 Medium, 7 Low）

**关键风险**：
1. 自动核保决策不准确导致逆选择（High）
2. 模型偏见导致对申请人的不公平对待（High）
3. 模型治理和验证不足（Medium）

**关键考虑**：
- 模型风险管理
- 公平对待客户
- 监管合规（Insurance Authority）
- Actuarial 和 Compliance 是关键 SMEs

**技术栈**：
- 规则引擎, 预测分析模型
- 集成医疗数据库、再保险系统

---

## 🏢 业务场景特点

### 行业背景
- **保险和金融服务行业**
- **香港和澳门地区**
- 受香港保险业监管局（IA）和个人资料私隐专员公署（PCPD）监管

### 风险治理架构
- **Risk Owner**: 必须是 EXCO 级别
- **SMEs 包括**: Legal, Compliance, Op Risk, Tech Risk, LIS, AI Governance
- **风险矩阵**: 5x5 (Likelihood x Impact)
- **风险等级**: Critical / High / Medium / Low

### 评估流程
1. Kick-off meeting
2. Prepare risk assessment paper
3. Sign-off process (EXCO → CEO for high residual risk)

---

## 📊 案例统计汇总

| 案例 | 总风险数 | Critical | High | Medium | Low | 缓解措施 |
|------|---------|----------|------|--------|-----|----------|
| GenAI Chatbot | 15 | 0 | 2 | 8 | 5 | 28 |
| Cloud Migration | 32 | 1 | 7 | 15 | 9 | 54 |
| DM Platform | 18 | 0 | 3 | 9 | 6 | 25 |
| Auto Underwriting | 24 | 0 | 5 | 12 | 7 | 38 |
| **总计** | **89** | **1** | **17** | **44** | **27** | **145** |

---

## 🎯 使用这些案例

### 在应用中查看
1. 启动应用
2. 点击顶部的 **"Knowledge Base"** 标签
3. 浏览 4 个历史案例卡片
4. 点击卡片查看详细信息

### 搜索和筛选
- **按关键词搜索**: GenAI, Cloud, Marketing, Underwriting
- **按项目类型筛选**: AI/ML, System Migration, Platform Enhancement
- **按标签筛选**: Data Privacy, AI Governance, PDPO Compliance

### 案例用途
- **参考历史评估**: 了解类似项目如何评估风险
- **学习最佳实践**: 查看缓解措施和 SME 评审意见
- **检索相关案例**: RAG 检索用于新项目评估

---

## 🔄 如何更新案例

如果需要修改或添加案例：

1. **编辑文件**
   ```
   js/knowledge_data.js
   ```

2. **案例结构**
   ```javascript
   {
       id: 'case_xxx',
       documentName: '案例标题',
       projectInfo: { ... },
       tags: [ ... ],
       retrievalSummary: '...',
       assessmentStats: { ... },
       keyRisks: [ ... ]
   }
   ```

3. **保存并刷新**
   - 保存文件
   - 刷新浏览器（F5）

---

## ✅ 验证案例已加载

打开浏览器控制台（F12），应该看到：
```
📚 Knowledge Base Loaded: 4 historical cases
```

---

**🎉 现在 Knowledge Base 已经有真实的业务案例了！**

这些案例基于你的业务文档创建，符合保险/金融行业的操作风险评估场景。

