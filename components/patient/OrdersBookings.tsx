'use client';

import { useState } from 'react';
import { Package, FlaskConical, Stethoscope, Calendar, MapPin, Clock, Download, Eye, X, CheckCircle2, Truck, Loader2, AlertCircle, Phone, Mail } from 'lucide-react';

interface Order {
  id: string;
  type: 'medicine' | 'pathology' | 'consultation';
  date: Date;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled';
  total: number;
  items: Array<{
    name: string;
    quantity?: number;
    price: number;
  }>;
  deliveryAddress?: string;
  collectionDate?: Date;
  collectionTime?: string;
  doctorName?: string;
  appointmentDate?: Date;
  appointmentTime?: string;
  trackingId?: string;
  estimatedDelivery?: Date;
}

// Sample orders data
const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ORD12345678',
    type: 'medicine',
    date: new Date('2024-03-01'),
    status: 'delivered',
    total: 1245.50,
    items: [
      { name: 'Paracetamol 500mg', quantity: 2, price: 90 },
      { name: 'Vitamin D3 Tablets', quantity: 1, price: 280 },
      { name: 'Cetirizine 10mg', quantity: 3, price: 255 }
    ],
    deliveryAddress: '123 Main St, Mumbai, Maharashtra - 400001',
    trackingId: 'TRK987654321',
    estimatedDelivery: new Date('2024-03-03')
  },
  {
    id: 'LAB87654321',
    type: 'pathology',
    date: new Date('2024-03-02'),
    status: 'completed',
    total: 1499,
    items: [
      { name: 'Complete Blood Count (CBC)', price: 299 },
      { name: 'Lipid Profile', price: 499 },
      { name: 'Thyroid Profile', price: 799 }
    ],
    deliveryAddress: '123 Main St, Mumbai, Maharashtra - 400001',
    collectionDate: new Date('2024-03-03'),
    collectionTime: '8:00 AM - 9:00 AM'
  },
  {
    id: 'DOC45678912',
    type: 'consultation',
    date: new Date('2024-03-03'),
    status: 'confirmed',
    total: 800,
    items: [
      { name: 'Video Consultation', price: 800 }
    ],
    doctorName: 'Dr. Sarah Johnson',
    appointmentDate: new Date('2024-03-05'),
    appointmentTime: '10:30 AM'
  },
  {
    id: 'ORD23456789',
    type: 'medicine',
    date: new Date('2024-03-04'),
    status: 'shipped',
    total: 650,
    items: [
      { name: 'Amoxicillin 250mg', quantity: 1, price: 120 },
      { name: 'Omeprazole 20mg', quantity: 2, price: 190 }
    ],
    deliveryAddress: '123 Main St, Mumbai, Maharashtra - 400001',
    trackingId: 'TRK123456789',
    estimatedDelivery: new Date('2024-03-06')
  },
  {
    id: 'LAB11223344',
    type: 'pathology',
    date: new Date('2024-03-04'),
    status: 'processing',
    total: 2999,
    items: [
      { name: 'Complete Body Checkup Package', price: 2999 }
    ],
    deliveryAddress: '123 Main St, Mumbai, Maharashtra - 400001',
    collectionDate: new Date('2024-03-05'),
    collectionTime: '7:00 AM - 8:00 AM'
  }
];

export default function OrdersBookings() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'medicine' | 'pathology' | 'consultation'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredOrders = selectedTab === 'all' 
    ? SAMPLE_ORDERS 
    : SAMPLE_ORDERS.filter(order => order.type === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'shipped':
      case 'confirmed':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
      case 'completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'processing':
      case 'confirmed':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Package className="w-5 h-5" />;
      case 'pathology':
        return <FlaskConical className="w-5 h-5" />;
      case 'consultation':
        return <Stethoscope className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medicine':
        return 'bg-green-100 text-green-700';
      case 'pathology':
        return 'bg-purple-100 text-purple-700';
      case 'consultation':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">My Orders & Bookings</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track all your medicine orders, lab test bookings, and doctor consultations in one place
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { key: 'all' as const, label: 'All Orders', count: SAMPLE_ORDERS.length },
            { key: 'medicine' as const, label: 'Medicine', count: SAMPLE_ORDERS.filter(o => o.type === 'medicine').length },
            { key: 'pathology' as const, label: 'Lab Tests', count: SAMPLE_ORDERS.filter(o => o.type === 'pathology').length },
            { key: 'consultation' as const, label: 'Consultations', count: SAMPLE_ORDERS.filter(o => o.type === 'consultation').length },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedTab(tab.key)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedTab === tab.key
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${getTypeColor(order.type)}`}>
                      {getTypeIcon(order.type)}
                      <span className="text-sm font-semibold capitalize">{order.type}</span>
                    </div>
                    <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-xs font-semibold capitalize">{order.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Order ID: <span className="font-semibold text-gray-800">{order.id}</span></p>
                  <p className="text-xs text-gray-500">{order.date.toLocaleDateString()}</p>
                </div>

                {/* Items */}
                <div className="p-6 border-b border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Items ({order.items.length})</h4>
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 flex-1">
                          {item.name}
                          {item.quantity && <span className="text-gray-400"> x{item.quantity}</span>}
                        </span>
                        <span className="font-semibold text-gray-800">₹{item.price}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-blue-600 font-medium">+{order.items.length - 2} more items</p>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 bg-gray-50">
                  {order.type === 'medicine' && order.estimatedDelivery && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <Truck className="w-4 h-4" />
                      <span>Delivery by {order.estimatedDelivery.toLocaleDateString()}</span>
                    </div>
                  )}
                  {order.type === 'pathology' && order.collectionDate && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>Collection: {order.collectionDate.toLocaleDateString()} at {order.collectionTime}</span>
                    </div>
                  )}
                  {order.type === 'consultation' && order.appointmentDate && (
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Stethoscope className="w-4 h-4" />
                        <span>{order.doctorName}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{order.appointmentDate.toLocaleDateString()} at {order.appointmentTime}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-xl font-bold text-gray-800">₹{order.total.toFixed(2)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowDetails(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Order Details Modal */}
        {showDetails && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowDetails(false)}
                aria-label="Close order details"
                className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(selectedOrder.type)}`}>
                    {getTypeIcon(selectedOrder.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                    <p className="text-gray-600 text-sm">{selectedOrder.id}</p>
                  </div>
                </div>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(selectedOrder.status)}`}>
                  {getStatusIcon(selectedOrder.status)}
                  <span className="font-semibold capitalize">{selectedOrder.status}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-6 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        {item.quantity && <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>}
                      </div>
                      <p className="text-lg font-bold text-gray-800">₹{item.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Delivery/Collection Details */}
              {selectedOrder.deliveryAddress && (
                <div className="mb-6 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-800">
                      {selectedOrder.type === 'medicine' ? 'Delivery Address' : 'Collection Address'}
                    </h3>
                  </div>
                  <p className="text-gray-700">{selectedOrder.deliveryAddress}</p>
                  {selectedOrder.trackingId && (
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <p className="text-sm text-gray-600">Tracking ID: <span className="font-semibold text-gray-800">{selectedOrder.trackingId}</span></p>
                    </div>
                  )}
                </div>
              )}

              {/* Appointment Details */}
              {selectedOrder.type === 'consultation' && (
                <div className="mb-6 p-6 bg-purple-50 border border-purple-200 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Appointment Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Stethoscope className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Doctor</p>
                        <p className="font-semibold text-gray-800">{selectedOrder.doctorName}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Date & Time</p>
                        <p className="font-semibold text-gray-800">
                          {selectedOrder.appointmentDate?.toLocaleDateString()} at {selectedOrder.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                {(selectedOrder.status === 'delivered' || selectedOrder.status === 'completed') && (
                  <button
                    type="button"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download {selectedOrder.type === 'pathology' ? 'Report' : 'Invoice'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
