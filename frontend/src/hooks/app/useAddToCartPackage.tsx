import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { Package, MinimalCartItem } from '../../client/types.gen'
import { useCartStore } from '../../stores/useCartStore'

interface UseAddToCartPackageProps {
  package: Package
  open: boolean
  setOpen: (open: boolean) => void
}

function useAddToCartPackage({ package: pkg, setOpen }: UseAddToCartPackageProps) {
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = useCallback((change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }, [])

  const handleAddPackageToCart = useCallback(() => {
    const minimalItem: MinimalCartItem = {
      itemId: pkg._id,
      quantity,
      size: 'default', // Packages typically have a default size
      price: pkg.price,
      itemType: 'Package',
    }

    // Use the new cart store
    addToCart(minimalItem);

    toast.success("חבילה נוספה לעגלה")
    setOpen(false)
  }, [addToCart, pkg._id, pkg.price, quantity, setOpen])

  return {
    quantity,
    handleQuantityChange,
    handleAddPackageToCart,
  }
}

export default useAddToCartPackage 