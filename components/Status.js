import React from 'react';
import { Platform, 
         StatusBar, 
         StyleSheet,
         Text,
         View } from 'react-native';
import NetInfo from '@react-native-community/netinfo'

export default class Status extends React.Component {
    state = {
        info: null,
    };

    async componentWillMount() {
        this.subscription = NetInfo.addEventListener('connectionChange', this.handleChange,);

        const info = await NetInfo.getConnectionInfo();

        this.setState({ info });

        // We can use this to test changes in network connectivity
         setTimeout(() => this.handleChange('none'), 3000);
    }

    // componentWillUnmount() {
    //     this.subscription.remove();
    // }

    handleChange = (info) => {
        this.setState({ info });
    }

    render(){
        const { info } = this.state;
    
        const isConnected = info !== 'none';
        const backgroundColor = isConnected ? 'white' : 'red';

        const statusBar = (
            <StatusBar
                backgroundColor={backgroundColor}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
        )

        const messageContainer = (
            <View style={styles.messageContainer} pointerEvents={'none'}>
                {statusBar}
                {!isConnected && (
                    <View style={styles.bubble}>
                        <Text style={styles.Text}>No network connetion</Text>
                    </View>
                )}
            </View>
        )

        if(Platform.OS === 'ios'){
            return <View style={[styles.status, { backgroundColor }]}>
                {messageContainer}
            </View>
        }

        return messageContainer; // Temporary!
    }
}

const statusHeight = (Platform.OS === 'ios' ? StatusBar.currentHeight : 0);

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    bubble: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    }

})