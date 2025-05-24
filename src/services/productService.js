
export const getAllProducts = async () => {
    const response = await fetch("http://localhost:3002/products");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const result = await response.json();
    return result;
};

export const createProduct = async (data) => {
  const response = await fetch("http://localhost:3002/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
    if (!response.ok) {
        throw new Error("Failed to create product");
    }
    const result = await response.json();
    return result;
};

export const updateProduct = async (id, data) => {
  const response = await fetch(`http://localhost:3002/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
    if (!response.ok) {
        throw new Error("Failed to update product");
    }
    if (response.status === 404) {
        throw new Error("Product not found");
    }
    const result = await response.json();
    return result;
};

export const deleteProduct = async (id) => {
  const response = await fetch(`http://localhost:3002/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
      throw new Error("Failed to delete product");
  }
  const result = await response.json();
  return result;
};
export const getProductById = async (id) => {
  const response = await fetch(`http://localhost:3002/products/${id}`);
  if (!response.ok) {
      throw new Error("Failed to fetch product");
  }
  const result = await response.json();
  return result;
};