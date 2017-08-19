import React from 'react';
import PropTypes from 'prop-types';
import VapeItemEditor from '../../components/VapeItemEditor/VapeItemEditor';

const NewVapeItem = ({ history }) => (
  <div className="NewVapeItem">
    <h4 className="page-header">Nuevo Item de Vapeo</h4>
    <VapeItemEditor history={history} />
  </div>
);

NewVapeItem.propTypes = {
  history: PropTypes.object.isRequired,
};

export default NewVapeItem;
