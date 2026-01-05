/**
 * =============================================================================
 * KNOWLEDGE BASE DATA - 历史风险评估案例
 * =============================================================================
 * Operational Risk Assessment Paper 历史案例数据
 * 用于 LLM 做 risk assessment 时的重要案例参考（context）
 */

var KNOWLEDGE_CASES = [
    {
        case_id: "CASE-2024-001",
        case_title: "GenAI Customer Service Chatbot Implementation",
        case_type: "AI/ML Implementation",
        business_unit: "Customer Service & Digital",
        project_profile: {
            background_and_purpose: {
                proposed_changes: "Implement a GenAI-powered customer service chatbot for member benefit inquiries, claims status checks, and lead generation through the AIA+ mobile application.",
                reasons_for_changes: "Current customer service channels are experiencing high call volumes with average wait times exceeding 8 minutes. Members increasingly prefer digital self-service options for routine inquiries.",
                expected_benefits: "Reduce call center volume by 30%, improve member satisfaction scores, enable 24/7 service availability, and generate qualified leads for agency distribution channel.",
                market_or_industry_practice: "Leading insurers in APAC have implemented AI-powered chatbots with reported 40% reduction in call volumes. Regulatory guidance supports responsible AI deployment with appropriate governance.",
                cost_and_benefit_analysis: "Implementation cost: HKD 8M. Expected annual savings: HKD 15M from reduced call center staffing. ROI expected within 8 months post-launch.",
                additional_notes: "Phase 1 focuses on benefit inquiries and lead generation. Claims submission features planned for Phase 2."
            },
            operational_flow: {
                existing_operational_flow_description: "Members call customer service hotline or submit web forms. Agents manually retrieve policy information from multiple systems to answer inquiries.",
                new_operational_flow_description: "Members interact with GenAI chatbot via AIA+ app. Chatbot authenticates member, retrieves relevant policy/claims data via API, and provides personalized responses. Leads are scored and exported to agency CRM.",
                process_impact_summary: "Significant reduction in manual inquiry handling. New data flows between chatbot, policy systems, and agency channels require governance controls.",
                existing_operational_flow_steps: [
                    "Member calls customer service hotline",
                    "Agent authenticates member identity",
                    "Agent accesses multiple backend systems",
                    "Agent verbally provides information",
                    "Agent logs interaction in CRM"
                ],
                new_operational_flow_steps: [
                    "Member opens AIA+ app and initiates chat",
                    "Chatbot authenticates via AIA+ SSO",
                    "Chatbot queries policy/claims APIs",
                    "GenAI generates personalized response",
                    "Member interaction logged with consent tracking",
                    "Qualified leads exported to agency CRM"
                ],
                flow_diagram_references: ["genai_chatbot_flow_v2.png", "data_architecture_diagram.pdf"]
            }
        },
        risk_assessment: {
            overall_risk_assessment_summary: {
                risk_summaries: [
                    {
                        risk_id: "R001",
                        risk_name: "Inadequate Governance of Member Data Across GenAI Chatbot Data Lifecycle",
                        risk_owner: "Chief Customer Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Data Risk",
                            level2_3_risk_category: "Data Governance / Data Lifecycle Management"
                        },
                        residual_risk_ratings: {
                            Legal: "Medium",
                            Compliance: "Medium",
                            OperationalRisk: "Medium",
                            LIS: "Low",
                            TechRisk: "Medium",
                            OtherSME: "Low"
                        },
                        is_conduct_risk: false
                    },
                    {
                        risk_id: "R002",
                        risk_name: "Inaccurate or Improper Use of Member and Consent Data",
                        risk_owner: "Chief Customer Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Data Risk",
                            level2_3_risk_category: "Data Quality / Data Accuracy"
                        },
                        residual_risk_ratings: {
                            Legal: "Medium",
                            Compliance: "High",
                            OperationalRisk: "Medium",
                            LIS: "Medium",
                            TechRisk: "Low",
                            OtherSME: "Low"
                        },
                        is_conduct_risk: true
                    },
                    {
                        risk_id: "R003",
                        risk_name: "AI Model Generating Inaccurate Benefit Information",
                        risk_owner: "Chief Technology Officer",
                        inherent_risk_overall: "Medium",
                        risk_taxonomy: {
                            level1_risk_type: "AI Governance Risk",
                            level2_3_risk_category: "Model Risk / Output Accuracy"
                        },
                        residual_risk_ratings: {
                            Legal: "Low",
                            Compliance: "Medium",
                            OperationalRisk: "Medium",
                            LIS: "Low",
                            TechRisk: "Medium",
                            OtherSME: "Low"
                        },
                        is_conduct_risk: true
                    }
                ]
            },
            key_drivers_for_residual_risk: [
                {
                    risk_id: "R001",
                    risk_name: "Inadequate Governance of Member Data Across GenAI Chatbot Data Lifecycle",
                    highest_residual_risk_level: "Medium",
                    key_drivers_and_justification: "Data governance framework has been established with clear ownership. Retention policies defined. Residual risk remains medium due to complexity of multi-system data flows and ongoing monitoring requirements."
                },
                {
                    risk_id: "R002",
                    risk_name: "Inaccurate or Improper Use of Member and Consent Data",
                    highest_residual_risk_level: "High",
                    key_drivers_and_justification: "Compliance rates this as High due to PDPO direct marketing consent requirements. While consent capture mechanisms are in place, the complexity of cross-channel consent synchronization presents ongoing compliance risk."
                }
            ],
            detailed_risk_scenarios: [
                {
                    risk_id: "R001",
                    risk_name: "Inadequate Governance of Member Data Across GenAI Chatbot Data Lifecycle",
                    inherent_risk_level: "High",
                    triggers: [
                        "Lack of clear data ownership across chatbot data flows",
                        "Insufficient data retention and deletion controls",
                        "Unclear accountability for data quality in AI training data",
                        "Missing audit trail for data access and modifications"
                    ],
                    consequences: [
                        "Regulatory breach due to improper data handling",
                        "Reputational damage from data governance failures",
                        "Inability to respond to data subject access requests",
                        "Compliance findings from internal audit"
                    ],
                    mitigating_actions: [
                        {
                            action_id: "M001-1",
                            description: "Establish Data Governance Committee with clear RACI for chatbot data flows",
                            action_owner: "Chief Data Officer",
                            target_completion_date: "2024-06-30",
                            status: "Completed"
                        },
                        {
                            action_id: "M001-2",
                            description: "Implement automated data retention and deletion controls",
                            action_owner: "IT Data Management",
                            target_completion_date: "2024-08-15",
                            status: "In Progress"
                        },
                        {
                            action_id: "M001-3",
                            description: "Deploy comprehensive audit logging for all data access",
                            action_owner: "IT Security",
                            target_completion_date: "2024-07-31",
                            status: "Completed"
                        }
                    ],
                    stakeholder_ratings_and_comments: [
                        {
                            stakeholder_role: "Legal",
                            residual_risk_rating: "Medium",
                            justification: "Legal framework in place. Recommend periodic review of consent mechanisms."
                        },
                        {
                            stakeholder_role: "Compliance",
                            residual_risk_rating: "Medium",
                            justification: "Controls adequate but monitoring required for ongoing compliance."
                        },
                        {
                            stakeholder_role: "Op Risk Management",
                            residual_risk_rating: "Medium",
                            justification: "Governance structure established. Operational procedures need ongoing refinement."
                        }
                    ]
                },
                {
                    risk_id: "R002",
                    risk_name: "Inaccurate or Improper Use of Member and Consent Data",
                    inherent_risk_level: "High",
                    triggers: [
                        "Consent records not synchronized across systems in real-time",
                        "Direct marketing messages sent without valid consent",
                        "Stale or incorrect consent status used for lead generation",
                        "Inadequate opt-out processing within regulatory timeframes"
                    ],
                    consequences: [
                        "PDPO enforcement action and financial penalties",
                        "Customer complaints and reputational damage",
                        "Regulatory scrutiny and potential license implications",
                        "Legal liability from improper direct marketing"
                    ],
                    mitigating_actions: [
                        {
                            action_id: "M002-1",
                            description: "Implement real-time consent synchronization between chatbot and master consent database",
                            action_owner: "IT Integration",
                            target_completion_date: "2024-07-15",
                            status: "Completed"
                        },
                        {
                            action_id: "M002-2",
                            description: "Deploy automated consent verification before any lead export to agency CRM",
                            action_owner: "Digital Product",
                            target_completion_date: "2024-07-31",
                            status: "Completed"
                        },
                        {
                            action_id: "M002-3",
                            description: "Establish daily consent reconciliation reports with exception alerts",
                            action_owner: "Compliance Monitoring",
                            target_completion_date: "2024-08-15",
                            status: "In Progress"
                        }
                    ],
                    stakeholder_ratings_and_comments: [
                        {
                            stakeholder_role: "Legal",
                            residual_risk_rating: "Medium",
                            justification: "Controls reasonable. Cross-channel consent synchronization remains complex."
                        },
                        {
                            stakeholder_role: "Compliance",
                            residual_risk_rating: "High",
                            justification: "PDPO direct marketing requirements are stringent. Despite controls, the complexity of multi-channel consent management presents ongoing risk. Recommend enhanced monitoring."
                        },
                        {
                            stakeholder_role: "Op Risk Management",
                            residual_risk_rating: "Medium",
                            justification: "Technical controls in place. Process maturity will improve over time."
                        }
                    ]
                }
            ]
        },
        tags: {
            project_one_line_summary: "GenAI-powered chatbot for customer service and lead generation via AIA+ app",
            change_type_summary: "New AI/ML capability deployment with customer data processing",
            core_objectives: ["Reduce call center volume", "Enable 24/7 digital service", "Generate qualified leads"],
            primary_business_functions: ["Customer Service", "Digital", "Agency Distribution"],
            primary_customer_or_user_segments: ["Existing policyholders", "AIA+ app users"],
            key_risk_themes_summary: "Data governance, consent management, AI accuracy",
            key_control_themes_summary: "Data lifecycle controls, consent verification, model monitoring",
            business_domain_keywords: ["Customer Service", "Digital Transformation", "Lead Generation", "Insurance"],
            business_function_keywords: ["Chatbot", "AI", "Member Experience", "Agency"],
            technology_or_process_keywords: ["GenAI", "Azure OpenAI", "API Integration", "Mobile App"],
            regulatory_or_compliance_keywords: ["PDPO", "Direct Marketing", "Data Privacy", "AI Governance"],
            similar_case_ids: ["CASE-2024-003", "CASE-2023-015"]
        }
    },
    {
        case_id: "CASE-2024-002",
        case_title: "Core Policy Administration System Cloud Migration",
        case_type: "System Migration",
        business_unit: "IT & Operations",
        project_profile: {
            background_and_purpose: {
                proposed_changes: "Migrate core policy administration system from on-premise mainframe to Azure cloud platform, implementing Guidewire PolicyCenter as the new policy management solution.",
                reasons_for_changes: "Legacy mainframe approaching end-of-life with increasing maintenance costs. Modern cloud platform enables scalability, improved disaster recovery, and faster feature deployment.",
                expected_benefits: "50% reduction in infrastructure costs, 99.99% availability SLA, reduced policy issuance time from 5 days to same-day, and improved integration capabilities.",
                market_or_industry_practice: "Major insurers globally have migrated to cloud-based policy systems. Regulatory guidance supports cloud adoption with appropriate security controls.",
                cost_and_benefit_analysis: "Total migration cost: HKD 120M over 24 months. Expected annual savings: HKD 25M from reduced infrastructure and maintenance. Full ROI within 5 years.",
                additional_notes: "Migration will be phased by product line, starting with general insurance products."
            },
            operational_flow: {
                existing_operational_flow_description: "Policy operations run on mainframe COBOL applications. Batch processing overnight for premium calculations and policy updates. Manual intervention required for complex cases.",
                new_operational_flow_description: "Real-time policy processing via Guidewire PolicyCenter on Azure. API-driven integrations replace batch files. Automated workflows for standard policy operations.",
                process_impact_summary: "Fundamental shift from batch to real-time processing. All downstream systems require API integration updates. Staff retraining required for new platform.",
                existing_operational_flow_steps: [
                    "Agent submits application via portal",
                    "Batch job runs overnight for underwriting",
                    "Manual review queue for exceptions",
                    "Policy documents generated next day",
                    "Premium billing processed in batch"
                ],
                new_operational_flow_steps: [
                    "Agent submits application via portal",
                    "Real-time underwriting decision",
                    "Automated document generation",
                    "Instant premium calculation",
                    "Real-time billing integration",
                    "Immediate policy issuance confirmation"
                ],
                flow_diagram_references: ["cloud_migration_architecture.pdf", "cutover_plan_diagram.png"]
            }
        },
        risk_assessment: {
            overall_risk_assessment_summary: {
                risk_summaries: [
                    {
                        risk_id: "R001",
                        risk_name: "Data Loss or Corruption During Migration Cutover",
                        risk_owner: "Chief Operations Officer",
                        inherent_risk_overall: "Critical",
                        risk_taxonomy: {
                            level1_risk_type: "Technology Risk",
                            level2_3_risk_category: "Data Migration / Data Integrity"
                        },
                        residual_risk_ratings: {
                            Legal: "Medium",
                            Compliance: "Medium",
                            OperationalRisk: "High",
                            LIS: "Medium",
                            TechRisk: "High",
                            OtherSME: "Medium"
                        },
                        is_conduct_risk: false
                    },
                    {
                        risk_id: "R002",
                        risk_name: "Extended System Downtime Impacting Policy Servicing",
                        risk_owner: "Chief Operations Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Business Operations Risk",
                            level2_3_risk_category: "Business Continuity / System Availability"
                        },
                        residual_risk_ratings: {
                            Legal: "Low",
                            Compliance: "Medium",
                            OperationalRisk: "High",
                            LIS: "High",
                            TechRisk: "High",
                            OtherSME: "Medium"
                        },
                        is_conduct_risk: false
                    },
                    {
                        risk_id: "R003",
                        risk_name: "Inadequate Cloud Security Controls for Policyholder Data",
                        risk_owner: "Chief Information Security Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Data Risk",
                            level2_3_risk_category: "Information Security / Cloud Security"
                        },
                        residual_risk_ratings: {
                            Legal: "Medium",
                            Compliance: "Medium",
                            OperationalRisk: "Medium",
                            LIS: "Medium",
                            TechRisk: "Medium",
                            OtherSME: "Low"
                        },
                        is_conduct_risk: false
                    }
                ]
            },
            key_drivers_for_residual_risk: [
                {
                    risk_id: "R001",
                    risk_name: "Data Loss or Corruption During Migration Cutover",
                    highest_residual_risk_level: "High",
                    key_drivers_and_justification: "Despite comprehensive data validation and rollback procedures, the sheer volume of policy data (3M+ policies) and complexity of the migration presents inherent risk. Tech Risk and Op Risk maintain High rating until post-migration validation is complete."
                },
                {
                    risk_id: "R002",
                    risk_name: "Extended System Downtime Impacting Policy Servicing",
                    highest_residual_risk_level: "High",
                    key_drivers_and_justification: "Cutover window limited to 72 hours. While fallback procedures exist, any extension beyond planned window would impact policy servicing. LIS and Tech Risk rate as High given business criticality."
                }
            ],
            detailed_risk_scenarios: [
                {
                    risk_id: "R001",
                    risk_name: "Data Loss or Corruption During Migration Cutover",
                    inherent_risk_level: "Critical",
                    triggers: [
                        "Data mapping errors between legacy and new system",
                        "ETL process failures during migration",
                        "Network interruption during data transfer",
                        "Insufficient validation of migrated data"
                    ],
                    consequences: [
                        "Policyholder data permanently lost or corrupted",
                        "Inability to service policies or process claims",
                        "Regulatory reporting failures",
                        "Significant financial and reputational damage"
                    ],
                    mitigating_actions: [
                        {
                            action_id: "M001-1",
                            description: "Complete three full data migration dry-runs with validation",
                            action_owner: "Migration Lead",
                            target_completion_date: "2024-10-31",
                            status: "In Progress"
                        },
                        {
                            action_id: "M001-2",
                            description: "Implement automated data reconciliation post-migration",
                            action_owner: "IT Data Quality",
                            target_completion_date: "2024-11-15",
                            status: "Planned"
                        },
                        {
                            action_id: "M001-3",
                            description: "Establish full rollback capability with 4-hour RTO",
                            action_owner: "IT Operations",
                            target_completion_date: "2024-11-01",
                            status: "In Progress"
                        }
                    ],
                    stakeholder_ratings_and_comments: [
                        {
                            stakeholder_role: "Op Risk Management",
                            residual_risk_rating: "High",
                            justification: "Controls are comprehensive but risk inherently high until migration complete and validated."
                        },
                        {
                            stakeholder_role: "Tech Risk",
                            residual_risk_rating: "High",
                            justification: "Dry-runs essential. Will reassess post-second dry-run completion."
                        }
                    ]
                }
            ]
        },
        tags: {
            project_one_line_summary: "Migration of core policy system from mainframe to Azure cloud with Guidewire",
            change_type_summary: "Major infrastructure and platform transformation",
            core_objectives: ["Reduce infrastructure costs", "Improve system availability", "Enable real-time processing"],
            primary_business_functions: ["Policy Administration", "IT Operations", "All Business Lines"],
            primary_customer_or_user_segments: ["All policyholders", "Agents", "Internal operations staff"],
            key_risk_themes_summary: "Data migration integrity, system availability, cloud security",
            key_control_themes_summary: "Migration validation, rollback procedures, security controls",
            business_domain_keywords: ["Policy Administration", "Core Systems", "Insurance Operations"],
            business_function_keywords: ["Policy Issuance", "Premium Billing", "Policy Servicing"],
            technology_or_process_keywords: ["Cloud Migration", "Azure", "Guidewire", "Mainframe Decommission"],
            regulatory_or_compliance_keywords: ["Business Continuity", "Data Protection", "Outsourcing"],
            similar_case_ids: ["CASE-2023-008", "CASE-2022-012"]
        }
    },
    {
        case_id: "CASE-2024-003",
        case_title: "Digital Direct Marketing Platform Enhancement",
        case_type: "Platform Enhancement",
        business_unit: "Marketing & Distribution",
        project_profile: {
            background_and_purpose: {
                proposed_changes: "Enhance digital direct marketing platform to support multi-channel campaigns (email, SMS, WhatsApp, app push) with centralized consent management and customer preference tracking.",
                reasons_for_changes: "Current marketing systems operate in silos with inconsistent consent tracking. PDPO requirements mandate centralized consent management and timely opt-out processing.",
                expected_benefits: "Unified consent management, improved campaign targeting, reduced compliance risk, and enhanced customer experience through preference-based communications.",
                market_or_industry_practice: "Industry moving toward consent-first marketing with unified preference centers. Regulators increasingly focused on direct marketing compliance.",
                cost_and_benefit_analysis: "Implementation cost: HKD 5M. Expected improvement in campaign conversion rates by 25%. Reduced compliance risk worth estimated HKD 2M annually.",
                additional_notes: "Integration with existing Salesforce Marketing Cloud. New consent module to be developed."
            },
            operational_flow: {
                existing_operational_flow_description: "Marketing campaigns managed separately by channel. Consent checked manually before campaign execution. Opt-outs processed within 10 business days.",
                new_operational_flow_description: "Centralized consent database with real-time synchronization across all channels. Automated consent verification before message send. Opt-outs processed within 24 hours.",
                process_impact_summary: "Significant process automation for consent management. Marketing team workflows change from manual checking to system-enforced compliance.",
                existing_operational_flow_steps: [
                    "Marketing creates campaign in channel-specific tool",
                    "Manual consent check via spreadsheet export",
                    "Campaign execution with manual suppression",
                    "Opt-out requests logged in CRM",
                    "Monthly batch update to suppression lists"
                ],
                new_operational_flow_steps: [
                    "Marketing creates campaign in unified platform",
                    "System auto-validates consent in real-time",
                    "Campaign execution with automated suppression",
                    "Opt-outs captured and synced immediately",
                    "Real-time preference center updates"
                ],
                flow_diagram_references: ["dm_platform_architecture.pdf", "consent_flow_diagram.png"]
            }
        },
        risk_assessment: {
            overall_risk_assessment_summary: {
                risk_summaries: [
                    {
                        risk_id: "R001",
                        risk_name: "Non-Compliant Direct Marketing Due to Consent Management Gaps",
                        risk_owner: "Chief Distribution Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Legal and Regulatory Risk",
                            level2_3_risk_category: "Regulatory Compliance / PDPO"
                        },
                        residual_risk_ratings: {
                            Legal: "Medium",
                            Compliance: "Medium",
                            OperationalRisk: "Low",
                            LIS: "Low",
                            TechRisk: "Low",
                            OtherSME: "Low"
                        },
                        is_conduct_risk: true
                    },
                    {
                        risk_id: "R002",
                        risk_name: "Delayed or Failed Opt-Out Processing",
                        risk_owner: "Chief Distribution Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Conduct Risk",
                            level2_3_risk_category: "Customer Treatment / Preference Management"
                        },
                        residual_risk_ratings: {
                            Legal: "Low",
                            Compliance: "Medium",
                            OperationalRisk: "Low",
                            LIS: "Low",
                            TechRisk: "Low",
                            OtherSME: "Low"
                        },
                        is_conduct_risk: true
                    }
                ]
            },
            key_drivers_for_residual_risk: [
                {
                    risk_id: "R001",
                    risk_name: "Non-Compliant Direct Marketing Due to Consent Management Gaps",
                    highest_residual_risk_level: "Medium",
                    key_drivers_and_justification: "Centralized consent management significantly reduces risk. Compliance maintains Medium rating to account for implementation complexity and need for ongoing monitoring during transition period."
                }
            ],
            detailed_risk_scenarios: [
                {
                    risk_id: "R001",
                    risk_name: "Non-Compliant Direct Marketing Due to Consent Management Gaps",
                    inherent_risk_level: "High",
                    triggers: [
                        "Consent database out of sync with channel systems",
                        "Marketing messages sent without valid consent",
                        "Consent expiry not properly tracked",
                        "Third-party data used without proper consent"
                    ],
                    consequences: [
                        "PDPO enforcement action",
                        "Customer complaints",
                        "Regulatory investigation",
                        "Reputational damage"
                    ],
                    mitigating_actions: [
                        {
                            action_id: "M001-1",
                            description: "Implement real-time consent synchronization across all channels",
                            action_owner: "IT Integration",
                            target_completion_date: "2024-04-30",
                            status: "Completed"
                        },
                        {
                            action_id: "M001-2",
                            description: "Deploy automated consent expiry tracking with alerts",
                            action_owner: "Marketing Operations",
                            target_completion_date: "2024-05-15",
                            status: "Completed"
                        }
                    ],
                    stakeholder_ratings_and_comments: [
                        {
                            stakeholder_role: "Legal",
                            residual_risk_rating: "Medium",
                            justification: "Controls appropriate. Recommend periodic compliance testing."
                        },
                        {
                            stakeholder_role: "Compliance",
                            residual_risk_rating: "Medium",
                            justification: "Significant improvement from baseline. Monitoring plan in place."
                        }
                    ]
                }
            ]
        },
        tags: {
            project_one_line_summary: "Unified direct marketing platform with centralized consent management",
            change_type_summary: "Platform enhancement for compliance and customer experience",
            core_objectives: ["Centralize consent management", "Ensure PDPO compliance", "Improve campaign effectiveness"],
            primary_business_functions: ["Marketing", "Distribution", "Customer Service"],
            primary_customer_or_user_segments: ["Existing customers", "Prospects"],
            key_risk_themes_summary: "Consent compliance, opt-out processing, data accuracy",
            key_control_themes_summary: "Real-time consent sync, automated compliance checks",
            business_domain_keywords: ["Direct Marketing", "Consent Management", "Customer Communications"],
            business_function_keywords: ["Campaign Management", "Preference Center", "Opt-out Processing"],
            technology_or_process_keywords: ["Salesforce", "Marketing Cloud", "CDP", "Real-time Sync"],
            regulatory_or_compliance_keywords: ["PDPO", "Direct Marketing Ordinance", "Consent", "Opt-out"],
            similar_case_ids: ["CASE-2024-001", "CASE-2023-022"]
        }
    },
    {
        case_id: "CASE-2024-004",
        case_title: "Automated Underwriting Decision Engine",
        case_type: "Automation & AI",
        business_unit: "Underwriting & New Business",
        project_profile: {
            background_and_purpose: {
                proposed_changes: "Implement automated underwriting decision engine using rules and predictive analytics to enable straight-through processing (STP) for standard risk life and health insurance applications.",
                reasons_for_changes: "Current manual underwriting creates bottlenecks with average 5-day turnaround. Competitors offering same-day decisions for standard cases. Need to improve agent and customer experience.",
                expected_benefits: "80% of standard applications processed same-day. Reduced underwriting staff costs. Improved policy conversion rates. Consistent underwriting decisions.",
                market_or_industry_practice: "Leading insurers achieve 60-85% STP rates for standard risks. Regulatory guidance supports automated underwriting with appropriate governance and fair treatment controls.",
                cost_and_benefit_analysis: "Implementation cost: HKD 15M. Expected annual savings: HKD 8M from reduced manual processing. Increased policy volumes worth HKD 10M annually.",
                additional_notes: "Phase 1 covers term life and medical insurance. Critical illness products in Phase 2."
            },
            operational_flow: {
                existing_operational_flow_description: "All applications reviewed by underwriters. Medical history manually assessed. Decisions made based on guidelines and underwriter judgment.",
                new_operational_flow_description: "Applications scored by rules engine and predictive model. Standard risks auto-approved or auto-declined. Complex cases referred to human underwriters.",
                process_impact_summary: "Fundamental shift in underwriting process. Underwriters focus on complex cases. New model governance and monitoring requirements.",
                existing_operational_flow_steps: [
                    "Application submitted by agent",
                    "Assigned to underwriting queue",
                    "Underwriter reviews medical history",
                    "Manual decision and premium calculation",
                    "Decision communicated to agent (3-5 days)"
                ],
                new_operational_flow_steps: [
                    "Application submitted by agent",
                    "Auto-scoring by decision engine",
                    "Standard cases: instant decision",
                    "Complex cases: routed to underwriter queue",
                    "Decision communicated immediately for STP cases"
                ],
                flow_diagram_references: ["underwriting_engine_flow.pdf", "model_architecture.png"]
            }
        },
        risk_assessment: {
            overall_risk_assessment_summary: {
                risk_summaries: [
                    {
                        risk_id: "R001",
                        risk_name: "Inaccurate Automated Underwriting Decisions Leading to Adverse Selection",
                        risk_owner: "Chief Underwriting Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Business Operations Risk",
                            level2_3_risk_category: "Underwriting Risk / Decision Accuracy"
                        },
                        residual_risk_ratings: {
                            Legal: "Low",
                            Compliance: "Medium",
                            OperationalRisk: "Medium",
                            LIS: "Low",
                            TechRisk: "Medium",
                            OtherSME: "Medium"
                        },
                        is_conduct_risk: false
                    },
                    {
                        risk_id: "R002",
                        risk_name: "Model Bias Resulting in Unfair Treatment of Applicants",
                        risk_owner: "Chief Underwriting Officer",
                        inherent_risk_overall: "High",
                        risk_taxonomy: {
                            level1_risk_type: "Conduct Risk",
                            level2_3_risk_category: "Fair Treatment / Algorithmic Bias"
                        },
                        residual_risk_ratings: {
                            Legal: "Medium",
                            Compliance: "Medium",
                            OperationalRisk: "Low",
                            LIS: "Low",
                            TechRisk: "Medium",
                            OtherSME: "Medium"
                        },
                        is_conduct_risk: true
                    }
                ]
            },
            key_drivers_for_residual_risk: [
                {
                    risk_id: "R002",
                    risk_name: "Model Bias Resulting in Unfair Treatment of Applicants",
                    highest_residual_risk_level: "Medium",
                    key_drivers_and_justification: "Comprehensive bias testing performed. Model governance framework established. Medium rating maintained to account for ongoing monitoring requirements and potential for bias emergence over time."
                }
            ],
            detailed_risk_scenarios: [
                {
                    risk_id: "R002",
                    risk_name: "Model Bias Resulting in Unfair Treatment of Applicants",
                    inherent_risk_level: "High",
                    triggers: [
                        "Training data contains historical biases",
                        "Protected characteristics indirectly influencing decisions",
                        "Model drift causing emergent bias over time",
                        "Insufficient bias testing before deployment"
                    ],
                    consequences: [
                        "Unfair treatment of customer segments",
                        "Regulatory enforcement action",
                        "Discrimination claims",
                        "Reputational damage"
                    ],
                    mitigating_actions: [
                        {
                            action_id: "M002-1",
                            description: "Complete comprehensive bias testing across protected characteristics",
                            action_owner: "Data Science",
                            target_completion_date: "2024-02-15",
                            status: "Completed"
                        },
                        {
                            action_id: "M002-2",
                            description: "Implement ongoing model monitoring for bias drift",
                            action_owner: "Model Risk",
                            target_completion_date: "2024-03-01",
                            status: "Completed"
                        },
                        {
                            action_id: "M002-3",
                            description: "Establish Model Governance Committee with quarterly bias reviews",
                            action_owner: "Chief Risk Officer",
                            target_completion_date: "2024-02-28",
                            status: "Completed"
                        }
                    ],
                    stakeholder_ratings_and_comments: [
                        {
                            stakeholder_role: "Legal",
                            residual_risk_rating: "Medium",
                            justification: "Bias controls appear robust. Regular monitoring essential."
                        },
                        {
                            stakeholder_role: "Compliance",
                            residual_risk_rating: "Medium",
                            justification: "Model governance framework meets regulatory expectations. Ongoing oversight required."
                        }
                    ]
                }
            ]
        },
        tags: {
            project_one_line_summary: "Automated underwriting engine for straight-through processing of standard risks",
            change_type_summary: "AI/ML automation of underwriting decisions",
            core_objectives: ["Enable same-day decisions", "Reduce manual processing", "Improve consistency"],
            primary_business_functions: ["Underwriting", "New Business", "Agency"],
            primary_customer_or_user_segments: ["Insurance applicants", "Agents"],
            key_risk_themes_summary: "Decision accuracy, model bias, adverse selection",
            key_control_themes_summary: "Model governance, bias testing, ongoing monitoring",
            business_domain_keywords: ["Underwriting", "Life Insurance", "Health Insurance", "New Business"],
            business_function_keywords: ["Risk Assessment", "Decision Engine", "STP", "Policy Issuance"],
            technology_or_process_keywords: ["Rules Engine", "Predictive Analytics", "ML Models", "Automation"],
            regulatory_or_compliance_keywords: ["Fair Treatment", "Algorithmic Bias", "Model Risk Management"],
            similar_case_ids: ["CASE-2024-001", "CASE-2023-018"]
        }
    }
];

// 暴露到全局
window.KNOWLEDGE_CASES = KNOWLEDGE_CASES;

/**
 * 获取所有业务单元
 */
function getBusinessUnits() {
    return [...new Set(KNOWLEDGE_CASES.map(c => c.business_unit))];
}

/**
 * 获取所有案例类型
 */
function getCaseTypes() {
    return [...new Set(KNOWLEDGE_CASES.map(c => c.case_type))];
}

/**
 * 获取风险统计
 */
function getRiskStats(cases = KNOWLEDGE_CASES) {
    const stats = { total: 0, critical: 0, high: 0, medium: 0, low: 0 };
    
    cases.forEach(c => {
        c.risk_assessment.overall_risk_assessment_summary.risk_summaries.forEach(r => {
            stats.total++;
            const level = r.inherent_risk_overall.toLowerCase();
            if (level === 'critical') stats.critical++;
            else if (level === 'high') stats.high++;
            else if (level === 'medium') stats.medium++;
            else if (level === 'low') stats.low++;
        });
    });
    
    return stats;
}

/**
 * 搜索案例
 */
function searchKnowledgeCases(query, filters = {}) {
    let results = [...KNOWLEDGE_CASES];
    
    // 文本搜索
    if (query) {
        const q = query.toLowerCase();
        results = results.filter(c => {
            const searchableText = [
                c.case_id,
                c.case_title,
                c.case_type,
                c.business_unit,
                c.tags.project_one_line_summary,
                ...c.tags.business_domain_keywords,
                ...c.tags.technology_or_process_keywords,
                ...c.tags.regulatory_or_compliance_keywords
            ].join(' ').toLowerCase();
            return searchableText.includes(q);
        });
    }
    
    // 筛选
    if (filters.business_unit) {
        results = results.filter(c => c.business_unit === filters.business_unit);
    }
    if (filters.case_type) {
        results = results.filter(c => c.case_type === filters.case_type);
    }
    if (filters.risk_level) {
        results = results.filter(c => 
            c.risk_assessment.overall_risk_assessment_summary.risk_summaries.some(
                r => r.inherent_risk_overall === filters.risk_level
            )
        );
    }
    
    return results;
}

// 在控制台输出加载信息
console.log('📚 Knowledge Base Loaded:', KNOWLEDGE_CASES.length, 'historical cases (new schema)');
