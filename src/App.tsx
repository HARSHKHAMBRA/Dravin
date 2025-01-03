import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { CallsPage } from './pages/CallsPage';
import { AutomationPage } from './pages/AutomationPage';
import { OrdersPage } from './pages/OrdersPage';
import { CustomersPage } from './pages/CustomersPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';
import { DocumentationPage } from './pages/DocumentationPage';
import { IntegrationPage } from './pages/IntegrationPage'; // No need for .tsx extension
import { Products } from './pages/Products'; // No need for .tsx extension
import { BatchUpload } from './pages/BatchUpload'; // No need for .tsx extension
import { CreateBatch } from './components/CreateBatch';  // Assuming CreateBatch is in the same folder
import ivrflow from './ivr/IvrFlow'; // Import the ivrflow component

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-auto">
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
            <Route path="/products" element={<Products />} /> {/* Fixed path */}
            <Route path="/BatchUpload" element={<BatchUpload />} /> {/* Fixed path */}
            <Route path="/create-batch" element={<CreateBatch />} />
            <Route path="/ivrflow" element={<ivrflow />} /> {/* New route for ivrflow */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
