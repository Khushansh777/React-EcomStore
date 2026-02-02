# React E-Commerce Store

A modern, full-featured e-commerce store built with React 19, TypeScript, and Tailwind CSS. Features advanced product filtering, search functionality, sorting, and pagination.

## 🚀 Features

- **Advanced Product Filtering**
  - Search products by title, description, brand, or category
  - Filter by price range (min/max)
  - Filter by product categories
  - Filter by keywords
  - Reset filters functionality

- **Product Sorting**
  - Sort by price (Highest to Lowest)
  - Sort by price (Lowest to Highest)
  - Sort by relevance

- **Product Display**
  - Responsive product grid layout
  - Product cards with images, titles, descriptions, prices, and ratings
  - Individual product detail pages
  - Pagination (6 products per page)

- **Modern UI/UX**
  - Clean, minimalist design
  - Responsive layout
  - Smooth transitions and hover effects
  - Tailwind CSS styling

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management for filters

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd R-EcomStore
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── Components/
│   ├── Sidebar.tsx          # Filter sidebar component
│   ├── ProductCard.tsx      # Product card component
│   ├── ProductPage.tsx      # Individual product detail page
│   └── ProductDescriptionCard.tsx
├── Shared/
│   └── FilterContext.tsx    # Context API for filter state
├── App.tsx                  # Main app component with routing
├── MainContent.tsx          # Main content area with product grid
└── main.tsx                 # Entry point
```

## 🎯 Usage

### Filtering Products

1. **Search**: Type in the search box to filter products by title, description, brand, or category
2. **Price Range**: Enter minimum and/or maximum price values
3. **Categories**: Select a category from the radio buttons
4. **Keywords**: Click on keyword buttons to filter by specific keywords
5. **Reset**: Click the "Reset Filters" button to clear all filters

### Sorting Products

Click on "Sort by" in the top bar to access sorting options:
- Highest to lowest (price)
- Lowest to highest (price)
- Relevance

### Viewing Product Details

Click on any product card to navigate to its detail page, which displays:
- Product image
- Full title and description
- Price and rating information

## 🌐 API

This project uses the [DummyJSON API](https://dummyjson.com/) for product data:
- Products endpoint: `https://dummyjson.com/products`
- Individual product: `https://dummyjson.com/products/{id}`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Styling

The project uses Tailwind CSS for styling. All components are styled with utility classes, providing a consistent and maintainable design system.

## 🔧 Development

The project is set up with:
- TypeScript for type safety
- ESLint for code quality
- Vite for fast development and builds
- React Router for navigation
- Context API for global state management

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built with ❤️ using React and TypeScript
