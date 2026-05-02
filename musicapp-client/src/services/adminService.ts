import { fetchApi } from './apiClient';

export interface AdminDashboardMetrics {
    totalUsers: number;
    totalArtists: number;
    monthlyRevenue: number;
    activeSubscriptions: number;
}

export interface UserDto {
    id: string;
    email: string;
    username: string;
    role: string;
    createdAt: string;
}

export interface PlanDistributionDto {
    individualPercentage: number;
    duoPercentage: number;
    familyPercentage: number;
}

export interface TransactionDto {
    id: string;
    amount: number;
    type: string;
    status: string;
    description: string;
    date: string;
    entityName: string;
}

export interface AdminRevenueDto {
    monthlyRecurringRevenue: number;
    grossRevenueYTD: number;
    netProfitMargin: number;
    planDistribution: PlanDistributionDto;
    recentTransactions: TransactionDto[];
}

export interface SongDto {
    id: string;
    title: string;
    artist: string;
    coverUrl: string;
    sourceUrl: string;
    duration: number;
}

export const adminService = {
    /**
     * Fetches high-level metrics for the Admin Dashboard overview.
     */
    getMetrics: async (): Promise<AdminDashboardMetrics> => {
        return fetchApi<AdminDashboardMetrics>('/admin/metrics');
    },

    /**
     * Fetches all registered users for the Admin Directory.
     */
    getUsers: async (): Promise<UserDto[]> => {
        return fetchApi<UserDto[]>('/admin/users');
    },

    /**
     * Updates a user's role.
     */
    updateUserRole: async (userId: string, role: string): Promise<UserDto> => {
        return fetchApi<UserDto>(`/admin/users/${userId}/role`, {
            method: 'PUT',
            body: JSON.stringify({ role }),
        });
    },

    /**
     * Deletes a user permanently.
     */
    deleteUser: async (userId: string): Promise<void> => {
        await fetchApi<void>(`/admin/users/${userId}`, {
            method: 'DELETE',
        });
    },

    /**
     * Fetches the revenue dashboard metrics and recent transactions.
     */
    getRevenue: async (): Promise<AdminRevenueDto> => {
        return fetchApi<AdminRevenueDto>('/admin/revenue');
    },

    /**
     * Fetches all songs for the Content Library.
     */
    getSongs: async (): Promise<SongDto[]> => {
        return fetchApi<SongDto[]>('/songs');
    }
};
