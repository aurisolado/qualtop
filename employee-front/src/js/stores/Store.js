import EventEmitter from 'events';
import Validator from './../lib/Validator';
import AppDispatcher from './../AppDispatcher';

let _list = {
  items: {},
  index: 0
};

let _form = {
  data: {
    name: '',
    salary: 0,
    business: ''
  },
  errors: {
    name: [],
    salary: [],
    business: []
  },
  mode: 'create'
};

let _modal = {
  open: false
};


const Store = Object.assign({}, EventEmitter.prototype, {

  addUser: function(data) {
    let validator = new Validator(data);
    validator.validatePresence('name').
    validatePresence('salary').
    validatePresence('business');
    if(validator.isValid()){
      _list.items[_list.index+=1] = {
        name: data.name,
        salary: data.salary,
        business: data.business,
        id: _list.index
      }
      _form.data = {
        name: '',
        salary: '',
        business: ''
      };
      _form.errors = {
        name: [],
        salary: [],
        business: []
      };


      console.error("Guardar usuario por medio de MS");

      fetch('http://mbp-de-edwin.mshome.net:8091/employees/', {
        method: 'post',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre:data.name,
          sueldo:data.salary,
          empresa:data.business
        })
      }).then(function(response) {
        console.error(" ok ok ok ok");
      }).then(function(data) {
        console.error("Error al registrar");
      });

      _modal.open = false;
    }else{
      _form.errors = validator.errors;
    }
    this.emit('change');
  },

  editUser: function(data) {
    let validator = new Validator(data);
    validator.validatePresence('first_name').
    validatePresence('last_name').
    validatePresence('sex');

    if(validator.isValid()){
      _list.items[data.id] = {
        name: data.name,
        salary: data.salary,
        business: data.business,
        id: data.id
      }
      _form.data = {
        name: '',
        salary: 0,
        business: ''
      };
      _form.errors = {
        name: [],
        salary: [],
        business: []
      };


      fetch('http://mbp-de-edwin.mshome.net:8091/employees/'+data.id, {
        method: 'put',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre:data.name,
          sueldo:data.salary,
          empresa:data.business
        })
      }).then(function(response) {
        console.error(" ok ok ok ok");
      }).then(function(data) {
        console.error("Error al registrar");
      });


      _modal.open = false;
    }else{
      _form.errors = validator.errors;
    }
    this.emit('change');
  },

  removeUser: function(id) {
    delete _list.items[id];

    fetch('http://mbp-de-edwin.mshome.net:8091/employees/'+data.id, {
      method: 'delete',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      console.error(" ok ok ok ok");
    }).then(function(data) {
      console.error("Error al registrar");
    });

    this.emit('change');
  },

  setData: function(name, value) {
    _form.data[name] = value;
    this.emit('change');
  },

  setError: function(name, value) {
    _form.errors[name] = value;
    this.emit('change');
  },

  openPopup: function(mode, id) {
    _modal.open = true;
    _form.mode = mode;

    if(mode == 'edit')
      _form.data = {
        name: _list.items[id].name,
        salary: _list.items[id].salary,
        business: _list.items[id].business,
        id: id
      }

    this.emit('change');
  },

  closePopup: function() {
    _modal.open = false;
    _form.mode = 'create';
    this.emit('change');
  },

  get: function() {
    return {
      list: _list,
      form: _form,
      modal: _modal
    };
  }

});


AppDispatcher.register(function(payload) {

  switch(payload.actionType) {
    case 'ADD_USER':
      Store.addUser(_form.data);
    break;
    case 'REMOVE_USER':
      Store.removeUser(payload.id);
    break;
    case 'EDIT_USER':
      Store.editUser(_form.data);
    break;
    case 'SET_DATA':
      Store.setData(payload.name, payload.value);
    break;
    case 'SET_ERROR':
      Store.setError(payload.name, payload.value);
    break;
    case 'OPEN_POPUP':
      Store.openPopup(payload.mode, payload.id);
    break;
    case 'CLOSE_POPUP':
      Store.closePopup();
    break;
    default:
      return true;
  }

});

export default Store;
