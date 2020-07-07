/// <reference types="cypress" />
import { mount } from 'cypress-vue-unit-test'
import AxiosGet from './AxiosGet.vue'

// import everything from "axios" module
// so we can mock its methods from the test
import * as Axios from 'axios'

describe('Mocking get import from Axios', () => {
  it('renders mocked data', () => {
    cy.stub(Axios, 'get')
      .resolves({
        data: [
          {
            id: 101,
            name: 'Test User',
          },
        ],
      })
      .as('get')

    console.log('Axios is', Axios)
    mount(AxiosGet)
  })
})
