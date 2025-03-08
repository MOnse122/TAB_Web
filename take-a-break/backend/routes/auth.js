import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    // Verificar el Content-Type
    if (!req.is('application/json')) {
      return res.status(400).json({
        message: 'El Content-Type debe ser application/json',
        error: 'Invalid Content-Type'
      });
    }

    const { nombre, apellido, correo, contraseña, fechaNacimiento } = req.body;
    
    // Log para debugging
    console.log('Datos recibidos:', {
      nombre,
      apellido,
      correo,
      fechaNacimiento,
      contraseñaRecibida: contraseña ? 'Sí' : 'No'
    });

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ correo });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe con este correo electrónico' });
    }
    
    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !correo || !contraseña || !fechaNacimiento) {
      return res.status(400).json({ 
        message: 'Todos los campos son requeridos',
        error: 'Missing required fields',
        camposFaltantes: {
          nombre: !nombre,
          apellido: !apellido,
          correo: !correo,
          contraseña: !contraseña,
          fechaNacimiento: !fechaNacimiento
        }
      });
    }

    // Crear nuevo usuario
    const newUser = {
      nombre,
      apellido,
      correo,
      contraseña,
      fechaNacimiento: new Date(fechaNacimiento)
    };

    const user = await User.create(newUser);
    
    // Obtener el usuario creado sin la contraseña
    const userResponse = await User.findById(user._id).select('nombre apellido correo fechaNacimiento createdAt');
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userResponse
    });
  } catch (error) {
    console.error('Error de registro:', error);
    res.status(500).json({
      message: 'Error al registrar el usuario',
      error: error.message
    });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Verificar que se proporcionaron correo y contraseña
    if (!correo || !contraseña) {
      return res.status(400).json({
        message: 'Por favor proporcione correo y contraseña',
        error: 'Missing credentials'
      });
    }

    // Buscar usuario y seleccionar explícitamente el campo contraseña
    const user = await User.findOne({ correo }).select('+contraseña');

    // Verificar si el usuario existe y la contraseña es correcta
    if (!user || !(await user.correctPassword(contraseña, user.contraseña))) {
      return res.status(401).json({
        message: 'Correo o contraseña incorrectos',
        error: 'Invalid credentials'
      });
    }

    // Si todo está bien, enviar respuesta exitosa
    // Excluir la contraseña de la respuesta
    const userResponse = await User.findById(user._id).select('nombre apellido correo fechaNacimiento createdAt');

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: userResponse
    });
  } catch (error) {
    console.error('Error de login:', error);
    res.status(500).json({
      message: 'Error al iniciar sesión',
      error: error.message
    });
  }
});

export default router;