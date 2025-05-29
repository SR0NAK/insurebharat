
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Users, Clock, TrendingUp, AlertCircle, Plus, Upload } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Index = () => {
  const navigate = useNavigate();

  const upcomingRenewals = [
    { id: 1, customer: "Amit Kumar", policy: "AUTO-2024-001", expires: "15/06/2024", premium: 95000, priority: "high" },
    { id: 2, customer: "Priya Sharma", policy: "AUTO-2024-002", expires: "18/06/2024", premium: 78000, priority: "medium" },
    { id: 3, customer: "Rohit Singh", policy: "AUTO-2024-003", expires: "22/06/2024", premium: 125000, priority: "high" },
    { id: 4, customer: "Sunita Patel", policy: "AUTO-2024-004", expires: "25/06/2024", premium: 65000, priority: "low" },
  ];

  const recentActivities = [
    { id: 1, type: "scan", description: "New policy document scanned for Vikram Gupta", time: "2 hours ago" },
    { id: 2, type: "renewal", description: "Renewal reminder sent to Priya Sharma", time: "4 hours ago" },
    { id: 3, type: "customer", description: "New customer Anjali Mehta added", time: "6 hours ago" },
    { id: 4, type: "policy", description: "Policy updated for Ravi Kumar", time: "1 day ago" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main content with proper spacing for sidebar */}
      <div className="lg:ml-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">InsureBharat CRM Dashboard</h1>
          <p className="text-gray-600">Manage your policies, customers, and renewals efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Total Policies</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">2,847</div>
              <p className="text-xs text-blue-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Active Customers</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">1,423</div>
              <p className="text-xs text-green-600">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Renewals Due</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">84</div>
              <p className="text-xs text-orange-600">Next 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">₹15,24,750</div>
              <p className="text-xs text-purple-600">+18% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Renewals */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    Upcoming Renewals
                  </CardTitle>
                  <CardDescription>Policies expiring in the next 30 days</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/renewals')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingRenewals.map((renewal) => (
                  <div key={renewal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{renewal.customer}</h4>
                        <Badge className={`text-xs ${getPriorityColor(renewal.priority)}`}>
                          {renewal.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{renewal.policy}</p>
                      <p className="text-sm text-gray-500">Expires: {renewal.expires}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">₹{(renewal.premium / 100).toLocaleString('en-IN')}</p>
                      <Button size="sm" className="mt-2">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/scan')}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Scan Policy Document
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/customers')}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Customer
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/renewals')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  View Renewals
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/analytics')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
