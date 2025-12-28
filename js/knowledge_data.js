/**
 * =============================================================================
 * KNOWLEDGE BASE DATA - 历史风险评估案例
 * =============================================================================
 * 保险/金融行业的操作风险评估历史案例
 * 用于展示和检索参考
 */

var KNOWLEDGE_CASES = [
    {
        id: 'case_001',
        documentName: 'GenAI Customer Service Chatbot Implementation - Operational Risk Assessment',
        fileName: 'genai_chatbot_risk_assessment_2024.pdf',
        uploadDate: '2024-11-15',
        parsedDate: '2024-11-15',
        status: 'active',

        // 项目元数据
        projectInfo: {
            projectType: 'AI/ML Implementation',
            industry: 'Insurance & Financial Services',
            region: 'Hong Kong',
            businessUnit: 'Customer Service & Digital',
            projectSize: 'Large',
            duration: '12 months',
            completionDate: '2024-10-30',
            riskOwner: 'Chief Customer Officer (EXCO)'
        },

        // 标签
        tags: ['GenAI', 'Chatbot', 'Customer Service', 'Data Privacy', 'AI Governance', 'Lead Generation'],

        // RAG检索摘要
        retrievalSummary: `
PROJECT CONTEXT: Implementation of GenAI-powered customer service chatbot for member benefit inquiries and lead generation.
KEY OPERATIONS: Member authentication, benefit/claims inquiry, direct marketing consent capture, lead scoring and export to agency channels.
DATA SENSITIVITY: Critical - Member PII, policy data, medical insurance information, direct marketing consent records.
TECHNOLOGY STACK: Azure OpenAI, GenAI Hub (internal knowledge base), AIA+ mobile app integration, API connections to policy and claims systems.
INTEGRATION POINTS: AIA+ authentication, member database, policy administration system, claims system, GenAI Hub, Agency CRM.
KEY RISK AREAS IDENTIFIED: Data lifecycle governance, consent management, AI model accuracy, data quality controls, direct marketing compliance.
STAKEHOLDERS: Customer Service, Digital Product, Data Governance, Legal, Compliance, Op Risk, LIS, Tech Risk, AI Governance, Agency Distribution.
RISK OWNER: Chief Customer Officer (EXCO). SMEs consulted: Legal, Compliance, Op Risk Management, LIS, Tech Risk, AI Governance.
        `.trim(),

        // 评估统计
        assessmentStats: {
            totalRisksIdentified: 15,
            criticalRisks: 0,
            highRisks: 2,
            mediumRisks: 8,
            lowRisks: 5,
            mitigationActionsProposed: 28
        },

        // 关键风险示例
        keyRisks: [
            { title: 'Inadequate Governance of Member Data Across GenAI Chatbot Data Lifecycle', rating: 'High', category: 'Data Risk' },
            { title: 'Inaccurate or Improper Use of Member and Consent Data', rating: 'High', category: 'Data Risk' },
            { title: 'AI Model Generating Inaccurate Benefit Information', rating: 'Medium', category: 'AI Governance Risk' }
        ]
    },
    {
        id: 'case_002',
        documentName: 'Core Policy Administration System Cloud Migration - Risk Assessment',
        fileName: 'policy_admin_cloud_migration_2024.pdf',
        uploadDate: '2024-08-20',
        parsedDate: '2024-08-21',
        status: 'active',

        projectInfo: {
            projectType: 'System Migration',
            industry: 'Insurance & Financial Services',
            region: 'Hong Kong & Macau',
            businessUnit: 'IT & Operations',
            projectSize: 'Enterprise',
            duration: '24 months',
            completionDate: '2024-07-31',
            riskOwner: 'Chief Operations Officer (EXCO)'
        },

        tags: ['Cloud Migration', 'Policy Administration', 'Core System', 'Business Continuity', 'Data Security'],

        retrievalSummary: `
PROJECT CONTEXT: Migration of core policy administration system from on-premise infrastructure to Azure cloud platform.
KEY OPERATIONS: Policy issuance, premium billing, policy servicing, endorsements, renewals, policy data management across all product lines (Life, Health, Investment).
DATA SENSITIVITY: Critical - Complete policyholder database (3M+ policies), financial transactions, underwriting data, medical records, beneficiary information.
TECHNOLOGY STACK: Legacy mainframe to Azure cloud, Guidewire PolicyCenter, Azure SQL Database, Azure Security Center, disaster recovery setup.
INTEGRATION POINTS: Agency systems, banking interfaces, claims system, customer portal, regulatory reporting systems, reinsurance platforms.
KEY RISK AREAS IDENTIFIED: Data migration integrity, system availability during cutover, business continuity, data security controls, regulatory compliance, third-party cloud provider management.
STAKEHOLDERS: Operations, IT, Policy Admin, Agency, Finance, Legal, Compliance, Op Risk, Tech Risk, LIS, Business Continuity Management.
RISK OWNER: Chief Operations Officer (EXCO). Critical system migration requiring CEO sign-off due to business-critical nature and high residual risk.
        `.trim(),

        assessmentStats: {
            totalRisksIdentified: 32,
            criticalRisks: 1,
            highRisks: 7,
            mediumRisks: 15,
            lowRisks: 9,
            mitigationActionsProposed: 54
        },

        keyRisks: [
            { title: 'Data Loss or Corruption During Migration Cutover', rating: 'Critical', category: 'Technology Risk' },
            { title: 'Extended System Downtime Impacting Policy Servicing', rating: 'High', category: 'Business Operations Risk' },
            { title: 'Inadequate Cloud Security Controls for Policyholder Data', rating: 'High', category: 'Data Risk' }
        ]
    },
    {
        id: 'case_003',
        documentName: 'Digital Direct Marketing Platform Enhancement - Risk Assessment',
        fileName: 'dm_platform_enhancement_2024.pdf',
        uploadDate: '2024-06-10',
        parsedDate: '2024-06-10',
        status: 'active',

        projectInfo: {
            projectType: 'Platform Enhancement',
            industry: 'Insurance & Financial Services',
            region: 'Hong Kong',
            businessUnit: 'Marketing & Distribution',
            projectSize: 'Medium',
            duration: '9 months',
            completionDate: '2024-05-20',
            riskOwner: 'Chief Distribution Officer (EXCO)'
        },

        tags: ['Direct Marketing', 'PDPO Compliance', 'Marketing Automation', 'Consent Management', 'Customer Experience'],

        retrievalSummary: `
PROJECT CONTEXT: Enhancement of digital direct marketing platform to support multi-channel campaigns with enhanced consent management and customer preference tracking.
KEY OPERATIONS: Direct marketing consent capture and renewal, customer segmentation, campaign execution (email/SMS/WhatsApp/app push), opt-out management, consent audit trail.
DATA SENSITIVITY: High - Customer contact details, marketing preferences, direct marketing consent records, campaign response data.
TECHNOLOGY STACK: Salesforce Marketing Cloud, consent management module, customer data platform (CDP), API integrations to customer database.
INTEGRATION POINTS: Customer database, mobile app, web portal, agency CRM, call center system, regulatory reporting tools.
KEY RISK AREAS IDENTIFIED: PDPO/direct marketing consent compliance, opt-out processing, consent record retention, customer preference accuracy, cross-channel consistency.
STAKEHOLDERS: Marketing, Distribution, Customer Service, Legal, Compliance, Data Protection Officer, Op Risk, IT, Agency.
RISK OWNER: Chief Distribution Officer (EXCO). Compliance and Legal heavily involved due to PDPO direct marketing requirements.
        `.trim(),

        assessmentStats: {
            totalRisksIdentified: 18,
            criticalRisks: 0,
            highRisks: 3,
            mediumRisks: 9,
            lowRisks: 6,
            mitigationActionsProposed: 25
        },

        keyRisks: [
            { title: 'Non-Compliant Direct Marketing Due to Consent Management Gaps', rating: 'High', category: 'Legal and Regulatory Risk' },
            { title: 'Delayed or Failed Opt-Out Processing', rating: 'High', category: 'Conduct Risk' },
            { title: 'Inaccurate Customer Preference Data Across Channels', rating: 'Medium', category: 'Data Risk' }
        ]
    },
    {
        id: 'case_004',
        documentName: 'Automated Underwriting Decision Engine - Risk Assessment',
        fileName: 'auto_underwriting_engine_2024.pdf',
        uploadDate: '2024-03-15',
        parsedDate: '2024-03-16',
        status: 'active',

        projectInfo: {
            projectType: 'Automation & AI',
            industry: 'Insurance & Financial Services',
            region: 'Hong Kong',
            businessUnit: 'Underwriting & New Business',
            projectSize: 'Large',
            duration: '15 months',
            completionDate: '2024-02-28',
            riskOwner: 'Chief Underwriting Officer (EXCO)'
        },

        tags: ['Underwriting Automation', 'Decision Engine', 'Risk Selection', 'Straight-Through Processing', 'Model Risk'],

        retrievalSummary: `
PROJECT CONTEXT: Implementation of automated underwriting decision engine to enable straight-through processing for standard risk cases (life and health insurance).
KEY OPERATIONS: Application data intake, medical history review, risk scoring, automated underwriting decision (accept/refer/decline), premium calculation, policy issuance.
DATA SENSITIVITY: Critical - Applicant medical history, health declarations, financial underwriting data, underwriting decisions, declined application records.
TECHNOLOGY STACK: Rules engine, predictive analytics models, integration with medical databases, policy admin system API.
INTEGRATION POINTS: New business system, medical e-submission platforms, reinsurance systems, policy admin, agency portals, claims history database.
KEY RISK AREAS IDENTIFIED: Underwriting decision accuracy, model risk and governance, adverse selection, regulatory compliance (fair treatment), data quality, model bias, override controls.
STAKEHOLDERS: Underwriting, Actuarial, New Business, Reinsurance, Legal, Compliance, Op Risk, Tech Risk, Data Science, Agency, Medical team.
RISK OWNER: Chief Underwriting Officer (EXCO). Actuarial and Compliance critical SMEs due to risk selection and fair treatment implications.
        `.trim(),

        assessmentStats: {
            totalRisksIdentified: 24,
            criticalRisks: 0,
            highRisks: 5,
            mediumRisks: 12,
            lowRisks: 7,
            mitigationActionsProposed: 38
        },

        keyRisks: [
            { title: 'Inaccurate Automated Underwriting Decisions Leading to Adverse Selection', rating: 'High', category: 'Business Operations Risk' },
            { title: 'Model Bias Resulting in Unfair Treatment of Applicants', rating: 'High', category: 'Conduct Risk' },
            { title: 'Inadequate Model Governance and Validation', rating: 'Medium', category: 'Model Risk' }
        ]
    }
];

/**
 * 获取活跃案例
 */
function getActiveCases() {
    return KNOWLEDGE_CASES.filter(c => c.status === 'active');
}

/**
 * 搜索案例
 * @param {string} query - 搜索关键词
 * @param {Object} filters - 筛选条件
 */
function searchCases(query, filters = {}) {
    let results = [...KNOWLEDGE_CASES];

    // 文本搜索
    if (query) {
        const q = query.toLowerCase();
        results = results.filter(c =>
            c.documentName.toLowerCase().includes(q) ||
            c.tags.some(t => t.toLowerCase().includes(q)) ||
            c.retrievalSummary.toLowerCase().includes(q) ||
            c.projectInfo.projectType.toLowerCase().includes(q) ||
            c.projectInfo.industry.toLowerCase().includes(q) ||
            c.projectInfo.businessUnit.toLowerCase().includes(q)
        );
    }

    // 筛选
    if (filters.industry) {
        results = results.filter(c => c.projectInfo.industry === filters.industry);
    }
    if (filters.projectType) {
        results = results.filter(c => c.projectInfo.projectType === filters.projectType);
    }
    if (filters.status) {
        results = results.filter(c => c.status === filters.status);
    }

    return results;
}

/**
 * 获取筛选选项
 */
function getFilterOptions() {
    const industries = [...new Set(KNOWLEDGE_CASES.map(c => c.projectInfo.industry))];
    const projectTypes = [...new Set(KNOWLEDGE_CASES.map(c => c.projectInfo.projectType))];
    const regions = [...new Set(KNOWLEDGE_CASES.map(c => c.projectInfo.region))];

    return { industries, projectTypes, regions };
}

// 在控制台输出加载信息
console.log('📚 Knowledge Base Loaded:', KNOWLEDGE_CASES.length, 'historical cases');
