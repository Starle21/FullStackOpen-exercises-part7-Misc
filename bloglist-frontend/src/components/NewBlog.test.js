import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import NewBlog from "./NewBlog";

describe("<NewBlog/>", () => {
  test("event handler gets the right data when creating a new blog", () => {
    //
    const createNewBlog = jest.fn();
    const component = render(<NewBlog createNewBlog={createNewBlog} />);

    const title = component.container.querySelector("[name=Title]");
    const author = component.container.querySelector("[name=Author]");
    const url = component.container.querySelector("[name=Url]");
    const form = component.container.querySelector(".submitNewBlog");

    fireEvent.change(title, {
      target: { value: "Testing blog creation by unit tests" },
    });
    fireEvent.change(author, {
      target: { value: "Done fast please!" },
    });
    fireEvent.change(url, {
      target: { value: "www.done.com" },
    });
    fireEvent.submit(form);

    expect(createNewBlog.mock.calls).toHaveLength(1);
    expect(createNewBlog.mock.calls[0][0]).toEqual({
      title: "Testing blog creation by unit tests",
      author: "Done fast please!",
      url: "www.done.com",
    });
  });
});
