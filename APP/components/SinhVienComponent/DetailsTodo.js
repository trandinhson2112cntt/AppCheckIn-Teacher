import React, { Component } from 'react';
import { View,FlatList,Text,TouchableOpacity,StyleSheet,Alert,Image } from 'react-native';
import Swipeout from 'react-native-swipeout';
import realm from '../../database/allSchema';
import {getTodosFromTodoListID, queryAllTodo, insertNewTodo, deleteTodo } from '../../database/allSchema';

import HeaderComponent from '../HeaderComponent';
import PopupDialogDetailComponent from './PopupDialogDetailComponent';
let FlatListItem = props => {
    const{itemIndex,id,name,mssv,popupDialogDetailComponent,onPressItem} = props;
    showEditModal =()=>{
        popupDialogDetailComponent.showDialogComponentForUpdate({
            id, name, mssv
        });
    };
    showDeleteConfirmation=()=>{
        Alert.alert(
            'Delete',
            'Delete a todo',
            [
                {
                    text:'No',onPress:()=>{},
                    style:'cancel'
                },
                {
                    text:'Yes',onPress:()=>{
                        deleteTodo(id).then().catch(error => {
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
                    <Text style={{ fontWeight:'bold', fontSize:12, margin:10}}>{mssv}</Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
}
class DetailsTodo extends Component{
    static navigationOptions = {
        title:"Sinh Viên",
    };
    
    constructor(props){
        super(props);
        this.state = {  
            todos:[],
        };
        this.props.todoListID = this.props.navigation.state.params.itemId;
        this.reloadData();
        realm.addListener('change', () => {
            this.reloadData()
        });
    }
    reloadData = ()=>{
        queryAllTodo(this.props.navigation.state.params.itemId)
            .then((todos)=>{
                this.setState({todos});
            })
            .catch((error)=>{
                this.setState({todos:[]});
            });
    }
    render() {
        return (
            <View style={styles.container}>
                    <HeaderComponent title={"TodoList"}
                        hasAddButton={true}
                        showAddTodoList={
                            ()=>{
                                this.refs.popupDialogDetailComponent.showDialogComponentForAdd();
                            }
                        }
                    />
                    <FlatList 
                        style={styles.flatList}
                        data={this.state.todos}
                        renderItem={({item,index}) => 
                        <FlatListItem 
                            {...item} 
                            itemIndex={index}
                            popupDialogDetailComponent={this.refs.popupDialogDetailComponent}
                            onPressItem = {()=>
                                this.props.navigation.navigate('Details',{
                                    itemId:item.id,
                                    itemName:item.name,
                                    itemMssv:item.mssv
                                })
                            }
                        />}
                        keyExtractor={item=>item.id}
                    />
                <PopupDialogDetailComponent ref={"popupDialogDetailComponent"} todoListID={this.props.navigation.state.params.itemId}/>
            </View>
        )
    }
}
export default DetailsTodo;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    flatList: {
        flex: 1,
        flexDirection: 'column',
    },       
    addButtonImage: {
        width: 42,
        height: 42,    
        tintColor: 'white'    
    },
});