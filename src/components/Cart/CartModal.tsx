import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard, Lock, Truck, Gift } from 'lucide-react';
import { CartItem } from '../../lib/types';
import { useLocalization } from '../../contexts/LocalizationContext';
import CartItemComponent from './CartItem';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const { formatPrice, t } = useLocalization();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoDiscount;
  const total = subtotal + shipping + tax - discount;

  const handleApplyPromo = () => {
    const validCodes = {
      'WELCOME10': 0.10,
      'FAITH20': 0.20,
      'NEWCUSTOMER': 0.15,
      'EOA25': 0.25
    };

    const code = promoCode.toUpperCase();
    if (validCodes[code as keyof typeof validCodes]) {
      setAppliedPromo(code);
      setPromoDiscount(subtotal * validCodes[code as keyof typeof validCodes]);
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromo = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
  };

  const handleSecureCheckout = async () => {
    setIsProcessingPayment(true);
    
    try {
      // Import Stripe utilities
      const { createCheckoutSession } = await import('../../lib/stripe');
      
      // Prepare items for Stripe
      const stripeItems = items.map(item => ({
        sku: item.product.sku,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }));
      
      // Create Stripe checkout session
      await createCheckoutSession(stripeItems);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Real E.O.A Fashion suggested products
  const suggestedProducts = [
    {
      id: 1001,
      name: "TUMIE Essential Tee",
      price: 89,
      image: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/tumie-images/DSC06061.jpg",
      collection: "TUMIE"
    },
    {
      id: 1002,
      name: "LA VEIRA Luxury Jacket",
      price: 299,
      image: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/laviera-images/WhatsApp%20Image%202025-08-10%20at%2002.34.45_39d1131a.jpg",
      collection: "LA VEIRA"
    },
    {
      id: 1003,
      name: "TUMIE Classic Pants",
      price: 149,
      image: "https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/TM%20Collection/TM%20-%20PN%20-%20Black%20-%20M%20%201.JPG",
      collection: "TUMIE"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white h-full w-full max-w-md shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900">{t('yourCart')}</h2>
            <span className="text-red-500 text-sm">*</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Banner */}
        {subtotal > 100 && (
          <div className="bg-green-50 border-b border-green-200 px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <span className="font-medium">{t('freeShipping')}</span>
            </div>
            <div className="text-xs text-green-600 mt-1">
              {t('expressShipping')}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Gift cards & promotional codes applied at checkout
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12 px-4">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('cartEmpty')}</h3>
              <p className="text-gray-500 mb-6">Add some items to get started</p>
              <button
                onClick={onClose}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Shipping & Returns Info */}
              <button className="w-full text-left text-sm text-gray-600 hover:text-gray-800 transition-colors border-b border-gray-200 pb-2">
                Shipping & returns information →
              </button>

              {/* Cart Items List */}
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="relative w-16 h-20 flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=80&fit=crop';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">{item.product.name}</h3>
                    <div className="text-xs text-gray-600 mb-2">
                      {item.selectedSize && <span>{item.selectedSize} </span>}
                      {item.selectedColor && <span>{item.selectedColor}</span>}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {item.product.isNew && (
                        <span className="bg-black text-white text-xs px-2 py-1 rounded">NEW</span>
                      )}
                      {item.product.isComingSoon && (
                        <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded">COMING SOON</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 rounded border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{formatPrice(item.product.price)}</span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* You Might Also Like */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">{t('youMightAlsoLike')}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {suggestedProducts.map((product) => (
                    <div key={product.id} className="text-center">
                      <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://ggcxbhkzkfuyyoxguizy.supabase.co/storage/v1/object/public/e.o.a-logo/E.O.A%20Logo.jpg';
                          }}
                        />
                      </div>
                      <p className="text-xs text-gray-600 mb-1 line-clamp-2">{product.name}</p>
                      <p className="text-xs text-amber-600 font-medium mb-1">{product.collection}</p>
                      <p className="text-xs font-medium text-gray-900">{formatPrice(product.price)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 bg-white p-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">{t('total')}</span>
              <span className="text-lg font-bold text-gray-900">{formatPrice(total)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleSecureCheckout}
              disabled={isProcessingPayment}
              className="w-full bg-black text-white py-4 rounded font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessingPayment ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  {t('secureCheckout')}
                </>
              )}
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;