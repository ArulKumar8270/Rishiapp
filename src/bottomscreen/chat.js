import React from 'react'
import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fonts } from '../../config'
import { SIZES } from '../styles/config'

const Chat = ({ navigation }) => {
  const chatlist = [
    {
      key: '1',
      image: require('../assets/zoho.png'),
      time: '12:30 PM',
      name: 'Sivabalan',
      message: 'Hello! How are you?'
    },
    {
      key: '2',
      image: require('../assets/zoho.png'),
      time: '12:30 PM',
      name: 'Arul',
      message: 'Hello! How are you?'
    },
    {
      key: '3',
      image: require('../assets/zoho.png'),
      time: '12:30 PM',
      name: 'guna',
      message: 'Hello! How are you?'
    },
    {
      key: '4',
      image: require('../assets/zoho.png'),
      time: '12:30 PM',
      name: 'suriya',
      message: 'Hello! How are you?'
    },
    // Add more chat objects as needed
  ]

  const chatrender = ({ item }) => (
    <SafeAreaView style={styles.chatItem}>
      <TouchableOpacity
        style={styles.chatTouchable}
        onPress={() => {navigation.navigate('ConversationScreen',{item})}}
      >
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.chatImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.messageText}>{item.message}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )

  return (
    <SafeAreaView style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <ImageBackground source={require('../assets/Background.png')} style={styles.container}>
        <FlatList
          data={chatlist}
          renderItem={chatrender}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.flatliststyle}
        />
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    padding: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.body1,
    fontFamily: fonts.CircularStdBlack,
    color: '#000',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  flatliststyle: {
    alignItems: 'center',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#440217',
    width: '100%',
  },
  chatTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 15,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 12,
    color: '#D3D3D3',
    marginBottom: 5,
  },
  nameText: {
    fontSize: SIZES.h2,
    fontFamily: fonts.CircularStdBlack,
    color: '#fff',
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
  },
})
