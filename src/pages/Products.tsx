import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export interface Product {
  id: number;
  name: string;
  details: string;
  price: string;
  discountPrice: string | null;
  image: string;
  isTrending: boolean;
  ingredients: string | null;
  benefits: string | null;
  usage: string | null;
  additionalInfo: string | null;
  scriptdocx: string; // Path to the script
}

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [docxContent, setDocxContent] = useState<string>(''); // State for DOCX content

  const products: Product[] = [
    {
      id: 1,
      name: 'Kulvansh Male',
      details: 'Natural infertility solution for males with improved sperm quality.',
      price: '₹5300',
      discountPrice: '₹4300',
      isTrending: true,
      image: 'https://vayuvedaorganics.com/kulvansh/male/image/improved%20Sperm%20Quality%20(2).webp',
      ingredients: null,
      benefits: null,
      usage: null,
      additionalInfo: null,
      scriptdocx: 'path_to_your_script_file', // Add the path to your script docx file here
    },
    {
      id: 2,
      name: 'Kulvansh Female',
      details: 'Infertility solution for females with herbal formulation.',
      price: '₹5300',
      discountPrice: '₹4300',
      isTrending: true,
      image: 'https://vayuvedaorganics.com/kulvansh/female/image/9.webp',
      ingredients: null,
      benefits: null,
      usage: null,
      additionalInfo: null,
      scriptdocx: 'path_to_your_script_file', // Add the path to your script docx file here
    },
    {
      id: 3,
      name: 'Vayuveda Liver',
      details: 'Herbal care for liver health with natural ingredients.',
      price: '₹1199',
      discountPrice: '₹799',
      isTrending: true,
      image: 'https://vayuvedaorganics.com/home/assets/images/1.png',
      ingredients: null,
      benefits: null,
      usage: null,
      additionalInfo: null,
      scriptdocx: 'path_to_your_script_file', // Add the path to your script docx file here
    },
    {
      id: 4,
      name: 'Vayuveda Women Care',
      details: 'Holistic women’s health solution for energy and hormonal balance.',
      price: '₹1199',
      discountPrice: '₹799',
      isTrending: true,
      image: 'https://vayuvedaorganics.com/home/assets/images/Women%20Care.png',
      ingredients: null,
      benefits: null,
      usage: null,
      additionalInfo: null,
      scriptdocx: 'path_to_your_script_file', // Add the path to your script docx file here
    },
  ];

  const handleBackToList = () => {
    setSelectedProduct(null);
    setShowDetails(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const fetchDocxContent = async (docxPath: string) => {
    // Fetch DOCX content from the given path
    try {
      const response = await fetch(docxPath);
      if (response.ok) {
        const data = await response.blob();
        const text = await parseDocx(data); // Use a function to parse the DOCX
        setDocxContent(text);
      } else {
        setDocxContent('Failed to load DOCX content.');
      }
    } catch (error) {
      setDocxContent('Error fetching DOCX content.');
    }
  };

  const parseDocx = (blob: Blob) => {
    // Use a library or custom parsing logic to extract text from the DOCX file.
    // Placeholder function: Implement DOCX parsing logic here
    return 'Sample DOCX Content...'; // For now, just returning a placeholder
  };

  const calculateDiscountPercentage = (price: string, discountPrice: string | null) => {
    if (!discountPrice) return 0; // No discount
    const originalPrice = parseFloat(price.replace('₹', ''));
    const discountedPrice = parseFloat(discountPrice.replace('₹', ''));
    return ((originalPrice - discountedPrice) / originalPrice) * 100;
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchDocxContent(selectedProduct.scriptdocx); // Fetch DOCX content based on selected product
    }
  }, [selectedProduct]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Product Catalog</h1>

      {/* Conditionally render list or details */}
      {selectedProduct ? (
        <div className="flex w-full">
          {/* Left Sidebar */}
          <div className="w-1/3 bg-gray-800 rounded-lg shadow-lg p-6 mr-4">
            <button
              onClick={handleBackToList}
              className="mb-4 p-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg"
            >
              Back to List
            </button>
            <h2 className="text-2xl font-bold flex items-center">
              {selectedProduct.name}
              {selectedProduct.isTrending && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 text-yellow-500"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              )}
            </h2>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-lg my-4"
            />
            <p>{selectedProduct.details}</p>

            <div className="mt-4">
              <p className="text-xl font-bold">
                {selectedProduct.discountPrice ? (
                  <>
                    <span className="line-through text-gray-400">{selectedProduct.price}</span>{' '}
                    <span className="text-red-500">{selectedProduct.discountPrice}</span>
                    <span className="ml-2 text-green-500">
                      ({calculateDiscountPercentage(selectedProduct.price, selectedProduct.discountPrice).toFixed(2)}% OFF)
                    </span>
                  </>
                ) : (
                  selectedProduct.price
                )}
              </p>
            </div>

            {/* Accordion Toggle for More Product Details */}
            <div className="mt-6">
              <button
                onClick={toggleDetails}
                className="flex items-center text-lg font-medium text-gray-200 hover:text-gray-400"
              >
                {showDetails ? <FiChevronUp className="mr-2" /> : <FiChevronDown className="mr-2" />}
                {showDetails ? 'Hide Details' : 'Show More Information'}
              </button>

              {showDetails && (
                <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-xl font-semibold">More Information:</h3>
                  <p className="text-sm text-gray-300">{selectedProduct.additionalInfo}</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="w-2/3 bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
            <p>{selectedProduct.details}</p>
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Ingredients:</h3>
              <p className="text-sm text-gray-300">{selectedProduct.ingredients}</p>

              <h3 className="text-xl font-semibold mt-4">Benefits:</h3>
              <p className="text-sm text-gray-300">{selectedProduct.benefits}</p>

              <h3 className="text-xl font-semibold mt-4">Usage Instructions:</h3>
              <p className="text-sm text-gray-300">{selectedProduct.usage}</p>
            </div>
            {/* Display DOCX Content */}
            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Parsed DOCX Content:</h3>
              <div className="max-h-64 overflow-y-auto border border-gray-700 rounded-md p-2 bg-gray-900">
                <pre className="text-gray-300">{docxContent}</pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {/* Product Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 table-auto rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="p-4 text-left text-lg font-bold">Image</th>
                  <th className="p-4 text-left text-lg font-bold">Product Name</th>
                  <th className="p-4 text-left text-lg font-bold">Price</th>
                  <th className="p-4 text-left text-lg font-bold">Details</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="cursor-pointer hover:bg-gray-700 transition-all"
                  >
                    <td className="p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="p-4 flex items-center">
                      {product.name}
                      {product.isTrending && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-2 text-yellow-500"
                        >
                          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                          <polyline points="16 7 22 7 22 13"></polyline>
                        </svg>
                      )}
                    </td>
                    <td className="p-4">
                      {product.discountPrice ? (
                        <>
                          <span className="line-through text-gray-400">{product.price}</span>{' '}
                          <span className="text-red-500">{product.discountPrice}</span>
                          <span className="ml-2 text-green-500">
                            ({calculateDiscountPercentage(product.price, product.discountPrice).toFixed(2)}% OFF)
                          </span>
                        </>
                      ) : (
                        product.price
                      )}
                    </td>
                    <td className="p-4">{product.details.slice(0, 30)}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
