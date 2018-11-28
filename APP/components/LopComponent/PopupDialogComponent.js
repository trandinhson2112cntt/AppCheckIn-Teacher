import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, TextInput, Picker } from "react-native";
import PopupDialog,{ SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import {insertNewTodoList, updateTodoList, queryAllKhoa} from '../../database/allSchema';
class PopupDialogComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:0,
            name:'',
            khoaId:'',
            dataKhoa:[],
            selected:"Chọn Khoa",
            isAddNew: true
        };
        this.reloadData();
    }
    reloadData = ()=>{
        queryAllKhoa()
            .then((dataKhoa)=>{
                this.setState({dataKhoa});
            })
            .catch((error)=>{
                this.setState({dataKhoa:[]});
            });
    }
    //Show dialog when update    
    showDialogComponentForUpdate = (existingTodoList) => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle: 'Update a TodoList',             
            id: existingTodoList.id,
            name: existingTodoList.name,
            isAddNew: false
        })
    };

    //show dialog when add new "todoList"
    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle:'Add new TodoList',
            name: '',
            isAddNew: true
        })
    };

    render() {
        const { dialogTitle } = this.state;
        return (
            <PopupDialog
                dialogTitle={<DialogTitle title={dialogTitle} />}
                width={0.7} height={240}
                ref={"popupDialog"}
            >
                
                <View style={styles.container}>
                    <View style={{ width:120 }}>
                        <Picker
                            selectedValue={this.state.selected}
                            onValueChange={(value) => this.setState({ selected:value })}
                        >
                            <Picker.Item label={'Chọn Khoa'}/>
                            {this.state.dataKhoa.map((value) => <Picker.Item label={value.name} value={value.id}/>)}
                        </Picker>
                    </View>
                    <TextInput style={styles.textInput} placeholder="Enter TodoList name" autoCorrect={false}
                        onChangeText={(text) => this.setState({ name: text })} value={this.state.name}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.name.trim() == "") {
                                alert("Please enter todoList' name");
                                return;
                            }
                            this.refs.popupDialog.dismiss(() => {
                                if (this.state.isAddNew == true) {
                                    const newTodoList = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.name,
                                        khoaId: this.state.selected
                                    };
                                    insertNewTodoList(newTodoList).then().catch((error) => {
                                        alert(`Insert new todoList error ${error}`);
                                    });
                                } 
                                else {
                                    const todoList = {    
                                        id:  this.state.id,
                                        name: this.state.name,                                        
                                    };    
                                    //Goi ham update ben file database
                                    updateTodoList(todoList).then().catch((error) => {
                                        alert(`Update todoList error ${error}`);
                                    });  
                                }
                            });
                        }}>
                            <Text style={styles.textLabel}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => {
                            this.refs.popupDialog.dismiss(() => {
                                console.log('Called Cancel, dismiss popup')
                            });
                        }}>
                            <Text style={styles.textLabel}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </PopupDialog>
        );
    }
}
export default PopupDialogComponent;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width:120,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10
    },
    textLabel: {
        color: 'white',
        fontSize: 18,
    }
});
