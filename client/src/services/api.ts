// API configuration and base service
const API_BASE_URL = 'https://render-backend-bizdash.onrender.com/api';

interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private getAuthHeaders(): HeadersInit {
    const token = this.getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }
    
    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<T>(response);
  }
}

// Export singleton instance
export const apiService = new ApiService();

// Auth API methods
export const authApi = {
  async login(email: string, password: string) {
    const response = await apiService.post<{
      token: string;
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
        department?: string;
        avatar?: string;
      };
    }>('/auth/login', { email, password });
    
    return response;
  },

  async register(name: string, email: string, password: string, department?: string) {
    const response = await apiService.post<{
      token: string;
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
        department?: string;
      };
    }>('/auth/register', { name, email, password, department });
    
    return response;
  },

  async getProfile() {
    const response = await apiService.get<{
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
        department?: string;
        avatar?: string;
        lastLogin?: string;
      };
    }>('/auth/profile');
    
    return response;
  }
};

// Dashboard API methods
export const dashboardApi = {
  async getKPIs() {
    return apiService.get<{
      kpis: Array<{
        id: string;
        title: string;
        value: string;
        change: number;
        trend: 'up' | 'down';
        icon: string;
        color: string;
      }>;
    }>('/dashboard/kpis');
  },

  async getRevenueChart() {
    return apiService.get<{
      chartData: Array<{
        date: string;
        revenue: number;
        orders: number;
      }>;
    }>('/dashboard/revenue-chart');
  },

  async getActivity() {
    return apiService.get<{
      activities: Array<{
        id: string;
        type: string;
        user: string;
        action: string;
        amount?: number;
        time: string;
        salesRep?: string;
      }>;
    }>('/dashboard/activity');
  },

  async getTopPerformers() {
    return apiService.get<{
      topPerformers: Array<{
        id: string;
        name: string;
        rank: number;
        revenue: number;
        orders: number;
        change: number;
      }>;
    }>('/dashboard/top-performers');
  }
};

// Sales API methods
export const salesApi = {
  async getSales(filters?: {
    page?: number;
    limit?: number;
    category?: string;
    region?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = queryParams.toString() ? `/sales?${queryParams}` : '/sales';
    return apiService.get<{
      sales: Array<any>;
      pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
      };
      summary: {
        totalRevenue: number;
        totalOrders: number;
        avgOrderValue: number;
      };
    }>(endpoint);
  },

  async getSalesByRegion(filters?: { startDate?: string; endDate?: string }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = queryParams.toString() ? `/sales/by-region?${queryParams}` : '/sales/by-region';
    return apiService.get<{
      salesByRegion: Array<{
        region: string;
        revenue: number;
        orders: number;
      }>;
    }>(endpoint);
  },

  async getProductPerformance(limit = 10) {
    return apiService.get<{
      productPerformance: Array<{
        _id: string;
        name: string;
        totalRevenue: number;
        totalQuantity: number;
        averagePrice: number;
      }>;
    }>(`/sales/product-performance?limit=${limit}`);
  }
};

// Users API methods
export const usersApi = {
  async getUsers(filters?: {
    page?: number;
    limit?: number;
    role?: string;
    department?: string;
    status?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = queryParams.toString() ? `/users?${queryParams}` : '/users';
    return apiService.get(endpoint);
  },

  async getUserMetrics() {
    return apiService.get<{
      metrics: {
        totalUsers: number;
        newUsers: number;
        usersByRole: Array<{ role: string; count: number }>;
        usersByDepartment: Array<{ department: string; count: number }>;
        userGrowth: Array<{ month: string; newUsers: number }>;
      };
    }>('/users/metrics');
  }
};

// Inventory API methods
export const inventoryApi = {
  async getProducts(filters?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
    lowStock?: boolean;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = queryParams.toString() ? `/inventory?${queryParams}` : '/inventory';
    return apiService.get(endpoint);
  },

  async getAnalytics() {
    return apiService.get<{
      analytics: {
        totalProducts: number;
        lowStockProducts: number;
        outOfStockProducts: number;
        totalInventoryValue: number;
        productsByCategory: Array<{ category: string; count: number; value: number }>;
        topProductsByValue: Array<any>;
      };
    }>('/inventory/analytics');
  }
};

// Reports API methods
export const reportsApi = {
  async getReports(filters?: { status?: string; type?: string; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = queryParams.toString() ? `/reports?${queryParams}` : '/reports';
    return apiService.get(endpoint);
  },

  async generateReport(data: {
    name: string;
    type: string;
    metrics?: string[];
    dateRange?: string;
    format?: string;
  }) {
    return apiService.post('/reports/generate', data);
  },

  async getReportTemplates() {
    return apiService.get<{
      templates: Array<{
        id: string;
        name: string;
        description: string;
        metrics: string[];
        estimatedTime: string;
      }>;
    }>('/reports/templates');
  }
};
