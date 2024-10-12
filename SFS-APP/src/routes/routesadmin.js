import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, DrawerLayoutAndroid, Alert, Image } from 'react-native';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SimpleLineIcons, Feather, AntDesign, FontAwesome, EvilIcons } from '@expo/vector-icons';
import { auth } from '../services/firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Home from '../pages/admin/Home';
import Alertas from '../pages/admin/Alertas';
import Relatorio from '../pages/admin/Relatorio';
import Chamados from '../pages/admin/Chamados';
import Conta from '../pages/admin/Conta';
import Configuracoes from '../pages/admin/Configuracoes';
import Sobre from '../pages/admin/Sobre';
import Clientes from '../pages/admin/Clientes';
import Usuarios from '../pages/admin/Usuarios';

// Componente de cabeçalho personalizado com Menu Lateral
function Header({ openDrawer }) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.menuIconContainer} onPress={openDrawer}>
        <Feather name="menu" size={28} color="white" />
      </TouchableOpacity>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.bellIconContainer}>
        <EvilIcons name="bell" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function ScreenWithHeader({ component: Component, openDrawer }) {
  const [fontsLoaded] = useFonts({ Montserrat_400Regular });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Header openDrawer={openDrawer} />
      <Component />
    </View>
  );
}

export function AdminTabNavigator({ navigation }) {
  const drawer = useRef(null);
  const [userName, setUserName] = useState('');
  const [fontsLoaded] = useFonts({ Montserrat_400Regular });

  useEffect(() => {
    if (fontsLoaded) {
      fetchUserName();
    }
  }, [fontsLoaded]);

  const fetchUserName = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists) {
          setUserName(userDoc.data().name);
        }
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  const openDrawer = () => {
    drawer.current?.openDrawer();
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Confirmar Logout',
      'Você tem certeza que deseja sair da sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: handleLogout },
      ],
      { cancelable: true }
    );
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('Login');
      })
      .catch(error => console.error('Error signing out: ', error));
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ color }) => {
      const icons = {
        Alertas: <Feather name="alert-triangle" size={24} color={color} />,
        Home: <SimpleLineIcons name="home" size={24} color={color} />, 
        Relatório: <AntDesign name="barschart" size={24} color={color} />, 
        Chamados: <Feather name="tool" size={24} color={color} />,
      };
      return icons[route.name] || <Feather name="help-circle" size={24} color={color} />;
    },
    tabBarActiveTintColor: '#FF6A00',
    tabBarInactiveTintColor: '#105587',
    tabBarLabelStyle: { fontFamily: 'Montserrat_400Regular' },
  });

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          <View style={styles.userInfoContainer}>
            <FontAwesome name="user-circle" size={62} color="white" />
            <Text style={styles.userName}>{userName}</Text>
          </View>
          {renderDrawerMenuItem('Conta', 'user', () => navigation.navigate('Conta'))}
          {renderDrawerMenuItem('Configurações', 'settings', () => navigation.navigate('Configurações'))}
          {renderDrawerMenuItem('Console', 'monitor', () => navigation.navigate('Console'))}
          {renderDrawerMenuItem('Sobre', 'info', () => navigation.navigate('Sobre'))}
          {renderDrawerMenuItem('Clientes', 'users', () => navigation.navigate('Clientes'))}
          {renderDrawerMenuItem('Usuários', 'user', () => navigation.navigate('Usuários'))}
          <View style={styles.separator} />
          {renderDrawerMenuItem('Sair', 'log-out', handleLogoutPress)}
        </View>
      )}
      style={{ elevation: 5, zIndex: 999 }}
    >
      <Tab.Navigator initialRouteName="Alertas" screenOptions={screenOptions}>
        <Tab.Screen name="Alertas" children={() => <ScreenWithHeader component={Alertas} openDrawer={openDrawer} />} options={{ headerShown: false }} />
        <Tab.Screen name="Home" children={() => <ScreenWithHeader component={Home} openDrawer={openDrawer} />} options={{ headerShown: false }} />
        <Tab.Screen name="Relatório" children={() => <ScreenWithHeader component={Relatorio} openDrawer={openDrawer} />} options={{ headerShown: false }} />
        <Tab.Screen name="Chamados" children={() => <ScreenWithHeader component={Chamados} openDrawer={openDrawer} />} options={{ headerShown: false }} />
        <Tab.Screen name="Conta" children={() => <ScreenWithHeader component={Conta} openDrawer={openDrawer} />} options={{ headerShown: false, tabBarButton: () => null }} />
        <Tab.Screen name="Configurações" children={() => <ScreenWithHeader component={Configuracoes} openDrawer={openDrawer} />} options={{ headerShown: false, tabBarButton: () => null }} />
        <Tab.Screen name="Sobre" children={() => <ScreenWithHeader component={Sobre} openDrawer={openDrawer} />} options={{ headerShown: false, tabBarButton: () => null }} />
        <Tab.Screen name="Clientes" children={() => <ScreenWithHeader component={Clientes} openDrawer={openDrawer} />} options={{ headerShown: false, tabBarButton: () => null }} />
        <Tab.Screen name="Usuários" children={() => <ScreenWithHeader component={Usuarios} openDrawer={openDrawer} />} options={{ headerShown: false, tabBarButton: () => null }} />
      </Tab.Navigator>
    </DrawerLayoutAndroid>
  );
}

function renderDrawerMenuItem(label, iconName, onPress) {
  return (
    <TouchableOpacity onPress={() => { onPress(); }}>
      <View style={styles.menuItemContainer}>
        <Feather name={iconName} size={20} color="white" />
        <Text style={styles.menuItem}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF6A00',
    padding: 20,
    zIndex: 1,
    paddingTop: 30,
  },
  menuIconContainer: {
    width: 28,
  },
  bellIconContainer: {
    marginLeft: 10,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FF6A00',
    padding: 30,
  },
  menuItem: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 18,
    marginLeft: 10,
    color: '#FFF',
    letterSpacing: 1,
  },
  menuItemContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginBottom: 100,
    marginTop: 50,
    zIndex: 2,
  },
  userName: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 20,
    color: '#FFF',
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  separator: {
    borderBottomColor: '#ffa500',
    borderBottomWidth: 1,
    marginVertical: 20,
    marginTop: 150,
  },
});

export default AdminTabNavigator;