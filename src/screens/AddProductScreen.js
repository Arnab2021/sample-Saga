import React, { PureComponent, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

import { CustomInput, CustomButton } from '../components';
import { ADD_PRODUCT } from '../redux/type';

const AddProductScreen = ({addProduct, state}) => {
    //const [uploading, setUploading] = useState(false)
    //const [loading, setLoading] = useState(false)
    const [productname, setProductName] = useState('')
    const [image, setImage] = useState(null)
    const [imageurl, setImageUrl] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    
    

    const _handleAddProduct = async() => {
        if(image == null){
            Alert.alert('Field Required',"Please select an image")
            return
        }
        if(productname == ''){
            Alert.alert('Field Required',"Please give product name")
            return
        }
        if(price == ''){
            Alert.alert('Field Required',"Please give price")
            return
        }
        if(offerPrice == ''){
            Alert.alert('Field Required',"Please give offer price")
            return
        }
        const data = {
            productname,
            image,
            price,
            offerPrice
        }
        
        addProduct(data)
        
    }

    const pickImage = () => {        
        launchCamera({
            mediaType: 'photo',
        }, async (res) => {    
            if (!res.didCancel) {
                setImageUrl(res.assets[0].uri)
                setImage(res.assets[0])
            }    
        });
    }   

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <CustomInput
                    label="Product Name"
                    placeholder="Enter Product Name"
                    onChangeText={(e) => setProductName(e)}
                    value={productname}
                />

                <CustomInput
                    label="Upload Image"
                    upoadImage={true}
                    onPress={pickImage}
                    imageComponent={
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.cameraBtn}>
                                {
                                    (!imageurl) && imageurl == '' ?

                                        <MaterialCommunityIcons
                                            name="camera-plus"
                                            color="#ccc"
                                            size={45}
                                        />
                                        :
                                        <Image
                                            source={{ uri: imageurl }}
                                            style={{ width: "100%", height: "100%", borderRadius: 120 }}

                                        />
                                }
                            </View>
                        </View>
                    }
                    //uploading={uploading}
                />

                <CustomInput
                    label="Price"
                    placeholder="Enter Price"
                    keyboardType="number-pad"
                    value={price}
                    onChangeText={(e) => setPrice(e)}
                />

                <CustomInput
                    label="Offer Price"
                    placeholder="Enter Offer Price"
                    keyboardType="number-pad"
                    value={offerPrice}
                    onChangeText={(e) => setOfferPrice(e)}
                />
               
            </KeyboardAwareScrollView>
            <CustomButton
                    label="Add Product"
                    onPress={() => _handleAddProduct()}
                    isLoading={state.button_loader}
                />
        </SafeAreaView>
    )
}

const mapstatetoprops = (state) => {
    return{
        state: state.productReducer
    }
}

const mapdispatchtoprops = (dispatch) => ({
    addProduct : (data) => {
        dispatch({
            type: ADD_PRODUCT,
            payload: data
        })
    }
})

export default connect(mapstatetoprops, mapdispatchtoprops)(AddProductScreen)

//export default AddProductScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15
    },
    cameraBtn: {
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 120,
        width: 120,
        height: 120,
        backgroundColor: "#ECE4DE",
        alignItems: "center",
        justifyContent: "center",
    },
})