export interface PermissionResponse {
  id: number;
  entity: string;
  createR: boolean;
  readR: boolean;
  editR: boolean;
  deleteR: boolean;
}
