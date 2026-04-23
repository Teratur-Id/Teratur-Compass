import { Leaf } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-border/30">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Leaf className="w-4.5 h-4.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">CostFlow</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Platform manajemen HPP dan keuangan untuk bisnis kuliner Indonesia. Hitung biaya produksi dengan presisi.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Produk</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <a href="#features" className="hover:text-foreground transition-colors">Fitur</a>
              <a href="#how-it-works" className="hover:text-foreground transition-colors">Cara Kerja</a>
              <a href="#testimonials" className="hover:text-foreground transition-colors">Testimoni</a>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Perusahaan</h4>
            <nav className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Tentang Kami</a>
              <a href="#" className="hover:text-foreground transition-colors">Kontak</a>
              <a href="#" className="hover:text-foreground transition-colors">Kebijakan Privasi</a>
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CostFlow. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};
