
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
        <svg className="w-16 h-16 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l-8-4" /></svg>
        <p className="text-slate-500 font-medium">Nenhum produto cadastrado ainda.</p>
        <p className="text-slate-400 text-sm">Comece adicionando seu primeiro item no botão acima.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-md transition">
          <div className="h-48 bg-slate-100 relative overflow-hidden">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-300">
                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            )}
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition">
              <button 
                onClick={() => onDelete(product.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                title="Excluir"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-slate-600 uppercase">
              {product.category || 'Geral'}
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-slate-800 mb-1 truncate">{product.name}</h4>
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Venda</span>
                <span className="text-lg font-bold text-emerald-600">R$ {product.sellingPrice.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Estoque</span>
                <span className={`text-sm font-semibold ${product.stock < 5 ? 'text-red-500' : 'text-slate-600'}`}>{product.stock} un.</span>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                <span className="text-xs text-slate-400">Custo: R$ {product.costPrice.toFixed(2)}</span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Profit: +{((product.sellingPrice - product.costPrice) / product.sellingPrice * 100).toFixed(0)}%
                </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
