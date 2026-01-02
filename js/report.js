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
    
    // 绑定折叠/展开按钮
    const btnCollapseAll = document.getElementById('btn-collapse-all');
    const btnExpandAll = document.getElementById('btn-expand-all');
    if (btnCollapseAll) {
        btnCollapseAll.onclick = collapseAllRisks;
    }
    if (btnExpandAll) {
        btnExpandAll.onclick = expandAllRisks;
    }

    // 获取项目的 papers
    let papers = store.getPapersByProject(project.id);

    // [DEMO AUTO-LOAD] 如果没有 papers 且有 mock 数据，自动创建
    // 或者如果现有的 paper 没有新字段，更新它
    if (typeof BACKEND_DATA_JSON !== 'undefined' && BACKEND_DATA_JSON.length > 0) {
        if (papers.length === 0) {
            console.log('📝 Auto-loading demo data...');
            const demoPaper = createDemoPaper(project.id);
            store.addPaper(demoPaper);
            papers = [demoPaper];
        } else {
            // 检查现有 paper 是否需要更新（如果没有新字段）
            const needsUpdate = papers.some(p => {
                if (!p.results || p.results.length === 0) return true;
                return p.results.some(r => !r.level1_risk_type || !r.level2_3_risk_category);
            });
            
            if (needsUpdate) {
                console.log('🔄 Updating existing paper with new fields...');
                // 删除旧的 papers，重新创建
                papers.forEach(p => store.deletePaper(p.id));
                const demoPaper = createDemoPaper(project.id);
                store.addPaper(demoPaper);
                papers = [demoPaper];
            }
        }
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

    // 更新筛选器选项
    updateFilterOptions(papers);

    // 绑定搜索/筛选事件
    if (searchInput) searchInput.oninput = () => renderRisks(currentPaper);
    if (filterCategory) filterCategory.onchange = () => renderRisks(currentPaper);
    if (filterRating) filterRating.onchange = () => renderRisks(currentPaper);
}

/**
 * 更新筛选器选项
 * @param {Array} papers - papers 数组
 */
function updateFilterOptions(papers) {
    if (!filterCategory) return;

    // 收集所有唯一的 level1_risk_type
    const level1Types = new Set();
    papers.forEach(paper => {
        if (paper.results) {
            paper.results.forEach(r => {
                if (r.is_applicable) {
                    const l1 = r.level1_risk_type || r.category?.level1 || 'Other';
                    level1Types.add(l1);
                }
            });
        }
    });

    // 更新 filterCategory 选项
    const currentValue = filterCategory.value;
    filterCategory.innerHTML = '<option value="">All Categories</option>' +
        Array.from(level1Types).sort().map(type => 
            `<option value="${type}">${type}</option>`
        ).join('');
    
    // 恢复之前的选择
    if (currentValue && Array.from(level1Types).includes(currentValue)) {
        filterCategory.value = currentValue;
    }
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
            level1_risk_type: d.level1_risk_type || 'Other',
            level2_3_risk_category: d.level2_3_risk_category || 'Uncategorized',
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
                <small>Generate a risk assessment to create a paper</small>
            </div>`;
        return;
    }

    reportPapersListEl.innerHTML = papers.map(p => {
        const riskCount = p.results?.filter(r => r.is_applicable).length || 0;
        const totalCount = p.results?.length || 0;
        const createdAt = new Date(p.createdAt);
        const isActive = p.id === currentActivePaperId;
        
        // 计算风险分布统计
        const riskStats = calculateRiskStats(p.results || []);
        
        return `
        <div class="paper-item ${isActive ? 'active' : ''}" 
             data-paper-id="${p.id}">
            <div class="paper-item-header">
                <div class="paper-icon">
                    <i class="fa-solid fa-file-lines"></i>
                </div>
                <div class="paper-info">
                    <span class="paper-name" title="${p.name}">${p.name}</span>
                    <div class="paper-meta">
                        <span class="paper-date">
                            <i class="fa-regular fa-calendar"></i>
                            ${createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span class="paper-risk-count">
                            <i class="fa-solid fa-shield-halved"></i>
                            ${riskCount} risk${riskCount !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            </div>
            ${riskStats.hasRisks ? `
                <div class="paper-risk-indicators">
                    ${riskStats.critical > 0 ? `<span class="risk-indicator critical" title="${riskStats.critical} Critical">${riskStats.critical}</span>` : ''}
                    ${riskStats.high > 0 ? `<span class="risk-indicator high" title="${riskStats.high} High">${riskStats.high}</span>` : ''}
                    ${riskStats.medium > 0 ? `<span class="risk-indicator medium" title="${riskStats.medium} Medium">${riskStats.medium}</span>` : ''}
                    ${riskStats.low > 0 ? `<span class="risk-indicator low" title="${riskStats.low} Low">${riskStats.low}</span>` : ''}
                </div>
            ` : ''}
        </div>
        `;
    }).join('');

    // 绑定点击事件
    reportPapersListEl.querySelectorAll('.paper-item').forEach(item => {
        item.addEventListener('click', () => {
            const pid = item.getAttribute('data-paper-id');
            viewPaperResults(pid);
        });
    });
}

/**
 * 计算风险统计
 * @param {Array} results - 风险结果数组
 * @returns {Object} - 统计信息
 */
function calculateRiskStats(results) {
    const applicableRisks = results.filter(r => r.is_applicable);
    return {
        hasRisks: applicableRisks.length > 0,
        critical: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'Critical').length,
        high: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'High').length,
        medium: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'Medium').length,
        low: applicableRisks.filter(r => r.risk_details?.inherent_risk_rating === 'Low').length
    };
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
        // 更新筛选器选项（基于当前 paper）
        const papers = store.getPapersByProject(store.currentProjectId);
        updateFilterOptions(papers);
        
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
        const l2 = (r.level2_3_risk_category || r.category?.level2 || '').toLowerCase();
        
        if (query && !title.includes(query) && !cat.includes(query) && !l2.includes(query)) return false;
        if (catFilter) {
            const l1 = r.level1_risk_type || r.category?.level1 || 'Other';
            if (l1 !== catFilter) return false;
        }
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

    // 按 Level 1 -> Level 2/3 两级分组
    const level1Groups = {};
    filteredRisks.forEach(r => {
        const l1 = r.level1_risk_type || r.category?.level1 || 'Other';
        const l2 = r.level2_3_risk_category || r.category?.level2 || 'Uncategorized';
        
        console.log('📊 Grouping risk:', {
            id: r.id,
            level1: l1,
            level2: l2,
            has_level1_field: !!r.level1_risk_type,
            has_level2_field: !!r.level2_3_risk_category
        });
        
        if (!level1Groups[l1]) {
            level1Groups[l1] = {};
        }
        if (!level1Groups[l1][l2]) {
            level1Groups[l1][l2] = [];
        }
        level1Groups[l1][l2].push(r);
    });
    
    console.log('📊 Grouped structure:', level1Groups);

    // 渲染分组后的风险卡片
    const level1Entries = Object.entries(level1Groups);
    riskCardsContainer.innerHTML = level1Entries.map(([level1, level2Groups], idx1) => {
        const level1Id = `risk-group-l1-${idx1}`;
        const level2Entries = Object.entries(level2Groups);
        const totalRisks = Object.values(level2Groups).flat().length;
        
        return `
            <div class="risk-level1-group" data-expanded="true">
                <div class="risk-level1-header" onclick="toggleRiskGroup('${level1Id}')">
                    <div class="risk-level1-title">
                        <i class="fa-solid fa-chevron-down risk-chevron"></i>
                        <h2>${level1}</h2>
                        <span class="risk-group-count">${totalRisks} risk${totalRisks !== 1 ? 's' : ''}</span>
                    </div>
                </div>
                <div class="risk-level1-content" id="${level1Id}">
                    ${level2Entries.map(([level2, risks], idx2) => {
                        const level2Id = `risk-group-l2-${idx1}-${idx2}`;
                        return `
                            <div class="risk-level2-group" data-expanded="true">
                                <div class="risk-level2-header" onclick="toggleRiskGroup('${level2Id}')">
                                    <div class="risk-level2-title">
                                        <i class="fa-solid fa-chevron-down risk-chevron"></i>
                                        <h3>${level2}</h3>
                                        <span class="risk-group-count">${risks.length} risk${risks.length !== 1 ? 's' : ''}</span>
                                    </div>
                                </div>
                                <div class="risk-level2-content" id="${level2Id}">
                                    ${risks.map(r => createRiskCard(r)).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');

    // 绑定全局函数（如果还没有）
    if (typeof window.toggleRiskGroup === 'undefined') {
        window.toggleRiskGroup = function(groupId) {
            const container = document.getElementById(groupId);
            if (!container) return;
            
            const parent = container.closest('.risk-level1-group, .risk-level2-group');
            if (!parent) return;
            
            const isExpanded = parent.getAttribute('data-expanded') === 'true';
            const chevron = parent.querySelector('.risk-chevron');
            
            if (isExpanded) {
                container.style.display = 'none';
                parent.setAttribute('data-expanded', 'false');
                if (chevron) chevron.style.transform = 'rotate(-90deg)';
            } else {
                container.style.display = 'block';
                parent.setAttribute('data-expanded', 'true');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        };
    }
}

/**
 * 创建风险卡片 HTML
 * @param {Object} risk - 风险对象
 * @returns {string} - HTML 字符串
 */
function createRiskCard(risk) {
    const d = risk.risk_details;
    const irRating = d?.inherent_risk_rating || 'Medium';
    const rrRating = d?.residual_risk_rating || d?.inherent_risk_rating || 'Medium';
    const irColor = RISK_RATINGS[irRating]?.color || '#D97706';
    const rrColor = RISK_RATINGS[rrRating]?.color || '#D97706';
    
    // 获取 stakeholder comments (扩展格式，支持 IR 和 RR)
    const comments = d?.stakeholder_comments || [];
    
    // 检查是否有风险等级对齐问题
    const ratingAlignment = checkRatingAlignment(comments, irRating, rrRating);
    
    // 生成 SME Review 面板
    const smeReviewPanel = generateSMEReviewPanel(comments, irRating, rrRating);
    
    // 生成 Action Owner 同意状态
    const actionOwnerStatus = generateActionOwnerStatus(d?.mitigating_actions || []);
    
    // 生成 Sign-off 状态
    const signoffStatus = generateSignoffStatus(risk);

    return `
        <div class="risk-card" id="${risk.id}">
            <div class="risk-header" onclick="this.parentElement.classList.toggle('expanded')">
                <div class="risk-title-row">
                    <span class="risk-id">${risk.category?.level3 || 'Risk'}</span>
                    <h3>${d?.risk_title || 'Untitled Risk'}</h3>
                </div>
                <div class="risk-meta">
                    <div class="rating-badges-group">
                        <span class="rating-badge" style="background:${irColor}20; color:${irColor}" title="Inherent Risk">
                            IR: ${irRating}
                        </span>
                        <span class="rating-badge" style="background:${rrColor}20; color:${rrColor}" title="Residual Risk">
                            RR: ${rrRating}
                        </span>
                    </div>
                    ${ratingAlignment.hasMisalignment ? `
                        <span class="alignment-warning" title="Risk rating misalignment detected">
                            <i class="fa-solid fa-exclamation-triangle"></i>
                        </span>
                    ` : ''}
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
                    ${(d?.mitigating_actions || []).map((m, idx) => `
                        <div class="action-item" data-action-index="${idx}">
                            <div class="action-header">
                                <p><strong>${m.description}</strong></p>
                                ${m.owner_agreed ? `
                                    <span class="action-agreed-badge" title="Owner has agreed">
                                        <i class="fa-solid fa-check-circle"></i> Agreed
                                    </span>
                                ` : `
                                    <span class="action-pending-badge" title="Awaiting owner agreement">
                                        <i class="fa-regular fa-clock"></i> Pending
                                    </span>
                                `}
                            </div>
                            <div class="action-meta">
                                <span>Owner: ${m.owner}</span>
                                <span>Due: ${m.target_completion_date}</span>
                            </div>
                        </div>
                    `).join('')}
                    ${actionOwnerStatus.hasPending ? `
                        <div class="action-status-note">
                            <i class="fa-solid fa-info-circle"></i>
                            Some action owners have not yet agreed to the mitigating actions.
                        </div>
                    ` : ''}
                </div>
                
                <!-- SME Review Panel -->
                <div class="risk-section sme-review-section">
                    <div class="section-header-with-actions">
                        <h4><i class="fa-solid fa-users"></i> SME Review & Comments</h4>
                        <button class="btn-icon-text btn-sm" onclick="openSMECommentModal('${risk.id}')">
                            <i class="fa-solid fa-plus"></i> Add Comment
                        </button>
                    </div>
                    ${smeReviewPanel}
                </div>
                
                <!-- Sign-off Status -->
                <div class="risk-section signoff-section">
                    <h4><i class="fa-solid fa-signature"></i> Sign-off Status</h4>
                    ${signoffStatus}
                </div>
                
                <div class="risk-actions">
                    <button class="btn secondary-btn btn-sm" onclick="openSMECommentModal('${risk.id}')">
                        <i class="fa-regular fa-comment"></i> 
                        Comments (${comments.length})
                    </button>
                    <button class="btn primary-btn btn-sm">Edit Risk</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * 检查风险等级对齐情况
 * @param {Array} comments - SME comments 数组
 * @param {string} irRating - Inherent Risk 等级
 * @param {string} rrRating - Residual Risk 等级
 * @returns {Object} - 对齐检查结果
 */
function checkRatingAlignment(comments, irRating, rrRating) {
    // 检查是否有 SME 的评分与主要评分不一致
    const misalignments = [];
    comments.forEach(c => {
        if (c.ir_rating && c.ir_rating !== irRating) {
            misalignments.push({ role: c.role, type: 'IR', expected: irRating, actual: c.ir_rating });
        }
        if (c.rr_rating && c.rr_rating !== rrRating) {
            misalignments.push({ role: c.role, type: 'RR', expected: rrRating, actual: c.rr_rating });
        }
    });
    return { hasMisalignment: misalignments.length > 0, misalignments };
}

/**
 * 生成 SME Review 面板 HTML
 * @param {Array} comments - SME comments 数组
 * @param {string} irRating - Inherent Risk 等级
 * @param {string} rrRating - Residual Risk 等级
 * @returns {string} - HTML 字符串
 */
function generateSMEReviewPanel(comments, irRating, rrRating) {
    if (comments.length === 0) {
        return `
            <div class="sme-review-empty">
                <i class="fa-regular fa-comment-dots"></i>
                <p>No SME comments yet. Click "Add Comment" to start the review process.</p>
            </div>
        `;
    }
    
    return `
        <div class="sme-review-grid">
            ${comments.map(c => {
                const cIrRating = c.ir_rating || c.rating || irRating;
                const cRrRating = c.rr_rating || c.rating || rrRating;
                const irColor = RISK_RATINGS[cIrRating]?.color || '#D97706';
                const rrColor = RISK_RATINGS[cRrRating]?.color || '#D97706';
                const hasJustification = c.justification && c.justification.trim().length > 0;
                
                return `
                    <div class="sme-review-card">
                        <div class="sme-review-header">
                            <span class="sme-role-badge">${c.role || 'Unknown'}</span>
                            <div class="sme-ratings">
                                <span class="sme-rating-badge" style="background:${irColor}15; color:${irColor}" title="Inherent Risk">
                                    IR: ${cIrRating}
                                </span>
                                <span class="sme-rating-badge" style="background:${rrColor}15; color:${rrColor}" title="Residual Risk">
                                    RR: ${cRrRating}
                                </span>
                            </div>
                        </div>
                        ${hasJustification ? `
                            <div class="sme-justification">
                                <strong>Justification:</strong>
                                <p>${c.justification}</p>
                            </div>
                        ` : ''}
                        ${c.comment_date ? `
                            <div class="sme-comment-meta">
                                <small>Reviewed on: ${new Date(c.comment_date).toLocaleDateString()}</small>
                            </div>
                        ` : ''}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * 生成 Action Owner 同意状态
 * @param {Array} actions - Mitigating actions 数组
 * @returns {Object} - 状态信息
 */
function generateActionOwnerStatus(actions) {
    const hasPending = actions.some(a => !a.owner_agreed);
    const allAgreed = actions.length > 0 && actions.every(a => a.owner_agreed);
    return { hasPending, allAgreed };
}

/**
 * 生成 Sign-off 状态 HTML
 * @param {Object} risk - 风险对象
 * @returns {string} - HTML 字符串
 */
function generateSignoffStatus(risk) {
    const signoffs = risk.signoffs || {};
    const smeRoles = ['Risk Owner', 'Legal', 'Compliance', 'Op Risk Management', 'LIS', 'Tech Risk', 'AI Governance'];
    
    const signoffItems = smeRoles.map(role => {
        const signoff = signoffs[role];
        const isSigned = signoff && signoff.status === 'signed';
        const signoffDate = signoff && signoff.date ? new Date(signoff.date).toLocaleDateString() : null;
        
        return `
            <div class="signoff-item ${isSigned ? 'signed' : 'pending'}">
                <div class="signoff-indicator">
                    <i class="fa-solid ${isSigned ? 'fa-check-circle' : 'fa-circle'}"></i>
                </div>
                <div class="signoff-info">
                    <span class="signoff-role">${role}</span>
                    ${isSigned && signoffDate ? `
                        <small class="signoff-date">Signed on ${signoffDate}</small>
                    ` : `
                        <small class="signoff-date">Pending</small>
                    `}
                </div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="signoff-grid">
            ${signoffItems}
        </div>
        ${risk.risk_details?.residual_risk_rating && ['Medium', 'High', 'Critical'].includes(risk.risk_details.residual_risk_rating) ? `
            <div class="signoff-ceo-note">
                <i class="fa-solid fa-info-circle"></i>
                <span>CEO sign-off required for ${risk.risk_details.residual_risk_rating} residual risk rating</span>
                ${signoffs.CEO && signoffs.CEO.status === 'signed' ? `
                    <span class="ceo-signed-badge">CEO Signed: ${new Date(signoffs.CEO.date).toLocaleDateString()}</span>
                ` : ''}
            </div>
        ` : ''}
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
 * 存储导航数据用于搜索过滤
 */
let navigationData = null;

/**
 * 渲染快速导航（支持两级分组：level1 -> level2/3）
 * @param {Object} paper - paper 对象
 */
function renderQuickNav(paper) {
    if (!quickNavList || !paper || !paper.results) return;

    // 按 Level 1 -> Level 2/3 两级分组
    const level1Groups = {};
    paper.results.forEach(r => {
        if (!r.is_applicable) return;
        const l1 = r.level1_risk_type || r.category?.level1 || 'Other';
        const l2 = r.level2_3_risk_category || r.category?.level2 || 'Uncategorized';
        
        console.log('🧭 QuickNav grouping:', {
            id: r.id,
            level1: l1,
            level2: l2,
            has_level1_field: !!r.level1_risk_type,
            has_level2_field: !!r.level2_3_risk_category
        });
        
        if (!level1Groups[l1]) {
            level1Groups[l1] = {};
        }
        if (!level1Groups[l1][l2]) {
            level1Groups[l1][l2] = [];
        }
        level1Groups[l1][l2].push(r);
    });
    
    console.log('🧭 QuickNav grouped structure:', level1Groups);

    // 保存导航数据用于搜索
    navigationData = { level1Groups, paper };

    const level1Entries = Object.entries(level1Groups);
    if (level1Entries.length === 0) {
        quickNavList.innerHTML = '<div class="nav-empty-state"><i class="fa-regular fa-folder-open"></i><p>No risks to display</p></div>';
        return;
    }

    // 生成唯一 ID 用于折叠/展开
    quickNavList.innerHTML = level1Entries.map(([level1, level2Groups], idx1) => {
        const level1Id = `nav-l1-${idx1}`;
        const level2Entries = Object.entries(level2Groups);
        
        return `
            <div class="nav-level1-group" data-expanded="true">
                <div class="nav-level1-title" onclick="toggleNavGroup('${level1Id}')">
                    <i class="fa-solid fa-chevron-down nav-chevron"></i>
                    <span>${level1}</span>
                    <span class="nav-count">${Object.values(level2Groups).flat().length}</span>
                </div>
                <div class="nav-level2-container" id="${level1Id}">
                    ${level2Entries.map(([level2, risks], idx2) => {
                        const level2Id = `nav-l2-${idx1}-${idx2}`;
                        return `
                            <div class="nav-level2-group" data-expanded="true">
                                <div class="nav-level2-title" onclick="toggleNavGroup('${level2Id}')">
                                    <i class="fa-solid fa-chevron-down nav-chevron"></i>
                                    <span>${level2}</span>
                                    <span class="nav-count">${risks.length}</span>
                                </div>
                                <div class="nav-items-container" id="${level2Id}">
                                    ${risks.map(r => {
                                        const rating = r.risk_details?.inherent_risk_rating || 'Medium';
                                        const title = r.risk_details?.risk_title || 'Untitled';
                                        return `
                                            <div class="nav-item" 
                                                 data-risk-id="${r.id}"
                                                 data-risk-title="${title.toLowerCase()}"
                                                 onclick="scrollToRisk('${r.id}')">
                                                <span class="nav-rating ${rating}" title="${rating} Risk"></span>
                                                <span class="nav-item-text" title="${title}">${truncate(title, 32)}</span>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');

    // 绑定全局函数（如果还没有）
    if (typeof window.toggleNavGroup === 'undefined') {
        window.toggleNavGroup = function(groupId) {
            const container = document.getElementById(groupId);
            if (!container) return;
            
            const parent = container.closest('.nav-level1-group, .nav-level2-group');
            if (!parent) return;
            
            const isExpanded = parent.getAttribute('data-expanded') === 'true';
            const chevron = parent.querySelector('.nav-chevron');
            
            if (isExpanded) {
                container.style.display = 'none';
                parent.setAttribute('data-expanded', 'false');
                if (chevron) chevron.style.transform = 'rotate(-90deg)';
            } else {
                container.style.display = 'block';
                parent.setAttribute('data-expanded', 'true');
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        };
    }
}

/**
 * 打开 SME 评论模态框
 * @param {string} riskId - 风险 ID
 */
function openSMECommentModal(riskId) {
    const modal = document.getElementById('modal-sme-comment');
    if (!modal) return;
    
    // 存储当前风险 ID
    modal.setAttribute('data-risk-id', riskId);
    
    // 重置表单
    const form = document.getElementById('sme-comment-form');
    if (form) {
        form.reset();
    }
    
    // 显示模态框
    modal.classList.remove('hidden');
    
    // 绑定提交按钮
    const submitBtn = document.getElementById('btn-submit-sme-comment');
    if (submitBtn) {
        submitBtn.onclick = () => submitSMEComment(riskId);
    }
}

/**
 * 关闭 SME 评论模态框
 */
function closeSMECommentModal() {
    const modal = document.getElementById('modal-sme-comment');
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * 提交 SME 评论
 * @param {string} riskId - 风险 ID
 */
function submitSMEComment(riskId) {
    const role = document.getElementById('sme-comment-role')?.value;
    const irRating = document.getElementById('sme-comment-ir-rating')?.value;
    const rrRating = document.getElementById('sme-comment-rr-rating')?.value;
    const justification = document.getElementById('sme-comment-justification')?.value;
    
    if (!role) {
        alert('Please select an SME role');
        return;
    }
    
    // 获取当前 paper
    const paper = currentPaper;
    if (!paper || !paper.results) return;
    
    // 找到对应的风险
    const riskIndex = paper.results.findIndex(r => r.id === riskId);
    if (riskIndex === -1) return;
    
    const risk = paper.results[riskIndex];
    if (!risk.risk_details) {
        risk.risk_details = {};
    }
    
    if (!risk.risk_details.stakeholder_comments) {
        risk.risk_details.stakeholder_comments = [];
    }
    
    // 检查是否已有该角色的评论，如果有则更新，否则添加
    const existingCommentIndex = risk.risk_details.stakeholder_comments.findIndex(
        c => c.role === role
    );
    
    const newComment = {
        role: role,
        ir_rating: irRating || undefined,
        rr_rating: rrRating || undefined,
        rating: rrRating || irRating || undefined, // 向后兼容
        justification: justification || undefined,
        comment_date: new Date().toISOString()
    };
    
    if (existingCommentIndex !== -1) {
        // 更新现有评论
        risk.risk_details.stakeholder_comments[existingCommentIndex] = {
            ...risk.risk_details.stakeholder_comments[existingCommentIndex],
            ...newComment
        };
    } else {
        // 添加新评论
        risk.risk_details.stakeholder_comments.push(newComment);
    }
    
    // 更新 paper
    paper.results[riskIndex] = risk;
    store.updatePaper(paper.id, { results: paper.results });
    
    // 重新渲染风险卡片
    renderRisks(paper);
    
    // 关闭模态框
    closeSMECommentModal();
}

/**
 * 滚动到指定的风险卡片
 * @param {string} riskId - 风险 ID
 */
function scrollToRisk(riskId) {
    const riskCard = document.getElementById(riskId);
    if (riskCard) {
        // 高亮当前项
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-risk-id') === riskId) {
                item.classList.add('active');
            }
        });
        
        // 滚动到风险卡片
        riskCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // 如果是折叠的，展开它
        if (!riskCard.classList.contains('expanded')) {
            riskCard.classList.add('expanded');
        }
        
        // 添加临时高亮效果
        riskCard.style.transition = 'box-shadow 0.3s ease';
        riskCard.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.3)';
        setTimeout(() => {
            riskCard.style.boxShadow = '';
        }, 2000);
    }
}

/**
 * 过滤导航列表
 * @param {string} query - 搜索关键词
 */
function filterNavigation(query) {
    if (!quickNavList || !navigationData) return;
    
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) {
        // 如果搜索为空，重新渲染完整列表
        renderQuickNav(navigationData.paper);
        return;
    }
    
    // 过滤风险项
    const navItems = quickNavList.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const title = item.getAttribute('data-risk-title') || '';
        const parentGroups = item.closest('.nav-level1-group, .nav-level2-group');
        
        if (title.includes(searchTerm)) {
            item.style.display = 'flex';
            // 显示父级分组
            if (parentGroups) {
                parentGroups.style.display = 'block';
                const containers = parentGroups.querySelectorAll('.nav-level2-container, .nav-items-container');
                containers.forEach(c => c.style.display = 'block');
            }
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * 折叠所有风险卡片和分组
 */
function collapseAllRisks() {
    console.log('📦 Collapsing all risks...');
    
    // 折叠所有 Level 1 分组
    const level1Groups = document.querySelectorAll('.risk-level1-group');
    level1Groups.forEach(group => {
        const content = group.querySelector('.risk-level1-content');
        const chevron = group.querySelector('.risk-level1-header .risk-chevron');
        if (content) {
            content.style.display = 'none';
            group.setAttribute('data-expanded', 'false');
            if (chevron) chevron.style.transform = 'rotate(-90deg)';
        }
    });
    
    // 折叠所有 Level 2 分组
    const level2Groups = document.querySelectorAll('.risk-level2-group');
    level2Groups.forEach(group => {
        const content = group.querySelector('.risk-level2-content');
        const chevron = group.querySelector('.risk-level2-header .risk-chevron');
        if (content) {
            content.style.display = 'none';
            group.setAttribute('data-expanded', 'false');
            if (chevron) chevron.style.transform = 'rotate(-90deg)';
        }
    });
    
    // 折叠所有风险卡片
    const riskCards = document.querySelectorAll('.risk-card');
    riskCards.forEach(card => {
        const body = card.querySelector('.risk-body');
        const expandBtn = card.querySelector('.btn-expand');
        if (body) {
            card.classList.remove('expanded');
            if (expandBtn) {
                expandBtn.style.transform = 'rotate(0deg)';
            }
        }
    });
}

/**
 * 展开所有风险卡片和分组
 */
function expandAllRisks() {
    console.log('📂 Expanding all risks...');
    
    // 展开所有 Level 1 分组
    const level1Groups = document.querySelectorAll('.risk-level1-group');
    level1Groups.forEach(group => {
        const content = group.querySelector('.risk-level1-content');
        const chevron = group.querySelector('.risk-level1-header .risk-chevron');
        if (content) {
            content.style.display = 'block';
            group.setAttribute('data-expanded', 'true');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
    });
    
    // 展开所有 Level 2 分组
    const level2Groups = document.querySelectorAll('.risk-level2-group');
    level2Groups.forEach(group => {
        const content = group.querySelector('.risk-level2-content');
        const chevron = group.querySelector('.risk-level2-header .risk-chevron');
        if (content) {
            content.style.display = 'block';
            group.setAttribute('data-expanded', 'true');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
    });
    
    // 展开所有风险卡片
    const riskCards = document.querySelectorAll('.risk-card');
    riskCards.forEach(card => {
        const body = card.querySelector('.risk-body');
        const expandBtn = card.querySelector('.btn-expand');
        if (body) {
            card.classList.add('expanded');
            if (expandBtn) {
                expandBtn.style.transform = 'rotate(180deg)';
            }
        }
    });
}

// 将函数暴露到全局作用域，供 HTML 调用
if (typeof window !== 'undefined') {
    window.openSMECommentModal = openSMECommentModal;
    window.closeSMECommentModal = closeSMECommentModal;
    window.scrollToRisk = scrollToRisk;
    window.filterNavigation = filterNavigation;
    window.collapseAllRisks = collapseAllRisks;
    window.expandAllRisks = expandAllRisks;
}

