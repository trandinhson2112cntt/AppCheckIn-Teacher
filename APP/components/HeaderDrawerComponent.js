import React, { Component } from 'react';
import Button from 'react-native-button';
import {
    Text, View, Image, TouchableHighlight
} from 'react-native';
export default class HeaderDrawerComponent extends Component {
    render() {
        return (
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'flex-start',  alignItems: 'center' }}>
                <TouchableHighlight style={{ marginLeft: 10, marginTop: 10 }}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate('DrawerOpen');
                    }}>
                    <Image
                        style={{ width: 22, height: 22 }}
                        source={require('../images/menu-icon.png')}
                    />
                </TouchableHighlight>
            </View>);
    }
}