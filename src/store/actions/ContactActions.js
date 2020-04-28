import { ContactService } from '../../services/ContactService';

export function loadContacts(filterBy) {
  return async dispatch => {
    try {
      const contacts = await ContactService.getContacts(filterBy);
      dispatch({ type: 'SET_CONTACTS', contacts });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function loadContactById(id) {
  return async dispatch => {
    try {
      const contact = await ContactService.getContactById(id);
      dispatch({ type: 'SET_CURR_CONTACT', contact });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function saveContact(contact) {
  return async dispatch => {
    try {
      const isEdit = !!contact._id;
      contact = await ContactService.saveContact(contact);
      let actionType = isEdit ? 'UPDATE_CONTACT' : 'ADD_CONTACT';
      dispatch({ type: actionType, contact });
      return contact;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function getDefaultContacts() {
  return async dispatch => {
    try {
      const contacts = await ContactService.resetContacts();
      dispatch({ type: 'SET_CONTACTS', contacts });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

export function deleteContact(id) {
  return async dispatch => {
    try {
      await ContactService.deleteContact(id);
      dispatch({ type: 'DELETE_CONTACT', id });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}
