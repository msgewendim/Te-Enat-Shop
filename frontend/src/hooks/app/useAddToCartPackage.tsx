import { useCallback, useState } from 'react'
import { useAppContext } from './useAppContext'
import { CartItem, Package } from '../../client/types.gen'
import { addItemToCartList } from '../../utils/helperFunctions'
import { toast } from 'react-toastify'

interface UseAddToCartPackageProps {
  package: Package
  open: boolean
  setOpen: (open: boolean) => void
}

function useAddToCartPackage({ package: pkg, setOpen }: UseAddToCartPackageProps) {
  const { cartItems, setCartItems, setOrderItems, orderItems } = useAppContext()
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
      price: pkg.price
    }

    const updatedCartItems = addItemToCartList(cartItems, item)
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems))
    setCartItems(updatedCartItems)

    setOrderItems([...orderItems, {
      description: pkg.name,
      quantity: quantity,
      price: pkg.price * quantity,
      size: 'default',
      currency: "ILS",
      vatType: 1,
    }])

    toast.success("חבילה נוספה לעגלה")
    setOpen(false)
  }, [cartItems, orderItems, pkg, quantity, setCartItems, setOrderItems, setOpen])

  return {
    quantity,
    handleQuantityChange,
    handleAddPackageToCart,
  }
}

export default useAddToCartPackage 