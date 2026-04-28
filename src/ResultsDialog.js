import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, IconButton, Card, CardContent, Stack, Button, Chip, LinearProgress } from '@mui/material';
import { Close as CloseIcon, LocalGasStation, AirlineSeatReclineNormal, DirectionsCar, Star, EmojiEvents } from '@mui/icons-material';
import brandImages from './brandImages';

const fallbackImage = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop';

const rankColors = [
  { bg: 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)', text: '#fff', label: '1st' },
  { bg: 'linear-gradient(135deg, #C0C0C0 0%, #9E9E9E 100%)', text: '#fff', label: '2nd' },
  { bg: 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)', text: '#fff', label: '3rd' },
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#fff', label: '4th' },
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#fff', label: '5th' },
];

function getCarImage(make) {
  return brandImages[make] || brandImages['Default'] || fallbackImage;
}

function ResultsDialog({ open, onClose, recommendations }) {
  const maxScore = recommendations && recommendations.length > 0
    ? Math.max(...recommendations.map(r => r.score))
    : 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: '#f8f9ff',
          boxShadow: '0 24px 80px rgba(102, 126, 234, 0.25)',
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          py: 3,
          px: 4,
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <EmojiEvents sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
              Top Car Recommendations
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.5 }}>
              Personalized picks based on your preferences
            </Typography>
          </Box>
        </Box>
        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 12,
            top: 12,
            color: '#fff',
            backgroundColor: 'rgba(255,255,255,0.15)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: { xs: 2, sm: 3 }, pt: { xs: 3, sm: 3 } }}>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((rec, idx) => (
              <Card
                key={rec.car.id || idx}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: idx === 0 ? '2px solid #FFD700' : '1px solid #e8eaf6',
                  boxShadow: idx === 0
                    ? '0 8px 32px rgba(255, 215, 0, 0.2)'
                    : '0 2px 12px rgba(0,0,0,0.06)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.2)',
                  },
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                    {/* Image Section */}
                    <Box sx={{ position: 'relative', flexShrink: 0, width: { xs: '100%', sm: 220 }, height: { xs: 180, sm: 'auto' }, minHeight: { sm: 200 } }}>
                      <img
                        src={getCarImage(rec.car.make)}
                        alt={`${rec.car.make} ${rec.car.model}`}
                        onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {/* Rank Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          background: rankColors[idx]?.bg,
                          color: rankColors[idx]?.text,
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: 14,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                        }}
                      >
                        #{idx + 1}
                      </Box>
                    </Box>

                    {/* Details Section */}
                    <Box sx={{ flex: 1, p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1a1a2e', lineHeight: 1.2 }}>
                            {rec.car.make} {rec.car.model}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#888', fontWeight: 500, mt: 0.5 }}>
                            {rec.car.variant}
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            whiteSpace: 'nowrap',
                            ml: 2,
                          }}
                        >
                          ₹{rec.car.price?.toLocaleString('en-IN')}
                        </Typography>
                      </Box>

                      {/* Specs Row */}
                      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', my: 1.5 }}>
                        <Chip
                          icon={<DirectionsCar sx={{ fontSize: 16 }} />}
                          label={rec.car.body_type}
                          size="small"
                          sx={{ backgroundColor: '#ede7f6', color: '#5e35b1', fontWeight: 600 }}
                        />
                        <Chip
                          icon={<LocalGasStation sx={{ fontSize: 16 }} />}
                          label={rec.car.fueltype}
                          size="small"
                          sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }}
                        />
                        <Chip
                          icon={<AirlineSeatReclineNormal sx={{ fontSize: 16 }} />}
                          label={`${rec.car.seating_capacity} Seats`}
                          size="small"
                          sx={{ backgroundColor: '#e3f2fd', color: '#1565c0', fontWeight: 600 }}
                        />
                        {rec.car.safety_rating >= 4 && (
                          <Chip
                            icon={<Star sx={{ fontSize: 16 }} />}
                            label={`${rec.car.safety_rating}★ Safety`}
                            size="small"
                            sx={{ backgroundColor: '#fff8e1', color: '#f57f17', fontWeight: 600 }}
                          />
                        )}
                      </Box>

                      {/* Score Bar */}
                      <Box sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: '#667eea' }}>
                            Match Score
                          </Typography>
                          <Typography variant="caption" sx={{ fontWeight: 800, color: '#667eea' }}>
                            {rec.score}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min((rec.score / maxScore) * 100, 100)}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#e8eaf6',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 3,
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }
                          }}
                        />
                      </Box>

                      {/* Reasons */}
                      <Typography variant="body2" sx={{ color: '#666', mt: 1.5, lineHeight: 1.6, fontSize: 13 }}>
                        <b style={{ color: '#444' }}>Why:</b> {rec.reasons.join(' • ')}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <DirectionsCar sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#999' }}>No recommendations found.</Typography>
            </Box>
          )}
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 1 }}>
          <Button
            onClick={onClose}
            variant="contained"
            size="large"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 700,
              px: 5,
              py: 1.2,
              borderRadius: 3,
              textTransform: 'none',
              fontSize: 16,
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
              }
            }}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ResultsDialog;
