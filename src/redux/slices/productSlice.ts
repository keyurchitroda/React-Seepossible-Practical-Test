import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getProducts } from "../../services/productService";
import type { IProduct } from "../../utils/types/product";

interface ProductState {
  items: IProduct[];
  total: number;
  loading: boolean;
  error: string | null;
  addNewProduct: IProduct[]
}

const initialState: ProductState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  addNewProduct:[]
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    args: { page: number; limit: number; query?: string },
    { rejectWithValue }
  ): Promise<{ products: IProduct[]; total: number }> => {
    try {
      const skip = (args.page - 1) * args.limit;
      const data:any = await getProducts(args.limit, skip, args.query);
      return {
        products: data.products || [],
        total: data.total || 0,
      };
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch products") as any;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addNewProductDummy:(state, action: PayloadAction<IProduct>) => {
      state.addNewProduct.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (
        state,
        action: PayloadAction<{ products: IProduct[]; total: number }>
      ) => {
        state.items = [...state.addNewProduct, ...action.payload.products]
        state.total = action.payload.total;
        state.loading = false;
      }
    );
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Something went wrong";
    });
  },
});
export const { addNewProductDummy } = productSlice.actions;

export default productSlice.reducer;
