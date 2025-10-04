import { useState, useEffect } from 'react';
import { InventoryItem } from './types/inventory';
import InventoryTable from './components/InventoryTable';
import AddItemForm from './components/AddItemForm';
import { api } from './services/api';

function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load inventory on mount
  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      setError(null);
      const items = await api.getInventory();
      setInventory(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory');
      console.error('Error loading inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (name: string, quantity: number, expiry: string) => {
    try {
      const newItem = await api.addItem(name, quantity, expiry);
      setInventory([...inventory, newItem]);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add item');
      console.error('Error adding item:', err);
    }
  };

  const updateQuantity = async (id: number, change: number) => {
    const item = inventory.find(i => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(0, item.quantity + change);

    try {
      await api.updateQuantity(id, newQuantity);
      setInventory(inventory.map(i =>
        i.id === id ? { ...i, quantity: newQuantity } : i
      ));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  if (loading) {
    return (
      <div className="container p-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-4">
      <h1 className="mb-4">Food Donation Inventory</h1>
      
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError(null)}
          ></button>
        </div>
      )}
      
      <AddItemForm onAddItem={addItem} />
      
      <InventoryTable 
        inventory={inventory} 
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;