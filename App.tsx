
import React, { useState, useEffect, useCallback } from 'react';
import { Product, Sale, Expense, BusinessStats } from './types';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import SalesHistory from './components/SalesHistory';
import ExpenseList from './components/ExpenseList';
import ProductModal from './components/ProductModal';
import SaleModal from './components/SaleModal';
import ExpenseModal from './components/ExpenseModal';
import { getBusinessInsights } from './services/geminiService';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'sales' | 'expenses'>('dashboard');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [aiInsight, setAiInsight] = useState<string>('Analisando dados...');
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  // Persistence
  useEffect(() => {
    const savedProducts = localStorage.getItem('ps_products');
    const savedSales = localStorage.getItem('ps_sales');
    const savedExpenses = localStorage.getItem('ps_expenses');
    const lastInsight = localStorage.getItem('ps_last_insight');
    
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedSales) setSales(JSON.parse(savedSales));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (lastInsight) setAiInsight(lastInsight);
  }, []);

  useEffect(() => {
    localStorage.setItem('ps_products', JSON.stringify(products));
    localStorage.setItem('ps_sales', JSON.stringify(sales));
    localStorage.setItem('ps_expenses', JSON.stringify(expenses));
  }, [products, sales, expenses]);

  const stats: BusinessStats = React.useMemo(() => {
    const totalRevenue = sales.reduce((acc, sale) => acc + sale.totalAmount, 0);
    const totalProfit = sales.reduce((acc, sale) => acc + sale.profit, 0);
    const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
    const netProfit = totalProfit - totalExpenses;
    const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    
    return {
      totalSales: sales.length,
      totalProfit,
      totalRevenue,
      totalExpenses,
      netProfit,
      margin
    };
  }, [sales, expenses]);

  const fetchInsights = useCallback(async () => {
    if (products.length === 0 && sales.length === 0) {
        setAiInsight("Adicione dados para receber uma análise estratégica personalizada.");
        return;
    }
    setLoadingInsight(true);
    const insight = await getBusinessInsights(products, sales, stats);
    if (insight) {
        setAiInsight(insight);
        localStorage.setItem('ps_last_insight', insight);
    }
    setLoadingInsight(false);
  }, [products, sales, stats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInsights();
    }, 1500);
    return () => clearTimeout(timer);
  }, [sales.length, expenses.length, isOnline]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
    setIsProductModalOpen(false);
  };

  const addSale = (sale: Sale) => {
    setSales(prev => [...prev, sale]);
    setProducts(prev => prev.map(p => {
        if (p.id === sale.productId) {
            return { ...p, stock: Math.max(0, p.stock - sale.quantity) };
        }
        return p;
    }));
    setIsSaleModalOpen(false);
  };

  const addExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
    setIsExpenseModalOpen(false);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col sticky top-0 h-auto md:h-screen z-20">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-poppins font-bold tracking-tight text-emerald-400 uppercase">Paulo Silva</h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-medium">Gestão Inteligente</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l-8-4" /></svg>
            Produtos
          </button>
          <button 
            onClick={() => setActiveTab('sales')}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'sales' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Vendas
          </button>
          <button 
            onClick={() => setActiveTab('expenses')}
            className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'expenses' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Gastos
          </button>
        </nav>
        
        <div className="p-4 mt-auto border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black text-white">PS</div>
             <span className="text-xs font-bold text-slate-300">Conectado como Paulo</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                {activeTab === 'dashboard' && 'Visão Estratégica'}
                {activeTab === 'products' && 'Catálogo Visual'}
                {activeTab === 'sales' && 'Histórico de Vendas'}
                {activeTab === 'expenses' && 'Controle de Custos'}
            </h2>
            <div className="flex items-center mt-1">
                <p className="text-slate-500 font-medium mr-3">Gerenciamento VIP</p>
                <span className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${isOnline ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`}></span>
                    {isOnline ? 'ONLINE' : 'MODO OFFLINE'}
                </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setIsExpenseModalOpen(true)} className="px-4 py-2 bg-white text-red-600 border border-red-100 rounded-xl hover:bg-red-50 transition flex items-center text-xs font-black shadow-sm">
                NOVO GASTO
            </button>
            <button onClick={() => setIsProductModalOpen(true)} className="px-4 py-2 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition flex items-center text-xs font-black">
                NOVO PRODUTO
            </button>
            <button onClick={() => setIsSaleModalOpen(true)} className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition flex items-center text-xs font-black shadow-lg shadow-emerald-200">
                REGISTRAR VENDA
            </button>
          </div>
        </header>

        <div className="mb-8 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-start group">
            <div className={`mr-4 p-3 rounded-xl transition-colors ${isOnline ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isOnline ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {isOnline ? 'IA Gemini | Consultoria Estratégica' : 'BI LOCAL | Análise de Contingência'}
                    </span>
                    <button onClick={fetchInsights} disabled={loadingInsight} className="text-[10px] font-bold text-slate-300 hover:text-emerald-600 uppercase transition">
                        {loadingInsight ? 'Sincronizando...' : 'Atualizar'}
                    </button>
                </div>
                <div className="text-sm text-slate-700 leading-relaxed font-medium italic whitespace-pre-line">
                    {aiInsight}
                </div>
            </div>
        </div>

        {activeTab === 'dashboard' && <Dashboard stats={stats} sales={sales} />}
        {activeTab === 'products' && <ProductList products={products} onDelete={(id) => setProducts(p => p.filter(x => x.id !== id))} />}
        {activeTab === 'sales' && <SalesHistory sales={sales} />}
        {activeTab === 'expenses' && <ExpenseList expenses={expenses} onDelete={deleteExpense} />}
      </main>

      {isProductModalOpen && <ProductModal onClose={() => setIsProductModalOpen(false)} onSave={addProduct} />}
      {isSaleModalOpen && <SaleModal products={products} onClose={() => setIsSaleModalOpen(false)} onSave={addSale} />}
      {isExpenseModalOpen && <ExpenseModal onClose={() => setIsExpenseModalOpen(false)} onSave={addExpense} />}
    </div>
  );
};

export default App;
