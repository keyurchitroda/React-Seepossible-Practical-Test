interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductState {
  items: IProduct[];
  total: number;
  loading: boolean;
  error: string | null;
}

export { IProduct,ProductState };
