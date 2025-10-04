import { InventoryItem } from '../types/inventory';

const API_BASE_URL = '/api';

export const api = {
  // Get all inventory items
  async getInventory(): Promise<InventoryItem[]> {
    const response = await fetch(`${API_BASE_URL}/inventory`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch inventory');
    }
    
    return data.data.map((item: any) => ({
      id: item.id,
      name: item.item_name,
      quantity: item.quantity,
      expiry: item.expiry_date || ''
    }));
  },

  // Add new inventory item
  async addItem(name: string, quantity: number, expiry: string): Promise<InventoryItem> {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_name: name,
        category: 'General',
        quantity,
        unit: 'pieces',
        expiry_date: expiry
      }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to add item');
    }

    return {
      id: data.data.id,
      name: data.data.item_name,
      quantity: data.data.quantity,
      expiry: data.data.expiry_date || ''
    };
  },

  // Update item quantity
  async updateQuantity(id: number, quantity: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to update item');
    }
  },

  // Delete item
  async deleteItem(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to delete item');
    }
  }
};