import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    if (
      this.state.contacts.map(contact => contact.name).includes(newContact.name)
    ) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  findContact = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    console.log(contacts);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.findContact} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
