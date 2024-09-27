import { BaseResponse } from "@types";

export interface CategoryResponse extends BaseResponse {
    title: string;
    enabled: boolean;
}