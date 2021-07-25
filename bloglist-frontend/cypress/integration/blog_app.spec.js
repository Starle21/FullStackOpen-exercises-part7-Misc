describe("Blog app", function () {
  //
  beforeEach(function () {
    //empty the database
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.addUser({
      username: "starryNight",
      name: "starryNight",
      password: "password",
    });
    cy.addUser({ username: "starDay", name: "starDay", password: "password" });
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("username");
  });

  describe("while logging in", function () {
    it("user can log in", function () {
      //get the input
      //fill in input
      cy.get("#username").type("starryNight");
      cy.get("#password").type("password");
      //click button
      cy.get("#login-button").click();

      //notification about success login shown
      cy.contains("starryNight logged in");
    });
    it("user cannot log in with wrong password", function () {
      //get the input
      //fill in input
      cy.get("#username").type("starryNight");
      cy.get("#password").type("wrong");
      //click button
      cy.get("#login-button").click();

      //notification about success login shown
      cy.get(".errorMessage")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      // log in user
      cy.login({ username: "starryNight", password: "password" });
    });

    it("A blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("E2E with cypress seems ok");
      cy.get("#author").type("cypress");
      cy.get("#url").type("www.cypress.com");
      cy.get("#createBlog-button").click();
      cy.contains("E2E with cypress seems ok");
    });
    describe("after a few blog posts have been created", function () {
      //
      beforeEach(function () {
        cy.createBlog({
          title: "Do you wanna give like?",
          author: "Likeme",
          url: "like.com",
        });
        cy.createBlog({
          title: "The other blog",
          author: "The Other",
          url: "other.org",
        });
      });

      it("a user can like a blog", function () {
        //find view, click
        cy.get("#toggleDetails-button").first().click();
        cy.get("#like-button").first().click();
        cy.get(".details").first().should("contain", "1");
      });

      it("a user can delete a blog they created", function () {
        cy.get("#toggleDetails-button").first().click();
        cy.get(".details")
          .first()
          .should("contain", "starryNight")
          .and("contain", "delete blog");
        cy.get(".details").find("#delete-button").first().click();
        cy.get("html").should("contain", "Do you wanna give like? was removed");
      });

      it("users cannot delete other people's blogs", function () {
        cy.login({ username: "starDay", password: "password" });
        cy.get("#toggleDetails-button").first().click();
        cy.get(".details")
          .first()
          .should("contain", "starryNight")
          .and("not.contain", "delete blog");
      });
      it("blogs are sorted by the most likes first", function () {
        cy.createBlog({
          title: "With likes",
          author: "Liking",
          url: "heart.com",
          likes: 10,
        });
        cy.createBlog({
          title: "With Many likes",
          author: "Liking",
          url: "heart.com",
          likes: 100,
        });

        cy.get(".blog-likes").should(($likes) => {
          //
          const likesNumber = $likes.map((i, el) => {
            return Cypress.$(el).text().match(/\d+/);
          });
          expect(likesNumber.get()).to.deep.eq(["100", "10", "0", "0"]);
        });
      });
    });
  });
});
