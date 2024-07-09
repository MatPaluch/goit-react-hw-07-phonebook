import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Book from "./Book";

const App = () => {
  return (
    <Book>
      <ContactForm />
      <ContactList />
    </Book>
  );
};
export default App;
