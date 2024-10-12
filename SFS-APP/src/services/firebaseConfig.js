// services/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configurações do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBHtVlVftiQDQKK8Ke2YLWZUnUTUsOWGOM",
    authDomain: "sistema-fenix-services.firebaseapp.com",
    projectId: "sistema-fenix-services",
    storageBucket: "sistema-fenix-services.appspot.com",
    messagingSenderId: "445214265376",
    appId: "1:445214265376:web:5b572b7bb751af2d496c45",
    measurementId: "G-X70BVC9BWR",
};

// Inicialização do Firebase
const app = initializeApp(firebaseConfig);

// Inicialização da autenticação com suporte ao AsyncStorage
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Inicialização do Firestore
export const db = getFirestore(app);