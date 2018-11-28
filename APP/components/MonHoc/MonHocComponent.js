import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { queryAllMonHoc } from '../../database/allSchema';
import realm from '../../database/allSchema';

import Swipeout from 'react-native-swipeout';
import HeaderComponent from '../HeaderComponent';
import PopupDialogMonHocComponent from './PopupDialogMonHocComponent';

let FlatListItem = props => {
    const{ itemIndex, 
                id, tenmonhoc, nhom, sotinchi, sotietLT, sotietTH, tongsotiet,
                popupDialogMonHocComponent, onPressItem} = props;
    showEditModal = () => {
        
    }
    showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                {
                    text:'No',onPress:()=>{},
                    style:'cancel'
                },
                {
                    text:'Yes',onPress:()=>{
                        
                    }
                }
            ],
            { cancelable: true }
        );
    };
    return (
        <Swipeout right={[
            {
                text: 'Edit',
                backgroundColor: 'rgb(81,134,237)',
                onPress: showEditModal
            },
            {
                text: 'Delete',
                backgroundColor: 'rgb(217,80,64)',
                onPress: showDeleteConfirmation
            }
        ]}
        autoClose={true}>
            <TouchableOpacity onPress={onPressItem}>
                <View style = {{backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblue'}}>
                    <Text style={{ fontWeight:'bold', fontSize:18, margin:10}}>{tenmonhoc}</Text>
                    <Text style={{ fontWeight:'bold', fontSize:18, margin:10}}>Nhóm: {nhom}</Text>
                    <Text style={{ fontWeight:'bold', fontSize:18, margin:10}}>Số tín chỉ: {sotinchi}</Text>
                    <Text style={{ fontWeight:'bold', fontSize:18, margin:10}}>Số tiết LT: {sotietLT}   Số tiết TH: {sotietTH}</Text>
                    <Text style={{ fontWeight:'bold', fontSize:18, margin:10}}>Tổng số tiết: {tongsotiet}</Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
}

const backgroundColor = '#0067a7';
class MonHocComponent extends Component {
    //Navigation: Cac trang tuon tac voi nhau qua navigation hay la de chuyen qua lai giua cac trang
    static navigationOptions = ({ navigation })  => {
        let drawerLabel = 'Môn Học';
        let drawerIcon = () => (
            <Image
                source={require('../../images/monhoc-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return { drawerLabel, drawerIcon };
    }
    
    constructor(props){
        super(props);
        this.state = {
            MonHoc:[]
        };

        this.reloadData();//Lay danh sach tat ca MonHoc khi mo MonHoc

        realm.addListener('change', () => {    //Lang nghe su thay doi cua database de cap nhap lai
            this.reloadData()
        });

    }
    reloadData = ()=>{
        queryAllMonHoc()
            .then((MonHoc)=>{
                this.setState({MonHoc});
            })
            .catch((error)=>{
                this.setState({MonHoc:[]});
            });
    }
    render() {
        return (
            <View style={styles.container}>
                {/* jsdạdj */}
                <HeaderComponent 
                    hasAddButton = {true}
                    hasDeleteAllButton={false}
                    showAddTodoList = {
                        ()=>{
                            this.refs.popupDialogMonHocComponent.showDialogComponentForAdd();
                        }
                    }
                />
                <FlatList 
                    style={styles.flatList}
                    data={this.state.MonHoc}
                    renderItem={({item,index}) => 
                    <FlatListItem 
                        {...item} 
                        itemIndex={index}
                        popupDialogMonHocComponent={this.refs.popupDialogMonHocComponent}
                        onPressItem = {()=>
                            this.props.navigation.navigate({
                                itemId:             item.id,
                                itemtenmonhoc:      item.tenmonhoc,
                                itemnhom:           item.nhom,
                                itemsotinchi:       item.sotinchi,
                                itemsotietLTc:      item.sotietLT,
                                itemsotietTH:       item.sotietTH,
                                itemtongsotiet:     item.tongsotiet,
                                itemloaimonhocId:   item.loaimonhocId
                            })
                        }
                    />}
                    keyExtractor={item=>item.id}
                />
                <PopupDialogMonHocComponent ref={"popupDialogMonHocComponent"}/>
            </View>        
        );
    }
}
export default MonHocComponent;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    flatList: {
        flex: 1,
        flexDirection: 'column',
    }
});

//Disable warning
console.disableYellowBox = true