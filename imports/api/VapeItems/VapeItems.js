/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const VapeItems = new Mongo.Collection('VapeItems');

VapeItems.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

VapeItems.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

VapeItems.schema = new SimpleSchema({
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  name: {
    type: String,
    label: 'The name of the vape item',
  },
  description: {
    type: String,
    label: 'The description of the vape item',
  },
  vapeItemType: {
    type: String,
    label: 'The id of the vape item type',
  },
  vapeItemType: {
    type: String,
    label: 'The id of the vape item type',
  },
});

VapeItems.attachSchema(VapeItems.schema);

export default VapeItems;
