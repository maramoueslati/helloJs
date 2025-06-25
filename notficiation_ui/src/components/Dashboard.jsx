import axios from "axios";
import { useRef, useState } from 'react';

const AndroidDashboard = () => {
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, text: '', type: 'success' });
  const timer = useRef(null);
  const inputRef = useRef(null);
  const BACKEND_URL = "http://54.74.21.41:3000/send-notification"


  const sendNotification = async () => {
  
 const result = await axios.post(BACKEND_URL, {
        title: "New Android Notification",
        message
      });

      console.log("🚀 ~ sendNotification ~ result:", result)
      return result
  };

  const showToast = (text, type = 'success') => {
    setToast({ show: true, text, type });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleSend = async () => {
 
    if (!message.trim()) {
      return showToast('⚠️ Empty message', 'warning');
    }

    setIsLoading(true);
    try {
      
      const result = await sendNotification(message);
      if (result.data.success) {
        showToast('✅ Notification was succefully sent');
        setMessage('');
        inputRef.current?.focus();
              setIsLoading(false);

      } else {
        showToast(`❌ Error : ${result.error || result.message}`, 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('💥 Erreur réseau', 'error');
    } finally {
      setIsLoading(false);
    }
  };

            console.log("🚀 ~ AndroidDashboard ~ 1:", 1)
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)'
    }}>
        
      <div style={{
        background: '#fff',
        padding: 30,
        borderRadius: 8,
        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
        maxWidth: 400,
        width: '90%'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>
          Push Notification
        </h2>

        <textarea
          ref={inputRef}
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Your notification…"
          style={{
            width: '100%',
            padding: 10,
            marginBottom: 15,
            borderRadius: 4,
            border: '1px solid #ccc',
            resize: 'vertical'
          }}
        />

        <button
          onClick={handleSend}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: 12,
            background: '#667eea',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isLoading ? 'sending...' : 'Sending onboard notification'}
        </button>
      </div>

      {toast?.show && (
        <div style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          padding: '10px 15px',
          background: toast.type === 'error' ? '#f44336' : '#4caf50',
          color: '#fff',
          borderRadius: 4,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}>
          {toast.text}
        </div>
      )}
    </div>
  );
};

export default AndroidDashboard;
