
import React from 'react';
import { Sale } from '../types';

interface SalesHistoryProps {
  sales: Sale[];
}

const SalesHistory: React.FC<SalesHistoryProps> = ({ sales }) => {
  if (sales.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 border border-slate-100 text-center">
        <p className="text-slate-500">Nenhuma venda registrada ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Produto</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Qtd</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lucro</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sales.slice().reverse().map(sale => (
              <tr key={sale.id} className="hover:bg-slate-50/50 transition">
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(sale.date).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-800">{sale.productName}</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 text-center">
                  {sale.quantity}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  R$ {sale.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-emerald-600">
                    + R$ {sale.profit.toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistory;
