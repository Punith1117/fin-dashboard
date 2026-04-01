import { StatsGrid } from './components/Summary/StatsGrid';
import { TransactionList } from './components/Transactions/TransactionList';
import { AddTransactionModal } from './components/Transactions/AddTransactionModal';
import './index.css';

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-sm bg-finance-surface p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-finance-primary">Finance Dashboard</h1>
          <AddTransactionModal />
        </div>
        
        <StatsGrid />
        
        <TransactionList />
      </div>
    </div>
  );
}

export default App;
