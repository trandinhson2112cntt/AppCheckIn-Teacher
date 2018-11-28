import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Picker, Platform, Image, TextInput } from "react-native";
import PopupDialog, { SlideAnimation,DialogTitle} from 'react-native-popup-dialog';
import { insertNewMonHoc } from '../../database/allSchema';
class PopupDialogMonHocComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:                 0,
            tenmonhoc:          '',
            nhom:               '',
            sotinchi:           0,
            sotietLT:           0,
            sotietTH:           0,
            tongsotiet:         0,
            loaimonhocId: 0,
            isAddNew: true
        };
    }

    //Show dialog when update    
    showDialogComponentForUpdate = (existingMonHoc) => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle: 'Update a MonHoc',             
            id:              existingMonHoc.id,
            tenmonhoc:       existingMonHoc.tenmonhoc,
            nhom:            existingMonHoc.nhom,
            sotinchi:        existingMonHoc.sotinchi,
            sotietLT:        existingMonHoc.sotietLT,
            sotietTH:        existingMonHoc.sotietTH,
            tongsotiet:      existingMonHoc.tongsotiet,
            isAddNew: false
        })
    };

    //show dialog when add new "MonHoc"
    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle:'Add new MonHoc',
            tenmonhoc:          '',
            nhom:               '',
            sotinchi:           0,
            sotietLT:           0,
            sotietTH:           0,
            tongsotiet:         0,
            loaimonhocId: 0,
            isAddNew: true
        })
    };

    render() {
        const { dialogTitle } = this.state;
        return (
            <PopupDialog
                dialogTitle={<DialogTitle title={dialogTitle} />}
                width={0.7} height={500}
                ref={"popupDialog"}
            >
                <View style={styles.container}>
                    <TextInput style={styles.textInput} placeholder="Nhập tên Môn Học" autoCorrect={false}
                        onChangeText={(text) => this.setState({ tenmonhoc: text })} value={this.state.tenmonhoc}
                    />
                    <TextInput style={styles.textInput} placeholder="Nhập nhóm" autoCorrect={false}
                        onChangeText={(text) => this.setState({ nhom: text })} value={this.state.nhom}
                    />
                    <TextInput style={styles.textInput} placeholder="Nhập số tín chỉ" autoCorrect={false}
                        onChangeText={(text) => this.setState({ sotinchi: text })} value={this.state.sotinchi}
                    />
                    <TextInput style={styles.textInput} placeholder="Nhập số tiết LT" autoCorrect={false}
                        onChangeText={(text) => this.setState({ sotietLT: text })} value={this.state.sotietLT}
                    />
                    <TextInput style={styles.textInput} placeholder="Nhập số tiết TH" autoCorrect={false}
                        onChangeText={(text) => this.setState({ sotietTH: text })} value={this.state.sotietTH}
                    />
                    <TextInput style={styles.textInput} placeholder="Tổng số tiết???" autoCorrect={false}
                        onChangeText={(text) => this.setState({ tongsotiet: text })} value={this.state.tongsotiet}
                    />
                    <View style={{ width:120 }}>
                        <Picker
                            selectedValue={this.state.loaimonhocId}
                            onValueChange={(value) => this.setState({ loaimonhocId:value })}
                        >
                            <Picker.Item label={'Loại môn học'}/>
                            <Picker.Item label={'Lý thuyết'} value="1"/>
                            <Picker.Item label={'Thực hành'} value="2"/>
                        </Picker>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            if (this.state.tenmonhoc.trim() == "") {
                                alert("Please enter tên môn học!");
                                return;
                            }
                            if (this.state.nhom.trim() == "") {
                                alert("Please enter nhóm!");
                                return;
                            }
                            if (this.state.sotinchi.trim() == "") {
                                alert("Please enter số tín chỉ!");
                                return;
                            }
                            if (this.state.sotietLT.trim() == "") {
                                alert("Please enter số tiết lí thuyết!");
                                return;
                            }
                            if (this.state.sotietTH.trim() == "") {
                                alert("Please enter số tiết thực hành!");
                                return;
                            }
                            if (this.state.tongsotiet.trim() == "") {
                                alert("Please enter tổng số tiết!");
                                return;
                            }
                            this.refs.popupDialog.dismiss(() => {
                                if (this.state.isAddNew == true) {
                                    const newMonHoc = {
                                        id:         Math.floor(Date.now() / 1000),
                                        tenmonhoc:      this.state.tenmonhoc,
                                        nhom:           this.state.nhom,
                                        sotinchi:       parseInt(this.state.sotinchi,10),
                                        sotietLT:       parseInt(this.state.sotietLT,10),
                                        sotietTH:       parseInt(this.state.sotietTH,10),
                                        tongsotiet:     parseInt(this.state.tongsotiet,10),
                                        loaimonhocId:   parseInt(this.state.loaimonhocId,10),
                                    };
                                    insertNewMonHoc(newMonHoc).then().catch((error) => {
                                        alert(`Insert new MonHoc error ${error}`);
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
export default PopupDialogMonHocComponent;
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
