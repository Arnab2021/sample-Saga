import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';

export async function getAllProductAsync() {
    try {
        const productDocument = await firestore()
            .collection('product')
            .orderBy('time', 'desc')
            .get()
            .then(collectionSnapshot => {

                let product_list = []
                collectionSnapshot
                    .forEach(documentSnapshot => {
                        const data = documentSnapshot.data()

                        product_list.push({
                            product_id: documentSnapshot.id,
                            product_name: data.product_name,
                            product_image: data.product_image,
                            product_price: data.product_price,
                            product_offerprice: data.product_offerprice
                        })
                    });
                  //  console.log('getAllProductAsync',product_list);
                return product_list
            });
        return productDocument
    } catch (error) {
        return false
    }

}

const upoadFile = async (image) => {

    const filename = image.fileName

    const task = storage()
        .ref(filename)
        .putFile(image.uri);

    task.on('state_changed', snapshot => {

    });

    try {
        await task;
    } catch (e) {
        console.error(e);
    }
}

export async function addProductToFirebaseAsync(data) {
    try {
        await upoadFile(data.image)
        const url = await storage().ref('/' + data.image.fileName).getDownloadURL().then((url) => {
            return url
        });

        const collection_data = {
            product_name: data.productname,
            product_image: url,
            product_price: data.price,
            product_offerprice: data.offerPrice,
            time: new Date().getTime()
        }

        const response = await firestore()
            .collection('product')
            .add(collection_data)
            .then((res) => {             
                Alert.alert("Success", "Data has been saved!")              
                return {...collection_data, product_id: res._documentPath._parts[1]  }
            }, (err) => {
                console.log(err);
                return false
            });
        return response
    } catch (error) {
        return false
    }

}


export async function editFirebaseDataAsync(data) {
    try {
        let imgurl = data.imageurl
        if (data.image !== null) {
            await upoadFile(data.image)
            imgurl = await storage().ref('/' + data.image.fileName).getDownloadURL().then((url) => {
                return url
            });
        }

        const product_id = data.productid
        const collection_data = {
            product_name: data.productname,
            product_image: imgurl,
            product_price: data.price,
            product_offerprice: data.offerPrice,
            time: new Date().getTime()
        }
      //  console.log('collection_data',collection_data, product_id);
        const response = await firestore()
            .collection('product')
            .doc(product_id)
            .update(collection_data)
            .then(() => {
                Alert.alert("Success", "Data has been Updated!")
                return { ...collection_data, product_id: product_id }
            });
        return response
    } catch (error) {
        return false
    }

}

export async function deleteFirebaseDataAsync(product_id) {

    try {
        const response = await firestore()
            .collection('product')
            .doc(product_id)
            .delete()
            .then(() => {               
                return {product_id: product_id}
            });
        return response
    } catch (error) {
        return false
    }

}