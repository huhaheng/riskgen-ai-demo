/**
 * =============================================================================
 * GENERATION - 风险评估生成页面
 * =============================================================================
 * 管理风险评估的生成流程和 Papers 列表
 */

import { store } from './store.js';
import { delay, truncate, setTextContent } from './utils.js';
import { RISK_CATEGORIES_LANDSCAPE } from './config.js';

// DOM 元素引用
let papersListEl;
let btnStartGen;
let paperNameInput;
let generationComplete;
let stepPrompts, stepInputs, stepRetrieval, stepAnalysis;
let currentActivePaperId = null;

/**
 * 初始化 Generation 页面
 */
export function initGenerationPage() {
    console.log('⚡ Initializing Generation Page...');

    // 获取 DOM 元素
    papersListEl = document.getElementById('papers-list');
    btnStartGen = document.getElementById('btn-start-generation');
    paperNameInput = document.getElementById('paper-name-input');
    generationComplete = document.getElementById('generation-complete');
    stepPrompts = document.getElementById('step-prompts');
    stepInputs = document.getElementById('step-inputs');
    stepRetrieval = document.getElementById('step-retrieval');
    stepAnalysis = document.getElementById('step-analysis');

    // 绑定生成按钮
    if (btnStartGen) {
        btnStartGen.onclick = handleStartGeneration;
    }

    // 渲染 Papers 列表
    renderPapersList();
}

/**
 * 渲染 Papers 列表
 * @param {string} activePaperId - 当前激活的 paper ID
 */
function renderPapersList(activePaperId = null) {
    if (!papersListEl) return;

    currentActivePaperId = activePaperId;
    const papers = store.papers.filter(p => p.projectId === store.currentProjectId);

    if (papers.length === 0) {
        papersListEl.innerHTML = `
            <div class="empty-papers">
                <i class="fa-regular fa-folder-open"></i>
                <p>No papers yet</p>
            </div>`;
        return;
    }

    papersListEl.innerHTML = '';
    papers.forEach(p => {
        const div = document.createElement('div');
        div.className = `paper-item ${p.id === activePaperId ? 'active' : ''}`;
        div.setAttribute('data-paper-id', p.id);
        div.innerHTML = `
            <span class="paper-name">${p.name}</span>
            <div class="paper-meta">
                <span><i class="fa-regular fa-calendar"></i> ${new Date(p.createdAt).toLocaleDateString()}</span>
                <span><i class="fa-solid fa-shield"></i> ${p.results?.length || 0} risks</span>
            </div>
        `;
        div.onclick = () => viewPaperLogs(p.id);
        papersListEl.appendChild(div);
    });
}

/**
 * 查看 Paper 的生成日志
 * @param {string} paperId - paper ID
 */
function viewPaperLogs(paperId) {
    const paper = store.getPaper(paperId);
    if (!paper) return;

    console.log('📄 Viewing Paper Logs:', paper.name);

    // 更新侧边栏激活状态
    renderPapersList(paperId);

    // 重置步骤
    resetSteps();

    // 隐藏完成消息
    if (generationComplete) generationComplete.classList.add('hidden');

    // 显示步骤数据
    displayPaperSteps(paper);
}

/**
 * 显示 Paper 的生成步骤数据
 * @param {Object} paper - paper 对象
 */
function displayPaperSteps(paper) {
    // Step 1: Prompts
    setStepStatus(stepPrompts, 'completed');
    document.getElementById('step-data-prompts')?.classList.add('expanded');
    if (paper.capturedData?.prompts) {
        setTextContent('captured-module1', truncate(paper.capturedData.prompts.module1, 150));
        setTextContent('captured-module3', truncate(paper.capturedData.prompts.module3, 150));
        setTextContent('captured-module4', truncate(paper.capturedData.prompts.module4, 150));
    }

    // Step 2: User Inputs
    setStepStatus(stepInputs, 'completed');
    document.getElementById('step-data-inputs')?.classList.add('expanded');
    if (paper.capturedData?.userInputs) {
        setTextContent('captured-background', truncate(paper.capturedData.userInputs.background, 200));
        setTextContent('captured-flow', truncate(paper.capturedData.userInputs.flow, 200));
        // API Endpoint 现在从全局设置读取
        const apiEndpoint = store.getSetting('apiEndpoint', '');
        setTextContent('captured-api', apiEndpoint || '--');
    }

    // Step 3: Historical Cases
    if (stepRetrieval) {
        setStepStatus(stepRetrieval, 'completed');
        document.getElementById('step-data-retrieval')?.classList.add('expanded');
        displayRetrievedCases(paper.capturedData?.historicalCases);
    }

    // Step 4: Analysis
    setStepStatus(stepAnalysis, 'completed');
    document.getElementById('step-data-analysis')?.classList.add('expanded');
    const progressBar = document.getElementById('analysis-progress-bar');
    const currentCat = document.getElementById('analysis-current-cat');
    const progressText = document.getElementById('analysis-progress-text');
    if (progressBar) progressBar.style.width = '100%';
    if (currentCat) currentCat.textContent = 'Completed';
    if (progressText) progressText.textContent = `${paper.results?.length || 0} categories analyzed`;
}

/**
 * 开始生成风险评估
 */
async function handleStartGeneration() {
    const proj = store.getProject(store.currentProjectId);
    if (!proj) return;

    const paperName = paperNameInput?.value?.trim() || `Risk Paper ${new Date().toLocaleString()}`;

    console.log('🚀 Starting Generation:', paperName);

    // 重置 UI
    resetSteps();
    if (btnStartGen) btnStartGen.disabled = true;

    // 创建 paper 对象
    const paper = {
        id: 'paper_' + Date.now(),
        name: paperName,
        createdAt: new Date().toISOString(),
        projectId: proj.id,
        status: 'generating',
        capturedData: { prompts: {}, userInputs: {}, historicalCases: [] },
        generationLogs: [],
        results: []
    };

    // 模拟生成流程（Demo）
    await simulateGeneration(paper, proj);

    // 保存 paper
    store.addPaper(paper);

    if (btnStartGen) btnStartGen.disabled = false;
    if (generationComplete) generationComplete.classList.remove('hidden');

    renderPapersList(paper.id);
}

/**
 * 模拟生成流程（Demo 用途）
 * @param {Object} paper - paper 对象
 * @param {Object} proj - 项目对象
 */
async function simulateGeneration(paper, proj) {
    // Step 1: 获取 Prompts
    setStepStatus(stepPrompts, 'active');
    await delay(800);
    paper.capturedData.prompts = proj.prompts || {};
    setStepStatus(stepPrompts, 'completed');
    await delay(500);

    // Step 2: 获取用户输入
    setStepStatus(stepInputs, 'active');
    await delay(600);
    paper.capturedData.userInputs = proj.inputs || {};
    setStepStatus(stepInputs, 'completed');
    await delay(500);

    // Step 3: 检索历史案例
    if (stepRetrieval) {
        setStepStatus(stepRetrieval, 'active');
        await delay(1200);
        paper.capturedData.historicalCases = [
            { title: "Similar Assessment (Mock)", similarity: 0.90 }
        ];
        setStepStatus(stepRetrieval, 'completed');
        await delay(500);
    }

    // Step 4: 生成风险分析（使用 mock 数据）
    setStepStatus(stepAnalysis, 'active');
    await delay(1000);
    
    // 如果有 BACKEND_DATA_JSON，使用它；否则生成示例数据
    if (typeof BACKEND_DATA_JSON !== 'undefined' && BACKEND_DATA_JSON.length > 0) {
        paper.results = BACKEND_DATA_JSON.map((d, i) => ({
            id: `risk_${Date.now()}_${i}`,
            category: { level1: 'Data Risk', level2: 'Data Governance', level3: d.risk_details?.risk_title || 'Risk' },
            is_applicable: d.is_applicable === "true" || d.is_applicable === true,
            status: 'draft',
            risk_details: d.risk_details
        }));
    }
    
    setStepStatus(stepAnalysis, 'completed');
    paper.status = 'completed';
}

/**
 * 设置步骤状态
 * @param {HTMLElement} stepEl - 步骤元素
 * @param {string} status - 状态 ('pending', 'active', 'completed')
 */
function setStepStatus(stepEl, status) {
    if (!stepEl) return;
    stepEl.setAttribute('data-status', status);
    const badge = stepEl.querySelector('.status-badge');
    if (badge) {
        badge.className = `status-badge ${status}`;
        badge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
    }
}

/**
 * 重置所有步骤
 */
function resetSteps() {
    [stepPrompts, stepInputs, stepRetrieval, stepAnalysis].forEach(step => {
        if (step) {
            setStepStatus(step, 'pending');
            const dataEl = step.querySelector('.step-data');
            if (dataEl) dataEl.classList.remove('expanded');
        }
    });

    if (generationComplete) generationComplete.classList.add('hidden');
}

/**
 * 显示检索到的历史案例
 * @param {Array} cases - 案例数组
 */
function displayRetrievedCases(cases) {
    const el = document.getElementById('captured-cases');
    if (!el) return;

    if (cases && cases.length > 0) {
        el.innerHTML = cases.map(c => `
            <div class="retrieved-case">
                <div class="case-header">
                    <span class="case-title">${c.title}</span>
                    <span class="case-score">${Math.round(c.similarity * 100)}% Match</span>
                </div>
            </div>
        `).join('');
    } else {
        el.innerHTML = '<em style="color:var(--text-secondary);font-size:0.8rem;">No cases retrieved.</em>';
    }
}

// 暴露给全局使用（供 HTML onclick 使用）
window.toggleStepData = function (stepName) {
    const el = document.getElementById('step-data-' + stepName);
    if (el) el.classList.toggle('expanded');
};

