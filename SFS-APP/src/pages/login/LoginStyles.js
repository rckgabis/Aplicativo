import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ajusta a imagem para cobrir toda a tela
  },
  loginBox: {
    marginTop: 350,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginTitle: {
    fontSize: 18,
    color: '#105587',
    letterSpacing: 7,
    marginBottom: 20,
  },
  inputContainer: {
    position: 'relative',
    width: '80%',
    marginBottom: 10,
  },
  inputIcon: {
    position: 'absolute',
    top: 12,
    left: 10,
  },
  input: {
    height: 50,
    borderColor: '#b9b7b7',
    borderWidth: 1,
    borderRadius: 40,
    paddingLeft: 50, // Ajusta o padding para dar espaço ao ícone
    fontSize: 14,
    letterSpacing: 2,
    color: '#b9b7b7',
    backgroundColor: '#fff',
  },
  loginBtn: {
    backgroundColor: '#105587',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 2,
  },
  errorMessage: {
    color: '#FF5C00',
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default styles;