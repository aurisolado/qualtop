import React from 'react';
import TextField from './TextField';
import SelectField from './SelectField';
import Modal from './Modal';
import Store from './../stores/Store';
import * as AppActions from './../actions/AppActions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = Store.get().form;
  }

  componentWillMount() {
    Store.on('change', function() {
      this.setState(Store.get().form);
    }.bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();

    if(this.state.mode == 'create'){
      AppActions.addUser();
    }else {
      AppActions.editUser(this.props.id);
    }

  }

  _handleClose(e) {
    e.preventDefault();
    AppActions.closePopup();
  }

  render() {

    let title;

    if (this.state.mode == 'edit'){
      title = "Editar empleado: " + this.state.data.first_name
    }
    else {
      title = "Nuevo empleado"
    }


    return (
      <Modal>
        <form onSubmit={this._handleSubmit}>
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={this._handleClose}></button>
          </header>
          <section className="modal-card-body">
            <TextField label="Nombre" name="name" value={this.state.data.name} errors={this.state.errors['name']} />
            <TextField label="Sueldo" name="salary" value={this.state.data.salary} errors={this.state.errors['salary']} />
            <TextField label="Empresa" name="business" value={this.state.data.business} errors={this.state.errors['business']} />
            
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary">Guardar</button>
            <a className="button" onClick={this._handleClose}>Cancelar</a>
          </footer>
        </form>
      </Modal>
    );
  }
}

export default Form;
