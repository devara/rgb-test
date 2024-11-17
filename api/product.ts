import { type AxiosRequestConfig } from 'axios'
import api from '.'
import type {
  ApiResponse,
  ResponseOutput,
  ResponseListOutput,
} from '.'
import { type Product } from './types/product'

export async function getProducts (config?: AxiosRequestConfig): ApiResponse<ResponseListOutput<Product[]>> {
  return await api.get(getPath('pathGetProducts'), config)
}

export async function getProduct (id: string | number): ApiResponse<ResponseOutput<Product>> {
  return await api.get(getPath('pathGetProduct', { id }))
}

export async function postWishlist (id: string | number) {
  return await api.post(getPath('pathPostWishlist', { id }))
}
