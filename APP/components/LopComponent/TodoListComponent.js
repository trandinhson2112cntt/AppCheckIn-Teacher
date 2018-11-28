import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image,Picker } from 'react-native';
import { updateTodoList, deleteTodoList, queryAllTodoLists, insertTodos2Todolist, getTodosFromTodoListID } from '../../database/allSchema';
import realm from '../../database/allSchema';

import Swipeout from 'react-native-swipeout';
import HeaderComponent from '../HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

import DetailsTodo from '../SinhVienComponent/DetailsTodo';

let FlatListItem = props => {
    const{ itemIndex, id, name,khoaId, popupDialogComponent, onPressItem} = props;
    showEditModal = () => {
        popupDialogComponent.showDialogComponentForUpdate({
            id, name,khoaId
        });
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
                        deleteTodoList(id).then().catch(error => {
                            alert('Failed to delete todoList with id = ${id}, error = $ {error}');
                        });
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
                    <Text style={{ fontWeight:'bold', fontSize:7, margin:10}}>{khoaId}</Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
}


const backgroundColor = '#0067a7';
class TodoListComponent extends Component {
    static navigationOptions = {
        title:"Lớp",
    };
    
    constructor(props){
        super(props);
        this.state = {  
            todoLists:[]
        };
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData()
        });
    }
    reloadData = ()=>{
        queryAllTodoLists()
            .then((todoLists)=>{
                this.setState({todoLists});
            })
            .catch((error)=>{
                this.setState({todoLists:[]});
            });
        
    }
    render() {
        return (
            
            <View style={styles.container}>
                <HeaderComponent title = {"TodoList"}
                    hasAddButton = {true}
                    hasDeleteAllButton={true}
                    showAddTodoList = {
                        ()=>{
                            this.refs.popupDialogComponent.showDialogComponentForAdd();
                        }
                    }
                />
                <FlatList 
                    style={styles.flatList}
                    data={this.state.todoLists}
                    renderItem={({item,index}) => 
                    <FlatListItem 
                        {...item} 
                        itemIndex={index}
                        popupDialogComponent={this.refs.popupDialogComponent}
                        onPressItem = {()=>
                            this.props.navigation.navigate('Details',{
                                itemId:item.id,
                                itemName:item.name,
                                itemKhoaId: item.khoaId
                            })
                        }
                    />}
                    keyExtractor={item=>item.id}
                />
                <PopupDialogComponent ref={"popupDialogComponent"}/>
            </View>        
        );
    }
}
export default TodoListComponent;
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