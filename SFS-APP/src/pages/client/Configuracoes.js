import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

const Configuracoes = () => {
  const [localizacaoAtiva, setLocalizacaoAtiva] = useState(false);
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(false);
  const [somAtivo, setSomAtivo] = useState(false);
  const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

  useEffect(() => {
    verificarPermissoes();
  }, []);

  const verificarPermissoes = async () => {
    try {
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        Alert.alert(
          'Permissão Obrigatória',
          'A permissão de localização é obrigatória para o funcionamento do aplicativo. Caso queira entender mais sobre os motivos, acesse a aba Sobre do aplicativo nos Termos e Políticas.'
        );
      } else {
        setLocalizacaoAtiva(true);
      }
      
      const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
      setNotificacoesAtivas(notificationStatus === 'granted');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível verificar as permissões.');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const ConfigItem = ({ label, iconName, value, onValueChange, disabled = false }) => (
    <View style={styles.configContainer}>
      <View style={styles.labelContainer}>
        <AntDesign name={iconName} size={24} color="#105587" style={styles.iconLabel} />
        <Text style={styles.configLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={() => {
          if (label === 'Permitir Localização' && !value) {
            Alert.alert(
              'Permissão Obrigatória',
              'A permissão de localização é obrigatória para o funcionamento do aplicativo. Caso queira entender mais sobre os motivos, acesse a aba Sobre do aplicativo nos Termos e Políticas.'
            );
          } else {
            onValueChange(!value);
          }
        }}
        thumbColor={value ? '#105587' : '#f4f4f4'}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        disabled={disabled}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <AntDesign name="setting" size={50} color="#105587" style={styles.icon} />
      <Text style={styles.title}>Configurações</Text>

      <ConfigItem
        label="Permitir Localização"
        iconName="enviromento"
        value={localizacaoAtiva}
        onValueChange={() => {}}
        disabled={true}
      />
      <ConfigItem
        label="Permitir Notificações"
        iconName="bells"
        value={notificacoesAtivas}
        onValueChange={(value) => setNotificacoesAtivas(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f8fa',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat_600SemiBold',
    textTransform: 'uppercase',
    color: '#105587',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 40,
  },
  configContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLabel: {
    marginRight: 10,
  },
  configLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
    color: '#333',
  },
});

export default Configuracoes;
