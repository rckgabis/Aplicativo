import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../services/firebaseConfig';
import { AntDesign } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const Relatorio = () => {
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [totalOcorrencias, setTotalOcorrencias] = useState(0);
  const [totalAlertas, setTotalAlertas] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          Alert.alert('Erro', 'Usuário não autenticado.');
          return;
        }

        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          Alert.alert('Erro', 'Dados do usuário não encontrados.');
          return;
        }

        const userSerial = userDoc.data().serial;
        const ocorrenciasQuery = query(collection(db, 'ocorrencias'), where('serial', '==', userSerial));
        const ocorrenciasSnapshot = await getDocs(ocorrenciasQuery);

        const dayCounts = { "Dom": 0, "Seg": 0, "Ter": 0, "Qua": 0, "Qui": 0, "Sex": 0, "Sáb": 0 };
        const categoryCounts = { "Invasão": 0, "Pânico": 0, "Sirene": 0, "Entrada": 0, "Saída": 0 };
        let ocorrenciasTotal = 0;

        ocorrenciasSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          ocorrenciasTotal++;
          if (data.dataHora && data.dataHora.toDate) {
            const date = new Date(data.dataHora.toDate());
            const day = daysOfWeek[date.getDay()];
            dayCounts[day] += 1;
          }
          if (data.tipoDaOcorrencia) {
            categoryCounts[data.tipoDaOcorrencia] = (categoryCounts[data.tipoDaOcorrencia] || 0) + 1;
          }
        });

        setTotalOcorrencias(ocorrenciasTotal);

        setLineData({
          labels: daysOfWeek,
          datasets: [
            {
              data: Object.values(dayCounts),
              color: (opacity = 1) => `rgba(255, 102, 1, ${opacity})`,
              strokeWidth: 2,
            },
          ],
        });

        const chamadosQuery = query(collection(db, 'suporteSolicitacoes'), where('serial', '==', userSerial));
        const chamadosSnapshot = await getDocs(chamadosQuery);

        const chamadosCounts = { "Técnico": 0, "Monitoramento": 0 };

        chamadosSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.suporte) {
            chamadosCounts[data.suporte] = (chamadosCounts[data.suporte] || 0) + 1;
          }
        });

        setBarData({
          labels: Object.keys(chamadosCounts),
          datasets: [
            {
              data: Object.values(chamadosCounts),
            },
          ],
        });

        const alertasQuery = query(collection(db, 'ocorrencias'), where('serial', '==', userSerial));
        const alertasSnapshot = await getDocs(alertasQuery);

        const alertasCounts = { "Invasão": 0, "Pânico": 0, "Sirene": 0, "Entrada": 0, "Saída": 0 };
        let alertasTotal = 0;

        alertasSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          alertasTotal++;
          if (data.tipoDaOcorrencia) {
            alertasCounts[data.tipoDaOcorrencia] = (alertasCounts[data.tipoDaOcorrencia] || 0) + 1;
          }
        });

        setTotalAlertas(alertasTotal);

        setPieData(
          Object.keys(alertasCounts).map((key) => ({
            name: key,
            population: alertasCounts[key],
            color: key === 'Pânico' ? 'rgba(255, 99, 132, 1)' : key === 'Sirene' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 206, 86, 1)',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          }))
        );
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados das ocorrências.');
      }
    };

    fetchData();
  }, []);

  const handleDownloadPdf = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Relatório do Cliente</h1>
          <h2>Total de Ocorrências: ${totalOcorrencias}</h2>
          <h2>Total de Alertas: ${totalAlertas}</h2>
          <h3>Dados dos Gráficos</h3>
          <p>Ocorrências Semanais: ${JSON.stringify(lineData?.datasets[0]?.data)}</p>
          <p>Chamados por Categoria: ${JSON.stringify(barData?.datasets[0]?.data)}</p>
          <p>Distribuição de Alertas: ${JSON.stringify(pieData)}</p>
        </body>
      </html>
    `;
    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      const fileUri = `${FileSystem.documentDirectory}relatorio.pdf`;
      await FileSystem.moveAsync({ from: uri, to: fileUri });
      await Sharing.shareAsync(fileUri);
      Alert.alert('Sucesso', 'PDF gerado e baixado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar o PDF.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <AntDesign name="barschart" size={50} color="#105587" style={styles.icon} />
        <Text style={styles.title}>Relatório</Text>

        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPdf}>
          <Text style={styles.downloadButtonText}>Baixar PDF</Text>
        </TouchableOpacity>

        {/* Containers de Totais */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total de Ocorrências</Text>
            <Text style={styles.totalValue}>{totalOcorrencias}</Text>
          </View>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total de Alertas</Text>
            <Text style={styles.totalValue}>{totalAlertas}</Text>
          </View>
        </View>

        {/* Gráfico de Linha */}
        {lineData && (
          <View style={styles.whiteContainer}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Ocorrências Semanais</Text>
              <LineChart
                data={lineData}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(255, 102, 1, ${opacity})`,
                }}
                bezier
              />
            </View>
          </View>
        )}

        {/* Gráfico de Barras */}
        {barData && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
            <View style={styles.whiteContainer}>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Chamados por Categoria</Text>
                <BarChart
                  data={barData}
                  width={Dimensions.get('window').width * 1.5}
                  height={220}
                  chartConfig={{
                    ...chartConfig,
                    backgroundGradientFrom: '#ffffff',
                    backgroundGradientTo: '#ffffff',
                    color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                    formatYLabel: (value) => parseInt(value, 10).toString(),
                  }}
                  yAxisLabel=""
                />
              </View>
            </View>
          </ScrollView>
        )}

        {/* Gráfico de Pizza */}
        {pieData.length > 0 && (
          <View style={styles.whiteContainer}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Distribuição de Alertas</Text>
              <PieChart
                data={pieData}
                width={Dimensions.get('window').width - 40}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                }}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  formatYLabel: (value) => parseInt(value, 10).toString(),
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f8fa',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat_600SemiBold',
    textTransform: 'uppercase',
    color: '#105587',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20,
  },
  downloadButton: {
    backgroundColor: '#105587',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  downloadButtonText: {
    color: '#fff',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
  },
  totalsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 40,
    marginBottom: 20,
  },
  totalBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: (Dimensions.get('window').width - 60) / 2,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#4F4F4F',
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#FF6A00',
  },
  whiteContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: Dimensions.get('window').width - 40,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
    textTransform: 'uppercase',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4F4F4F',
  },
  horizontalScrollView: {
    marginBottom: 20,
  },
});

export default Relatorio;
