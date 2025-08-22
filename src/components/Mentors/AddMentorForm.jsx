import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { ArrowLeft, ArrowRight, Check, User, Briefcase, Heart } from 'lucide-react';

const EXPERTISE_OPTIONS = [
  'Leadership', 'Career Planning', 'Technical Skills', 'Entrepreneurship',
  'Work-Life Balance', 'Interview Prep', 'Networking', 'Public Speaking',
  'Negotiation', 'Project Management', 'Strategy', 'Innovation'
];

const INDUSTRY_OPTIONS = [
  'Technology', 'Finance', 'Healthcare', 'Marketing', 'Education',
  'Consulting', 'Manufacturing', 'Retail', 'Non-profit', 'Government'
];

const ROLE_FUNCTION_OPTIONS = [
  'Engineering', 'Marketing', 'C-Suite Leadership', 'Entrepreneurship',
  'Sales', 'Product Management', 'Operations', 'Finance', 'Strategy & Operations',
  'Brand Management'
];

function AddMentorForm() {
  const navigate = useNavigate();
  const { addMentor } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: '',
    email: '',
    phone: '',
    
    // Step 2: Professional Details
    company: '',
    jobTitle: '',
    roleFunction: '',
    yearsExperience: '',
    industry: '',
    bio: '',
    
    // Step 3: Mentorship Preferences
    expertise: [],
    availability: '',
    preferredMenteeLevel: [],
    communicationStyle: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (step === 2) {
      if (!formData.company.trim()) newErrors.company = 'Company is required';
      if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
      if (!formData.roleFunction) newErrors.roleFunction = 'Role function is required';
      if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
    }

    if (step === 3) {
      if (formData.expertise.length === 0) newErrors.expertise = 'Please select at least one area of expertise';
      if (!formData.availability) newErrors.availability = 'Availability is required';
      if (formData.preferredMenteeLevel.length === 0) newErrors.preferredMenteeLevel = 'Please select preferred mentee levels';
      if (!formData.communicationStyle) newErrors.communicationStyle = 'Communication style is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    try {
      // Add mentor
      addMentor(formData);
      navigate('/mentors');
    } catch (error) {
      console.error('Error adding mentor:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Information', icon: User },
    { number: 2, title: 'Professional Details', icon: Briefcase },
    { number: 3, title: 'Mentorship Preferences', icon: Heart }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add New Mentor</h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">Welcome a new mentor to empower women in their careers</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 lg:space-x-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center space-x-2 lg:space-x-3 ${index < steps.length - 1 ? 'pr-4 lg:pr-8' : ''}`}>
                <div className={`flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 ${
                  isCompleted ? 'bg-purple-600 border-purple-600 text-white' :
                  isActive ? 'border-purple-600 text-purple-600' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <Check className="h-4 w-4 lg:h-5 lg:w-5" /> : <Icon className="h-4 w-4 lg:h-5 lg:w-5" />}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-xs lg:text-sm font-medium ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-8 lg:w-16 h-0.5 ${
                  currentStep > step.number ? 'bg-purple-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form */}
      <div className="card-base mobile-card">
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    id="name"
                    label="Full Name"
                    required
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={errors.name}
                  />
                  
                  <Input
                    id="email"
                    label="Email Address"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                  />
                  
                  <Input
                    id="phone"
                    label="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    error={errors.phone}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Details</h3>
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    id="company"
                    label="Company"
                    required
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    error={errors.company}
                  />
                  
                  <Input
                    id="jobTitle"
                    label="Job Title"
                    required
                    value={formData.jobTitle}
                    onChange={(e) => updateField('jobTitle', e.target.value)}
                    error={errors.jobTitle}
                  />
                  
                  <div>
                    <label htmlFor="roleFunction" className="block text-sm font-medium text-gray-700 mb-1">
                      Role Function <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="roleFunction"
                      className="input-base"
                      value={formData.roleFunction}
                      onChange={(e) => updateField('roleFunction', e.target.value)}
                      required
                    >
                      <option value="">Select role function</option>
                      {ROLE_FUNCTION_OPTIONS.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                    {errors.roleFunction && <p className="text-sm text-red-600 mt-1">{errors.roleFunction}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="yearsExperience"
                        className="input-base"
                        value={formData.yearsExperience}
                        onChange={(e) => updateField('yearsExperience', e.target.value)}
                        required
                      >
                        <option value="">Select years</option>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (
                          <option key={year} value={year}>{year} year{year > 1 ? 's' : ''}</option>
                        ))}
                        <option value="20+">20+ years</option>
                      </select>
                      {errors.yearsExperience && <p className="text-sm text-red-600 mt-1">{errors.yearsExperience}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                        Industry <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="industry"
                        className="input-base"
                        value={formData.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                        required
                      >
                        <option value="">Select industry</option>
                        {INDUSTRY_OPTIONS.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                      {errors.industry && <p className="text-sm text-red-600 mt-1">{errors.industry}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio (Optional)
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      maxLength={200}
                      className="input-base"
                      value={formData.bio}
                      onChange={(e) => updateField('bio', e.target.value)}
                      placeholder="Tell us about your background and passion for mentoring..."
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/200 characters</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Mentorship Preferences */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mentorship Preferences</h3>
                
                {/* Expertise */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Areas of Expertise <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {EXPERTISE_OPTIONS.map(skill => (
                      <label key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.expertise.includes(skill)}
                          onChange={() => toggleArrayField('expertise', skill)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                  {errors.expertise && <p className="text-sm text-red-600 mt-1">{errors.expertise}</p>}
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Availability <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['High', 'Medium', 'Low'].map(level => (
                      <label key={level} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="availability"
                          value={level}
                          checked={formData.availability === level}
                          onChange={(e) => updateField('availability', e.target.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                  {errors.availability && <p className="text-sm text-red-600 mt-1">{errors.availability}</p>}
                </div>

                {/* Preferred Mentee Level */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Mentee Level <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Junior', 'Mid-level', 'Senior', 'Career Change'].map(level => (
                      <label key={level} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredMenteeLevel.includes(level)}
                          onChange={() => toggleArrayField('preferredMenteeLevel', level)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                  {errors.preferredMenteeLevel && <p className="text-sm text-red-600 mt-1">{errors.preferredMenteeLevel}</p>}
                </div>

                {/* Communication Style */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Communication Style <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['In-person', 'Video calls', 'Phone', 'Chat'].map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="communicationStyle"
                          value={style}
                          checked={formData.communicationStyle === style}
                          onChange={(e) => updateField('communicationStyle', e.target.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{style}</span>
                      </label>
                    ))}
                  </div>
                  {errors.communicationStyle && <p className="text-sm text-red-600 mt-1">{errors.communicationStyle}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <div>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={handlePrevious}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              )}
            </div>
            
            <div>
              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding Mentor...' : 'Add Mentor'}
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Back to Mentors */}
      <div className="text-center">
        <button
          onClick={() => navigate('/mentors')}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
        >
          ← Back to Mentors List
        </button>
      </div>
    </div>
  );
}

export default AddMentorForm;