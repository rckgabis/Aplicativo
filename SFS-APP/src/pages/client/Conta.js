import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Conta = () => {
  const [userData, setUserData] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userSerial = userDoc.data().serial;
          setUserData(userDoc.data());

          const clientsQuery = query(collection(db, 'clients'), where('serial', '==', userSerial));
          const querySnapshot = await getDocs(clientsQuery);
          if (!querySnapshot.empty) {
            setClientData(querySnapshot.docs[0].data());
          }
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
    }
  };

  const handlePasswordReset = () => {
    const auth = getAuth();
    if (userData && userData.email) {
      sendPasswordResetEmail(auth, userData.email)
        .then(() => {
          Alert.alert('Sucesso', 'Email para redefinição de senha enviado com sucesso.');
        })
        .catch(() => {
          Alert.alert('Erro', 'Não foi possível enviar o email para redefinição de senha.');
        });
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.innerContainerAccount}>
          <FontAwesome name="user-circle" size={62} color="#105587" style={styles.accountIcon} />
          <Text style={styles.title}>Minha Conta</Text>
          {userData && <Text style={styles.username}>{userData.name}</Text>}
        </View>

        <View style={styles.innerContainerUser}>
          <View style={styles.subtitleContainer}>
            <AntDesign name="user" size={24} color="#105587" style={styles.icon} />
            <Text style={styles.subtitle}>Dados do Usuário:</Text>
          </View>
          {userData && (
            <>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Nome:</Text>
                <Text style={styles.value}>{userData.name}</Text>
              </View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{userData.email}</Text>
              </View>
              <View style={styles.fieldContainer}>
                <TouchableOpacity onPress={handlePasswordReset}>
                  <Text style={styles.resetPassword}>Redefinir senha</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {clientData ? (
          <View style={styles.innerContainerClient}>
            <View style={styles.subtitleContainer}>
              <AntDesign name="idcard" size={24} color="#105587" style={styles.icon} />
              <Text style={styles.subtitle}>Dados do Cliente:</Text>
            </View>
            {Object.entries(clientData).map(([key, value]) => (
              <View key={key} style={styles.fieldContainer}>
                <Text style={styles.label}>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</Text>
                <Text style={styles.value}>{typeof value === 'object' && value.seconds ? new Date(value.seconds * 1000).toLocaleDateString() : value}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.noClientData}>Usuário não é cliente.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f8fa',
  },
  innerContainerAccount: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  innerContainerUser: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  innerContainerClient: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  accountIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat_600SemiBold',
    textTransform: 'uppercase',
    color: '#105587',
    textAlign: 'center',
    letterSpacing: 2,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
    color: '#333',
    marginTop: 10,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#105587',
    textTransform: 'uppercase',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 5,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: '#000',
  },
  resetPassword: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#105587',
    textDecorationLine: 'underline',
  },
  noClientData: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: '#ff0000',
    marginTop: 10,
  },
});

export default Conta;