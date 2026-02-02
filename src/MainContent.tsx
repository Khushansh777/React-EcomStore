import { useEffect, useState, useRef } from "react"
import { useFilterContext } from "./Shared/FilterContext";
import ProductCard from "./Components/ProductCard";

const MainContent = () => {
  const {searchQuery, maxPrice, minPrice, selectedCategory, selectedKeyword} =  useFilterContext()
  const [filters, setFilters] = useState<string>('');
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [initialProducts, setInitialProducts] = useState<any[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 6

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage))
  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)
    setCurrentPage(nextPage)
  }
  
  // Calculate paginated products
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
  
  // Generate page numbers array (show up to 5 pages)
  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)
  useEffect( () =>
    {try {
      const fetchProducts = async () =>{
        const response = await fetch("https://dummyjson.com/products");
          if (!response.ok) {
                    throw new Error("Failed to fetch products")
                }
          const data = await response.json();
          const productData =  Array.isArray(data?.products) ? data.products : []
          console.log(productData)
          setInitialProducts(productData);
      }
      fetchProducts()
    } catch (error) {
      throw new Error(`response not fetched correctly ${error}`)
    }

    }
  , [])

  useEffect(() => {
    const filtered = initialProducts.filter((selectedProduct) => {
      if (typeof minPrice === "number" && selectedProduct.price < minPrice) {
        return false
      }
      if (typeof maxPrice === "number" && selectedProduct.price > maxPrice) {
        return false
      }
      if (selectedCategory && selectedProduct.category !== selectedCategory) {
        return false
      }
      if (selectedKeyword  && selectedProduct.keyword !== selectedKeyword) {
        return false
      }
      if (searchQuery && searchQuery.trim() !== '') {
        const fullQuery = `${selectedProduct.title} ${selectedProduct.description} ${selectedProduct.brand} ${selectedProduct.category}`.toLowerCase()
        if (!fullQuery.includes(searchQuery.toLowerCase())) {
          return false
        }
      }

      return true
    })

    // Apply sorting based on filter selection
    const sorted = [...filtered] // Create a copy to avoid mutating
    switch (filters) {
      case 'htl':
        sorted.sort((a, b) => b.price - a.price) // Highest to lowest
        break
      case 'lth':
        sorted.sort((a, b) => a.price - b.price) // Lowest to highest
        break
      case 'relevance':
        break
      default:
        break
    }

    setFilteredProducts(sorted)
    setCurrentPage(1) // Reset to first page when filters change
    console.log(sorted)

  }, [selectedCategory, searchQuery, maxPrice, minPrice, selectedKeyword, initialProducts, filters])
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropDown(false);
      }
    };

    if (dropDown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropDown]);
  return (
    <div className="flex-1">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 relative">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block w-4 h-[1px] bg-gray-900" />
          <div className="relative" ref={dropdownRef}>
            <button className="hover:text-gray-800 transition-colors" onClick={() => setDropDown(!dropDown)}>
              <span className="font-medium text-gray-800">Sort by</span>
            </button>
            {dropDown && (
              <div className="absolute top-full left-0 mt-2 flex flex-col w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                <button 
                  className="text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700" 
                  onClick={() => {
                    setFilters('htl')
                    setDropDown(false)
                  }}
                > 
                  Highest to lowest
                </button>
                <button 
                  className="text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700" 
                  onClick={() => {
                    setFilters('lth')
                    setDropDown(false)
                  }}
                > 
                  Lowest to Highest
                </button> 
                <button 
                  className="text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700" 
                  onClick={() => {
                    setFilters('relevance')
                    setDropDown(false)
                  }}
                > 
                  Relevance
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No products found
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-gray-600 mt-8">
        <button className="hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handlePageChange(currentPage - 1) }  disabled={currentPage === 1}>
          Previous
        </button>

        <div className="flex items-center gap-2">
          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                page === currentPage
                  ? 'bg-black text-white'
                  : 'border border-gray-300 hover:border-gray-400 hover:text-black hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button className="hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handlePageChange(currentPage + 1) }  disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}

export default MainContent