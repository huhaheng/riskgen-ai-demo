/**
 * =============================================================================
 * DASHBOARD - 项目仪表板
 * =============================================================================
 * 管理项目列表和知识库标签页的切换
 */

import { store } from './store.js';
import { formatDate } from './utils.js';
import { initSettings, showSettingsTab, hideSettingsTab } from './settings.js';

// DOM 元素引用
let projectListEl;
let btnCreateProject;
let modalNewProject;
let inpNewProjectName;
let btnConfirmNew;
let btnCancelNew;
let navProjects;
let navKnowledge;
let navSettings;
let tabProjects;
let tabKnowledge;
let tabSettings;

/**
 * 初始化 Dashboard
 */
export function initDashboard() {
    console.log('📋 Initializing Dashboard...');

    // 获取 DOM 元素
    projectListEl = document.getElementById('project-list');
    btnCreateProject = document.getElementById('btn-create-project');
    modalNewProject = document.getElementById('modal-new-project');
    inpNewProjectName = document.getElementById('new-project-name');
    btnConfirmNew = document.getElementById('btn-confirm-new');
    btnCancelNew = document.getElementById('btn-cancel-new');
    navProjects = document.getElementById('nav-projects');
    navKnowledge = document.getElementById('nav-knowledge');
    navSettings = document.getElementById('nav-settings');
    tabProjects = document.getElementById('tab-projects');
    tabKnowledge = document.getElementById('tab-knowledge');
    tabSettings = document.getElementById('tab-settings');

    // 绑定事件
    bindDashboardEvents();

    // 初始化 Settings
    initSettings();

    // 初始渲染
    renderProjectList();
}

/**
 * 绑定 Dashboard 事件监听器
 */
function bindDashboardEvents() {
    // 创建项目按钮
    if (btnCreateProject) {
        btnCreateProject.onclick = () => {
            if (modalNewProject) {
                modalNewProject.classList.remove('hidden');
                if (inpNewProjectName) inpNewProjectName.focus();
            }
        };
    }

    // 取消按钮
    if (btnCancelNew) {
        btnCancelNew.onclick = () => {
            if (modalNewProject) modalNewProject.classList.add('hidden');
        };
    }

    // 确认创建按钮
    if (btnConfirmNew) {
        btnConfirmNew.onclick = handleCreateProject;
    }

    // Tab 切换
    if (navProjects) navProjects.onclick = () => showDashboardTab('projects');
    if (navKnowledge) navKnowledge.onclick = () => showDashboardTab('knowledge');
    if (navSettings) navSettings.onclick = () => showDashboardTab('settings');
}

/**
 * 渲染项目列表
 */
export function renderProjectList() {
    if (!projectListEl) return;

    projectListEl.innerHTML = '';

    if (store.projects.length === 0) {
        projectListEl.innerHTML = `
            <div style="grid-column: 1/-1; text-align:center; padding:3rem; color:#64748B;">
                <i class="fa-regular fa-folder-open" style="font-size:3rem;margin-bottom:1rem;display:block;"></i>
                <p>No projects yet. Create your first project to get started!</p>
            </div>
        `;
        return;
    }

    store.projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const risksCount = p.results?.length || 0;
        const statusText = risksCount > 0 ? `${risksCount} Risks` : 'Draft';
        
        card.innerHTML = `
            <h3>${p.name}</h3>
            <div class="meta">
                <span><i class="fa-regular fa-clock"></i> ${formatDate(p.created)}</span>
                <span>${statusText}</span>
            </div>
        `;
        
        card.onclick = () => {
            if (window.appRouter && window.appRouter.openProject) {
                window.appRouter.openProject(p.id);
            }
        };
        
        projectListEl.appendChild(card);
    });
}

/**
 * 处理创建新项目
 */
function handleCreateProject() {
    const name = inpNewProjectName.value.trim();
    
    if (!name) {
        alert('Please enter a project name');
        return;
    }

    const newProj = store.createProject(name);
    console.log('✨ Created new project:', newProj.name);

    // 关闭 modal
    if (modalNewProject) modalNewProject.classList.add('hidden');
    if (inpNewProjectName) inpNewProjectName.value = '';

    // 打开新项目
    if (window.appRouter) {
        window.appRouter.openProject(newProj.id);
    }
}

/**
 * 切换 Dashboard 标签页
 * @param {string} tabName - 标签页名称 ('projects', 'knowledge', 或 'settings')
 */
export function showDashboardTab(tabName) {
    console.log('🔄 Switching Dashboard Tab:', tabName);

    // 更新导航激活状态
    if (navProjects) {
        navProjects.classList.toggle('active', tabName === 'projects');
    }
    if (navKnowledge) {
        navKnowledge.classList.toggle('active', tabName === 'knowledge');
    }
    if (navSettings) {
        navSettings.classList.toggle('active', tabName === 'settings');
    }

    // 更新标签页显示/隐藏
    if (tabProjects) {
        if (tabName === 'projects') {
            tabProjects.classList.add('active');
            tabProjects.classList.remove('hidden');
        } else {
            tabProjects.classList.remove('active');
            tabProjects.classList.add('hidden');
        }
    }

    if (tabKnowledge) {
        if (tabName === 'knowledge') {
            tabKnowledge.classList.add('active');
            tabKnowledge.classList.remove('hidden');
            
            // 延迟初始化 Knowledge Base，确保数据已加载
            if (window.initKnowledgeBaseNow) {
                window.initKnowledgeBaseNow();
            }
        } else {
            tabKnowledge.classList.remove('active');
            tabKnowledge.classList.add('hidden');
        }
    }

    if (tabSettings) {
        if (tabName === 'settings') {
            showSettingsTab();
        } else {
            hideSettingsTab();
        }
    }
}

// 暴露给全局使用（供 HTML onclick 使用）
window.showDashboardTab = showDashboardTab;

