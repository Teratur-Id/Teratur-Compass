import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Package, Search, Plus, AlertTriangle, 
  ArrowUp, RefreshCcw, Filter, ChevronDown
} from 'lucide-react';
import { ingredients as initialIngredients, Ingredient } from '@/data/mockData';
import { toast } from 'sonner';
import { Modal, Select, InputNumber, Form } from 'antd';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const stored = localStorage.getItem('teratur_ingredients');
    if (stored) {
      setIngredients(JSON.parse(stored));
    } else {
      setIngredients(initialIngredients);
      localStorage.setItem('teratur_ingredients', JSON.stringify(initialIngredients));
    }
  }, []);

  const handleRestock = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleConfirmRestock = () => {
    form.validateFields().then(values => {
      if (!selectedIngredient) return;

      const updated = ingredients.map(ing => 
        ing.id === selectedIngredient.id ? { ...ing, stock: ing.stock + values.jumlah } : ing
      );
      setIngredients(updated);
      localStorage.setItem('teratur_ingredients', JSON.stringify(updated));
      toast.success(`Berhasil menambah stok ${selectedIngredient.name}!`);
      setIsModalOpen(false);
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Stok Bahan Baku</h1>
            <p className="text-muted-foreground text-sm">Pantau ketersediaan bahan dan HPP per unit secara real-time.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl gap-2 h-11"><RefreshCcw className="w-4 h-4" /> Sync Stok</Button>
            <Button className="rounded-xl gap-2 h-11 shadow-lg shadow-primary/20"><Plus className="w-4 h-4" /> Tambah Bahan</Button>
          </div>
        </div>

        {/* ALERTS FOR LOW STOCK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ingredients.filter(i => i.stock <= i.minStock).map(ing => (
            <Card key={ing.id} className="border-warning/30 bg-warning/5 rounded-2xl overflow-hidden">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-warning/80">Stok Menipis!</p>
                  <p className="font-bold truncate">{ing.name}</p>
                </div>
                <Button size="sm" variant="warning" className="h-8 rounded-lg" onClick={() => handleRestock(ing)}>Restock</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/50 bg-card rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
          <CardHeader className="border-b border-border/30 bg-secondary/10 flex flex-row items-center justify-between p-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Cari bahan..." 
                className="pl-9 h-11 rounded-xl bg-background/50 border-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="ghost" className="rounded-xl gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px] pl-8">Nama Bahan</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Stok Tersedia</TableHead>
                  <TableHead>Min. Stok</TableHead>
                  <TableHead>HPP per Unit</TableHead>
                  <TableHead className="text-right pr-8">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredients.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ing) => (
                  <TableRow key={ing.id} className="group transition-colors">
                    <TableCell className="pl-8 py-4 font-bold text-foreground">{ing.name}</TableCell>
                    <TableCell><Badge variant="secondary" className="rounded-lg">{ing.category}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-black ${ing.stock <= ing.minStock ? 'text-destructive' : 'text-foreground'}`}>
                          {ing.stock.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{ing.unit}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium italic">{ing.minStock} {ing.unit}</TableCell>
                    <TableCell className="font-bold text-success">Rp {ing.avgCost.toLocaleString()}</TableCell>
                    <TableCell className="text-right pr-8">
                      <Button variant="outline" size="sm" className="rounded-lg h-8 px-4" onClick={() => handleRestock(ing)}>
                        <ArrowUp className="w-3.5 h-3.5 mr-1.5" /> Entry Belanja
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <Modal
        title={`Entry Belanja - ${selectedIngredient?.name}`}
        open={isModalOpen}
        onOk={handleConfirmRestock}
        onCancel={() => setIsModalOpen(false)}
        okText="Simpan Stok"
        cancelText="Batal"
        centered
        className="rounded-2xl"
      >
        <Form form={form} layout="vertical" className="pt-4">
          <Form.Item name="jumlah" label="Jumlah Masuk" rules={[{ required: true, message: 'Masukkan jumlah!' }]}>
            <InputNumber className="w-full h-10" min={1} placeholder="Contoh: 10" />
          </Form.Item>
          <Form.Item name="supplier" label="Supplier">
            <Select 
              className="w-full h-10"
              suffixIcon={<ChevronDown className="w-3 h-3" />}
              options={[
                { value: 'supplier_a', label: 'Supplier Utama A' },
                { value: 'supplier_b', label: 'Supplier Lokal B' },
              ]}
              placeholder="Pilih Supplier"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Ingredients;
