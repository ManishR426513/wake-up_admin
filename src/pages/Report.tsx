import React, { useState, useMemo } from 'react';
import { Search, Filter, AlertTriangle, Shield, MessageSquare, Flag, Eye, EyeOff, Download, RefreshCw } from 'lucide-react';

interface UserReport {
  id: string;
  username: string;
  email: string;
  reportedDate: string;
  reportType: 'harassment' | 'bullying' | 'spam' | 'abusive';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  reportedBy: string;
  description: string;
  evidenceCount: number;
  actionTaken: string;
  lastUpdated: string;
}

const mockData: UserReport[] = [
  {
    id: '1',
    username: 'user123',
    email: 'user123@example.com',
    reportedDate: '2024-06-15',
    reportType: 'harassment',
    severity: 'high',
    status: 'pending',
    reportedBy: 'moderator1',
    description: 'Repeated unwanted messages and threats',
    evidenceCount: 5,
    actionTaken: 'Under investigation',
    lastUpdated: '2024-06-20'
  },
  {
    id: '2',
    username: 'toxicUser99',
    email: 'toxic@example.com',
    reportedDate: '2024-06-14',
    reportType: 'bullying',
    severity: 'critical',
    status: 'reviewed',
    reportedBy: 'user456',
    description: 'Persistent cyberbullying and doxxing attempts',
    evidenceCount: 12,
    actionTaken: 'Account suspended',
    lastUpdated: '2024-06-19'
  },
  {
    id: '3',
    username: 'spamBot2024',
    email: 'spam@example.com',
    reportedDate: '2024-06-13',
    reportType: 'spam',
    severity: 'medium',
    status: 'resolved',
    reportedBy: 'autoModerator',
    description: 'Automated spam messages across multiple channels',
    evidenceCount: 25,
    actionTaken: 'Account banned',
    lastUpdated: '2024-06-18'
  },
  {
    id: '4',
    username: 'abusiveUser2024',
    email: 'abusive@example.com',
    reportedDate: '2024-06-12',
    reportType: 'abusive',
    severity: 'high',
    status: 'dismissed',
    reportedBy: 'user789',
    description: 'Hate speech and discriminatory language',
    evidenceCount: 8,
    actionTaken: 'Warning issued',
    lastUpdated: '2024-06-17'
  },
  {
    id: '5',
    username: 'harasser456',
    email: 'harass@example.com',
    reportedDate: '2024-06-11',
    reportType: 'harassment',
    severity: 'medium',
    status: 'resolved',
    reportedBy: 'user101',
    description: 'Inappropriate comments and stalking behavior',
    evidenceCount: 3,
    actionTaken: 'Account restricted',
    lastUpdated: '2024-06-16'
  },
  {
    id: '6',
    username: 'bully123',
    email: 'bully@example.com',
    reportedDate: '2024-06-10',
    reportType: 'bullying',
    severity: 'low',
    status: 'pending',
    reportedBy: 'user202',
    description: 'Minor intimidation and name-calling',
    evidenceCount: 2,
    actionTaken: 'Pending review',
    lastUpdated: '2024-06-15'
  }
];

const Report: React.FC = () => {
  const [data, setData] = useState<UserReport[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('reportedDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || item.reportType === filterType;
      const matchesSeverity = filterSeverity === 'all' || item.severity === filterSeverity;
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      
      return matchesSearch && matchesType && matchesSeverity && matchesStatus;
    }).sort((a, b) => {
      const aValue = a[sortBy as keyof UserReport];
      const bValue = b[sortBy as keyof UserReport];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, searchTerm, filterType, filterSeverity, filterStatus, sortBy, sortOrder]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'harassment': return <AlertTriangle className="w-4 h-4" />;
      case 'bullying': return <Shield className="w-4 h-4" />;
      case 'spam': return <MessageSquare className="w-4 h-4" />;
      case 'abusive': return <Flag className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'reviewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'dismissed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'harassment': return 'bg-red-100 text-red-800 border-red-200';
      case 'bullying': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'spam': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'abusive': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const stats = useMemo(() => {
    const total = filteredData.length;
    const pending = filteredData.filter(item => item.status === 'pending').length;
    const resolved = filteredData.filter(item => item.status === 'resolved').length;
    const critical = filteredData.filter(item => item.severity === 'critical').length;
    
    return { total, pending, resolved, critical };
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
             Abuse Report Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Monitor and manage user  reports across the platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users, emails, or descriptions..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="harassment">Harassment</option>
              <option value="bullying">Bullying</option>
              <option value="spam">Spam</option>
              <option value="abusive">Abusive</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div> */}

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('username')}
                  >
                    User Details
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('reportType')}
                  >
                    Report Type
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('severity')}
                  >
                    Severity
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('reportedDate')}
                  >
                    Reported Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evidence
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((report) => (
                  <React.Fragment key={report.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">{report.username}</div>
                          <div className="text-sm text-gray-500">{report.email}</div>
                          <div className="text-xs text-gray-400">Reported by: {report.reportedBy}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(report.reportType)}`}>
                            {getTypeIcon(report.reportType)}
                            {report.reportType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}>
                          {report.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(report.reportedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{report.evidenceCount}</span>
                          <span className="text-xs text-gray-500">items</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setShowDetails(showDetails === report.id ? null : report.id)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          {showDetails === report.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                    {showDetails === report.id && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                              <p className="text-sm text-gray-700">{report.description}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Action Taken</h4>
                              <p className="text-sm text-gray-700">{report.actionTaken}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Last Updated</h4>
                              <p className="text-sm text-gray-700">{new Date(report.lastUpdated).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;