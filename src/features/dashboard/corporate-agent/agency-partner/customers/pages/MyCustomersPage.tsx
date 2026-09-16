import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { CustomerStatCards } from "../components/CustomerStatCards";
import { CustomerFilterTabs, type CustomerTab } from "../components/CustomerFilterTabs";
import { CustomerFilterBar } from "../components/CustomerFilterBar";
import { CustomerTable } from "../components/CustomerTable";
import { NeedsAttentionCard } from "../components/NeedsAttentionCard";
import { CustomersByTypeCard } from "../components/CustomersByTypeCard";
import { CustomersByNetworkCard } from "../components/CustomersByNetworkCard";
import { RecentActivityCard } from "../components/RecentActivityCard";
import { AddCustomerModal } from "../Modals/AddCustomerModal";
import { SendRenewalReminderModal } from "../Modals/SendRenewalReminderModal";
import { SendBulkRemindersModal } from "../Modals/SendBulkRemindersModal";
import { INITIAL_CUSTOMERS } from "../data/customer.data";
import type { CustomerItem } from "../types/customer.types";
import { APP_COLORS } from "@/constants/colors";

export function MyCustomersPage() {
  const [customers, setCustomers] = useState<CustomerItem[]>(INITIAL_CUSTOMERS);
  const [activeTab, setActiveTab] = useState<CustomerTab>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [simTypeFilter, setSimTypeFilter] = useState("All");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  // Modals state
  const [addCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [bulkReminderModalOpen, setBulkReminderModalOpen] = useState(false);
  const [selectedCustomerForReminder, setSelectedCustomerForReminder] = useState<CustomerItem | null>(null);

  // Filter logic
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      // Tab filter
      if (activeTab === "Active" && c.status !== "Active") return false;
      if (activeTab === "Expiring" && c.status !== "Expiring") return false;
      if (activeTab === "Expired" && c.status !== "Expired") return false;
      if (activeTab === "New This Month" && !c.activatedDate.includes("Jun")) return false;

      // Dropdown filters
      if (simTypeFilter !== "All" && c.simType !== simTypeFilter) return false;
      if (networkFilter !== "All" && c.network !== networkFilter) return false;

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = c.name.toLowerCase().includes(q);
        const matchesPhone = c.phone.includes(q);
        const matchesSim = c.simNumber.replace(/\s/g, "").includes(q.replace(/\s/g, ""));
        if (!matchesName && !matchesPhone && !matchesSim) return false;
      }

      return true;
    });
  }, [customers, activeTab, simTypeFilter, networkFilter, searchQuery]);

  const handleAddCustomer = (newCust: Partial<CustomerItem>) => {
    const customerToAdd: CustomerItem = {
      id: `cust-${Date.now()}`,
      name: newCust.name || "New Customer",
      phone: newCust.phone || "",
      email: newCust.email || "",
      address: newCust.address || "",
      simNumber: newCust.simNumber || "0700 000 0000",
      simType: newCust.simType || "POS",
      network: newCust.network || "MTN",
      plan: newCust.plan || "30D · Active",
      status: "Active",
      activatedDate: "Today",
      expiryDate: "26 Jul",
      daysRemaining: 30,
      dataUsed: "0GB",
      totalData: "18GB",
      autoRenew: false,
      commission: 1000,
      addedBy: "Yusuf Adam Baba (you)",
      customerSince: "Today",
    };

    setCustomers((prev) => [customerToAdd, ...prev]);
  };

  const handleOpenReminder = (customer: CustomerItem) => {
    setSelectedCustomerForReminder(customer);
    setReminderModalOpen(true);
  };

  const handleOpenRemindSingle = (name: string, phone: string) => {
    const existing = customers.find((c) => c.phone === phone || c.name === name);
    if (existing) {
      setSelectedCustomerForReminder(existing);
    } else {
      setSelectedCustomerForReminder({
        id: "temp",
        name,
        phone,
        email: "",
        address: "",
        simNumber: "0700 000 0000",
        simType: "POS",
        network: "MTN",
        plan: "30-day",
        status: "Expiring",
        activatedDate: "Jun 2026",
        expiryDate: "26 Jun 2026",
        daysRemaining: 3,
        dataUsed: "0GB",
        totalData: "18GB",
        autoRenew: false,
        commission: 1000,
      });
    }
    setReminderModalOpen(true);
  };

  const handleClearAllFilters = () => {
    setSearchQuery("");
    setSimTypeFilter("All");
    setNetworkFilter("All");
    setActiveTab("All");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0F152A] tracking-tight">My Customers</h1>
          <p className="mt-0.5 text-xs text-[#66738C] font-medium">
            All customers whose SIMs you have activated
          </p>
        </div>

        <button
          type="button"
          onClick={() => setAddCustomerModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1D4ED8]"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <Plus className="size-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Top 4 KPI Cards */}
      <CustomerStatCards
        totalCustomers={247}
        activeSims={198}
        expiringSims={23}
        expiredSims={26}
      />

      {/* Filter Tabs */}
      <CustomerFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Filter & Search Bar */}
      <CustomerFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        simTypeFilter={simTypeFilter}
        onSimTypeFilterChange={setSimTypeFilter}
        networkFilter={networkFilter}
        onNetworkFilterChange={setNetworkFilter}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        totalCount={customers.length}
        visibleCount={filteredCustomers.length}
        onClearAllFilters={handleClearAllFilters}
      />

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): Customers Table */}
        <div className="lg:col-span-8">
          <CustomerTable
            customers={filteredCustomers}
            onRemindClick={handleOpenReminder}
          />
        </div>

        {/* Right Column (4 cols): Side Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <NeedsAttentionCard
            onRemindSingle={handleOpenRemindSingle}
            onSendAllReminders={() => setBulkReminderModalOpen(true)}
          />

          <CustomersByTypeCard />

          <CustomersByNetworkCard />

          <RecentActivityCard />
        </div>
      </div>

      {/* MODALS */}
      <AddCustomerModal
        open={addCustomerModalOpen}
        onOpenChange={setAddCustomerModalOpen}
        onAddCustomer={handleAddCustomer}
        existingCustomers={customers}
      />

      {selectedCustomerForReminder && (
        <SendRenewalReminderModal
          open={reminderModalOpen}
          onOpenChange={setReminderModalOpen}
          customerName={selectedCustomerForReminder.name}
          customerPhone={selectedCustomerForReminder.phone}
          simNumber={selectedCustomerForReminder.simNumber}
          simType={selectedCustomerForReminder.simType}
          network={selectedCustomerForReminder.network}
          expiryDate={selectedCustomerForReminder.expiryDate}
          daysRemaining={selectedCustomerForReminder.daysRemaining || 3}
        />
      )}

      <SendBulkRemindersModal
        open={bulkReminderModalOpen}
        onOpenChange={setBulkReminderModalOpen}
        count={23}
      />
    </div>
  );
}

export default MyCustomersPage;
