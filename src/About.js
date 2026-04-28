import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import { DirectionsCar as CarIcon, People } from '@mui/icons-material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* NAVBAR */}
      <AppBar 
        position="sticky" 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
      >
        <Toolbar>
          <CarIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }} onClick={() => navigate('/')}>
            CarRent Pro
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')} sx={{ mx: 1, fontSize: 16 }}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/about')} sx={{ mx: 1, fontSize: 16, fontWeight: 'bold' }}>About</Button>
          <Button color="inherit" onClick={() => navigate('/contact')} sx={{ mx: 1, fontSize: 16 }}>Contact</Button>
          <Button 
            variant="contained" 
            sx={{ 
              ml: 2, 
              backgroundColor: '#fff',
              color: '#667eea',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Box
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=1200&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
            About CarRent Pro
          </Typography>
          <Typography variant="h5">
            Premium Car Rental Experience Since 2020
          </Typography>
        </Box>
      </Box>

      {/* ABOUT CONTENT */}
      <Container maxWidth="lg" sx={{ py: 10, flexGrow: 1 }}>
        <Grid container spacing={6} sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#667eea' }}>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2, fontSize: 16 }}>
              At CarRent Pro, we believe that luxury car rentals should be accessible, transparent, and hassle-free. Our mission is to provide premium vehicles with exceptional service to make every journey memorable.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: 16 }}>
              With our extensive fleet of luxury cars and dedication to customer satisfaction, we've become the trusted choice for thousands of travelers and business professionals across the country.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Why Choose Us?
                </Typography>
                <Stack spacing={2}>
                  <Typography variant="body1">✅ <strong>500+ Premium Vehicles</strong> - Latest models from top manufacturers</Typography>
                  <Typography variant="body1">✅ <strong>24/7 Customer Support</strong> - Always here when you need us</Typography>
                  <Typography variant="body1">✅ <strong>Best Prices</strong> - Competitive rates without hidden charges</Typography>
                  <Typography variant="body1">✅ <strong>Quick Booking</strong> - Reserve your car in minutes</Typography>
                  <Typography variant="body1">✅ <strong>Insurance Included</strong> - Drive with complete peace of mind</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* STATS SECTION */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6, color: '#667eea' }}>
            Our Achievements
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <EmojiEventsIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>50,000+</Typography>
                <Typography variant="body2">Happy Customers</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <CarIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>500+</Typography>
                <Typography variant="body2">Premium Vehicles</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <TimelineIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>24/7</Typography>
                <Typography variant="body2">Customer Support</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: 2
                }}
              >
                <People sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>100+</Typography>
                <Typography variant="body2">Team Members</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* TEAM SECTION */}
        <Box>
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 6, color: '#667eea' }}>
            Our Leadership Team
          </Typography>
          <Grid container spacing={4}>
            {[
              { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://i.pravatar.cc/150?img=1' },
              { name: 'Priya Singh', role: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=2' },
              { name: 'Amit Patel', role: 'Fleet Manager', image: 'https://i.pravatar.cc/150?img=3' },
              { name: 'Neha Verma', role: 'Customer Relations', image: 'https://i.pravatar.cc/150?img=4' },
            ].map((member, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card sx={{ textAlign: 'center', p: 3 }}>
                  <Box component="img" src={member.image} sx={{ width: 100, height: 100, borderRadius: '50%', mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{member.name}</Typography>
                  <Typography variant="body2" sx={{ color: '#667eea', fontWeight: '500' }}>{member.role}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* FOOTER */}
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 6,
          mt: 'auto'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                About Us
              </Typography>
              <Typography variant="body2">
                Premium car rental service providing luxury vehicles for every occasion.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Home
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  About
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Contact
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Support
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">📞 +91 9876543210</Typography>
                <Typography variant="body2">📧 support@carrentpro.com</Typography>
                <Typography variant="body2">📍 Mumbai, India</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Follow Us
              </Typography>
              <Typography variant="body2">Facebook • Instagram • Twitter</Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', pt: 3, textAlign: 'center' }}>
            <Typography variant="body2">
              © 2026 CarRent Pro. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default About;
