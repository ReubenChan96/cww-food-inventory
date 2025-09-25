import { InventoryItem } from '../types/inventory.js';
import { InventoryService } from '../services/inventory-service.js';

export class InventoryRenderer {
  private tableBody: HTMLTableSectionElement;
  private inventoryService: InventoryService;

  constructor(inventoryService: InventoryService) {
    this.inventoryService = inventoryService;
    
    const tableBody = document.querySelector("#inventoryTable tbody");
    if (!tableBody) {
      throw new Error("Inventory table body not found");
    }
    this.tableBody = tableBody as HTMLTableSectionElement;
  }

  render(): void {
    this.tableBody.innerHTML = "";
    const items = this.inventoryService.getAllItems();

    items.forEach(item => {
      const row = this.createItemRow(item);
      this.tableBody.appendChild(row);
    });
  }

  private createItemRow(item: InventoryItem): HTMLTableRowElement {
    const row = document.createElement("tr");

    // Highlight expired items
    if (this.inventoryService.isExpired(item.expiry)) {
      row.classList.add("table-danger");
    }

    row.innerHTML = `
      <td>${this.escapeHtml(item.name)}</td>
      <td>${item.quantity}</td>
      <td>${item.expiry}</td>
      <td>
        <button class="btn btn-sm btn-success me-1" data-action="increase" data-id="${item.id}">+</button>
        <button class="btn btn-sm btn-warning me-1" data-action="decrease" data-id="${item.id}">-</button>
      </td>
    `;

    // Add event listeners for quantity buttons
    this.addQuantityButtonListeners(row);

    return row;
  }

  private addQuantityButtonListeners(row: HTMLTableRowElement): void {
    row.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.matches('button[data-action]')) return;

      const action = target.getAttribute('data-action');
      const idStr = target.getAttribute('data-id');
      
      if (!action || !idStr) return;

      const id = parseInt(idStr, 10);
      const change = action === 'increase' ? 1 : -1;

      if (this.inventoryService.updateQuantity(id, change)) {
        this.render(); // Re-render after update
      }
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}