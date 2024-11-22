import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppContext } from './useAppContext'
import { CartItem, ProductSize } from '../../client/types.gen'
import { addItemToCartList } from '../../utils/helperFunctions'
import { toast } from 'react-toastify'
import { ProductModalProps } from '../../providers/interface/products.props'


function useAddToCartModal({ product, setOpen }: ProductModalProps) {
  const { cartItems, setCartItems, setOrderItems, orderItems, sizeIdx, setSizeIdx } = useAppContext()
  const { pricing } = product

  const sizes = useMemo(() => pricing.map(p => p.size), [pricing]);
  const prices = useMemo(() => pricing.map(p => p.price), [pricing]);

  const [itemProperties, setItemProperties] = useState({
    quantity: 1,
    size: sizes[sizeIdx]["sizeName"],
    price: prices[sizeIdx]
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
      size: sizes[sizeIdx]["sizeName"],
      price: prices[sizeIdx]
    }))
  }, [prices, sizeIdx, sizes])

  const handleSizeChange = useCallback((selectedSize: ProductSize["sizeName"]) => {
    const newSizeIdx = sizes.findIndex(size => size.sizeName === selectedSize);
    if (newSizeIdx !== -1) {
      setSizeIdx(newSizeIdx);
      setItemProperties(prev => ({
        ...prev,
        size: sizes[newSizeIdx]["sizeName"],
        price: prices[newSizeIdx],
      }));
    }
  }, [sizes, prices, setSizeIdx]);


  const handleAddProductToCart = useCallback(() => {
    const newItem: CartItem = { item: product, ...itemProperties }
    const updatedCartItems = addItemToCartList(cartItems, newItem)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
    setOrderItems([...orderItems, {
      description: product.name,
      quantity: itemProperties.quantity,
      price: itemProperties.price * itemProperties.quantity,
      size: itemProperties.size,
      currency: "ILS",
      vatType: 1,
    }])
    toast.success("מוצר נוסף לעגלה")
    setOpen(false)
  }, [cartItems, orderItems, itemProperties, setCartItems, product, setOrderItems, setOpen])

  return {
    sizes,
    prices,
    sizeIdx,
    cartItems,
    orderItems,
    itemProperties,
    setOpen,
    setSizeIdx,
    setCartItems,
    setOrderItems,
    handleSizeChange,
    setItemProperties,
    handleQuantityChange,
    handleAddProductToCart,
  }
}

export default useAddToCartModal