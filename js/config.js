/**
 * =============================================================================
 * CONFIGURATION & CONSTANTS
 * =============================================================================
 * 应用配置和常量定义
 */

/**
 * 默认的 Prompt 模板
 * 这些模板用于 LLM 生成风险评估
 */
export const DEFAULT_PROMPT_MODULES = {
    module1: `# MODULE 1: ROLE AND CONTEXT
You are an expert Operational Risk Manager and Auditor for a leading insurance and financial group. Your task is to perform a granular **Operational Risk Assessment** for a specific project.

You are part of a workflow that iterates through specific Risk Types. In this execution, you must focus **ONLY** on the specific "Target Risk Category" provided in the input. Do not assess other risk types.

Your goal is to draft a "Detailed Risk Scenario" entry for a Risk Assessment Paper, adhering strictly to the organization's Playbook and Risk Matrix standards.`,

    module3: `# MODULE 3: GUIDELINES & STANDARDS
## 3.1 Risk Assessment Logic (Inherent vs. Residual)
1.  **Inherent Risk (IR):** The risk exposure *prior* to the implementation of controls.
2.  **Residual Risk (RR):** The risk exposure *after* implementation of adequate controls/mitigating actions.
3.  **Assessment Criteria:**
    - Likelihood: 1 (Rare) to 5 (Highly Likely)
    - Impact: 1 (Minimal) to 5 (Severe)

## 3.3 Risk Matrix Reference (5x5)
- **Critical**: High likelihood (4-5) × Severe/Major impact (4-5)
- **High**: Moderate-High likelihood (3-5) × Moderate-Major impact (3-4)
- **Medium**: Low-Moderate likelihood (2-3) × Minor-Moderate impact (2-3)
- **Low**: Rare-Unlikely likelihood (1-2) × Minimal-Minor impact (1-2)`,

    module4: `# MODULE 4: INSTRUCTIONS

## Step 1: Relevance Check
Analyze the \`Project Information\` against the \`Target Risk Category\`.
- **IF NO:** Output a JSON object indicating \`is_applicable: false\`.
- **IF YES:** Proceed to Step 2.

## Step 2: Risk Identification
Identify a specific **Risk Scenario** related to the \`Target Risk Category\`.
- **Risk Title:** Create a concise title.
- **Triggers:** List 2-3 specific events.
- **Consequences:** List 2-3 specific impacts.

## Step 3: Mitigation & SMEs
- Propose 2-3 concrete **Mitigating Actions**.
- Draft rationale for **Residual Risk** from the perspective of 7 SMEs (Risk Owner, Legal, Compliance, Op Risk, LIS, Tech Risk, AI Governance).`
};

/**
 * 风险类别定义
 * 按照领域组织的风险类别
 */
export const RISK_CATEGORIES = {
    "Data Risk": [
        { id: "dr-01", level2: "Data Privacy", level3: "Data Confidentiality" },
        { id: "dr-02", level2: "Data Privacy", level3: "Data Integrity" },
        { id: "dr-03", level2: "Data Governance", level3: "Data Lifecycle Management" },
        { id: "dr-04", level2: "Data Governance", level3: "Data Quality Controls" }
    ],
    "Technology Risk": [
        { id: "tr-01", level2: "Cyber Security", level3: "Identity & Access Management" },
        { id: "tr-02", level2: "Cyber Security", level3: "Application Security" },
        { id: "tr-03", level2: "Tech Ops", level3: "System Availability" },
        { id: "tr-04", level2: "Tech Ops", level3: "Change Management" }
    ],
    "Regulatory Risk": [
        { id: "rr-01", level2: "Compliance", level3: "Data Protection Regulations" },
        { id: "rr-02", level2: "Compliance", level3: "Direct Marketing Consent" },
        { id: "rr-03", level2: "Conduct", level3: "Consumer Protection" }
    ],
    "AI Governance Risk": [
        { id: "ai-01", level2: "Model Risk", level3: "AI Model Accuracy & Bias" },
        { id: "ai-02", level2: "Model Risk", level3: "AI Explainability" },
        { id: "ai-03", level2: "AI Ethics", level3: "Responsible AI Use" }
    ],
    "Business Ops Risk": [
        { id: "bo-01", level2: "Process", level3: "Manual Processing Errors" },
        { id: "bo-02", level2: "Third Party", level3: "Vendor Management" }
    ]
};

/**
 * 扁平化的风险类别数组
 * 用于迭代生成风险评估
 */
export const RISK_CATEGORIES_LANDSCAPE = Object.entries(RISK_CATEGORIES).flatMap(([level1, items]) =>
    items.map(item => ({
        level1: level1,
        level2: item.level2,
        level3: item.level3
    }))
);

/**
 * SME (Subject Matter Expert) 角色列表
 * 用于风险评估的利益相关方审查
 */
export const SME_ROLES = [
    "Risk Owner",
    "Legal",
    "Compliance",
    "Op Risk Management",
    "LIS",
    "Tech Risk",
    "AI Governance"
];

/**
 * 风险等级配置
 * 包含颜色和权重定义
 */
export const RISK_RATINGS = {
    "Critical": { color: "#DC2626", weight: 4 },
    "High": { color: "#EA580C", weight: 3 },
    "Medium": { color: "#D97706", weight: 2 },
    "Low": { color: "#16A34A", weight: 1 }
};

/**
 * 风险状态配置
 */
export const RISK_STATUSES = {
    "draft": { label: "Draft", color: "#64748B" },
    "review": { label: "In Review", color: "#2563EB" },
    "final": { label: "Finalized", color: "#16A34A" }
};

/**
 * 本地存储的键名
 */
export const STORAGE_KEYS = {
    PROJECTS: 'riskgen_projects',
    PAPERS: 'riskgen_papers'
};

