import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, TextInput } from "react-native";
import PopupDialog,{ SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import { insertNewTodo, updateTodo } from '../../database/allSchema';
class PopupDialogDetailComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            name: '',
            mssv:'',
            isAddNew: true
        };
    }

    //Show dialog when update    
    showDialogComponentForUpdate = (existingTodoList) => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle: 'Update a Todo',             
            id: existingTodoList.id,
            name: existingTodoList.name,
            isAddNew: false
        })
    };

    //show dialog when add new "todo"
    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle:'Add new Todo',
            name: '',
            mssv: '',
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
                    <TextInput style={styles.textInput} placeholder="Nhap ten SV" autoCorrect={false}
                        onChangeText={(text) => this.setState({ name: text })} value={this.state.name}
                    />
                    <TextInput style={styles.textInput} placeholder="Nhap MSSV" autoCorrect={false}
                        onChangeText={(text) => this.setState({ mssv: text })} value={this.state.mssv}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.name.trim() == "") {
                                alert("Please enter todo' name");
                                return;
                            }
                            this.refs.popupDialog.dismiss(() => {
                                if (this.state.isAddNew == true) {
                                    const newTodoList = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.name,
                                        mssv: this.state.mssv,
                                        todoListID: this.props.todoListID
                                    };
                                    insertNewTodo(newTodoList).then().catch((error) => {
                                        alert(`Insert new todo error ${error}`);
                                    });
                                } else {
                                    const todo = {    
                                        id:  this.state.id,
                                        name: this.state.name,                                        
                                    };    
                                    //Goi ham update ben file database
                                    updateTodo(todo).then().catch((error) => {
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
export default PopupDialogDetailComponent;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: 120,
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
