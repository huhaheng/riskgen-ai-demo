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
var BACKEND_DATA_JSON =  [
  {
    "is_applicable": "true",
    "level1_risk_type": "Data Risk",
    "level2_3_risk_category": "Data Life-Cycle Risk",
    "non_applicable_reason": null,
    "risk_details": {
      "consequences": [
        "Members’ enquiries are answered based on outdated or incorrect benefits/policy data, leading to incorrect decisions by members (e.g., treatment choice, provider choice) and potential financial / compensation claims against the company."
      ],
      "inherent_risk_rating": "High",
      "mitigating_actions": [
        {
          "description": "Define and document end‑to‑end data lifecycle governance for GenAI Chatbot and GenAI Hub",
          "owner": "Data Governance Lead / CS Business Data Owner",
          "target_completion_date": "Prior to Launch"
        },
        {
          "description": "Implement technical and procedural controls to enforce data quality, version control, and lifecycle management of knowledge documents (benefit summary, member guide, surgical schedule), including: (i) mandatory validity/expiry metadata, (ii) periodic review schedule, (iii) formal decommissioning process, and (iv) audit trail for changes and releases across Staging and PROD GenAI Hub.",
          "owner": "CS Content Controller / CS Release Manager / TDA Data Scientist Lead",
          "target_completion_date": "Prior to Launch"
        },
        {
          "description": "Establish a controlled process and system logic to ensure DM consent status and revocation are consistently synchronized and applied across AIA+",
          "owner": "Project Manager / IT Lead (AIA+ & GenAI Hub) / CS Business Team",
          "target_completion_date": "Prior to Launch + 1 month"
        }
      ],
      "risk_title": "Inadequate governance of member and policy data across GenAI Chatbot life cycle (capture, use, retention, and lead generation)",
      "stakeholder_comments": [
        {
          "justification": "From a business perspective, the data lifecycle risk is material because the GenAI Chatbot will be a primary self‑service channel and a feeder of leads to Agency.",
          "rating": "Medium",
          "role": "Risk Owner"
        },
        {
          "justification": "The main concerns are unlawful processing of personal data for direct marketing and use of outdated policy/benefit information that could lead to misrepresentation claims.",
          "rating": "Medium",
          "role": "Legal"
        },
        {
          "justification": "Compliance focuses on ensuring that the capture, use, and retention of customer data and DM consent comply with data protection, direct marketing, and conduct requirements.",
          "rating": "Medium",
          "role": "Compliance"
        }
      ],
      "triggers": [
        "Inconsistent or unclear data ownership and stewardship across AIA+, GenAI Hub Portal, and GenAI Chatbot (e.g., no single accountable owner for chat logs, DM consent flags, and interest-level indicators) leading to ad-hoc practices."
      ]
    }
  },
  {
    "is_applicable": "true",
    "level1_risk_type": "Data Risk",
    "level2_3_risk_category": "Data Capture, Maintenance and Use",
    "non_applicable_reason": null,
    "risk_details": {
      "consequences": [
        "Members receive inaccurate benefit and claim-related information, or marketing contact is initiated based on wrong or outdated data, leading to customer complaints, remediation costs and potential financial loss from service recovery and rework."
      ],
      "inherent_risk_rating": "High",
      "mitigating_actions": [
        {
          "description": "Define and implement a formal Data Quality and Governance Framework for GenAI Chatbot and GenAI Hub (including data dictionaries, data lineage, ownership, validation rules for AIA+ user ID, conversation ID, timestamps, interest indicators, and consent flags).",
          "owner": "Data Governance Lead / CS Business Analyst",
          "target_completion_date": "Prior to Launch"
        },
        {
          "description": "Implement automated and manual data quality controls for knowledge ingestion and maintenance (e.g., version control of benefit summaries and member guides, anomaly detection thresholds, reconciliation of latest approved policy documents, periodic review cycle).",
          "owner": "CS Content Controller / TDA Data Scientist",
          "target_completion_date": "Prior to Launch and Ongoing Quarterly"
        },
        {
          "description": "Design and embed periodic reconciliation and monitoring for DM consent and lead generation data (e.g., sampling of leads vs. source chat logs and consent records, validation of hot/warm/cold logic, exception reporting and remediation procedures).",
          "owner": "CS Business Team Lead / Project Manager",
          "target_completion_date": "Post-Launch + 1 month and Ongoing Monthly"
        }
      ],
      "risk_title": "Inaccurate or Poorly Governed Use of Member and Interaction Data in GenAI Chatbot, DM Consent Capture, and Lead Generation",
      "stakeholder_comments": [
        {
          "justification": "The GenAI Chatbot, DM consent capture and lead generation processes rely heavily on accurate capture and maintenance of interaction, consent and knowledge data. Without controls, the potential customer and regulatory impact could be material, hence the inherent rating is High.",
          "rating": "Medium",
          "role": "Risk Owner"
        },
        {
          "justification": "From a legal standpoint, the main concern is that inaccurate or poorly governed data (e.g., incorrect consent flags, outdated benefit information) could lead to breaches of data protection and direct marketing laws, or give rise to misrepresentation or reliance claims.",
          "rating": "Medium",
          "role": "Legal"
        }
      ],
      "triggers": [
        "Incorrect or incomplete capture of member interaction data (e.g., AIA+ user ID, conversation ID, timestamp, interest indicator) from the GenAI Chatbot or GenAI Hub, leading to corrupted or mismatched records.",
        "Data quality or governance gaps in knowledge ingestion (e.g., outdated benefit summaries, member guides, or surgical schedules) resulting in the GenAI Chatbot using obsolete or inaccurate information for responses and subsequent analytics."
      ]
    }
  }
];

// 在控制台输出数据信息，方便调试
console.log('📊 Demo Data Loaded:', BACKEND_DATA_JSON.length, 'risk items');

