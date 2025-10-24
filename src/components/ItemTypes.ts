export interface WorkArray {
    data: {
        id: number;
        documentId: string; 
        title: string;
        type: "website"|"web application"|"api"|"mobile"|"game"|"cli"|"chatbot"|"other";
        role: "sole developer"|"sole designer"|"sole animator"|"sole engineer"|"frontend developer"|"backend developer"|"designer";
        description: string;
        is_active: boolean;
        completed: Date;
        media?:DocumentImage[];
        link?:string;
        technologies?:string;
        articles:PostArray["data"];
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    }[];
    meta: {}
}

export interface PostArray {
    data: {
        id: number;
        documentId: string; 
        title: string;
        category: "Tips"|"News"|"Opinion"|"Project Update"|"Post Mortem"|"Release";
        body: string;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
    }[];
    meta: {}
}

export interface StrapiImageFormat {
    name:string;
    hash:string;
    ext:string;
    mime:string;
    path:string;
    width:number;
    height:number;
    size:number;
    sizeInBytes:number;
    url:string;
}

export interface DocumentImage {
    id:number;
    documentId:string;
    name:string;
    alternativeText:string;
    caption:string;
    width:number;
    height:number;
    formats:{
        thumbnail:StrapiImageFormat
        large:StrapiImageFormat
        medium:StrapiImageFormat
        small:StrapiImageFormat
    }
    url:string;
    hash:string;
    ext:string;
} 

export type ActiveItemType = WorkArray["data"][number];