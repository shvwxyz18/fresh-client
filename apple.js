const { createClient } = supabase;
const supabaseUrl = 'https://xwcmoxjxyuyxnjyolylx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3Y21veGp4eXV5eG5qeW9seWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxNTQxMzYsImV4cCI6MjAyMTczMDEzNn0.4JJ6HvnD4EEiTKypwLB7uzOdosBehsqo-RbDMeXR1sQ';
const _supabase = createClient(supabaseUrl, supabaseKey);

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
