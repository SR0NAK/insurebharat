
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  Calendar,
  Edit,
  Eye
} from "lucide-react";
import Navigation from '@/components/Navigation';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, Springfield, IL 62701",
      policies: 2,
      totalPremium: 2450,
      lastContact: "2024-05-28",
      status: "active",
      avatar: "JS"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, Chicago, IL 60601",
      policies: 1,
      totalPremium: 980,
      lastContact: "2024-05-25",
      status: "active",
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "(555) 345-6789",
      address: "789 Pine Rd, Naperville, IL 60540",
      policies: 3,
      totalPremium: 3200,
      lastContact: "2024-05-20",
      status: "pending",
      avatar: "MC"
    },
    {
      id: 4,
      name: "Lisa Wilson",
      email: "lisa.wilson@email.com",
      phone: "(555) 456-7890",
      address: "321 Elm St, Peoria, IL 61601",
      policies: 1,
      totalPremium: 750,
      lastContact: "2024-05-15",
      status: "inactive",
      avatar: "LW"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.b@email.com",
      phone: "(555) 567-8901",
      address: "654 Maple Dr, Rockford, IL 61101",
      policies: 2,
      totalPremium: 1850,
      lastContact: "2024-05-22",
      status: "active",
      avatar: "DB"
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "(555) 678-9012",
      address: "987 Cedar Ln, Aurora, IL 60502",
      policies: 1,
      totalPremium: 1120,
      lastContact: "2024-05-18",
      status: "active",
      avatar: "ED"
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="lg:pl-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600">Manage your customer database and relationships</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Customer
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All Status</Button>
                <Button variant="outline">Sort by Name</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{customer.avatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{customer.name}</CardTitle>
                      <Badge className={`text-xs ${getStatusColor(customer.status)}`}>
                        {customer.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {customer.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {customer.phone}
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                    {customer.address}
                  </div>
                </div>

                {/* Policy Info */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Policies</span>
                    <Badge variant="outline">{customer.policies}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Premium</span>
                    <span className="font-semibold text-green-600">${customer.totalPremium}</span>
                  </div>
                </div>

                {/* Last Contact */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Contact:</span>
                  <span className="text-gray-900">{customer.lastContact}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <FileText className="h-4 w-4 mr-1" />
                    Policies
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{customers.length}</div>
              <div className="text-sm text-gray-600">Total Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {customers.filter(c => c.status === 'active').length}
              </div>
              <div className="text-sm text-gray-600">Active Customers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {customers.reduce((sum, c) => sum + c.policies, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Policies</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                ${customers.reduce((sum, c) => sum + c.totalPremium, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Premium</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customers;
