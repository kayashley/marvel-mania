// ../search-form/search-form.jsx

import { Form } from "react-bootstrap"; // importing Form
import "./search-form.scss"; // importing scss

export const SearchForm = ({ search, handleOnChange }) => {
  return (
    <Form className="search-form">
      <Form.Control
        type="text"
        placeholder="Search movies by title..."
        value={search}
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
      />
    </Form>
  );
};
