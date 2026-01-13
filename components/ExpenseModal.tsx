
import React, { useState } from 'react';
import { Expense } from '../types';

interface ExpenseModalProps {
  onClose: () => void;
  onSave: (expense: Expense) => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Outros',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    onSave({
      id: crypto.randomUUID(),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: new Date(formData.date).toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">Novo Gasto / Despesa</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Descrição do Gasto</label>
            <input 
                autoFocus
                type="text" 
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition font-medium"
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Ex: Aluguel, Internet, Embalagens..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Valor</label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-slate-400 font-bold">R$</span>
                <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-red-500"
                    value={formData.amount}
                    onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0,00"
                />
              </div>
            </div>
            <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Data</label>
                <input 
                    type="date" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium"
                    value={formData.date}
                    onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Categoria</label>
            <select 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 outline-none appearance-none font-bold text-slate-700"
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
            >
                <option value="Operacional">Operacional</option>
                <option value="Marketing">Marketing</option>
                <option value="Infraestrutura">Infraestrutura</option>
                <option value="Logística">Logística</option>
                <option value="Impostos">Impostos</option>
                <option value="Outros">Outros</option>
            </select>
          </div>

          <div className="pt-6 flex space-x-3">
             <button type="button" onClick={onClose} className="flex-1 px-4 py-4 border border-slate-200 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 transition">Cancelar</button>
             <button type="submit" className="flex-1 px-4 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition shadow-xl shadow-slate-200">Salvar Gasto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
