// This file is auto-generated by @hey-api/openapi-ts

import { createClient, createConfig, type Options } from '@hey-api/client-fetch';
import type { GetAllProductsError, GetAllProductsResponse, PostProductsData, PostProductsError, PostProductsResponse, GetProductData, GetProductError, GetProductResponse, DeleteProductsByIdData, DeleteProductsByIdError, DeleteProductsByIdResponse, PutProductsByIdData, PutProductsByIdError, PutProductsByIdResponse } from './types.gen';

export const client = createClient(createConfig());

/**
 * Get all products
 */
export const getAllProducts = <ThrowOnError extends boolean = false>(options?: Options<unknown, ThrowOnError>) => { return (options?.client ?? client).get<GetAllProductsResponse, GetAllProductsError, ThrowOnError>({
    ...options,
    url: '/products'
}); };

/**
 * Add a new product
 */
export const postProducts = <ThrowOnError extends boolean = false>(options: Options<PostProductsData, ThrowOnError>) => { return (options?.client ?? client).post<PostProductsResponse, PostProductsError, ThrowOnError>({
    ...options,
    url: '/products'
}); };

/**
 * Get a product by ID
 */
export const getProduct = <ThrowOnError extends boolean = false>(options: Options<GetProductData, ThrowOnError>) => { return (options?.client ?? client).get<GetProductResponse, GetProductError, ThrowOnError>({
    ...options,
    url: '/products/{id}'
}); };

/**
 * Delete a product by ID
 */
export const deleteProductsById = <ThrowOnError extends boolean = false>(options: Options<DeleteProductsByIdData, ThrowOnError>) => { return (options?.client ?? client).delete<DeleteProductsByIdResponse, DeleteProductsByIdError, ThrowOnError>({
    ...options,
    url: '/products/{id}'
}); };

/**
 * Update a product by ID
 */
export const putProductsById = <ThrowOnError extends boolean = false>(options: Options<PutProductsByIdData, ThrowOnError>) => { return (options?.client ?? client).put<PutProductsByIdResponse, PutProductsByIdError, ThrowOnError>({
    ...options,
    url: '/products/{id}'
}); };