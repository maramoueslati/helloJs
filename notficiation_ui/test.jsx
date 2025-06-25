// src/components/NotificationDashboard.jsx

import React, { useState, useEffect, useRef } from 'react';

// The entire ChatDashboard component code goes here...
const ChatDashboard = () => {
  const [message, setMessage] = useState('');
  // ... all the state, functions, and JSX from your original file
  const [lastMessage, setLastMessage] = useState('Aucun message pour le moment...');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, text: '', type: 'success' });
  const [showPreview, setShowPreview] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  
  const inputRef = useRef(null);
  const notificationTimer = useRef(null);

  // Animation d'entrée au chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setDashboardVisible(true);
    }, 100);

    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 700);

    return () => {
      clearTimeout(timer);
      clearTimeout(focusTimer);
    };
  }, []);

  // Fonction pour afficher les notifications
  const showNotification = (text, type = 'success') => {
    setNotification({ show: true, text, type });
    
    clearTimeout(notificationTimer.current);
    notificationTimer.current = setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Fonction pour envoyer le message
  const sendMessage = async (messageText) => {
    if (!messageText.trim()) {
      showNotification('⚠️ Votre message est vide !', 'warning');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setLastMessage(messageText);
      setShowPreview(true);
      showNotification(`✅ Message envoyé : "${messageText}"`);
      setIsLoading(false);
      setMessage('');
      inputRef.current?.focus();
    }, 500);
  };

  const handleSend = () => {
    sendMessage(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(message);
    }
  };

  const handleFocus = () => {
    if (!message && lastMessage === 'Aucun message pour le moment...') {
      showNotification('👋 Bienvenue ! Tapez votre message...');
    }
  };

  // ... All your style objects (bodyStyle, dashboardStyle, etc.) go here ...

  const bodyStyle = {
    margin: 0,
    padding: 20,
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const dashboardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    opacity: dashboardVisible ? 1 : 0,
    transform: dashboardVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
    transition: 'all 0.6s ease'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px'
  };

  const emojiStyle = {
    fontSize: '2.5em',
    marginBottom: '15px',
    display: 'inline-block',
    animation: 'bounce 2s infinite'
  };

  const titleStyle = {
    color: '#333',
    fontSize: '2.2em',
    marginBottom: '10px',
    fontWeight: '700',
    margin: '0 0 10px 0'
  };

  const subtitleStyle = {
    color: '#666',
    fontSize: '1em',
    margin: 0
  };

  const chatContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '15px',
    padding: '8px',
    border: '2px solid #e1e5e9',
    transition: 'all 0.3s ease',
    ...(message && {
      borderColor: '#667eea',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.2)'
    })
  };

  const inputStyle = {
    flex: 1,
    border: 'none',
    background: 'transparent',
    padding: '15px',
    fontSize: '1.1em',
    outline: 'none',
    color: '#333'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: 'white',
    fontSize: '1.2em',
    opacity: isLoading ? 0.5 : 1,
    ...(isLoading && {
      cursor: 'not-allowed'
    })
  };

  const previewStyle = {
    marginTop: '20px',
    padding: '15px',
    background: 'rgba(102, 126, 234, 0.1)',
    borderRadius: '12px',
    borderLeft: '4px solid #667eea',
    opacity: showPreview ? 1 : 0,
    transition: 'opacity 0.3s ease'
  };

  const previewTitleStyle = {
    color: '#333',
    marginBottom: '8px',
    fontSize: '1em',
    fontWeight: '600',
    margin: '0 0 8px 0'
  };

  const previewTextStyle = {
    color: '#666',
    fontSize: '0.9em',
    wordBreak: 'break-word',
    margin: 0
  };

  const notificationStyle = {
    position: 'fixed',
    top: '30px',
    right: '30px',
    background: notification.type === 'success' 
      ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)'
      : 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
    color: 'white',
    padding: '20px 25px',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
    transform: notification.show ? 'translateX(0)' : 'translateX(400px)',
    transition: 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    zIndex: 1000,
    maxWidth: '350px',
    fontWeight: '500'
  };


  return (
    <div style={bodyStyle}>
       {/* ... the entire JSX for your component ... */}
       <div style={dashboardStyle}>
        <div style={headerStyle}>
          <div style={emojiStyle}>💬</div>
          <h1 style={titleStyle}>Dashboard Chat</h1>
          <p style={subtitleStyle}>Tapez votre message et cliquez sur envoyer</p>
        </div>
        
        <div style={chatContainerStyle}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleFocus}
            placeholder="Tapez votre message..."
            autoComplete="off"
            style={inputStyle}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            style={buttonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '';
              }
            }}
            onMouseDown={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'scale(0.95)';
              }
            }}
            onMouseUp={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'scale(1.05)';
              }
            }}
          >
            {isLoading ? '⏳' : '📤'}
          </button>
        </div>

        <div style={previewStyle}>
          <h3 style={previewTitleStyle}>Dernier message envoyé :</h3>
          <p style={previewTextStyle}>{lastMessage}</p>
        </div>
      </div>

      <div style={notificationStyle}>
        <span style={{ fontSize: '1.3em', marginRight: '10px' }}>🔔</span>
        <span>{notification.text}</span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }

        input::placeholder {
          color: #999;
        }

        @media (max-width: 768px) {
          .notification-mobile {
            top: 20px !important;
            right: 20px !important;
            left: 20px !important;
            transform: translateY(${notification.show ? '0' : '-100px'}) !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatDashboard;