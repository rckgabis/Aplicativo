import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { Feather, MaterialCommunityIcons, MaterialIcons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import * as Location from 'expo-location';
import * as Network from 'expo-network';

const Alertas = () => {
  const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });
  const [location, setLocation] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [plan, setPlan] = useState('');
  const [serial, setSerial] = useState('');
  const [ausenteSwitch, setAusenteSwitch] = useState(true);
  const [sireneSwitch, setSireneSwitch] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      await getLocation();
      await getIPAddress();
      await getUserPlanAndSerial();
    };
    initializeData();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permissão de localização é necessária para enviar alertas.');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Erro ao obter a localização:', error);
    }
  };

  const getIPAddress = async () => {
    try {
      const ip = await Network.getIpAddressAsync();
      setIpAddress(ip);
    } catch (error) {
      console.error('Erro ao obter o IP:', error);
    }
  };

  const getUserPlanAndSerial = async () => {
    try {
      const userDoc = await getDoc(doc(db, 'users', 'userSerial')); // Replace 'userSerial' with the actual user identifier
      if (userDoc.exists()) {
        const userSerial = userDoc.data().serial;
        setSerial(userSerial);
        const clientDoc = await getDoc(doc(db, 'clients', userSerial));
        if (clientDoc.exists()) {
          setPlan(clientDoc.data().tipo_plano);
        }
      }
    } catch (error) {
      console.error('Erro ao obter o plano do cliente:', error);
    }
  };

  const handleAlert = async (tipoAlerta) => {
    if (isActionBlockedForPlan(tipoAlerta)) {
      Alert.alert('Ação Bloqueada', 'Esta ação não está disponível para o plano Basic.');
      return;
    }

    if (!location) {
      Alert.alert('Erro!', 'Localização não disponível.');
      return;
    }

    try {
      await addDoc(collection(db, 'alerta'), {
        serial: serial,
        nomeClient: 'Gabriela',
        dataHora: serverTimestamp(),
        tipo: tipoAlerta,
        localizacao: { lat: location.coords.latitude, lng: location.coords.longitude },
        ip: ipAddress,
      });
      Alert.alert('Alerta Enviado!', `O alerta de ${tipoAlerta} foi enviado com sucesso!`);
    } catch (error) {
      console.error('Erro ao enviar alerta: ', error);
      Alert.alert('Erro!', 'Ocorreu um erro ao enviar o alerta. Por favor, tente novamente.');
    }
  };

  const isActionBlockedForPlan = (tipoAlerta) => {
    return (
      plan === 'basic' &&
      (tipoAlerta === 'Ausente' || tipoAlerta === 'Entrada Assistida' || tipoAlerta === 'Saída Assistida')
    );
  };

  const handleInfoPress = (message) => {
    Alert.alert('Informação', message);
  };

  if (!fontsLoaded) {
    return null;
  }

  const alertButtons = [
    {
      label: 'Pânico',
      color: '#cf0000',
      icon: <Feather name="alert-triangle" size={30} color="#FFF" />, // Icon representing the button
      info: 'Botão de Pânico: Use em caso de emergência para solicitar ajuda imediata.',
      locked: false,
    },
    {
      label: sireneSwitch ? 'Desativar Sirene' : 'Ativar Sirene',
      color: sireneSwitch ? '#008000' : '#f15406',
      icon: <MaterialCommunityIcons name="alarm-light-outline" size={30} color="#FFF" />, // Icon representing the button
      info: 'Ativar Sirene: Use para ativar a sirene de alerta.',
      locked: false,
      switch: sireneSwitch,
      setSwitch: setSireneSwitch,
      switchStyle: { marginTop: -10 },
    },
    {
      label: 'Alerta',
      color: '#fdab12',
      icon: <Feather name="alert-circle" size={30} color="#FFF" />, // Icon representing the button
      info: 'Alerta: Use para emitir um alerta geral.',
      locked: false,
    },
    {
      label: ausenteSwitch ? 'Presente' : 'Ausente',
      color: ausenteSwitch ? '#008000' : '#808080',
      icon: <Feather name="user-x" size={30} color="#FFF" />, // Icon representing the button
      info: 'Ausente: Use para indicar que está ausente do local.',
      locked: plan === 'basic',
      switch: ausenteSwitch,
      setSwitch: setAusenteSwitch,
      switchStyle: { marginTop: -10 },
    },
    {
      label: 'Entrada Assistida',
      color: '#105587',
      icon: <MaterialIcons name="camera-outdoor" size={30} color="#FFF" />, // Icon representing the button
      info: 'Entrada Assistida: Use para solicitar assistência na entrada.',
      locked: plan === 'basic',
    },
    {
      label: 'Saída Assistida',
      color: '#800080',
      icon: <MaterialIcons name="camera-outdoor" size={30} color="#FFF" />, // Icon representing the button
      info: 'Saída Assistida: Use para solicitar assistência na saída.',
      locked: plan === 'basic',
    },
  ];

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Feather name="alert-triangle" size={50} color="#105587" style={styles.icon} />
        <Text style={styles.title}>Alertas</Text>
        <View style={styles.buttonContainer}>
          {alertButtons.map((button, index) => (
            <View key={index} style={styles.buttonWrapper}>
              {button.switch !== undefined ? (
                <View style={[styles.button, { backgroundColor: button.color, opacity: button.locked ? 0.5 : 1 }]}>
                  <View style={styles.buttonContentCentered}>
                    {button.icon}
                    <Text style={styles.buttonText}>{button.label}</Text>
                    {button.locked && <FontAwesome name="lock" size={20} color="#FFF" style={styles.lockIcon} />}
                    <Switch
                      value={button.switch}
                      onValueChange={(value) => {
                        button.setSwitch(value);
                        if (button.label.includes('Sirene') && value) {
                          handleAlert('Sirene Ativada');
                        }
                        if (button.label.includes('Presente') && !value) {
                          handleAlert('Ausente');
                        }
                      }}
                      style={button.switchStyle || { marginTop: 5 }}
                    />
                  </View>
                </View>
              ) : (
                <TouchableOpacity style={[styles.button, { backgroundColor: button.color, opacity: button.locked ? 0.5 : 1 }]} onPress={() => handleAlert(button.label)} disabled={button.locked}>
                  <View style={styles.buttonContentCentered}>
                    {button.icon}
                    <Text style={styles.buttonText}>{button.label}</Text>
                    {button.locked && <FontAwesome name="lock" size={20} color="#FFF" style={styles.lockIcon} />}
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => handleInfoPress(button.info)}>
                <AntDesign name="questioncircleo" size={24} color="lightgray" style={{ marginTop: 5 }} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#f4f8fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 40,
    textTransform: 'uppercase',
    color: '#105587',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    width: '100%',
    height: 120,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContentCentered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 10,
    textAlign: 'center',
  },
  lockIcon: {
    marginTop: 5,
  },
});

export default Alertas;