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
      case 'low': return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'medium': return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      case 'critical': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'reviewed': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'resolved': return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'dismissed': return 'bg-muted text-muted-foreground border-muted';
      default: return 'bg-muted text-muted-foreground border-muted';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'harassment': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      case 'bullying': return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      case 'spam': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      case 'abusive': return 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20';
      default: return 'bg-muted text-muted-foreground border-muted';
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Abuse Report Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor and manage user reports across the platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.critical}</p>
              </div>
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users, emails, or descriptions..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground placeholder:text-muted-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <select
              className="px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
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
              className="px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
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
              className="px-4 py-2 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent text-foreground"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
            
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('username')}
                  >
                    User Details
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('reportType')}
                  >
                    Report Type
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('severity')}
                  >
                    Severity
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </th>
                  <th 
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('reportedDate')}
                  >
                    Reported Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Evidence
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredData.map((report) => (
                  <React.Fragment key={report.id}>
                    <tr className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-foreground">{report.username}</div>
                          <div className="text-sm text-muted-foreground">{report.email}</div>
                          <div className="text-xs text-muted-foreground">Reported by: {report.reportedBy}</div>
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
                      <td className="px-6 py-4 text-sm text-foreground">
                        {new Date(report.reportedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{report.evidenceCount}</span>
                          <span className="text-xs text-muted-foreground">items</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setShowDetails(showDetails === report.id ? null : report.id)}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {showDetails === report.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>
                    {showDetails === report.id && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-muted/20">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Description</h4>
                              <p className="text-sm text-muted-foreground">{report.description}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Action Taken</h4>
                              <p className="text-sm text-muted-foreground">{report.actionTaken}</p>
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground mb-2">Last Updated</h4>
                              <p className="text-sm text-muted-foreground">{new Date(report.lastUpdated).toLocaleDateString()}</p>
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
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;