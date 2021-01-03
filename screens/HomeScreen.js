import React from "react";
import { View, Text, StyleSheet, FlatList,Animated, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import moment from 'moment'
import Fire from '../Fire'
import GestureHandler, { PinchGestureHandler , State} from 'react-native-gesture-handler';

posts = [
];

unsubcribe = null
subcribe = null
export default class HomeScreen extends React.Component {
    state = {
        user: {
            avatar:""
        }
    }
  
    scale = new Animated.Value(1);
    onPinchEvent = Animated.event([
        {nativeEvent: {scale: this.scale}}
    ],{useNativeDriver: true})
    
    onPinchStateChange = (event) => {
        if(event.nativeEvent.oldState === State.ACTIVE){
            Animated.spring(this.scale, {
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }
    componentDidMount() {
    
        this.unsubscribe = Fire.shared.firestore.collection("posts").orderBy('timestamp','desc').onSnapshot(docs => {
             docs.forEach(doc => {
                posts.push(doc.data())
            }); this.setState({ posts })
        })
       
    }
    componentWillUnMount() {
        //this.unsubscribe();
    }
    renderPost = post => {
        return (
            <View style={styles.feedItem}>
                <Image source={{uri:post.avatar}} style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
                        </View>
                        <Ionicons none="ios-more" size={24} color="#73788B" />
                    </View>
                    <Text style={styles.post}>{post.text}</Text>
                    <PinchGestureHandler onGestureEvent={this.onPinchEvent} onHandlerStateChange={this.onPinchStateChange}
                    ><Animated.Image source={{uri:post.image}} style={[styles.postImage,{transform:[
                        {scale: this.scale},
                    ]}]} resizeMode="cover" />
                    </PinchGestureHandler >
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons name="heart-outline" size={24} color="#73788B" style={{ marginRight: 16 }} />
                        <Ionicons name="chatbox" size={24} color="#73788B" style={{ marginRight: 16 }} />
                    </View>
                </View>
            </View>
        );
    };
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Akış</Text>
                </View>
                <FlatList
                    style={styles.feed}
                    data={posts}
                    renderItem={({ item }) => this.renderPost(item)}
                    keyExtractor={item => item.id}
                    showVerticalScroolIndicator={false}
                />
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        elevation: 7
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"


    },
    postImage: {
        
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
});