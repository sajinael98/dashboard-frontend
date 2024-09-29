import { BaseResponse } from "@types";

export interface ItemSize {
    size: string;
    price: number;
}

export interface ItemResponse extends BaseResponse {
    title: number;
    image: string;
    categoryId: number;
    category: string;
    modifiers: string[];
    sizes: ItemSize[];
}