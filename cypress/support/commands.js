/* eslint-disable no-undef */
Cypress.Commands.add("mockGraphQL", (stubs) => {
  cy.on("window:before:load", (win) => {
    cy.stub(win, "fetch", (...args) => {
      console.log("Handling fetch stub", args);
      const [url, request] = args;
      const postBody = JSON.parse(request.body);
      let promise;
      if (url.indexOf("graphql") !== -1) {
        stubs.some((stub) => {
            console.log('ostBody.operationName', postBody.operationName)
            console.log('stub.operation', stub.operation)
          if (postBody.operationName === stub.operation) {
            console.log("STUBBING", stub.operation);
            promise = Promise.resolve({
              ok: true,
              text() {
                return Promise.resolve(JSON.stringify(stub.response));
              },
            });
            return true;
          }
          return false;
        });
      }

      if (promise) {
        return promise;
      }

      console.log("Could not find a stub for the operation.");
      return false;
    });
  });
});
