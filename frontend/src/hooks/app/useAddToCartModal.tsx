import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { Product, ProductSize, MinimalCartItem } from '../../client/types.gen'
import { ItemProperties, ProductModalProps } from '../../providers/interface/products.props'
import { useCartStore } from '../../stores/useCartStore'

function useAddToCartModal({ product, setOpen }: ProductModalProps) {
  const { addToCart } = useCartStore()
  const { pricing } = product

  const sizes = useMemo(() => pricing ? pricing.map(p => p.size) : [], [pricing]);
  const prices = useMemo(() => pricing ? pricing.map(p => p.price) : [], [pricing]);
  const [sizeIdx, setSizeIdx] = useState(0);

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
    const minimalItem: MinimalCartItem = {
      itemId: product._id,
      quantity: itemProperties.quantity,
      size: itemProperties.size,
      price: itemProperties.price,
      itemType: 'Product',
    }

    // Use the new cart store
    addToCart(minimalItem);
    
    toast.success("מוצר נוסף לעגלה")
    setOpen(false)
  }, [addToCart, itemProperties, setOpen])

  return {
    sizes,
    prices,
    sizeIdx,
    itemProperties,
    setOpen,
    setSizeIdx,
    handleSizeChange,
    setItemProperties,
    handleQuantityChange,
    handleAddProductToCart,
  }
}

export default useAddToCartModal