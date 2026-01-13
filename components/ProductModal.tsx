
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductModalProps {
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    costPrice: '',
    sellingPrice: '',
    stock: '',
    category: 'Geral',
    image: null as string | null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.costPrice || !formData.sellingPrice) return;

    onSave({
      id: crypto.randomUUID(),
      name: formData.name,
      costPrice: parseFloat(formData.costPrice),
      sellingPrice: parseFloat(formData.sellingPrice),
      stock: parseInt(formData.stock) || 0,
      category: formData.category,
      image: formData.image
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Novo Produto</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden">
                {formData.image ? (
                   <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className="text-[10px] text-slate-500 font-bold uppercase mt-2">Add Foto</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome do Produto</label>
            <input 
                autoFocus
                type="text" 
                required
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Tênis Esportivo Pro"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preço de Custo</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-slate-400 text-sm">R$</span>
                <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.costPrice}
                    onChange={e => setFormData(prev => ({ ...prev, costPrice: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Preço de Venda</label>
              <div className="relative">
                <span className="absolute left-3 top-3.5 text-slate-400 text-sm">R$</span>
                <input 
                    type="number" 
                    step="0.01"
                    required
                    className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.sellingPrice}
                    onChange={e => setFormData(prev => ({ ...prev, sellingPrice: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estoque Inicial</label>
                <input 
                    type="number" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={formData.stock}
                    onChange={e => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Categoria</label>
                <select 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                >
                    <option value="Geral">Geral</option>
                    <option value="Eletrônicos">Eletrônicos</option>
                    <option value="Vestuário">Vestuário</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Beleza">Beleza</option>
                </select>
            </div>
          </div>

          <div className="pt-4 flex space-x-3">
             <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition">Cancelar</button>
             <button type="submit" className="flex-1 px-4 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition">Salvar Produto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
