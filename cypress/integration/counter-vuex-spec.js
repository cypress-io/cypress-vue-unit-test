// testing Vuex component
// https://github.com/vuejs/vuex/tree/dev/examples/counter
import Counter from '../../components/Counter.vue'
import store from '../../components/store'
import Vuex from 'vuex'
import mountVue from '../..'

/* eslint-env mocha */
describe('Vuex Counter', () => {
  const extensions = {
    plugins: [Vuex],
    components: {
      counter: Counter
    },
  }
  const template = '<counter />'
  beforeEach(mountVue({template, store}, {extensions}))

  const getCount = () =>
    Cypress.vue.$store.state.count

  const setCount = value => {
    Cypress.vue.$store.state.count = value
  }

  it('starts with zero', () => {
    cy.contains('0 times')
  })

  it('increments the counter on click of "+"', () => {
    cy.contains('button', '+').click()
    cy.contains('1 times')
  })

  it('decrements the counter on click of "-"', () => {
    cy.contains('button', '-').click()
    cy.contains('0 times')
  })

  it('increments the counter if count is odd', () => {
    setCount(3)
    cy.contains('odd')
    cy.contains('button', 'Increment if odd').click()
    cy.contains('even')
  })

  it('asynchronously increments counter', () => {
    let count = getCount()
    cy.contains('button', 'Increment async').click()
    cy.contains(`${count++} times`)
  })
})
