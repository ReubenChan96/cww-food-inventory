import { NewItemFormData } from '../types/inventory.js';
import { InventoryService } from '../services/inventory-service.js';
import { InventoryRenderer } from './inventory-renderer.js';

export class FormHandler {
  private form: HTMLFormElement;
  private nameInput: HTMLInputElement;
  private quantityInput: HTMLInputElement;
  private expiryInput: HTMLInputElement;
  private inventoryService: InventoryService;
  private renderer: InventoryRenderer;

  constructor(inventoryService: InventoryService, renderer: InventoryRenderer) {
    this.inventoryService = inventoryService;
    this.renderer = renderer;

    // Get form elements
    const form = document.getElementById("addItemForm");
    const nameInput = document.getElementById("itemName");
    const quantityInput = document.getElementById("itemQuantity");
    const expiryInput = document.getElementById("itemExpiry");

    if (!form || !nameInput || !quantityInput || !expiryInput) {
      throw new Error("Form elements not found");
    }

    this.form = form as HTMLFormElement;
    this.nameInput = nameInput as HTMLInputElement;
    this.quantityInput = quantityInput as HTMLInputElement;
    this.expiryInput = expiryInput as HTMLInputElement;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  private handleSubmit(): void {
    const formData = this.getFormData();
    
    if (this.validateFormData(formData)) {
      this.inventoryService.addItem(formData);
      this.renderer.render();
      this.form.reset();
    }
  }

  private getFormData(): NewItemFormData {
    return {
      name: this.nameInput.value.trim(),
      quantity: parseInt(this.quantityInput.value, 10),
      expiry: this.expiryInput.value
    };
  }

  private validateFormData(data: NewItemFormData): boolean {
    if (!data.name) {
      alert("Please enter an item name");
      return false;
    }

    if (isNaN(data.quantity) || data.quantity <= 0) {
      alert("Please enter a valid quantity");
      return false;
    }

    if (!data.expiry) {
      alert("Please select an expiry date");
      return false;
    }

    return true;
  }
}