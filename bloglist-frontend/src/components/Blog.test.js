import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;
  const giveLike = jest.fn();

  beforeEach(() => {
    const blog = {
      title: "Testing on Frontend",
      author: "Guru of Tests",
      url: "https://somewhere.com",
      likes: 99,
      user: {
        name: "The Other One",
      },
    };

    const user = {
      name: "Somebody",
      username: "smb",
    };

    const deletePost = jest.fn();

    component = render(
      <Blog
        blog={blog}
        user={user}
        giveLike={giveLike}
        deletePost={deletePost}
      />
    );
  });

  test("by default displays author&title; url&likes are hidden", () => {
    expect(component.container).toHaveTextContent(
      "Testing on Frontend",
      "Guru of Tests"
    );
    const div = component.container.querySelector(".details");
    expect(div).toHaveStyle("display: none");
  });

  test("when button view is clicked, likes and url are displayed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const div = component.container.querySelector(".details");
    expect(div).not.toHaveStyle("display: none");
  });

  test("when likes button clicked twice, setBlogs are called twice", () => {
    const like = component.getByText("like");

    fireEvent.click(like);
    fireEvent.click(like);

    expect(giveLike).toHaveBeenCalledTimes(2);
  }, 100000);
});
