import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AccountsPage from "./pages/AccountsPage";
import GrowthPage from "./pages/GrowthPage";

// Account Features
import Sales from "./pages/accounts/Sales";
import Invoice from "./pages/accounts/Invoice";
import Receipt from "./pages/accounts/Receipt";
import Payment from "./pages/accounts/Payment";
import PurchaseReturn from "./pages/accounts/PurchaseReturn";
import SalesReturn from "./pages/accounts/SalesReturn";
import Ledger from "./pages/accounts/Ledger";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/accounts/sales" element={<Sales />} />
            <Route path="/accounts/invoice" element={<Invoice />} />
            <Route path="/accounts/receipt" element={<Receipt />} />
            <Route path="/accounts/payment" element={<Payment />} />
            <Route path="/accounts/purchase-return" element={<PurchaseReturn />} />
            <Route path="/accounts/sales-return" element={<SalesReturn />} />
            <Route path="/accounts/ledger" element={<Ledger />} />
            <Route path="/growth" element={<GrowthPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
