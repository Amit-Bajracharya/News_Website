// Fetch and display news
async function fetchNews() {
    const loading = document.getElementById('loading');
    const newsGrid = document.getElementById('newsGrid');
    
    try {
        loading.style.display = 'block';
        newsGrid.innerHTML = '';
        
        const response = await fetch('/news/api');
        const data = await response.json();
        
        loading.style.display = 'none';
        
        if (data.successful && data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            newsGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No news available at the moment.</p>';
        }
    } catch (error) {
        loading.style.display = 'none';
        newsGrid.innerHTML = '<p style="text-align: center; color: #e74c3c; padding: 2rem;">Error loading news. Please try again later.</p>';
        console.error('Error fetching news:', error);
    }
}

// Display news articles
function displayNews(articles) {
    const newsGrid = document.getElementById('newsGrid');
    
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        
        const image = article.urlToImage 
            ? `<img src="${article.urlToImage}" alt="${article.title}" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'">`
            : `<div style="width: 100%; height: 200px; background: #ddd; display: flex; align-items: center; justify-content: center; color: #999;">No Image</div>`;
        
        const publishedDate = article.publishedAt 
            ? new Date(article.publishedAt).toLocaleDateString()
            : 'Date not available';
        
        card.innerHTML = `
            ${image}
            <div class="news-card-content">
                <h3>${article.title || 'No title'}</h3>
                <p>${article.description || 'No description available'}</p>
                <div class="news-card-meta">
                    <span class="source">${article.source?.name || 'Unknown source'}</span>
                    <span>${publishedDate}</span>
                </div>
                ${article.url ? `<a href="${article.url}" target="_blank">Read more →</a>` : ''}
            </div>
        `;
        
        newsGrid.appendChild(card);
    });
}

// Load news when page loads
document.addEventListener('DOMContentLoaded', fetchNews);
