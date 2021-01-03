import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput ,ActivityIndicator} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Contants from "expo-constants"
import * as Permissions from 'expo-permissions'
import Fire from "../Fire"
import * as ImagePicker from 'expo-image-picker'
import UserPermissions from '../utilities/UserPermissions'

const firebase = require("firebase");
require("firebase/firestore")    
export default class PostScreen extends React.Component {

    
    state = {
        text: "",
        image: null,
        user:{
            avatar: null,
        }
    };
    
    componentDidMount() {
        UserPermissions.getCameraPermission()
        const user = this.props.uid || Fire.shared.uid

        this.unsubscribe = Fire.shared.firestore.collection("users").doc(user).onSnapshot(doc => {
            this.setState({ user: doc.data() })
        })
    }
    componentWillUnMount() {
        this.unsubscribe();
    }
    handlePost = () => {
        this.props.navigation.goBack();
        Fire.shared
        .addPost({ text: this.state.text.trim(), localUri: this.state.image ,avatar: this.state.user.avatar})
        .then(ref => {
            this.setState({ text: "", image: null });
           
        })
            .catch(error => {
                alert(error);
            });
    };
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri })
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Ionicons name="md-arrow-back" size={24} color="#D8D9DB"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity onPress ={this.handlePost}>
                        <Text style={{ fontWeight: "500" }}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.avatar} source={this.state.user.avatar ? { uri: this.state.user.avatar } : require('../assets/avatar.png')} style={styles.avatar}></Image>
                    <TextInput
                        autoFocus={false}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Bir şey paylaşmak ister misin?"
                        onChangeText={text => this.setState({text})}
                        value={this.state.text}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32} color="#D8D9DB"></Ionicons>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View>
            </SafeAreaView >
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 48,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB",

    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32
    }
});