import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  AlertCircle,
  Calendar,
  Package,
  MoreVertical,
  Trash2,
  Edit,
  CheckCircle,
  FileText,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "./components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { PantryKeeperLogo } from "./components/PantryKeeperLogo";

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  expiry: string;
  status: "fresh" | "expiring" | "expired";
  batchNumber: string;
  receivedDate: string;
  donor?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}

export default function App() {
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Paddy King Brown Rice, 5kg",
      description: "Premium brown rice, whole grain",
      quantity: 3,
      expiry: "2026-03-15",
      status: "fresh",
      batchNumber: "PADD-001",
      receivedDate: "2025-08-10",
      donor: "Paddy King Distributor",
      lastModifiedBy: "Sarah Chen",
      lastModifiedDate: "2025-09-15",
    },
    {
      id: "2",
      name: "Balducci Spaghetti",
      description: "Italian pasta, 500g pack",
      quantity: 4,
      expiry: "2026-06-20",
      status: "fresh",
      batchNumber: "BALD-001",
      receivedDate: "2025-07-22",
      donor: "FairPrice Foundation",
      lastModifiedBy: "Marcus Tan",
      lastModifiedDate: "2025-08-30",
    },
    {
      id: "3",
      name: "FairPrice Vermicelli",
      description: "Rice vermicelli noodles",
      quantity: 4,
      expiry: "2026-04-10",
      status: "fresh",
      batchNumber: "FAIR-001",
      receivedDate: "2025-08-05",
      donor: "FairPrice Foundation",
      lastModifiedBy: "Sarah Chen",
      lastModifiedDate: "2025-09-12",
    },
    {
      id: "4",
      name: "Happy Family Vermicelli",
      description: "Traditional vermicelli noodles",
      quantity: 6,
      expiry: "2025-10-09",
      status: "expiring",
      batchNumber: "HAPP-001",
      receivedDate: "2025-06-15",
      donor: "Community Donation Drive",
      lastModifiedBy: "David Lim",
      lastModifiedDate: "2025-09-20",
    },
    {
      id: "5",
      name: "Pasar Red Bean",
      description: "Dried red beans, 500g",
      quantity: 4,
      expiry: "2026-02-28",
      status: "fresh",
      batchNumber: "PASA-001",
      receivedDate: "2025-07-18",
      donor: "Local Market Network",
      lastModifiedBy: "Sarah Chen",
      lastModifiedDate: "2025-08-25",
    },
    {
      id: "6",
      name: "Pasar Green Bean",
      description: "Dried green beans, 500g",
      quantity: 5,
      expiry: "2026-03-05",
      status: "fresh",
      batchNumber: "PASA-002",
      receivedDate: "2025-07-18",
      donor: "Local Market Network",
      lastModifiedBy: "Marcus Tan",
      lastModifiedDate: "2025-09-10",
    },
    {
      id: "7",
      name: "Pasar Barley",
      description: "Pearl barley, great for soups",
      quantity: 3,
      expiry: "2025-08-12",
      status: "expired",
      batchNumber: "PASA-003",
      receivedDate: "2025-03-20",
      donor: "Local Market Network",
      lastModifiedBy: "Sarah Chen",
      lastModifiedDate: "2025-08-12",
    },
    {
      id: "8",
      name: "Pasar Rock Sugar",
      description: "Natural rock sugar crystals",
      quantity: 4,
      expiry: "2027-01-30",
      status: "fresh",
      batchNumber: "PASA-004",
      receivedDate: "2025-08-01",
      donor: "Local Market Network",
      lastModifiedBy: "David Lim",
      lastModifiedDate: "2025-09-18",
    },
    {
      id: "9",
      name: "San Remo Bolognese and Mushroom Pasta Sauce",
      description: "Ready-to-use pasta sauce, 500g jar",
      quantity: 13,
      expiry: "2026-03-02",
      status: "fresh",
      batchNumber: "SANR-001",
      receivedDate: "2025-07-10",
      donor: "San Remo Singapore",
      lastModifiedBy: "Marcus Tan",
      lastModifiedDate: "2025-09-05",
    },
    {
      id: "10",
      name: "Happy Family Fine Sugar",
      description: "Refined white sugar",
      quantity: 1,
      expiry: "2026-05-28",
      status: "fresh",
      batchNumber: "HAPP-002",
      receivedDate: "2025-06-12",
      donor: "Community Donation Drive",
      lastModifiedBy: "Sarah Chen",
      lastModifiedDate: "2025-09-22",
    },
    {
      id: "11",
      name: "Mitr Phol Pure Refined Sugar",
      description: "Premium refined sugar from Thailand",
      quantity: 6,
      expiry: "2026-01-22",
      status: "fresh",
      batchNumber: "MITR-001",
      receivedDate: "2025-05-08",
      donor: "Wholesale Supplier",
      lastModifiedBy: "David Lim",
      lastModifiedDate: "2025-08-28",
    },
    {
      id: "12",
      name: "Happy Family Can Mushrooms",
      description: "Canned button mushrooms in brine",
      quantity: 11,
      expiry: "2027-09-28",
      status: "fresh",
      batchNumber: "HAPP-003",
      receivedDate: "2025-08-15",
      donor: "Community Donation Drive",
      lastModifiedBy: "Marcus Tan",
      lastModifiedDate: "2025-09-14",
    },
    {
      id: "13",
      name: "Ayam Brand Can Tuna",
      description: "Tuna chunks in brine, 150g can",
      quantity: 3,
      expiry: "2027-08-07",
      status: "fresh",
      batchNumber: "AYAM-001",
      receivedDate: "2025-07-25",
      donor: "Ayam Brand Singapore",
      lastModifiedBy: "Sarah Chen",
      lastModifiedDate: "2025-09-16",
    },
    {
      id: "14",
      name: "Century Can Tuna",
      description: "Premium tuna in oil, 185g can",
      quantity: 17,
      expiry: "2027-08-15",
      status: "fresh",
      batchNumber: "CENT-001",
      receivedDate: "2025-08-02",
      donor: "Century Pacific Singapore",
      lastModifiedBy: "David Lim",
      lastModifiedDate: "2025-09-08",
    },
    {
      id: "15",
      name: "Kara Coconut Milk",
      description: "Rich coconut milk, 200ml pack",
      quantity: 2,
      expiry: "2026-05-15",
      status: "fresh",
      batchNumber: "KARA-001",
      receivedDate: "2025-06-20",
      donor: "FairPrice Foundation",
      lastModifiedBy: "Marcus Tan",
      lastModifiedDate: "2025-09-11",
    },
    {
      id: "16",
      name: "Tiger Brand Light Soya Sauce",
      description: "Light soy sauce, 640ml bottle",
      quantity: 11,
      expiry: "2026-11-29",
      status: "fresh",
      batchNumber: "TIGE-001",
      receivedDate: "2025-07-05",
      donor: "Tiger Brand Distributor",
      lastModifiedBy: "Sarah Chen",
      lastModifiedDate: "2025-09-19",
    },
    {
      id: "17",
      name: "Elephant Brand Light Soya Bean Sauce",
      description: "Light soya bean sauce, premium quality",
      quantity: 6,
      expiry: "2025-06-30",
      status: "expired",
      batchNumber: "ELEP-001",
      receivedDate: "2025-01-15",
      donor: "Wholesale Supplier",
      lastModifiedBy: "David Lim",
      lastModifiedDate: "2025-06-30",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] =
    useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] =
    useState<InventoryItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] =
    useState(false);
  const [itemToDelete, setItemToDelete] = useState<
    string | null
  >(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    expiry: "",
    donor: "",
    modifiedBy: "",
  });

  const getItemStatus = (
    expiryDate: string,
  ): "fresh" | "expiring" | "expired" => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(
      diffTime / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 0) return "expired";
    if (diffDays <= 7) return "expiring";
    return "fresh";
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterStatus === "all" || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [items, searchTerm, filterStatus]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      quantity: "",
      expiry: "",
      donor: "",
      modifiedBy: "",
    });
    setEditingItem(null);
  };

  const generateBatchNumber = (name: string) => {
    const prefix = name
      .substring(0, 4)
      .toUpperCase()
      .replace(/[^A-Z]/g, "X");
    const existingBatches = items.filter(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    ).length;
    return `${prefix}-${String(existingBatches + 1).padStart(3, "0")}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.quantity ||
      !formData.expiry ||
      !formData.modifiedBy.trim()
    ) {
      toast.error(
        "Please fill in all required fields including who is making this change",
      );
      return;
    }

    const quantity = parseInt(formData.quantity);
    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }

    const status = getItemStatus(formData.expiry);
    const currentDate = new Date().toISOString().split("T")[0];

    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formData.name.trim(),
                description: formData.description.trim(),
                quantity,
                expiry: formData.expiry,
                status,
                lastModifiedBy: formData.modifiedBy.trim(),
                lastModifiedDate: currentDate,
              }
            : item,
        ),
      );
      toast.success("Item updated successfully");
    } else {
      const newItem: InventoryItem = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        quantity,
        expiry: formData.expiry,
        status,
        batchNumber: generateBatchNumber(formData.name.trim()),
        receivedDate: currentDate,
        donor: formData.donor.trim() || undefined,
        lastModifiedBy: formData.modifiedBy.trim(),
        lastModifiedDate: currentDate,
      };
      setItems((prev) => [...prev, newItem]);
      toast.success("Item added successfully");
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      quantity: item.quantity.toString(),
      expiry: item.expiry,
      donor: item.donor || "",
      modifiedBy: "",
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item deleted successfully");
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const getExpiryIcon = (status: string) => {
    switch (status) {
      case "expired":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case "expiring":
        return (
          <AlertCircle className="w-4 h-4 text-orange-600" />
        );
      case "fresh":
        return (
          <CheckCircle className="w-4 h-4 text-green-600" />
        );
      default:
        return null;
    }
  };

  const getExpiryTextColor = (status: string) => {
    switch (status) {
      case "expired":
        return "text-red-600";
      case "expiring":
        return "text-orange-600";
      case "fresh":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const statsData = useMemo(() => {
    const fresh = items.filter(
      (item) => item.status === "fresh",
    ).length;
    const expiring = items.filter(
      (item) => item.status === "expiring",
    ).length;
    const expired = items.filter(
      (item) => item.status === "expired",
    ).length;
    return { fresh, expiring, expired };
  }, [items]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shrink-0">
              <PantryKeeperLogo className="w-12 h-12" />
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900">
                PantryKeeper
              </h1>
              <p className="text-gray-600 mt-0.5 text-sm leading-snug">
                Children's Wishing Well • Food Donation
                Management
              </p>
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              asChild
            >
              <a
                href="https://github.com/ReubenChan96/cww-food-inventory/wiki"
                target="_blank"
                rel="noopener noreferrer"
                title="Documentation"
              >
                <FileText className="w-4 h-4" />
              </a>
            </Button>
            <Button
              className="h-10 px-6"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Add New Item
            </Button>
          </div>

          {/* Mobile FAB */}
          <Button
            className="md:hidden fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 p-0"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-8 h-8" />
          </Button>

          <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <DialogHeader className="pb-4">
                  <DialogTitle className="text-xl">
                    {editingItem ? "Edit Item" : "Add Item"}
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    {editingItem
                      ? "Update the item details below."
                      : "Fill in the details to add to inventory."}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 pb-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-base">
                      Item Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter item name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="description"
                      className="text-base"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Enter item description (optional)"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="min-h-20 text-base"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="quantity"
                      className="text-base"
                    >
                      Quantity *
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          quantity: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="expiry"
                      className="text-base"
                    >
                      Expiry Date *
                    </Label>
                    <div className="relative">
                      <Input
                        id="expiry"
                        type="date"
                        value={formData.expiry}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            expiry: e.target.value,
                          }))
                        }
                        className="h-12 text-base"
                        required
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="donor"
                      className="text-base"
                    >
                      Donor/Source
                    </Label>
                    <Input
                      id="donor"
                      placeholder="Enter donor name (optional)"
                      value={formData.donor}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          donor: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="modified-by"
                      className="text-base"
                    >
                      {editingItem
                        ? "Modified By *"
                        : "Added By *"}
                    </Label>
                    <Input
                      id="modified-by"
                      placeholder="Enter your name"
                      value={formData.modifiedBy}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          modifiedBy: e.target.value,
                        }))
                      }
                      className="h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <DialogFooter className="gap-3 pt-4 border-t sm:flex-row flex-col-reverse">
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="h-14 sm:h-12 w-full sm:flex-1 text-base"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="h-14 sm:h-12 w-full sm:flex-1 text-base"
                  >
                    {editingItem ? "Update Item" : "Add Item"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards - Interactive Filters */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <Card
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              filterStatus === "fresh"
                ? "ring-2 ring-green-500 shadow-md bg-green-50"
                : "hover:bg-gray-50"
            }`}
            onClick={() =>
              setFilterStatus(
                filterStatus === "fresh" ? "all" : "fresh",
              )
            }
          >
            <CardContent className="p-4 md:p-4">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-3xl md:text-2xl font-semibold text-green-600">
                  {statsData.fresh}
                </p>
                <p className="text-sm md:text-sm text-gray-600">
                  Fresh
                </p>
                <div
                  className={`w-8 h-8 md:w-7 md:h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    filterStatus === "fresh"
                      ? "bg-green-600"
                      : "bg-green-100"
                  }`}
                >
                  <CheckCircle
                    className={`w-5 h-5 md:w-4 md:h-4 transition-colors ${
                      filterStatus === "fresh"
                        ? "text-white"
                        : "text-green-600"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              filterStatus === "expiring"
                ? "ring-2 ring-orange-500 shadow-md bg-orange-50"
                : "hover:bg-gray-50"
            }`}
            onClick={() =>
              setFilterStatus(
                filterStatus === "expiring"
                  ? "all"
                  : "expiring",
              )
            }
          >
            <CardContent className="p-4 md:p-4">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-3xl md:text-2xl font-semibold text-orange-600">
                  {statsData.expiring}
                </p>
                <p className="text-sm md:text-sm text-gray-600">
                  Expiring
                </p>
                <div
                  className={`w-8 h-8 md:w-7 md:h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    filterStatus === "expiring"
                      ? "bg-orange-600"
                      : "bg-orange-100"
                  }`}
                >
                  <AlertCircle
                    className={`w-5 h-5 md:w-4 md:h-4 transition-colors ${
                      filterStatus === "expiring"
                        ? "text-white"
                        : "text-orange-600"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              filterStatus === "expired"
                ? "ring-2 ring-red-500 shadow-md bg-red-50"
                : "hover:bg-gray-50"
            }`}
            onClick={() =>
              setFilterStatus(
                filterStatus === "expired" ? "all" : "expired",
              )
            }
          >
            <CardContent className="p-4 md:p-4">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-3xl md:text-2xl font-semibold text-red-600">
                  {statsData.expired}
                </p>
                <p className="text-sm md:text-sm text-gray-600">
                  Expired
                </p>
                <div
                  className={`w-8 h-8 md:w-7 md:h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    filterStatus === "expired"
                      ? "bg-red-600"
                      : "bg-red-100"
                  }`}
                >
                  <AlertCircle
                    className={`w-5 h-5 md:w-4 md:h-4 transition-colors ${
                      filterStatus === "expired"
                        ? "text-white"
                        : "text-red-600"
                    }`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6 md:p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 md:w-4 md:h-4" />
                <Input
                  placeholder="Search items by name or description..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="pl-12 md:pl-10 h-12 md:h-10 text-base"
                />
              </div>

              <Select
                value={filterStatus}
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-full sm:w-48 h-12 md:h-10 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="fresh">
                    Fresh Only
                  </SelectItem>
                  <SelectItem value="expiring">
                    Expiring Soon
                  </SelectItem>
                  <SelectItem value="expired">
                    Expired Only
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Current Inventory
              <span className="text-sm font-normal text-gray-500">
                ({filteredItems.length} items)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">
                  No items found
                </p>
                <p className="text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <div className="border-b bg-gray-50">
                    <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-600">
                      <div className="col-span-4">
                        Name & Description
                      </div>
                      <div className="col-span-3">
                        Batch & Donor
                      </div>
                      <div className="col-span-2">Quantity</div>
                      <div className="col-span-2">
                        Expiry Date
                      </div>
                      <div className="col-span-1">Actions</div>
                    </div>
                  </div>

                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="border-b last:border-b-0"
                    >
                      <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                        <div className="col-span-4">
                          <div className="font-medium">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {item.description}
                            </div>
                          )}
                        </div>
                        <div className="col-span-3">
                          <div className="font-mono text-sm">
                            {item.batchNumber}
                          </div>
                          {item.donor && (
                            <div className="text-sm text-gray-600">
                              Donor: {item.donor}
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            Received:{" "}
                            {new Date(
                              item.receivedDate,
                            ).toLocaleDateString()}
                          </div>
                          {item.lastModifiedBy && (
                            <div className="text-xs text-gray-500">
                              Updated by: {item.lastModifiedBy}
                            </div>
                          )}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">
                            {item.quantity}
                          </span>
                        </div>
                        <div
                          className={`col-span-2 flex items-center gap-2 ${getExpiryTextColor(item.status)}`}
                        >
                          {getExpiryIcon(item.status)}
                          <span>
                            {new Date(
                              item.expiry,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="col-span-1">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-10 h-10 md:w-8 md:h-8 p-0"
                              >
                                <MoreVertical className="w-5 h-5 md:w-4 md:h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEdit(item)}
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600"
                                onClick={() =>
                                  handleDeleteClick(item.id)
                                }
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-2 p-3">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="p-2.5">
                      {/* Header: Name + Actions */}
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-lg leading-tight">
                          {item.name}
                        </h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0 shrink-0 -mr-0.5 -mt-0.5"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="text-base"
                          >
                            <DropdownMenuItem
                              onClick={() => handleEdit(item)}
                              className="py-3"
                            >
                              <Edit className="w-5 h-5 mr-3" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600 py-3"
                              onClick={() =>
                                handleDeleteClick(item.id)
                              }
                            >
                              <Trash2 className="w-5 h-5 mr-3" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Description if exists */}
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-1.5 leading-tight">
                          {item.description}
                        </p>
                      )}

                      {/* Two-column metadata */}
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mb-1.5 text-xs">
                        <div className="flex items-center gap-1.5">
                          <Package className="w-3 h-3 text-gray-400 shrink-0" />
                          <span className="text-gray-600 font-mono truncate">
                            {item.batchNumber}
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 ${getExpiryTextColor(item.status)}`}
                        >
                          {getExpiryIcon(item.status)}
                          <span className="truncate">
                            {new Date(
                              item.expiry,
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        {item.donor && (
                          <div className="text-gray-600 truncate col-span-2">
                            Donor: {item.donor}
                          </div>
                        )}
                      </div>

                      {/* Quantity display */}
                      <div className="flex items-center justify-between pt-1.5 border-t text-sm">
                        <span className="text-gray-600">
                          Quantity
                        </span>
                        <span className="font-semibold">
                          {item.quantity}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Item</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete && (
                <>
                  Are you sure you want to delete "
                  {
                    items.find(
                      (item) => item.id === itemToDelete,
                    )?.name
                  }
                  "? This action cannot be undone.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="h-12 md:h-10 flex-1">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                itemToDelete && handleDelete(itemToDelete)
              }
              className="bg-red-600 hover:bg-red-700 h-12 md:h-10 flex-1"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster richColors position="top-right" />

      {/* Footer */}
      <footer className="mt-16 mb-20 md:mb-0 border-t border-gray-200 pt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600">
                © 2025 PantryKeeper. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Developed for Children's Wishing Well by
                Better.sg
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="https://github.com/ReubenChan96/cww-food-inventory/wiki"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Documentation
              </a>
              <a
                href="mailto:support@pantrykeeper.org"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Support
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}