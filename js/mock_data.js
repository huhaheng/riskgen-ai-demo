/**
 * Mock Data & Default Constants for RiskGen AI
 * Updated to match real operational risk assessment data structure
 */

var BACKEND_DATA_JSON = [
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

const DEFAULT_PROMPT_MODULES = {
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

// Risk Categories organized by domain
const RISK_CATEGORIES = {
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

// Flattened array of all risk categories for iteration during generation
const RISK_CATEGORIES_LANDSCAPE = Object.entries(RISK_CATEGORIES).flatMap(([level1, items]) =>
    items.map(item => ({
        level1: level1,
        level2: item.level2,
        level3: item.level3
    }))
);

// Scenario pool for mock generation (maps level3 to scenario details)
const MOCK_SCENARIOS_POOL = {
    "Data Lifecycle Management": {
        title: "Inadequate Governance of Member and Policy Data Across GenAI Chatbot Data Lifecycle",
        inherent: "High",
        residual: "Medium",
        triggers: ["Data captured without lifecycle standards alignment", "Knowledge ingestion lacking version control"],
        consequences: ["Outdated data causing member disputes", "Regulatory non-compliance on data retention"]
    },
    "Data Quality Controls": {
        title: "Inaccurate or Improper Use of Member and Consent Data",
        inherent: "High",
        residual: "Medium",
        triggers: ["Outdated policy documents in knowledge base", "DM consent capture gaps"],
        consequences: ["Incorrect benefits information to members", "Regulatory breaches on direct marketing"]
    },
    "Identity & Access Management": {
        title: "Unauthorized Access to GenAI Chatbot Functions or Member Data",
        inherent: "Critical",
        residual: "Medium",
        triggers: ["Weak authentication mechanisms", "Session management vulnerabilities"],
        consequences: ["Data breach of PII", "Fraudulent account access"]
    },
    "AI Model Accuracy & Bias": {
        title: "AI Model Generating Inaccurate or Biased Responses",
        inherent: "High",
        residual: "Medium",
        triggers: ["LLM hallucinations", "Training data bias", "Model drift"],
        consequences: ["Incorrect member guidance", "Regulatory scrutiny for AI fairness"]
    },
    "Direct Marketing Consent": {
        title: "Non-Compliant Direct Marketing Practices via Lead Generation",
        inherent: "High",
        residual: "Low",
        triggers: ["Lead export without consent validation", "Chatbot consent not meeting requirements"],
        consequences: ["Regulatory enforcement", "Mandatory remediation programs"]
    },
    "System Availability": {
        title: "GenAI Chatbot Service Unavailability Impacting Member Experience",
        inherent: "Medium",
        residual: "Low",
        triggers: ["API rate limiting or outages", "Backend infrastructure failures"],
        consequences: ["Members unable to access chatbot", "Increased call center volume"]
    },
    "Vendor Management": {
        title: "Dependency on Third-Party AI Provider Without Adequate Oversight",
        inherent: "Medium",
        residual: "Low",
        triggers: ["Inadequate vendor due diligence", "Lack of contractual provisions"],
        consequences: ["Compliance gaps in third-party arrangements", "Unexpected cost increases"]
    }
};

// Mock generated risk assessment results - matching real data structure
const MOCK_RISK_RESULTS = [
    {
        id: "risk_001",
        category: { level1: "Data Risk", level2: "Data Governance", level3: "Data Lifecycle Management" },
        is_applicable: true,
        status: "draft",
        risk_details: {
            risk_title: "Inadequate Governance of Member and Policy Data Across GenAI Chatbot Data Lifecycle",
            inherent_risk_rating: "High",
            triggers: [
                "Member and interaction data (chat logs, DM consent records, interest level indicators) are captured and stored in GenAI Hub / AIA+ systems without full alignment to enterprise data lifecycle standards (classification, retention, deletion, and purpose limitation).",
                "Knowledge ingestion process for EB documents (benefit summaries, member guides, schedules) does not consistently enforce ownership, version control, approval, or decommissioning rules, leading to outdated or inaccurate content being available to the GenAI Chatbot."
            ],
            consequences: [
                "Use of outdated, incomplete or inaccurate EB and claims-related data in chatbot responses or lead reports, leading to incorrect guidance to members and potential financial detriment or disputes (e.g., benefit coverage arguments, mis-selling complaints).",
                "Non-compliance with internal data retention / deletion standards or regulatory expectations on data minimisation and purpose limitation (especially around DM consent and lead data), potentially resulting in regulatory findings, fines and mandated remediation."
            ],
            mitigating_actions: [
                {
                    description: "Define and document an end-to-end data lifecycle for GenAI Chatbot and GenAI Hub (capture, storage, usage, sharing, archival, deletion) for all relevant datasets: member identifiers, chat logs, DM consent, interest level indicators, and lead export files. Align with enterprise data retention schedule and regulatory requirements for medical insurance and marketing data.",
                    owner: "Data Governance Lead / CS Business Data Owner",
                    target_completion_date: "Prior to Launch"
                }
            ],
            stakeholder_comments: [
                {
                    role: "Risk Owner",
                    rating: "Medium",
                    justification: "From a business perspective, data is central to the value proposition of the GenAI Chatbot. Without robust lifecycle management, there is a risk of outdated benefits content and over-retention of member data. The proposed controls are adequate and pragmatic."
                },
                {
                    role: "Legal",
                    rating: "Medium",
                    justification: "The use of chat logs, DM consent, and lead profiling data across their lifecycle raises obligations under data protection laws. With documented lifecycle rules and mechanisms for consent withdrawal, main legal risks can be mitigated."
                },
                {
                    role: "Compliance",
                    rating: "Medium",
                    justification: "Data lifecycle failures can lead directly to regulatory breaches. The proposed controls embed policy alignment and audit trails. Some residual conduct and regulatory risk remains."
                }
            ]
        }
    },
    {
        id: "risk_002",
        category: { level1: "Data Risk", level2: "Data Governance", level3: "Data Quality Controls" },
        is_applicable: true,
        status: "review",
        risk_details: {
            risk_title: "Inaccurate or Improper Use of Member and Consent Data for GenAI Chatbot Servicing and Lead Generation",
            inherent_risk_rating: "High",
            triggers: [
                "Incorrect, incomplete or outdated ingestion of EB policy documents (benefit summaries, member guides, surgical schedules) into GenAI Hub Knowledge Base leading to wrong coverage/claim information being surfaced by the chatbot.",
                "Defects or gaps in DM consent capture and logging (e.g. UI/wording inconsistency with corporate standard, consent flag not stored or mapped correctly to downstream systems) causing use of member data for marketing without valid consent."
            ],
            consequences: [
                "Members receive incorrect benefits / claim-related information from the GenAI Chatbot, leading to poor decisions on medical treatment or claim behaviour, complaints and potential disputes/claims against the company.",
                "Improper use of personal data for direct marketing resulting in breaches of data protection / direct marketing regulations, investigations, fines and mandatory remediation exercises."
            ],
            mitigating_actions: [
                {
                    description: "Implement formal data quality controls and governance for knowledge ingestion, including checklists for completeness/accuracy, version control against source-of-truth systems, and mandatory dual review/approval before deployment to PROD GenAI Hub.",
                    owner: "CS Release Manager",
                    target_completion_date: "Prior to Launch"
                },
                {
                    description: "Design and implement end-to-end DM consent capture, storage and usage controls with standardized wording and UI, proper consent flag storage, technical checks for lead generation, and audit trail logging.",
                    owner: "Digital Product Owner / Data Governance Lead",
                    target_completion_date: "Prior to Launch"
                }
            ],
            stakeholder_comments: [
                {
                    role: "Risk Owner",
                    rating: "Medium",
                    justification: "The GenAI Chatbot relies heavily on accurate EB data and DM consent records. The proposed controls reduce likelihood of material issues to a manageable level."
                },
                {
                    role: "Op Risk Management",
                    rating: "Medium",
                    justification: "The proposed mitigating actions introduce clear ownership, documented procedures, and dual controls aligned with enterprise data risk framework."
                },
                {
                    role: "LIS",
                    rating: "Low",
                    justification: "From information security perspective, the solution relies on existing secure AIA+ authentication and GenAI Hub as a controlled internal repository. No significant additional risks identified."
                }
            ]
        }
    },
    {
        id: "risk_003",
        category: { level1: "Technology Risk", level2: "Cyber Security", level3: "Identity & Access Management" },
        is_applicable: true,
        status: "draft",
        risk_details: {
            risk_title: "Unauthorized Access to GenAI Chatbot Functions or Member Data via Weak Authentication",
            inherent_risk_rating: "Critical",
            triggers: [
                "Weak or missing authentication mechanisms allowing unauthorized users to access member-specific chatbot features.",
                "Session management vulnerabilities enabling session hijacking or fixation attacks.",
                "Insufficient role-based access controls allowing users to access functions beyond their entitlements."
            ],
            consequences: [
                "Unauthorized disclosure of PII and sensitive member health/insurance information leading to data breach notification requirements and regulatory action.",
                "Fraudulent access to member accounts enabling unauthorized transactions or data modifications.",
                "Reputational damage and loss of member trust in digital channels."
            ],
            mitigating_actions: [
                {
                    description: "Integrate GenAI Chatbot with existing AIA+ SSO/OAuth2.0 authentication framework ensuring all member sessions are properly authenticated and session tokens are securely managed.",
                    owner: "Tech Lead / Identity Team",
                    target_completion_date: "Prior to Launch"
                },
                {
                    description: "Implement comprehensive access logging and anomaly detection for all chatbot interactions, with automated alerts for suspicious access patterns.",
                    owner: "Security Operations",
                    target_completion_date: "Prior to Launch"
                }
            ],
            stakeholder_comments: [
                {
                    role: "Tech Risk",
                    rating: "Medium",
                    justification: "Leveraging existing enterprise IAM framework significantly reduces inherent risk. Standard security controls and monitoring should be adequate."
                },
                {
                    role: "LIS",
                    rating: "Medium",
                    justification: "With proper SSO integration and session management, authentication risks are manageable. Regular penetration testing recommended."
                }
            ]
        }
    },
    {
        id: "risk_004",
        category: { level1: "AI Governance Risk", level2: "Model Risk", level3: "AI Model Accuracy & Bias" },
        is_applicable: true,
        status: "draft",
        risk_details: {
            risk_title: "AI Model Generating Inaccurate or Biased Responses Affecting Member Servicing Quality",
            inherent_risk_rating: "High",
            triggers: [
                "LLM generates hallucinated or factually incorrect responses about policy coverage, claim procedures, or benefit entitlements.",
                "Training data or prompt engineering introduces unintended bias affecting response quality for certain member segments.",
                "Model drift over time leading to degraded response accuracy without proper monitoring."
            ],
            consequences: [
                "Members receive incorrect guidance leading to claim denials, out-of-pocket expenses, or inappropriate medical decisions.",
                "Certain member groups receive inconsistent or lower quality service due to model bias.",
                "Regulatory scrutiny for AI fairness and accountability requirements not being met."
            ],
            mitigating_actions: [
                {
                    description: "Implement comprehensive prompt engineering with guardrails, including citation requirements, confidence scoring, and explicit disclaimers for health-related advice.",
                    owner: "AI Product Owner",
                    target_completion_date: "Prior to Launch"
                },
                {
                    description: "Establish ongoing model performance monitoring with accuracy metrics, bias audits, and regular human review of sample responses.",
                    owner: "Data Science Lead",
                    target_completion_date: "Monthly post-launch"
                },
                {
                    description: "Define escalation paths to human agents for complex or high-stakes inquiries where AI confidence is below threshold.",
                    owner: "CS Operations Lead",
                    target_completion_date: "Prior to Launch"
                }
            ],
            stakeholder_comments: [
                {
                    role: "AI Governance",
                    rating: "Medium",
                    justification: "With proper guardrails, monitoring, and human escalation paths, AI-related risks can be managed to acceptable levels. Ongoing vigilance required."
                },
                {
                    role: "Risk Owner",
                    rating: "Medium",
                    justification: "Business accepts residual risk given controls in place and significant operational benefits of AI-assisted servicing."
                }
            ]
        }
    },
    {
        id: "risk_005",
        category: { level1: "Regulatory Risk", level2: "Compliance", level3: "Direct Marketing Consent" },
        is_applicable: true,
        status: "final",
        risk_details: {
            risk_title: "Non-Compliant Direct Marketing Practices via Lead Generation Module",
            inherent_risk_rating: "High",
            triggers: [
                "Lead generation logic exports member contact details without proper validation of current DM consent status.",
                "DM consent obtained through chatbot does not meet regulatory requirements for clarity, specificity, or documentation.",
                "Lack of synchronization between chatbot consent records and enterprise DM preference center leading to conflicting consent states."
            ],
            consequences: [
                "Regulatory investigation and enforcement action for unsolicited direct marketing communications.",
                "Mandatory remediation programs including member outreach and consent re-collection.",
                "Significant fines and potential restrictions on marketing activities."
            ],
            mitigating_actions: [
                {
                    description: "Ensure DM consent wording in chatbot exactly matches approved enterprise consent templates reviewed by Legal and Compliance.",
                    owner: "Legal / Compliance",
                    target_completion_date: "Prior to Launch"
                },
                {
                    description: "Implement real-time validation of DM consent status before any lead export, with technical blocks preventing non-consented data from reaching sales channels.",
                    owner: "Tech Lead",
                    target_completion_date: "Prior to Launch"
                }
            ],
            stakeholder_comments: [
                {
                    role: "Compliance",
                    rating: "Low",
                    justification: "With standardized consent wording, real-time validation, and technical blocks, DM compliance risks are well controlled."
                },
                {
                    role: "Legal",
                    rating: "Low",
                    justification: "Proposed controls address key regulatory requirements. Residual risk acceptable with proper documentation and audit capability."
                }
            ]
        }
    },
    {
        id: "risk_006",
        category: { level1: "Technology Risk", level2: "Tech Ops", level3: "System Availability" },
        is_applicable: true,
        status: "review",
        risk_details: {
            risk_title: "GenAI Chatbot Service Unavailability Impacting Member Experience",
            inherent_risk_rating: "Medium",
            triggers: [
                "Azure OpenAI API rate limiting or service outages affecting chatbot response capability.",
                "GenAI Hub backend infrastructure failures or capacity issues during peak load.",
                "Network connectivity issues between AIA+ mobile app and GenAI backend services."
            ],
            consequences: [
                "Members unable to access chatbot for benefit inquiries, increasing call center volume and wait times.",
                "Negative member experience and feedback on digital channel reliability.",
                "Missed lead generation opportunities during downtime periods."
            ],
            mitigating_actions: [
                {
                    description: "Implement graceful degradation patterns with fallback to static FAQ content and clear messaging when AI features are unavailable.",
                    owner: "Tech Lead",
                    target_completion_date: "Prior to Launch"
                },
                {
                    description: "Establish monitoring dashboards and alerting for all critical service dependencies with defined SLAs and escalation procedures.",
                    owner: "Tech Ops",
                    target_completion_date: "Prior to Launch"
                }
            ],
            stakeholder_comments: [
                {
                    role: "Tech Risk",
                    rating: "Low",
                    justification: "Standard availability controls and fallback mechanisms are adequate for this use case which is not business-critical."
                },
                {
                    role: "Risk Owner",
                    rating: "Low",
                    justification: "Chatbot is additive to existing channels. Temporary unavailability is acceptable with proper degradation handling."
                }
            ]
        }
    },
    {
        id: "risk_007",
        category: { level1: "Business Ops Risk", level2: "Third Party", level3: "Vendor Management" },
        is_applicable: true,
        status: "draft",
        risk_details: {
            risk_title: "Dependency on Third-Party AI Provider (Azure OpenAI) Without Adequate Oversight",
            inherent_risk_rating: "Medium",
            triggers: [
                "Inadequate due diligence on Azure OpenAI data handling, security practices, and compliance posture.",
                "Lack of contractual provisions for data processing, incident notification, and audit rights.",
                "Changes to Azure OpenAI service terms, pricing, or capabilities without adequate notice or planning."
            ],
            consequences: [
                "Regulatory non-compliance due to gaps in third-party data processing arrangements.",
                "Unexpected cost increases or service changes impacting business case viability.",
                "Limited recourse in case of vendor-caused data breach or service failures."
            ],
            mitigating_actions: [
                {
                    description: "Complete enterprise third-party risk assessment for Azure OpenAI service with documented review of security certifications, data processing terms, and compliance attestations.",
                    owner: "Vendor Risk Management",
                    target_completion_date: "Prior to Launch"
                },
                {
                    description: "Ensure appropriate contractual terms are in place covering data processing, security requirements, incident notification, and termination assistance.",
                    owner: "Legal / Procurement",
                    target_completion_date: "Prior to Launch"
                }
            ],
            stakeholder_comments: [
                {
                    role: "Op Risk Management",
                    rating: "Low",
                    justification: "Azure/Microsoft is an established enterprise vendor with strong security posture. Standard third-party controls are sufficient."
                },
                {
                    role: "Legal",
                    rating: "Low",
                    justification: "Microsoft enterprise agreements provide adequate contractual protections. Standard terms review is sufficient."
                }
            ]
        }
    },
    {
        id: "risk_008",
        category: { level1: "Data Risk", level2: "Data Privacy", level3: "Data Confidentiality" },
        is_applicable: false,
        non_applicable_reason: "The GenAI Chatbot does not process or transmit data cross-border. All data remains within the local Azure region with data residency controls in place.",
        status: "final",
        risk_details: null
    }
];

// SME Roles for stakeholder reviews
const SME_ROLES = [
    "Risk Owner",
    "Legal",
    "Compliance",
    "Op Risk Management",
    "LIS",
    "Tech Risk",
    "AI Governance"
];

// Risk rating colors and weights
const RISK_RATINGS = {
    "Critical": { color: "#DC2626", weight: 4 },
    "High": { color: "#EA580C", weight: 3 },
    "Medium": { color: "#D97706", weight: 2 },
    "Low": { color: "#16A34A", weight: 1 }
};

// Status definitions
const RISK_STATUSES = {
    "draft": { label: "Draft", color: "#64748B" },
    "review": { label: "In Review", color: "#2563EB" },
    "final": { label: "Finalized", color: "#16A34A" }
};
