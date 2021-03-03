import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

function SearchBox({ history }) {
  const [keyword, setKeyword] = useState("");
  function submitHandler(e) {
    e.preventDefault();
    //trim whitespace
    if (keyword.trim()) {
      const holdKey = keyword;
      setKeyword("");
      history.push(`/search/${holdKey}`);
    } else {
      history.push("/");
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        value={keyword}
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
