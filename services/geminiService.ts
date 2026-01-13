
import { GoogleGenAI } from "@google/genai";
import { Product, Sale, BusinessStats, Expense } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Motor de Análise Local (Offline)
const getLocalInsights = (products: Product[], stats: BusinessStats): string => {
  const insights: string[] = [];

  // Análise de Margem
  if (stats.margin < 20) {
    insights.push("⚠️ Sua margem real está baixa (" + stats.margin.toFixed(1) + "%). Considere revisar os preços de venda ou reduzir custos operacionais.");
  } else if (stats.margin > 40) {
    insights.push("✅ Excelente margem de lucro! Você tem espaço para investir em marketing ou expansão.");
  }

  // Análise de Gastos
  const expenseRatio = (stats.totalExpenses / stats.totalRevenue) * 100;
  if (expenseRatio > 30) {
    insights.push("📉 Seus gastos representam " + expenseRatio.toFixed(1) + "% do faturamento. Identifique despesas desnecessárias para proteger seu lucro líquido.");
  }

  // Análise de Estoque
  const lowStock = products.filter(p => p.stock > 0 && p.stock < 5);
  if (lowStock.length > 0) {
    insights.push("📦 Alerta de Inventário: " + lowStock.length + " produtos estão com estoque crítico (menos de 5 unidades). Reabasteça para não perder vendas.");
  }

  // Mensagem Padrão se não houver alertas específicos
  if (insights.length === 0) {
    insights.push("🚀 O negócio está equilibrado. Foco em manter o ritmo de vendas e o controle rigoroso dos registros.");
  }

  return "MODO OFFLINE ATIVO: \n" + insights.join("\n\n");
};

export const getBusinessInsights = async (
  products: Product[],
  sales: Sale[],
  stats: BusinessStats
) => {
  // Verifica se está offline
  if (!navigator.onLine) {
    return getLocalInsights(products, stats);
  }

  const prompt = `
    Como consultor financeiro para o empreendedor Paulo Silva, analise os seguintes dados do negócio dele:
    
    Resumo Financeiro:
    - Faturamento Total: R$ ${stats.totalRevenue.toFixed(2)}
    - Lucro Bruto de Vendas: R$ ${stats.totalProfit.toFixed(2)}
    - Gastos Totais: R$ ${stats.totalExpenses.toFixed(2)}
    - Lucro Líquido Real: R$ ${stats.netProfit.toFixed(2)}
    - Margem Média: ${stats.margin.toFixed(2)}%
    
    Produtos (${products.length} cadastrados):
    ${products.map(p => `- ${p.name}: Custo R$${p.costPrice}, Venda R$${p.sellingPrice}, Estoque: ${p.stock}`).join('\n')}
    
    Forneça 3 conselhos estratégicos curtos focando em otimização de lucro e controle de gastos. Seja direto.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Você é um assistente de negócios de elite chamado 'BI Paulo Silva'. Seja direto, motivador e profissional.",
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Erro na API, mudando para motor local:", error);
    return getLocalInsights(products, stats);
  }
};
