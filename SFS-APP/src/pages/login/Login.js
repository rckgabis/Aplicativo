import React, { useState } from 'react';
import { View, TextInput, Text, Alert, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import fundoLogin from '../../../assets/fundo-login.png';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const requestPermissions = async () => {
    try {
      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      if (notificationStatus !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão de notificações não foi concedida.');
      }

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert('Permissão negada', 'É necessário conceder permissão de localização para usar o aplicativo.');
        throw new Error('Permissão de localização negada');
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      await requestPermissions();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert('Login bem-sucedido', `Bem-vindo, ${user.email}!`);
      navigation.navigate('Main');
    } catch (error) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <ImageBackground source={fundoLogin} style={styles.backgroundImage}>
      <View style={styles.loginBox}>
        <Text style={[styles.loginTitle, { fontFamily: 'Montserrat_600SemiBold' }]}>LOGIN</Text>

        <View style={styles.inputContainer}>
          <EvilIcons name="envelope" size={24} color="#7a7a7a" style={styles.inputIcon} />
          <TextInput
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { fontFamily: 'Montserrat_400Regular', fontSize: 12, paddingLeft: 40 }]}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="#7a7a7a" style={styles.inputIcon} />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={[styles.input, { fontFamily: 'Montserrat_400Regular', fontSize: 12, paddingLeft: 40 }]}
            secureTextEntry
            textContentType="password"
          />
        </View>

        <View style={{ width: '80%', alignItems: 'flex-end', marginBottom: 10 }}>
          <TouchableOpacity>
            <Text style={{ color: '#7a7a7a', fontFamily: 'Montserrat_400Regular', fontSize: 12 }}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={[styles.errorMessage, { fontFamily: 'Montserrat_400Regular' }]}>{error}</Text> : null}

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
          <Text style={[styles.loginBtnText, { fontFamily: 'Montserrat_600SemiBold' }]}>ACESSAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#7a7a7a', fontFamily: 'Montserrat_400Regular', textAlign: 'center' }}>Não possui uma conta?</Text>
          <Text style={{ color: '#FF5C00', fontFamily: 'Montserrat_400Regular', textAlign: 'center' }}>Cadastre-se já!</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  loginBox: {
    marginTop: 350,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginTitle: {
    fontSize: 18,
    color: '#105587',
    letterSpacing: 7,
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '80%',
    marginBottom: 10,
  },
  inputIcon: {
    position: 'absolute',
    top: 12,
    left: 10,
    zIndex: 1,
  },
  input: {
    height: 50,
    borderColor: '#b9b7b7',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 50,
    fontSize: 14,
    letterSpacing: 2,
    color: '#7a7a7a',
    backgroundColor: '#fff',
  },
  loginBtn: {
    backgroundColor: '#105587',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 2,
  },
  errorMessage: {
    color: '#FF5C00',
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Login;