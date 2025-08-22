import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { ArrowLeft, ArrowRight, Check, User, Target, Heart } from 'lucide-react';

const CAREER_GOALS_OPTIONS = [
  'Leadership Role', 'Career Change', 'Skill Development', 'Promotion',
  'Start Business', 'Work-Life Balance', 'Networking', 'Public Speaking',
  'Negotiation', 'Technical Skills', 'Project Management', 'Entrepreneurship'
];

const SKILLS_NEEDED_OPTIONS = [
  'Leadership', 'Career Planning', 'Technical Skills', 'Entrepreneurship',
  'Work-Life Balance', 'Interview Prep', 'Networking', 'Public Speaking',
  'Negotiation', 'Project Management', 'Strategy', 'Innovation'
];

const CHALLENGES_OPTIONS = [
  'Imposter Syndrome', 'Networking', 'Public Speaking', 'Negotiation',
  'Work-Life Balance', 'Career Direction', 'Confidence Building',
  'Technical Skills Gap', 'Leadership Transition', 'Industry Change'
];

const INDUSTRY_OPTIONS = [
  'Technology', 'Finance', 'Healthcare', 'Marketing', 'Education',
  'Consulting', 'Manufacturing', 'Retail', 'Non-profit', 'Government'
];

function AddMenteeForm() {
  const navigate = useNavigate();
  const { addMentee } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: '',
    email: '',
    phone: '',
    
    // Step 2: Career Information
    currentRole: '',
    careerGoals: [],
    experienceLevel: '',
    industry: '',
    
    // Step 3: Mentorship Needs
    skillsNeeded: [],
    challenges: [],
    timeCommitment: '',
    communicationPreference: ''
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
      if (!formData.currentRole.trim()) newErrors.currentRole = 'Current role is required';
      if (formData.careerGoals.length === 0) newErrors.careerGoals = 'Please select at least one career goal';
      if (!formData.experienceLevel) newErrors.experienceLevel = 'Experience level is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
    }

    if (step === 3) {
      if (formData.skillsNeeded.length === 0) newErrors.skillsNeeded = 'Please select at least one skill you need to develop';
      if (!formData.timeCommitment) newErrors.timeCommitment = 'Time commitment is required';
      if (!formData.communicationPreference) newErrors.communicationPreference = 'Communication preference is required';
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
      // Add mentee
      addMentee(formData);
      navigate('/mentees');
    } catch (error) {
      console.error('Error adding mentee:', error);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Information', icon: User },
    { number: 2, title: 'Career Information', icon: Target },
    { number: 3, title: 'Mentorship Needs', icon: Heart }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Add New Mentee</h1>
        <p className="mt-2 text-gray-600">Welcome a new woman to our mentorship program</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center space-x-3 ${index < steps.length - 1 ? 'pr-8' : ''}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isCompleted ? 'bg-blue-600 border-blue-600 text-white' :
                  isActive ? 'border-blue-600 text-blue-600' :
                  'border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </div>
                <div className="hidden sm:block">
                  <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden sm:block w-16 h-0.5 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Form */}
      <div className="card-base">
        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Step 2: Career Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Career Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <Input
                    id="currentRole"
                    label="Current Role"
                    required
                    value={formData.currentRole}
                    onChange={(e) => updateField('currentRole', e.target.value)}
                    error={errors.currentRole}
                    placeholder="e.g., Software Developer, Student, Between Jobs"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-1">
                        Experience Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="experienceLevel"
                        className="input-base"
                        value={formData.experienceLevel}
                        onChange={(e) => updateField('experienceLevel', e.target.value)}
                        required
                      >
                        <option value="">Select level</option>
                        <option value="Junior">Junior (0-2 years)</option>
                        <option value="Mid-level">Mid-level (3-5 years)</option>
                        <option value="Senior">Senior (6+ years)</option>
                        <option value="Career Change">Career Change</option>
                      </select>
                      {errors.experienceLevel && <p className="text-sm text-red-600 mt-1">{errors.experienceLevel}</p>}
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
                  
                  {/* Career Goals */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Career Goals <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {CAREER_GOALS_OPTIONS.map(goal => (
                        <label key={goal} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.careerGoals.includes(goal)}
                            onChange={() => toggleArrayField('careerGoals', goal)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{goal}</span>
                        </label>
                      ))}
                    </div>
                    {errors.careerGoals && <p className="text-sm text-red-600 mt-1">{errors.careerGoals}</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Mentorship Needs */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mentorship Needs</h3>
                
                {/* Skills Needed */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Skills You Want to Develop <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SKILLS_NEEDED_OPTIONS.map(skill => (
                      <label key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.skillsNeeded.includes(skill)}
                          onChange={() => toggleArrayField('skillsNeeded', skill)}
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{skill}</span>
                      </label>
                    ))}
                  </div>
                  {errors.skillsNeeded && <p className="text-sm text-red-600 mt-1">{errors.skillsNeeded}</p>}
                </div>

                {/* Challenges (Optional) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Current Challenges (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {CHALLENGES_OPTIONS.map(challenge => (
                      <label key={challenge} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.challenges.includes(challenge)}
                          onChange={() => toggleArrayField('challenges', challenge)}
                          className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="text-sm text-gray-700">{challenge}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time Commitment */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Time Commitment <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {['1-2 hours/month', '2-4 hours/month', '4+ hours/month'].map(time => (
                      <label key={time} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="timeCommitment"
                          value={time}
                          checked={formData.timeCommitment === time}
                          onChange={(e) => updateField('timeCommitment', e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{time}</span>
                      </label>
                    ))}
                  </div>
                  {errors.timeCommitment && <p className="text-sm text-red-600 mt-1">{errors.timeCommitment}</p>}
                </div>

                {/* Communication Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred Communication Style <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['In-person', 'Video calls', 'Phone', 'Chat'].map(style => (
                      <label key={style} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="communicationPreference"
                          value={style}
                          checked={formData.communicationPreference === style}
                          onChange={(e) => updateField('communicationPreference', e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{style}</span>
                      </label>
                    ))}
                  </div>
                  {errors.communicationPreference && <p className="text-sm text-red-600 mt-1">{errors.communicationPreference}</p>}
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
                  {loading ? 'Adding Mentee...' : 'Add Mentee'}
                  <Check className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Back to Mentees */}
      <div className="text-center">
        <button
          onClick={() => navigate('/mentees')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          ← Back to Mentees List
        </button>
      </div>
    </div>
  );
}

export default AddMenteeForm;