// Stripe configuration and utilities
export const STRIPE_PUBLIC_KEY = process.env.VITE_STRIPE_PUBLIC_KEY || '';

// Product price mapping for Stripe - Updated with new product structure
export const STRIPE_PRICES = {
  // LA VEIRA Collection - Women
  'LV-JK-BLK-F': 'price_1234567890', // LA VEIRA Jacket Black Female
  'LV-JK-BGE-F': 'price_1234567891', // LA VEIRA Jacket Beige Female
  'LV-SH-BLK-F': 'price_1234567892', // LA VEIRA Short Black Female
  'LV-SH-BGE-F': 'price_1234567893', // LA VEIRA Short Beige Female
  'LV-SET-BLK-F': 'price_1234567894', // LA VEIRA Set Black Female
  'LV-SET-BGE-F': 'price_1234567895', // LA VEIRA Set Beige Female
  'LV-SET-SH-BLK-F': 'price_1234567896', // LA VEIRA Set Short Black Female
  'LV-SET-SH-BGE-F': 'price_1234567897', // LA VEIRA Set Short Beige Female
  
  // LA VEIRA Collection - Men
  'LV-JK-BLK-M': 'price_1234567898', // LA VEIRA Jacket Black Male
  'LV-JK-BGE-M': 'price_1234567899', // LA VEIRA Jacket Beige Male
  'LV-SH-BLK-M': 'price_1234567900', // LA VEIRA Short Black Male
  'LV-SH-BGE-M': 'price_1234567901', // LA VEIRA Short Beige Male
  'LV-SET-SH-BLK-M': 'price_1234567902', // LA VEIRA Set Short Black Male
  'LV-SET-SH-BGE-M': 'price_1234567903', // LA VEIRA Set Short Beige Male
  
  // TUMIE Collection - Women
  'TM-JK-BLK-F': 'price_1234567904', // TUMIE Jacket Black Female
  'TM-JK-BGE-F': 'price_1234567905', // TUMIE Jacket Beige Female
  'TM-TS-BLK-F': 'price_1234567906', // TUMIE T-Shirt Black Female
  'TM-TS-BGE-F': 'price_1234567907', // TUMIE T-Shirt Beige Female
  'TM-PN-BLK-F': 'price_1234567908', // TUMIE Pants Black Female
  'TM-SET-HD-F': 'price_1234567909', // TUMIE Set Hoodie Female
  'TM-COMPLETE-F': 'price_1234567910', // TUMIE Complete Set Female
  
  // TUMIE Collection - Men
  'TM-JK-BLK-M': 'price_1234567911', // TUMIE Jacket Black Male
  'TM-JK-BGE-M': 'price_1234567912', // TUMIE Jacket Beige Male
  'TM-TS-BLK-M': 'price_1234567913', // TUMIE T-Shirt Black Male
  'TM-TS-BGE-M': 'price_1234567914', // TUMIE T-Shirt Beige Male
  'TM-PN-BLK-M': 'price_1234567915', // TUMIE Pants Black Male
  'TM-SET-HD-M': 'price_1234567916', // TUMIE Set Hoodie Male
  'TM-COMPLETE-M': 'price_1234567917', // TUMIE Complete Set Male
};

// Initialize Stripe checkout with proper error handling
export const createCheckoutSession = async (items: Array<{
  sku?: string;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  price?: number;
  name?: string;
}>) => {
  try {
    // For demo purposes, we'll simulate a successful checkout
    // In production, this would make a real API call to your backend
    
    console.log('Creating checkout session for items:', items);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Calculate total for demo
    const total = items.reduce((sum, item) => {
      const price = item.price || 34.99; // Default price
      return sum + (price * item.quantity);
    }, 0);
    
    console.log('Checkout total:', total);
    
    // In a real implementation, you would:
    // 1. Send items to your backend
    // 2. Create Stripe checkout session on backend
    // 3. Return the session URL
    // 4. Redirect user to Stripe checkout
    
    // For demo, we'll show a success message
    alert(`Checkout initiated for ${items.length} items. Total: €${total.toFixed(2)}\n\nIn production, this would redirect to Stripe checkout.`);
    
    return {
      success: true,
      total: total,
      message: 'Checkout session created successfully'
    };
    
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session. Please try again.');
  }
};

// Format price for display
export const formatPrice = (price: number, currency: string = 'EUR') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

// Validate Stripe configuration
export const validateStripeConfig = () => {
  if (!STRIPE_PUBLIC_KEY || STRIPE_PUBLIC_KEY === '') {
    console.warn('Stripe public key not configured');
    return false;
  }
  if (STRIPE_PUBLIC_KEY.includes('demo') || STRIPE_PUBLIC_KEY.includes('test_demo')) {
    console.warn('Using demo Stripe key - replace with real key for production');
  }
  return true;
};

// Initialize Stripe (for future use when implementing real Stripe)
export const initializeStripe = async () => {
  try {
    // This would load the Stripe library in a real implementation
    console.log('Stripe configuration validated');
    return validateStripeConfig();
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    return false;
  }
};