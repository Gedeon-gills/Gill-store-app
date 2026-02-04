import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { adminAPI } from "../shared/services/adminAPI";
import { notify } from "../shared/utils/notifications";

interface Product {
  _id: string;
  name: string;
  category: { name: string } | string;
  price: number;
  description?: string;
  images?: string[];
  stock?: number;
  createdAt: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    categoryId: '',
    stock: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({ name: '', price: '', description: '', category: '', categoryId: '', stock: '' });
    setImages([]);
    setExistingImages([]);
    setImagesToRemove([]);
    setEditingProduct(null);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description || '',
      category: typeof product.category === 'string' ? product.category : product.category.name,
      categoryId: '',
      stock: (product.stock || 0).toString()
    });
    setExistingImages(product.images || []);
    setImagesToRemove([]);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        const data = await adminAPI.getProducts();
        console.log('API Response:', data);
        setProducts(data.data?.products || data.products || data.data || data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('stock', formData.stock);
      
      if (!editingProduct) {
        formDataToSend.append('categoryId', formData.categoryId || '507f1f77bcf86cd799439011');
        // Images are required for new products
        images.forEach((image) => {
          formDataToSend.append('images', image);
        });
      } else {
        // For updates, only send images if there are actual changes
        if (images.length > 0 || imagesToRemove.length > 0) {
          if (images.length > 0) {
            images.forEach((image) => {
              formDataToSend.append('images', image);
            });
          }
          if (imagesToRemove.length > 0) {
            formDataToSend.append('removeImages', JSON.stringify(imagesToRemove));
          }
        }
        // Don't send any image data if no changes to preserve existing images
      }
      
      if (editingProduct) {
        await adminAPI.updateProduct(editingProduct._id, formDataToSend);
        notify.productUpdated(formData.name);
        
        // If no new images were uploaded and no images removed, preserve existing ones
        if (images.length === 0 && imagesToRemove.length === 0) {
          setProducts(prev => prev.map(p => 
            p._id === editingProduct._id 
              ? { ...p, name: formData.name, price: Number(formData.price), description: formData.description, stock: Number(formData.stock), images: editingProduct.images }
              : p
          ));
        } else {
          // Refresh from API if images were changed
          const data = await adminAPI.getProducts();
          setProducts(data.data?.products || data.products || data.data || data || []);
        }
      } else {
        await adminAPI.addProduct(formDataToSend);
        notify.productCreated(formData.name);
        // Refresh products list for new products
        const data = await adminAPI.getProducts();
        setProducts(data.data?.products || data.products || data.data || data || []);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const productToDelete = products.find(p => p._id === productId);
    setDeleting(productId);
    try {
      await adminAPI.deleteProduct(productId);
      notify.productDeleted(productToDelete?.name || 'Unknown Product');
      // Remove product from UI immediately
      setProducts(prev => prev.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:ml-56">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="bg-white rounded-xl p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:ml-56">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Products Management</h2>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="mt-4 sm:mt-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Add Product
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.images && product.images.length > 0 && product.images[0] && (
                            <img 
                              src={product.images[0].startsWith('http') ? product.images[0] : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${product.images[0]}`} 
                              alt={product.name} 
                              className="h-10 w-10 rounded-lg object-cover mr-3"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            {product.description && (
                              <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {typeof product.category === 'string' ? product.category : product.category?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          (product.stock || 0) > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock || 0} in stock
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-purple-600 hover:text-purple-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleting === product._id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        >
                          {deleting === product._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Product Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  {editingProduct && existingImages.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {existingImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={image.startsWith('http') ? image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${image}`}
                              alt={`Product ${index + 1}`}
                              className="w-16 h-16 object-cover rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagesToRemove([...imagesToRemove, image]);
                                setExistingImages(existingImages.filter((_, i) => i !== index));
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
                    <input
                      type="text"
                      required={!editingProduct}
                      value={formData.categoryId}
                      onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter category ID"
                      disabled={!!editingProduct}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      required={!editingProduct}
                      onChange={(e) => setImages(Array.from(e.target.files || []))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {images.length > 0 && (
                      <p className="text-sm text-gray-500 mt-1">{images.length} image(s) selected</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                  >
                    {submitting ? (editingProduct ? 'Updating...' : 'Adding...') : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}