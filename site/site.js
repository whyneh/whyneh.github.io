// 检查当前页面是否是/site页面（通过检查是否存在github-commits元素）
if (document.getElementById('github-commits')) {
    void loadGithubCommits();
}

async function loadGithubCommits() {
    const container = document.getElementById('github-commits');

    // 显示加载状态
    if (container) {
        container.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> 正在加载提交记录...</div>';
    }

    try {
        // github的API
        const apiUrl = `https://blog.yww52.com/whyne/github/getCommits/4`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const commits = await response.json();
        renderCommits(commits, container);
    } catch (error) {
        console.error('获取GitHub提交记录失败:', error);
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    无法加载提交记录，请稍后再试<br>
                    <small>错误信息: ${escapeHtml(error.message)}</small>
                </div>
            `;
        }
    }
}

/**
 * 获取到github提交数据后，修改DOM结构，展示出来
 */
function renderCommits(commits, container) {
    if (!container) return;

    if (commits.length === 0) {
        container.innerHTML = '<div class="error-message">暂无提交记录</div>';
        return;
    }

    let html = '';
    commits.forEach((commit, index) => {
        const date = new Date(commit.commit.author.date);
        const formattedDate = date.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        const message = commit.commit.message.split('\n')[0]; // 只显示第一行

        // 为每个提交项添加延迟动画
        html += `
            <div class="commit-item" style="animation-delay: ${index * 0.1}s">
                <div class="commit-content">
                    <div class="commit-message">${escapeHtml(message)}</div>
                    <div class="commit-meta">
                        <span class="commit-date">
                            <i class="fas fa-clock"></i>
                            ${formattedDate}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/**
 * HTML转义函数
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
