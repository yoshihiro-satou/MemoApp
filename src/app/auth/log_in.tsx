import { JSX, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  Alert,
} from 'react-native'
import { Link, router } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Button from '../../components/Button'
import { auth } from '../../config'
const handlePress = (email: string, password: string): void => {
  //ログイン
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential.user.uid)
    router.replace('/memo/list')
  })
  .catch((error) => {
    const{ code, message} = error
    console.log(code, message)
    Alert.alert(message)
  })
  
}

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {setEmail(text)}}
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='Email-address'
          textContentType='emailAddress'
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize='none'
          secureTextEntry
          placeholder='Password'
          textContentType='password'
        />
        <Button label='Submit' onPress={() => { handlePress(email, password)}}/>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not registered?</Text>
          <Link href='/auth/sign_up' asChild replace>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign up here</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#ffffff',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16
  },
  footer: {
    flexDirection: 'row'
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#000000'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#467FD3'
  }
})
export default Login;
