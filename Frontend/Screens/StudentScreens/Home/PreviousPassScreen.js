import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const PreviousPassScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>PreviousPassScreen</Text>
    </SafeAreaView>
  )
}

export default PreviousPassScreen

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : "center",
    alignItems : "center"
  }
})