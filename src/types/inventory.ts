export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  expiry: string; // ISO date string (YYYY-MM-DD)
}

export interface NewItemFormData {
  name: string;
  quantity: number;
  expiry: string;
}