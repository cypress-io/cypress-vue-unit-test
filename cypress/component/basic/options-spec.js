import {mountCallback} from 'cypress-vue-unit-test'

const template = `
    <div id="app">
      {{ message }}
    </div>
  `

const data = {
  message: 'Hello Vue!'
}

describe('Mount component', () => {
  const options = {
  }

  const component = { template, data }
  beforeEach(mountCallback(component, options))

  it('shows hello', () => {
    cy.contains('Hello Vue!')
  })

  it('has version', () => {
    cy.window().its('Vue.version').should('be.a', 'string')
  })
})
