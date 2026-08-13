// wwwroot/js/manimInterop.js
let activeScene = null;

export function initializeScene(containerId, width, height) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 从全局变量 ManimWeb 中获取
    const { Scene } = window.ManimWeb;
    const options = { width, height };
    activeScene = new Scene(container, options);
    return true;
}

export async function playAnimation(animationScript) {
    if (!activeScene) return;
    
    const { Circle, Square, Create, Transform, FadeOut } = window.ManimWeb;
    const scene = activeScene;
    
    try {
        const asyncFn = new Function('scene', 'Circle', 'Square', 'Create', 'Transform', 'FadeOut', `
            return (async function() {
                ${animationScript}
            })();
        `);
        await asyncFn(scene, Circle, Square, Create, Transform, FadeOut);
    } catch (error) {
        console.error('Animation error:', error);
        throw error;
    }
}