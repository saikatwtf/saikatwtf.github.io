// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    const container = document.getElementById('repos-container');
    
    try {
        const response = await fetch('https://api.github.com/users/saikatwtf/repos?sort=updated&per_page=6');
        const repos = await response.json();
        
        container.innerHTML = repos.map(repo => `
            <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${repo.name}</h3>
                    <div class="flex items-center text-yellow-500">
                        <span class="text-sm">⭐ ${repo.stargazers_count}</span>
                    </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${repo.description || 'No description available'}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        ${repo.language || 'Unknown'}
                    </span>
                    <a href="${repo.html_url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">
                        View Code →
                    </a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        container.innerHTML = '<p class="text-center text-gray-600 dark:text-gray-300">Failed to load repositories</p>';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Load repositories when page loads
document.addEventListener('DOMContentLoaded', fetchGitHubRepos);