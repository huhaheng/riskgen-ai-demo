/**
 * =============================================================================
 * RISK TAXONOMY DATA - 风险分类数据
 * =============================================================================
 * Operational Risk Assessment Landscape and Categories
 * 从 docs/2. operational risk assessment landscape and categories.md 提取
 */

var RISK_TAXONOMY = [
  {
    "level1_risk_type": "Data Risk",
    "definition": "Data Risk refers to the risk of adverse impact due to the use of inaccurate or incomplete data, or the mishandling of data.",
    "risks": [
      {
        "category": "Data Life-Cycle Risk",
        "level": 2,
        "definition": "The risk of not capturing, maintaining or retaining data in line with policy and regulations. Data that is not governed throughout its lifetime of use may lack appropriate ownership / oversight potentially leading to incorrect decisions or claims by data subjects."
      },
      {
        "category": "Data Capture, Maintenance and Use",
        "level": 3,
        "definition": "The risk of inadequate capture or collection of data, and the risk that the collected data is not maintained for data usage in line with organisational standard, regulations, or prescribed data quality requirements may lead to poor decisions, operational inefficiencies, and failure to meet regulations or claims by data subjects."
      },
      {
        "category": "Data Removal and Archival",
        "level": 3,
        "definition": "The risk of inadequate retention, archival, or deletion of data that does not meet policy or regulations may lead to data being misused or failing to be available, resulting in potential breaches or claims by data subjects. Current focus for AIA is on internal unstructured data and internal communications."
      },
      {
        "category": "Data Protection Risk",
        "level": 2,
        "definition": "The risk that data is inappropriately accessed, lost, modified or unavailable."
      },
      {
        "category": "Data Confidentiality",
        "level": 3,
        "definition": "The risk that data is inappropriately accessed, viewed or lost to parties not authorized to access, hold or distribute it."
      },
      {
        "category": "Data Integrity",
        "level": 3,
        "definition": "The risk that data is subject to unauthorized modification or corruption, resulting in a loss of trust in its correctness."
      }
    ]
  },
  {
    "level1_risk_type": "Technology Risk",
    "definition": "Technology Risk refers to the risk associated with the operation of technology systems or adverse impact from breaches of or attacks on AIA's technology systems.",
    "risks": [
      {
        "category": "Cyber Security Risk",
        "level": 2,
        "definition": "The risk of adverse impact from information security breaches or attacks on AIA's networks, applications and systems."
      },
      {
        "category": "Identity & Access Management",
        "level": 3,
        "definition": "The risk of unauthorised access or failure to define and implement appropriate access controls resulting in users having excessive or insufficient access to AIA's systems or its information assets."
      },
      {
        "category": "Application Security",
        "level": 3,
        "definition": "The risk of application components not having their security appropriately planned, designed, constructed, patched, and reviewed may impact AIA's security posture."
      },
      {
        "category": "Infrastructure Security",
        "level": 3,
        "definition": "The risk of technology infrastructure components not having their security appropriately designed, implemented, configured, and reviewed may impact AIA's security posture."
      },
      {
        "category": "Cyber Security Operations",
        "level": 3,
        "definition": "The risk that AIA fails to identify, protect, detect, respond to or recover from cyber security threats and their resulting incidents appropriately."
      },
      {
        "category": "Cyber Security Supply Chain",
        "level": 3,
        "definition": "The risk of cybersecurity threats in AIA's supply chain resulting in vulnerable software, compromise of infrastructure including cloud-based platforms and insecure SDLC."
      },
      {
        "category": "Technology Operation Risk",
        "level": 2,
        "definition": "The risk of technology systems failing to meet user requirements in terms of performance, stability and reliability to perform their defined function."
      },
      {
        "category": "Quality",
        "level": 3,
        "definition": "The risk that technology and supporting staff fail to specify and meet agreed quality standards for the technical operation and management of required changes."
      },
      {
        "category": "Reliability",
        "level": 3,
        "definition": "The risk that technology is not implemented, maintained, and monitored to provide reliability in line with business availability requirements. This includes management of service disruptions, rectification, and root cause analysis."
      },
      {
        "category": "Performance",
        "level": 3,
        "definition": "The risk that technology is not provisioned and monitored to perform at the required level of performance to meet current and future business needs."
      },
      {
        "category": "System Life-Cycle Risk",
        "level": 2,
        "definition": "The risk of deficiencies in planning, implementing, operating and retiring technology systems."
      },
      {
        "category": "Information Technology Strategy",
        "level": 3,
        "definition": "The risk of the technology strategy failing to meet AIA's strategic goals regarding suitability, direction, growth, products, costs, and risk appetite."
      },
      {
        "category": "Information Technology Asset Management",
        "level": 3,
        "definition": "The risk that AIA fails to catalogue, track and maintain its hardware and software assets (including licensing terms of third party or open-source software) could impact business services, cost, operational efficiencies or license non-compliance or legal or intellectual property (IP) issues."
      },
      {
        "category": "Information Technology Architecture",
        "level": 3,
        "definition": "The risk of systems and applications not being architected and designed in a manner that meets business requirements using consistent and efficient technologies."
      },
      {
        "category": "System Development",
        "level": 3,
        "definition": "The risk of change initiatives failing to meet business objectives regarding capacity, quality, security, and budget."
      },
      {
        "category": "End-User Developed Tools and Robotic Process Automation",
        "level": 3,
        "definition": "The risk of using inappropriately designed and maintained End User Developed Tools, and Robotic Process Automation leading to adverse consequences or failing to meet AIA's risk tolerances."
      },
      {
        "category": "Emerging Technology & Innovation Risk",
        "level": 2,
        "definition": "The risk of inability to detect or respond to new technological developments adequately."
      },
      {
        "category": "Emerging Technologies Adoption",
        "level": 3,
        "definition": "The risk of adopting or failing to adopt emerging technologies which may deviate from AIA standard, or lack of appropriate standards to govern."
      },
      {
        "category": "Artificial Intelligence",
        "level": 3,
        "definition": "The risk of failure to meet ethical standards or relevant applicable regulations and laws during the adoption of artificial intelligence, including deficiencies in accountability, soundness, ethical decision making, and transparency."
      }
    ]
  },
  {
    "level1_risk_type": "Business Operations Risk",
    "definition": "Business Operations Risk refers to the risk of adverse impact due to inappropriate or inadequate business operations.",
    "risks": [
      {
        "category": "Process and Execution Risk",
        "level": 2,
        "definition": "The risk of inappropriate or inadequate processes or execution."
      },
      {
        "category": "Reporting",
        "level": 3,
        "definition": "The risk of inaccurate, untimely, or incomplete reporting and disclosures, including financial or Environmental, Social and Governance (\"ESG\") reporting and disclosures."
      },
      {
        "category": "Strategic Projects",
        "level": 3,
        "definition": "The risk of failure in delivering and executing projects as defined under the Project Approval and Governance Standard."
      },
      {
        "category": "Investment Operations",
        "level": 3,
        "definition": "The risk of inappropriate or inadequate processes or execution relating to investment operations."
      },
      {
        "category": "Insurance Operations",
        "level": 3,
        "definition": "The risk of inappropriate or inadequate processes or execution relating to insurance operations. These include New Business, Underwriting, Claims as well as Servicing Operations."
      },
      {
        "category": "Finance Operations",
        "level": 3,
        "definition": "The risk of inappropriate or inadequate processes or execution relating to finance operations other than financial reporting."
      },
      {
        "category": "Other Operations",
        "level": 3,
        "definition": "The risk of inappropriate or inadequate processes or execution relating to other operations, not covered in the other operational risk categories i.e. risks in operating mortgage, Third Party Administrator (TPA) or Shared Services operations."
      },
      {
        "category": "Operational Resilience Risk",
        "level": 2,
        "definition": "The risk of ineffective responses to disruptive events."
      },
      {
        "category": "People Availability",
        "level": 3,
        "definition": "The risk of unavailability of critical staff."
      },
      {
        "category": "System Availability",
        "level": 3,
        "definition": "The risk of unavailability of critical systems."
      },
      {
        "category": "Premises Accessibility",
        "level": 3,
        "definition": "The risk of unavailability of premises."
      },
      {
        "category": "Third Party Risk",
        "level": 2,
        "definition": "The risk of failure in governing and managing third parties."
      },
      {
        "category": "On-boarding and governance",
        "level": 3,
        "definition": "The risk of inappropriate or inadequate governance or onboarding of third parties."
      },
      {
        "category": "Management and Off-boarding",
        "level": 3,
        "definition": "The risk of inappropriate or inadequate management and off-boarding of third parties."
      },
      {
        "category": "People Risk",
        "level": 2,
        "definition": "The risk of inappropriate or inadequate employment practices and resource management."
      },
      {
        "category": "Talent Management",
        "level": 3,
        "definition": "The risk of failure in attracting, developing or retaining the right talent."
      },
      {
        "category": "Employment Practices",
        "level": 3,
        "definition": "The risk of inappropriate or inadequate HR processes."
      },
      {
        "category": "Health and Safety",
        "level": 3,
        "definition": "The risk of inadequate health and safety processes for staff."
      },
      {
        "category": "Intellectual Property Risk",
        "level": 2,
        "definition": "The risk of failure to protect or enforce our intellectual property rights, the risk of infringing upon the intellectual property rights of others, as well as the risk of losing the right to utilize the intellectual property of others."
      },
      {
        "category": "Clinical Risk",
        "level": 2,
        "definition": "The risk of poor or inadequate clinical practices negatively impacting clinical care, patient safety and clinical outcomes."
      },
      {
        "category": "Health Services",
        "level": 3,
        "definition": "The risk of providing inappropriate or incorrect health services, leading to adverse health outcomes."
      },
      {
        "category": "Clinical Equipment",
        "level": 3,
        "definition": "The risk of inadequate clinical equipment to undertake clinical procedures."
      },
      {
        "category": "Clinical Facilities",
        "level": 3,
        "definition": "The risk of inadequate or unsafe clinical facilities to deliver clinical care."
      },
      {
        "category": "Clinical Processes",
        "level": 3,
        "definition": "The risk of inadequate or inappropriate clinical procedures impacting clinical outcomes."
      },
      {
        "category": "Model Risk",
        "level": 2,
        "definition": "The risk of improper design, development or use of a Finance or Actuarial Model."
      }
    ]
  },
  {
    "level1_risk_type": "Conduct Risk",
    "definition": "Conduct Risk refers to the risk of inappropriate organisational practices or behaviour of staff/intermediaries which may result in poor outcome for customers, reputational damage or financial loss to AIA.",
    "risks": [
      {
        "category": "Sales Conduct Risk",
        "level": 2,
        "definition": "The risk of the products' marketing, advice and sales/distribution practices being unlawful, non-qualified, unethical, not fit for purpose or not suitable to meet the needs and reasonable expectations of customers."
      },
      {
        "category": "Agency Sales Conduct",
        "level": 3,
        "definition": "The risk of the products' marketing, advice and sales/distribution practices of agents and/or agency leads being unlawful, non-qualified, unethical, not fit for purpose or not suitable to meet the needs and reasonable expectations of customers."
      },
      {
        "category": "Partnership Channel Sales Conduct",
        "level": 3,
        "definition": "The risk of the products' marketing, advice and sales/distribution practices of Partnership channels being unlawful, non-qualified, unethical, not fit for purpose or not suitable to meet the needs and reasonable expectations of customers."
      },
      {
        "category": "Other Distribution Sales Conduct",
        "level": 3,
        "definition": "The risk of the products' marketing, advice and sales/distribution practices of other distribution channels (including direct marketing, telemarketing, etc.) being unlawful, non-qualified, unethical, not fit for purpose or not suitable to meet the needs and reasonable expectations of customers."
      },
      {
        "category": "Meeting Customer Commitment Risk",
        "level": 2,
        "definition": "The risk of unfair treatment, or poor outcome (financial or non-financial) for customers arising from the practices of the Group."
      },
      {
        "category": "Product & Proposition Design",
        "level": 3,
        "definition": "The risk of product or proposition design (new products / proposition or change to an existing product) not considering the interests of customers (including needs of customers, targeted segment, value for money, and fair treatment of customers); risk benefit profile of products, appropriateness of distribution channel and potential impacts of vulnerable customers (including risk of poor design of needs-analysis tools, suitability, risk profiling, and affordability rules.)"
      },
      {
        "category": "Product & Proposition Materials",
        "level": 3,
        "definition": "The risk of product or proposition materials (including sales illustrations or related marketing materials) not providing appropriate (sufficient, accurate, not misleading) information to enable understanding of the characteristics of product / proposition and making an informed decision prior to purchase of the product / proposition."
      },
      {
        "category": "Post Sales Services",
        "level": 3,
        "definition": "The risk of poor customer outcome arising from inadequate post sales services in complaint handling and remediation, claims handling and client administration, transparency, timeliness and accuracy of customer communication arrangements as well as service level agreement (SLA) management to customers. This includes the risk of not providing appropriate and timely information (including changed circumstances or benefits) to allow customers to make informed decisions throughout the lifetime of their contracts."
      },
      {
        "category": "Post Sales Product & Proposition Performance",
        "level": 3,
        "definition": "The risk of actual product or proposition performance being unable to meet the needs or expectations of the target customer segment or provide benefit as originally designed arising from poor business practice. This includes but not limited to (a) not crediting interest rate according to the product or proposition design or crediting interest rate philosophy; (b) products or propositions not providing the intended value, e.g. high rates of denied claims."
      },
      {
        "category": "Employee Conduct Risk",
        "level": 2,
        "definition": "The risk of employees acting in a manner which contravenes employment practice guidelines/company codes or is not in alignment with organizational culture/ objectives or involves conflicts of interest."
      },
      {
        "category": "Fraud Risk",
        "level": 2,
        "definition": "The risk of fraudulent activities committed by internal and/or external parties, involving deceit or the misuse of AIA's assets or systems by the person(s) or corporate(s) involved, to obtain financial or personal gain for themselves or another person or entity or causing a loss (including monetary loss, reputational loss or regulatory sanctions) to AIA or others."
      },
      {
        "category": "Agency Fraud",
        "level": 3,
        "definition": "The risk of fraudulent activities committed by agents alone or in collusion with other parties."
      },
      {
        "category": "Partnership Channel Fraud",
        "level": 3,
        "definition": "The risk of fraudulent activities committed by Partnership Channel (including Partnership Distribution) partners alone or in collusion with other parties."
      },
      {
        "category": "Other Distribution Fraud",
        "level": 3,
        "definition": "The risk of fraudulent activities committed by other distributors (including direct marketing, telemarketing, etc.) alone or in collusion with other parties."
      },
      {
        "category": "External Fraud",
        "level": 3,
        "definition": "The risk of fraudulent activities committed by external parties."
      },
      {
        "category": "Customer Fraud",
        "level": 3,
        "definition": "The risk of fraudulent activities committed by clients/customers (both individuals and corporates)."
      },
      {
        "category": "Employee Fraud",
        "level": 3,
        "definition": "The risk of fraudulent activities committed by employees alone or in collusion with other parties."
      },
      {
        "category": "Market Integrity",
        "level": 2,
        "definition": "The risk of market misconduct, insider trading, false trading, price rigging, stock market manipulation, failure to meet continuous disclosure obligations which are specific to investment related activities."
      }
    ]
  },
  {
    "level1_risk_type": "Financial Crime Risk",
    "definition": "Financial Crime Risk refers to the risk of financial crime committed by internal and/or external parties.",
    "risks": [
      {
        "category": "Money Laundering and Terrorist Financing Risk",
        "level": 2,
        "definition": "The risk of failure to effectively counter money laundering and terrorist financing as well as failure to comply with obligations under laws and regulations relating to Anti-Money Laundering (\"AML\"), Counter-Terrorist Financing (\"CTF\") and Economic Sanctions."
      },
      {
        "category": "Bribery and Corruption Risk",
        "level": 2,
        "definition": "The risk of providing or offering anything of value by employees and other persons representing AIA with corrupt intent or in violation of relevant anti-corruption laws in the course of doing business."
      }
    ]
  },
  {
    "level1_risk_type": "Legal and Regulatory Risk",
    "definition": "Legal and Regulatory Risk refer to the risk of financial or reputational loss due to the failure to comply with statutory and regulatory and corporate legal requirements, guidelines and expectations.",
    "risks": [
      {
        "category": "Legal Risk",
        "level": 2,
        "definition": "The risk of financial or reputational loss due to the failure to comply with statutory and corporate legal requirements."
      },
      {
        "category": "Contractual Obligations",
        "level": 3,
        "definition": "The risk of financial or reputational loss due to the failure to incorporate appropriate terms into contracts that protect the interests of AIA or the failure to comply with contractual obligations."
      },
      {
        "category": "Litigation and Disputes",
        "level": 3,
        "definition": "The risk of financial or reputational loss due to adverse court/tribunal determination."
      },
      {
        "category": "Compliance with Non-Industry Laws and Regulations",
        "level": 3,
        "definition": "The risk of financial or reputational loss due to the failure to comply with non-industry laws and regulations. The risk may result from insufficient control system, lack of due diligence or human error."
      },
      {
        "category": "Corporate Governance Risk",
        "level": 3,
        "definition": "The risk arising from failure to oversee management's risk management and control activities by boards, board committees and executive management governance protocols. This includes risk from failure to supervise business activities which may compromise the Group / legal entity's soundness."
      },
      {
        "category": "Regulatory Risk",
        "level": 2,
        "definition": "The risk of financial or reputational loss due to the failure to comply with regulatory requirements, guidelines and expectations."
      },
      {
        "category": "Compliance with Industry Laws and Regulations",
        "level": 3,
        "definition": "The risk of AIA's business activities not complying with industry-specific laws and regulatory requirements (e.g., Insurance, Investment, Anti-Money Laundering, Sanctions, Data related). The risk includes both statutory as well as non-statutory requirements, such as meeting regulatory expectations and guidelines. The risk may result from insufficient control system, lack of due diligence or human error."
      },
      {
        "category": "Regulatory Change Risk",
        "level": 3,
        "definition": "The risk of not addressing regulatory changes adequately leading to delay or inappropriate implementation of the regulatory requirements."
      },
      {
        "category": "Regulatory Engagements",
        "level": 3,
        "definition": "The risk of not engaging with a regulator appropriately which may damage AIA's credibility with regulators or lead to censure and greater scrutiny. Regulatory engagements include AIA's conduct in managing its regulatory relationships professionally, and communicating in an informed, transparent, consistent and coordinated manner."
      },
      {
        "category": "Compliance with Professional Standards",
        "level": 3,
        "definition": "The risk of non-compliance with or not addressing changes in professional requirements adequately leading to delay or inappropriate implementation of the industry requirements set by recognised industry associations or applicable regulators, or validity of licensing status, fines or qualification for a role regarding licensed or regulated individuals."
      }
    ]
  },
  {
    "level1_risk_type": "Reputational Risk",
    "definition": "Reputational Risk refers to the risk of lack of preparedness against adverse events that may impact confidence of our stakeholders, including customers, employees and agents, governments and regulators, investors and communities, leading to significant damage to AIA's name and standing.",
    "risks": []
  },
  {
    "level1_risk_type": "Emerging Risk",
    "definition": "Emerging Risk refers to the risk of new trends or evolving risks in the business environment, the impact of which may not yet be felt by the organisation, but may crystalise beyond the short-term horizon.",
    "risks": []
  },
  {
    "level1_risk_type": "Policy Risk",
    "definition": "Policy Risk refers to the risk of uncertainties created by political positions (including policies), actors, and conditions.",
    "risks": []
  },
  {
    "level1_risk_type": "Climate Risk",
    "definition": "Climate Risk refers to the risk posed by the exposure to physical, transition or liability risks caused by or related to climate change.",
    "risks": []
  },
  {
    "level1_risk_type": "AI Governance Risk",
    "definition": "AI Governance Risk refers to risks associated with the adoption and use of artificial intelligence, including model risk, bias, explainability, and ethical considerations.",
    "risks": [
      {
        "category": "Model Risk",
        "level": 2,
        "definition": "The risk of improper design, development or use of AI/ML models."
      },
      {
        "category": "Model Accuracy & Output Quality",
        "level": 3,
        "definition": "The risk of AI models generating inaccurate or unreliable outputs."
      },
      {
        "category": "Model Bias",
        "level": 3,
        "definition": "The risk of AI models exhibiting bias resulting in unfair treatment."
      },
      {
        "category": "Model Explainability",
        "level": 3,
        "definition": "The risk of AI model decisions lacking transparency and explainability."
      },
      {
        "category": "AI Ethics",
        "level": 2,
        "definition": "The risk of AI deployment not meeting ethical standards and responsible AI principles."
      },
      {
        "category": "Responsible AI Use",
        "level": 3,
        "definition": "The risk of inappropriate or unethical use of AI systems."
      }
    ]
  }
];

// 暴露到全局
window.RISK_TAXONOMY = RISK_TAXONOMY;

console.log('📊 Risk Taxonomy Loaded:', RISK_TAXONOMY.length, 'Level 1 risk types');

