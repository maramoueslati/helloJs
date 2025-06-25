// src/services/notificationSender.js - Version avec serveur proxy

// URL du serveur proxy local
const PROXY_SERVER_URL = "http://localhost:3001";

/**
 * Envoie une notification push via le serveur proxy
 */
export const sendPushNotification = async (token, title, body, data = {}) => {
  try {
    console.log('📤 Envoi notification via proxy...', { title, body });

    const payload = {
      token: token,
      title: title,
      body: body,
      data: {
        timestamp: new Date().toISOString(),
        sender: 'dashboard',
        ...data
      }
    };

    const response = await fetch(`${PROXY_SERVER_URL}/send-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      console.log('✅ Notification envoyée avec succès via proxy!');
      return { success: true, result };
    } else {
      console.error('❌ Erreur envoi via proxy:', result);
      return { success: false, error: result };
    }
  } catch (error) {
    console.error('💥 Erreur réseau avec proxy:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Teste la connexion au serveur proxy
 */
export const testProxyConnection = async () => {
  try {
    const response = await fetch(`${PROXY_SERVER_URL}/test`);
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Serveur proxy accessible:', result);
      return true;
    } else {
      console.error('❌ Serveur proxy inaccessible');
      return false;
    }
  } catch (error) {
    console.error('💥 Impossible de contacter le serveur proxy:', error);
    return false;
  }
};

/**
 * Gestionnaire de tokens d'appareils (inchangé)
 */
export const DeviceManager = {
  STORAGE_KEY: 'android-devices',

  getDevices: () => {
    try {
      const stored = localStorage.getItem(DeviceManager.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  addDevice: (token, name = 'Appareil Android') => {
    const devices = DeviceManager.getDevices();
    const existing = devices.find(d => d.token === token);
    
    if (!existing) {
      const newDevice = {
        id: Date.now().toString(),
        token: token,
        name: name,
        addedAt: new Date().toISOString(),
        lastUsed: new Date().toISOString()
      };
      
      devices.push(newDevice);
      localStorage.setItem(DeviceManager.STORAGE_KEY, JSON.stringify(devices));
      return newDevice;
    }
    return existing;
  },

  removeDevice: (deviceId) => {
    const devices = DeviceManager.getDevices();
    const filtered = devices.filter(d => d.id !== deviceId);
    localStorage.setItem(DeviceManager.STORAGE_KEY, JSON.stringify(filtered));
    return filtered;
  }
};

/**
 * Valide un token FCM (inchangé)
 */
export const validateToken = (token) => {
  return token && 
         typeof token === 'string' && 
         token.length > 100 && 
         !token.includes(' ');
};