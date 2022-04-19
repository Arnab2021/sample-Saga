import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { launchCamera } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { CustomInput, CustomButton } from '../components';
import { EDIT_PRODUCT } from '../redux/type';

const EditScreen = ({ editProduct, route, state }) => {
    const [productid, setProductID] = useState('')
    const [productname, setProductName] = useState('')
    const [image, setImage] = useState(null)
    const [imageurl, setImageUrl] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')

    useEffect(() => {
        const data = route.params.edit_data
        console.log('product edit screen', data);
        setProductID(data.product_id)
        setProductName(data.product_name)
        setImageUrl(data.product_image)
        setPrice(data.product_price)
        setOfferPrice(data.product_offerprice)
    }, [route])

    const pickImage = () => {
        launchCamera({
            mediaType: 'photo',
        }, async (res) => {
            if (!res.didCancel) {
                setImageUrl(res.assets[0].uri)
                setImage(res.assets[0])
            }
        }, (err) => {

        });
    }

    const _handleEditProduct = async () => {

        /*if (productname == '') {
            Alert.alert('Field Required', "Please give product name")
            return
        }
        if (image == null) {
            Alert.alert('Field Required', "Please select an image")
            return
        }
        if (price == '') {
            Alert.alert('Field Required', "Please give price")
            return
        }
        if (offerPrice == '') {
            Alert.alert('Field Required', "Please give offer price")
            return
        }*/
        const data = {
            productid,
            productname,
            image,
            imageurl,
            price,
            offerPrice
        }

        editProduct(data)

    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <CustomInput
                    label="Name"
                    placeholder="Enter Name"
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
                label="Update Product"
                onPress={() => _handleEditProduct()}
                isLoading={state.button_loader}
            />
        </SafeAreaView>
    )
}

const mapstatetoprops = (state) => {
    return {
        state: state.productReducer
    }
}
const mapdispatchtoprops = (dispatch) => ({
    editProduct: (data) => {
        dispatch({
            type: EDIT_PRODUCT,
            payload: data
        })
    }
})
export default connect(mapstatetoprops, mapdispatchtoprops)(EditScreen)
//export default EditScreen

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