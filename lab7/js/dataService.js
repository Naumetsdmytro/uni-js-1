const DataService = {
    cache: new Map(),

    async loadCategories() {
        try {
            if (this.cache.has('categories')) {
                return this.cache.get('categories');
            }

            const response = await fetch('data/categories.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache.set('categories', data);
            return data;
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    },

    async loadCategoryItems(categoryShortname) {
        try {
            const cacheKey = `items_${categoryShortname}`;
            if (this.cache.has(cacheKey)) {
                return this.cache.get(cacheKey);
            }

            const response = await fetch(`data/${categoryShortname}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error('Error loading items:', error);
            return [];
        }
    },
    
    async getRandomCategory() {
        try {
            const categories = await this.loadCategories();
            
            if (categories.length === 0) {
                return null;
            }
            
            const randomIndex = Math.floor(Math.random() * categories.length);
            return categories[randomIndex];
        } catch (error) {
            console.error('Error getting random category:', error);
            return null;
        }
    },

    clearCache() {
        this.cache.clear();
    },

    async preloadCategory(categoryShortname) {
        try {
            await this.loadCategoryItems(categoryShortname);
        } catch (error) {
            console.error('Error preloading category:', error);
        }
    }
}; 