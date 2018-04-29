import VueAutonumeric from 'vue-autonumeric'
import mountVue from '../..'

const autonumericSrc = 'https://unpkg.com/autonumeric'
const html = `<div id="app"></div><script src="${autonumericSrc}"></script>`

/* eslint-env mocha */
describe('Autonumeric', () => {
  const extensions = {
    components: {
      VueAutonumeric
    }
  }

  const data = {
    myValue: 42
  }
  const template = `
  <vue-autonumeric
    id="myComp"
    v-model="myValue"
    :options="['euro', { minimumValue: '0' }]"
    :placeholder="'Enter your value here'"
  />`

  beforeEach(mountVue({ template, data }, { html, extensions }))

  it('shows default myValue', () => {
    cy.get('#myComp').should('have.value', '42,00 €')
  })
})
