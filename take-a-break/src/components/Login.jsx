import { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, List, ListItem, ListItemText, ThemeProvider, createTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../estilos/estilos.css';
import { Cursor } from 'mongoose';

// Definimos un tema personalizado para Material-UI
const theme = createTheme({
  palette: {
    primary: { main: '#A7C7E7', light: '#D6E6F5' },
    secondary: { main: '#B4C7E7' },
    background: { default: '#F0F8FF', paper: '#FFFFFF' },
    text: { primary: '#4A6B8A', secondary: '#7B8FA3' },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#D6E6F5' },
            '&:hover fieldset': { borderColor: '#A7C7E7' },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '10px 20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 8px rgba(167, 199, 231, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 24px rgba(167, 199, 231, 0.12)',
          borderRadius: '16px',
        },
      },
    },
  },
});

export { theme };

const Login = () => {
  const navigate = useNavigate();
  // Estado para manejar los valores del formulario
  const [formData, setFormData] = useState({ correo: '', contraseña: '' });
  const [errors, setErrors] = useState({}); // Estado para manejar errores de validación
  const [emailValidations, setEmailValidations] = useState({
    startLetter: false,
    hasNumber: false,
    allowedChars: false,
    hasAt: false,
    validDomain: false,
    hasDot: false,
    validSystemType: false
  });

  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  // Función para validar el correo electrónico
  const validateEmail = (email) => {
    const validations = {
      startLetter: /^[a-zA-Z]/.test(email), // Debe comenzar con una letra
      hasNumber: /[0-9]/.test(email), // Debe contener al menos un número
      allowedChars: /^[a-zA-Z0-9._@-]+$/.test(email), // Solo caracteres permitidos
      hasAt: /@/.test(email), // Debe contener @
      validDomain: /@[a-z0-9]+/.test(email), // Debe tener un dominio válido después de @
      hasDot: /\.[a-z]{2,}(?:\.mx)?$/.test(email), // Debe contener un punto
      validSystemType: /\.(com|edu|org|net|gov|mx)$/.test(email) // Debe tener una extensión válida
    };
    setEmailValidations(validations);
    return Object.values(validations).every(v => v);
  };

  // Función para validar la contraseña
  const validatePassword = (password) => {
    const validations = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordValidations(validations);
    return Object.values(validations).every(v => v);
  };

  // Función para validar el formulario antes de enviarlo
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.correo) {
      newErrors.correo = 'El correo electrónico es requerido';
    } else if (!validateEmail(formData.correo)) {
      newErrors.correo = 'Por favor ingrese un correo electrónico válido';
    }

    if (!formData.contraseña) {
      newErrors.contraseña = 'La contraseña es requerida';
    } else if (!validatePassword(formData.contraseña)) {
      newErrors.contraseña = 'La contraseña no cumple con los requisitos de seguridad';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          navigate('/chat');
        } else {
          const data = await response.json();
          setErrors({ submit: data.message || 'Error en el inicio de sesión' });
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ submit: 'Error de conexión con el servidor' });
      }
    }
  };

  // Manejo del cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (name === 'correo') {
      validateEmail(value);
    } else if (name === 'contraseña') {
      validatePassword(value);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="contenedor-principal">
        <Container maxWidth="xs">
          <Paper elevation={0} className="papel">
            <Typography component="h1" variant="h3" align="center" gutterBottom className="titulo-principal"> Take a Break </Typography>
            <Typography component="h2" variant="h5" align="center" gutterBottom className="subtitulo"> Iniciar Sesión </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
              <TextField 
                margin="normal" 
                required 
                fullWidth 
                id="correo" 
                label="Correo Electrónico" 
                name="correo" 
                autoComplete="email" 
                value={formData.correo} 
                onChange={handleChange} 
                error={!!errors.correo} 
                helperText={errors.correo} 
                className="campo-texto" 
              />
              {formData.correo && (
                <List dense className="lista-validacion">
                  {Object.entries(emailValidations).map(([key, valid]) => (
                    !valid && <ListItem key={key}><ListItemText primary={{
                      startLetter: "Debe comenzar con una letra",
                      hasNumber: "Debe contener al menos un número",
                      allowedChars: "Solo se permiten letras, números y los caracteres . _ @ -",
                      hasAt: "Debe contener @",
                      validDomain: "Debe tener un dominio válido después de @",
                      hasDot: "Debe contener un punto seguido de la extensión",
                      validSystemType: "Debe terminar en .com, .edu, .org, .net, .gov o .mx"
                    }[key]} /></ListItem>
                  ))}
                </List>
              )}
              <TextField 
                margin="normal" 
                required 
                fullWidth 
                name="contraseña" 
                label="Contraseña" 
                type="password" 
                id="contraseña" 
                value={formData.contraseña} 
                onChange={handleChange} 
                error={!!errors.contraseña} 
                helperText={errors.contraseña} 
                className="campo-texto" 
              />
              {formData.contraseña && (
                <List dense className="lista-validacion">
                  {Object.entries(passwordValidations).map(([key, valid]) => (
                    !valid && <ListItem key={key}><ListItemText primary={{
                      minLength: "Debe tener al menos 8 caracteres",
                      hasUpperCase: "Debe contener al menos una letra mayúscula",
                      hasLowerCase: "Debe contener al menos una letra minúscula",
                      hasNumber: "Debe contener al menos un número",
                      hasSpecialChar: "Debe contener al menos un carácter especial (!@#$%^&*(),.?\"{}|<>)"
                    }[key]} /></ListItem>
                  ))}
                </List>
              )}
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                color="primary" 
                className="boton"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
                  ¿Aun no te has registrado?
                  <Button
                    component="a"
                    href="/register"
                    variant="text"
                    sx={{
                      ml: 1,
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                  >
                    Regístrate
                  </Button>
                </Typography>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
