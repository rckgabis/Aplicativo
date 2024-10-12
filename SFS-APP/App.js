// Importando dependências necessárias
import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { MainTabNavigator } from './src/routes/routesclient'; // Importando o arquivo de rotas
import BemVindo from './src/pages/login/BemVindo'; // Tela de boas-vindas
import Login from './src/pages/login/Login'; // Tela de login

// Impede a SplashScreen de ser automaticamente escondida ao carregar o app
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false); // Estado para verificar se o app está pronto

  // Carrega as fontes
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Simula um carregamento de 2 segundos para preparar o app
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e); // Loga qualquer erro que ocorra durante o carregamento
      } finally {
        setAppIsReady(true); // Define o estado do app como pronto
      }
    }
    prepare();
  }, []); // Executa apenas uma vez quando o componente é montado

  const onLayoutRootView = useCallback(async () => {
    // Esconde a SplashScreen apenas quando o app estiver pronto e as fontes estiverem carregadas
    if (appIsReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady, fontsLoaded]);

  // Retorna null enquanto o app ou as fontes não estiverem prontas, para evitar renderização incompleta
  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="BemVindo">
        <Stack.Screen 
          name="BemVindo" 
          component={BemVindo} 
          options={{ headerShown: false }} // Esconde o cabeçalho da tela de boas-vindas
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Esconde o cabeçalho da tela de login
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabNavigator} 
          options={{ headerShown: false }} // Esconde o cabeçalho do MainTabNavigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}