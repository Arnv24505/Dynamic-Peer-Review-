import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  Plus, 
  Eye, 
  FileText, 
  Star, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    submittedProjects: [],
    assignedReviews: [],
    reviewsGiven: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'under_review':
        return <Eye className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Projects Submitted',
      value: dashboardData.submittedProjects.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Reviews Assigned',
      value: dashboardData.assignedReviews.length,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Reviews Given',
      value: dashboardData.reviewsGiven.length,
      icon: Star,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Average Rating',
      value: dashboardData.submittedProjects.length > 0 
        ? (dashboardData.submittedProjects.reduce((acc, project) => acc + (project.averageRating || 0), 0) / dashboardData.submittedProjects.length).toFixed(1)
        : '0.0',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user.name}! Here's an overview of your peer review activities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'submitted', label: 'My Projects', icon: FileText },
                { id: 'assigned', label: 'Assigned Reviews', icon: Eye },
                { id: 'given', label: 'Reviews Given', icon: Star }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                  <Link
                    to="/submit-project"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Submit New Project
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Recent Projects */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Recent Projects</h4>
                    {dashboardData.submittedProjects.slice(0, 3).length > 0 ? (
                      <div className="space-y-2">
                        {dashboardData.submittedProjects.slice(0, 3).map((project) => (
                          <Link
                            key={project._id}
                            to={`/project/${project._id}`}
                            className="block p-3 bg-white rounded border hover:shadow-sm transition-shadow duration-200"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-900">{project.title}</p>
                                <p className="text-sm text-gray-600">{project.category}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {project.status}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No projects submitted yet.</p>
                    )}
                  </div>

                  {/* Pending Reviews */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Pending Reviews</h4>
                    {dashboardData.assignedReviews.length > 0 ? (
                      <div className="space-y-2">
                        {dashboardData.assignedReviews.slice(0, 3).map((project) => (
                          <Link
                            key={project._id}
                            to={`/project/${project._id}`}
                            className="block p-3 bg-white rounded border hover:shadow-sm transition-shadow duration-200"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-900">{project.title}</p>
                                <p className="text-sm text-gray-600">By: {project.submitter?.name || 'Anonymous'}</p>
                              </div>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Pending
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">No pending reviews.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Submitted Projects Tab */}
            {activeTab === 'submitted' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">My Submitted Projects</h3>
                  <Link
                    to="/submit-project"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Submit New Project
                  </Link>
                </div>
                
                {dashboardData.submittedProjects.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.submittedProjects.map((project) => (
                      <div key={project._id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{project.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="text-sm text-gray-500">{project.category}</span>
                              <span className="text-sm text-gray-500">
                                {project.reviews?.length || 0} reviews
                              </span>
                              {project.averageRating > 0 && (
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                  <span className="text-sm text-gray-700">{project.averageRating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                              {project.status}
                            </span>
                            <Link
                              to={`/project/${project._id}`}
                              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by submitting your first project for review.</p>
                    <div className="mt-6">
                      <Link
                        to="/submit-project"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Submit Project
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Assigned Reviews Tab */}
            {activeTab === 'assigned' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Projects Assigned for Review</h3>
                
                {dashboardData.assignedReviews.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.assignedReviews.map((project) => (
                      <div key={project._id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{project.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="text-sm text-gray-500">{project.category}</span>
                              <span className="text-sm text-gray-500">
                                By: {project.submitter?.name || 'Anonymous'}
                              </span>
                            </div>
                          </div>
                          <Link
                            to={`/project/${project._id}`}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            Review Now
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Eye className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews assigned</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any projects assigned for review yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Given Tab */}
            {activeTab === 'given' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Reviews I've Given</h3>
                
                {dashboardData.reviewsGiven.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.reviewsGiven.map((review) => (
                      <div key={review._id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{review.project?.title}</h4>
                            <div className="flex items-center mt-2 space-x-4">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                <span className="text-sm text-gray-700">{review.overallRating}/5</span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Link
                            to={`/project/${review.project?._id}`}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            View Project
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews given yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Start reviewing projects to help others improve their work.</p>
                    <div className="mt-6">
                      <Link
                        to="/review-projects"
                        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                      >
                        Find Projects to Review
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

