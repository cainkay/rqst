export interface Stream {
    id: number;
    description: string;
    date: string; // ISO date string format
    created_at?: string;
    updated_at?: string;
    nuggets?: Nugget[]; // Optional relationship
}

export interface Nugget {
    id: number;
    stream_id: number;
    category_id: number | null;
    state: string; // Australian state (NSW, VIC, QLD, etc.)
    lga: string; 
    description: string;
    date: string; // ISO date string format
    url: string;
    created_at?: string;
    updated_at?: string;
    stream?: Stream; // Optional relationship
    category?: Category; // Optional relationship
    is_saved?: boolean; // Optional flag for UI to show if current user saved this
}

export interface Category {
    id: number;
    title: string;
    created_at?: string;
    updated_at?: string;
    nuggets?: Nugget[]; // Optional relationship
}

// Optional types for creating new records (omit auto-generated fields)
export interface CreateStreamData {
    description: string;
    date: string;
}

export interface CreateNuggetData {
    stream_id: number;
    category_id?: number | null;
    state: string;
    description: string;
    date: string;
    url: string;
}


export interface StreamGrouped {
    id: number;
    description: string;
    date: string; // ISO date string format
    created_at?: string;
    updated_at?: string;
    nugget_groups: {
        category_id: number;
        category_title: string;
        nuggets: Nugget[];
    }[]
    total: number;
    last_page: number;
    current_page: number;
    per_page: number;
}
export interface StreamSolo {
    id: number;
    description: string;
    date: string; // ISO date string format
    created_at?: string;
    updated_at?: string;
    nugget_groups: {
        category_id: number;
        category_title: string;
        nuggets: Nugget[];
    }[]
}
