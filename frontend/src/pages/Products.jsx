import { useEffect, useState } from "react";
import api from "../services/api";
import ProductForm from "../components/ProductForm";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const updateProduct = async () => {
    try {
      await api.put(`/api/products/${editingProduct.id}`, {
        name: editingProduct.name,
        description: editingProduct.description,
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock),
        category: editingProduct.category,
      });

      setEditingProduct(null);

      fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navbar */}
      <div className="bg-slate-800 shadow-lg p-4">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>

      <div className="p-8">
        <ProductForm onProductAdded={fetchProducts} />

        {loading ? (
          <h2 className="text-xl">Loading Products...</h2>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {product.name}
                </h2>

                <p className="text-gray-400 mb-4">
                  {product.description}
                </p>

                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">
                      Category:
                    </span>{" "}
                    {product.category}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Price:
                    </span>{" "}
                    ₹{Number(product.price).toLocaleString()}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Stock:
                    </span>{" "}
                    {product.stock}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-xl w-500px shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">
              Edit Product
            </h2>

            <input
              className="w-full p-3 rounded bg-slate-700 text-white outline-none mb-3"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />

            <textarea
              className="w-full p-3 rounded bg-slate-700 text-white outline-none mb-3"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />

            <input
              className="w-full p-3 rounded bg-slate-700 text-white outline-none mb-3"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                })
              }
            />

            <input
              className="w-full p-3 rounded bg-slate-700 text-white outline-none mb-3"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  stock: e.target.value,
                })
              }
            />

            <input
              className="w-full p-3 rounded bg-slate-700 text-white outline-none mb-4"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            />

            <div className="flex gap-3">
              <button
                onClick={updateProduct}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;