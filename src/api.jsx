const PRODUCTS_KEY = "products_db";

export const getProducts = () => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveProducts = (products) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    id: `prod_${Date.now()}`,
    ...product,
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const getProductById = (id) => {
  const products = getProducts();
  return products.find((p) => p.id === id) || null;
};

export const updateProduct = (id, updates) => {
  const products = getProducts();
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return null;
  }

  products[productIndex] = { ...products[productIndex], ...updates };
  saveProducts(products);
  return products[productIndex];
};

export const deleteProduct = (id) => {
  let products = getProducts();
  const initialLength = products.length;
  products = products.filter((p) => p.id !== id);

  if (products.length < initialLength) {
    saveProducts(products);
    return true;
  }

  return false;
};
