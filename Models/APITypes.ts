export type ProductsResponse = {
  responseCode: number;
  products: Product[];
};
export type Category = {
  usertype: { usertype: string };
  category: string;
};

export type Product = {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: Category;
};

export type MessageResponse = {
  responseCode: number;
  message: string;
};

export type Brand = {
  id: number;
  brand: string;
};

export type BrandsResponse = {
  responseCode: number;
  brands: Brand[];
};

export type UserDetail = {
  id: number;
  name: string;
  email: string;
  title: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  first_name: string;
  last_name: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
};

export type UserDetailResponse = {
  responseCode: number;
  user: UserDetail;
};
