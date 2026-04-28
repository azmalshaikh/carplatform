import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Rating,
  Paper,
  Avatar,
  Stack,
} from '@mui/material';
import { DirectionsCar as CarIcon, Speed } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Questionnaire from './Questionnaire';

function Homepage() {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);

  // Sample featured cars - replace with API call later
  const sampleCars = [
    {
      id: 1,
      make: 'BMW',
      model: 'S1',
      price: '₹24,55,545/day',
      rating: 4.8,
      reviews: 324,
      image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?w=500&h=400&fit=crop',
      features: ['Sunroof', 'Touchscreen', 'Leather Seats']
    },
    {
      id: 2,
      make: 'Mercedes',
      model: 'C-Class',
      price: '₹28,50,000/day',
      rating: 4.9,
      reviews: 512,
      image: 'https://images.unsplash.com/photo-1567818735868-e71b99932e29?w=500&h=400&fit=crop',
      features: ['Panoramic Sunroof', 'AMG Package', 'Premium Sound']
    },
    {
      id: 3,
      make: 'Tesla',
      model: 'Model 3',
      price: '₹31,00,000/day',
      rating: 4.9,
      reviews: 698,
      image: 'https://images.pexels.com/photos/3803517/pexels-photo-3803517.jpeg?w=500&h=400&fit=crop',
      features: ['Autopilot', 'Electric', 'Supercharger Ready']
    },
    {
      id: 4,
      make: 'Audi',
      model: 'A4',
      price: '₹26,70,000/day',
      rating: 4.7,
      reviews: 287,
      image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=500&h=400&fit=crop',
      features: ['Quattro AWD', 'Virtual Cockpit', 'Premium Tech']
    },
    {
      id: 5,
      make: 'Porsche',
      model: '911',
      price: '₹65,00,000/day',
      rating: 5,
      reviews: 412,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&h=400&fit=crop',
      features: ['Performance Beast', 'Carbon Brakes', 'Turbo Engine']
    },
    {
      id: 6,
      make: 'Lexus',
      model: 'RX 350',
      price: '₹38,00,000/day',
      rating: 4.8,
      reviews: 501,
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?w=500&h=400&fit=crop',
      features: ['Luxury SUV', 'Hybrid Option', 'Mark Levinson Audio']
    },
  ];

  useEffect(() => {
    setFeaturedCars(sampleCars);
  }, []);

  const reviews = [
    {
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Excellent service! The car was in perfect condition and the process was hassle-free.',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Priya Singh',
      rating: 4.8,
      text: 'Great selection of premium cars. Highly recommend for special occasions!',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Amit Patel',
      rating: 5,
      text: 'Best car rental platform. Customer support is outstanding and delivery is quick.',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'Neha Verma',
      rating: 4.7,
      text: 'Professional team, clean cars, and fair pricing. Will definitely book again!',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
  ];

  const carouselImages = [
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=600&fit=crop',
      title: 'Premium Car Rentals',
      subtitle: 'Experience Luxury at Affordable Prices'
    },
    {
      image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&h=600&fit=crop',
      title: 'Drive Your Dream Car',
      subtitle: 'Choose from 500+ Premium Vehicles'
    },
    {
      image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=600&fit=crop',
      title: 'Trusted by Thousands',
      subtitle: 'Reliable Service Since 2020'
    },
  ];

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
          <Button color="inherit" onClick={() => navigate('/contact')} sx={{ mx: 1, fontSize: 16 }}>Contact</Button>
        </Toolbar>
      </AppBar>

      {/* HERO CAROUSEL */}
      <Box sx={{ width: '100%', mb: 6 }}>
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 5000 }}
          loop
          style={{ height: '500px' }}
        >
          {carouselImages.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '100%',
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
                    backgroundColor: 'rgba(0,0,0,0.4)',
                  }
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
                  <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {slide.title}
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 4 }}>
                    {slide.subtitle}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={() => setOpenQuestionnaire(true)}
                    sx={{ 
                      backgroundColor: '#667eea',
                      px: 4,
                      py: 1.5,
                      fontSize: 16,
                      '&:hover': { backgroundColor: '#764ba2' }
                    }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* FIND PERFECT CAR SECTION */}
      <Container maxWidth="lg" sx={{ mb: 10, mt: 4 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 3,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: 'bold' }}>
            Confused About Which Car to Choose? 🤔
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}>
            Answer a few quick questions and we'll find your perfect match!
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpenQuestionnaire(true)}
            sx={{
              backgroundColor: '#fff',
              color: '#667eea',
              fontWeight: 'bold',
              fontSize: 16,
              px: 4,
              py: 1.5,
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            Start Questionnaire →
          </Button>
        </Paper>
      </Container>

      {/* FEATURED CARS SECTION */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Featured Premium Cars
        </Typography>
        
        <Grid container spacing={4} sx={{ alignItems: 'stretch' }}>
          {featuredCars.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.id} sx={{ display: 'flex', minWidth: 0, maxWidth: { md: '33.333%' } }}>
              <Card
                sx={{
                  width: '100%',
                  maxWidth: '100%',
                  minHeight: 580,
                  display: 'flex',
                  flexDirection: 'column',  
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.4)',
                  },
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <CardMedia
                  component="img"
                  image={car.image}
                  alt={`${car.make} ${car.model}`}
                  sx={{ height: 250, width: '100%', objectFit: 'cover', flexShrink: 0, display: 'block' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5, minHeight: '32px' }}>
                    {car.make} {car.model}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Rating value={car.rating} readOnly size="small" />
                    <Typography variant="caption" sx={{ ml: 1, fontSize: '12px' }}>
                      ({car.reviews})
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, color: '#666', fontSize: '13px', lineHeight: 1.4, minHeight: '40px' }}>
                    {car.features.join(' • ')}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Speed sx={{ mr: 1, color: '#667eea', fontSize: '20px' }} />
                    <Typography variant="body2" sx={{ fontSize: '13px' }}>Automatic</Typography>
                  </Box>

                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#667eea', 
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: '16px'
                    }}
                  >
                    {car.price}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setOpenQuestionnaire(true)}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      py: 1,
                      fontWeight: 'bold',
                      mt: 'auto',
                      '&:hover': {
                        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)'
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* REVIEWS SECTION */}
      <Box sx={{ backgroundColor: '#f5f7fa', py: 10, mb: 8 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              mb: 6, 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            What Our Customers Say
          </Typography>

          <Grid container spacing={3}>
            {reviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)',
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={review.avatar} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {review.name}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                    "{review.text}"
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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
                  Our Cars
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  Pricing
                </Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => navigate('/contact')}>
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

      {/* QUESTIONNAIRE MODAL */}
      <Questionnaire open={openQuestionnaire} onClose={() => setOpenQuestionnaire(false)} />
    </Box>
  );
}

export default Homepage;
