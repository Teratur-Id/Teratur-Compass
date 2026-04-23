import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductDetailCard } from '@/components/product/ProductDetailCard';
import { products } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h1>
          <Link to="/products" className="text-primary hover:underline">
            Kembali ke daftar produk
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Produk
        </Link>

        <ProductDetailCard product={product} />
      </div>
    </Layout>
  );
};

export default ProductDetail;
