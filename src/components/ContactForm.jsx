import { nanoid } from "nanoid";
import Styles from "./App.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { getStateContactsSlice } from "../redux/selectors";
import { addContact } from "../redux/operations";

const ContactForm = () => {
  const nameId = nanoid();
  const phoneId = nanoid();
  const dispatch = useDispatch();

  const { allContact } = useSelector(getStateContactsSlice);

  const submitHandler = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const nameValue = form.elements.name.value;
    const numberValue = form.elements.number.value;
    if (allContact.find((obj) => obj.name === nameValue)) {
      alert(nameValue + " is already in contacts");
    } else {
      dispatch(addContact({ name: nameValue, number: numberValue }));
      form.reset();
    }
  };

  return (
    <div className={Styles.leftPage}>
      <h1>Phonebook</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor={nameId}>Name</label>
        <br />
        <input
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Z '\-]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoComplete="true"
        />
        <br />
        <label htmlFor={phoneId}>Phone</label>
        <br />
        <input
          id={phoneId}
          type="tel"
          name="number"
          pattern="^\+?[0-9\(\) \-]+$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="true"
        />
        <br />
        <button
          type="submit"
          className="bg-green-600 px-1.5 py-1 rounded-md text-white mt-3">
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
