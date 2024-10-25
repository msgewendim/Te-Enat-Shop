import { useAddProductMutation, useUpdateProductMutation } from '../hooks/useProductsData';
import { Product } from '../client';
import { useAppContext } from './useAppContext';

const useAdminDashboard = () => {
  const { adminActiveSection, setAdminActiveSection, productToEdit, setProductToEdit } = useAppContext();
  const { mutate: updateProduct } = useUpdateProductMutation();
  const { mutate: addProduct, } = useAddProductMutation();
  const handleProductSubmit = (productData: Partial<Product>) => {
    if (adminActiveSection === 'edit-product') {
      // sent to server to update product
      updateProduct({
        productId: productToEdit?._id || "",
        productData,
      })
    } else {
      // send to server to add new product
      addProduct(productData);
    }
    // Reset productToEdit and change active section back to products
    setProductToEdit(undefined);
    setAdminActiveSection('products');
  };

  return { handleProductSubmit, productToEdit, adminActiveSection, setAdminActiveSection };
}

export default useAdminDashboard