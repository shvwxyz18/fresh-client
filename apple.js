const { createClient } = supabase;
const supabaseUrl = 
const supabaseKey = 

const app = Vue.createApp({
    data() {
        return {
            storesArray: [] 
        };
    },

    methods: {
        async getStores() {
            await getStoresFromDB()
                .then(stores => this.storesArray = stores);
        }
    },
    beforeMount() {
        this.getStores();
    }
});

async function getStoresFromDB() {
    try {
        const { data, error } = await _supabase.from('apple').select('store');
        if (data && data.length > 0) {
            const stores = data.map(row => row.store);
            console.log(stores);
            return stores;
        } else {
            console.log('No store data available.');
            return [];
        }
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error retrieving store data. Please try again.');
        return [];
    }
}

app.mount("#app");
