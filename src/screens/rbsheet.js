import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native';


 const RowBottomsheetContent = ({close}) => {
  return (
    <View style={{ padding: 16, height: '100%', width: '100%' }}>
        <Text>
            welcome rb sheet
        </Text>
<TouchableOpacity onPress={close}>
            <Text>
                close bottom sheet
            </Text>

        </TouchableOpacity>

    </View>
  )
}
export default RowBottomsheetContent;
