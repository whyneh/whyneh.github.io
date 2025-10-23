/**
 * 首次加载
 */
document.addEventListener('DOMContentLoaded', () => {
    /**
     * 标题动态变化
     */
    let ywwTitle = document.title;
    let ywwtitleTime;
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.innerHTML = '<link rel="icon"/>';
            document.title = 'aya 崩溃啦';
            clearTimeout(ywwtitleTime);
        } else {
            document.innerHTML = '<link rel="icon"/>';
            document.title = 'ya 又好了';
            ywwtitleTime = setTimeout(function() {
                document.title = ywwTitle;
            }, 2000);
        }
    });

    /**
     * 打印欢迎语
     */
    console.info("%c whyne %c 欢迎来到我的博客！", "padding: 2px 6px; border-radius: 3px 0 0 3px; color: #fff; background: #8EC5FC; font-weight: bold;", "padding: 2px 6px; border-radius: 0 3px 3px 0; color: #fff; background: #CD9DFA; font-weight: bold;");

});
