import React, { useState } from "react";
import type { IProduct } from "../../utils/types/product";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import ConfirmationModal from "../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import { deleteProducts } from "../../services/productService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

interface ProductCardProps {
  product: IProduct;
  refreshList?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, refreshList }) => {
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const dummyProd = useSelector(
    (state: RootState) => state.products.addNewProduct
  );

  const handleDelete = async () => {
    try {
      console.log("id>>>>>>>>>>", product);
      await deleteProducts(product.id);
      toast.success("Product deleted successfully!");
      setOpenDelete(false);
      refreshList && refreshList();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleNavigate = () => {
    const isDummy = dummyProd.some((item) => item.id === product.id);

    if (isDummy) {
      toast.warning(
        "This is a dummy product created locally. ID will not work with server API."
      );
      return;
    }

    navigate(`/add-product?id=${product.id}`);
  };

  const handleOpenModal = () => {
    const isDummy = dummyProd.some((item) => item.id === product.id);

    if (isDummy) {
      toast.warning(
        "This is a dummy product created locally. ID will not work with server API."
      );
      return;
    }

    setOpenDelete(true);
  };

  return (
    <>
      <div className="bg-white border rounded-md shadow-sm overflow-hidden flex flex-col relative">
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={handleNavigate}
            className="cursor-pointer p-1 bg-white rounded-full shadow hover:bg-blue-50"
          >
            <FiEdit2 className="text-blue-600 text-sm" />
          </button>

          <button
            onClick={handleOpenModal}
            className="cursor-pointer p-1 bg-white rounded-full shadow hover:bg-red-50"
          >
            <FiTrash2 className="text-red-600 text-sm" />
          </button>
        </div>

        <div className="h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-3 flex-1 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
            {product.title}
          </h2>
          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2 border-t">
            <span className="text-sm font-semibold text-gray-900">
              ${product.price}
            </span>
            <button className="text-xs px-3 py-1 border rounded-md text-blue-600 border-blue-200 hover:bg-blue-50">
              View
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </>
  );
};

export default ProductCard;
