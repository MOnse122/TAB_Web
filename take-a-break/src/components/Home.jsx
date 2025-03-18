import { Box, Typography, Button, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { theme } from './Login';
import muñequito from '../assets/muñequito.png';
import '../estilos/estilos.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#fff8f1'
      }}>
        {/* Formas decorativas (figuras de fondo) */}
        {[
          { top: 40, left: 40, width: 208, height: 160, bgcolor: '#7dd3fc', borderRadius: '60%', rotate: '25deg' },
          { bottom: 64, left: 160, width: 240, height: 192, bgcolor: '#fde047', borderRadius: '50%', rotate: '-20deg' },
          { top: 80, right: 64, width: 160, height: 128, bgcolor: '#3b82f6', borderRadius: '55%', rotate: '40deg' },
          { bottom: 96, right: 40, width: 128, height: 128, bgcolor: '#bbf7d0', borderRadius: '50%' }
        ].map((shape, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              ...shape,
              transform: shape.rotate ? `rotate(${shape.rotate})` : undefined,
              opacity: 0.8
            }}
          />
        ))}

        {/* Círculo con efecto de pulso */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 160,
          height: 160,
          bgcolor: '#312e81',
          borderRadius: '50%',
          opacity: 1,
          transform: 'translate(-50%, -50%)',
          animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
        }} />

        {/* Contenido lado izquierdo */}
        <Box sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center', // Centrar contenido
          paddingX: 8,
          zIndex: 1,
          position: 'relative' // Para posicionamiento del muñequito
        }}>
          <Typography variant="h2" sx={{ 
            color: 'primary.main', 
            fontWeight: 700, 
            mb: 2,
            textAlign: 'center' // Centrar texto
          }}>
            Take a Break
          </Typography>
          <Typography variant="h4" sx={{ 
            color: 'text.primary', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1,
            textAlign: 'center', // Centrar texto
            mb: 4 // Añadir margen inferior
          }}>
            Tu espacio para relajarte
            <Box component="span" sx={{ color: 'primary.main', fontSize: '2rem' }}>●●●</Box>
          </Typography>
          <img 
            src={muñequito} 
            alt="Muñeco-head" 
            style={{ 
              width: '250px', 
              height: 'auto', 
              marginTop: '20px',
              position: 'absolute',
              bottom: '50px', // Posicionar desde abajo
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))' // Añadir sombra suave
            }} 
          />
        </Box>

        {/* Contenido lado derecho */}
        <Box sx={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingX: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            Comienza aquí
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button variant="contained" className="boton" onClick={() => navigate('/login')}>
              Iniciar sesión
            </Button>
            <Button variant="contained" className="boton" onClick={() => navigate('/register')}>
              Registrarse
            </Button>
          </Box>

          {/* Pie de página */}
          <Box sx={{
            position: 'absolute',
            bottom: 16,
            display: 'flex',
            gap: 1,
            color: 'text.secondary',
            fontSize: '0.875rem'
          }}>
            <Typography component="a" href="#" sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}>
              Términos de uso
            </Typography>
            <Typography>|</Typography>
            <Typography component="a" href="#" sx={{
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}>
              Política de privacidad
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Animación ping */}
      <style>
        {`
          @keyframes ping {
            0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
            75% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
          }
        `}
      </style>
    </ThemeProvider>
  );
}
