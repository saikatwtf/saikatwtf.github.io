// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or use system preference
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    html.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
}

// Initialize theme
const currentTheme = getPreferredTheme();
applyTheme(currentTheme);

// Theme toggle event
themeToggle.addEventListener('click', () => {
    const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Fetch GitHub repositories with error handling and loading states
async function fetchGitHubRepos() {
    const container = document.getElementById('repos-container');
    
    try {
        // Show loading state
        container.innerHTML = Array(3).fill(`
            <div class="animate-pulse bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
        `).join('');
        
        // Fetch data with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch('https://api.github.com/users/saikatwtf/repos?sort=updated&per_page=6', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }
        
        const repos = await response.json();
        
        if (repos.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-600 dark:text-gray-300 p-6">No repositories found</p>';
            return;
        }
        
        container.innerHTML = repos.map(repo => `
            <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-slide-up">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${escapeHTML(repo.name)}</h3>
                    <div class="flex items-center text-yellow-500">
                        <span class="text-sm">⭐ ${repo.stargazers_count}</span>
                    </div>
                </div>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${escapeHTML(repo.description || 'No description available')}</p>
                <div class="flex justify-between items-center">
                    <span class="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        ${escapeHTML(repo.language || 'Unknown')}
                    </span>
                    <a href="${repo.html_url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">
                        View Code →
                    </a>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching repositories:', error);
        container.innerHTML = `
            <div class="col-span-1 md:col-span-2 lg:col-span-3 text-center p-6">
                <div class="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
                    <p>Failed to load repositories. ${error.name === 'AbortError' ? 'Request timed out.' : 'Please try again later.'}</p>
                    <button id="retry-fetch" class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Retry</button>
                </div>
            </div>
        `;
        
        document.getElementById('retry-fetch')?.addEventListener('click', fetchGitHubRepos);
    }
}

// Helper function to escape HTML
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Smooth scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Height of fixed header
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observeElements = (elements, className) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        observer.observe(el);
    });
};

// Apply animations when elements come into view
document.addEventListener('DOMContentLoaded', () => {
    // Fetch repositories
    fetchGitHubRepos();
    
    // Animate elements when they come into view
    observeElements(document.querySelectorAll('.animate-slide-up'), 'animate-slide-up');
    
    // Initialize game filters
    const gameFilters = document.querySelectorAll('.game-filter');
    gameFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            gameFilters.forEach(f => {
                f.classList.remove('active', 'bg-blue-600', 'text-white');
                f.classList.add('bg-gray-200', 'dark:bg-gray-700');
            });
            filter.classList.add('active', 'bg-blue-600', 'text-white');
            filter.classList.remove('bg-gray-200', 'dark:bg-gray-700');
            
            const category = filter.getAttribute('data-filter');
            const gameSections = document.querySelectorAll('.game-section');
            
            gameSections.forEach(section => {
                if (category === 'all' || section.getAttribute('data-category') === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });
});

// Handle mobile menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Back to top button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.add('opacity-0', 'invisible');
            backToTopButton.classList.remove('opacity-100', 'visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    }
});