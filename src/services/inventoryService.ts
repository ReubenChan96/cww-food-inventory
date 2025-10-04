import { supabase, InventoryItem } from '../lib/supabase'

export const inventoryService = {
  // Fetch all items from Supabase
  async getAll(): Promise<InventoryItem[]> {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching items:', error)
      throw new Error(`Failed to fetch inventory: ${error.message}`)
    }
    
    // Map database column names to frontend format
    return (data || []).map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      quantity: item.quantity,
      expiry: item.expiry_date,
      status: item.status,
      batchNumber: item.batch_number,
      receivedDate: item.received_date,
      donor: item.donor,
      lastModifiedBy: item.last_modified_by,
      lastModifiedDate: item.last_modified_date,
    }))
  },

  // Create new item
  async create(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const dbItem = {
      name: item.name,
      description: item.description,
      quantity: item.quantity,
      expiry_date: item.expiry,
      status: item.status,
      batch_number: item.batchNumber,
      received_date: item.receivedDate,
      donor: item.donor,
      last_modified_by: item.lastModifiedBy,
      last_modified_date: item.lastModifiedDate,
    }

    const { data, error } = await supabase
      .from('inventory_items')
      .insert([dbItem])
      .select()
      .single()
    
    if (error) {
      console.error('Error creating item:', error)
      throw new Error(`Failed to create item: ${error.message}`)
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      quantity: data.quantity,
      expiry: data.expiry_date,
      status: data.status,
      batchNumber: data.batch_number,
      receivedDate: data.received_date,
      donor: data.donor,
      lastModifiedBy: data.last_modified_by,
      lastModifiedDate: data.last_modified_date,
    }
  },

  // Update item
  async update(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
    const dbUpdates: any = {}
    
    if (updates.name !== undefined) dbUpdates.name = updates.name
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.quantity !== undefined) dbUpdates.quantity = updates.quantity
    if (updates.expiry !== undefined) dbUpdates.expiry_date = updates.expiry
    if (updates.status !== undefined) dbUpdates.status = updates.status
    if (updates.lastModifiedBy !== undefined) dbUpdates.last_modified_by = updates.lastModifiedBy
    if (updates.lastModifiedDate !== undefined) dbUpdates.last_modified_date = updates.lastModifiedDate

    const { data, error } = await supabase
      .from('inventory_items')
      .update(dbUpdates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating item:', error)
      throw new Error(`Failed to update item: ${error.message}`)
    }
    
    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      quantity: data.quantity,
      expiry: data.expiry_date,
      status: data.status,
      batchNumber: data.batch_number,
      receivedDate: data.received_date,
      donor: data.donor,
      lastModifiedBy: data.last_modified_by,
      lastModifiedDate: data.last_modified_date,
    }
  },

  // Delete item
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('inventory_items')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting item:', error)
      throw new Error(`Failed to delete item: ${error.message}`)
    }
  }
}