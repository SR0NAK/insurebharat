
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  BarChart3, 
  Camera, 
  Settings,
  Menu,
  Bell,
  Search
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: FileText, label: "Policies", path: "/policies" },
    { icon: Camera, label: "Scan Document", path: "/scan" },
    { icon: Calendar, label: "Renewals", path: "/renewals" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-blue-900">InsureCRM</h2>
        <p className="text-sm text-gray-600">Vehicle Insurance Broker</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Button
              key={item.path}
              variant={active ? "default" : "ghost"}
              className={`w-full justify-start ${
                active 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
              {item.label === "Renewals" && (
                <Badge className="ml-auto bg-orange-100 text-orange-800 text-xs">
                  84
                </Badge>
              )}
            </Button>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Senior Agent</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-gray-200">
        <NavigationContent />
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <NavigationContent />
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-semibold text-blue-900">InsureCRM</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block lg:pl-64">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search customers, policies..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Senior Agent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
