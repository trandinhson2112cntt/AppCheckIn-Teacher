import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { queryAllKhoa } from '../../database/allSchema';
import realm from '../../database/allSchema';

import Swipeout from 'react-native-swipeout';
import HeaderComponent from '../HeaderComponent';
import PopupDialogKhoaComponent from './PopupDialogKhoaComponent';

let FlatListItem = props => {
    const{ itemIndex, id, name, creationDate, popupDialogKhoaComponent, onPressItem} = props;
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
                    <Text style={{ fontWeight:'bold', fontSize:18, margin:10}}>{name}</Text>
                    {/* <Text style={{ fontSize:18, margin:10}} numberOfLines={2}>{creationDate.toLocaleString()}</Text> */}
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
}

const backgroundColor = '#0067a7';
class KhoaComponent extends Component {
    //Navigation: Cac trang tuon tac voi nhau qua navigation hay la de chuyen qua lai giua cac trang
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Khoa';
        let drawerIcon = () => (
            <Image
                source={require('../../images/khoa-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return {drawerLabel, drawerIcon};
    }
    
    constructor(props){
        super(props);
        this.state = {
            Khoa:[]
        };

        this.reloadData();//Lay danh sach tat ca Khoa khi mo Khoa

        realm.addListener('change', () => {    //Lang nghe su thay doi cua database de cap nhap lai
            this.reloadData()
        });

    }
    reloadData = ()=>{
        queryAllKhoa()
            .then((Khoa)=>{
                this.setState({Khoa});
            })
            .catch((error)=>{
                this.setState({Khoa:[]});
            });
    }
    render() {
        return (
            <View style={styles.container}>
                {/* jsdạdj */}
                <HeaderComponent title = {"Khoa"}
                    hasAddButton = {true}
                    hasDeleteAllButton={false}
                    showAddTodoList = {
                        ()=>{
                            this.refs.popupDialogKhoaComponent.showDialogComponentForAdd();
                        }
                    }
                />
                <FlatList 
                    style={styles.flatList}
                    data={this.state.Khoa}
                    renderItem={({item,index}) => 
                    <FlatListItem 
                        {...item} 
                        itemIndex={index}
                        popupDialogKhoaComponent={this.refs.popupDialogKhoaComponent}
                        onPressItem = {()=>
                            this.props.navigation.navigate({
                                itemId:item.id,
                                itemName:item.name,
                            })
                        }
                    />}
                    keyExtractor={item=>item.id}
                />
                <PopupDialogKhoaComponent ref={"popupDialogKhoaComponent"}/>
            </View>        
        );
    }
}
export default KhoaComponent;
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