import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { SpeechToText } from '../Components/SpeechToText';

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
  const [products, setProducts] = useState<Product[]>([]); // State to store all products
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<any[]>([]); // State to store conversation data

  // Fetch products from the backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products'); // Your API endpoint
        if (response.ok) {
          const data: Product[] = await response.json();
          setProducts(data);
        } else {
          throw new Error('Failed to fetch products');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

 // Function to fetch JSON content
 const fetchJsonContent = async (jsonPath: string) => {
  const fullPath = `${jsonPath}`;
  console.log('Fetching JSON content from:', fullPath);
  try {
    const response = await fetch(fullPath);
    console.log('Response Status:', response.status);
    if (response.ok) {
      const jsonData = await response.json(); // Parse JSON instead of text
      console.log('Fetched JSON Content:', jsonData);
      setDocxContent(JSON.stringify(jsonData, null, 2)); // Display formatted JSON content
    } else {
      console.error('Failed to fetch JSON content:', response.statusText);
    }
  } catch (err) {
    console.error('Error fetching JSON content:', err);
  }
};

// Automatically fetch .txt content when a product is selected
useEffect(() => {
  if (selectedProduct) {
    fetchJsonContent(selectedProduct.scriptdocx); // Fetch JSON content when product is selected
  }
}, [selectedProduct]);

  

  useEffect(() => {
    if (docxContent) {
      try {
        const parsedContent = JSON.parse(docxContent);
        if (parsedContent.conversation) {
          setConversation(parsedContent.conversation);
        } else {
          console.error('Conversation field missing in parsed content');
        }
      } catch (error) {
        console.error('Error parsing docxContent:', error);
      }
    }
  }, [docxContent]);

  
  const handleBackToList = () => {
    setSelectedProduct(null);
    setShowDetails(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const calculateDiscountPercentage = (price: string, discountPrice: string | null) => {
    if (!discountPrice) return 0; // No discount
    const originalPrice = parseFloat(price.replace('₹', ''));
    const discountedPrice = parseFloat(discountPrice.replace('₹', ''));
    return ((originalPrice - discountedPrice) / originalPrice) * 100;
  };
  
  const renderConversation = (conversationData: any[]) => {
    if (conversationData.length === 0) {
      return <p className="text-gray-400">No conversation data available.</p>;
    }
    return conversationData.map((item: any, index: number) => (
      <div
        key={index}
        className={`p-2 mb-2 rounded-lg ${item.role === 'Agent' ? 'bg-blue-600' : 'bg-green-600'} text-white flex items-center space-x-3`}
      >
        <div
          className={`w-6 h-6 rounded-full ${item.role === 'Agent' ? 'bg-blue-400' : 'bg-green-400'}`}
        ></div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{item.role === 'Agent' ? 'Agent' : 'Customer'}</p>
          <p className="text-xs mt-1">{item.message}</p>
        </div>
      </div>
    ));
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
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
              alt={selectedProduct.name} // Accessibility improvement: Adding alt text for images
              className="w-full h-68 object-cover rounded-lg my-4"
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

            <div className="mt-6 bg-gray-800 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Parsed TXT Content:</h3>
              <div className="max-h-64 overflow-y-auto border border-gray-700 rounded-md p-2 bg-gray-900">
              {conversation && renderConversation(conversation)}
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Speech to Text Component:</h3>
              <SpeechToText selectedProductId={selectedProduct.id} />
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
                        alt={product.name} // Accessibility improvement: Adding alt text for images
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
