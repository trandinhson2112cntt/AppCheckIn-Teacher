/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import TodoListComponent from './components/LopComponent/TodoListComponent';
import DetailsTodo from './components/SinhVienComponent/DetailsTodo';
import DanhSachDiemDanhComponent from './components/DanhSachDiemDanh/DanhSachDiemDanhComponent';
import HomeComponent from './components/HomeComponent';

const backgroundColor = '#0067a7';
class App extends React.Component {
	static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Lớp';
        let drawerIcon = () => (
            <Image
                source={require('./images/class-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return {drawerLabel, drawerIcon};
    }
  	render() {
    	return (
      		<RootStack/>
    	);
  	}
};
export default App;
const RootStack = createStackNavigator({
  Home: TodoListComponent,
  Details: DetailsTodo,
  Lop: TodoListComponent,
  DanhSachDiemDanh: DanhSachDiemDanhComponent,
},{
  initialRouteName:'Home',
});
