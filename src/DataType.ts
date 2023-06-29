export interface AiDetail{

    _id: string,
    name: string,
    icon_url: string,
    site_url: string,
    type: string,
    plans: string,
    description: string,
    content: string,
    likes: number,
    views: number,
    created_at: number,
    modified_at: number,
    seo_description: string
}


export interface AccountData{
    _id: string,
    email: string,
    password: string
}

export interface DashboardAiDetail{
    _id: string,
    name: string,
    icon_url: string,
    site_url: string,
    type: string,
    plans: string,
    likes: number,
    views: number,
    created_at: number,
    modified_at: number
}

export interface AiUploadDetail{

    _id: string,
    name: string,
    icon_url: string,
    site_url: string,
    type: string,
    plans: string,
    description: string,
    content: string,
    seo_description: string
}

export interface DashboardData{
    aiDetailList: Array<DashboardAiDetail>
}