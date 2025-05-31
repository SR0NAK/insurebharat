
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  BarChart3, 
  TrendingUp, 
  Settings, 
  Shield,
  Building,
  Activity,
  DollarSign,
  FileText
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '@/components/AdminNavigation';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Brokers",
      value: "147",
      change: "+12%",
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Policies", 
      value: "28,470",
      change: "+18%",
      icon: FileText,
      color: "green"
    },
    {
      title: "Monthly Revenue",
      value: "₹45,67,890",
      change: "+25%",
      icon: DollarSign,
      color: "purple"
    },
    {
      title: "System Health",
      value: "99.9%",
      change: "Excellent",
      icon: Activity,
      color: "emerald"
    }
  ];

  const recentBrokers = [
    { id: 1, name: "Rajesh Kumar", company: "Kumar Insurance Services", status: "active", joinDate: "15/05/2024", policies: 234 },
    { id: 2, name: "Priya Sharma", company: "Sharma & Associates", status: "pending", joinDate: "12/05/2024", policies: 0 },
    { id: 3, name: "Amit Patel", company: "Patel Insurance Agency", status: "active", joinDate: "10/05/2024", policies: 156 },
    { id: 4, name: "Sunita Reddy", company: "Reddy Insurance Solutions", status: "active", joinDate: "08/05/2024", policies: 89 }
  ];

  const systemAlerts = [
    { id: 1, type: "warning", message: "Server maintenance scheduled for tonight at 2 AM", time: "1 hour ago" },
    { id: 2, type: "info", message: "New broker approval pending review", time: "3 hours ago" },
    { id: 3, type: "success", message: "Monthly backup completed successfully", time: "6 hours ago" },
    { id: 4, type: "warning", message: "High API usage detected for Mumbai region", time: "1 day ago" }
  ];

  const getStatColor = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-800 border-blue-200",
      green: "bg-green-50 text-green-800 border-green-200", 
      purple: "bg-purple-50 text-purple-800 border-purple-200",
      emerald: "bg-emerald-50 text-emerald-800 border-emerald-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-l-yellow-400';
      case 'info': return 'bg-blue-50 border-l-blue-400';
      case 'success': return 'bg-green-50 border-l-green-400';
      case 'error': return 'bg-red-50 border-l-red-400';
      default: return 'bg-gray-50 border-l-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavigation />
      
      <div className="lg:ml-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your InsureBharat platform and monitor system performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={getStatColor(stat.color)}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Brokers */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    Recent Broker Applications
                  </CardTitle>
                  <CardDescription>Latest broker registrations and applications</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/admin/brokers')}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentBrokers.map((broker) => (
                  <div key={broker.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{broker.name}</h4>
                        <Badge className={`text-xs ${getStatusColor(broker.status)}`}>
                          {broker.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{broker.company}</p>
                      <p className="text-sm text-gray-500">Joined: {broker.joinDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{broker.policies}</p>
                      <p className="text-sm text-gray-500">Policies</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        {broker.status === 'pending' && (
                          <Button size="sm">
                            Approve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & System Alerts */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/brokers/new')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Broker
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/analytics')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/admin/security')}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security Center
                </Button>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className={`p-3 border-l-4 rounded ${getAlertColor(alert.type)}`}>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Platform Performance Overview
              </CardTitle>
              <CardDescription>Key metrics and system performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">98.7%</div>
                  <p className="text-sm text-gray-600">System Uptime</p>
                  <p className="text-xs text-green-600">↑ 0.2% from last month</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">147ms</div>
                  <p className="text-sm text-gray-600">Avg Response Time</p>
                  <p className="text-xs text-green-600">↓ 23ms improvement</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">2.1M</div>
                  <p className="text-sm text-gray-600">API Calls Today</p>
                  <p className="text-xs text-green-600">↑ 15% from yesterday</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
