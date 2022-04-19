import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const CustomInput = ({ placeholder, label, keyboardType, upoadImage, onPress, uploading, imageComponent, onChangeText, value }) => {



    if (upoadImage === true) {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                {
                    imageComponent
                }
                <TouchableOpacity style={styles.uploadBtn} onPress={onPress}>
                    {
                        (uploading) ?
                            <ActivityIndicator size="small" color="#fff" animating />
                            :
                            <Text style={styles.btnText}>Upload</Text>
                    }

                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}

export default CustomInput

const styles = StyleSheet.create({
    container: {
        marginTop: 15,

    },
    label: {
        fontSize: hp("2.5%"),
        fontWeight: 'bold',
        marginBottom: 3,
        color: '#000'
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        height: hp("7%"),
        color: '#000'
        //elevation: 3
    },
    uploadBtn: {
        padding: 10,
        backgroundColor: '#E86DEC',
        height: hp("6.5%"),
        justifyContent:'center',
        borderRadius: 10
    },
    btnText: {
        fontSize: hp("2.5%"),
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    }
})