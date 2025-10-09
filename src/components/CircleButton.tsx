import { JSX } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Children {
  children: string;
}
const CircleButton = (porps: Children): JSX.Element => {
const { children } = porps;
  return (
    <View style={styles.circleButton}>
        <Text style={styles.circleButtonLabel}>{children}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#467FD3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    shadowColor: '#000000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {width: 8, height: 8},
    elevation: 8
  },
  circleButtonLabel: {
    color: '#ffffff',
    fontSize: 40,
    lineHeight: 48,
  }
})

export default CircleButton;
