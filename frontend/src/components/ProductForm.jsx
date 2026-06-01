import { useState } from "react";
import api from "../services/api";

function ProductForm({ onProductAdded }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/products", {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
      });

      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setCategory("");

      onProductAdded();
    } catch (error) {
      console.error(error);
      alert("Failed to create product");
    }
  };

  return (
    <form
      onSubmit={createProduct}
      className="bg-slate-800 p-6 rounded-xl mb-8"
    >
      <h2 className="text-xl font-bold mb-4 text-white">
        Add Product
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="p-3 rounded bg-slate-700 text-white"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-3 rounded bg-slate-700 text-white"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="p-3 rounded bg-slate-700 text-white"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="p-3 rounded bg-slate-700 text-white"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <textarea
        className="w-full mt-4 p-3 rounded bg-slate-700 text-white"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white"
      >
        Create Product
      </button>
    </form>
  );
}

export default ProductForm;