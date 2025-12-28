/**
 * =============================================================================
 * KNOWLEDGE BASE - 历史案例知识库
 * =============================================================================
 * 管理历史风险评估案例的展示、搜索和筛选
 */

// DOM 元素引用
let kbGrid;
let kbSearchInput;
let filterIndustry;
let filterType;
let filterStatus;
let statTotal;
let statActive;
let statRisks;
let statIndustries;
let modalDetail;
let modalUpload;
let btnUpload;
let initialized = false;

/**
 * 初始化 Knowledge Base
 */
export function initKnowledgeBase() {
    console.log('📚 Initializing Knowledge Base...');

    // 获取 DOM 元素
    kbGrid = document.getElementById('kb-documents-grid');
    kbSearchInput = document.getElementById('kb-search');
    filterIndustry = document.getElementById('filter-industry');
    filterType = document.getElementById('filter-type');
    filterStatus = document.getElementById('filter-status');
    statTotal = document.getElementById('stat-total');
    statActive = document.getElementById('stat-active');
    statRisks = document.getElementById('stat-risks');
    statIndustries = document.getElementById('stat-industries');
    modalDetail = document.getElementById('modal-case-detail');
    modalUpload = document.getElementById('modal-upload-case');
    btnUpload = document.getElementById('btn-upload-case');

    // 绑定事件（只绑定一次）
    if (!initialized) {
        bindEvents();
        initialized = true;
    }

    // 延迟渲染，确保数据已加载
    setTimeout(() => {
        if (window.KNOWLEDGE_CASES) {
            console.log('📚 Knowledge Cases Found:', window.KNOWLEDGE_CASES.length);
            renderFilters();
            renderStats();
            renderKBCases();
        } else {
            console.warn('⚠️ KNOWLEDGE_CASES not loaded yet');
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
        renderKBCases();
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
    if (filterIndustry) filterIndustry.onchange = handleSearch;
    if (filterType) filterType.onchange = handleSearch;
    if (filterStatus) filterStatus.onchange = handleSearch;

    // 上传按钮
    if (btnUpload) {
        btnUpload.onclick = () => {
            if (modalUpload) modalUpload.classList.remove('hidden');
        };
    }
}

/**
 * 渲染筛选器选项
 */
function renderFilters() {
    if (!window.KNOWLEDGE_CASES) return;

    const { industries, projectTypes } = getFilterOptions();

    if (filterIndustry) {
        const current = filterIndustry.value;
        filterIndustry.innerHTML = '<option value="">All Industries</option>' +
            industries.map(i => `<option value="${i}">${i}</option>`).join('');
        filterIndustry.value = current;
    }

    if (filterType) {
        const current = filterType.value;
        filterType.innerHTML = '<option value="">All Project Types</option>' +
            projectTypes.map(t => `<option value="${t}">${t}</option>`).join('');
        filterType.value = current;
    }
}

/**
 * 渲染统计数据
 */
function renderStats() {
    if (!window.KNOWLEDGE_CASES) return;

    if (statTotal) statTotal.textContent = window.KNOWLEDGE_CASES.length;
    if (statActive) statActive.textContent = getActiveCases().length;

    if (statRisks) {
        const totalRisks = window.KNOWLEDGE_CASES.reduce(
            (sum, c) => sum + (c.assessmentStats?.totalRisksIdentified || 0), 0
        );
        statRisks.textContent = totalRisks;
    }

    if (statIndustries) {
        const industries = new Set(window.KNOWLEDGE_CASES.map(c => c.projectInfo?.industry));
        statIndustries.textContent = industries.size;
    }
}

/**
 * 处理搜索和筛选
 */
function handleSearch() {
    const query = kbSearchInput ? kbSearchInput.value : '';
    const filters = {
        industry: filterIndustry ? filterIndustry.value : '',
        projectType: filterType ? filterType.value : '',
        status: filterStatus ? filterStatus.value : ''
    };

    const results = searchCases(query, filters);
    renderKBCases(results);
}

/**
 * 渲染知识库案例卡片
 * @param {Array} cases - 案例数组
 */
function renderKBCases(cases = window.KNOWLEDGE_CASES) {
    if (!kbGrid || !cases) return;

    if (cases.length === 0) {
        kbGrid.innerHTML = '<div class="empty-state">No matching cases found</div>';
        return;
    }

    kbGrid.innerHTML = cases.map(c => `
        <div class="case-card" onclick="window.openCaseDetail('${c.id}')">
            <div class="case-card-header">
                <div class="case-meta">
                    <span class="tag tag-industry">${c.projectInfo?.industry}</span>
                    <span class="tag tag-type">${c.projectInfo?.projectType}</span>
                </div>
                <h4>${c.documentName}</h4>
                <div class="status-badge ${c.status}">${c.status}</div>
            </div>
            <div class="case-card-body">
                <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:1rem;">
                    ${c.retrievalSummary.substring(0, 120)}...
                </p>
                <div class="case-tags">
                    ${c.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
                    ${c.tags.length > 3 ? `<span class="tag">+${c.tags.length - 3}</span>` : ''}
                </div>
                <div class="case-risk-summary">
                    <div class="risk-stat critical">
                        <span class="risk-stat-num">${c.assessmentStats?.criticalRisks || 0}</span>
                        <span class="risk-stat-label">Crit</span>
                    </div>
                    <div class="risk-stat high">
                        <span class="risk-stat-num">${c.assessmentStats?.highRisks || 0}</span>
                        <span class="risk-stat-label">High</span>
                    </div>
                    <div class="risk-stat">
                        <span class="risk-stat-num">${c.assessmentStats?.totalRisksIdentified || 0}</span>
                        <span class="risk-stat-label">Total</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 获取筛选器选项
 * @returns {Object} - 包含 industries 和 projectTypes 的对象
 */
function getFilterOptions() {
    if (!window.KNOWLEDGE_CASES) return { industries: [], projectTypes: [], regions: [] };

    const industries = [...new Set(window.KNOWLEDGE_CASES.map(c => c.projectInfo.industry))];
    const projectTypes = [...new Set(window.KNOWLEDGE_CASES.map(c => c.projectInfo.projectType))];
    const regions = [...new Set(window.KNOWLEDGE_CASES.map(c => c.projectInfo.region))];

    return { industries, projectTypes, regions };
}

/**
 * 获取活跃案例
 * @returns {Array} - 活跃案例数组
 */
function getActiveCases() {
    if (!window.KNOWLEDGE_CASES) return [];
    return window.KNOWLEDGE_CASES.filter(c => c.status === 'active');
}

/**
 * 搜索案例
 * @param {string} query - 搜索关键词
 * @param {Object} filters - 筛选条件
 * @returns {Array} - 搜索结果数组
 */
function searchCases(query, filters = {}) {
    if (!window.KNOWLEDGE_CASES) return [];
    
    let results = [...window.KNOWLEDGE_CASES];

    // 文本搜索
    if (query) {
        const q = query.toLowerCase();
        results = results.filter(c =>
            c.documentName.toLowerCase().includes(q) ||
            c.tags.some(t => t.toLowerCase().includes(q)) ||
            c.retrievalSummary.toLowerCase().includes(q) ||
            c.projectInfo.projectType.toLowerCase().includes(q) ||
            c.projectInfo.industry.toLowerCase().includes(q)
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
 * 打开案例详情 Modal
 * @param {string} id - 案例 ID
 */
window.openCaseDetail = function (id) {
    if (!window.KNOWLEDGE_CASES) return;
    
    const c = window.KNOWLEDGE_CASES.find(x => x.id === id);
    if (!c || !modalDetail) return;

    const content = modalDetail.querySelector('.case-detail-body');
    if (content) {
        content.innerHTML = `
            <div class="detail-section">
                <h4>Project Information</h4>
                <div class="detail-grid">
                    <div><strong>Industry:</strong> ${c.projectInfo.industry}</div>
                    <div><strong>Region:</strong> ${c.projectInfo.region}</div>
                    <div><strong>Type:</strong> ${c.projectInfo.projectType}</div>
                    <div><strong>Duration:</strong> ${c.projectInfo.duration}</div>
                </div>
            </div>
            <div class="detail-section">
                <h4>Risk Assessment Stats</h4>
                <div class="stats-row">
                    <span class="badge critical">${c.assessmentStats.criticalRisks} Critical</span>
                    <span class="badge high">${c.assessmentStats.highRisks} High</span>
                    <span class="badge medium">${c.assessmentStats.mediumRisks} Medium</span>
                </div>
            </div>
            <div class="detail-section">
                <h4>Key Identified Risks</h4>
                <ul>
                    ${c.keyRisks.map(r => `<li>[${r.rating}] ${r.title}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    modalDetail.classList.remove('hidden');
};

/**
 * 关闭案例详情 Modal
 */
window.closeCaseModal = function () {
    if (modalDetail) modalDetail.classList.add('hidden');
};

/**
 * 关闭上传 Modal
 */
window.closeUploadModal = function () {
    if (modalUpload) modalUpload.classList.add('hidden');
};

