/**
 * =============================================================================
 * MAIN ENTRY POINT - RiskGen AI Application
 * =============================================================================
 * 应用的主入口文件，负责初始化和启动整个应用
 * 
 * @author RiskGen AI Team
 * @version 1.0.0
 */

import { router } from './router.js';

/**
 * 应用启动函数
 * 在 DOM 加载完成后初始化整个应用
 */
function initApp() {
    console.log('🎯 RiskGen AI - Operational Risk Assessment Platform');
    console.log('📅 Loaded at:', new Date().toLocaleString());
    
    try {
        // 等待一小段时间，确保数据文件已加载
        setTimeout(() => {
            // 检查数据是否加载
            if (window.KNOWLEDGE_CASES) {
                console.log('✅ Knowledge Base data loaded:', window.KNOWLEDGE_CASES.length, 'cases');
            }
            if (window.BACKEND_DATA_JSON) {
                console.log('✅ Demo risk data loaded:', window.BACKEND_DATA_JSON.length, 'risks');
            }
            
            // 初始化路由器（会自动初始化所有子模块）
            router.init();
            
            console.log('✅ Application successfully initialized');
        }, 50);
    } catch (error) {
        console.error('❌ Application initialization failed:', error);
        alert('应用初始化失败，请刷新页面重试');
    }
}

// 等待 DOM 加载完成后启动应用
document.addEventListener('DOMContentLoaded', initApp);

// 暴露一些全局工具函数用于调试
if (typeof window !== 'undefined') {
    window.RiskGenApp = {
        version: '1.0.0',
        router: router,
        // 可以在这里添加更多调试工具
    };
}

