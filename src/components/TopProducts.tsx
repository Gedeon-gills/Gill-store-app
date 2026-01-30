import { useState, useEffect } from 'react';
import { adminAPI } from '../shared/services/adminAPI';

interface Product {
  _id: string;
  name: string;
  price: number;
  sales?: number;
  image?: string;
}

export const TopProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const data = await adminAPI.getTopProducts();
        setProducts(data.products || data || []);
      } catch (error) {
        console.error('Error fetching top products:', error);
        // Mock data for demo
        setProducts([
          { _id: '1', name: 'Wireless Headphones', price: 199, sales: 145 },
          { _id: '2', name: 'Smart Watch', price: 299, sales: 98 },
          { _id: '3', name: 'Laptop Stand', price: 89, sales: 87 },
          { _id: '4', name: 'Phone Case', price: 29, sales: 76 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Top Products</h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-800">Top Products</h3>
        <button className="text-purple-600 text-sm font-medium hover:text-purple-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {products.slice(0, 5).map((product, index) => (
          <div key={product._id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-8 h-8 object-cover rounded-lg" />
                ) : (
                  <span className="text-purple-600 font-bold text-sm">#{index + 1}</span>
                )}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-slate-800 text-sm truncate">{product.name}</h4>
              <div className="flex items-center justify-between mt-1">
                <span className="text-slate-500 text-xs">${product.price}</span>
                {product.sales && (
                  <span className="text-green-600 text-xs font-medium">{product.sales} sold</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-400 text-sm">No products found</p>
        </div>
      )}
    </div>
  );
};