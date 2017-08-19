/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class VapeItemEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        name: {
          required: true,
        },
        description: {
          required: true,
        },
        type: {
          required: true,
        },
      },
      messages: {
        name: {
          required: '¿Como me llamaras?.',
        },
        description: {
          required: 'Describeme...',
        },
        type: {
          required: '¿De que tipo me consideras?',
        },
      },
      submitHandler() { component.handleSubmit(); },
    });
  }

  handleSubmit() {
    const { history } = this.props;
    const existingDocument = this.props.vi && this.props.vi._id;
    const methodToCall = existingDocument ? 'vapeItems.update' : 'vapeItems.insert';
    const vi = {
      name: this.name.value.trim(),
      description: this.description.value.trim(),
    };

    if (existingDocument) vi._id = existingDocument;

    Meteor.call(methodToCall, vi, (error, vapeItemId) => {
      if (error) {
        Bert.alert(error.reason, 'Error');
      } else {
        const confirmation = existingDocument ? 'Item de vapeo actualizado!' : 'Item de vapeo añadido!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/vapeitem/${vapeItemId}`);
      }
    });
  }

  render() {
    const { vi } = this.props;
    return (<form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
      <FormGroup>
        <ControlLabel>Nombre</ControlLabel>
        <input
          type="text"
          className="form-control"
          name="name"
          ref={name => (this.name = name)}
          defaultValue={vi && vi.name}
          placeholder="Fuchai 213"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Descripción</ControlLabel>
        <textarea
          className="form-control"
          name="description"
          ref={description => (this.description = description)}
          defaultValue={vi && vi.description}
          placeholder="Mod de doble bateria con regulación de temperatura"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        {vi && vi._id ? 'Guardar Cambios' : 'Añadir item'}
      </Button>
    </form>);
  }
}

VapeItemEditor.defaultProps = {
  vi: { name: '', description: '', vapeItemType: '' },
};

VapeItemEditor.propTypes = {
  vi: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default VapeItemEditor;
