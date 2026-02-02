import { useEffect, useState } from 'react'
import { useFilterContext } from '../Shared/FilterContext'

const Sidebar = () => {
    const {
        searchQuery,
        setSearchQuery,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        selectedCategory,
        setSelectedCategory,
        selectedKeyword,
        setSelectedKeyword,
    } = useFilterContext()

    const [categories, setCategories] = useState<string[]>([])
    const [keywords, setKeywords] = useState<string[]>(['APPLE', 'WATCH', 'FASHION', 'TREND', 'SHOES', 'SHIRT']);

    const handleResetFilter = () => {
        setSearchQuery('')
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setSelectedCategory('')
        setSelectedKeyword('')
    }
    useEffect(() => {
        try {
            const fetchCategories = async () => {
                const response = await fetch("https://dummyjson.com/products")
                if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
                const data = await response.json()
                const products = Array.isArray(data?.products) ? data.products : []
                const uniqueCategories = Array.from(
                    new Set(products.map((product: { category?: string }) => product.category).filter(Boolean))
                ) as string[]
                setCategories(uniqueCategories)

                console.log(uniqueCategories)

            }
            fetchCategories()
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
    }, [])
    return (
        <div className='pr-6 py-5 flex flex-col gap-8 w-80 flex-shrink-0'>
            <h1 className='text-4xl font-bold mb-2'>Store</h1>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <label htmlFor="search" className="text-sm font-medium text-gray-700">Search Product</label>
                    <input
                        id="search"
                        type="text"
                        placeholder='Search Products...'
                        className='p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder='Min Price'
                            className='border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
                            value={minPrice}
                            onChange={(e) => {
                                const value = e.target.value
                                setMinPrice(value === '' ? undefined : Number(value))
                            }}
                        />
                        <input
                            type="number"
                            placeholder='Max Price'
                            className='border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent'
                            value={maxPrice ?? ''}
                            onChange={(e) => {
                                const value = e.target.value
                                setMaxPrice(value === '' ? undefined : Number(value))
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Categories</h2>
                    <div className="flex flex-col gap-3">
                        {categories.map((category) => (
                            <div key={category} className='flex items-center gap-2'>
                                <input
                                    type="radio"
                                    name="category"
                                    id={category}
                                    value={category}
                                    checked={selectedCategory === category}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-4 h-4 text-black focus:ring-2 focus:ring-gray-400"
                                />
                                <label htmlFor={category} className="text-gray-700 cursor-pointer hover:text-black transition-colors capitalize">
                                    {category}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold">Keywords</h2>
                    <div className="flex flex-col gap-2">
                        {keywords.map(keyword =>
                            <button
                                key={keyword}
                                className={`text-left p-2 rounded-md transition-colors ${keyword === selectedKeyword
                                        ? 'bg-gray-100 text-black font-medium'
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                                    }`}
                                onClick={() => setSelectedKeyword(keyword)}
                            >
                                {keyword}
                            </button>
                        )}
                    </div>
                </div>
                <button className='bg-black hover:bg-gray-800 cursor-pointer p-3 text-white rounded-md transition-colors font-medium' onClick={() => handleResetFilter()}>
                    Reset Filters
                </button>
            </div>
        </div>
    )
}

export default Sidebar