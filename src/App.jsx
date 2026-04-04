import { StatsGrid } from './components/Summary/StatsGrid';
import { AnalyticsSection } from './components/Summary/AnalyticsSection';
import { TransactionList } from './components/Transactions/TransactionList';
import { AddTransactionModal } from './components/Transactions/AddTransactionModal';
import { DarkModeToggle } from './components/DarkModeToggle';
import { Shield } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import { useDarkModeStore } from './store/useDarkModeStore';
import { useEffect } from 'react';
import './index.css';

function App() {
  const { isAdmin, toggleAdminMode } = useAuthStore();
  const { isDarkMode } = useDarkModeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
    <div className="min-h-screen lg:p-8 dark:bg-gray-600">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-sm bg-finance-surface dark:bg-gray-900 lg:p-6 p-3">
        <div className="md:hidden flex justify-center mt-[-10px]">
          <a href="https://github.com/Punith1117/fin-dashboard" title="source code" className="underline dark:text-gray-300">by Punith1117</a>
        </div>
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-finance-surface dark:bg-gray-900 z-10 p-2">
          <h1 className="text-2xl font-bold text-finance-primary dark:brightness-150">Finance Dashboard</h1>
          <div className="hidden md:flex justify-center mt-[-10px]">
            <a href="https://github.com/Punith1117/fin-dashboard" title="source code" className="underline dark:text-gray-300">by Punith1117</a>
          </div>
          <button
            onClick={toggleAdminMode}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
              isAdmin
                ? 'bg-finance-primary/10 text-finance-primary dark:brightness-200 border-finance-primary/20'
                : 'text-gray-600 dark:text-gray-300 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-400 dark:hover:text-gray-900'
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
    <DarkModeToggle />
    </>
  );
}

export default App;
