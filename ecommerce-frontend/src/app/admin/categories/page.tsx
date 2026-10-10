"use client";

import { useState, type FormEvent } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/services/apiError";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/services/categoryApi";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [createOpen, setCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const categories = data?.data ?? [];

  const saveCategory = async (event: FormEvent<HTMLFormElement>, id?: string) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name")).trim(),
      slug: String(formData.get("slug")).trim(),
      description: String(formData.get("description")).trim(),
    };

    try {
      if (id) {
        await updateCategory({ id, changes: values }).unwrap();
        setEditingCategory(null);
      } else {
        await createCategory(values).unwrap();
        setCreateOpen(false);
      }
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "Could not save this category."));
    }
  };

  const categoryForm = (category?: Category) => (
    <form onSubmit={(event) => void saveCategory(event, category?.id)} className="grid gap-3 rounded-2xl border border-zinc-200 p-4 md:grid-cols-4">
      <Input name="name" required minLength={2} defaultValue={category?.name} placeholder="Category name" />
      <Input name="slug" required minLength={2} defaultValue={category?.slug} placeholder="Slug" />
      <Input name="description" defaultValue={category?.description} placeholder="Description" />
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={isCreating || isUpdating}>
          {category ? "Save" : "Create"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => {
          setCreateOpen(false);
          setEditingCategory(null);
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
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Catalog</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-950">Categories</h1>
        </div>
        <Button type="button" onClick={() => {
          setCreateOpen((open) => !open);
          setEditingCategory(null);
          setError(null);
        }}>
          {createOpen ? "Cancel" : "Add category"}
        </Button>
      </div>

      {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
      {createOpen ? categoryForm() : null}
      {isLoading ? <p>Loading categories...</p> : null}
      {isError ? <p role="alert">Could not load categories from the backend.</p> : null}

      <Card className="border-zinc-200 bg-white">
        <CardHeader><CardTitle>Category list</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="rounded-2xl border border-zinc-200 p-4">
              {editingCategory?.id === category.id ? categoryForm(category) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-zinc-950">{category.name}</p>
                    <p className="text-sm text-zinc-500">{category.description}</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => {
                    setEditingCategory(category);
                    setCreateOpen(false);
                    setError(null);
                  }}>
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
