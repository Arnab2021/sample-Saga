import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { DELETE_PRODUCT, GET_ALL_PRODUCT } from '../redux/type'

import { ProductCard } from '../components';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const nodata = require('../assets/nodata.png')

const HomeScreen = ({ navigation, productstate, getAllProduct, deleteProduct }) => {
    const [product, setProduct] = useState([])

    //console.log( 'product list from home ', productstate.button_loader);

    useEffect(() => {
        setProduct(productstate.product_list)
    }, [productstate.product_list])

    useEffect(() => {
        getAllProduct()
    }, [getAllProduct])

    const renderItem = ({ item, index }) => {

        return (
            <ProductCard
                item={item}
                index={index}
                onPressEdit={() => navigation.navigate("edit", { edit_data: item })}
                onPressDelete={() => deleteProduct(item.product_id)}
            />
        )
    }

    if (productstate.button_loader) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                <ActivityIndicator size="large" color="#000" animating />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
          
            {
                (product.length > 0) &&
                <FlatList
                    data={product}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                    refreshing={productstate.button_loader}
                    onRefresh={() => getAllProduct()}
                />
            }
            {
                (productstate.button_loader === false && product.length == 0) &&
                <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    <Image source={nodata} resizeMode="contain" style={{ width: widthPercentageToDP("100%"), height: heightPercentageToDP("100%") }} />
                </View>
            }


        </SafeAreaView>
    )
}

const mapstatetoprops = (state) => {
    return {
        productstate: state.productReducer
    }
}
const mapdispatchtoprops = (dispatch) => ({
    getAllProduct: () => {
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: {}
        })
    },
    deleteProduct: (product_id) => {
        dispatch({
            type: DELETE_PRODUCT,
            payload: product_id
        })
    }
})

export default connect(mapstatetoprops, mapdispatchtoprops)(HomeScreen)

//export default HomeScreen

const styles = StyleSheet.create({
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    }
})