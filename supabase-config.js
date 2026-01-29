// Supabase Configuration
// IMPORTANT: Remplace ces valeurs avec tes clés Supabase

const SUPABASE_URL = 'https://leuebqwdubzwkjhieqsk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r_Oxpm2iRYOzhn1Eabiphw_p5RHykrU';

// Initialize Supabase client
const { createClient } = supabase;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = supabaseClient;

// Helper functions
const supabaseAuth = {
    // Sign up new user
    async signUp(email, password, name) {
        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Sign up error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Sign in user
    async signIn(email, password) {
        try {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Sign in error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Sign out user
    async signOut() {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabaseClient.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('Get user error:', error.message);
            return null;
        }
    },

    // Listen to auth changes
    onAuthStateChange(callback) {
        return supabaseClient.auth.onAuthStateChange(callback);
    }
};

// Reservations management
const reservationManager = {
    // Create reservation
    async createReservation(userId, reservationData) {
        try {
            // Generate unique confirmation number
            const confirmationNumber = 'RES-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();

            const { data, error } = await supabaseClient
                .from('reservations')
                .insert([{
                    user_id: userId,
                    service: reservationData.service,
                    reservation_date: reservationData.reservation_date,
                    reservation_time: reservationData.reservation_time,
                    customer_name: reservationData.customer_name,
                    customer_email: reservationData.customer_email,
                    customer_phone: reservationData.customer_phone,
                    description: reservationData.description,
                    confirmation_number: confirmationNumber,
                    status: 'confirmed',
                    created_at: new Date().toISOString()
                }])
                .select();

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Create reservation error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Get user reservations
    async getUserReservations(userId) {
        try {
            const { data, error } = await supabaseClient
                .from('reservations')
                .select('*')
                .eq('user_id', userId)
                .order('reservation_date', { ascending: false });

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get reservations error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Get reservation by ID
    async getReservation(reservationId) {
        try {
            const { data, error } = await supabaseClient
                .from('reservations')
                .select('*')
                .eq('id', reservationId)
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get reservation error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Update reservation
    async updateReservation(reservationId, updates) {
        try {
            const { data, error } = await supabaseClient
                .from('reservations')
                .update({
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .eq('id', reservationId)
                .select();

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Update reservation error:', error.message);
            return { success: false, error: error.message };
        }
    },

    // Cancel reservation
    async cancelReservation(reservationId) {
        try {
            const { data, error } = await supabaseClient
                .from('reservations')
                .update({
                    status: 'cancelled',
                    updated_at: new Date().toISOString()
                })
                .eq('id', reservationId)
                .select();

            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Cancel reservation error:', error.message);
            return { success: false, error: error.message };
        }
    }
};

window.supabaseAuth = supabaseAuth;
window.reservationManager = reservationManager;
