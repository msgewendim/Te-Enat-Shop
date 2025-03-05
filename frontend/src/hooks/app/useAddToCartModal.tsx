import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useAppContext } from './useAppContext'
import { CartItem, Product, ProductSize } from '../../client/types.gen'
import { ItemProperties, ProductModalProps } from '../../providers/interface/products.props'
import { addItemToCartList } from '../../utils/helperFunctions'


function useAddToCartModal({ product, setOpen }: ProductModalProps) {
  const { cartItems, setCartItems, sizeIdx, setSizeIdx } = useAppContext()
  const { pricing } = product

  const sizes = useMemo(() => pricing ? pricing.map(p => p.size) : [], [pricing]);
  const prices = useMemo(() => pricing ? pricing.map(p => p.price) : [], [pricing]);

  const [itemProperties, setItemProperties] = useState<ItemProperties>({
    quantity: 1,
    size: sizes[sizeIdx]?.sizeName || '',
    price: prices[sizeIdx] || 0,
    itemType: 'Product',
    name: product.name,
  })
  const handleQuantityChange = useCallback((change: number) => {
    setItemProperties(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change)
    }))
  }, [])

  useEffect(() => {
    setItemProperties(prev => ({
      ...prev,
      size: sizes[sizeIdx]?.sizeName || '',
      price: prices[sizeIdx] || 0
    }))
  }, [prices, sizeIdx, sizes])

  const handleSizeChange = useCallback((selectedSize: ProductSize["sizeName"]) => {
    const newSizeIdx = sizes.findIndex(size => size.sizeName === selectedSize);
    if (newSizeIdx !== -1) {
      setSizeIdx(newSizeIdx);
      setItemProperties(prev => ({
        ...prev,
        size: sizes[newSizeIdx]?.sizeName || '',
        price: prices[newSizeIdx] || 0
      }));
    }
  }, [sizes, prices, setSizeIdx]);


  const handleAddProductToCart = useCallback((product: Product) => {
    const newItem: CartItem = { item: product, ...itemProperties, itemType: 'Product', name: product.name, image: product.image }
    const updatedCartItems = addItemToCartList(cartItems, newItem)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
    toast.success("מוצר נוסף לעגלה")
    setOpen(false)
  }, [cartItems, setCartItems, itemProperties, setOpen])

  return {
    sizes,
    prices,
    sizeIdx,
    cartItems,
    itemProperties,
    setOpen,
    setSizeIdx,
    setCartItems,
    handleSizeChange,
    setItemProperties,
    handleQuantityChange,
    handleAddProductToCart,
  }
}

export default useAddToCartModal