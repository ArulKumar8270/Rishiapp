import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { fonts } from "../../config";

const CustomTextInput = ({ label, variant, placeholder, error, maxLength, onChangeText, value, containerStyle ,inputStyle,errorStyle,labelStyle}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, isFocused || value ? styles.labelFocused : null,labelStyle]}>
         {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxLength={maxLength}
        value={value}
        style={[
          styles.input,
          variant === 'underline' && styles.underlineInput,
          isFocused && styles.inputFocused,
          inputStyle]}
      />
      {error && <Text style={[styles.errorMessage,errorStyle]}>{error}</Text>}
      <Text style={styles.characterCount}>{value ? value.length : 0}/{maxLength}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    //marginBottom: 20,
    //marginVertical: 20,
  },
  input: {
    height: 40,
    paddingHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    marginTop: 10
  },
  underlineInput: {
    borderBottomWidth: 1.5,
  },
  inputFocused: {
    color: 'black',
    borderBottomColor: '#3498DB',
  },
  label: {
    position: 'absolute',
    top: 14,
    left: 3,
    fontSize: 16,
    color: '#999',
    zIndex: 1,
    transition: 'all 0.3s',
  },
  labelFocused: {
    top: 0.1,
    fontSize: 12,
    color: '#3498DB',
  
  },
  errorMessage: {
    marginTop: 4,
    color: 'red',
  },
  characterCount: {
    alignSelf: 'flex-end',
    marginTop: 4,
    color: '#999',
  },
});

export default CustomTextInput;
