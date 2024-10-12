import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Usando MaterialIcons para os ícones de lista

const MenuClient = () => {
  return (
    <View style={styles.menuContainer}>
      {/* Ícone de Lista à Esquerda */}
      <MaterialIcons name="list" size={30} color="white" style={styles.icon} />
      
      {/* Logo da Empresa no Centro */}
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      {/* Ícone de Lista à Direita */}
      <MaterialIcons name="list" size={30} color="white" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF6A00', // Cor de fundo
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100, // Ajuste o tamanho conforme necessário
    height: 50,
    resizeMode: 'contain', // Para garantir que a logo não distorça
  },
  icon: {
    padding: 10,
  },
});

export default MenuClient;
