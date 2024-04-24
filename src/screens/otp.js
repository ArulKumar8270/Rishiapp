import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../../config';
import { fontSize } from '../styles/config';

export const Otp = ({ navigation }) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 4 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const handleSendOtp = () => {
        // Handle sending OTP logic
        console.log('Sending OTP:', value);
        // Add your logic to send OTP to the server or validate it
    };

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', marginBottom: '10%' }}>
                <Text style={{ fontFamily: fonts.CircularStdBlack, color: '#411004', fontSize: fontSize.header1 }}>
                    VALIDATION CODE
                </Text>
                <Text style={{ fontFamily: fonts.CircularStdBook, color: '#411004' }}>
                    We send a code to your registered mobile number
                </Text>
            </View>
            <View style={styles.otpContainer}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    cellCount={4}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    text
                    renderCell={({ index, symbol, isFocused }) => (
                        <View
                            style={[styles.otpbox, isFocused && styles.focusBorder]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            <Text style={styles.otptext}>{symbol ? '*' : (isFocused ? <Cursor /> : null)}</Text>
                        </View>
                    )}
                />
            </View>
            <LinearGradient
                colors={['#440217', '#CF577D', '#440217']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.5 }}
                locations={[0, 0.5, 1]}
                style={styles.button}
            >
                <TouchableOpacity onPress={handleSendOtp}>
                    <Text style={{ color: 'white', fontFamily: fonts.CircularStdBlack }}>Send OTP</Text>
                </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#411004', fontFamily: fonts.CircularStdBook, textAlign: 'center', marginTop: '2%' }}>
                    &#60;BACK TO LOGIN
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    otpContainer: {
        marginHorizontal: '10%',
        marginBottom: '10%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
    },
    otpbox: {
      borderRadius: 10,
      borderColor: '#411004',
      borderWidth: 2,
      //height: '120%',
      width: '17%',
  },
    otptext: {
        fontSize: 25,
        color: 'black',
        //padding: 0,
        textAlign: 'center',
    },
    codeFieldRoot: {
        marginTop: 20,
        // width: 200,
        width: 'auto',
        marginHorizontal: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    focusBorder: {
        borderColor: '#411004',
    },
    button: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: '2%',
        margin: '2%',
        borderRadius: 10,
        alignItems: 'center',
        shadowOffset: { width: -2, height: 4 },
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 6,
        marginLeft: '10%',
    },
});

export default Otp;
