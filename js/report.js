/**
 * =============================================================================
 * REPORT - 风险报告查看页面
 * =============================================================================
 * 管理风险评估报告的展示、筛选和导航
 */

import { store } from './store.js';
import { truncate } from './utils.js';
import { RISK_RATINGS } from './config.js';

// DOM 元素引用
let reportPapersListEl;
let riskCardsContainer;
let quickNavList;
let searchInput;
let filterCategory;
let filterRating;
let currentActivePaperId = null;
let currentPaper = null;

/**
 * 初始化 Report 页面
 * @param {Object} project - 当前项目对象
 */
export function initReportPage(project) {
    console.log('📊 Initializing Report Page for:', project?.name);
    
    if (!project) return;

    // 获取 DOM 元素
    reportPapersListEl = document.getElementById('report-papers-list');
    riskCardsContainer = document.getElementById('risk-report-container');
    quickNavList = document.getElementById('report-nav-list');
    searchInput = document.getElementById('risk-search');
    filterCategory = document.getElementById('filter-category');
    filterRating = document.getElementById('filter-rating');

    // 获取项目的 papers
    let papers = store.getPapersByProject(project.id);

    // [DEMO AUTO-LOAD] 如果没有 papers 且有 mock 数据，自动创建
    if (papers.length === 0 && typeof BACKEND_DATA_JSON !== 'undefined' && BACKEND_DATA_JSON.length > 0) {
        console.log('📝 Auto-loading demo data...');
        const demoPaper = createDemoPaper(project.id);
        store.addPaper(demoPaper);
        papers = [demoPaper];
    }

    // 渲染 papers 列表
    renderReportPapersList();

    // 加载第一个 paper
    if (papers.length > 0) {
        if (!currentActivePaperId || !papers.find(p => p.id === currentActivePaperId)) {
            viewPaperResults(papers[0].id);
        } else {
            viewPaperResults(currentActivePaperId);
        }
    } else {
        if (riskCardsContainer) {
            riskCardsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fa-regular fa-clipboard"></i>
                    <p>No risk papers generated yet. Go to Generation tab.</p>
                </div>`;
        }
    }

    // 绑定搜索/筛选事件
    if (searchInput) searchInput.oninput = () => renderRisks(currentPaper);
    if (filterCategory) filterCategory.onchange = () => renderRisks(currentPaper);
    if (filterRating) filterRating.onchange = () => renderRisks(currentPaper);
}

/**
 * 创建 Demo Paper（用于演示）
 * @param {string} projectId - 项目 ID
 * @returns {Object} - Demo paper 对象
 */
function createDemoPaper(projectId) {
    return {
        id: 'paper_demo_' + Date.now(),
        name: 'Demo Risk Assessment - GenAI Chatbot',
        createdAt: new Date().toISOString(),
        projectId: projectId,
        status: 'completed',
        results: BACKEND_DATA_JSON.map((d, i) => ({
            id: `demo_risk_${i}`,
            category: {
                level1: 'Data Risk',
                level2: 'Data Governance',
                level3: d.risk_details?.risk_title || 'Imported Risk'
            },
            is_applicable: d.is_applicable === "true" || d.is_applicable === true,
            status: 'draft',
            risk_details: d.risk_details
        })),
        capturedData: {}
    };
}

/**
 * 渲染 Papers 列表
 */
function renderReportPapersList() {
    if (!reportPapersListEl) return;

    const papers = store.getPapersByProject(store.currentProjectId);

    if (papers.length === 0) {
        reportPapersListEl.innerHTML = `
            <div class="empty-papers">
                <i class="fa-regular fa-folder-open"></i>
                <p>No papers yet</p>
            </div>`;
        return;
    }

    reportPapersListEl.innerHTML = papers.map(p => `
        <div class="paper-item ${p.id === currentActivePaperId ? 'active' : ''}" 
             data-paper-id="${p.id}">
            <span class="paper-name">${p.name}</span>
            <div class="paper-meta">
                <span>${new Date(p.createdAt).toLocaleDateString()}</span>
                <span>${p.results?.length || 0} risks</span>
            </div>
        </div>
    `).join('');

    // 绑定点击事件
    reportPapersListEl.querySelectorAll('.paper-item').forEach(item => {
        item.addEventListener('click', () => {
            const pid = item.getAttribute('data-paper-id');
            viewPaperResults(pid);
        });
    });
}

/**
 * 查看 Paper 结果
 * @param {string} paperId - paper ID
 */
function viewPaperResults(paperId) {
    console.log('📄 Viewing Paper:', paperId);
    
    currentActivePaperId = paperId;
    currentPaper = store.getPaper(paperId);

    renderReportPapersList(); // 更新激活状态

    if (currentPaper) {
        renderRisks(currentPaper);
        renderQuickNav(currentPaper);
    }
}

/**
 * 渲染风险卡片
 * @param {Object} paper - paper 对象
 */
function renderRisks(paper) {
    if (!riskCardsContainer) return;
    if (!paper || !paper.results || paper.results.length === 0) {
        riskCardsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-clipboard"></i>
                <p>No assessment generated yet.</p>
            </div>`;
        return;
    }

    // 筛选逻辑
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const catFilter = filterCategory ? filterCategory.value : '';
    const rateFilter = filterRating ? filterRating.value : '';

    const filteredRisks = paper.results.filter(r => {
        if (!r.is_applicable) return false;
        
        const title = r.risk_details?.risk_title?.toLowerCase() || '';
        const cat = r.category?.level3?.toLowerCase() || '';
        
        if (query && !title.includes(query) && !cat.includes(query)) return false;
        if (catFilter && r.category?.level1 !== catFilter) return false;
        if (rateFilter && r.risk_details?.inherent_risk_rating !== rateFilter) return false;
        
        return true;
    });

    // 更新统计
    updateReportStats(paper.results);

    if (filteredRisks.length === 0) {
        riskCardsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fa-regular fa-clipboard"></i>
                <p>No relevant risks found with current filters.</p>
            </div>`;
        return;
    }

    // 渲染风险卡片
    riskCardsContainer.innerHTML = filteredRisks.map(r => createRiskCard(r)).join('');
}

/**
 * 创建风险卡片 HTML
 * @param {Object} risk - 风险对象
 * @returns {string} - HTML 字符串
 */
function createRiskCard(risk) {
    const d = risk.risk_details;
    const rating = d?.inherent_risk_rating || 'Medium';
    const ratingColor = RISK_RATINGS[rating]?.color || '#D97706';

    return `
        <div class="risk-card" id="${risk.id}">
            <div class="risk-header" onclick="this.parentElement.classList.toggle('expanded')">
                <div class="risk-title-row">
                    <span class="risk-id">${risk.category?.level3 || 'Risk'}</span>
                    <h3>${d?.risk_title || 'Untitled Risk'}</h3>
                </div>
                <div class="risk-meta">
                    <span class="rating-badge" style="background:${ratingColor}20; color:${ratingColor}">
                        ${rating} Risk
                    </span>
                    <span class="status-badge" style="background:#e2e8f0; color:#475569">
                        ${risk.status || 'Draft'}
                    </span>
                    <button class="btn-expand"><i class="fa-solid fa-chevron-down"></i></button>
                </div>
            </div>
            <div class="risk-body">
                <div class="risk-section">
                    <h4>Risk Triggers (Causes)</h4>
                    <ul>${(d?.triggers || []).map(t => `<li>${t}</li>`).join('')}</ul>
                </div>
                <div class="risk-section">
                    <h4>Consequences</h4>
                    <ul>${(d?.consequences || []).map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
                <div class="risk-section">
                    <h4>Mitigating Actions</h4>
                    ${(d?.mitigating_actions || []).map(m => `
                        <div class="action-item">
                            <p><strong>${m.description}</strong></p>
                            <div class="action-meta">
                                <span>Owner: ${m.owner}</span>
                                <span>Due: ${m.target_completion_date}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="risk-actions">
                    <button class="btn-secondary btn-sm">
                        <i class="fa-regular fa-comment"></i> 
                        Comments (${d?.stakeholder_comments?.length || 0})
                    </button>
                    <button class="btn-primary btn-sm">Edit Risk</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * 更新报告统计数据
 * @param {Array} results - 风险结果数组
 */
function updateReportStats(results) {
    if (!results) return;

    const applicableRisks = results.filter(r => r.is_applicable);
    const stats = {
        total: applicableRisks.length,
        critical: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'Critical').length,
        high: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'High').length,
        medium: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'Medium').length,
        low: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'Low').length,
        na: results.filter(r => !r.is_applicable).length
    };

    // 更新页面上的统计数字
    Object.entries({
        'stat-total-risks': stats.total,
        'stat-critical': stats.critical,
        'stat-high': stats.high,
        'stat-medium': stats.medium,
        'stat-low': stats.low,
        'stat-na': stats.na
    }).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
}

/**
 * 渲染快速导航
 * @param {Object} paper - paper 对象
 */
function renderQuickNav(paper) {
    if (!quickNavList || !paper || !paper.results) return;

    // 按 Level 1 分组
    const groups = {};
    paper.results.forEach(r => {
        if (!r.is_applicable) return;
        const l1 = r.category?.level1 || 'Other';
        if (!groups[l1]) groups[l1] = [];
        groups[l1].push(r);
    });

    const groupEntries = Object.entries(groups);
    if (groupEntries.length === 0) {
        quickNavList.innerHTML = '<div style="padding:1rem;color:#64748B;">No risks to display</div>';
        return;
    }

    quickNavList.innerHTML = groupEntries.map(([cat, risks]) => `
        <div class="nav-category">
            <div class="nav-category-title">${cat}</div>
            ${risks.map(r => {
                const rating = r.risk_details?.inherent_risk_rating || 'Medium';
                return `
                    <div class="nav-item" onclick="document.getElementById('${r.id}')?.scrollIntoView({behavior:'smooth',block:'center'})">
                        <span class="nav-rating ${rating}"></span>
                        <span style="flex:1;font-size:0.8rem;">${truncate(r.risk_details?.risk_title || 'Untitled', 40)}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `).join('');
}

