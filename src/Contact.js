import React, { useState } from 'react';
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
  TextField,
  Paper,
  Stack,
  Alert,
} from '@mui/material';
import { DirectionsCar as CarIcon, Phone, Email, LocationOn } from '@mui/icons-material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

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
          <Button color="inherit" onClick={() => navigate('/about')} sx={{ mx: 1, fontSize: 16 }}>About</Button>
          <Button color="inherit" onClick={() => navigate('/contact')} sx={{ mx: 1, fontSize: 16, fontWeight: 'bold' }}>Contact</Button>
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
            Get in Touch
          </Typography>
          <Typography variant="h5">
            We'd love to hear from you. Contact us anytime!
          </Typography>
        </Box>
      </Box>

      {/* CONTACT CONTENT */}
      <Container maxWidth="lg" sx={{ py: 10, flexGrow: 1 }}>
        <Grid container spacing={6}>
          {/* CONTACT INFO */}
          <Grid item xs={12} md={5}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#667eea' }}>
              Contact Information
            </Typography>

            <Stack spacing={3}>
              <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Phone sx={{ mr: 2, color: '#667eea', fontSize: 28, mt: 1 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Phone</Typography>
                    <Typography variant="body2">+91 9876543210</Typography>
                    <Typography variant="body2">+91 9876543211</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Email sx={{ mr: 2, color: '#667eea', fontSize: 28, mt: 1 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Email</Typography>
                    <Typography variant="body2">support@carrentpro.com</Typography>
                    <Typography variant="body2">info@carrentpro.com</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <LocationOn sx={{ mr: 2, color: '#667eea', fontSize: 28, mt: 1 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Location</Typography>
                    <Typography variant="body2">CarRent Pro Head Office</Typography>
                    <Typography variant="body2">123 Business Park, Mumbai - 400001</Typography>
                    <Typography variant="body2">India</Typography>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <AccessAlarmIcon sx={{ mr: 2, color: '#667eea', fontSize: 28, mt: 1 }} />
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>Working Hours</Typography>
                    <Typography variant="body2">Monday - Friday: 9:00 AM - 6:00 PM</Typography>
                    <Typography variant="body2">Saturday: 10:00 AM - 4:00 PM</Typography>
                    <Typography variant="body2">Sunday: Closed</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* CONTACT FORM */}
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#667eea' }}>
                Send us a Message
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon!
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={5}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        py: 1.5,
                        fontWeight: 'bold',
                        fontSize: 16,
                        '&:hover': {
                          boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
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

export default Contact;
