import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BORDERRADIUS, COLORS, colors, SIZES, SPACING } from '../styles/config';
import { fonts } from '../../config';

interface chatHeaderProps{
   jobRoll:string,
   Companyname:string,
}
const ChatHeader: React.FC<chatHeaderProps> = ({ jobRoll,
    Companyname}) => {
  return (
    <View style={[styles.HeaderContainer]}>
        <View style={styles.IconsContainer}>
            <Icons name='office-building-marker-outline' size={30} color={COLORS.primaryWhiteHex} style={styles.IconStyle}/>
        </View>
        <View style={{flexDirection:'column',gap:SPACING.space_4}}>
            <Text style={styles.CompanyRoll}>{jobRoll}</Text>
            <Text style={styles.CompanyName}>{Companyname}</Text>
        </View>
    </View>
  )
}
export default ChatHeader

const styles = StyleSheet.create({
    HeaderContainer:{
        flexDirection:'row',
        gap:SPACING.space_15
    },
    IconsContainer:{
        height:50,
        width:50,
        borderRadius:BORDERRADIUS.radius_25,
        borderWidth:1,
        borderColor:COLORS.primaryWhiteHex
    },
    CompanyRoll:{
        fontSize:SIZES.body1,
        fontFamily:fonts.CircularStdBook,
        color:COLORS.primaryWhiteHex
    },
    CompanyName:{
        fontSize:SIZES.body4,
        fontFamily:fonts.CircularStdBookItalic,
        color:COLORS.primaryWhiteHex
    },
    IconStyle:{
        paddingLeft:SPACING.space_10,
        paddingTop:SPACING.space_8
    }
})