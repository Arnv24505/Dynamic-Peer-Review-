import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  Eye, 
  Download, 
  Star, 
  MessageSquare,
  FileText,
  Calendar,
  User,
  Tag,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewData, setReviewData] = useState({
    scores: {
      clarity: 3,
      quality: 3,
      originality: 3,
      technical: 3,
      presentation: 3
    },
    feedback: {
      strengths: '',
      weaknesses: '',
      suggestions: '',
      general: ''
    },
    overallRating: 3
  });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (criteria, value) => {
    setReviewData(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        [criteria]: parseInt(value)
      }
    }));
  };

  const handleFeedbackChange = (field, value) => {
    setReviewData(prev => ({
      ...prev,
      feedback: {
        ...prev.feedback,
        [field]: value
      }
    }));
  };

  const handleOverallRatingChange = (value) => {
    setReviewData(prev => ({
      ...prev,
      overallRating: parseInt(value)
    }));
  };

  const submitReview = async () => {
    if (!reviewData.feedback.strengths.trim() || !reviewData.feedback.weaknesses.trim()) {
      toast.error('Please provide feedback for strengths and weaknesses');
      return;
    }

    setSubmittingReview(true);
    
    try {
      await axios.post('/api/reviews', {
        projectId: id,
        ...reviewData
      });
      
      toast.success('Review submitted successfully!');
      setShowReviewForm(false);
      fetchProject(); // Refresh project data to show new review
    } catch (error) {
      console.error('Error submitting review:', error);
      const message = error.response?.data?.error || 'Failed to submit review';
      toast.error(message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const canReview = project && 
    project.submitter._id !== user.id && 
    !project.reviews.some(review => review.reviewer._id === user.id);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project not found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      essay: 'bg-blue-100 text-blue-800',
      code: 'bg-green-100 text-green-800',
      artwork: 'bg-purple-100 text-purple-800',
      video: 'bg-red-100 text-red-800',
      presentation: 'bg-yellow-100 text-yellow-800',
      research: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      essay: '📝',
      code: '💻',
      artwork: '🎨',
      video: '🎥',
      presentation: '📊',
      research: '🔬',
      other: '📄'
    };
    return icons[category] || icons.other;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                  {getCategoryIcon(project.category)} {project.category}
                </span>
                <span className="text-gray-500 text-sm">
                  Submitted {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {canReview && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Review This Project
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Description */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>

            {/* File Preview */}
            {project.filePath && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project File</h2>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">File uploaded successfully</p>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center mx-auto">
                    <Download className="w-4 h-4 mr-2" />
                    Download File
                  </button>
                </div>
              </div>
            )}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Reviews ({project.reviews?.length || 0})
              </h2>
              
              {project.reviews && project.reviews.length > 0 ? (
                <div className="space-y-4">
                  {project.reviews.map((review, index) => (
                    <div key={review._id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Reviewer {index + 1}</span>
                          <span className="text-xs text-gray-400">(Anonymous)</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{review.overallRating}/5</span>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Strengths</h4>
                          <p className="text-gray-700">{review.feedback.strengths}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
                          <p className="text-gray-700">{review.feedback.weaknesses}</p>
                        </div>
                      </div>
                      
                      {review.feedback.suggestions && (
                        <div className="mt-3">
                          <h4 className="font-medium text-gray-900 mb-2">Suggestions</h4>
                          <p className="text-gray-700">{review.feedback.suggestions}</p>
                        </div>
                      )}
                      
                      {review.feedback.general && (
                        <div className="mt-3">
                          <h4 className="font-medium text-gray-900 mb-2">General Feedback</h4>
                          <p className="text-gray-700">{review.feedback.general}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p>No reviews yet. Be the first to provide feedback!</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    project.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium">{project.reviews?.length || 0}</span>
                </div>
                {project.averageRating > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{project.averageRating.toFixed(1)}/5</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Review Button */}
            {canReview && !showReviewForm && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Ready to Review?</h3>
                <p className="text-blue-800 text-sm mb-4">
                  Help improve this project by providing constructive feedback.
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Start Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Review Project</h2>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">Provide structured feedback to help improve this project.</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Scoring Criteria */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Scoring Criteria</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(reviewData.scores).map(([criteria, score]) => (
                      <div key={criteria} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 capitalize">
                          {criteria}
                        </label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => handleScoreChange(criteria, value)}
                              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                                score === value
                                  ? 'border-primary-500 bg-primary-500 text-white'
                                  : 'border-gray-300 text-gray-600 hover:border-primary-300'
                              }`}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">
                          {criteria === 'clarity' && 'How clear and understandable is the project?'}
                          {criteria === 'quality' && 'How well-executed and polished is the work?'}
                          {criteria === 'originality' && 'How creative and innovative is the approach?'}
                          {criteria === 'technical' && 'How technically sound and well-implemented is it?'}
                          {criteria === 'presentation' && 'How well is the work presented and formatted?'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overall Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Overall Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleOverallRatingChange(value)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                          reviewData.overallRating === value
                            ? 'border-primary-500 bg-primary-500 text-white'
                            : 'border-gray-300 text-gray-600 hover:border-primary-300'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feedback Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Strengths *
                    </label>
                    <textarea
                      value={reviewData.feedback.strengths}
                      onChange={(e) => handleFeedbackChange('strengths', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="What aspects of this project work well?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Areas for Improvement *
                    </label>
                    <textarea
                      value={reviewData.feedback.weaknesses}
                      onChange={(e) => handleFeedbackChange('weaknesses', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="What could be improved or enhanced?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Suggestions (Optional)
                    </label>
                    <textarea
                      value={reviewData.feedback.suggestions}
                      onChange={(e) => handleFeedbackChange('suggestions', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Any specific suggestions for improvement?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      General Feedback (Optional)
                    </label>
                    <textarea
                      value={reviewData.feedback.general}
                      onChange={(e) => handleFeedbackChange('general', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Any additional comments or observations?"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitReview}
                    disabled={submittingReview}
                    className={`px-6 py-2 rounded-lg text-white font-medium transition-colors duration-200 ${
                      submittingReview
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-primary-600 hover:bg-primary-700'
                    }`}
                  >
                    {submittingReview ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
