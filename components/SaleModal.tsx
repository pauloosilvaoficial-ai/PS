
import React, { useState } from 'react';
import { Product, Sale } from '../types';

interface SaleModalProps {
  products: Product[];
  onClose: () => void;
  onSave: (sale: Sale) => void;
}

const SaleModal: React.FC<SaleModalProps> = ({ products, onClose, onSave }) => {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [quantity, setQuantity] = useState('1');

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    const qty = parseInt(quantity);
    const totalAmount = selectedProduct.sellingPrice * qty;
    const totalCost = selectedProduct.costPrice * qty;
    const profit = totalAmount - totalCost;

    onSave({
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: qty,
      totalAmount,
      profit,
      date: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Registrar Venda</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Selecione o Produto</label>
            <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                {products.length === 0 ? (
                    <p className="col-span-2 text-sm text-slate-400 italic">Nenhum produto cadastrado.</p>
                ) : (
                    products.map(p => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedProductId(p.id)}
                            className={`p-3 text-left rounded-xl border-2 transition ${selectedProductId === p.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 hover:border-slate-200 bg-slate-50'}`}
                        >
                            <span className="block font-bold text-sm text-slate-800 truncate">{p.name}</span>
                            <span className="block text-xs text-slate-500 mt-1">Estoque: {p.stock}</span>
                            <span className="block text-sm font-bold text-emerald-600 mt-1">R$ {p.sellingPrice.toFixed(2)}</span>
                        </button>
                    ))
                )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1">
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Quantidade</label>
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button 
                        type="button" 
                        onClick={() => setQuantity(prev => Math.max(1, parseInt(prev) - 1).toString())}
                        className="px-4 py-3 hover:bg-slate-200 transition text-slate-600"
                    >-</button>
                    <input 
                        type="number" 
                        className="w-full text-center bg-transparent outline-none font-bold"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                    />
                    <button 
                        type="button" 
                        onClick={() => setQuantity(prev => (parseInt(prev) + 1).toString())}
                        className="px-4 py-3 hover:bg-slate-200 transition text-slate-600"
                    >+</button>
                </div>
            </div>
            {selectedProduct && (
                <div className="flex-1 text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase">Subtotal</span>
                    <div className="text-2xl font-bold text-slate-800">
                        R$ {(selectedProduct.sellingPrice * parseInt(quantity || '0')).toFixed(2)}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">
                        Lucro Estimado: R$ {((selectedProduct.sellingPrice - selectedProduct.costPrice) * parseInt(quantity || '0')).toFixed(2)}
                    </span>
                </div>
            )}
          </div>

          <div className="pt-4 flex space-x-3">
             <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition">Cancelar</button>
             <button 
                type="submit" 
                disabled={!selectedProductId}
                className={`flex-1 px-4 py-3 rounded-xl font-bold transition text-white ${!selectedProductId ? 'bg-slate-300 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-200'}`}
             >
                Confirmar Venda
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleModal;
