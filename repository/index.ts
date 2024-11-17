import axios from 'axios'
import { type AxiosResponse } from 'axios'

export type ApiResponse<T> = Promise<AxiosResponse<T>>

export interface ResponseOutput<T> {
  data: T,
}

export interface ResponseListOutput<T> extends ResponseOutput<T> {
  meta: {
    totalItems: number,
    currentPage: number,
    itemPerPage: number,
    totalPages: number,
  },
  links: {
    self: string,
    next: string,
    last: string,
  },
}

const instance = axios.create({ baseURL: '/api' })
export default instance
