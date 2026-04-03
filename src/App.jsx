import { StatsGrid } from './components/Summary/StatsGrid';
import { AnalyticsSection } from './components/Summary/AnalyticsSection';
import { TransactionList } from './components/Transactions/TransactionList';
import { AddTransactionModal } from './components/Transactions/AddTransactionModal';
import { Shield } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

function App() {
  const { isAdmin, toggleAdminMode } = useAuthStore();

  return (
    <>
    <div className="min-h-screen lg:p-8">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-sm bg-finance-surface lg:p-6 p-3">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-finance-primary">Finance Dashboard</h1>
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
        </div>
        
        <StatsGrid />
        
        <AnalyticsSection />
        
        <TransactionList />
      </div>
    </div>

    <AddTransactionModal />
    </>
  );
}

export default App;
