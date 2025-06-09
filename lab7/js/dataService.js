const DataService = {
    async loadCategories() {
        try {
            const response = await fetch('data/categories.json');
            return await response.json();
        } catch (error) {
            console.error('Error loading categories:', error);
            return [];
        }
    },

    async loadCategoryItems(categoryShortname) {
        try {
            const response = await fetch(`data/${categoryShortname}.json`);
            return await response.json();
        } catch (error) {
            console.error('Error loading items:', error);
            return [];
        }
    },
    
    async getRandomCategory() {
        try {
            const response = await fetch('data/categories.json');
            const categories = await response.json();
            
            if (categories.length === 0) {
                return null;
            }
            
            const randomIndex = Math.floor(Math.random() * categories.length);
            return categories[randomIndex];
        } catch (error) {
            console.error('Error getting random category:', error);
            return null;
        }
    }
}; 