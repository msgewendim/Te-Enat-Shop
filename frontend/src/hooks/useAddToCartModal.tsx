import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAppContext } from './useAppContext'
import { CartItem } from '../client/types.gen'
import { addItemToCartList } from '../utils/helperFunctions'
import { toast } from 'react-toastify'
import { ProductModalProps } from '../providers/interface/products.props'


const useAddToCartModal = ({ product, setOpen }: ProductModalProps) => {
  const { cartItems, setCartItems, setOrderItems, orderItems, sizeIdx, setSizeIdx } = useAppContext()
  const { pricing } = product

  const sizes = useMemo(() => pricing.map(p => p.size), [pricing]);
  const prices = useMemo(() => pricing.map(p => p.price), [pricing]);

  const [productProperties, setProductProperties] = useState({
    quantity: 1,
    size: sizes[sizeIdx],
    price: prices[sizeIdx]
  })
  const handleQuantityChange = useCallback((change: number) => {
    setProductProperties(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + change)
    }))
  }, [])

  useEffect(() => {
    setProductProperties(prev => ({
      ...prev,
      size: sizes[sizeIdx],
      price: prices[sizeIdx]
    }))
  }, [prices, sizeIdx, sizes])

  const handleSizeChange = useCallback((selectedSize: string) => {
    const newSizeIdx = sizes.indexOf(selectedSize);
    if (newSizeIdx !== -1) {
      setSizeIdx(newSizeIdx);
      setProductProperties(prev => ({
        ...prev,
        size: sizes[newSizeIdx],
        price: prices[newSizeIdx],
      }));
    }
  }, [sizes, prices, setSizeIdx]);


  const handleAddProductToCart = useCallback(() => {
    const item: CartItem = { product, ...productProperties }
    const updatedCartItems = addItemToCartList(cartItems, item)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)
    setOrderItems([...orderItems, {
      description: item.product.name,
      quantity: item.quantity,
      price: item.price * item.quantity,
      size: item.size,
      currency: "ILS",
      vatType: 1,
    }])
    toast.success("מוצר נוסף לעגלה")
    setOpen(false)
  }, [cartItems, orderItems, productProperties, product, setCartItems, setOrderItems, setOpen])

  return {
    sizes,
    prices,
    sizeIdx,
    cartItems,
    orderItems,
    productProperties,
    setOpen,
    setSizeIdx,
    setCartItems,
    setOrderItems,
    handleSizeChange,
    setProductProperties,
    handleQuantityChange,
    handleAddProductToCart,
  }
}

export default useAddToCartModal