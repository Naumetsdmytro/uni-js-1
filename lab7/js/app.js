class AppController {
    constructor() {
        this.homeContent = document.getElementById('home-content');
        this.categoriesContent = document.getElementById('categories-content');
        this.categoryItemsContent = document.getElementById('category-items-content');
        this.categoriesList = document.getElementById('categories-list');
        this.categoryTitle = document.getElementById('category-title');
        this.categoryItems = document.getElementById('category-items');
        this.homeLink = document.getElementById('home-link');
        this.catalogLink = document.getElementById('catalog-link');
        this.backToCategoriesBtn = document.getElementById('back-to-categories');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.homeLink.addEventListener('click', (e) => this.showHome(e));
        this.catalogLink.addEventListener('click', (e) => this.showCategories(e));
        this.backToCategoriesBtn.addEventListener('click', (e) => this.showCategories(e));
    }
    
    showSection(activeSection) {
        [this.homeContent, this.categoriesContent, this.categoryItemsContent].forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });
        
        activeSection.classList.remove('hidden');
        activeSection.classList.add('active');
    }
    
    showHome(e) {
        if (e) e.preventDefault();
        this.showSection(this.homeContent);
    }

    showCategories(e) {
        if (e) e.preventDefault();
        this.showSection(this.categoriesContent);
        
        if (this.categoriesList.children.length === 0) {
            this.loadCategories();
        }
    }

    showCategoryItems(categoryShortname, categoryName) {
        this.showSection(this.categoryItemsContent);
        this.categoryTitle.textContent = categoryName;
        this.loadCategoryItems(categoryShortname);
    }
    
    async loadCategories() {
        const categories = await DataService.loadCategories();
        
        if (categories.length > 0) {
            this.displayCategories(categories);
            
            this.addSpecialCategory({
                id: 'specials',
                name: 'Specials',
                shortname: 'specials',
                notes: 'Special offers with random categories'
            });
        } else {
            this.categoriesList.innerHTML = '<p>Error loading categories</p>';
        }
    }

    async loadCategoryItems(categoryShortname) {
        const items = await DataService.loadCategoryItems(categoryShortname);
        
        if (items.length > 0) {
            this.displayCategoryItems(items);
        } else {
            this.categoryItems.innerHTML = '<p>Error loading items</p>';
        }
    }

    displayCategories(categories) {
        this.categoriesList.innerHTML = '';
        
        categories.forEach(category => {
            const card = this.createCategoryCard(category.name, category.notes);
            
            card.addEventListener('click', () => {
                this.showCategoryItems(category.shortname, category.name);
            });
            
            this.categoriesList.appendChild(card);
        });
    }

    addSpecialCategory(category) {
        const card = this.createCategoryCard(category.name, category.notes);
        
        card.addEventListener('click', async () => {
            const randomCategory = await DataService.getRandomCategory();
            
            if (randomCategory) {
                this.showCategoryItems(
                    randomCategory.shortname, 
                    'Specials: ' + randomCategory.name
                );
            }
        });
        
        this.categoriesList.appendChild(card);
    }

    createCategoryCard(title, description) {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="card-content">
                <h2>${title}</h2>
                <p>${description}</p>
                <span class="card-hover-effect">Click to view items</span>
            </div>
        `;
        return card;
    }

    displayCategoryItems(items) {
        this.categoryItems.innerHTML = '';
        
        items.forEach(item => {
            const imageUrl = item.image || `https://place-hold.it/200x200?text=${item.shortname}`;
            
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card';
            itemCard.innerHTML = `
                <div class="item-image">
                    <img src="${imageUrl}" alt="${item.name}" loading="lazy">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <p class="item-price">${item.price}</p>
                </div>
            `;
            
            this.categoryItems.appendChild(itemCard);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new AppController();
    app.showHome();
}); 