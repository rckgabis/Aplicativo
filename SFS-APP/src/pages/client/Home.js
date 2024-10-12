import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import MapView from 'react-native-maps';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleMapPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home</Text>
      <View style={styles.mapOuterContainer}>
        <View style={styles.mapContainer}>
          <TouchableOpacity onPress={handleMapPress}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: -23.55052,
                longitude: -46.633308,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              
            />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <MapView
            style={styles.fullMap}
            initialRegion={{
              latitude: -23.55052,
              longitude: -46.633308,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mapOuterContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
  },
  mapContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullMap: {
    width: '90%',
    height: '70%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;