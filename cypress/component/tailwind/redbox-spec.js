import {mountCallback} from 'cypress-vue-unit-test'
import RedBox from './RedBox.vue'

// TODO find a way to inject into head href to additional CSS libraries
// like <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>

describe('RedBox 1', () => {
  const template = '<red-box :status="true" />';
  const options = {
    extensions: {
      components: {
        'red-box': RedBox
      }
    }
  }

  beforeEach(mountCallback({ template }, options));
  it('displays Hello RedBox', () => {
    cy.contains("Hello RedBox");
  })
  it('should be Red', () => {
    cy.get("[data-cy=box]").should('have.css', 'background-color', 'rgb(255, 0, 0)');
  })
})

describe('RedBox 2', () => {
  const template = '<red-box :status="false" />';
  const options = {
    extensions: {
      components: {
        'red-box': RedBox
      }
    }
  }

  beforeEach(mountCallback({ template }, options));
  it('displays Goodbye RedBox', () => {
    cy.contains("Goodbye RedBox");
  })
  it('should be Red', () => {
    cy.get("[data-cy=box]").should('have.css', 'background-color', 'rgb(255, 0, 0)');
  })
})
