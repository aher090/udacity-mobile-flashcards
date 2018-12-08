import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class SingleDeck extends Component {
    render() {
        const { title, questions } = this.props
        return (
            <View style={styles.deck}>
                <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={styles.deckTitle}>{title}</Text>
                    <Text style={styles.questions}>
                        {questions && questions.length} cards
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        marginTop: 12,
        height: 120,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 24,
        color: 'white',
    },
    questions: {
        fontSize: 18,
        color: 'white',
    },
})
