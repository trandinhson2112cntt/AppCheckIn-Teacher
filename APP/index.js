import { AppRegistry, Dimensions } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

import HomeComponent from './components/HomeComponent';
import App from './App';
import KhoaComponent from './components/Khoa/KhoaComponent';

import { Home, Lop, Khoa, Sinhvien } from './screenNames';
import DiemDanhComponent from './components/DiemDanhComponent';
import DanhSachDiemDanhComponent from './components/DanhSachDiemDanh/DanhSachDiemDanhComponent';
import MonHocComponent from './components/MonHoc/MonHocComponent';
import BuoiThuComponent from './components/BuoiThu/BuoiThuComponent';
import DiemDanh from './DiemDanh';

var {height, width} = Dimensions.get('window');

let routeConfigs = {
    Home: {
        path: '/Home',
        screen: HomeComponent,
    },
    DiemDanh: {
        path: '/DiemDanh',
        screen: DiemDanh,
    },
    Lop: {
        path: '/Lop',
        screen: App,
    },
    Khoa: {
        path: '/Khoa',
        screen: KhoaComponent,
    },
    MonHoc: {
        path: '/MonHoc',
        screen: MonHocComponent,
    },
    BuoiThu: {
        path: '/BuoiThu',
        screen: BuoiThuComponent,
    },
};
let drawerNavigatorConfig = {    
    initialRouteName: Home,
    drawerWidth: width / 1.5,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',  
    // drawerBackgroundColor: 'orange',
    contentOptions: {
        activeTintColor: 'red',
    },
    // sắp xếp hiển thị order
    //order: [HomeComponent, DiemDanhComponent, KhoaComponent, App, DetailsTodo],
};
const AppDemo = DrawerNavigator(routeConfigs, drawerNavigatorConfig);
AppRegistry.registerComponent('APP', () => AppDemo);