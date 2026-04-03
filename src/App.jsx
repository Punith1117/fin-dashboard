import { StatsGrid } from './components/Summary/StatsGrid';
import { DashboardCharts } from './components/Summary/DashboardCharts';
import { TransactionList } from './components/Transactions/TransactionList';
import { AddTransactionModal } from './components/Transactions/AddTransactionModal';
import { Shield } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

function App() {
  const { isAdmin, toggleAdminMode } = useAuthStore();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-sm bg-finance-surface p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-finance-primary">Finance Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAdminMode}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
                isAdmin 
                  ? 'bg-finance-primary/10 text-finance-primary border-finance-primary/20' 
                  : 'text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Shield size={18} />
              {isAdmin ? 'Admin Mode On' : 'Admin Mode Off'}
            </button>
            <AddTransactionModal />
          </div>
        </div>
        
        <StatsGrid />
        
        <DashboardCharts />
        
        <TransactionList />
      </div>
    </div>
  );
}

export default App;
