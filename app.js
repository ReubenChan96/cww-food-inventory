// Mock data (in-memory)
let inventory = [
  { id: 1, name: "Rice", quantity: 10, expiry: "2025-12-01" },
  { id: 2, name: "Canned Beans", quantity: 5, expiry: "2024-08-01" }, // expired
  { id: 3, name: "Milk", quantity: 2, expiry: "2025-09-10" }
];

// Utility: check if expired
function isExpired(dateStr) {
  const today = new Date();
  const expiry = new Date(dateStr);
  return expiry < today.setHours(0,0,0,0);
}

// Render inventory table
function renderInventory() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = "";

  inventory.forEach(item => {
    const row = document.createElement("tr");

    // Highlight expired
    if (isExpired(item.expiry)) {
      row.classList.add("table-danger");
    }

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${item.expiry}</td>
      <td>
        <button class="btn btn-sm btn-success me-1" onclick="updateQuantity(${item.id}, 1)">+</button>
        <button class="btn btn-sm btn-warning me-1" onclick="updateQuantity(${item.id}, -1)">-</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

// Update quantity
function updateQuantity(id, change) {
  inventory = inventory.map(item =>
    item.id === id
      ? { ...item, quantity: Math.max(0, item.quantity + change) }
      : item
  );
  renderInventory();
}

// Add item form handler
document.getElementById("addItemForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value.trim();
  const quantity = parseInt(document.getElementById("itemQuantity").value, 10);
  const expiry = document.getElementById("itemExpiry").value;

  if (name && quantity > 0 && expiry) {
    const newItem = {
      id: Date.now(),
      name,
      quantity,
      expiry
    };
    inventory.push(newItem);
    renderInventory();
    this.reset();
  }
});

// Initial render
renderInventory();
