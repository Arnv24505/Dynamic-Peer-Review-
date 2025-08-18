import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  FileText, 
  Shield, 
  Star, 
  ArrowRight, 
  CheckCircle,
  Upload,
  Eye,
  MessageSquare
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Upload,
      title: 'Submit Your Work',
      description: 'Upload essays, code, artwork, or any creative project for peer review.'
    },
    {
      icon: Eye,
      title: 'Anonymous Reviews',
      description: 'Receive unbiased feedback from peers while maintaining anonymity.'
    },
    {
      icon: Star,
      title: 'Structured Feedback',
      description: 'Get comprehensive feedback using our guided review system.'
    },
    {
      icon: Users,
      title: 'Peer Learning',
      description: 'Review others\' work and learn from different perspectives.'
    }
  ];

  const benefits = [
    'Improve your work through constructive feedback',
    'Learn from diverse perspectives and approaches',
    'Build a portfolio of reviewed work',
    'Contribute to the learning community',
    'Develop critical thinking and evaluation skills'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Dynamic Peer Review & Feedback Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Submit your work anonymously, receive structured peer feedback, and contribute to a collaborative learning community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes peer review simple, anonymous, and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Peer Review?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Peer review is a powerful learning tool that benefits both reviewers and authors. 
                It promotes critical thinking, improves communication skills, and builds a supportive learning community.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 text-primary-600 rounded-full mb-6">
                  <MessageSquare className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join our community of learners and start receiving valuable feedback on your work.
                </p>
                {!user && (
                  <Link
                    to="/register"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
                  >
                    Create Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Your Learning Journey Today
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Whether you're a student, teacher, or professional, our platform helps you grow through collaborative feedback.
          </p>
          {!user && (
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-200 inline-flex items-center"
            >
              Join Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
