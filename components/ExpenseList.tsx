
import React from 'react';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
           <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <p className="text-slate-500 font-bold">Nenhum gasto registrado.</p>
        <p className="text-slate-400 text-sm mt-1">Registre suas despesas fixas ou variáveis aqui.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Data</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Descrição</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Categoria</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Valor</th>
              <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {expenses.slice().reverse().map(expense => (
              <tr key={expense.id} className="hover:bg-slate-50/30 transition group">
                <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                  {new Date(expense.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-800">{expense.description}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase">
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-red-500">
                    - R$ {expense.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDelete(expense.id)}
                    className="p-2 text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
