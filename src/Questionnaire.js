import React, { useState } from 'react';
import axios from 'axios';
import ResultsDialog from './ResultsDialog';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '/api';

function Questionnaire({ open, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    budget: '',
    usage: '',
    mattersMost: '',
    preferredBodyType: '',
    seatingCapacity: '',
    priority: '',
    preferredCarType: '',
    prioritize: '',
    transmission: '',
    balancePreference: '',
    fuelPreference: '',
    features: [],
    safetyImportance: '',
  });

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define questions based on branching
  const getQuestions = () => {
    const questions = [
      {
        id: 'budget',
        question: "What's your budget range?",
        type: 'radio',
        options: [
          { value: 'budget_low', label: '₹5-15 Lakhs' },
          { value: 'budget_mid', label: '₹15-30 Lakhs' },
          { value: 'budget_high', label: '₹30-50 Lakhs' },
          { value: 'budget_premium', label: '₹50+ Lakhs' },
        ]
      },
      {
        id: 'usage',
        question: 'How will you primarily use the car?',
        type: 'radio',
        options: [
          { value: 'city', label: 'City Commute' },
          { value: 'family', label: 'Family Use' },
          { value: 'highway', label: 'Long Highway Rides' },
          { value: 'mixed', label: 'Mixed Usage' },
        ]
      },
    ];

    // Branching questions based on usage
    if (answers.usage === 'city') {
      questions.push({
        id: 'mattersMost',
        question: 'What matters most to you in a city car?',
        type: 'radio',
        options: [
          { value: 'mileage', label: 'Fuel Mileage' },
          { value: 'maintenance', label: 'Low Maintenance' },
          { value: 'compact', label: 'Compact Size' },
          { value: 'features', label: 'Modern Features' },
        ]
      },
      {
        id: 'preferredBodyType',
        question: 'What car type do you prefer?',
        type: 'radio',
        options: [
          { value: 'hatchback', label: 'Hatchback' },
          { value: 'sedan', label: 'Sedan' },
          { value: 'no_preference', label: 'No Preference' },
        ]
      });
    } else if (answers.usage === 'family') {
      questions.push({
        id: 'seatingCapacity',
        question: 'How many people usually travel with you?',
        type: 'radio',
        options: [
          { value: '2-4', label: '2-4 People' },
          { value: '4-5', label: '4-5 People' },
          { value: '6+', label: '6+ People' },
        ]
      },
      {
        id: 'priority',
        question: 'What is your priority?',
        type: 'radio',
        options: [
          { value: 'safety', label: 'Safety' },
          { value: 'comfort', label: 'Comfort' },
          { value: 'space', label: 'Space' },
        ]
      },
      {
        id: 'preferredCarType',
        question: 'Preferred car type for family?',
        type: 'radio',
        options: [
          { value: 'suv', label: 'SUV' },
          { value: 'mpv', label: 'MPV' },
          { value: 'sedan', label: 'Sedan' },
        ]
      });
    } else if (answers.usage === 'highway') {
      questions.push({
        id: 'prioritize',
        question: 'What do you prioritize on highways?',
        type: 'radio',
        options: [
          { value: 'performance', label: 'Performance' },
          { value: 'comfort', label: 'Comfort' },
          { value: 'mileage', label: 'Mileage' },
        ]
      },
      {
        id: 'transmission',
        question: 'Transmission preference?',
        type: 'radio',
        options: [
          { value: 'manual', label: 'Manual' },
          { value: 'automatic', label: 'Automatic' },
        ]
      });
    } else if (answers.usage === 'mixed') {
      questions.push({
        id: 'balancePreference',
        question: 'What should be the balance?',
        type: 'radio',
        options: [
          { value: 'mileage_focused', label: 'Mileage Focused' },
          { value: 'comfort_focused', label: 'Comfort Focused' },
          { value: 'performance_focused', label: 'Performance Focused' },
        ]
      });
    }

    // Common questions for all
    if (answers.usage) {
      questions.push({
        id: 'fuelPreference',
        question: 'What fuel type do you prefer?',
        type: 'radio',
        options: [
          { value: 'petrol', label: 'Petrol' },
          { value: 'diesel', label: 'Diesel' },
          { value: 'electric', label: 'Electric' },
          { value: 'hybrid', label: 'Hybrid' },
        ]
      },
      {
        id: 'features',
        question: 'Which features are important to you?',
        type: 'checkbox',
        options: [
          { value: 'sunroof', label: 'Sunroof' },
          { value: 'touchscreen', label: 'Touchscreen' },
          { value: 'leather_seats', label: 'Leather Seats' },
          { value: 'navigation', label: 'Navigation System' },
          { value: 'backup_camera', label: 'Backup Camera' },
        ]
      },
      {
        id: 'safetyImportance',
        question: 'How important is safety for you?',
        type: 'radio',
        options: [
          { value: 'very_important', label: 'Very Important' },
          { value: 'important', label: 'Important' },
          { value: 'somewhat_important', label: 'Somewhat Important' },
        ]
      });
    }

    return questions;
  };

  const questions = getQuestions();
  const currentQuestion = questions[currentStep];

  // Minimum total questions: 2 base + 1 min branch + 3 common = 6
  // This prevents the progress bar from jumping to 100% before branch questions appear
  const MIN_TOTAL_QUESTIONS = 6;
  const estimatedTotal = Math.max(questions.length, MIN_TOTAL_QUESTIONS);
  const progress = estimatedTotal > 1
    ? (currentStep / (estimatedTotal - 1)) * 100
    : 100;
  const isLastStep = currentStep === questions.length - 1 && questions.length >= MIN_TOTAL_QUESTIONS;

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  const handleFeatureToggle = (feature) => {
    const updatedFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter(f => f !== feature)
      : [...selectedFeatures, feature];
    
    setSelectedFeatures(updatedFeatures);
    setAnswers({
      ...answers,
      features: updatedFeatures
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/recommendations`, answers);
      setRecommendations(res.data);
      setResultsOpen(true);
    } catch (error) {
      alert('Error fetching recommendations. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const isAnswered = () => {
    if (currentQuestion.type === 'checkbox') {
      return selectedFeatures.length > 0;
    }
    return answers[currentQuestion.id] !== '';
  };

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)'
          }
        }}
      >
      <DialogTitle sx={{ position: 'relative', pb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#667eea' }}>
            Find Your Perfect Car 🚗
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="caption" sx={{ color: '#999', display: 'block', mt: 1 }}>
          Step {currentStep + 1} of {estimatedTotal}
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={progress}
          sx={{ 
            mt: 2,
            height: 6,
            borderRadius: 3,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 3
            }
          }}
        />
      </DialogTitle>

      <DialogContent sx={{ py: 4 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
            {currentQuestion.question}
          </Typography>

          {currentQuestion.type === 'radio' ? (
            <RadioGroup 
              value={answers[currentQuestion.id]} 
              onChange={(e) => handleAnswerChange(e.target.value)}
            >
              <Stack spacing={2}>
                {currentQuestion.options.map((option) => (
                  <Card 
                    key={option.value}
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: answers[currentQuestion.id] === option.value ? '#f0f0ff' : '#fff',
                      border: answers[currentQuestion.id] === option.value ? '2px solid #667eea' : '1px solid #e0e0e0',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <FormControlLabel
                        value={option.value}
                        control={<Radio sx={{ color: '#667eea' }} />}
                        label={option.label}
                        sx={{ width: '100%', m: 0 }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </RadioGroup>
          ) : currentQuestion.type === 'checkbox' ? (
            <Stack spacing={2}>
              {currentQuestion.options.map((option) => (
                <Card 
                  key={option.value}
                  onClick={() => handleFeatureToggle(option.value)}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: selectedFeatures.includes(option.value) ? '#f0f0ff' : '#fff',
                    border: selectedFeatures.includes(option.value) ? '2px solid #667eea' : '1px solid #e0e0e0',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Typography sx={{ fontWeight: selectedFeatures.includes(option.value) ? 'bold' : 'normal', color: selectedFeatures.includes(option.value) ? '#667eea' : '#333' }}>
                      {selectedFeatures.includes(option.value) ? '✓ ' : ''}{option.label}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : null}
        </Box>
      </DialogContent>

      <Box sx={{ display: 'flex', gap: 2, p: 3, pt: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button 
          onClick={handlePrev}
          disabled={currentStep === 0 || loading}
          variant="outlined"
          sx={{ textTransform: 'none' }}
        >
          Previous
        </Button>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <Button 
            onClick={handleNext}
            disabled={!isAnswered() || loading}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              fontWeight: 'bold'
            }}
          >
            {isLastStep ? 'Get Recommendations' : 'Next'}
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2, color: '#667eea', fontWeight: 'bold' }}>Fetching your recommendations...</Typography>
        </Box>
      )}
      </Dialog>
      <ResultsDialog open={resultsOpen} onClose={() => { setResultsOpen(false); onClose(); }} recommendations={recommendations} />
    </>
  );
}

export default Questionnaire;
