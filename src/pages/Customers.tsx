
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
      name: "Rahul Verma",
      email: "rahul.verma@email.com",
      phone: "+91 98765 43210",
      address: "123 MG Road, Mumbai, Maharashtra 400001",
      policies: 2,
      totalPremium: 245000,
      lastContact: "28/05/2024",
      status: "active",
      avatar: "RV"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 87654 32109",
      address: "456 CP Road, Delhi, Delhi 110001",
      policies: 1,
      totalPremium: 98000,
      lastContact: "25/05/2024",
      status: "active",
      avatar: "PS"
    },
    {
      id: 3,
      name: "Arjun Patel",
      email: "arjun.patel@email.com",
      phone: "+91 76543 21098",
      address: "789 SG Highway, Ahmedabad, Gujarat 380001",
      policies: 3,
      totalPremium: 320000,
      lastContact: "20/05/2024",
      status: "pending",
      avatar: "AP"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 65432 10987",
      address: "321 Brigade Road, Bangalore, Karnataka 560001",
      policies: 1,
      totalPremium: 75000,
      lastContact: "15/05/2024",
      status: "inactive",
      avatar: "SR"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 54321 09876",
      address: "654 Park Street, Kolkata, West Bengal 700001",
      policies: 2,
      totalPremium: 185000,
      lastContact: "22/05/2024",
      status: "active",
      avatar: "VS"
    },
    {
      id: 6,
      name: "Anita Gupta",
      email: "anita.gupta@email.com",
      phone: "+91 43210 98765",
      address: "987 Civil Lines, Jaipur, Rajasthan 302001",
      policies: 1,
      totalPremium: 112000,
      lastContact: "18/05/2024",
      status: "active",
      avatar: "AG"
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
      
      <div className="lg:ml-64 p-6">
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
                    <span className="font-semibold text-green-600">₹{(customer.totalPremium / 100).toLocaleString('en-IN')}</span>
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
                ₹{(customers.reduce((sum, c) => sum + c.totalPremium, 0) / 100).toLocaleString('en-IN')}
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
