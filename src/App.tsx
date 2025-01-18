import { FiPhoneCall } from "react-icons/fi"; // Import phone icon
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { DashboardPage } from "./pages/DashboardPage";
import { CallsPage } from "./pages/CallsPage";
import { AutomationPage } from "./pages/AutomationPage";
import { OrdersPage } from "./pages/OrdersPage";
import { CustomersPage } from "./pages/CustomersPage";
import { MessagesPage } from "./pages/MessagesPage";
import { SettingsPage } from "./pages/SettingsPage";
import { DocumentationPage } from "./pages/DocumentationPage";
import { IntegrationPage } from "./pages/IntegrationPage";
import { Products } from "./pages/Products";
import { BatchUpload } from "./pages/BatchUpload";
import { CreateBatch } from "./components/CreateBatch";
import { CallingPage } from "./components/CallingComponent";
import { TxtContentPage } from "./components/TxtContentPage";

function App() {
  const handlePhoneCall = () => {
    const sipUri = 'sip:username@yourdomain.com'; // Example SIP URI
    window.location.href = `sip:${sipUri}`; // This may trigger X-Lite if it supports SIP URIs
    alert("Attempting to open X-Lite...");
  };
  
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/calls" element={<CallsPage />} />
            <Route path="/automation" element={<AutomationPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/documentation" element={<DocumentationPage />} />
            <Route path="/integrations" element={<IntegrationPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/batch-upload" element={<BatchUpload />} />
            <Route path="/create-batch" element={<CreateBatch />} />
            <Route path="/calls-flow" element={<CallingPage />} />
            <Route path="/txt-content" element={<TxtContentPage />} />
          </Routes>

          {/* Floating Action Button */}
          <div className="fixed bottom-4 right-4">
            <button
              className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
              onClick={handlePhoneCall}
            >
              <FiPhoneCall size={24} />
            </button>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
