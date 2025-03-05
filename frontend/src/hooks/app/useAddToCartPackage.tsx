import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { useAppContext } from './useAppContext'
import { CartItem, Package } from '../../client/types.gen'
import { addItemToCartList } from '../../utils/helperFunctions'

interface UseAddToCartPackageProps {
  package: Package
  open: boolean
  setOpen: (open: boolean) => void
}

function useAddToCartPackage({ package: pkg, setOpen }: UseAddToCartPackageProps) {
  const { cartItems, setCartItems } = useAppContext()
  const [quantity, setQuantity] = useState(1)

  const handleQuantityChange = useCallback((change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }, [])

  const handleAddPackageToCart = useCallback(() => {
    const item: CartItem = {
      item: {
        ...pkg,
      },
      quantity,
      size: 'default',
      price: pkg.price,
      itemType: 'Package',
      name: pkg.name,
      image: pkg.image
    }

    const updatedCartItems = addItemToCartList(cartItems, item)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)

    toast.success("חבילה נוספה לעגלה")
    setOpen(false)
  }, [cartItems, pkg, quantity, setCartItems, setOpen])

  return {
    quantity,
    handleQuantityChange,
    handleAddPackageToCart,
  }
}

export default useAddToCartPackage 