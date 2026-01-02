/**
 * =============================================================================
 * SETTINGS - 应用设置页面
 * =============================================================================
 * 管理应用程序的全局设置和配置
 */

import { store } from './store.js';

// DOM 元素引用
let settingsForm;
let inpApiEndpoint;
let navSettings;
let tabSettings;

/**
 * 初始化 Settings 页面
 */
export function initSettings() {
    console.log('⚙️ Initializing Settings...');

    // 获取 DOM 元素
    settingsForm = document.getElementById('settings-form');
    inpApiEndpoint = document.getElementById('settings-api-endpoint');
    navSettings = document.getElementById('nav-settings');
    tabSettings = document.getElementById('tab-settings');

    // 绑定事件
    bindSettingsEvents();

    // 加载当前设置
    loadSettings();
}

/**
 * 绑定设置页面事件监听器
 */
function bindSettingsEvents() {
    // 表单提交
    if (settingsForm) {
        settingsForm.onsubmit = handleSaveSettings;
    }
}

/**
 * 加载设置
 */
function loadSettings() {
    const settings = store.getSettings();
    
    if (inpApiEndpoint) {
        inpApiEndpoint.value = settings.apiEndpoint || '';
    }
}

/**
 * 保存设置
 * @param {Event} e - 表单提交事件
 */
function handleSaveSettings(e) {
    e.preventDefault();

    const settings = {
        apiEndpoint: inpApiEndpoint?.value.trim() || ''
    };

    store.saveSettings(settings);

    // 显示成功提示
    const submitBtn = settingsForm.querySelector('button[type="submit"]');
    if (submitBtn) {
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Saved!';
        submitBtn.disabled = true;
        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
        }, 2000);
    }

    console.log('✅ Settings saved:', settings);
}

/**
 * 显示 Settings 标签页
 */
export function showSettingsTab() {
    console.log('🔄 Showing Settings Tab');

    // 更新导航激活状态
    if (navSettings) {
        navSettings.classList.add('active');
    }
    
    // 隐藏其他标签页的激活状态（在 dashboard.js 中处理）
    
    // 显示设置标签页
    if (tabSettings) {
        tabSettings.classList.add('active');
        tabSettings.classList.remove('hidden');
    }

    // 重新加载设置（确保显示最新值）
    loadSettings();
}

/**
 * 隐藏 Settings 标签页
 */
export function hideSettingsTab() {
    if (tabSettings) {
        tabSettings.classList.remove('active');
        tabSettings.classList.add('hidden');
    }
    
    if (navSettings) {
        navSettings.classList.remove('active');
    }
}

