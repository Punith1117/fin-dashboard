import { StatsGrid } from './components/Summary/StatsGrid';
import './index.css';

function App() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-sm bg-finance-surface p-6">
        <h1 className="text-2xl font-bold text-finance-primary mb-6">Finance Dashboard</h1>
        
        <StatsGrid />
        
        {/* Placeholder for the Transactions List and Add Modal */}
      </div>
    </div>
  );
}

export default App;
