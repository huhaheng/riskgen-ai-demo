/**
 * =============================================================================
 * ROUTER - 应用路由管理
 * =============================================================================
 * 管理应用的视图切换和导航
 */

import { store } from './store.js';
import { initDashboard, renderProjectList } from './dashboard.js';
import { initKnowledgeBase } from './knowledge.js';
import { loadWorkspace, initWorkspaceEvents } from './workspace.js';
import { toggleVisibility } from './utils.js';

/**
 * Router 对象 - 管理应用的页面导航
 */
export const router = {
    /**
     * 初始化路由器和应用
     */
    init() {
        console.log('🚀 RiskGen AI Application Starting...');

        // 获取视图容器
        this.dashboardView = document.getElementById('view-dashboard');
        this.workspaceView = document.getElementById('view-workspace');

        // 初始化各个模块
        initDashboard();
        initKnowledgeBase();
        initWorkspaceEvents();

        // 默认显示 Dashboard
        this.renderDashboard();
        
        console.log('✅ Application Initialized');
    },

    /**
     * 渲染 Dashboard 视图
     */
    renderDashboard() {
        console.log('📊 Rendering Dashboard');
        
        toggleVisibility(this.dashboardView, true);
        toggleVisibility(this.workspaceView, false);

        // 刷新项目列表
        renderProjectList();
    },

    /**
     * 打开项目工作区
     * @param {string} id - 项目 ID
     */
    openProject(id) {
        console.log('📂 Opening Project:', id);
        
        store.currentProjectId = id;
        const project = store.getProject(id);

        if (!project) {
            console.error('❌ Project not found:', id);
            alert('项目未找到');
            return;
        }

        // 加载项目到工作区
        loadWorkspace(project);

        // 切换视图
        toggleVisibility(this.dashboardView, false);
        toggleVisibility(this.workspaceView, true);
    },

    /**
     * 返回 Dashboard
     */
    backToDashboard() {
        console.log('🔙 Back to Dashboard');
        this.renderDashboard();
    }
};

// 暴露给全局使用（供 HTML onclick 等使用）
window.appRouter = router;

