export interface CategoryResponse {
  id: string;
  name: string;
  groupCategoryId: string;
}
export interface CreateCategoryRequest {
  name: string;
  groupCategoryId: string;
}
export interface EditCategoryRequest {
  id: string;
  name: string;
  groupCategoryId: string;
}
