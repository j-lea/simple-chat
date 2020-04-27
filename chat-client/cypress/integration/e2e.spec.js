describe('Cpress', () => {

   beforeEach(() => {
      cy.visit('/');
   });

   it('focuses the input', () => {
      cy.focused().should('have.class', 'message-input');
   });

   it('shows the messages you have input after pressing send', () => {
      const firstMessage = 'I am sending a message.';

      cy.get('input[name="message"]').type(firstMessage).should('have.value', firstMessage);

      cy.get('button[name="send"]').click();

      cy.get('.message').should('have.text', firstMessage);

      cy.get('input[name="message"]').should('have.value', '');

      const secondMessage = 'Yep got it.';

      sendMessage(secondMessage);

      cy.get('.message').should('have.length', 2);

      cy.get('.message').eq(0).should('have.text', firstMessage);
      cy.get('.message').eq(1).should('have.text', secondMessage);
   })

   function sendMessage(messageText) {
      cy.get('input[name="message"]').type(messageText);
      cy.get('button[name="send"]').click();
   }
});