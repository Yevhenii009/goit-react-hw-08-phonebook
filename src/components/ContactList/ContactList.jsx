import React, { useState } from 'react';
import { Contact } from 'components/Contact/Contact';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContactList } from 'redux/selectors';
import { deleteContact, editContact } from '../../redux/operations';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import css from './ContactList.module.css';

let contactNameToDelete = '';
let contactToEdite = {};

export const ContactList = () => {
  const [shownModal, setShownModal] = useState(false);
  const [shownEditModal, setShownEditModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const dispatch = useDispatch();
  const shouldDeleteContact = () => {
    dispatch(deleteContact(idToDelete));
    modalShoudClose();
  };

  const showModal = (contactId, contactName) => {
    contactNameToDelete = contactName;
    setShownModal(true);
    setIdToDelete(contactId);
  };

  const showEditModal = (contactId, contactName, contactNumber) => {
    contactToEdite = { contactId, contactName, contactNumber };
    setShownEditModal(true);
  };

  const modalShoudClose = () => {
    setShownModal(false);
    setShownEditModal(false);
  };

  const filteredContactList = useSelector(selectFilteredContactList);

  const handleEdit = elem => {
    elem.preventDefault();
    const contact = elem.target.elements;
    dispatch(
      editContact({
        name: contact.name.value,
        number: contact.number.value,
        contactId: contactToEdite.contactId,
      })
    );
    contact.name.value = '';
    contact.number.value = '';
    setShownEditModal(false);
  };

  return (
    <>
      <table className={css.contactListTable}>
        <tbody>
          {filteredContactList.map(contact => (
            <tr key={contact.id} className={css.contactListItem}>
              <Contact
                contact={contact}
                showModal={showModal}
                showEditModal={showEditModal}
              />
            </tr>
          ))}
        </tbody>
      </table>

      {shownModal && (
        <Modal modalShoudClose={modalShoudClose}>
          <>
            <p className={css.title}>
              Do you really want to remove
              <br />
              {contactNameToDelete}?
            </p>
            <Button type="button" onClick={shouldDeleteContact}>
              YES
            </Button>
            <Button type="button" onClick={modalShoudClose}>
              NO
            </Button>
          </>
        </Modal>
      )}

      {shownEditModal && (
        <Modal modalShoudClose={modalShoudClose}>
          <>
            <b>Edit contact</b>
            <form className={css.form} onSubmit={handleEdit} autoComplete="off">
              <label className={css.label}>
                Name
                <input
                  type="text"
                  name="name"
                  className={css.inputText}
                  defaultValue={contactToEdite.contactName}
                />
              </label>
              <label className={css.label}>
                Number
                <input
                  type="text"
                  name="number"
                  className={css.inputText}
                  defaultValue={contactToEdite.contactNumber}
                />
              </label>
              <div>
                <Button type="submit">save</Button>
                <Button type="button" onClick={modalShoudClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </>
        </Modal>
      )}
    </>
  );
};