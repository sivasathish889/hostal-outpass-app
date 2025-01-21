import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
  let user;
  
  let isAuthFetchData = async()=>{
    await AsyncStorage.getItem('user').then((data)=>user=data)
    fetch(`${env.CLIENT_URL}/isAuth`, {
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
  }
  useEffect(()=>{
    isAuthFetchData()
  },[])
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})