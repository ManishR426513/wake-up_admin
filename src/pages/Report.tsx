import React, { useState, useMemo, useEffect } from 'react';
import { AlertTriangle, Shield, MessageSquare, Flag, Eye, RefreshCw } from 'lucide-react';
import { authAxios } from '@/config/config';
import { handleProfileImage } from '@/helper/helper';

interface UserReport {
  _id: string;
  userId: {
    _id: string;
    fullname: string;
    username: string;
    phoneno: number;
    countryCode: number;
    email: string;
    profilePic: string;
    bio: string;
  };
  reportType: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  feedId: {
    _id: string;
    userId: string;
    title: string;
    media: string;
    thumbnail: string;
    mediaType: string;
    category: string;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    views: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Report: React.FC = () => {
  const [data, setData] = useState<UserReport[]>([]);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortBy === 'username') {
        aValue = a.userId.username;
        bValue = b.userId.username;
      } else {
        aValue = a[sortBy as keyof UserReport];
        bValue = b[sortBy as keyof UserReport];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [data, sortBy, sortOrder]);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'harassment': return <AlertTriangle className="w-4 h-4" />;
      case 'bullying': return <Shield className="w-4 h-4" />;
      case 'spam': return <MessageSquare className="w-4 h-4" />;
      case 'false information': return <Flag className="w-4 h-4" />;
      default: return <Flag className="w-4 h-4" />;
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
    switch (type.toLowerCase()) {
      case 'harassment': return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20';
      case 'bullying': return 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20';
      case 'spam': return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20';
      case 'false information': return 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/20';
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

  const getReports = async () => {
    try {
      setLoading(true);
      const response = await authAxios().get(`/auth/report`);
      console.log("Reports data:", response.data.data);
      setData(response.data.data || []);
    } catch (error) {
      console.log("Error fetching reports:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  const stats = useMemo(() => {
    const total = data.length;
    const pending = data.filter(item => item.status === 'pending').length;
    const resolved = data.filter(item => item.status === 'resolved').length;
    const reviewed = data.filter(item => item.status === 'reviewed').length;

    return { total, pending, resolved, reviewed };
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span className="text-foreground">Loading reports...</span>
        </div>
      </div>
    );
  }

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
                <p className="text-sm font-medium text-muted-foreground">Reviewed</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.reviewed}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
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
                    Username
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('reportType')}
                  >
                    Report Type
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('reportType')}
                  >
                    Content
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </th>
                  <th
                    className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handleSort('createdAt')}
                  >
                    Reported Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sortedData.map((report) => (
                  <tr key={report._id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-foreground">@{report.userId.username}</div>
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
                      <img src={handleProfileImage(report?.feedId?.thumbnail)} className="h-20 w-20 rounded-[10px]" />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {sortedData.length === 0 && !loading && (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No reports found</h3>
              <p className="text-muted-foreground">No user reports available at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;