import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { 
  LayoutDashboard, 
  MapPin, 
  Users, 
  Building2, 
  FileText, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
  Activity,
  BarChart3,
  Calendar,
  HelpCircle,
  UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, page: 'Dashboard' },
  { name: 'Visitas', icon: MapPin, page: 'Visits' },
  { name: 'Clientes', icon: Building2, page: 'Clients' },
  { name: 'Equipe', icon: Users, page: 'Team' },
  { name: 'Relatórios', icon: FileText, page: 'Reports' },
  { name: 'Agenda', icon: Calendar, page: 'Schedule' },
  { name: 'Atividades', icon: Activity, page: 'Activities' },
  { name: 'Analytics', icon: BarChart3, page: 'Analytics' },
];

const secondaryNav = [
  { name: 'Configurações', icon: Settings, page: 'Settings' },
  { name: 'Ajuda', icon: HelpCircle, page: 'Help' },
];

export default function Layout({ children, currentPageName }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        console.log('User not logged in');
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-300", darkMode ? "dark" : "light")} style={{
      backgroundColor: darkMode ? 'var(--visity-bg)' : 'var(--visity-bg-secondary)',
      color: darkMode ? 'var(--visity-text)' : 'var(--visity-text)'
    }}>
      <style>{`
        :root {
          --visity-navy: #003d7a;
          --visity-blue: #0091d5;
          --visity-green: #4caf50;
          --visity-cyan: #00bcd4;
          --visity-gray: #6b7280;
        }
        .dark {
          --visity-bg: #0a0f1a;
          --visity-bg-secondary: #111827;
          --visity-bg-card: #1a1f2e;
          --visity-border: #1f2937;
          --visity-text: #f9fafb;
          --visity-text-secondary: #9ca3af;
        }
        .light {
          --visity-bg: #ffffff;
          --visity-bg-secondary: #f9fafb;
          --visity-bg-card: #ffffff;
          --visity-border: #e5e7eb;
          --visity-text: #111827;
          --visity-text-secondary: #6b7280;
        }
      `}</style>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b px-4 py-3" style={{
        backgroundColor: darkMode ? 'var(--visity-bg-secondary)' : 'var(--visity-bg-card)',
        borderColor: darkMode ? 'var(--visity-border)' : 'var(--visity-border)'
      }}>
        <div className="flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2">
            <Menu className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6990fd7ca0f92676b6efa266/7ed453e0c_LOGOCOMFUNDO.png"
              alt="Visity Logo"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="text-lg font-bold" style={{ color: darkMode ? 'var(--visity-text)' : 'var(--visity-navy)' }}>Visity</span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-white text-xs" style={{
              background: 'linear-gradient(135deg, var(--visity-navy) 0%, var(--visity-blue) 100%)'
            }}>
              {getInitials(user?.full_name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 shadow-xl" style={{
            backgroundColor: darkMode ? 'var(--visity-bg-secondary)' : 'var(--visity-bg-card)'
          }}>
            <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--visity-border)' }}>
              <div className="flex items-center gap-3">
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6990fd7ca0f92676b6efa266/7ed453e0c_LOGOCOMFUNDO.png"
                  alt="Visity Logo"
                  className="w-10 h-10 rounded-xl object-contain"
                />
                <span className="text-xl font-bold" style={{ color: 'var(--visity-text)' }}>Visity</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={createPageUrl(item.page)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={currentPageName === item.page ? {
                    background: 'linear-gradient(135deg, var(--visity-navy) 0%, var(--visity-blue) 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0, 145, 213, 0.3)'
                  } : {
                    color: 'var(--visity-text-secondary)'
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 border-r transition-all duration-300",
        collapsed ? "w-20" : "w-72"
      )} style={{
        backgroundColor: darkMode ? 'var(--visity-bg-secondary)' : 'var(--visity-bg-card)',
        borderColor: 'var(--visity-border)'
      }}>
        {/* Logo */}
        <div className={cn(
          "h-16 border-b flex items-center",
          collapsed ? "justify-center px-2" : "px-6"
        )} style={{ borderColor: 'var(--visity-border)' }}>
          <div className="flex items-center gap-3">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6990fd7ca0f92676b6efa266/7ed453e0c_LOGOCOMFUNDO.png"
              alt="Visity Logo"
              className="w-10 h-10 rounded-xl object-contain shadow-lg"
              style={{ boxShadow: '0 4px 12px rgba(0, 145, 213, 0.3)' }}
            />
            {!collapsed && (
              <span className="text-xl font-bold" style={{ color: 'var(--visity-text)' }}>Visity</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={createPageUrl(item.page)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative",
                collapsed && "justify-center px-2"
              )}
              style={currentPageName === item.page ? {
                background: 'linear-gradient(135deg, var(--visity-navy) 0%, var(--visity-blue) 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 145, 213, 0.3)'
              } : {
                color: 'var(--visity-text-secondary)'
              }}
              onMouseEnter={(e) => {
                if (currentPageName !== item.page) {
                  e.currentTarget.style.backgroundColor = darkMode ? 'rgba(0, 145, 213, 0.1)' : 'rgba(0, 145, 213, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPageName !== item.page) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && item.name}
              {collapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t" style={{ borderColor: 'var(--visity-border)' }}>
            {secondaryNav.map((item) => (
              <Link
                key={item.name}
                to={createPageUrl(item.page)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative",
                  collapsed && "justify-center px-2"
                )}
                style={currentPageName === item.page ? {
                  background: 'linear-gradient(135deg, var(--visity-navy) 0%, var(--visity-blue) 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(0, 145, 213, 0.3)'
                } : {
                  color: 'var(--visity-text-secondary)'
                }}
                onMouseEnter={(e) => {
                  if (currentPageName !== item.page) {
                    e.currentTarget.style.backgroundColor = darkMode ? 'rgba(0, 145, 213, 0.1)' : 'rgba(0, 145, 213, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPageName !== item.page) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && item.name}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--visity-border)' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              collapsed && "justify-center px-2"
            )}
            style={{ color: 'var(--visity-text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = darkMode ? 'rgba(0, 145, 213, 0.1)' : 'rgba(0, 145, 213, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                Recolher
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "lg:pl-20" : "lg:pl-72"
      )}>
        {/* Top Header */}
        <header className="hidden lg:flex sticky top-0 z-30 h-16 backdrop-blur-xl border-b items-center justify-between px-6" style={{
          backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: 'var(--visity-border)'
        }}>
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Buscar visitas, clientes, técnicos..." 
                className="pl-10 border-0"
                style={{
                  backgroundColor: darkMode ? 'var(--visity-bg-card)' : 'var(--visity-bg-secondary)',
                  color: 'var(--visity-text)'
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              style={{ color: 'var(--visity-text-secondary)' }}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            <Button variant="ghost" size="icon" className="relative" style={{ color: 'var(--visity-text-secondary)' }}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center font-medium" style={{
                backgroundColor: 'var(--visity-green)'
              }}>
                3
              </span>
            </Button>

            <div className="w-px h-8 mx-2" style={{ backgroundColor: 'var(--visity-border)' }} />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = darkMode ? 'rgba(0, 145, 213, 0.1)' : 'rgba(0, 145, 213, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}>
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-white text-sm font-medium" style={{
                      background: 'linear-gradient(135deg, var(--visity-navy) 0%, var(--visity-blue) 100%)'
                    }}>
                      {getInitials(user?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium" style={{ color: 'var(--visity-text)' }}>
                      {user?.full_name || 'Usuário'}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--visity-text-secondary)' }}>
                      {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={createPageUrl('Profile')} className="flex items-center gap-2 cursor-pointer">
                    <UserCircle className="w-4 h-4" />
                    Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={createPageUrl('Settings')} className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Configurações
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6 pt-20 lg:pt-6 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}