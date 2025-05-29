
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  DollarSign,
  Download,
  Filter,
  Calendar
} from "lucide-react";
import Navigation from '@/components/Navigation';

const Analytics = () => {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 65000, policies: 45 },
    { month: 'Feb', revenue: 72000, policies: 52 },
    { month: 'Mar', revenue: 68000, policies: 48 },
    { month: 'Apr', revenue: 78000, policies: 58 },
    { month: 'May', revenue: 89247, policies: 67 },
    { month: 'Jun', revenue: 0, policies: 0 }
  ];

  const customerRetention = [
    { month: 'Jan', retained: 92, new: 15, lost: 8 },
    { month: 'Feb', retained: 88, new: 22, lost: 12 },
    { month: 'Mar', retained: 95, new: 18, lost: 5 },
    { month: 'Apr', retained: 87, new: 28, lost: 13 },
    { month: 'May', retained: 91, new: 24, lost: 9 }
  ];

  const policyTypes = [
    { name: 'Comprehensive', value: 45, color: '#3B82F6' },
    { name: 'Third Party', value: 30, color: '#10B981' },
    { name: 'Third Party Fire & Theft', value: 25, color: '#F59E0B' }
  ];

  const agentPerformance = [
    { name: 'John Doe', policies: 67, revenue: 89247, retention: 91 },
    { name: 'Sarah Smith', policies: 54, revenue: 72000, retention: 88 },
    { name: 'Mike Johnson', policies: 48, revenue: 65000, retention: 92 },
    { name: 'Lisa Wilson', policies: 39, revenue: 52000, retention: 85 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="lg:pl-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track performance, revenue, and customer insights</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$372,247</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Policy Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,248</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
              <CardDescription>Revenue and policy count over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue' : 'Policies'
                  ]} />
                  <Bar dataKey="revenue" fill="#3B82F6" name="revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Customer Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Retention Trends</CardTitle>
              <CardDescription>Customer retention, acquisition, and churn</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={customerRetention}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="retained" stroke="#10B981" strokeWidth={2} name="Retained" />
                  <Line type="monotone" dataKey="new" stroke="#3B82F6" strokeWidth={2} name="New" />
                  <Line type="monotone" dataKey="lost" stroke="#EF4444" strokeWidth={2} name="Lost" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Policy Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Policy Type Distribution</CardTitle>
              <CardDescription>Breakdown by policy types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={policyTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {policyTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {policyTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: type.color }}
                      ></div>
                      <span className="text-sm">{type.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{type.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Agent Performance */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Top performing agents this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformance.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{agent.name}</h4>
                          <p className="text-sm text-gray-600">{agent.policies} policies sold</p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-semibold text-green-600">
                          ${agent.revenue.toLocaleString()}
                        </div>
                        <Badge 
                          className={`text-xs ${
                            agent.retention >= 90 
                              ? 'bg-green-100 text-green-800' 
                              : agent.retention >= 85 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {agent.retention}% retention
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
