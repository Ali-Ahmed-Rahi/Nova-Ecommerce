"use client";

import { useState, type FormEvent } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/services/apiError";
import { useGetCategoriesQuery } from "@/services/categoryApi";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/services/productApi";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 100 });
  const { data: categoryResponse } = useGetCategoriesQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const products = data?.data ?? [];
  const categories = categoryResponse?.data ?? [];

  const saveProduct = async (event: FormEvent<HTMLFormElement>, product?: Product) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();
    const payload = {
      name,
      slug: String(formData.get("slug")).trim(),
      price: Number(formData.get("price")),
      sku: String(formData.get("sku")).trim(),
      categoryId: String(formData.get("categoryId")),
      description: String(formData.get("description")).trim(),
      shortDescription: String(formData.get("shortDescription")).trim(),
    };

    try {
      if (product) {
        await updateProduct({ id: product.id, changes: payload }).unwrap();
        setEditingProduct(null);
      } else {
        await createProduct(payload).unwrap();
        setCreateOpen(false);
      }
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not save this product."));
    }
  };

  const removeProduct = async (product: Product) => {
    if (!window.confirm(`Delete ${product.name}?`)) return;
    setError(null);
    try {
      await deleteProduct(product.id).unwrap();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not delete this product."));
    }
  };

  const productForm = (product?: Product) => (
    <form onSubmit={(event) => void saveProduct(event, product)} className="grid gap-3 rounded-2xl border border-zinc-200 p-4 md:grid-cols-2">
      <Input name="name" required minLength={2} defaultValue={product?.name} placeholder="Product name" />
      <Input name="slug" required minLength={2} defaultValue={product?.slug} placeholder="Slug" />
      <Input name="price" type="number" min="0" step="0.01" required defaultValue={product?.price} placeholder="Price" />
      <Input name="sku" required minLength={2} defaultValue={product?.sku} placeholder="SKU" />
      <select name="categoryId" required defaultValue={categories.find((category) => category.name === product?.category)?.id ?? ""} className="h-11 rounded-full border border-zinc-300 bg-white px-4 text-sm">
        <option value="" disabled>Select a category</option>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <Input name="shortDescription" defaultValue={product?.shortDescription} placeholder="Short description" />
      <Input name="description" defaultValue={product?.description} placeholder="Description" className="md:col-span-2" />
      <div className="flex gap-2 md:col-span-2">
        <Button type="submit" size="sm" disabled={isCreating || isUpdating || categories.length === 0}>
          {product ? "Save" : "Create"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => {
          setCreateOpen(false);
          setEditingProduct(null);
        }}>
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Management</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Products</h1>
        </div>
        <Button type="button" onClick={() => {
          setCreateOpen((open) => !open);
          setEditingProduct(null);
          setError(null);
        }}>
          {createOpen ? "Cancel" : "Add product"}
        </Button>
      </div>

      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
      {createOpen ? productForm() : null}
      {isLoading ? <p>Loading products...</p> : null}
      {isError ? <p role="alert">Could not load products from the backend.</p> : null}

      <Card className="border-zinc-200 bg-white">
        <CardHeader><CardTitle>Product catalog</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="rounded-2xl border border-zinc-200 p-4">
              {editingProduct?.id === product.id ? productForm(product) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-zinc-950">{product.name}</p>
                    <p className="text-sm text-zinc-500">{product.category} · {product.stock} in stock</p>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => {
                      setEditingProduct(product);
                      setCreateOpen(false);
                      setError(null);
                    }}>
                      Edit
                    </Button>
                    <Button type="button" variant="destructive" size="sm" disabled={isDeleting} onClick={() => void removeProduct(product)}>
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
