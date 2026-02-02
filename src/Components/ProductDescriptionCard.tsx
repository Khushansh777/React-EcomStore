import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
    
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
const ProductDescriptionCard = () => {
    const {id} = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`https://dummyjson.com/products/${id}`)
            const data = await response.json()
            setProduct(data)
        }
        fetchProduct()
    }, [id])
  return (
    <div>
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
        <p>{product?.price}</p>
        <p>{product?.discountPercentage}</p>
        <p>{product?.rating}</p>
        <p>{product?.stock}</p>
        <p>{product?.brand}</p>
        <p>{product?.category}</p>
        <p>{product?.thumbnail}</p>
    </div>
  )
}

export default ProductDescriptionCard