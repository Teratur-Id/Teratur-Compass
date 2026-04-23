import { motion } from 'framer-motion';
import { Calendar, TrendingUp, DollarSign, Bell, Search, ChevronDown, Menu, PanelLeftClose, PanelLeft } from 'lucide-react';
import { kpiData, dailyData } from '@/data/mockData';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onOpenMobile?: () => void;
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const Header = ({ onOpenMobile, isCollapsed, onToggleSidebar }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [period, setPeriod] = useState<'hari' | 'bulan'>('hari');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const todayRevenue = dailyData[dailyData.length - 1]?.revenue ?? 0;
  const monthlyRevenue = kpiData.totalRevenue;
  const monthlyProfit = kpiData.totalRevenue - kpiData.totalHpp;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-16 border-b border-border/30 bg-background/60 backdrop-blur-2xl flex items-center justify-between px-4 md:px-6 sticky top-0 z-40"
    >
      <div className="flex items-center gap-3">
        {isMobile ? (
          <Button variant="ghost" size="icon" onClick={onOpenMobile} className="mr-1">
            <Menu className="w-5 h-5" />
          </Button>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleSidebar} 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
          </Button>
        )}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-card/40 border border-border/30 text-sm text-muted-foreground w-64">
          <Search className="w-4 h-4" />
          <span>Cari...</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center hidden lg:flex">
              <DollarSign className="w-4 h-4 text-success" />
            </div>
            <div className="text-right sm:text-left">
              <p className="text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-wider">Revenue</p>
              <p className="text-xs md:text-sm font-bold">
                {formatCurrency(period === 'hari' ? todayRevenue : monthlyRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="w-px h-8 bg-border/30 hidden sm:block" />

        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-xl border border-border/30">
          <Bell className="w-4 h-4" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </Button>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
          M
        </div>
      </div>
    </motion.header>
  );
};
