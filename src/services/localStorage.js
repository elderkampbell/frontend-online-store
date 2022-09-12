const PRODUCT_ITEMS_KEY = 'product_items';
if (!JSON.parse(localStorage.getItem(PRODUCT_ITEMS_KEY))) {
  localStorage.setItem(PRODUCT_ITEMS_KEY, JSON.stringify([]));
}

const readProductItems = () => JSON.parse(localStorage.getItem(PRODUCT_ITEMS_KEY));

const saveProductItems = (saveItems) => localStorage
  .setItem(PRODUCT_ITEMS_KEY, JSON.stringify(saveItems));

const addProduct = (product) => {
  if (product) {
    const ProductItems = readProductItems();
    saveProductItems([...ProductItems, product]);
  }
};
export default addProduct;
