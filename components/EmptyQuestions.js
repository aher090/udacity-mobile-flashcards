import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function EmptyQuestions(){
    return(
        <View style={styles.emptyQue}>
            <Text>Sorry! You can not take a quiz. </Text>    
        </View>
    )
}

const styles = StyleSheet.create({
    emptyQue: {
      flex: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 12,
      fontSize: 50
    },
  })