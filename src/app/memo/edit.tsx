import { JSX, useState, useEffect } from 'react'
import { doc, getDoc, setDoc, Timestamp}  from 'firebase/firestore'
import {
  View, TextInput, StyleSheet,
  Alert
} from 'react-native'
import KeyboardAvoidingView from '../../components/keyboardAvoidingView'
import { router, useLocalSearchParams } from 'expo-router'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/icon'
import { auth, db } from '../../config'

const handlePress = (id: string, bodyText: string): void => {
  if(auth.currentUser === null) { return }
  const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
  setDoc(ref, {
    bodyText,
    updatedAt: Timestamp.fromDate(new Date())
  })
  .then(() => {
    router.back()
  })
  .catch((error) => {
    console.log(error)
    Alert.alert('更新に失敗しました')
  })
  router.back()
}
const Edit = (): JSX.Element => {
  const [ bodyText, setBodyText] = useState('')
  const id = String(useLocalSearchParams().id)
  useEffect(() => {
    if(auth.currentUser === null) { return }
    const ref = doc(db, `users/${auth.currentUser.uid}/memos`, id)
    getDoc(ref)
    .then((docRef) => {
      const remoteBodyText = docRef?.data()?.bodyText
      setBodyText(remoteBodyText)
    })
    .catch((error)=> {
      console.log(error)
    })
  }, [])
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          multiline
          style={styles.input}
          value={bodyText}
          onChangeText={(text) => setBodyText(text)}
          autoFocus
        />
      </View>
      <CircleButton onPress={() => handlePress(id, bodyText)}>
        <Icon name='check' size={40} color='#ffffff' />
      </CircleButton>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 32,
    flex: 1,
  },
  input : {
    flex: 1,
    paddingHorizontal: 27,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24
  }
})

export default Edit;
