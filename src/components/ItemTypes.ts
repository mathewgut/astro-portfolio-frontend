export interface WorkArray {
    data: {
        id: number;
        documentId: string; 
        title: string;
        type: "fullstack"|"frontend"|"backend"|"api"|"game"|"cli"|"chatbot"|"other";
        role: "all"|"lead developer"|"developer"|"lead designer"|"designer"|"owner"|"organizer"|"artist";
        description: string;
        is_active: boolean;
        completed: Date;
        media?:DocumentImage[];
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