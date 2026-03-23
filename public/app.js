document.addEventListener('DOMContentLoaded', () => {
    const articlesContainer = document.getElementById('articles-container');
    const addArticleForm = document.getElementById('add-article-form');

    // Mettre la date du jour comme placeholder sur un champ caché ou juste la générer
    const fetchArticles = async () => {
        try {
            const response = await fetch('/api/articles');
            const data = await response.json();
            
            articlesContainer.innerHTML = '';

            if (!data.articles || data.articles.length === 0) {
                articlesContainer.innerHTML = '<p class="loading">Aucun post publié pour le moment. Soyez le premier !</p>';
                return;
            }

            const articles = data.articles.reverse();

            articles.forEach(article => {
                const card = document.createElement('div');
                card.className = 'article-card';

                const dateObj = new Date(article.date);
                const dateFormatted = isNaN(dateObj.getTime()) ? article.date : dateObj.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
                
                let tagsHtml = '';
                if (article.categorie) {
                    tagsHtml += `<span class="tag" style="background-color:#ebf8ff;color:#2b6cb0;">${escapeHTML(article.categorie)}</span>`;
                }
                if (article.tags) {
                    const motsClefs = article.tags.split(',').map(t => t.trim()).filter(t => t);
                    motsClefs.forEach(t => {
                        tagsHtml += `<span class="tag">${escapeHTML(t)}</span>`;
                    });
                }

                card.innerHTML = `
                    <div class="article-header">
                        <h3 class="article-title">${escapeHTML(article.titre)}</h3>
                        <span class="article-meta">${escapeHTML(dateFormatted)} par <b>${escapeHTML(article.auteur)}</b></span>
                    </div>
                    <div class="article-content" style="white-space: pre-wrap;">${escapeHTML(article.contenu)}</div>
                    <div class="article-footer">
                        ${tagsHtml}
                    </div>
                `;
                articlesContainer.appendChild(card);
            });
        } catch (error) {
            console.error('Erreur:', error);
            articlesContainer.innerHTML = '<p style="color:red">Impossible de charger les articles. Le serveur API est-il lancé ?</p>';
        }
    };

    addArticleForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'En cours...';

        const newArticle = {
            titre: document.getElementById('titre').value,
            auteur: document.getElementById('auteur').value,
            categorie: document.getElementById('categorie').value,
            contenu: document.getElementById('contenu').value,
            tags: document.getElementById('tags').value,
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newArticle)
            });

            if (response.ok) {
                addArticleForm.reset();
                await fetchArticles();
            } else {
                const errData = await response.json();
                alert(`Erreur: ${errData.erreur || 'Entrées invalides'}`);
            }
        } catch (error) {
            console.error('Erreur POST:', error);
            alert('Erreur de communication avec le serveur.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Publier';
        }
    });

    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    fetchArticles();
});
