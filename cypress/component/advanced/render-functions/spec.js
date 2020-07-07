/// <reference types="cypress" />
import { mount } from 'cypress-vue-unit-test'

describe('Single render function component', () => {
  // the component definition
  const appComponent = {
    template: '<h1>hi! This is a Render Function Example</h1>',
    data() {
      return {}
    },
  }

  const mountOptions = {
    // we want to use custom app component above
    extensions: {
      components: {
        'app-component': appComponent,
      },
    },
  }

  it('loads', () => {
    mount(
      {
        template: `
          <div>
            <app-component></app-component>
          </div>
        `,
      },
      mountOptions,
    )
    cy.contains('h1', 'hi!')
  })

  it('loads 3 times', () => {
    // tip: always have top level single root element
    mount(
      {
        template: `
          <div>
            <app-component></app-component>
            <app-component></app-component>
            <app-component>foo</app-component>
          </div>
        `,
      },
      mountOptions,
    )
    cy.get('h1')
      .should('have.length', 3)
      .each(($el) => {
        expect($el).to.contain('hi!')
      })
  })
})
