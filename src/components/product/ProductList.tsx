import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Plus, Edit2, Users } from 'lucide-react';
import { products as initialProducts, rawMaterials, Product } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AddProductForm } from './AddProductForm';
import { EditProductForm } from './EditProductForm';
import { BTKLAllocation } from './BTKLAllocation';
import { Employee } from '@/pages/Employees';

// Default employees for BTKL allocation
const defaultEmployees: Employee[] = [
  {
    id: '1',
    name: 'Ahmad Barista',
    position: 'Barista',
    dailyWage: 150000,
    monthlyWage: 3900000,
    wageType: 'daily',
    isProductionLabor: true,
    department: 'Produksi',
    phone: '081234567890',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'Budi Chef',
    position: 'Chef Pastry',
    dailyWage: 200000,
    monthlyWage: 5200000,
    wageType: 'daily',
    isProductionLabor: true,
    department: 'Produksi',
    phone: '081234567892',
    joinDate: '2024-01-20',
  },
];

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showBtklAllocation, setShowBtklAllocation] = useState(false);

  // Load employees from localStorage
  useEffect(() => {
    const storedEmployees = localStorage.getItem('costflow_employees');
    if (storedEmployees) {
      try {
        setEmployees(JSON.parse(storedEmployees));
      } catch {
        // Use default employees
      }
    }
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const btklEmployees = employees.filter(e => e.isProductionLabor);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Produk</h1>
          <p className="text-muted-foreground">Kelola produk dan lihat analisis HPP</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant="outline" 
            onClick={() => setShowBtklAllocation(true)} 
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            Alokasi BTKL
          </Button>
          <Button onClick={() => setIsAdding(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Tambah Produk
          </Button>
        </div>
      </div>

      {/* BTKL Summary */}
      {btklEmployees.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 border-l-4 border-l-primary"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Total BTKL: {btklEmployees.length} karyawan</p>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(btklEmployees.reduce((sum, e) => sum + e.dailyWage, 0))}/hari
                </p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowBtklAllocation(true)}
              className="text-primary"
            >
              Kelola Alokasi
            </Button>
          </div>
        </motion.div>
      )}

      {/* Add Product Form */}
      <AnimatePresence>
        {isAdding && (
          <AddProductForm
            rawMaterials={rawMaterials}
            onAddProduct={handleAddProduct}
            onClose={() => setIsAdding(false)}
          />
        )}
      </AnimatePresence>

      {/* Edit Product Form */}
      <AnimatePresence>
        {editingProduct && (
          <EditProductForm
            product={editingProduct}
            rawMaterials={rawMaterials}
            onSaveProduct={handleEditProduct}
            onClose={() => setEditingProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* BTKL Allocation Modal */}
      <AnimatePresence>
        {showBtklAllocation && (
          <BTKLAllocation
            products={products}
            employees={employees}
            onUpdateProducts={handleUpdateProducts}
            onClose={() => setShowBtklAllocation(false)}
          />
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card p-5 flex items-center gap-5 hover:border-primary/30 transition-all duration-300 group"
          >
            <Link
              to={`/product/${product.id}`}
              className="flex items-center gap-5 flex-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {product.emoji}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-xs font-medium">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.salesCount} terjual
                </p>
              </div>

              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Harga Jual</p>
                  <p className="font-semibold number-display">{formatCurrency(product.sellingPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">HPP</p>
                  <p className="font-semibold number-display text-destructive">{formatCurrency(product.hpp)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Margin</p>
                  <div className="flex items-center justify-center gap-1 text-success">
                    <TrendingUp className="w-3 h-3" />
                    <span className="font-semibold number-display">{product.margin}%</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={(e) => {
                  e.preventDefault();
                  setEditingProduct(product);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Link to={`/product/${product.id}`}>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
