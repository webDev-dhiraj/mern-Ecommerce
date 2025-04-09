
import { useState } from "react";
import upload_area from "../assets/upload_area.png";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("Men");
    setSubCategory("Topwear");
    setBestseller(false);
    setSizes([]);
    setImage1(false);
    setImage2(false);
    setImage3(false);
    setImage4(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("✅ Product added successfully!");
        resetForm();
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-5 bg-white p-6 rounded shadow-md"
    >
      {/* Image Upload UI */}
      <div>
        <p className="mb-2 text-gray-800 font-medium">Upload Images</p>
        <div className="flex gap-3">
          {[image1, image2, image3, image4].map((img, idx) => {
            const setImage = [setImage1, setImage2, setImage3, setImage4][idx];
            return (
              <label key={idx} htmlFor={`image${idx + 1}`}>
                <img
                  className="w-20 h-20 object-cover border border-gray-300 rounded hover:shadow-md transition"
                  src={!img ? upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                <input
                  type="file"
                  id={`image${idx + 1}`}
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Info Inputs */}
      <div className="w-full">
        <p className="mb-1 text-gray-800 font-medium">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="w-full">
        <p className="mb-1 text-gray-800 font-medium">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          placeholder="Type here"
        />
      </div>

      {/* Dropdowns and Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div>
          <p className="mb-1 text-gray-800 font-medium">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-1 text-gray-800 font-medium">Subcategory</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-1 text-gray-800 font-medium">Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-[120px] focus:outline-none focus:ring-2 focus:ring-green-700"
            type="number"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-1 text-gray-800 font-medium">Available Sizes</p>
        <div className="flex gap-3">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`px-3 py-1 rounded cursor-pointer transition ${
                  sizes.includes(size)
                    ? "bg-green-200 text-green-900 border border-green-400"
                    : "bg-gray-200 text-gray-700"
                } hover:bg-green-100`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller Toggle */}
      <div className="flex items-center gap-2 mt-2">
        <input
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          type="checkbox"
          id="bestseller"
        />
        <label
          className="cursor-pointer text-gray-800"
          htmlFor="bestseller"
        >
          Add to Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-28 py-3 mt-4 rounded text-white font-medium transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-700 hover:bg-green-800"
        }`}
        disabled={loading}
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};

export default Add;
