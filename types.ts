
export interface Product {
  id: string;
  name: string;
  costPrice: number;
  sellingPrice: number;
  image: string | null;
  stock: number;
  category: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  profit: number;
  date: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export interface BusinessStats {
  totalSales: number;
  totalProfit: number; // Lucro bruto das vendas
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number; // Lucro líquido (Lucro das vendas - Despesas)
  margin: number;
}
