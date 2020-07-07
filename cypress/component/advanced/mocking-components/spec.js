/// <reference types="cypress" />
import { mount } from 'cypress-vue-unit-test'
import ParentComponent from './Parent.vue'
import ChildComponent from './Child.vue'

describe('Mocking components', () => {
  beforeEach(() => {
    // by deleting _Ctor we force Vue system to recompile the
    // component and render the new component tree
    delete ParentComponent._Ctor
  })

  it('renders real child component', () => {
    mount(ParentComponent)
    cy.get('.a-parent')
    cy.get('.a-child')
  })

  it('mocks Child component imported by the Parent component', () => {
    // replace real component with mock component
    ParentComponent.components = {
      ChildComponent: {
        template: '<div class="test-child">Test component</div>',
      },
    }

    mount(ParentComponent)
    cy.get('.a-parent')
    cy.get('.test-child')
    cy.get('.a-child').should('not.exist')
  })

  // and how to reset the mocked child component?
  it('renders real child component again', () => {
    ParentComponent.components = {
      ChildComponent,
    }
    mount(ParentComponent)
    cy.get('.a-parent')
    cy.get('.a-child')
  })
})
