import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, TextInput } from "react-native";
import PopupDialog, { SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import { insertNewKhoa } from '../../database/allSchema';
class PopupDialogKhoaComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:0,
            name:'',
            isAddNew: true
        };
    }

    //Show dialog when update    
    showDialogComponentForUpdate = (existingKhoa) => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle: 'Update a Khoa',             
            id: existingKhoa.id,
            name: existingKhoa.name,
            isAddNew: false
        })
    };

    //show dialog when add new "Khoa"
    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle:'Add new Khoa',
            name: '',
            isAddNew: true
        })
    };

    render() {
        const { dialogTitle } = this.state;
        return (
            <PopupDialog
                dialogTitle={<DialogTitle title={dialogTitle} />}
                width={0.7} height={180}
                ref={"popupDialog"}
            >
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder="Enter Khoa name" autoCorrect={false}
                        onChangeText={(text) => this.setState({ name: text })} value={this.state.name}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.name.trim() == "") {
                                alert("Please enter khoa' name");
                                return;
                            }
                            this.refs.popupDialog.dismiss(() => {
                                if (this.state.isAddNew == true) {
                                    const newKhoa = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.name
                                    };
                                    insertNewKhoa(newKhoa).then().catch((error) => {
                                        alert(`Insert new khoa error ${error}`);
                                    });
                                } 
                                else {
                                    
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
export default PopupDialogKhoaComponent;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: 180,
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
