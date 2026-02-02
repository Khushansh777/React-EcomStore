import React, { createContext, useContext, useState, type ReactNode } from 'react'
interface FilterContextType{
    searchQuery:string,
    setSearchQuery: (query:string) => void,
    minPrice:number | undefined,
    setMinPrice: (price: number | undefined) => void, 
    maxPrice:number | undefined,
    setMaxPrice: (price: number | undefined) => void,
    selectedCategory:string,
    setSelectedCategory:(category:string) => void,
    selectedKeyword:string,
    setSelectedKeyword:(keyword: string) => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export const FilterProvider:React.FC<{children: ReactNode}> = ({children}) =>{
    const[searchQuery, setSearchQuery] = useState<string>('');
    const[minPrice, setMinPrice] = useState<number | undefined>(undefined);
    const[maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    const[selectedCategory, setSelectedCategory] = useState<string>('');
    const[selectedKeyword, setSelectedKeyword] = useState<string>('');
    
    return(
        <FilterContext.Provider value={{
            searchQuery,
            setSearchQuery,
            minPrice,
            setMinPrice,
            maxPrice,
            setMaxPrice,
            selectedCategory,
            setSelectedCategory,
            selectedKeyword,
            setSelectedKeyword
        }}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilterContext = () => {
    const context = useContext(FilterContext)
    if(!context){
        throw new Error('useFilterContext must be used within a FilterProvider');
    }
    return context
}

export default FilterContext