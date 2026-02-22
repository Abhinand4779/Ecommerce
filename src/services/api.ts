const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://jewellery-backend-mgq2.onrender.com').replace(/\/$/, '');

export interface Product {
    id: number;
    name: string;
    price: number;
    original_price?: number;
    discount?: number;
    category?: string;
    sub?: string;
    description?: string;
    image?: string;
    images?: string[];
    highlights?: string[];
    features?: string[];
    rating: number;
    review_count: number;
    in_stock: boolean;
    stock_quantity: number;
    is_featured: boolean;
}

export interface User {
    id: number;
    email: string;
    full_name?: string;
    phone?: string;
    is_admin: boolean;
    is_active: boolean;
}

export const api = {
    auth: {
        login: async (email: string, password: string) => {
            const formData = new URLSearchParams();
            formData.append('username', email); // FastAPI OAuth2 uses 'username'
            formData.append('password', password);

            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });

            if (!response.ok) throw new Error('Invalid credentials');
            return response.json() as Promise<{ access_token: string; token_type: string }>;
        },
        register: async (userData: { email: string; password: string; full_name?: string; phone?: string }) => {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.detail || 'Registration failed');
            }
            return response.json() as Promise<{ access_token: string; token_type: string }>;
        },
        getMe: async (token: string) => {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch profile');
            return response.json() as Promise<User>;
        }
    },
    products: {
        list: async (params?: { category?: string; sub?: string; featured?: boolean; limit?: number }) => {
            const query = new URLSearchParams();
            if (params?.category) query.append('category', params.category);
            if (params?.sub) query.append('sub', params.sub);
            if (params?.featured !== undefined) query.append('featured', params.featured.toString());
            if (params?.limit) query.append('limit', params.limit.toString());

            const response = await fetch(`${API_BASE_URL}/products/?${query.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch products');
            return response.json() as Promise<Product[]>;
        },
        get: async (id: number) => {
            const response = await fetch(`${API_BASE_URL}/products/${id}`);
            if (!response.ok) throw new Error('Failed to fetch product');
            return response.json() as Promise<Product>;
        },
        search: async (q: string) => {
            const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(q)}`);
            if (!response.ok) throw new Error('Failed to search products');
            return response.json() as Promise<Product[]>;
        }
    },
    orders: {
        list: async (token: string) => {
            const response = await fetch(`${API_BASE_URL}/orders/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch user orders');
            return response.json() as Promise<any[]>;
        },
        listAdmin: async (token: string) => {
            const response = await fetch(`${API_BASE_URL}/orders/admin/all`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch orders');
            return response.json() as Promise<any[]>;
        },
        create: async (token: string, orderData: any) => {
            const response = await fetch(`${API_BASE_URL}/orders/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            if (!response.ok) throw new Error('Failed to place order');
            return response.json();
        }
    },
    health: async () => {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.json();
    }
};
