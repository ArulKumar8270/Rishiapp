import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const OPTIONS=[
    {label:'1', value:'red'},
    {label:'1', value:'gren'},
    {label:'1', value:'yellow'},
    {label:'1', value:'pink'},
    {label:'1', value:'white'},
]
const WIDTH=Dimensions.get('window').width; 
const HEIGHT=Dimensions.get('window').height
const Modelpicker = (props) => {
  return (
   <TouchableOpacity onPress={()=>props.changModelVisibility(false)}
   style={styles.container}>
    <View style={[styles.modal,{width:WIDTH-20,height:HEIGHT/2}]}> 

    </View>

   </TouchableOpacity>
  )
}

export default Modelpicker

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    modal:{
        backgroundColor:'green',
        borderBottomEndRadius:10,
        shadowColor:'black'
    }
})