import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, Image, TextInput } from "react-native";
import PopupDialog, { SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import { insertNewBuoiThu } from '../../database/allSchema';
class PopupDialogBuoiThuComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:0,
            name:'',
            isAddNew: true
        };
    }

    //Show dialog when update    
    showDialogComponentForUpdate = (existingBuoiThu) => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle: 'Update a BuoiThu',             
            id: existingBuoiThu.id,
            name: existingBuoiThu.name,
            isAddNew: false
        })
    };

    //show dialog when add new "BuoiThu"
    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle:'Add new BuoiThu',
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
                    <TextInput style={styles.textInput} placeholder="Enter BuoiThu name" autoCorrect={false}
                        onChangeText={(text) => this.setState({ name: text })} value={this.state.name}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.name.trim() == "") {
                                alert("Please enter BuoiThu");
                                return;
                            }
                            this.refs.popupDialog.dismiss(() => {
                                if (this.state.isAddNew == true) {
                                    const newBuoiThu = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.name,
                                        creationDate: new Date()
                                    };
                                    insertNewBuoiThu(newBuoiThu).then().catch((error) => {
                                        alert(`Insert new BuoiThu error ${error}`);
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
export default PopupDialogBuoiThuComponent;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
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
