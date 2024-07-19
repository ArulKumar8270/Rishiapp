import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConversationScreen = ({route}) => {
  const {params} = route
  return (
    <View>
      <Text>{params.item.name}</Text>
    </View>
  )
}

export default ConversationScreen

const styles = StyleSheet.create({
    container:{
        flex:1
    }
}) 