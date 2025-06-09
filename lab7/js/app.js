document.addEventListener('DOMContentLoaded', function() {
    const homeContent = document.getElementById('home-content');
    const categoriesContent = document.getElementById('categories-content');
    const categoryItemsContent = document.getElementById('category-items-content');
    const categoriesList = document.getElementById('categories-list');
    const categoryTitle = document.getElementById('category-title');
    const categoryItems = document.getElementById('category-items');
    const homeLink = document.getElementById('home-link');
    const catalogLink = document.getElementById('catalog-link');
    const backToCategoriesBtn = document.getElementById('back-to-categories');
    
    homeLink.addEventListener('click', showHome);
    catalogLink.addEventListener('click', showCategories);
    backToCategoriesBtn.addEventListener('click', showCategories);
    
    function showSection(activeSection) {
        homeContent.classList.add('hidden');
        categoriesContent.classList.add('hidden');
        categoryItemsContent.classList.add('hidden');
        
        homeContent.classList.remove('active');
        categoriesContent.classList.remove('active');
        categoryItemsContent.classList.remove('active');
        
        activeSection.classList.remove('hidden');
        activeSection.classList.add('active');
    }
    
    function showHome(e) {
        if (e) e.preventDefault();
        showSection(homeContent);
    }

    function showCategories(e) {
        if (e) e.preventDefault();
        showSection(categoriesContent);
        
        if (categoriesList.children.length === 0) {
            loadCategories();
        }
    }

    function showCategoryItems(categoryShortname, categoryName) {
        showSection(categoryItemsContent);
        categoryTitle.textContent = categoryName;
        loadCategoryItems(categoryShortname);
    }
    
    async function loadCategories() {
        const categories = await DataService.loadCategories();
        
        if (categories.length > 0) {
            displayCategories(categories);
            
            addSpecialCategory({
                id: 'specials',
                name: 'Specials',
                shortname: 'specials',
                notes: 'Special offers with random categories'
            });
        } else {
            categoriesList.innerHTML = '<p>Error loading categories</p>';
        }
    }

    async function loadCategoryItems(categoryShortname) {
        const items = await DataService.loadCategoryItems(categoryShortname);
        
        if (items.length > 0) {
            displayCategoryItems(items);
        } else {
            categoryItems.innerHTML = '<p>Error loading items</p>';
        }
    }

    function displayCategories(categories) {
        categoriesList.innerHTML = '';
        
        categories.forEach(category => {
            const card = createCategoryCard(category.name, category.notes);
            
            card.addEventListener('click', () => {
                showCategoryItems(category.shortname, category.name);
            });
            
            categoriesList.appendChild(card);
        });
    }

    function addSpecialCategory(category) {
        const card = createCategoryCard(category.name, category.notes);
        
        card.addEventListener('click', async () => {
            const randomCategory = await DataService.getRandomCategory();
            
            if (randomCategory) {
                showCategoryItems(
                    randomCategory.shortname, 
                    'Specials: ' + randomCategory.name
                );
            }
        });
        
        categoriesList.appendChild(card);
    }

    function createCategoryCard(title, description) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <h2>${title}</h2>
            <p>${description}</p>
        `;
        return card;
    }

    function displayCategoryItems(items) {
        categoryItems.innerHTML = '';
        
        items.forEach(item => {
            const imageUrl = item.image || `https://place-hold.it/200x200?text=${item.shortname}`;
            
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <img src="${imageUrl}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="item-price">${item.price}</p>
            `;
            
            categoryItems.appendChild(itemCard);
        });
    }
    
    showHome();
}); 