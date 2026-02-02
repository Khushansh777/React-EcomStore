import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'

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

const ProductPage = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Product not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">React Store</h1>
          <button
            onClick={handleBack}
            className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md transition-colors font-medium"
          >
            Back
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 items-start">
          {/* Left Sidebar */}
          <Sidebar />

          {/* Right Product Details */}
          <div className="flex-1 flex flex-col items-center">
            {/* Product Image */}
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full max-w-2xl h-auto rounded-lg mb-8 object-contain"
              />
            ) : product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full max-w-2xl h-auto rounded-lg mb-8 object-contain"
              />
            ) : null}

            {/* Product Title */}
            <h2 className="text-4xl font-bold mb-6 text-center max-w-3xl">
              {product.title}
            </h2>

            {/* Product Description */}
            {product.description && (
              <p className="text-gray-700 text-lg mb-8 text-center max-w-3xl leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price and Rating */}
            <div className="flex items-center gap-8 text-xl">
              <div className="font-semibold">
                <span className="text-gray-600">Price: </span>
                <span className="text-black">${product.price.toFixed(2)}</span>
              </div>
              {product.rating && (
                <div className="font-semibold">
                  <span className="text-gray-600">Rating: </span>
                  <span className="text-black">{product.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage