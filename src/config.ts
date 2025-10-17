import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STOREBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MEAAGEINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FB_APPID,
};

const app = initializeApp(firebaseConfig)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
const db = getFirestore(app)

export { app, auth, db }

