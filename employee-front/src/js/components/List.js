import React from 'react';
import Item from './Item';
import Modal from './Modal';
import Form from './Form';
import Store from './../stores/Store';
import * as AppActions from './../actions/AppActions';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.get().list;
  }

  componentWillMount() {
    Store.on('change', function() {
      this.setState(Store.get().list);
    }.bind(this));


    fetch('http://mbp-de-edwin.mshome.net:8091/employees/')
    .then ( res => res.json() )
    .then( json => {
      console.error(json);
      this.state.items = json;

      this.setState({
        isLoaded: true,
        items: json
      });
      console.error("Render");
    
    
    } );
      
  }

  _handleAddUser(e) {
     e.preventDefault();
     AppActions.openPopup();
  }

  render() {

  var {isLoaded, items} = this.state;
  if( !isLoaded ){
    return <div>Cargando...</div>
  } else{

    let items = Object.keys(this.state.items).map(function(k) {
      let i = this.state.items[k];
      console.error("k");
      console.error(i);
      return <Item key={k} id={i.id} name={i.nombre} salary={i.sueldo} business={i.empresa} />;
    }.bind(this));


    return (
      <div className="panel">
        <p className="panel-heading">
          Lista de empleados
        </p>
        <div className="panel-block has-text-centered">
          {(function() {
            if(items.length > 0){
              return <table className="table">
                       <thead>
                         <tr>
                           <th>Nombbre</th>
                           <th>Salario</th>
                           <th>Empresa</th>
                           <th></th>
                         </tr>
                       </thead>
                       <tbody>
                         { items }
                       </tbody>
                     </table>;
            }
          })()}
          <a className="button is-link" onClick={this._handleAddUser}>Registrar nuevo empleado</a>
        </div>
      </div>
    );
  }

    

    
  }
}
