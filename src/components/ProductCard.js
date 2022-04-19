import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ProductCard = ({ onPressEdit, onPressDelete, item, index }) => {
    const [toogle, setToogle] = useState(false)
    return (
        <View style={styles.cardContainer}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.avatar} onPress={() => setToogle( !toogle )}>
                    <Image source={{ uri: item.product_image }} style={{ width: 50, height: 50, borderRadius: 80 }} transition={false}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.labelContainer} onPress={() => setToogle( !toogle )}>
                    <Text style={styles.label}>{item.product_name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={onPressEdit}>
                    <MaterialIcons name='edit' size={hp("3.5%")} color="#C1B421" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={onPressDelete} >
                    <MaterialIcons name='delete' size={hp("3.5%")} color="#ff0000" />
                </TouchableOpacity>
            </View>
            {
                (toogle) &&
                <View style={[styles.row, { marginTop: 8 }]}>
                    <View style={styles.productdetails}>
                        <Text style={styles.text}>Price: <Text style={[styles.text, {color: '#000'}]}>{item.product_price}</Text></Text>
                    </View>
                    <View style={styles.productdetails}>
                        <Text style={styles.text}>Offer Price: <Text style={[styles.text, {color: '#000'}]}>{item.product_offerprice}</Text></Text>
                    </View>
                </View>
            }

        </View>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    avatar: {
        paddingRight: 10
    },
    cardContainer: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#fff',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    row: {
        flexDirection: 'row',
        //justifyContent: 'center',
        //alignItems: 'center'
    },
    label: {
        fontSize: hp("2.5%"),
        color: '#000',
        fontWeight: 'bold'
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    iconContainer: {
        padding: 12,
        marginHorizontal: 5
    },
    productdetails: {
        //flex: 0.5,
        marginHorizontal: 15,
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        color: '#C1B421'
    }
})