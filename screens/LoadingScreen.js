import React from "react";
import { View, Text,StyleSheet } from "react-native";
import {ActivityIndicator} from "react-native-paper";
import  firebase from "firebase"
import Fire from '../Fire'
export default class LoadingScreen extends React.Component {
    componentDidMount(){
            firebase.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate(user ? "App" : "Auth")
            });
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>    
            );
    }
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"

    }
});