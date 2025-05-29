
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, dateFns } from "react-day-picker";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Phone, 
  Mail, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter
} from "lucide-react";
import Navigation from '@/components/Navigation';
import { cn } from "@/lib/utils";

const Renewals = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const renewals = [
    {
      id: 1,
      customer: "John Smith",
      policy: "AUTO-2024-001",
      expires: new Date("2024-06-15"),
      premium: 1250,
      priority: "high",
      status: "pending",
      daysLeft: 17,
      contactAttempts: 0,
      lastContact: null,
      vehicleInfo: "2022 Toyota Camry"
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      policy: "AUTO-2024-002",
      expires: new Date("2024-06-18"),
      premium: 980,
      priority: "medium",
      status: "contacted",
      daysLeft: 20,
      contactAttempts: 2,
      lastContact: "2024-05-25",
      vehicleInfo: "2021 Honda Civic"
    },
    {
      id: 3,
      customer: "Mike Chen",
      policy: "AUTO-2024-003",
      expires: new Date("2024-06-22"),
      premium: 1450,
      priority: "high",
      status: "pending",
      daysLeft: 24,
      contactAttempts: 1,
      lastContact: "2024-05-20",
      vehicleInfo: "2023 BMW X5"
    },
    {
      id: 4,
      customer: "Lisa Wilson",
      policy: "AUTO-2024-004",
      expires: new Date("2024-06-25"),
      premium: 750,
      priority: "low",
      status: "renewed",
      daysLeft: 27,
      contactAttempts: 1,
      lastContact: "2024-05-22",
      vehicleInfo: "2020 Ford Focus"
    },
    {
      id: 5,
      customer: "David Brown",
      policy: "AUTO-2024-005",
      expires: new Date("2024-07-02"),
      premium: 1850,
      priority: "high",
      status: "pending",
      daysLeft: 34,
      contactAttempts: 0,
      lastContact: null,
      vehicleInfo: "2023 Mercedes C-Class"
    },
    {
      id: 6,
      customer: "Emily Davis",
      policy: "AUTO-2024-006",
      expires: new Date("2024-07-08"),
      premium: 1120,
      priority: "medium",
      status: "declined",
      daysLeft: 40,
      contactAttempts: 3,
      lastContact: "2024-05-18",
      vehicleInfo: "2021 Nissan Altima"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'renewed': return 'bg-green-100 text-green-800 border-green-200';
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'renewed': return <CheckCircle className="h-4 w-4" />;
      case 'contacted': return <Phone className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'declined': return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const urgentRenewals = renewals.filter(r => r.daysLeft <= 30);
  const totalPremiumAtRisk = urgentRenewals.reduce((sum, r) => sum + r.premium, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="lg:pl-64 p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Renewal Management</h1>
              <p className="text-gray-600">Track and manage policy renewals</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                List View
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'outline'}
                onClick={() => setViewMode('calendar')}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Urgent Renewals</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{urgentRenewals.length}</div>
              <p className="text-xs text-orange-600">Next 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Premium at Risk</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">${totalPremiumAtRisk.toLocaleString()}</div>
              <p className="text-xs text-blue-600">Potential loss</p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Renewed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">
                {renewals.filter(r => r.status === 'renewed').length}
              </div>
              <p className="text-xs text-green-600">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Retention Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">89%</div>
              <p className="text-xs text-purple-600">Last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {renewals.map((renewal) => (
              <Card key={renewal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Customer Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{renewal.customer}</h3>
                        <Badge className={getPriorityColor(renewal.priority)}>
                          {renewal.priority} priority
                        </Badge>
                        <Badge className={getStatusColor(renewal.status)}>
                          {getStatusIcon(renewal.status)}
                          <span className="ml-1">{renewal.status}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Policy: {renewal.policy}</p>
                        <p>Vehicle: {renewal.vehicleInfo}</p>
                        <p>Premium: <span className="font-semibold text-green-600">${renewal.premium}</span></p>
                      </div>
                    </div>

                    {/* Expiry Info */}
                    <div className="text-center lg:text-right">
                      <div className={`text-lg font-bold mb-1 ${
                        renewal.daysLeft <= 7 ? 'text-red-600' : 
                        renewal.daysLeft <= 14 ? 'text-orange-600' : 
                        'text-blue-600'
                      }`}>
                        {renewal.daysLeft} days left
                      </div>
                      <div className="text-sm text-gray-600">
                        Expires: {renewal.expires.toLocaleDateString()}
                      </div>
                      {renewal.lastContact && (
                        <div className="text-xs text-gray-500 mt-1">
                          Last contact: {renewal.lastContact}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Renew
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Renewal Calendar</CardTitle>
                  <CardDescription>View renewals by date</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border w-full"
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Today's Renewals</CardTitle>
                  <CardDescription>Policies expiring today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No renewals today</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Renewals;
