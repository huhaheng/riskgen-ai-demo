/**
 * =============================================================================
 * KNOWLEDGE BASE - 历史案例知识库 (Redesigned)
 * =============================================================================
 * 管理历史风险评估案例的展示、搜索和筛选
 * Master-Detail 布局，支持新的 JSON Schema
 */

// DOM 元素引用
let kbCaseList;
let kbSearchInput;
let filterBusinessUnit;
let filterCaseType;
let filterRiskLevel;
let kbDetailPanel;
let kbDetailContent;
let initialized = false;
let selectedCaseId = null;

/**
 * 初始化 Knowledge Base
 */
export function initKnowledgeBase() {
    console.log('📚 Initializing Knowledge Base (Redesigned)...');

    // 获取 DOM 元素
    kbCaseList = document.getElementById('kb-case-list');
    kbSearchInput = document.getElementById('kb-search');
    filterBusinessUnit = document.getElementById('filter-business-unit');
    filterCaseType = document.getElementById('filter-case-type');
    filterRiskLevel = document.getElementById('filter-risk-level');
    kbDetailPanel = document.getElementById('kb-detail-panel');
    kbDetailContent = document.getElementById('kb-detail-content');

    // 绑定事件（只绑定一次）
    if (!initialized) {
        bindEvents();
        initTaxonomyView();
        initialized = true;
    }

    // 延迟渲染，确保数据已加载
    setTimeout(() => {
        if (window.KNOWLEDGE_CASES) {
            console.log('📚 Knowledge Cases Found:', window.KNOWLEDGE_CASES.length);
            renderFilters();
            renderStats();
            renderCaseList();
        } else {
            console.warn('⚠️ KNOWLEDGE_CASES not loaded yet');
        }
        
        if (window.RISK_TAXONOMY) {
            console.log('📊 Risk Taxonomy Found:', window.RISK_TAXONOMY.length, 'Level 1 types');
            initTaxonomySelectors();
        }
    }, 100);
}

/**
 * 强制刷新 Knowledge Base（供外部调用）
 */
function refreshKnowledgeBase() {
    console.log('🔄 Refreshing Knowledge Base...');
    if (window.KNOWLEDGE_CASES) {
        renderFilters();
        renderStats();
        renderCaseList();
    }
}

// 暴露刷新函数到全局
window.initKnowledgeBaseNow = refreshKnowledgeBase;

/**
 * 绑定事件监听器
 */
function bindEvents() {
    // 搜索和筛选
    if (kbSearchInput) kbSearchInput.oninput = handleSearch;
    if (filterBusinessUnit) filterBusinessUnit.onchange = handleSearch;
    if (filterCaseType) filterCaseType.onchange = handleSearch;
    if (filterRiskLevel) filterRiskLevel.onchange = handleSearch;

    // Tab 切换
    document.addEventListener('click', (e) => {
        if (e.target.closest('.kb-tab-btn')) {
            const btn = e.target.closest('.kb-tab-btn');
            const tabId = btn.dataset.tab;
            switchDetailTab(tabId);
        }
    });

    // 上传按钮
    const btnUpload = document.getElementById('btn-upload-case');
    if (btnUpload) {
        btnUpload.onclick = () => {
            const modalUpload = document.getElementById('modal-upload-case');
            if (modalUpload) modalUpload.classList.remove('hidden');
        };
    }
}

/**
 * 初始化风险分类视图
 */
function initTaxonomyView() {
    // 视图切换按钮
    const viewBtns = document.querySelectorAll('.kb-view-btn');
    viewBtns.forEach(btn => {
        btn.onclick = () => {
            const view = btn.dataset.view;
            switchKnowledgeBaseView(view);
        };
    });
    
    // 风险分类搜索按钮
    const btnSearchTaxonomy = document.getElementById('btn-search-taxonomy');
    if (btnSearchTaxonomy) {
        btnSearchTaxonomy.onclick = handleTaxonomySearch;
    }
    
    // Level1 选择器变化时更新 Level2/3
    const taxonomyLevel1 = document.getElementById('taxonomy-level1');
    if (taxonomyLevel1) {
        taxonomyLevel1.onchange = handleTaxonomyLevel1Change;
    }
}

/**
 * 切换 Knowledge Base 视图
 */
function switchKnowledgeBaseView(view) {
    // 更新按钮状态
    document.querySelectorAll('.kb-view-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    // 更新内容区域
    document.querySelectorAll('.kb-view-content').forEach(content => {
        content.classList.toggle('active', content.id === `kb-view-content-${view}`);
    });
}

/**
 * 初始化风险分类选择器
 */
function initTaxonomySelectors() {
    if (!window.RISK_TAXONOMY) return;
    
    const level1Select = document.getElementById('taxonomy-level1');
    if (!level1Select) return;
    
    // 填充 Level1 选项
    level1Select.innerHTML = '<option value="">Select Level 1 Risk Type</option>' +
        window.RISK_TAXONOMY.map(rt => 
            `<option value="${rt.level1_risk_type}">${rt.level1_risk_type}</option>`
        ).join('');
}

/**
 * 处理 Level1 选择器变化
 */
function handleTaxonomyLevel1Change() {
    const level1Select = document.getElementById('taxonomy-level1');
    const level2_3Select = document.getElementById('taxonomy-level2-3');
    const level1Desc = document.getElementById('taxonomy-level1-desc');
    const level2_3Desc = document.getElementById('taxonomy-level2-3-desc');
    
    if (!level1Select || !level2_3Select) return;
    
    const selectedLevel1 = level1Select.value;
    
    // 更新 Level1 描述
    if (level1Desc && selectedLevel1) {
        const level1Data = window.RISK_TAXONOMY.find(rt => rt.level1_risk_type === selectedLevel1);
        if (level1Data) {
            level1Desc.textContent = level1Data.definition;
        } else {
            level1Desc.textContent = '';
        }
    }
    
    // 清空并更新 Level2/3 选项
    level2_3Select.innerHTML = '<option value="">Select Level 2/3 Category</option>';
    level2_3Desc.textContent = '';
    
    if (selectedLevel1) {
        const level1Data = window.RISK_TAXONOMY.find(rt => rt.level1_risk_type === selectedLevel1);
        if (level1Data && level1Data.risks) {
            // 构建 Level2/3 选项
            const options = [];
            let currentLevel2 = null;
            
            level1Data.risks.forEach(risk => {
                if (risk.level === 2) {
                    currentLevel2 = risk.category;
                    options.push(`<option value="${risk.category}" data-level="2">${risk.category} (L2)</option>`);
                } else if (risk.level === 3 && currentLevel2) {
                    // Level 3 选项，显示为 "Level2 / Level3"
                    const combinedLabel = `${currentLevel2} / ${risk.category}`;
                    options.push(`<option value="${combinedLabel}" data-level="3" data-level2="${currentLevel2}" data-level3="${risk.category}">${combinedLabel} (L3)</option>`);
                }
            });
            
            level2_3Select.innerHTML = '<option value="">Select Level 2/3 Category</option>' + options.join('');
        }
    }
}

/**
 * 处理风险分类搜索
 */
function handleTaxonomySearch() {
    const level1Select = document.getElementById('taxonomy-level1');
    const level2_3Select = document.getElementById('taxonomy-level2-3');
    const resultsContainer = document.getElementById('kb-taxonomy-case-results');
    const resultsCount = document.getElementById('taxonomy-search-results-count');
    const level2_3Desc = document.getElementById('taxonomy-level2-3-desc');
    
    if (!level1Select || !level2_3Select || !resultsContainer) return;
    
    const selectedLevel1 = level1Select.value;
    const selectedLevel2_3 = level2_3Select.value;
    
    if (!selectedLevel1) {
        resultsContainer.innerHTML = `
            <div class="kb-taxonomy-empty">
                <i class="fa-solid fa-exclamation-circle"></i>
                <h3>Please Select Level 1 Risk Type</h3>
                <p>Choose a Level 1 Risk Type to search for matching cases</p>
            </div>
        `;
        if (resultsCount) resultsCount.innerHTML = '';
        return;
    }
    
    // 更新 Level2/3 描述
    if (level2_3Desc && selectedLevel2_3) {
        const level1Data = window.RISK_TAXONOMY.find(rt => rt.level1_risk_type === selectedLevel1);
        if (level1Data && level1Data.risks) {
            const selectedOption = level2_3Select.options[level2_3Select.selectedIndex];
            const level3 = selectedOption.dataset.level3;
            const level2 = selectedOption.dataset.level2 || selectedLevel2_3;
            
            // 查找对应的定义
            const riskData = level1Data.risks.find(r => 
                (r.level === 3 && r.category === level3) || 
                (r.level === 2 && r.category === level2)
            );
            if (riskData) {
                level2_3Desc.textContent = riskData.definition;
            }
        }
    }
    
    // 搜索匹配的案例
    const matchingCases = searchCasesByTaxonomy(selectedLevel1, selectedLevel2_3);
    
    // 更新结果计数
    if (resultsCount) {
        resultsCount.innerHTML = `
            <div class="kb-taxonomy-stats-content">
                <i class="fa-solid fa-check-circle"></i>
                <span><strong>${matchingCases.length}</strong> case(s) found</span>
            </div>
        `;
    }
    
    // 渲染结果
    renderTaxonomyResults(matchingCases, selectedLevel1, selectedLevel2_3);
}

/**
 * 根据风险分类搜索案例
 */
function searchCasesByTaxonomy(level1Type, level2_3Category) {
    if (!window.KNOWLEDGE_CASES) return [];
    
    const matchingCases = [];
    
    window.KNOWLEDGE_CASES.forEach(c => {
        // 检查案例中的所有风险
        const risks = c.risk_assessment.overall_risk_assessment_summary.risk_summaries;
        const matches = risks.filter(r => {
            const riskLevel1 = r.risk_taxonomy.level1_risk_type;
            const riskLevel2_3 = r.risk_taxonomy.level2_3_risk_category;
            
            // 匹配 Level1
            if (riskLevel1 !== level1Type) return false;
            
            // 如果没有选择 Level2/3，只匹配 Level1
            if (!level2_3Category) return true;
            
            // 匹配 Level2/3（支持模糊匹配）
            // 因为数据中可能是 "Level2 / Level3" 格式
            return riskLevel2_3.toLowerCase().includes(level2_3Category.toLowerCase()) ||
                   level2_3Category.toLowerCase().includes(riskLevel2_3.toLowerCase()) ||
                   riskLevel2_3.toLowerCase() === level2_3Category.toLowerCase();
        });
        
        if (matches.length > 0) {
            matchingCases.push({
                case: c,
                matchingRisks: matches
            });
        }
    });
    
    return matchingCases;
}

/**
 * 渲染风险分类搜索结果
 */
function renderTaxonomyResults(matchingCases, level1Type, level2_3Category) {
    const resultsContainer = document.getElementById('kb-taxonomy-case-results');
    if (!resultsContainer) return;
    
    if (matchingCases.length === 0) {
        resultsContainer.innerHTML = `
            <div class="kb-taxonomy-empty">
                <i class="fa-solid fa-search"></i>
                <h3>No Matching Cases</h3>
                <p>No cases found with the selected risk category</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = matchingCases.map(({ case: c, matchingRisks }) => `
        <div class="kb-taxonomy-case-card" onclick="window.selectCase('${c.case_id}'); switchKnowledgeBaseView('cases');">
            <div class="kb-taxonomy-case-header">
                <div class="kb-taxonomy-case-id">${c.case_id}</div>
                <div class="kb-taxonomy-case-meta">
                    <span class="kb-taxonomy-case-type">${c.case_type}</span>
                    <span class="kb-taxonomy-case-unit">${c.business_unit}</span>
                </div>
            </div>
            <h3 class="kb-taxonomy-case-title">${c.case_title}</h3>
            <div class="kb-taxonomy-case-summary">
                <h4><i class="fa-solid fa-file-lines"></i> Project Summary</h4>
                <p>${c.tags.project_one_line_summary}</p>
            </div>
            <div class="kb-taxonomy-case-objectives">
                <h4><i class="fa-solid fa-bullseye"></i> Core Objectives</h4>
                <ul>
                    ${c.tags.core_objectives.map(obj => `<li>${obj}</li>`).join('')}
                </ul>
            </div>
            <div class="kb-taxonomy-case-risks">
                <h4><i class="fa-solid fa-shield-halved"></i> Matching Risks (${matchingRisks.length})</h4>
                <div class="kb-taxonomy-risk-tags">
                    ${matchingRisks.map(r => `
                        <span class="kb-taxonomy-risk-tag ${r.inherent_risk_overall.toLowerCase()}">
                            ${r.risk_id}: ${r.risk_name.substring(0, 60)}${r.risk_name.length > 60 ? '...' : ''}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div class="kb-taxonomy-case-footer">
                <button class="btn text-btn btn-sm" onclick="event.stopPropagation(); window.selectCase('${c.case_id}'); switchKnowledgeBaseView('cases');">
                    <i class="fa-solid fa-arrow-right"></i> View Details
                </button>
            </div>
        </div>
    `).join('');
}

// 暴露函数到全局
window.switchKnowledgeBaseView = switchKnowledgeBaseView;

/**
 * 渲染筛选器选项
 */
function renderFilters() {
    if (!window.KNOWLEDGE_CASES) return;

    const businessUnits = [...new Set(window.KNOWLEDGE_CASES.map(c => c.business_unit))];
    const caseTypes = [...new Set(window.KNOWLEDGE_CASES.map(c => c.case_type))];

    if (filterBusinessUnit) {
        const current = filterBusinessUnit.value;
        filterBusinessUnit.innerHTML = '<option value="">All Business Units</option>' +
            businessUnits.map(u => `<option value="${u}">${u}</option>`).join('');
        filterBusinessUnit.value = current;
    }

    if (filterCaseType) {
        const current = filterCaseType.value;
        filterCaseType.innerHTML = '<option value="">All Case Types</option>' +
            caseTypes.map(t => `<option value="${t}">${t}</option>`).join('');
        filterCaseType.value = current;
    }
}

/**
 * 渲染统计数据
 */
function renderStats() {
    if (!window.KNOWLEDGE_CASES) return;

    const stats = { total: 0, critical: 0, high: 0, medium: 0, low: 0 };
    
    window.KNOWLEDGE_CASES.forEach(c => {
        c.risk_assessment.overall_risk_assessment_summary.risk_summaries.forEach(r => {
            stats.total++;
            const level = r.inherent_risk_overall.toLowerCase();
            if (level === 'critical') stats.critical++;
            else if (level === 'high') stats.high++;
            else if (level === 'medium') stats.medium++;
            else if (level === 'low') stats.low++;
        });
    });

    const elTotal = document.getElementById('stat-total-cases');
    const elCritical = document.getElementById('stat-critical-risks');
    const elHigh = document.getElementById('stat-high-risks');
    const elMedium = document.getElementById('stat-medium-risks');

    if (elTotal) elTotal.textContent = window.KNOWLEDGE_CASES.length;
    if (elCritical) elCritical.textContent = stats.critical;
    if (elHigh) elHigh.textContent = stats.high;
    if (elMedium) elMedium.textContent = stats.medium;
}

/**
 * 处理搜索和筛选
 */
function handleSearch() {
    const query = kbSearchInput ? kbSearchInput.value : '';
    const filters = {
        business_unit: filterBusinessUnit ? filterBusinessUnit.value : '',
        case_type: filterCaseType ? filterCaseType.value : '',
        risk_level: filterRiskLevel ? filterRiskLevel.value : ''
    };

    const results = searchCases(query, filters);
    renderCaseList(results);
}

/**
 * 搜索案例
 */
function searchCases(query, filters = {}) {
    if (!window.KNOWLEDGE_CASES) return [];
    
    let results = [...window.KNOWLEDGE_CASES];

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
                ...(c.tags.business_domain_keywords || []),
                ...(c.tags.technology_or_process_keywords || []),
                ...(c.tags.regulatory_or_compliance_keywords || [])
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

/**
 * 获取案例的风险级别统计
 */
function getCaseRiskStats(c) {
    const stats = { critical: 0, high: 0, medium: 0, low: 0 };
    c.risk_assessment.overall_risk_assessment_summary.risk_summaries.forEach(r => {
        const level = r.inherent_risk_overall.toLowerCase();
        if (stats[level] !== undefined) stats[level]++;
    });
    return stats;
}

/**
 * 获取案例的最高风险级别
 */
function getHighestRiskLevel(c) {
    const stats = getCaseRiskStats(c);
    if (stats.critical > 0) return 'critical';
    if (stats.high > 0) return 'high';
    if (stats.medium > 0) return 'medium';
    if (stats.low > 0) return 'low';
    return 'none';
}

/**
 * 渲染案例列表
 */
function renderCaseList(cases = window.KNOWLEDGE_CASES) {
    if (!kbCaseList || !cases) return;

    if (cases.length === 0) {
        kbCaseList.innerHTML = `
            <div class="kb-empty-list">
                <i class="fa-solid fa-search"></i>
                <p>No matching cases found</p>
            </div>
        `;
        return;
    }

    kbCaseList.innerHTML = cases.map(c => {
        const riskStats = getCaseRiskStats(c);
        const highestRisk = getHighestRiskLevel(c);
        const totalRisks = riskStats.critical + riskStats.high + riskStats.medium + riskStats.low;
        const isSelected = selectedCaseId === c.case_id;
        
        return `
            <div class="kb-case-item ${isSelected ? 'selected' : ''}" 
                 data-case-id="${c.case_id}"
                 onclick="window.selectCase('${c.case_id}')">
                <div class="kb-case-item-header">
                    <span class="kb-case-id-badge">${c.case_id}</span>
                    <span class="kb-risk-indicator ${highestRisk}" title="${highestRisk.toUpperCase()} Risk"></span>
                </div>
                <h4 class="kb-case-item-title">${c.case_title}</h4>
                <div class="kb-case-item-meta">
                    <span class="kb-case-type">${c.case_type}</span>
                    <span class="kb-case-unit">${c.business_unit}</span>
                </div>
                <div class="kb-case-item-footer">
                    <div class="kb-mini-stats">
                        ${riskStats.critical > 0 ? `<span class="mini-stat critical">${riskStats.critical}C</span>` : ''}
                        ${riskStats.high > 0 ? `<span class="mini-stat high">${riskStats.high}H</span>` : ''}
                        ${riskStats.medium > 0 ? `<span class="mini-stat medium">${riskStats.medium}M</span>` : ''}
                        ${riskStats.low > 0 ? `<span class="mini-stat low">${riskStats.low}L</span>` : ''}
                    </div>
                    <span class="kb-risk-count">${totalRisks} risks</span>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * 选择案例
 */
window.selectCase = function(caseId) {
    if (!window.KNOWLEDGE_CASES) return;
    
    const c = window.KNOWLEDGE_CASES.find(x => x.case_id === caseId);
    if (!c) return;

    selectedCaseId = caseId;
    
    // 更新列表选中状态
    document.querySelectorAll('.kb-case-item').forEach(el => {
        el.classList.toggle('selected', el.dataset.caseId === caseId);
    });

    // 显示详情面板
    const emptyState = document.querySelector('.kb-detail-empty');
    if (emptyState) emptyState.classList.add('hidden');
    if (kbDetailContent) kbDetailContent.classList.remove('hidden');

    // 渲染详情
    renderCaseDetail(c);
    
    // 默认显示 Overview tab
    switchDetailTab('overview');
};

/**
 * 切换详情面板 Tab
 */
function switchDetailTab(tabId) {
    // 更新 tab 按钮状态
    document.querySelectorAll('.kb-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    
    // 更新 tab 内容
    document.querySelectorAll('.kb-tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `tab-${tabId}`);
    });
}

/**
 * 渲染案例详情
 */
function renderCaseDetail(c) {
    // Header
    document.getElementById('detail-case-id').textContent = c.case_id;
    document.getElementById('detail-case-title').textContent = c.case_title;
    document.getElementById('detail-case-type').innerHTML = `<i class="fa-solid fa-tag"></i> ${c.case_type}`;
    document.getElementById('detail-business-unit').innerHTML = `<i class="fa-solid fa-building"></i> ${c.business_unit}`;

    // Overview Tab
    renderOverviewTab(c);
    
    // Project Profile Tab
    renderProfileTab(c);
    
    // Risk Assessment Tab
    renderRiskTab(c);
    
    // Tags Tab
    renderTagsTab(c);
}

/**
 * 渲染 Overview Tab
 */
function renderOverviewTab(c) {
    // Summary
    document.getElementById('detail-summary').textContent = c.tags.project_one_line_summary;
    
    // Objectives
    const objectivesList = document.getElementById('detail-objectives');
    if (objectivesList) {
        objectivesList.innerHTML = c.tags.core_objectives
            .map(obj => `<li>${obj}</li>`)
            .join('');
    }
    
    // Risk Matrix
    const riskMatrix = document.getElementById('detail-risk-matrix');
    if (riskMatrix) {
        const stats = getCaseRiskStats(c);
        const total = stats.critical + stats.high + stats.medium + stats.low;
        
        riskMatrix.innerHTML = `
            <div class="kb-risk-bar-row">
                <span class="risk-bar-label">Critical</span>
                <div class="risk-bar-track">
                    <div class="risk-bar-fill critical" style="width: ${total ? (stats.critical / total * 100) : 0}%"></div>
                </div>
                <span class="risk-bar-value">${stats.critical}</span>
            </div>
            <div class="kb-risk-bar-row">
                <span class="risk-bar-label">High</span>
                <div class="risk-bar-track">
                    <div class="risk-bar-fill high" style="width: ${total ? (stats.high / total * 100) : 0}%"></div>
                </div>
                <span class="risk-bar-value">${stats.high}</span>
            </div>
            <div class="kb-risk-bar-row">
                <span class="risk-bar-label">Medium</span>
                <div class="risk-bar-track">
                    <div class="risk-bar-fill medium" style="width: ${total ? (stats.medium / total * 100) : 0}%"></div>
                </div>
                <span class="risk-bar-value">${stats.medium}</span>
            </div>
            <div class="kb-risk-bar-row">
                <span class="risk-bar-label">Low</span>
                <div class="risk-bar-track">
                    <div class="risk-bar-fill low" style="width: ${total ? (stats.low / total * 100) : 0}%"></div>
                </div>
                <span class="risk-bar-value">${stats.low}</span>
            </div>
        `;
    }
    
    // Keywords
    const keywordsBusiness = document.getElementById('detail-keywords-business');
    const keywordsTech = document.getElementById('detail-keywords-tech');
    const keywordsRegulatory = document.getElementById('detail-keywords-regulatory');
    
    if (keywordsBusiness) {
        keywordsBusiness.innerHTML = c.tags.business_domain_keywords
            .map(k => `<span class="kb-keyword">${k}</span>`)
            .join('');
    }
    if (keywordsTech) {
        keywordsTech.innerHTML = c.tags.technology_or_process_keywords
            .map(k => `<span class="kb-keyword">${k}</span>`)
            .join('');
    }
    if (keywordsRegulatory) {
        keywordsRegulatory.innerHTML = c.tags.regulatory_or_compliance_keywords
            .map(k => `<span class="kb-keyword">${k}</span>`)
            .join('');
    }
}

/**
 * 渲染 Project Profile Tab
 */
function renderProfileTab(c) {
    const bp = c.project_profile.background_and_purpose;
    const flow = c.project_profile.operational_flow;
    
    // Background & Purpose
    const bgContainer = document.getElementById('detail-background');
    if (bgContainer) {
        bgContainer.innerHTML = `
            <div class="kb-info-item">
                <label>Proposed Changes</label>
                <p>${bp.proposed_changes}</p>
            </div>
            <div class="kb-info-item">
                <label>Reasons for Changes</label>
                <p>${bp.reasons_for_changes}</p>
            </div>
            <div class="kb-info-item">
                <label>Expected Benefits</label>
                <p>${bp.expected_benefits}</p>
            </div>
            <div class="kb-info-item">
                <label>Market/Industry Practice</label>
                <p>${bp.market_or_industry_practice}</p>
            </div>
            <div class="kb-info-item">
                <label>Cost & Benefit Analysis</label>
                <p>${bp.cost_and_benefit_analysis}</p>
            </div>
            ${bp.additional_notes ? `
            <div class="kb-info-item">
                <label>Additional Notes</label>
                <p>${bp.additional_notes}</p>
            </div>
            ` : ''}
        `;
    }
    
    // Operational Flow
    document.getElementById('detail-existing-flow-desc').textContent = flow.existing_operational_flow_description;
    document.getElementById('detail-new-flow-desc').textContent = flow.new_operational_flow_description;
    document.getElementById('detail-flow-impact').textContent = flow.process_impact_summary;
    
    const existingSteps = document.getElementById('detail-existing-flow-steps');
    const newSteps = document.getElementById('detail-new-flow-steps');
    
    if (existingSteps) {
        existingSteps.innerHTML = flow.existing_operational_flow_steps
            .map(step => `<li>${step}</li>`)
            .join('');
    }
    if (newSteps) {
        newSteps.innerHTML = flow.new_operational_flow_steps
            .map(step => `<li>${step}</li>`)
            .join('');
    }
}

/**
 * 渲染 Risk Assessment Tab
 */
function renderRiskTab(c) {
    const ra = c.risk_assessment;
    
    // Risk Summary Table
    const tableBody = document.querySelector('#detail-risk-table tbody');
    if (tableBody) {
        tableBody.innerHTML = ra.overall_risk_assessment_summary.risk_summaries.map(r => `
            <tr>
                <td><span class="kb-risk-id">${r.risk_id}</span></td>
                <td>${r.risk_name}</td>
                <td>${r.risk_owner}</td>
                <td><span class="kb-risk-badge ${r.inherent_risk_overall.toLowerCase()}">${r.inherent_risk_overall}</span></td>
                <td>
                    <span class="kb-taxonomy-badge">${r.risk_taxonomy.level1_risk_type}</span>
                    <span class="kb-taxonomy-sub">${r.risk_taxonomy.level2_3_risk_category}</span>
                </td>
                <td>${r.is_conduct_risk ? '<i class="fa-solid fa-check conduct-yes"></i>' : '<i class="fa-solid fa-minus conduct-no"></i>'}</td>
            </tr>
        `).join('');
    }
    
    // Key Drivers
    const driversContainer = document.getElementById('detail-key-drivers');
    if (driversContainer) {
        driversContainer.innerHTML = ra.key_drivers_for_residual_risk.map(d => `
            <div class="kb-driver-card">
                <div class="kb-driver-header">
                    <span class="kb-risk-id">${d.risk_id}</span>
                    <span class="kb-risk-badge ${d.highest_residual_risk_level.toLowerCase()}">${d.highest_residual_risk_level}</span>
                </div>
                <h5>${d.risk_name}</h5>
                <p>${d.key_drivers_and_justification}</p>
            </div>
        `).join('');
    }
    
    // Detailed Risk Scenarios
    const scenariosContainer = document.getElementById('detail-risk-scenarios');
    if (scenariosContainer) {
        scenariosContainer.innerHTML = ra.detailed_risk_scenarios.map(s => `
            <div class="kb-scenario-card">
                <div class="kb-scenario-header">
                    <div class="kb-scenario-title">
                        <span class="kb-risk-id">${s.risk_id}</span>
                        <h5>${s.risk_name}</h5>
                    </div>
                    <span class="kb-risk-badge ${s.inherent_risk_level.toLowerCase()}">${s.inherent_risk_level}</span>
                </div>
                
                <div class="kb-scenario-body">
                    <div class="kb-scenario-section">
                        <h6><i class="fa-solid fa-bolt"></i> Triggers</h6>
                        <ul>
                            ${s.triggers.map(t => `<li>${t}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="kb-scenario-section">
                        <h6><i class="fa-solid fa-exclamation-triangle"></i> Consequences</h6>
                        <ul>
                            ${s.consequences.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="kb-scenario-section">
                        <h6><i class="fa-solid fa-shield-halved"></i> Mitigating Actions</h6>
                        <div class="kb-actions-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Action</th>
                                        <th>Owner</th>
                                        <th>Due</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${s.mitigating_actions.map(a => `
                                        <tr>
                                            <td>${a.action_id}</td>
                                            <td>${a.description}</td>
                                            <td>${a.action_owner}</td>
                                            <td>${a.target_completion_date}</td>
                                            <td><span class="kb-action-status ${a.status.toLowerCase().replace(' ', '-')}">${a.status}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="kb-scenario-section">
                        <h6><i class="fa-solid fa-comments"></i> Stakeholder Ratings</h6>
                        <div class="kb-stakeholder-ratings">
                            ${s.stakeholder_ratings_and_comments.map(sr => `
                                <div class="kb-stakeholder-card">
                                    <div class="kb-stakeholder-header">
                                        <span class="kb-stakeholder-role">${sr.stakeholder_role}</span>
                                        <span class="kb-risk-badge ${sr.residual_risk_rating.toLowerCase()}">${sr.residual_risk_rating}</span>
                                    </div>
                                    <p class="kb-stakeholder-justification">${sr.justification}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

/**
 * 渲染 Tags Tab
 */
function renderTagsTab(c) {
    const tagsContainer = document.getElementById('detail-all-tags');
    if (tagsContainer) {
        tagsContainer.innerHTML = `
            <div class="kb-tag-category">
                <label>Change Type</label>
                <p>${c.tags.change_type_summary}</p>
            </div>
            <div class="kb-tag-category">
                <label>Risk Themes</label>
                <p>${c.tags.key_risk_themes_summary}</p>
            </div>
            <div class="kb-tag-category">
                <label>Control Themes</label>
                <p>${c.tags.key_control_themes_summary}</p>
            </div>
            <div class="kb-tag-category">
                <label>Primary Business Functions</label>
                <div class="kb-tag-chips">
                    ${c.tags.primary_business_functions.map(f => `<span class="kb-chip">${f}</span>`).join('')}
                </div>
            </div>
            <div class="kb-tag-category">
                <label>Customer Segments</label>
                <div class="kb-tag-chips">
                    ${c.tags.primary_customer_or_user_segments.map(s => `<span class="kb-chip">${s}</span>`).join('')}
                </div>
            </div>
            <div class="kb-tag-category">
                <label>Business Keywords</label>
                <div class="kb-tag-chips">
                    ${c.tags.business_domain_keywords.map(k => `<span class="kb-chip business">${k}</span>`).join('')}
                </div>
            </div>
            <div class="kb-tag-category">
                <label>Function Keywords</label>
                <div class="kb-tag-chips">
                    ${c.tags.business_function_keywords.map(k => `<span class="kb-chip function">${k}</span>`).join('')}
                </div>
            </div>
            <div class="kb-tag-category">
                <label>Technology Keywords</label>
                <div class="kb-tag-chips">
                    ${c.tags.technology_or_process_keywords.map(k => `<span class="kb-chip tech">${k}</span>`).join('')}
                </div>
            </div>
            <div class="kb-tag-category">
                <label>Regulatory Keywords</label>
                <div class="kb-tag-chips">
                    ${c.tags.regulatory_or_compliance_keywords.map(k => `<span class="kb-chip regulatory">${k}</span>`).join('')}
                </div>
            </div>
        `;
    }
    
    // Similar Cases
    const similarContainer = document.getElementById('detail-similar-cases');
    if (similarContainer) {
        if (c.tags.similar_case_ids && c.tags.similar_case_ids.length > 0) {
            const similarCases = c.tags.similar_case_ids.map(id => {
                const found = window.KNOWLEDGE_CASES.find(x => x.case_id === id);
                return found || { case_id: id, case_title: 'Case not found', case_type: '-' };
            });
            
            similarContainer.innerHTML = similarCases.map(sc => `
                <div class="kb-similar-case-card" onclick="${sc.case_title !== 'Case not found' ? `window.selectCase('${sc.case_id}')` : ''}">
                    <span class="kb-case-id-badge">${sc.case_id}</span>
                    <h5>${sc.case_title}</h5>
                    <span class="kb-case-type">${sc.case_type}</span>
                </div>
            `).join('');
        } else {
            similarContainer.innerHTML = '<p class="kb-no-similar">No similar cases identified</p>';
        }
    }
}

/**
 * 复制 Case ID
 */
window.copyCaseId = function() {
    if (!selectedCaseId) return;
    navigator.clipboard.writeText(selectedCaseId).then(() => {
        // Show brief toast/notification
        const toast = document.createElement('div');
        toast.className = 'kb-toast';
        toast.textContent = 'Case ID copied!';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    });
};

/**
 * 导出 Case JSON
 */
window.exportCaseJson = function() {
    if (!selectedCaseId || !window.KNOWLEDGE_CASES) return;
    
    const c = window.KNOWLEDGE_CASES.find(x => x.case_id === selectedCaseId);
    if (!c) return;
    
    const blob = new Blob([JSON.stringify(c, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${c.case_id}.json`;
    a.click();
    URL.revokeObjectURL(url);
};

/**
 * 关闭上传 Modal
 */
window.closeUploadModal = function () {
    const modalUpload = document.getElementById('modal-upload-case');
    if (modalUpload) modalUpload.classList.add('hidden');
};
