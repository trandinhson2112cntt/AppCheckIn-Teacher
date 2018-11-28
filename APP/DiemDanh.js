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
import DanhSachVangMatComponent from './components/DanhSachDiemDanh/DanhSachVangMatComponent';
import HomeComponent from './components/HomeComponent';
import DiemDanhComponent from './components/DiemDanhComponent';

const backgroundColor = '#0067a7';
class DiemDanh extends React.Component {
	static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Điểm danh';
        let drawerIcon = () => (
            <Image
                source={require('./images/attendance-icon.png')}
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
export default DiemDanh;
const RootStack = createStackNavigator({
  Home: DiemDanhComponent,
  DanhSachDiemDanh: DanhSachDiemDanhComponent,
  DanhSachVangMat: DanhSachVangMatComponent
},{
  initialRouteName:'Home',
});
