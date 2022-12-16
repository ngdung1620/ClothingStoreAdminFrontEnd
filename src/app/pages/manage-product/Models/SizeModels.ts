
export interface CreateSizeRequest {
  name: string;
}

export interface SizeResponse{
  id: string;
  name: string;
}
export interface EditSizeRequest {
  id: string;
  name: string;
}
