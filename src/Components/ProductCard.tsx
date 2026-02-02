import {useNavigate} from "react-router-dom"

interface Product {
  id: number
  title: string
  description?: string
  price: number
  discountPercentage?: number
  rating?: number
  stock?: number    
  brand?: string
  category?: string
  thumbnail?: string
  images?: string[]
}

interface ProductCardType {
  item: Product
}

const ProductCard = ({ item }: ProductCardType) => {
const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/product/${item.id}`)
  }
  return (
    <div onClick={handleClick} className="cursor-pointer">
    <div className="bg-white border border-gray-200 rounded-lg p-4 min-h-[300px] flex flex-col cursor-pointer">
      {item.thumbnail && (
        <img 
          src={item.thumbnail} 
          alt={item.title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
      {item.brand && (
        <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
      )}
      {item.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
      )}
      <div className="mt-auto flex items-center justify-between">
        <span className="text-xl font-bold">${item.price}</span>
        {item.rating && (
          <span className="text-sm text-gray-500">⭐ {item.rating}</span>
        )}
      </div>
    </div>
    </div>
  )
}

export default ProductCard