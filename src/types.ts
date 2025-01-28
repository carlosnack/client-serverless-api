export interface Client {
    clientId: string;
    fullName: string;
    birthDate: string;
    isActive: boolean;
    addresses: string[];
    contacts: {
        email: string;
        phone: string;
        isPrimary: boolean;
    }[];
}

export interface CreateClientRequest {
    fullName: string;
    birthDate: string;
    isActive: boolean;
    addresses: string[];
    contacts: {
        email: string;
        phone: string;
        isPrimary: boolean;
    }[];
}

export interface UpdateClientRequest {
    fullName?: string;
    birthDate?: string;
    isActive?: boolean;
    addresses?: string[];
    contacts?: {
        email: string;
        phone: string;
        isPrimary: boolean;
    }[];
}