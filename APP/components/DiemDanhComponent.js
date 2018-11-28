import React, {
    Component
} from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Picker,
    Image
} from 'react-native';
import { DanhSachDiemDanh } from '../screenNames';
import { createStackNavigator } from 'react-navigation'
import realm, { insertNewTodo, queryAllBuoiThu, queryAllMonHoc } from '../database/allSchema';
import {updateTodoList,deleteTodoList,hienThiLopTheoKhoa,queryAllTodoLists,queryAllKhoa} from '../database/allSchema';
import DanhSachDiemDanhComponent from './DanhSachDiemDanh/DanhSachDiemDanhComponent';
const backgroundColor = '#0067a7';

class DiemDanhComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        let drawerLabel = 'Điểm Danh';
        let drawerIcon = () => (
            <Image
                source={require('../images/attendance-icon.png')}
                style={{ width: 26, height: 26, tintColor: backgroundColor }}
            />
        );
        return {drawerLabel, drawerIcon};
    }
    constructor(props){
        super(props);
        this.state = {  
            dataLop:[],
            dataKhoa:[],
            dataMonHoc:[],
            dataBuoiThu:[],
            selectedLop:"Chọn lớp",
            selectedKhoa:"Chọn khoa",
            selectedMonHoc:"Chọn môn học",
            selectedBuoi:"Chọn buổi"
        };
        this.reloadDataLop();
        this.reloadDataKhoa();
        this.reloadDataMonHoc();
        this.reloadDataBuoiThu();
        realm.addListener('change', () => {
            this.reloadDataLop(),
            this.reloadDataKhoa()
        });
    }
    reloadDataLop = ()=>{
        queryAllTodoLists()
            .then((dataLop)=>{
                this.setState({dataLop});
            })
            .catch((error)=>{
                this.setState({dataLop:[]});
            });
    }
    reloadDataKhoa = ()=>{
        queryAllKhoa()
            .then((dataKhoa)=>{
                this.setState({dataKhoa});
            })
            .catch((error)=>{
                this.setState({dataKhoa:[]});
            });
    }
    reloadDataMonHoc = ()=>{
        queryAllMonHoc()
            .then((dataMonHoc)=>{
                this.setState({dataMonHoc});
            })
            .catch((error)=>{
                this.setState({dataMonHoc:[]});
            });
    }
    danhsachLopTheoKhoa = (khoaId)=>{
        hienThiLopTheoKhoa(khoaId)
            .then((dataLop)=>{
                this.setState({dataLop});
            })
            .catch((error)=>{
                this.setState({dataLop:[]});
            });
    }
    reloadDataBuoiThu = ()=>{
        queryAllBuoiThu()
            .then((dataBuoiThu)=>{
                this.setState({dataBuoiThu});
            })
            .catch((error)=>{
                this.setState({dataBuoiThu:[]});
            });
    }
    render() {
        return ( <View> 
            
            <Picker
                selectedValue={this.state.selectedKhoa}
                onValueChange={(value) => {this.setState({ selectedKhoa:value });this.danhsachLopTheoKhoa(value)}}
            >
                <Picker.Item label={'Chọn Khoa'}/>
                {this.state.dataKhoa.map((value) => <Picker.Item label={value.name} value={value.id}/>)}
            </Picker>
            <Picker
                
                selectedValue={this.state.selectedLop}
                onValueChange={(value) => this.setState({ selectedLop:value })}
            >
                <Picker.Item label={'Chọn Lớp'}/>
                {this.state.dataLop.map((value) => <Picker.Item label={value.name} value={value.id}/>)}
            </Picker>
            <Picker
                selectedValue={this.state.selectedMonHoc}
                onValueChange={(value) => this.setState({ selectedMonHoc:value })}
            >
                <Picker.Item label={'Chọn môn học'}/>
                {this.state.dataMonHoc.map((value) => <Picker.Item label={value.tenmonhoc} value={value.id}/>)}
            </Picker>
            <Picker
                selectedValue={this.state.selectedBuoi}
                onValueChange={(value) => this.setState({ selectedBuoi:value })}
            >
                <Picker.Item label={'Chọn buổi học'}/>
                {this.state.dataBuoiThu.map((value) => <Picker.Item label={value.name} value={value.id}/>)}                
            </Picker>
            <TouchableOpacity style={styles.button} onPress={() => {
                this.props.navigation.navigate('DanhSachDiemDanh',{
                    itemKhoaId:     this.state.selectedKhoa,
                    itemLopId:      this.state.selectedLop,
                    itemMonHocId:   this.state.selectedMonHoc,
                    itemBuoiThuId:  this.state.selectedBuoi,
                })
            }}>
                <Text style={styles.textLabel}>Điểm danh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
                this.props.navigation.navigate('DanhSachVangMat',{
                    itemKhoaId:     this.state.selectedKhoa,
                    itemLopId:      this.state.selectedLop,
                    itemMonHocId:   this.state.selectedMonHoc,
                    itemBuoiThuId:  this.state.selectedBuoi,
                })
            }}>
                <Text style={styles.textLabel}>Vắng mặt</Text>
            </TouchableOpacity>

        </View>
        )
    }
}
export default DiemDanhComponent;
 
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