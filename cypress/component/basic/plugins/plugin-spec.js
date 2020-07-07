/// <reference types="cypress" />
import { MyPlugin } from './MyPlugin'
import { mount, mountCallback } from 'cypress-vue-unit-test'

describe('Single component mount', () => {
  it('has the plugin', () => {
    const use = [MyPlugin]

    // extend Vue with plugins
    const extensions = {
      use,
    }

    mount({}, { extensions })

    cy.window().its('Vue').invoke('aPluginMethod').should('equal', 'foo')
  })
})

describe('Custom plugin MyPlugin', () => {
  const use = [MyPlugin]

  // extend Vue with plugins
  const extensions = {
    use,
  }
  // use "mountCallback" to register the plugins
  beforeEach(mountCallback({}, { extensions }))

  it('registers global method on Vue instance', () => {
    cy.window().its('Vue').its('aPluginMethod').should('be.a', 'function')
  })

  it('can call this global function', () => {
    cy.window().its('Vue').invoke('aPluginMethod').should('equal', 'foo')
  })
})
