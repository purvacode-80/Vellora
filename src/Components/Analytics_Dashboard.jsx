import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, TrendingUp, Users, DollarSign, Calendar, Target, AlertCircle, RefreshCw } from 'lucide-react';
import '../css/Analytics_Dashboard.css';

const Analytics_Dashboard = () => {
  const [data, setData] = useState({
    summary: null,
    advanced: null,
    recentActivities: null,
    loading: true,
    error: null
  });

  const [timeFilter, setTimeFilter] = useState(30);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Base URL for your backend
  const API_BASE = 'http://localhost:8000'; // Update this to match your server URL
  const token = localStorage.getItem("token");
  
  const fetchData = async () => {
    setData(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const [summaryRes, advancedRes, activitiesRes] = await Promise.all([
        fetch(`${API_BASE}/analytics/summary?days=${timeFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ),
        fetch(`${API_BASE}/analytics/advanced`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ),
        fetch(`${API_BASE}/analytics/recent-activities`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      ]);

      if (!summaryRes.ok || !advancedRes.ok || !activitiesRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const [summary, advanced, recentActivities] = await Promise.all([
        summaryRes.json(),
        advancedRes.json(),
        activitiesRes.json()
      ]);

      setData({
        summary,
        advanced,
        recentActivities,
        loading: false,
        error: null
      });
      setLastUpdated(new Date());
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  const {
    weeklyTrends = [],
  } = data.advanced || {};

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [timeFilter]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    const colors = {
      'New': '#3B82F6',
      'In Progress': '#F59E0B',
      'Qualified': '#10B981',
      'Converted': '#059669',
      'Closed': '#6B7280',
      'Active': '#10B981',
      'Inactive': '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const pieColors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16'];

  if (data.loading && !data.summary) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary mb-4" style={{animation: 'spin 1s linear infinite'}} />
          <p className="text-muted">Loading Analytics dashboard data...</p>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="text-center p-4 bg-white rounded shadow-sm" style={{maxWidth: '400px'}}>
          <AlertCircle className="w-12 h-12 text-danger mx-auto mb-3" />
          <h2 className="h4 text-dark mb-2">Connection Error</h2>
          <p className="text-muted mb-3">{data.error}</p>
          <p className="small text-muted mb-3">Make sure your backend server is running on port 8000</p>
          <button
            onClick={fetchData}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { summary, advanced, recentActivities } = data;

  // Prepare chart data
  const monthlyTrends = advanced?.monthlyTrends?.map(item => ({
    name: `${item._id.month}/${item._id.year}`,
    leads: item.leads,
    converted: item.converted,
    revenue: item.revenue,
    conversionRate: ((item.converted / item.leads) * 100).toFixed(1)
  })) || [];

  const sourceData = advanced?.sourceAnalysis?.map(item => ({
    name: item._id || 'Unknown',
    value: item.count,
    converted: item.converted,
    conversionRate: (item.conversionRate * 100).toFixed(1)
  })) || [];

  const statusData = advanced?.statusDistribution?.map(item => ({
    name: item._id,
    value: item.count
  })) || [];

  const industryData = advanced?.industryPerformance?.map(item => ({
    name: item._id,
    leads: item.leads,
    converted: item.converted,
    revenue: item.totalRevenue,
    conversionRate: item.conversionRate?.toFixed(1) || '0'
  })) || [];

  return (
    <div className="min-vh-100 dashboard-container">
      {/* Header */}
      <div className="bg-white shadow-sm border-bottom">
        <div className="container-fluid" style={{maxWidth: '1200px'}}>
          <div className="d-flex justify-content-between align-items-center py-4 dashboard-header">
            <div>
              <h1 className="h2 fw-bold mb-1 title">Analytics Dashboard</h1>
              <p className="text-muted mb-0">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(Number(e.target.value))}
                className="form-select"
                style={{width: 'auto'}}
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={365}>Last year</option>
              </select>
              <button
                onClick={fetchData}
                disabled={data.loading}
                className="btn btn-primary d-flex align-items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${data.loading ? 'spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid py-4">
        {/* Summary Cards */}
        <div className="bg-white rounded shadow-sm border mb-4 summary-grid">
          <div className="my-2 py-3 summary-card purple-border text-center">
              <div className="bg-primary bg-opacity-10 icon-circle">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="big fw-medium mb-1">Total Leads</p>
                <p className="h2 fw-bold mb-1">{summary?.leads?.total || 0}</p>
                <p className="small mb-0">+{summary?.leads?.recent || 0} this period</p>
              </div>
          </div>

          <div className="my-2 py-3 summary-card purple-border text-center">
              <div className="bg-success bg-opacity-10 icon-circle">
                <Target className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="big fw-medium mb-1">Converted Leads</p>
                <p className="h2 fw-bold mb-1">{summary?.leads?.converted || 0}</p>
                <p className="small mb-0">
                  {summary?.leads?.total ? ((summary.leads.converted / summary.leads.total) * 100).toFixed(1) : 0}% conversion rate
                </p>
              </div>
          </div>

          <div className="my-2 py-3 summary-card purple-border text-center">
              <div className="bg-warning bg-opacity-10 icon-circle">
                <DollarSign className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="big fw-medium mb-1">Total Revenue</p>
                <p className="h2 fw-bold mb-1">{formatCurrency(summary?.leads?.revenue || 0)}</p>
                <p className="small mb-0">From converted leads</p>
              </div>
          </div>

          <div className="my-2 py-3 summary-card purple-border text-center">
              <div className="bg-info bg-opacity-10 icon-circle">
                <Activity className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="big fw-medium mb-1">Total Contacts</p>
                <p className="h2 fw-bold mb-1">{summary?.contacts?.total || 0}</p>
                <p className="small mb-0">{summary?.contacts?.active || 0} active</p>
              </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="row g-4 mb-4">
          {/* Weekly Trends */}
          <div className="col-lg-6">
            <div className="bg-white rounded shadow-sm p-4 border h-100">
              <h3 className="h5 fw-semibold text-dark mb-3 text-center">Weekly Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => `${label}`}
                    formatter={(value, name) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                  />
                  <Legend/>
                  <Line 
                    type="monotone" 
                    dataKey="leads" 
                    stroke="#6a31b4" 
                    strokeWidth={2}
                    name="Leads"
                    dot={{ fill: '#6a31b4', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="converted" 
                    stroke="#c6a8f8" 
                    strokeWidth={2}
                    name="Converted"
                    dot={{ fill: '#c6a8f8', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="contacts" 
                    stroke="#28a745" 
                    strokeWidth={2}
                    name="Contacts"
                    dot={{ fill: '#28a745', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lead Sources */}
          <div className="col-lg-6">
            <div className="bg-white rounded shadow-sm p-4 border h-100">
              <h3 className="h5 fw-semibold text-dark mb-3 text-center">Lead Sources</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Status Distribution */}
          <div className="col-lg-6">
            <div className="bg-white rounded shadow-sm p-4 border h-100">
              <h3 className="h5 fw-semibold text-dark mb-3 text-center">Lead Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8a3ddb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Industry Performance */}
          <div className="col-lg-6">
            <div className="bg-white rounded shadow-sm p-4 border h-100">
              <h3 className="h5 fw-semibold text-dark mb-3 text-center">Industry Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={industryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="leads" fill="#6a31b4" />
                  <Bar dataKey="converted" fill="#c6a8f8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="bg-white rounded shadow-sm p-4 border h-100">
              <h3 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center">
                <TrendingUp className="w-5 h-5 me-2 text-primary" />
                Recent Leads
              </h3>
              <div className="d-flex flex-column gap-3">
                {recentActivities?.recentLeads?.map((lead, index) => (
                  <div key={index} className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                    <div>
                      <p className="fw-medium text-dark mb-1">{lead.companyName || lead.fullName}</p>
                      <p className="small text-muted mb-0">{lead.leadSource} • {formatDate(lead.createdAt)}</p>
                    </div>
                    <span
                      className="badge text-white"
                      style={{ backgroundColor: getStatusColor(lead.status) }}
                    >
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bg-white rounded shadow-sm p-4 border h-100">
              <h3 className="h5 fw-semibold text-dark mb-3 d-flex align-items-center">
                <Users className="w-5 h-5 me-2 text-success" />
                Recent Contacts
              </h3>
              <div className="d-flex flex-column gap-3">
                {recentActivities?.recentContacts?.map((contact, index) => (
                  <div key={index} className="d-flex align-items-center justify-content-between p-3 bg-light rounded">
                    <div>
                      <p className="fw-medium text-dark mb-1">{contact.fullName}</p>
                      <p className="small text-muted mb-0">{contact.company} • {formatDate(contact.createdAt)}</p>
                    </div>
                    <span
                      className="badge text-white"
                      style={{ backgroundColor: getStatusColor(contact.status) }}
                    >
                      {contact.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics_Dashboard;