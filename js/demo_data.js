/**
 * =============================================================================
 * DEMO DATA - 真实演示数据
 * =============================================================================
 * 
 * 📝 如何更新数据：
 * 
 * 1. 将你的 JSON 数据复制到下面的数组中
 * 2. 保存文件
 * 3. 刷新浏览器页面
 * 
 * 数据格式说明：
 * - is_applicable: "true" 或 "false" (字符串)
 * - risk_details: 包含风险的详细信息
 *   - risk_title: 风险标题
 *   - inherent_risk_rating: "Critical" / "High" / "Medium" / "Low"
 *   - triggers: 风险触发因素数组
 *   - consequences: 风险后果数组
 *   - mitigating_actions: 缓解措施数组
 *   - stakeholder_comments: 利益相关方评论数组
 */

// 🔥 在这里替换你的真实数据
var BACKEND_DATA_JSON = [
    {
        "is_applicable": "true",
        "non_applicable_reason": null,
        "risk_details": {
            "consequences": [
                "Use of outdated, incomplete or inaccurate EB and claims-related data in chatbot responses or lead reports, leading to incorrect guidance to members and potential financial detriment or disputes (e.g., benefit coverage arguments, mis-selling complaints).",
                "Non-compliance with internal data retention / deletion standards or regulatory expectations on data minimisation and purpose limitation (especially around DM consent and lead data), potentially resulting in regulatory findings, fines and mandated remediation."
            ],
            "inherent_risk_rating": "High",
            "mitigating_actions": [
                {
                    "description": "Define and document an end-to-end data lifecycle for GenAI Chatbot and GenAI Hub (capture, storage, usage, sharing, archival, deletion) for all relevant datasets: member identifiers, chat logs, DM consent, interest level indicators, and lead export files. Align with enterprise data retention schedule and regulatory requirements for medical insurance and marketing data.",
                    "owner": "Data Governance Lead / CS Business Data Owner",
                    "target_completion_date": "Prior to Launch"
                }
            ],
            "risk_title": "Inadequate Governance of Member and Policy Data Across GenAI Chatbot Data Lifecycle",
            "stakeholder_comments": [
                {
                    "justification": "From a business perspective, data is central to the value proposition of the GenAI Chatbot (accurate EB responses and qualified leads). Without robust lifecycle management, there is a risk of outdated benefits content and over-retention or misuse of member and lead data, which could create disputes and regulatory exposure. The proposed controls (formal lifecycle definition, clear ownership, and automated retention) are adequate and pragmatic. Some residual risk remains due to complexity of multiple systems (AIA+, GenAI Hub, Agency) and the evolving nature of AI use cases, so Medium residual risk is acceptable with ongoing monitoring.",
                    "rating": "Medium",
                    "role": "Risk Owner"
                },
                {
                    "justification": "The use of chat logs, DM consent, and lead profiling data across their lifecycle raises obligations under data protection and consumer laws (e.g., purpose limitation, retention proportionality, data subject rights, and clear consent documentation). With documented lifecycle rules, ownership, and retention, and with mechanisms to action consent withdrawal and data deletion across all downstream systems, the main legal risks can be mitigated. Residual risk remains due to potential gaps between documented processes and actual technical implementation, and the possibility of outdated benefit content being used in disputes. Hence a Medium rating is appropriate.",
                    "rating": "Medium",
                    "role": "Legal"
                },
                {
                    "justification": "Data lifecycle failures can lead directly to regulatory breaches (e.g., storing DM/marketing data longer than allowed, using data for marketing after consent withdrawal, or reliance on outdated benefit/claims information). The proposed controls embed policy alignment, audit trails, and periodic monitoring, which should reduce the likelihood of systemic non-compliance. However, given the volume of members, the automation of consent capture, and the involvement of multiple business units and systems, some residual conduct and regulatory risk remains. Therefore, residual risk is assessed as Medium rather than Low.",
                    "rating": "Medium",
                    "role": "Compliance"
                }
            ],
            "triggers": [
                "Member and interaction data (chat logs, DM consent records, interest level indicators) are captured and stored in GenAI Hub / AIA+ systems without full alignment to enterprise data lifecycle standards (classification, retention, deletion, and purpose limitation).",
                "Knowledge ingestion process for EB documents (benefit summaries, member guides, schedules) does not consistently enforce ownership, version control, approval, or decommissioning rules, leading to outdated or inaccurate content being available to the GenAI Chatbot."
            ]
        }
    },
    {
        "is_applicable": "true",
        "non_applicable_reason": null,
        "risk_details": {
            "consequences": [
                "Members receive incorrect benefits / claim‑related information (coverage, remaining limit, shortfall, visit balance) from the GenAI Chatbot, leading to poor decisions on medical treatment or claim behaviour, complaints and potential disputes/claims against the company",
                "Improper use of personal data for direct marketing (e.g. contacting members or dependents without valid DM consent, or beyond stated purpose/scope) resulting in breaches of data protection / direct marketing regulations, investigations, fines and mandatory remediation exercises"
            ],
            "inherent_risk_rating": "High",
            "mitigating_actions": [
                {
                    "description": "Implement formal data quality controls and governance for knowledge ingestion (standard and general knowledge), including checklists for completeness/accuracy, version control against source-of-truth systems, and mandatory dual review/approval (CS Content Controller and Release Manager) before deployment to PROD GenAI Hub.",
                    "owner": "CS Release Manager",
                    "target_completion_date": "Prior to Launch"
                },
                {
                    "description": "Design and implement end-to-end DM consent capture, storage and usage controls: (i) standardize wording and UI with existing AIA+ DM consent framework, (ii) ensure consent flag and timestamp are written to the designated master system, (iii) enforce technical checks so lead generation logic and export can only include members with valid, current DM consent, and (iv) log consent source and history for audit trail.",
                    "owner": "Digital Product Owner / Data Governance Lead",
                    "target_completion_date": "Prior to Launch"
                }
            ],
            "risk_title": "Inaccurate or Improper Use of Member and Consent Data for GenAI Chatbot Servicing and Lead Generation",
            "stakeholder_comments": [
                {
                    "justification": "The GenAI Chatbot and lead‑generation features rely heavily on accurate EB data, DM consent records and interest‑level scoring. Without controls, the likelihood of errors and misuse would be high and could damage client and member trust. The proposed controls (strong knowledge‑ingestion governance, consent management aligned with existing AIA+ practice, and validated interest‑scoring rules) reduce the likelihood of material issues to a manageable level. Some residual risk remains due to model evolution and the scale of data, but it is acceptable given the business benefits.",
                    "rating": "Medium",
                    "role": "Risk Owner"
                },
                {
                    "justification": "The inherent risk is high because end‑to‑end data capture and usage (knowledge ingestion, consent, profiling, lead export) spans multiple systems and teams. The proposed mitigating actions introduce clear ownership, documented procedures, dual controls, and periodic testing that are aligned with the enterprise data risk framework. These controls make the risk observable and testable and bring the residual risk down to medium. Continued RCSA updates, control testing and incident/near‑miss capture will be important to ensure the controls remains effective as the chatbot scales.",
                    "rating": "Medium",
                    "role": "Op Risk Management"
                },
                {
                    "justification": "From an information security perspective, the key concern is that inaccurate or improperly governed data might lead to over‑exposure or misuse of member data. However, the described solution relies on existing secure AIA+ authentication, GenAI Hub as a controlled internal knowledge repository, and Azure OpenAI with group‑approved configurations. The proposed actions focus on data quality and consent enforcement rather than core CIA weaknesses. No significant additional confidentiality, integrity or availability risk beyond existing enterprise controls has been identified; hence residual risk is low from LIS's lens, assuming standard access control, logging and encryption remain in place.",
                    "rating": "Low",
                    "role": "LIS"
                }
            ],
            "triggers": [
                "Incorrect, incomplete or outdated ingestion of EB policy documents (benefit summaries, member guides, surgical schedules) into GenAI Hub Knowledge Base leading to wrong coverage/claim information being surfaced by the chatbot",
                "Defects or gaps in DM consent capture and logging (e.g. UI/wording inconsistency with corporate standard, consent flag not stored or mapped correctly to downstream systems/GenAI Hub) causing use of member data for marketing without valid consent or failure to use it when consent exists"
            ]
        }
    }
];

// 在控制台输出数据信息，方便调试
console.log('📊 Demo Data Loaded:', BACKEND_DATA_JSON.length, 'risk items');

