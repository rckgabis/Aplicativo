import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Ajuda = () => {
  const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

  if (!fontsLoaded) {
    return null;
  }

  const handleLigar = () => {
    Linking.openURL('tel:36782131');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/5511943355132');
  };

  const handleCartaoVirtual = () => {
    Linking.openURL('https://fenixservices.com.br/cartao-virtual/');
  };

  return (
    <View style={styles.container}>
      <AntDesign name="customerservice" size={50} color="#105587" style={styles.icon} />
      <Text style={styles.title}>Ajuda</Text>

      <TouchableOpacity style={styles.helpItem} onPress={handleLigar}>
        <FontAwesome name="phone" size={24} color="#105587" style={styles.iconLabel} />
        <Text style={styles.helpLabel}>Ligue para a gente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpItem} onPress={handleWhatsApp}>
        <FontAwesome name="whatsapp" size={24} color="#105587" style={styles.iconLabel} />
        <Text style={styles.helpLabel}>Fale com a gente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.helpItem} onPress={handleCartaoVirtual}>
        <AntDesign name="creditcard" size={24} color="#105587" style={styles.iconLabel} />
        <Text style={styles.helpLabel}>Cartão Virtual</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
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
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  iconLabel: {
    marginRight: 10,
  },
  helpLabel: {
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
    color: '#333',
  },
});

export default Ajuda;