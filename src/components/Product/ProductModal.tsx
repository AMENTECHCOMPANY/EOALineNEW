import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, Plus, Minus, Check, Eye } from 'lucide-react';
import { Product } from '../../lib/types';
import { useLocalization } from '../../contexts/LocalizationContext';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist
}) => {
  const { formatPrice } = useLocalization();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sizeError, setSizeError] = useState(''); // Size validation error state
  const [selectedProductColor, setSelectedProductColor] = useState(product.colors[0]);

  if (!isOpen) return null;

  // Get current images based on selected color
  const getCurrentImages = () => {
    if (typeof product.images === 'object' && product.images[selectedProductColor.toLowerCase()]) {
      return product.images[selectedProductColor.toLowerCase()];
    }
    // Fallback to first color if selected color not found
    const firstColor = product.colors[0].toLowerCase();
    return typeof product.images === 'object' ? product.images[firstColor] || [] : product.images;
  };

  const currentImages = getCurrentImages();
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const handleAddToCart = () => {
    // Validate size selection - mandatory for all products
    if (!selectedSize && product.sizes.length > 0) {
      setSizeError('Please select a size before adding to cart');
      return;
    }
    
    // Clear any previous error
    setSizeError('');
    
    const productWithSelections = {
      ...product,
      selectedSize,
      selectedColor,
      quantity
    };
    onAddToCart(productWithSelections);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 3000);
    setShowSuggestions(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Mock suggested products based on collection
  const suggestedProducts = [
    {
      id: 999,
      name: "TUMIE Essential Tee",
      price: 89,
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop"],
      collection: "tumie" as const,
      category: "tshirt",
      gender: "unisex" as const,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White"],
      description: "Essential comfort tee",
      verse: "I can do all things through Christ - Philippians 4:13",
      rating: 4.8,
      reviews: 156,
      inStock: true,
      sku: "TM-TEE-001"
    },
    {
      id: 998,
      name: "LA VEIRA Classic Jacket",
      price: 299,
      images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop"],
      collection: "laveira" as const,
      category: "jacket",
      gender: "unisex" as const,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy"],
      description: "Premium luxury jacket",
      verse: "Be strong in the Lord - Ephesians 6:10",
      rating: 4.9,
      reviews: 203,
      inStock: true,
      sku: "LV-JKT-001"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">
              {product.collection} Collection
            </span>
            {product.isNew && (
              <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={currentImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop';
                }}
              />
              
              {/* Navigation Arrows */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {currentImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-amber-400 ring-2 ring-amber-400/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                {product.isNew && (
                  <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </span>
                )}
                {product.isComingSoon && (
                  <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    COMING SOON
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded">
                      Save {formatPrice(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>

              {/* Bible Verse */}
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-6">
                <p className="text-amber-800 italic font-medium">{product.verse}</p>
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Size <span className="text-red-500">*</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setSizeError(''); // Clear error when size is selected
                      }}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {/* Size validation error message */}
                {sizeError && (
                  <p className="text-red-500 text-sm mt-2">{sizeError}</p>
                )}
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setSelectedProductColor(color);
                        setCurrentImageIndex(0); // Reset to first image when color changes
                      }}
                      className={`px-4 py-2 border rounded-lg font-medium transition-all capitalize ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-4 rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  isAddedToCart 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-black hover:bg-gray-800'
                } text-white`}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    {product.inStock ? `Add to Cart - ${formatPrice(product.price * quantity)}` : 'Out of Stock'}
                  </>
                )}
              </button>
              
              <button
                onClick={() => onAddToWishlist(product)}
                className={`w-full py-3 rounded-lg border-2 font-medium transition-all flex items-center justify-center gap-2 ${
                  isInWishlist
                    ? 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-xl">🚚</span>
                </div>
                <h4 className="font-semibold text-sm text-gray-900">Free Shipping</h4>
                <p className="text-xs text-gray-600">Orders over $100</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 text-xl">↩️</span>
                </div>
                <h4 className="font-semibold text-sm text-gray-900">30-Day Returns</h4>
                <p className="text-xs text-gray-600">Easy returns</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 text-xl">🔒</span>
                </div>
                <h4 className="font-semibold text-sm text-gray-900">Secure Payment</h4>
                <p className="text-xs text-gray-600">SSL protected</p>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Suggested Products */}
            {isAddedToCart && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="text-amber-600">✨</span>
                  You might also like
                </h3>
                <div className="space-y-4">
                  {suggestedProducts.map((suggestedProduct) => (
                    <div key={suggestedProduct.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 flex-shrink-0">
                          <img
                            src={suggestedProduct.images[0]}
                            alt={suggestedProduct.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80&h=80&fit=crop';
                            }}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{suggestedProduct.name}</h4>
                            <p className="text-xs text-amber-600 font-medium uppercase tracking-wide">
                              {suggestedProduct.collection} Collection
                            </p>
                          </div>
                          
                          {/* Rating */}
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(suggestedProduct.rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">({suggestedProduct.reviews})</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">{formatPrice(suggestedProduct.price)}</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  onAddToCart(suggestedProduct);
                                  // Show brief confirmation
                                  const btn = document.activeElement as HTMLButtonElement;
                                  const originalText = btn.textContent;
                                  btn.textContent = 'Added!';
                                  btn.className = btn.className.replace('bg-black', 'bg-green-600');
                                  setTimeout(() => {
                                    btn.textContent = originalText;
                                    btn.className = btn.className.replace('bg-green-600', 'bg-black');
                                  }, 1500);
                                }}
                                className="bg-black text-white py-2 px-4 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors flex items-center gap-1"
                              >
                                <ShoppingBag className="w-3 h-3" />
                                Add to Cart
                              </button>
                              <button 
                                className="bg-gray-100 text-gray-600 py-2 px-3 rounded-lg text-xs hover:bg-gray-200 transition-colors"
                                title="Quick View"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* View More Suggestions */}
                <div className="mt-4 text-center">
                  <button 
                    onClick={onClose}
                    className="text-black hover:text-gray-700 text-sm font-medium transition-colors"
                  >
                    View More Products →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;