import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from '../pages/Home';
import Alertas from '../pages/Alertas';
import Relatorio from '../pages/Relatorio';
import Chamados from '../pages/Chamados';
import MenuClient from './MenuClient'; // Importando o MenuClient

const Tab = createBottomTabNavigator();

const MenuBarClient = () => {
  return (
    <>
      <MenuClient /> {/* Adicionando o MenuClient aqui */}
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconComponent;

            if (route.name === 'Home') {
              iconComponent = <SimpleLineIcons name="home" size={size} color={color} />;
            } else if (route.name === 'Alertas') {
              iconComponent = <Feather name="alert-triangle" size={size} color={color} />;
            } else if (route.name === 'Relatório') {
              iconComponent = <AntDesign name="barschart" size={size} color={color} />;
            } else if (route.name === 'Chamados') {
              iconComponent = <Feather name="tool" size={size} color={color} />;
            }

            return iconComponent; // Retorna o componente do ícone apropriado
          },
          tabBarActiveTintColor: '#105587', // Cor do ícone ativo
          tabBarInactiveTintColor: '#7a7a7a', // Cor do ícone inativo
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Tab.Screen name="Alertas" component={Alertas} options={{ headerShown: false }} />
        <Tab.Screen name="Relatório" component={Relatorio} options={{ headerShown: false }} />
        <Tab.Screen name="Chamados" component={Chamados} options={{ headerShown: false }} />
      </Tab.Navigator>
    </>
  );
};

export default MenuBarClient;
