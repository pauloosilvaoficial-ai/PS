
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { BusinessStats, Sale } from '../types';

interface DashboardProps {
  stats: BusinessStats;
  sales: Sale[];
}

const Dashboard: React.FC<DashboardProps> = ({ stats, sales }) => {
  const chartData = sales.slice(-10).map(s => ({
    name: s.productName.substring(0, 10),
    lucro: s.profit,
    venda: s.totalAmount
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard 
            title="Faturamento" 
            value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} 
            color="text-slate-800" 
            bg="bg-white"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
        />
        <StatCard 
            title="Lucro Bruto" 
            value={`R$ ${stats.totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} 
            color="text-emerald-600" 
            bg="bg-emerald-50/30"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />}
        />
        <StatCard 
            title="Gastos" 
            value={`R$ ${stats.totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} 
            color="text-red-600" 
            bg="bg-red-50/30"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
        />
        <StatCard 
            title="Lucro Líquido" 
            value={`R$ ${stats.netProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} 
            color="text-indigo-600" 
            bg="bg-indigo-50/30"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />}
        />
        <StatCard 
            title="Margem Real" 
            value={`${stats.margin.toFixed(1)}%`} 
            color="text-amber-600" 
            bg="bg-amber-50/30"
            icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Performance por Produto</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="venda" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="Venda R$" />
                <Bar dataKey="lucro" fill="#10b981" radius={[6, 6, 0, 0]} name="Lucro R$" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Curva de Lucratividade</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="lucro" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorLucro)" name="Lucro R$" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; color: string; bg: string; icon: React.ReactNode }> = ({ title, value, color, bg, icon }) => (
  <div className={`${bg} p-6 rounded-2xl border border-slate-100 transition-all hover:shadow-md`}>
    <div className="flex justify-between items-start mb-4">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
      <div className={`p-2 rounded-lg ${color.replace('text', 'bg').replace('600', '100').replace('800', '100')} text-slate-600`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icon}</svg>
      </div>
    </div>
    <div className={`text-xl font-bold ${color} tracking-tight`}>{value}</div>
  </div>
);

export default Dashboard;
