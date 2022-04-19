import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomButton = ({ label, onPress, isLoading }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} disabled={isLoading}>
            {
                (isLoading) ?
                    <ActivityIndicator size="small" color="#fff" animating />
                    :
                    <Text style={styles.btnText}>{label}</Text>
            }
        </TouchableOpacity>
    )
}
export default CustomButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#C1B421',
        //paddingVertical: 12,
        borderRadius: 10,
        marginVertical: 10,
        height: hp("7%"),
        justifyContent:'center'
    },
    btnText: {
        fontSize: hp("2.5%"),
        textAlign: 'center',
        color: '#fff'
    }
})