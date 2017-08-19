import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button } from 'react-bootstrap';
import { timeago } from '@cleverbeagle/dates';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import VapeItemsCollection from '../../../api/VapeItems/VapeItems';
import Loading from '../../components/Loading/Loading';

import './VapeItems.scss';

const handleRemove = (vapeItemId) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('vapeItems.remove', vapeItemId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
      }
    });
  }
};

const VapeItems = ({ loading, vapeItems, match, history }) => (!loading ? (
  <div className="VapeItems">
    <div className="page-header clearfix">
      <h4 className="pull-left">VapeItems</h4>
      <Link className="btn btn-sucess pull-right" to={`${match.url}/new`}>Añadir Item de Vapeo</Link>
    </div>
    {vapeItems.length ? <Table responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Ultima modificación</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {vapeItems.map(({ _id, name, description, updatedAt }) => (
          <tr key={_id}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{timeago(updatedAt)}</td>
            <td>
              <Button
                bsStyle="primary"
                onClick={() => history.push(`${match.url}/${_id}`)}
                block
              >View</Button>
            </td>
            <td>
              <Button
                bsStyle="danger"
                onClick={() => handleRemove(_id)}
                block
              >Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table> : <Alert bsStyle="warning">No hay articulos de vapeo!</Alert>}
  </div>

) : <Loading />);

VapeItems.propTypes = {
  loading: PropTypes.bool.isRequired,
  vapeItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default createContainer(() => {
  const subscription = Meteor.subscribe('vapeItems');
  return {
    loading: !subscription.ready(),
    vapeItems: VapeItemsCollection.find().fetch(),
  };
}, VapeItems);
