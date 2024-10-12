import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fundoBemVindo from '../../../assets/welcome.png'; // Certifique-se que a imagem existe

const BemVindo = () => {
  const navigation = useNavigation();

  // Navegar para a tela de Login após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 3000); // 5000 milissegundos = 5 segundos

    // Limpar o timer se o componente for desmontado
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={fundoBemVindo} style={styles.backgroundImage}>
      <View style={styles.bemVindoContainer}>
        <Text style={styles.bemVindoText}>
          Bem-vindo (a) à sua segurança na palma da mão
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bemVindoContainer: {
    justifyContent: 'center', // Centraliza o texto
    alignItems: 'center', // Centraliza verticalmente
    padding: 10,
    marginTop: 600,
    width: '100%', // Faz com que o container ocupe toda a largura
  },
  bemVindoText: {
    fontSize: 20,
    color: '#182b50',
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'left', // Centraliza o texto
    width: '80%',
  },
});

export default BemVindo;
