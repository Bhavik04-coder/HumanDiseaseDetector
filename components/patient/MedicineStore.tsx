'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Heart, Star, TrendingUp, Package, Clock, Shield, X, Plus, Minus, Pill, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Medicine {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  prescription: boolean;
  image: string;
  manufacturer: string;
  description: string;
}

interface CartItem extends Medicine {
  quantity: number;
}

const medicines: Medicine[] = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 45,
    originalPrice: 60,
    rating: 4.5,
    reviews: 234,
    inStock: true,
    prescription: false,
    image: '💊',
    manufacturer: 'PharmaCorp',
    description: 'Effective pain and fever relief'
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 120,
    rating: 4.8,
    reviews: 189,
    inStock: true,
    prescription: true,
    image: '💊',
    manufacturer: 'MediLife',
    description: 'Broad-spectrum antibiotic'
  },
  {
    id: 3,
    name: 'Vitamin D3 Tablets',
    category: 'Vitamins',
    price: 280,
    originalPrice: 350,
    rating: 4.6,
    reviews: 456,
    inStock: true,
    prescription: false,
    image: '💊',
    manufacturer: 'HealthPlus',
    description: 'Essential vitamin supplement'
  },
  {
    id: 4,
    name: 'Cetirizine 10mg',
    category: 'Allergy',
    price: 85,
    rating: 4.4,
    reviews: 312,
    inStock: true,
    prescription: false,
    image: '💊',
    manufacturer: 'AllerCare',
    description: 'Antihistamine for allergies'
  },
  {
    id: 5,
    name: 'Omeprazole 20mg',
    category: 'Digestive',
    price: 95,
    originalPrice: 120,
    rating: 4.7,
    reviews: 278,
    inStock: true,
    prescription: false,
    image: '💊',
    manufacturer: 'GastroMed',
    description: 'Reduces stomach acid'
  },
  {
    id: 6,
    name: 'Aspirin 75mg',
    category: 'Cardiovascular',
    price: 55,
    rating: 4.3,
    reviews: 198,
    inStock: true,
    prescription: false,
    image: '💊',
    manufacturer: 'CardioHealth',
    description: 'Blood thinner for heart health'
  },
  {
    id: 7,
    name: 'Metformin 500mg',
    category: 'Diabetes',
    price: 150,
    rating: 4.6,
    reviews: 423,
    inStock: true,
    prescription: true,
    image: '💊',
    manufacturer: 'DiabeCare',
    description: 'Diabetes management'
  },
  {
    id: 8,
    name: 'Ibuprofen 400mg',
    category: 'Pain Relief',
    price: 65,
    originalPrice: 80,
    rating: 4.5,
    reviews: 567,
    inStock: true,
    prescription: false,
    image: '💊',
    manufacturer: 'PainAway',
    description: 'Anti-inflammatory pain relief'
  }
];

const categories = ['All', 'Pain Relief', 'Antibiotics', 'Vitamins', 'Allergy', 'Digestive', 'Cardiovascular', 'Diabetes'];

export default function MedicineStore() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ products: 0, orders: 0, customers: 0 });

  // Animated counter effect
  useEffect(() => {
    const targets = { products: 10000, orders: 50000, customers: 25000 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        products: Math.floor(targets.products * progress),
        orders: Math.floor(targets.orders * progress),
        customers: Math.floor(targets.customers * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine: Medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(wid => wid !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Pill className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">MediStore</h1>
                <p className="text-xs text-gray-500">Your Health, Our Priority</p>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{animatedStats.products.toLocaleString()}+</div>
              <div className="text-blue-100">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{animatedStats.orders.toLocaleString()}+</div>
              <div className="text-blue-100">Orders Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{animatedStats.customers.toLocaleString()}+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-yellow-50 border-y border-yellow-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4 text-sm">
            <TrendingUp className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-gray-800">Special Offer:</span>
            <span className="text-gray-600">Use code <span className="font-bold text-yellow-700">HEALTH25</span> for 25% off on first order!</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/patient-dashboard')}
          className="mb-6 flex items-center space-x-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
          <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">Back to Home</span>
        </button>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">Free Delivery</div>
              <div className="text-xs text-gray-500">On orders above ₹500</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3">
            <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">Same Day</div>
              <div className="text-xs text-gray-500">Delivery available</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-800">100% Genuine</div>
              <div className="text-xs text-gray-500">Verified products</div>
            </div>
          </div>
        </div>

        {/* Medicine Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedicines.map(medicine => (
            <MedicineCard
              key={medicine.id}
              medicine={medicine}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isWishlisted={wishlist.includes(medicine.id)}
            />
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No medicines found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <CartDrawer
          cart={cart}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          total={cartTotal}
        />
      )}
    </div>
  );
}

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}

function MedicineCard({ medicine, onAddToCart, onToggleWishlist, isWishlisted }: MedicineCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-teal-50 p-8 flex items-center justify-center h-48">
        <div className="text-6xl">{medicine.image}</div>
        
        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(medicine.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>

        {/* Discount Badge */}
        {medicine.originalPrice && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            {Math.round((1 - medicine.price / medicine.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Prescription Badge */}
        {medicine.prescription && (
          <div className="absolute bottom-3 left-3 px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
            Rx Required
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {medicine.category}
          </span>
        </div>
        
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{medicine.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{medicine.manufacturer}</p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{medicine.description}</p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-gray-800">{medicine.rating}</span>
          <span className="text-xs text-gray-500">({medicine.reviews})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-800">₹{medicine.price}</div>
            {medicine.originalPrice && (
              <div className="text-sm text-gray-400 line-through">₹{medicine.originalPrice}</div>
            )}
          </div>
          <button
            onClick={() => onAddToCart(medicine)}
            disabled={!medicine.inStock}
            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              medicine.inStock
                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {medicine.inStock ? 'Add' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}

interface CartDrawerProps {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  total: number;
}

function CartDrawer({ cart, onClose, onRemove, onUpdateQuantity, total }: CartDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl flex items-center justify-center text-3xl">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.manufacturer}</p>
                  <p className="text-lg font-bold text-gray-800 mt-1">₹{item.price}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove from cart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-200">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="px-3 font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between text-lg">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-gray-800">₹{total.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
