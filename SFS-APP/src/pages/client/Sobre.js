import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { AntDesign } from '@expo/vector-icons';

const Sobre = () => {
  const [fontsLoaded] = useFonts({ Montserrat_400Regular, Montserrat_600SemiBold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <AntDesign name="exclamationcircleo" size={50} color="#105587" style={styles.icon} />
      <Text style={styles.title}>Sobre</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Política de Privacidade do Aplicativo de Segurança Sistema Fenix Services</Text>
        <Text style={styles.sectionContent}>
          Bem-vindo à política de privacidade do Sistema Fenix Services. A sua privacidade e segurança são nossa maior prioridade. Este documento descreve como coletamos, utilizamos, compartilhamos e protegemos as informações dos nossos usuários ao utilizar nosso aplicativo. É fundamental que você compreenda como seus dados são tratados e seus direitos em relação à privacidade.
        </Text>

        <Text style={styles.sectionTitle}>1. Informações Coletadas</Text>
        <Text style={styles.sectionContent}>
          Nosso aplicativo coleta as seguintes informações para permitir o funcionamento adequado dos serviços oferecidos:
        </Text>
        <Text style={styles.sectionContent}>
          - Dados Pessoais: Nome, endereço, e-mail, número de telefone, CPF e outros dados que possam ser necessários para identificar você e fornecer os serviços contratados.
        </Text>
        <Text style={styles.sectionContent}>
          - Dados de Localização: Para utilizar as funções de alerta e pânico, coletamos dados de localização em tempo real. Estes dados são necessários para fornecer suporte rápido e eficaz em caso de emergências.
        </Text>
        <Text style={styles.sectionContent}>
          - Dados de Uso: Informações sobre como você utiliza o aplicativo, como funcionalidades acessadas e tempo de uso, para aprimorar a experiência do usuário e garantir a segurança da aplicação.
        </Text>
        <Text style={styles.sectionContent}>
          - Dados Técnicos: Coletamos informações técnicas do dispositivo, como modelo, sistema operacional, identificadores exclusivos, entre outros, para garantir a compatibilidade e oferecer suporte técnico adequado.
        </Text>

        <Text style={styles.sectionTitle}>2. Uso das Informações</Text>
        <Text style={styles.sectionContent}>
          Utilizamos as informações coletadas para os seguintes fins:
        </Text>
        <Text style={styles.sectionContent}>
          - Prestação dos Serviços de Segurança: Atender suas solicitações de pânico, ativar alertas e sirenes, oferecer monitoramento e suporte em tempo real.
        </Text>
        <Text style={styles.sectionContent}>
          - Melhoria dos Serviços: Aprimorar o desempenho do aplicativo e garantir que as funcionalidades atendam às necessidades dos usuários.
        </Text>
        <Text style={styles.sectionContent}>
          - Suporte Técnico: Identificar problemas técnicos e fornecer assistência adequada quando solicitado.
        </Text>
        <Text style={styles.sectionContent}>
          - Comunicações: Entrar em contato com você para fornecer atualizações sobre o aplicativo, enviar comunicações administrativas ou responder às suas dúvidas e solicitações.
        </Text>

        <Text style={styles.sectionTitle}>3. Compartilhamento de Informações</Text>
        <Text style={styles.sectionContent}>
          Seus dados pessoais são tratados com a mais alta confidencialidade. Compartilhamos informações somente quando estritamente necessário e nas seguintes situações:
        </Text>
        <Text style={styles.sectionContent}>
          - Parceiros de Segurança: Com a empresa Fênix Services, responsável pela segurança, para responder aos alertas e aos pedidos de pânico.
        </Text>
        <Text style={styles.sectionContent}>
          - Autoridades Competentes: Em resposta a solicitações judiciais, cumprimento de obrigações legais ou para proteger os direitos e a segurança dos usuários. O compartilhamento de informações com autoridades será realizado somente mediante estrita observância da legislação aplicável e sempre que necessário para cumprir uma obrigação legal.
        </Text>
        <Text style={styles.sectionContent}>
          - Prestadores de Serviços: Compartilhamos com fornecedores que auxiliam no funcionamento do aplicativo, sempre garantindo que esses terceiros cumpram os padrões de privacidade estabelecidos, e mediante cláusulas contratuais que assegurem a confidencialidade e a proteção dos dados.
        </Text>

        <Text style={styles.sectionTitle}>4. Armazenamento e Segurança dos Dados</Text>
        <Text style={styles.sectionContent}>
          Adotamos medidas de segurança técnicas, organizacionais e administrativas para proteger suas informações contra acesso não autorizado, uso indevido, alteração ou destruição. Utilizamos criptografia de ponta a ponta e protocolos de segurança para garantir a integridade dos dados transmitidos e armazenados. No entanto, o usuário reconhece que nenhuma transmissão de dados pela internet é 100% segura e, portanto, não podemos garantir a segurança absoluta das informações transmitidas.
        </Text>

        <Text style={styles.sectionTitle}>5. Seus Direitos</Text>
        <Text style={styles.sectionContent}>
          Você possui os seguintes direitos sobre seus dados pessoais:
        </Text>
        <Text style={styles.sectionContent}>
          - Acesso e Correção: Solicitar acesso aos dados que possuímos sobre você e pedir a correção de informações incorretas ou incompletas.
        </Text>
        <Text style={styles.sectionContent}>
          - Exclusão dos Dados: Solicitar a exclusão de seus dados pessoais, respeitadas as obrigações legais e contratuais que possam impedir a exclusão imediata.
        </Text>
        <Text style={styles.sectionContent}>
          - Revogação do Consentimento: Retirar o consentimento dado para o uso de seus dados, embora isso possa limitar algumas funcionalidades do aplicativo.
        </Text>
        <Text style={styles.sectionContent}>
          - Portabilidade dos Dados: Solicitar a transferência dos seus dados a outro fornecedor de serviços, conforme previsto na legislação aplicável.
        </Text>
        <Text style={styles.sectionContent}>
          - Oposição e Restrição ao Tratamento: Você pode se opor ou solicitar a restrição do tratamento dos seus dados em determinadas situações, desde que haja justificativa legítima para tal.
        </Text>

        <Text style={styles.sectionTitle}>6. Retenção de Dados</Text>
        <Text style={styles.sectionContent}>
          Os seus dados serão mantidos apenas pelo tempo necessário para cumprir os propósitos para os quais foram coletados, respeitando os requisitos legais e regulatórios aplicáveis. Quando não forem mais necessários, seus dados serão descartados de forma segura e definitiva. O período de retenção dos dados poderá ser ajustado conforme a legislação aplicável e conforme necessário para defesa de interesses legítimos da Fênix Services.
        </Text>

        <Text style={styles.sectionTitle}>7. Alterações nesta Política de Privacidade</Text>
        <Text style={styles.sectionContent}>
          Podemos atualizar esta política de privacidade periodicamente, com o objetivo de refletir mudanças nas práticas de tratamento de dados ou em conformidade com novas exigências legais. Quaisquer alterações serão comunicadas a você por meio do aplicativo ou outros meios apropriados. Recomendamos que você revise esta política regularmente para se manter informado sobre como suas informações estão sendo tratadas. Caso não concorde com as alterações, você deve descontinuar o uso do aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>8. Contato</Text>
        <Text style={styles.sectionContent}>
          Se você tiver quaisquer dúvidas, solicitações ou preocupações sobre esta política de privacidade ou sobre como tratamos suas informações, entre em contato conosco pelo e-mail [sac@fenixservices.com.br] ou pelo telefone [11 98231-6902].
        </Text>

        <Text style={styles.sectionTitle}>9. Consentimento</Text>
        <Text style={styles.sectionContent}>
          Ao utilizar nosso aplicativo, você consente expressamente com a coleta, uso e compartilhamento de suas informações conforme descrito nesta política de privacidade. Garantimos que seus dados serão tratados com a máxima segurança e respeito à sua privacidade. O consentimento fornecido poderá ser revogado a qualquer momento, mediante comunicação formal, respeitando as limitações legais e contratuais.
        </Text>

        <Text style={styles.sectionTitle}>10. Disposições Gerais</Text>
        <Text style={styles.sectionContent}>
          Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) e outras legislações aplicáveis, garantindo que todas as medidas sejam tomadas para proteger seus direitos e assegurar a transparência no tratamento de seus dados pessoais. Em caso de conflito entre esta política e qualquer outra norma, prevalecerão as disposições mais protetivas ao titular dos dados. O uso do aplicativo implica na aceitação de todos os termos aqui descritos, e a Fênix Services não será responsável por qualquer evento decorrente do uso inadequado do aplicativo ou do descumprimento destes termos por parte do usuário.
        </Text>

        <Text style={styles.sectionContent}>Obrigado por confiar no Sistema Fenix Services para cuidar da sua segurança. Continuaremos empenhados em fornecer serviços que priorizem sua tranquilidade e proteção.</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Termos de Uso do Aplicativo Sistema Fenix Services</Text>

        <Text style={styles.sectionTitle}>1. Aceitação dos Termos</Text>
        <Text style={styles.sectionContent}>
          Ao acessar ou utilizar o aplicativo Sistema Fenix Services ("Aplicativo"), você concorda em cumprir e estar legalmente vinculado a estes Termos de Uso. Caso não concorde com qualquer parte destes Termos, você deve descontinuar o uso do Aplicativo imediatamente. Estes Termos constituem um contrato vinculante entre você, o Usuário, e a Fênix Services, desenvolvedora e fornecedora do Aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>2. Descrição dos Serviços</Text>
        <Text style={styles.sectionContent}>
          O Aplicativo oferece serviços de segurança, incluindo a solicitação de pânico, alertas de emergência, ativação de sirene, suporte técnico, e outras funcionalidades relacionadas à segurança pessoal. Estes serviços são destinados exclusivamente para uso pessoal, sendo proibida qualquer forma de uso comercial não autorizado.
        </Text>

        <Text style={styles.sectionTitle}>3. Uso do Aplicativo</Text>
        <Text style={styles.sectionContent}>
          - **Elegibilidade:** Para utilizar o Aplicativo, você deve ser maior de 18 anos ou ter autorização expressa dos pais ou responsáveis legais.
        </Text>
        <Text style={styles.sectionContent}>
          - **Responsabilidade do Usuário:** Você é inteiramente responsável por manter a confidencialidade de suas credenciais de acesso e garantir que todas as atividades realizadas no Aplicativo estejam em conformidade com estes Termos. O uso indevido do Aplicativo, incluindo qualquer comportamento que possa violar a lei ou os direitos de terceiros, é estritamente proibido. Qualquer uso indevido identificado poderá resultar na suspensão imediata dos serviços.
        </Text>
        <Text style={styles.sectionContent}>
          - **Licença de Uso:** A Fênix Services concede a você uma licença limitada, não exclusiva, intransferível e revogável para utilizar o Aplicativo, estritamente de acordo com estes Termos de Uso. Essa licença não implica na transferência de qualquer direito de propriedade intelectual.
        </Text>

        <Text style={styles.sectionTitle}>4. Restrições de Uso</Text>
        <Text style={styles.sectionContent}>
          - **Proibições:** É proibido realizar engenharia reversa, descompilar, modificar, distribuir, copiar ou utilizar qualquer parte do Aplicativo para fins não autorizados. Qualquer tentativa de desvio dessas restrições será considerada uma violação material destes Termos e poderá resultar em medidas legais cabíveis.
        </Text>
        <Text style={styles.sectionContent}>
          - **Comportamento Abusivo:** Você não deve utilizar o Aplicativo para fins ilegais, incluindo, mas não se limitando a, assédio, intimidação, fraude, ou qualquer outra atividade que possa causar dano a outros usuários ou à infraestrutura da Fênix Services. Qualquer comportamento que possa comprometer a segurança do Aplicativo ou dos demais usuários está sujeito a suspensão imediata e permanente.
        </Text>

        <Text style={styles.sectionTitle}>5. Atualizações e Modificações</Text>
        <Text style={styles.sectionContent}>
          A Fênix Services pode, a seu exclusivo critério, modificar, suspender ou descontinuar qualquer parte do Aplicativo ou dos serviços oferecidos, a qualquer momento, sem aviso prévio. A Fênix Services se reserva o direito de atualizar estes Termos de Uso periodicamente, sendo sua responsabilidade revisá-los com frequência para se manter informado sobre possíveis alterações. O uso continuado do Aplicativo após tais modificações constitui aceitação dos Termos revisados. Nenhuma atualização ou modificação destes Termos de Uso implicará na criação de qualquer direito ou expectativa que não esteja expressamente prevista nos mesmos.
        </Text>

        <Text style={styles.sectionTitle}>6. Limitação de Responsabilidade</Text>
        <Text style={styles.sectionContent}>
          Na máxima extensão permitida pela legislação aplicável, a Fênix Services não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou da incapacidade de uso do Aplicativo, incluindo, sem limitação, danos por perda de dados, falhas de comunicação, falha na segurança ou qualquer outro prejuízo decorrente de falhas no funcionamento do Aplicativo. O Aplicativo é oferecido "no estado em que se encontra" e "conforme a disponibilidade", sem garantias de qualquer natureza, expressas ou implícitas. A Fênix Services não garante que o serviço será ininterrupto ou livre de erros, e não se responsabiliza por eventuais falhas no acesso ou na qualidade dos serviços.
        </Text>

        <Text style={styles.sectionTitle}>7. Indenização</Text>
        <Text style={styles.sectionContent}>
          Você concorda em indenizar, defender e isentar a Fênix Services, seus diretores, funcionários e parceiros de quaisquer reivindicações, responsabilidades, danos, perdas e despesas, incluindo honorários advocatícios razoáveis, decorrentes do seu uso indevido do Aplicativo, violação destes Termos de Uso ou infração de direitos de terceiros. Esta obrigação de indenização subsistirá mesmo após o término destes Termos de Uso e/ou a suspensão ou encerramento do uso do Aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>8. Privacidade</Text>
        <Text style={styles.sectionContent}>
          A sua privacidade é muito importante para nós. A coleta, uso e compartilhamento de suas informações pessoais são regidos pela nossa Política de Privacidade, que está disponível no Aplicativo e deve ser lida e aceita antes do uso dos serviços oferecidos. A utilização do Aplicativo implica na aceitação da nossa Política de Privacidade.
        </Text>

        <Text style={styles.sectionTitle}>9. Propriedade Intelectual</Text>
        <Text style={styles.sectionContent}>
          Todos os direitos de propriedade intelectual relacionados ao Aplicativo, incluindo, sem limitação, design, software, logotipos, marcas, textos e outros conteúdos, são de propriedade exclusiva da Fênix Services ou de seus licenciantes. Nenhum destes direitos é transferido para você através do uso do Aplicativo, exceto conforme expressamente previsto nestes Termos. Qualquer uso não autorizado dos elementos do Aplicativo poderá resultar em sanções civis e criminais, conforme previsto pela legislação aplicável.
        </Text>

        <Text style={styles.sectionTitle}>10. Suspensão e Encerramento de Acesso</Text>
        <Text style={styles.sectionContent}>
          A Fênix Services reserva-se o direito de suspender ou encerrar o acesso ao Aplicativo a qualquer momento, sem aviso prévio, caso seja identificada qualquer violação destes Termos de Uso, uso indevido, ou qualquer comportamento que coloque em risco a segurança e o funcionamento do Aplicativo ou a segurança de outros usuários. A suspensão ou encerramento do acesso não isenta o Usuário de suas responsabilidades legais decorrentes do uso do Aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>11. Lei Aplicável e Foro</Text>
        <Text style={styles.sectionContent}>
          Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa decorrente do uso do Aplicativo será submetida ao foro da comarca de São Paulo, Estado de São Paulo, com exclusão de qualquer outro, por mais privilegiado que seja. Qualquer reivindicação deve ser iniciada no prazo de um (1) ano após o fato que originou a reivindicação, sob pena de perda do direito.
        </Text>

        <Text style={styles.sectionTitle}>12. Disposições Finais</Text>
        <Text style={styles.sectionContent}>
          Caso qualquer disposição destes Termos seja considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito. O não exercício de qualquer direito ou disposição destes Termos pela Fênix Services não constituirá uma renúncia a tal direito ou disposição, que poderá ser exercido a qualquer momento. Estes Termos de Uso constituem o acordo integral entre você e a Fênix Services no que diz respeito ao uso do Aplicativo, prevalecendo sobre quaisquer outros entendimentos, acordos ou negociações anteriores.
        </Text>

        <Text style={styles.sectionTitle}>13. Informações da Empresa</Text>
        <Text style={styles.sectionContent}>
          A Fênix Services é registrada sob o CNPJ 24.970.776/0001-00, com sede na Rua Dr. Oscar Egydio de Araújo, 526, CEP 08160-620, São Paulo, SP.
        </Text>

        <Text style={styles.sectionContent}>Obrigado por escolher o Sistema Fenix Services. Estamos empenhados em fornecer serviços de segurança eficientes e confiáveis, priorizando a sua tranquilidade e proteção.</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitleGX}>Desenvolvido por:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://gxsmart.com.br')}>
          <Text style={styles.link}>GX Smart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f8fa',
  },
  contentContainer: {
    padding: 20,
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
    marginBottom: 40,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#a6a6a6',
    marginBottom: 10,
    textTransform: 'uppercase',

  },
  sectionTitleGX: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#a6a6a6',
    marginBottom: 10,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#333',
    marginBottom: 10,
    textAlign: 'justify',
  },
  link: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#7301aa',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Sobre;