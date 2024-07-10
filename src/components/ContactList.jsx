import Styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getStateContactsSlice, getFilterWord } from "../redux/selectors";

import { change } from "../redux/filterSlice";
import { useEffect } from "react";
import { deleteContact, fetchContactsThunk } from "../redux/operations";

const ContactList = () => {
  const dispatch = useDispatch();
  const { isLoading, err, allContact } = useSelector(getStateContactsSlice);
  const filterText = useSelector(getFilterWord);

  const deleteFunc = (ev) => {
    const idContact = ev.target.value;
    dispatch(deleteContact(idContact));
  };

  const filtredContacts = (ev) => {
    const inputText = ev.target.value;
    dispatch(change(inputText));
  };

  useEffect(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return (
    <div className={Styles.rightPage}>
      <h2>Contacts</h2>
      <label htmlFor="idFilter">Find contacts by name</label>
      <br />
      <input
        id="idFilter"
        type="text"
        name="filter"
        onChange={filtredContacts}
        autoComplete="true"
      />
      <ul className={Styles.list + " flex flex-col gap-2.5 mt-3"}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          allContact &&
          allContact.map(
            (obj) =>
              obj.name.toLowerCase().includes(filterText.toLowerCase()) && (
                <li
                  key={obj.id}
                  className={Styles.itemList + " flex items-center"}>
                  <span>
                    {obj.name}: {obj.phone}
                  </span>
                  <button
                    type="button"
                    onClick={deleteFunc}
                    value={obj.id}
                    className="bg-red-600 px-1.5 py-1 rounded-md text-white hover:bg-red-500 hover:shadow-sm hover:shadow-rose-600  active:bg-red-700">
                    Delete
                  </button>
                </li>
              ),
          )
        )}
        {err && <p>Error: {err}</p>}
      </ul>
    </div>
  );
};

export default ContactList;
