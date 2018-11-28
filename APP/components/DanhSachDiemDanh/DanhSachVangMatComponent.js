import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { queryAllKhoa,queryAllTodo, insertNewBuoiHoc,timkiemSVDaDiemDanh, insertDiemDanh, queryAllDiemDanh } from '../../database/allSchema';
import realm from '../../database/allSchema';
import Swipeout from 'react-native-swipeout';

let FlatListItem = props => {
  const{itemIndex,id,name,mssv,tensv,da,diemdanh,popupDialogDetailComponent,onPressItem} = props;
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
                  <Text style={{ fontWeight:'bold', fontSize:18, margin:10}}>{tensv}</Text>
                  <Text style={{ fontWeight:'bold', fontSize:12, margin:10}}>{mssv}</Text>
                  
                  <Image
                      source={ ( diemdanh )?require('../../images/tich_xanh.png'):require('../../images/dau_x.png')  }
                      style={{ width: 26, height: 26 }}
                  />
              </View>
          </TouchableOpacity>
      </Swipeout>
  );
}

class DanhSachVangMat extends Component {
    static navigationOptions = {
        title:"Danh sách vắng mặt",
        
    };
    constructor(props) {
      super(props);
      this.state = {  
        dsSinhVien:[],
        svDaDiemDanh:[],
        diemdanh:true,
        danhSachSvDiemDanh:[]
      };
      
      this.hienthiDanhSachSV();
      this.hienthiDanhSachSVDiemDanh();
    //   realm.addListener('change', () => {
    //     this.hienthiDanhSachSVDiemDanh()
    //});
    }
    hienthiDanhSachSV = ()=>{
      queryAllTodo(this.props.navigation.getParam('itemLopId','0'))
            .then((dsSinhVien)=>{
                this.setState({dsSinhVien});
            })
            .catch((error)=>{
                this.setState({dsSinhVien:[]});
            });
    }
    hienthiDanhSachSVDiemDanh = () => {
        
        queryAllDiemDanh()
            .then((danhSachSvDiemDanh)=>{
                this.setState({danhSachSvDiemDanh});
            })
            .catch((error)=>{
                this.setState({danhSachSvDiemDanh:[]});
            });
    }
   
    render() {
      const { navigation } = this.props;
      const khoaId = navigation.getParam('itemKhoaId', '0');
      const lopId = navigation.getParam('itemLopId', '0');
      const monhocId = navigation.getParam('itemMonHocId', '0');
      const buoithuId = navigation.getParam('itemBuoiThuId', '0');
      return (
        <View style={styles.container}>
            <FlatList 
                style={styles.flatList}
                data={this.state.danhSachSvDiemDanh}
                renderItem={({item,index}) => 
                  <FlatListItem 
                    {...item} 
                    itemIndex={index}
                    onPressItem = {()=>{
                        
                        const newSinhVien = {
                            id: Math.floor(Date.now() / 1000),
                            tensv: item.name,
                            mssv: item.mssv,
                            diemdanh: true,
                            diemcong: 1,
                            monhocId: this.props.navigation.getParam('itemMonHocId', '0'),
                            buoithuId: this.props.navigation.getParam('itemBuoiThuId', '0')
                        };
                        insertDiemDanh(newSinhVien).then((newSinhVien)=>alert(`Sinh vien ${newSinhVien.tensv} vắng mặt`)).catch((error) => {
                            alert(`Insert new diem error ${error}`);
                        });
                      }
                    }
                  />
                }
              keyExtractor={item=>item.id}
            />
        </View>
      )
    };
}
export default DanhSachVangMat;
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