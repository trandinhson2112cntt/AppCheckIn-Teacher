import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { queryAllBuoiThu } from '../../database/allSchema';
import realm from '../../database/allSchema';

import Swipeout from 'react-native-swipeout';
import HeaderComponent from '../HeaderComponent';
import PopupDialogBuoiThuComponent from './PopupDialogBuoiThuComponent';

let FlatListItem = props => {
    const{ itemIndex, id, name, creationDate, popupDialogBuoiThuComponent, onPressItem} = props;
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
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
}

const backgroundColor = '#0067a7';
class BuoiThuComponent extends Component {
    static navigationOptions  =  ({ navigation }) => {
        let drawerLabel = 'BuoiThu';
        let drawerIcon = () => (
            <Image
                source={require('../../images/BuoiThu-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return {drawerLabel, drawerIcon};
    }
    
    constructor(props){
        super(props);
        this.state = {  
            BuoiThu:[]
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData()
        });
    }
    reloadData = ()=>{
        queryAllBuoiThu()
            .then((BuoiThu)=>{
                this.setState({BuoiThu});
            })
            .catch((error)=>{
                this.setState({BuoiThu:[]});
            });
    }
    render() {
        return (
            
            <View style={styles.container}>
                <HeaderComponent title = {"BuoiThu"}
                    hasAddButton = {true}
                    hasDeleteAllButton={false}
                    showAddTodoList = {
                        ()=>{
                            this.refs.popupDialogBuoiThuComponent.showDialogComponentForAdd();
                        }
                    }
                />
                <FlatList 
                    style={styles.flatList}
                    data={this.state.BuoiThu}
                    renderItem={({item,index}) => 
                    <FlatListItem 
                        {...item} 
                        itemIndex={index}
                        popupDialogBuoiThuComponent={this.refs.popupDialogBuoiThuComponent}
                        onPressItem = {()=>
                            this.props.navigation.navigate({
                                itemId:item.id,
                                itemName:item.name,
                            })
                        }
                    />}
                    keyExtractor={item=>item.id}
                />
                <PopupDialogBuoiThuComponent ref={"popupDialogBuoiThuComponent"}/>
            </View>        
        );
    }
}
export default BuoiThuComponent;
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