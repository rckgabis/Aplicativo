import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from '@expo/vector-icons/Feather';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

const Chamados = () => {
  const [suportes, setSuportes] = useState([]);
  const [selectedSuporte, setSelectedSuporte] = useState('');
  const [tipos, setTipos] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState('');

  const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

  useEffect(() => {
    fetchSuportes();
  }, []);

  useEffect(() => {
    if (selectedSuporte) {
      const suporte = suportes.find((sup) => sup.suporte === selectedSuporte);
      if (suporte) {
        fetchTipos(suporte.id);
      }
    }
  }, [selectedSuporte, suportes]);

  const fetchSuportes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'suporte'));
      const suporteList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuportes(suporteList);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os suportes.');
    }
  };

  const fetchTipos = async (suporteId) => {
    try {
      const tiposRef = collection(db, `suporte/${suporteId}/tipoSuporte`);
      const tiposSnapshot = await getDocs(tiposRef);
      const tipoList = tiposSnapshot.docs.map((doc) => doc.data().tipo);
      setTipos(tipoList);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os tipos de suporte.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedSuporte || !selectedTipo) {
      Alert.alert('Atenção!', 'Por favor, selecione o tipo de suporte e o motivo.');
      return;
    }

    try {
      await addDoc(collection(db, 'suporteSolicitacoes'), {
        suporte: selectedSuporte,
        tipo: selectedTipo,
        dataHora: serverTimestamp(),
        nomeClient: 'Gabriela',
        status: 'Em espera',
        dataAgendamento: null,
      });

      Alert.alert('Sucesso!', 'Sua solicitação de suporte foi enviada!');
    } catch (error) {
      Alert.alert('Erro!', 'Ocorreu um erro ao enviar sua solicitação.');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Feather name="tool" size={50} color="#105587" style={styles.icon} />
        <Text style={styles.mainTitle}>Chamados</Text>
        <Text style={styles.subtitle}>Precisa de ajuda?</Text>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Escolha o tipo de suporte:</Text>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSuporte}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setSelectedSuporte(itemValue);
              setSelectedTipo('');
            }}
          >
            <Picker.Item label="Selecione..." value="" />
            {suportes.map((suporte) => (
              <Picker.Item key={suporte.id} label={suporte.suporte} value={suporte.suporte} />
            ))}
          </Picker>
        </View>

        {selectedSuporte && tipos.length > 0 && (
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Do que você precisa de ajuda?</Text>
          </View>
        )}
        {selectedSuporte && tipos.length > 0 && (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedTipo}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedTipo(itemValue)}
            >
              <Picker.Item label="Selecione..." value="" />
              {tipos.map((tipo, index) => (
                <Picker.Item key={index} label={tipo} value={tipo} />
              ))}
            </Picker>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar Solicitação</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f8fa',
  },
  innerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat_600SemiBold',
    textTransform: 'uppercase',
    color: '#105587',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 10,
  },
  pickerWrapper: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    padding: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Montserrat_400Regular',
  },
  picker: {
    height: 50,
  },
  pickerItem: {
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
    color: '#105587',
  },
  button: {
    backgroundColor: '#105587',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    textTransform: 'uppercase',
  },
});

export default Chamados;