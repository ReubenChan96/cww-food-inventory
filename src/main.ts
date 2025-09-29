import { InventoryService } from './services/inventory-service.js';
import { InventoryRenderer } from './components/inventory-renderer.js';
import { FormHandler } from './components/form-handler.js';

class App {
  private inventoryService: InventoryService;
  private renderer: InventoryRenderer;

  constructor() {
    this.inventoryService = new InventoryService();
    this.renderer = new InventoryRenderer(this.inventoryService);
    new FormHandler(this.inventoryService, this.renderer);
  }

  init(): void {
    // Initial render
    this.renderer.render();
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});