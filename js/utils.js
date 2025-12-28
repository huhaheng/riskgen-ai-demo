/**
 * =============================================================================
 * UTILITY FUNCTIONS
 * =============================================================================
 * 通用工具函数，提供常用的辅助功能
 */

/**
 * 延迟执行函数
 * @param {number} ms - 延迟的毫秒数
 * @returns {Promise} - 延迟后解析的 Promise
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 截断文本到指定长度
 * @param {string} str - 要截断的字符串
 * @param {number} n - 最大长度
 * @returns {string} - 截断后的字符串
 */
export const truncate = (str, n) => {
    if (!str) return '';
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
};

/**
 * 生成唯一 ID
 * @param {string} prefix - ID 前缀
 * @returns {string} - 生成的唯一 ID
 */
export const generateId = (prefix = 'id') => {
    return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 防抖函数 - 限制函数执行频率
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} - 防抖后的函数
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 格式化日期
 * @param {string|Date} date - 要格式化的日期
 * @returns {string} - 格式化后的日期字符串
 */
export const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
};

/**
 * 安全地设置 DOM 元素的文本内容
 * @param {string} id - 元素 ID
 * @param {string} text - 要设置的文本
 */
export const setTextContent = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
};

/**
 * 安全地获取 DOM 元素
 * @param {string} selector - CSS 选择器
 * @returns {HTMLElement|null} - 找到的元素或 null
 */
export const getElement = (selector) => {
    return document.querySelector(selector);
};

/**
 * 安全地获取多个 DOM 元素
 * @param {string} selector - CSS 选择器
 * @returns {NodeList} - 找到的元素列表
 */
export const getElements = (selector) => {
    return document.querySelectorAll(selector);
};

/**
 * 切换元素的 class
 * @param {HTMLElement} element - DOM 元素
 * @param {string} className - class 名称
 * @param {boolean} force - 强制添加或移除
 */
export const toggleClass = (element, className, force) => {
    if (!element) return;
    element.classList.toggle(className, force);
};

/**
 * 显示/隐藏元素
 * @param {HTMLElement|string} elementOrId - DOM 元素或元素 ID
 * @param {boolean} show - true 显示，false 隐藏
 */
export const toggleVisibility = (elementOrId, show) => {
    const element = typeof elementOrId === 'string' 
        ? document.getElementById(elementOrId) 
        : elementOrId;
    if (element) {
        element.classList.toggle('hidden', !show);
    }
};

