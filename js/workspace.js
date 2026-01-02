/**
 * =============================================================================
 * WORKSPACE - 项目工作区
 * =============================================================================
 * 管理项目的输入数据、Prompt 编辑等功能
 */

import { store } from './store.js';
import { DEFAULT_PROMPT_MODULES } from './config.js';
import { initGenerationPage } from './generation.js';
import { initReportPage } from './report.js';

// DOM 元素引用
let wsProjectName;
let btnBackDashboard;
let wsNavLinks;
let tabPanes;
let inpProjectName;
let inpBackground;
let inpFlow;
let formProject;
let promptNavBtns;
let promptEditorTextarea;
let currentModuleLabel;
let btnSavePrompt;
let btnResetPrompt;

let activeModule = 'module1';

/**
 * 初始化工作区事件监听器
 */
export function initWorkspaceEvents() {
    console.log('⚙️ Initializing Workspace Events...');

    // 获取 DOM 元素
    wsProjectName = document.getElementById('ws-project-name');
    btnBackDashboard = document.getElementById('btn-back-dashboard');
    wsNavLinks = document.querySelectorAll('.ws-nav-links li');
    tabPanes = document.querySelectorAll('.tab-pane');
    inpProjectName = document.getElementById('inp-projectName');
    inpBackground = document.getElementById('inp-background');
    inpFlow = document.getElementById('inp-flow');
    formProject = document.getElementById('project-form');
    promptNavBtns = document.querySelectorAll('.prompt-nav-btn');
    promptEditorTextarea = document.getElementById('prompt-editor-textarea');
    currentModuleLabel = document.getElementById('current-module-label');
    btnSavePrompt = document.getElementById('btn-save-prompt');
    btnResetPrompt = document.getElementById('btn-reset-prompt');

    // 返回 Dashboard 按钮
    if (btnBackDashboard) {
        btnBackDashboard.onclick = () => {
            if (window.appRouter) {
                window.appRouter.backToDashboard();
            }
        };
    }

    // 工作区导航链接
    wsNavLinks.forEach(link => {
        link.onclick = () => {
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
        };
    });

    // 表单提交
    if (formProject) {
        formProject.onsubmit = handleFormSubmit;
    }

    // Prompt 编辑器导航
    promptNavBtns.forEach(btn => {
        btn.onclick = () => {
            const mod = 'module' + btn.getAttribute('data-module');
            loadPromptEditor(store.getProject(store.currentProjectId), mod);
        };
    });

    // Prompt 编辑器按钮
    if (btnSavePrompt) btnSavePrompt.onclick = handleSavePrompt;
    if (btnResetPrompt) btnResetPrompt.onclick = handleResetPrompt;

    // 文件拖放区（Mock 功能）
    const dropZone = document.getElementById('doc-drop-zone');
    if (dropZone) {
        dropZone.onclick = () => {
            // Demo: 模拟文件上传
            handleFiles([{ name: 'Project_Spec_v2.pdf' }]);
        };
    }
}

/**
 * 加载项目到工作区
 * @param {Object} project - 项目对象
 */
export function loadWorkspace(project) {
    if (!project) return;

    console.log('📂 Loading Workspace for:', project.name);

    // 1. 更新标题
    if (wsProjectName) wsProjectName.textContent = project.name;

    // 2. 加载输入数据
    if (inpProjectName) inpProjectName.value = project.name;
    if (inpBackground) inpBackground.value = project.inputs.background || '';
    if (inpFlow) inpFlow.value = project.inputs.flow || '';

    // 3. 加载 Prompt 编辑器
    loadPromptEditor(project, 'module1');

    // 4. 重置到第一个标签页
    switchTab('tab-input');
}

/**
 * 切换工作区标签页
 * @param {string} tabId - 标签页 ID
 */
function switchTab(tabId) {
    console.log('🔄 Switching Workspace Tab:', tabId);

    // 更新导航激活状态
    wsNavLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-tab') === tabId);
    });

    // 更新标签页显示/隐藏
    tabPanes.forEach(p => {
        p.classList.toggle('active', p.id === tabId);
    });

    // 标签页特定的初始化
    if (tabId === 'tab-generate') {
        initGenerationPage();
    } else if (tabId === 'tab-report') {
        const proj = store.getProject(store.currentProjectId);
        initReportPage(proj);
    }
}

/**
 * 处理表单提交
 * @param {Event} e - 表单提交事件
 */
function handleFormSubmit(e) {
    e.preventDefault();

    const proj = store.getProject(store.currentProjectId);
    if (!proj) return;

    // 更新项目数据
    store.updateProject(proj.id, {
        name: inpProjectName.value,
        inputs: {
            background: inpBackground.value,
            flow: inpFlow.value
        }
    });

    // 更新标题显示
    if (wsProjectName) wsProjectName.textContent = inpProjectName.value;

    alert('✅ Project configuration saved.');
}

/**
 * 加载 Prompt 编辑器
 * @param {Object} project - 项目对象
 * @param {string} moduleKey - 模块键名
 */
function loadPromptEditor(project, moduleKey) {
    if (!project) return;

    activeModule = moduleKey;

    // 更新侧边栏 UI
    promptNavBtns.forEach(btn => {
        const isActive = btn.getAttribute('data-module') === moduleKey.replace('module', '');
        btn.classList.toggle('active', isActive);
    });

    // 更新标签
    const moduleTitles = {
        'module1': 'Module 1: Role & Context',
        'module3': 'Module 3: Guidelines',
        'module4': 'Module 4: Instructions'
    };
    if (currentModuleLabel) {
        currentModuleLabel.textContent = moduleTitles[moduleKey] || moduleKey;
    }

    // 加载内容
    if (promptEditorTextarea) {
        promptEditorTextarea.value = project.prompts[moduleKey] || DEFAULT_PROMPT_MODULES[moduleKey] || '';
    }
}

/**
 * 保存 Prompt
 */
function handleSavePrompt() {
    const proj = store.getProject(store.currentProjectId);
    if (!proj) return;

    proj.prompts[activeModule] = promptEditorTextarea.value;
    store.updateProject(proj.id, { prompts: proj.prompts });

    // 反馈动画
    const originalText = btnSavePrompt.textContent;
    btnSavePrompt.textContent = '✓ Saved!';
    setTimeout(() => {
        btnSavePrompt.textContent = originalText;
    }, 1500);
}

/**
 * 重置 Prompt 到默认值
 */
function handleResetPrompt() {
    if (confirm('Reset this module to default template?')) {
        if (promptEditorTextarea) {
            promptEditorTextarea.value = DEFAULT_PROMPT_MODULES[activeModule] || '';
        }
    }
}

/**
 * 处理文件上传（Mock）
 * @param {Array} files - 文件列表
 */
function handleFiles(files) {
    const fileList = document.getElementById('uploaded-files-list');
    if (!fileList) return;

    fileList.innerHTML = '';
    files.forEach(f => {
        const div = document.createElement('div');
        div.className = 'file-item';
        div.innerHTML = `
            <i class="fa-regular fa-file-pdf"></i> ${f.name} 
            <span style="font-size:0.8em; color:#999;">(Parsed)</span>
        `;
        div.style.padding = '0.5rem';
        div.style.background = '#F1F5F9';
        div.style.borderRadius = '4px';
        div.style.marginTop = '0.5rem';
        fileList.appendChild(div);
    });

    // Mock: 自动填充内容
    if (inpBackground && !inpBackground.value) {
        inpBackground.value = `Parsed from ${files[0].name}:\nProject aims to migrate legacy on-prem CRM to Salesforce Cloud. Key drivers are cost reduction and mobile access.`;
        if (inpFlow) {
            inpFlow.value = "Current: Sales team uses VPN to access Windows App.\nNew: Web-based SSO login via Okta, mobile app available.";
        }
    }
}

