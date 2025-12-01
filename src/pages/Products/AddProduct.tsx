import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormikInput from "../../components/common/FormikInput";
import {
  addNewProducts,
  getProductById,
  updateProduct,
} from "../../services/productService";
import { toast } from "react-toastify";
import { getProductValidationSchema } from "../../utils/validations/prodSchema";
import { useDispatch } from "react-redux";
import { addNewProductDummy } from "../../redux/slices/productSlice";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("id");

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const [loading, setLoading] = useState(false);
  const isEditMode = !!productId;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        setLoading(true);
        const res = await getProductById(Number(productId));
        const data: any = res;
        setInitialValues({
          title: data.title || "",
          description: data.description || "",
          price: String(data.price ?? ""),
          thumbnail: data.thumbnail || "",
        });
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      if (isEditMode && productId) {
        const payload = {
          title: values.title,
          description: values.description,
          price: Number(values.price),
          thumbnail: values.thumbnail,
        };
        const response = await updateProduct(Number(productId), payload);
        if (response) {
          toast.success("Product updated successfully!");
          navigate("/home");
        }
      } else {
        const response = await addNewProducts(values);
        console.log("response",response)
        if (response) {
          await dispatch(addNewProductDummy(response as any))
          toast.success("Product created successfully!");
          navigate("/home");
        }
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

  if (isEditMode && loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
        <div className="text-sm text-gray-600">Loading product...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={getProductValidationSchema()}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <FormikInput
                name="title"
                label="Title"
                type="text"
                placeholder="Enter product title"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none border-gray-300"
                  placeholder="Enter product description"
                  rows={3}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              <FormikInput
                name="price"
                label="Price"
                type="number"
                placeholder="Enter price"
              />

              <FormikInput
                name="thumbnail"
                label="Image URL"
                type="text"
                placeholder="Enter image URL"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {isSubmitting
                  ? isEditMode
                    ? "Updating..."
                    : "Saving..."
                  : isEditMode
                  ? "Update Product"
                  : "Save Product"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
