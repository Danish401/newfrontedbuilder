import React from 'react';
import { Box, Paper, Typography, Grid, useMediaQuery } from '@mui/material';

const genoa = {
  50: '#f3faf8',
  100: '#d7f0ea',
  200: '#b0dfd6',
  300: '#80c8bd',
  400: '#56aba0',
  500: '#3c9087',
  600: '#2e736d',
  700: '#285d59',
  800: '#244b49',
  900: '#21403e',
  950: '#0f2424',
};

const About = () => {
  const isMdUp = useMediaQuery('(min-width:900px)');
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflowX: 'hidden',
        background: `linear-gradient(135deg, ${genoa[200]}, ${genoa[300]}, ${genoa[400]})`,
        transition: 'all 0.3s',
      }}
    >
      {/* Genoa gradient overlay for extra depth */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          background: `linear-gradient(135deg, ${genoa[50]}CC 80%, ${genoa[200]}99 60%, ${genoa[500]}66 40%)`,
        }}
      />
      <Paper
        elevation={8}
        sx={{
          maxWidth: 700,
          width: '100%',
          bgcolor: genoa[50],
          borderRadius: 6,
          border: `2px solid ${genoa[500]}`,
          p: { xs: 3, md: 5 },
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.3s',
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          align="center"
          sx={{
            fontWeight: 800,
            mb: 2,
            color: genoa[900],
            letterSpacing: '-1px',
            fontSize: { xs: '2.2rem', sm: '3rem' },
            textShadow: '0 2px 8px #b0dfd6AA',
          }}
        >
          About Our Form Builder
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ color: genoa[700], mb: 2 }}
        >
          Our mission is to empower everyone to create, share, and collect data with beautiful, modern forms. Whether you're a business, educator, or individual, our platform makes it easy to design forms that look great and work everywhere.
        </Typography>
        <Typography
          align="center"
          sx={{ color: genoa[500], fontWeight: 600 }}
        >
          Built with love, modern technology, and a passion for great user experience.
        </Typography>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          width: '100%',
          bgcolor: `${genoa[50]}CC`,
          borderRadius: 6,
          border: `2px solid ${genoa[200]}`,
          p: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: { xs: 4, md: 8 },
          transition: 'all 0.3s',
        }}
      >
        <Box flex={1} textAlign={{ xs: 'center', md: 'left' }}>
          <Typography
            variant="h4"
            sx={{ color: genoa[900], fontWeight: 700, mb: 1 }}
          >
            Our Team & Vision
          </Typography>
          <Typography sx={{ color: genoa[700], mb: 1 }}>
            We are a small, dedicated team of developers and designers who believe that forms should be as beautiful as they are functional. Our vision is to make form creation accessible, enjoyable, and powerful for everyone.
          </Typography>
          <Typography sx={{ color: genoa[500], fontWeight: 600 }}>
            We're always improving and welcome your feedback!
          </Typography>
        </Box>
        <Box flex={1} display="flex" justifyContent="center">
          <Box
            component="img"
            src="https://undraw.co/api/illustrations/undraw_team_spirit_re_yl1v.svg"
            alt="Team working together"
            sx={{
              borderRadius: 4,
              boxShadow: 3,
              width: { xs: 220, sm: 288 },
              height: { xs: 180, sm: 224 },
              objectFit: 'cover',
              border: `4px solid ${genoa[500]}`,
              bgcolor: genoa[50],
              transition: 'all 0.3s',
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default About; 