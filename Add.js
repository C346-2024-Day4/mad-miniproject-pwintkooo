import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, StatusBar} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {dataSource} from "./Data.js";

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})

function Add({navigation}) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [review, setReview] = useState('');
    const [img, setImg] = useState('');
    const [stock, setStock] = useState('Available Stock');
    const [type, setType] = useState('Sneakers');

    const handleButton = () => {
        return(
            navigation.navigate("Home")
        )
    }

    return(
        <View>
            <StatusBar/>
            <View style={styles.container}>
                <View>
                    <Text>Item Details</Text>
                </View>
                <View>
                    <Text>Name:</Text>
                    <TextInput style={{borderWidth: 1}} placeholder='Enter item name...'/>
                </View>
                <View>
                    <Text>Price:</Text>
                    <TextInput style={{borderWidth: 1}} placeholder='Enter price...'/>
                </View>
                <View>
                    <Text>Review:</Text>
                    <TextInput style={{borderWidth: 1}} placeholder="Enter item's review..."/>
                </View>
                <View>
                    <Text>Image:</Text>
                    <TextInput style={{borderWidth: 1}} placeholder='Enter image url...'/>
                </View>
                <RNPickerSelect
                    onValueChange={(value) => setStock(value)}
                    items={[
                        {label: 'Available Stock', value: 'Available Stock'},
                        {label: 'Out of Stock', value: 'Out of Stock'}
                    ]}
                    value = {stock}
                />
                <RNPickerSelect
                    onValueChange={(value) => setType(value)}
                    items={dataSource.map(category => (
                        {label: category.type, value: category.type}
                    ))}
                    value = {type}
                />
                <Button title="SUBMIT" color="green" onPress={handleButton}/>
            </View>
        </View>
    );
}

export default Add;
