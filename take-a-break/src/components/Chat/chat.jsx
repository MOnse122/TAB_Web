import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, List, ListItem, ListItemText, Avatar, Drawer } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import { theme } from '../Login';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Crear conexión WebSocket
    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
      console.log('Conectado al servidor WebSocket');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    ws.onerror = (error) => {
      console.error('Error de WebSocket:', error);
    };

    ws.onclose = () => {
      console.log('Desconectado del servidor WebSocket');
    };

    setSocket(ws);

    // Limpiar conexión al desmontar
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Modificar handleSendMessage para que funcione sin WebSocket por ahora
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
      };
      
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
    }
  };

  // Agrupar mensajes por fecha
  const groupMessagesByDate = () => {
    const groups = {};
    messages.forEach(message => {
      if (!groups[message.date]) {
        groups[message.date] = [];
      }
      groups[message.date].push(message);
    });
    return groups;
  };

  // Agregar botón de historial en el encabezado
  return (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#fff8f1' // Color de fondo del home
    }}>
      <Paper elevation={2} sx={{ 
        p: 2, 
        bgcolor: '#A7C7E7', // Color principal más suave
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h6" color="white">
          Take a Break - Chat
        </Typography>
        <Button 
          color="inherit" 
          onClick={() => setDrawerOpen(true)}
          startIcon={<HistoryIcon />}
        >
          Historial
        </Button>
      </Paper>

      {/* Panel lateral de historial */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 320 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Historial de Mensajes
          </Typography>
          {Object.entries(groupMessagesByDate()).map(([date, msgs]) => (
            <Box key={date} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ 
                bgcolor: theme.palette.primary.light,
                p: 1,
                borderRadius: 1,
                mb: 1
              }}>
                {date}
              </Typography>
              <List dense>
                {msgs.map((msg, idx) => (
                  <ListItem key={idx}>
                    <ListItemText 
                      primary={msg.text}
                      secondary={msg.timestamp}
                      sx={{ 
                        bgcolor: 'background.paper',
                        p: 1,
                        borderRadius: 1
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Drawer>

      {/* Área de mensajes */}
      <Box sx={{
        flex: 1,
        overflow: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        position: 'relative',
        zIndex: 1
      }}>
        {/* Formas decorativas de fondo */}
        <Box sx={{
          position: 'absolute',
          top: 40,
          left: 40,
          width: 208,
          height: 160,
          bgcolor: '#7dd3fc',
          borderRadius: '60%',
          transform: 'rotate(25deg)',
          opacity: 0.3,
          zIndex: 0
        }}/>
        <Box sx={{
          position: 'absolute',
          bottom: 64,
          right: 40,
          width: 240,
          height: 192,
          bgcolor: '#fde047',
          borderRadius: '50%',
          transform: 'rotate(-20deg)',
          opacity: 0.3,
          zIndex: 0
        }}/>

        <List sx={{ position: 'relative', zIndex: 2 }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                flexDirection: 'column',
                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                mb: 1
              }}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                maxWidth: '70%'
              }}>
                <Avatar sx={{ 
                  bgcolor: message.sender === 'user' ? '#3b82f6' : '#bbf7d0'
                }}>
                  {message.sender === 'user' ? 'U' : 'B'}
                </Avatar>
                <Paper sx={{
                  p: 2,
                  bgcolor: message.sender === 'user' ? '#D6E6F5' : 'white',
                  borderRadius: 3,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <ListItemText 
                    primary={message.text}
                    secondary={message.timestamp}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: message.sender === 'user' ? '#4A6B8A' : '#7B8FA3'
                      }
                    }}
                  />
                </Paper>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

        {/* Área de entrada actualizada */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2,
            bgcolor: 'white',
            borderTop: 1,
            borderColor: 'divider',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              variant="outlined"
              sx={{ bgcolor: 'white' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{ minWidth: 'auto', px: 3 }}
            >
              <SendIcon />
            </Button>
          </Box>
        </Paper>
    </Box>
  );
};

export default Chat;