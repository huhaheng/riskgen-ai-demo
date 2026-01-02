/**
 * =============================================================================
 * DATA STORE MANAGEMENT
 * =============================================================================
 * 管理应用的本地数据存储（使用 localStorage）
 */

import { DEFAULT_PROMPT_MODULES, STORAGE_KEYS } from './config.js';

/**
 * Store 类 - 管理项目和风险评估报告的本地存储
 */
export class Store {
    constructor() {
        // 从 localStorage 加载数据
        this.projects = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || [];
        this.papers = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAPERS)) || [];
        this.currentProjectId = null;
        this.settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || {};
    }

    // =========================================================================
    // PROJECT MANAGEMENT - 项目管理
    // =========================================================================

    /**
     * 保存所有项目到 localStorage
     */
    saveProjects() {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(this.projects));
    }

    /**
     * 创建新项目
     * @param {string} name - 项目名称
     * @returns {Object} - 新创建的项目对象
     */
    createProject(name) {
        const newProject = {
            id: 'proj_' + Date.now(),
            name: name,
            created: new Date().toISOString(),
            // 输入数据
            inputs: {
                background: '',
                flow: ''
            },
            // 自定义 Prompts（初始值为默认模板）
            prompts: { ...DEFAULT_PROMPT_MODULES },
            // 评估结果（保留用于向后兼容，现在使用 papers）
            results: []
        };
        this.projects.unshift(newProject);
        this.saveProjects();
        return newProject;
    }

    /**
     * 根据 ID 获取项目
     * @param {string} id - 项目 ID
     * @returns {Object|undefined} - 项目对象或 undefined
     */
    getProject(id) {
        return this.projects.find(p => p.id === id);
    }

    /**
     * 更新项目
     * @param {string} id - 项目 ID
     * @param {Object} updates - 要更新的字段
     */
    updateProject(id, updates) {
        const idx = this.projects.findIndex(p => p.id === id);
        if (idx !== -1) {
            this.projects[idx] = { ...this.projects[idx], ...updates };
            this.saveProjects();
        }
    }

    /**
     * 删除项目
     * @param {string} id - 项目 ID
     */
    deleteProject(id) {
        this.projects = this.projects.filter(p => p.id !== id);
        this.saveProjects();
    }

    // =========================================================================
    // PAPER MANAGEMENT - 风险评估报告管理
    // =========================================================================

    /**
     * 保存所有 papers 到 localStorage
     */
    savePapers() {
        localStorage.setItem(STORAGE_KEYS.PAPERS, JSON.stringify(this.papers));
    }

    /**
     * 添加新的 risk paper
     * @param {Object} paper - paper 对象
     */
    addPaper(paper) {
        this.papers.unshift(paper);
        this.savePapers();
    }

    /**
     * 根据 ID 获取 paper
     * @param {string} id - paper ID
     * @returns {Object|undefined} - paper 对象或 undefined
     */
    getPaper(id) {
        return this.papers.find(p => p.id === id);
    }

    /**
     * 更新 paper
     * @param {string} id - paper ID
     * @param {Object} updates - 要更新的字段
     */
    updatePaper(id, updates) {
        const idx = this.papers.findIndex(p => p.id === id);
        if (idx !== -1) {
            this.papers[idx] = { ...this.papers[idx], ...updates };
            this.savePapers();
        }
    }

    /**
     * 获取特定项目的所有 papers
     * @param {string} projectId - 项目 ID
     * @returns {Array} - paper 数组
     */
    getPapersByProject(projectId) {
        return this.papers.filter(p => p.projectId === projectId);
    }

    /**
     * 删除 paper
     * @param {string} id - paper ID
     */
    deletePaper(id) {
        this.papers = this.papers.filter(p => p.id !== id);
        this.savePapers();
    }

    // =========================================================================
    // SETTINGS MANAGEMENT - 设置管理
    // =========================================================================

    /**
     * 保存设置到 localStorage
     * @param {Object} settings - 设置对象
     */
    saveSettings(settings) {
        this.settings = { ...this.settings, ...settings };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
    }

    /**
     * 获取设置
     * @returns {Object} - 设置对象
     */
    getSettings() {
        return this.settings || {};
    }

    /**
     * 获取特定设置项
     * @param {string} key - 设置键名
     * @param {*} defaultValue - 默认值
     * @returns {*} - 设置值
     */
    getSetting(key, defaultValue = '') {
        return this.settings?.[key] || defaultValue;
    }

    // =========================================================================
    // UTILITY METHODS - 工具方法
    // =========================================================================

    /**
     * 清空所有数据（用于测试或重置）
     */
    clearAll() {
        this.projects = [];
        this.papers = [];
        this.settings = {};
        this.currentProjectId = null;
        localStorage.removeItem(STORAGE_KEYS.PROJECTS);
        localStorage.removeItem(STORAGE_KEYS.PAPERS);
        localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    }

    /**
     * 导出所有数据
     * @returns {Object} - 包含所有数据的对象
     */
    exportData() {
        return {
            projects: this.projects,
            papers: this.papers,
            settings: this.settings,
            exportDate: new Date().toISOString()
        };
    }

    /**
     * 导入数据
     * @param {Object} data - 要导入的数据
     */
    importData(data) {
        if (data.projects) {
            this.projects = data.projects;
            this.saveProjects();
        }
        if (data.papers) {
            this.papers = data.papers;
            this.savePapers();
        }
        if (data.settings) {
            this.settings = data.settings;
            this.saveSettings(this.settings);
        }
    }
}

// 创建全局 store 实例
export const store = new Store();

