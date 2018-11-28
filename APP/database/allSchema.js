import Realm from 'realm';
export const TODOLIST_SCHEMA = "TodoList";              //Table Lớp
export const TODO_SCHEMA = "Todo";                      //Table Sinh Viên
export const KHOA_SCHEMA = "Khoa";
export const BUOITHU_SCHEMA = "Buoi thu";
export const BUOIHOC_SCHEMA = "Buoi hoc";
export const NAMHOC_SCHEMA = "Nam hoc";
export const NHATKYGIAOVIEN_SCHEMA = "Nhat ky giao vien";
export const CHITIETNHATKY_SCHEMA = "Chi tiet nhat ky";
export const MONHOC_SCHEMA = "Mon hoc";
export const LOAIMONHOC_SCHEMA = "Loai mon hoc";
export const QUYCACHTINHDIEM_SCHEMA = "Quy cach tinh diem";
export const DIEMDANH_SCHEMA = "DiemDanh";
// Define your models and their properties
export const TodoSchema = {   //Table Sinh Viên
    name: TODO_SCHEMA, 
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        name: { type: 'string', indexed: true },
        mssv: { type: 'string'},
        done: { type: 'bool', default: false },
        todoListID: 'int',
    }
};
export const TodoListSchema = {      //Table Lớp
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        name: 'string',
        khoaId: 'int'
    }
};
export const KhoaSchema = {
    name: KHOA_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string'
    }
};



// "Buoi thu";
export const BuoiThuSchema = {
    name: BUOITHU_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string'
    }
};
// "Buoi hoc"
export const BuoiHocSchema = {
    name: BUOIHOC_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        buoithuId: 'int',
        monhocId: 'int',
        sinhvienId: 'int',
        diemdanh: 'bool',
        diemcong: 'bool'
    }
};
// "Nam hoc";
export const NamHocSchema = {
    name: NAMHOC_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        namhoc: 'string',
        kyhoc: 'string'
    }
};
// "Nhat ky giao vien";
export const NhatKyGiaoVienSchema = {
    name: NHATKYGIAOVIEN_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        khoaId: 'int',
        monhocId: 'int',
        namhocId: 'int'
    }
};
// "Chi tiet nhat ky";
export const ChiTietNhatKySchema = {
    name: CHITIETNHATKY_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        nhatkygiaovienId: 'int',
        buoithuId: 'string',
        ngay: 'date',
        ca: 'int',
        sotiet: 'int',
        noidung: 'string',
        hinhthuclenlop: 'string',
        nhanxetgiaovien: 'string'
    }
};
// "Mon hoc";
export const MonHocSchema = {
    name: MONHOC_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        tenmonhoc: 'string',
        nhom: 'string',
        sotinchi: 'int',
        sotietLT: 'int',
        sotietTH: 'int',
        tongsotiet: 'int',
        loaimonhocId: 'int'
    }
};
// "Loai mon hoc";
export const LoaiMonHocSchema = {
    name: LOAIMONHOC_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string'
    }
};
// "Quy cach tinh diem";
export const QuyCachTinhDiemSchema = {
    name: QUYCACHTINHDIEM_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        monhocId: 'int',
        lopId: 'int',
        cachtinhdiem: 'string'
    }
};
//Bang phụ
export const DiemDanhSchema = {
    name: DIEMDANH_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',
        mssv: 'string',
        tensv: 'string',
        monhocId: 'int',
        buoithuId: 'int',
        diemdanh: 'bool',
        diemcong: 'int',
    }
};




const databaseOptions = {
    path: '1todoListApp.realm',
    schema: [TodoListSchema, TodoSchema, KhoaSchema,BuoiThuSchema,BuoiHocSchema,NamHocSchema,NhatKyGiaoVienSchema,ChiTietNhatKySchema,MonHocSchema,LoaiMonHocSchema,QuyCachTinhDiemSchema,DiemDanhSchema],
    schemaVersion: 0, //optional    
};
//Them moi 1 lop
export const insertNewTodoList = newTodoList => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODOLIST_SCHEMA, newTodoList);
            resolve(newTodoList);
        });
    }).catch((error) => reject(error));
});
//Sua 1 Lop
export const updateTodoList = todoList => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id);   
            updatingTodoList.name = todoList.name;    
            resolve();     
        });
    }).catch((error) => reject(error));;
});
//Xoa 1 lop
export const deleteTodoList = todoListId => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
            realm.delete(deletingTodoList.todos);
            realm.delete(deletingTodoList);
            resolve();   
        });
    }).catch((error) => reject(error));;
});
//Xoa Tat ca Lop
export const deleteAllTodoLists = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let allTodoLists = realm.objects(TODOLIST_SCHEMA);
            for(var index in allTodoLists){
                let eachTodoList = allTodoLists[index];
                realm.delete(eachTodoList.todos);
            }
            realm.delete(allTodoLists);
            resolve();
        });
    }).catch((error) => reject(error));;
});
//Hien thi danh sach tat ca lop
export const queryAllTodoLists = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
        resolve(allTodoLists);  
    }).catch((error) => {        
        reject(error);  
    });
});
//Them moi sinh vien
export const insertNewTodo = newTodo => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODO_SCHEMA, newTodo);
            resolve(newTodo);
        });
    }).catch((error) => reject(error));
});
export const updateTodo = todo => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let updatingTodo = realm.objectForPrimaryKey(TODO_SCHEMA, todo.id);   
            updatingTodo.name = todo.name;    
            resolve();     
        });
    }).catch((error) => reject(error));;
});
export const deleteTodo = todoId => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let deletingTodo = realm.objectForPrimaryKey(TODO_SCHEMA, todoId);
            realm.delete(deletingTodo.todos);
            realm.delete(deletingTodo);
            resolve();   
        });
    }).catch((error) => reject(error));;
});
//Hien thi tat ca sinh vien theo lop
export const queryAllTodo = (todoListID) => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allTodoLists = realm.objects(TODO_SCHEMA);
        let allTodoListByTodoID = allTodoLists.filtered('todoListID == $0',todoListID);
        resolve(allTodoListByTodoID);  
    }).catch((error) => {        
        reject(error);  
    });
});
//Them moi 1  Khoa
export const insertNewKhoa = newKhoa => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(KHOA_SCHEMA, newKhoa);
            resolve(newKhoa);
        });
    }).catch((error) => reject(error));
});
//Hien thi danh sach khoa
export const queryAllKhoa = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allKhoa = realm.objects(KHOA_SCHEMA);
        resolve(allKhoa);  
    }).catch((error) => {        
        reject(error);  
    });
});
// MonHoc --------------------
//Them moi 1  MonHoc
export const insertNewMonHoc = newMonHoc => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(MONHOC_SCHEMA, newMonHoc);
            resolve(newMonHoc);
        });
    }).catch((error) => reject(error));
});
//Hien thi danh sach MonHoc
export const queryAllMonHoc = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allMonHoc = realm.objects(MONHOC_SCHEMA);
        resolve(allMonHoc);  
    }).catch((error) => {        
        reject(error);  
    });
});
// ----//________________________________________________________________________________________________________________________
//functions for Buoi thu
//Them moi 1  MonHoc
export const insertNewBuoiThu = newBuoiThu => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(BUOITHU_SCHEMA, newBuoiThu);
            resolve(newBuoiThu);
        });
    }).catch((error) => reject(error));
});
//Hien thi danh sach MonHoc
export const queryAllBuoiThu = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allBuoiThu = realm.objects(BUOITHU_SCHEMA);
        resolve(allBuoiThu);  
    }).catch((error) => {        
        reject(error);  
    });
});
//________________________________________________________________________________________________________________________
//functions for Buoi hoc
//Diem danh 1 sinh vien
export const insertNewBuoiHoc = newBuoiHoc => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(BUOIHOC_SCHEMA, newBuoiHoc);
            resolve(newBuoiHoc);
        });
    }).catch((error) => reject(error));
});
export const timkiemSVDaDiemDanh = (sinhvienId,buoithuid,monhocId) => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allTodoLists = realm.objects(TODO_SCHEMA);
        let allTodoListByTodoID = allTodoLists.filtered('sinhvienId == $0 and buoithuid == $1 and monhocId == $2',sinhvienId,buoithuid,monhocId);
        resolve(allTodoListByTodoID);  
    }).catch((error) => {        
        reject(error);  
    });
});
//________________________________________________________________________________________________________________________
//functions for Buoi hoc
//insert vào Bang DIem danh tam
export const insertDiemDanh = newSV => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(DIEMDANH_SCHEMA, newSV);
            resolve(newSV);
        });
    }).catch((error) => reject(error));
});
export const queryAllDiemDanh = () => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allBuoiThu = realm.objects(DIEMDANH_SCHEMA);
        resolve(allBuoiThu);  
    }).catch((error) => {        
        reject(error);  
    });
});
export const hienThiLopTheoKhoa = (khoaId) => new Promise((resolve, reject) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allTodoLists = realm.objects(TODOLIST_SCHEMA);
        let allTodoListByTodoID = allTodoLists.filtered('khoaId == $0',khoaId);
        resolve(allTodoListByTodoID);  
    }).catch((error) => {        
        reject(error);  
    });
});
export default new Realm(databaseOptions);