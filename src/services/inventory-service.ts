import { InventoryItem, NewItemFormData } from '../types/inventory.js';

export class InventoryService {
  private inventory: InventoryItem[] = [
    { id: 1, name: "Rice", quantity: 10, expiry: "2025-12-01" },
    { id: 2, name: "Canned Beans", quantity: 5, expiry: "2024-08-01" }, // expired
    { id: 3, name: "Milk", quantity: 2, expiry: "2025-09-10" }
  ];

  getAllItems(): InventoryItem[] {
    return [...this.inventory];
  }

  addItem(itemData: NewItemFormData): InventoryItem {
    const newItem: InventoryItem = {
      id: Date.now(),
      name: itemData.name,
      quantity: itemData.quantity,
      expiry: itemData.expiry
    };
    
    this.inventory.push(newItem);
    return newItem;
  }

  updateQuantity(id: number, change: number): boolean {
    const itemIndex = this.inventory.findIndex(item => item.id === id);
    if (itemIndex === -1) return false;

    this.inventory[itemIndex] = {
      ...this.inventory[itemIndex],
      quantity: Math.max(0, this.inventory[itemIndex].quantity + change)
    };
    
    return true;
  }

  isExpired(dateStr: string): boolean {
    const today = new Date();
    const expiry = new Date(dateStr);
    return expiry < new Date(today.setHours(0, 0, 0, 0));
  }
}