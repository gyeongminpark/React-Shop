import axios from 'axios';

export const API_URL = 'https://fakestoreapi.com/products';

export async function getProducts() {
  const res = await axios.get(API_URL);
  return res.data;
}
export async function getProduct(id?: string) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}
