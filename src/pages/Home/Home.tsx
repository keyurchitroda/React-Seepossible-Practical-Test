import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import Pagination from "../../components/common/Pagination";
import ProductCard from "../../components/common/ProductCard";
import { fetchProducts } from "../../redux/slices/productSlice";
import { usePagination } from "../../hooks/usePagination";
import SearchBar from "../../components/common/SearchBar";
import { useDebounce } from "../../hooks/useDebounce";
import { PAGE_LIMIT } from "../../utils/constants/common";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    items: products,
    total: totalProducts,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { page, totalPages, goToPage } = usePagination({
    totalItems: totalProducts,
    pageSize: PAGE_LIMIT,
    initialPage: 1,
  });

  useEffect(() => {
    goToPage(1);
  }, [debouncedSearch, goToPage]);

  useEffect(() => {
    dispatch(
      fetchProducts({ page, limit: PAGE_LIMIT, query: debouncedSearch })
    );
  }, [dispatch, page, debouncedSearch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <div className="flex gap-3 items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search products..."
          />

          <button
            onClick={() => navigate("/add-product")}
            className="px-4 py-2 w-full bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        {loading && (
          <div className="text-center text-gray-600 text-sm py-6">
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600 text-sm py-6">{error}</div>
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}

            {products.length === 0 && (
              <div className="text-center text-gray-500 text-sm py-6">
                No products found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
