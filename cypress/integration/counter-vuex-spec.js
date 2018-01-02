// testing Vuex component
// https://github.com/vuejs/vuex/tree/dev/examples/counter
import Counter from '../../components/Counter.vue'
import store from '../../components/store'
const mountVue = require('../..')

/* eslint-env mocha */
describe('Vuex Counter', () => {
  const extensions = {    
    components: {
      counter: Counter
    },
  }
  const template = '<counter />'
  beforeEach(mountVue({template, store}, {extensions}))

  it('starts with zero', () => {
    cy.contains('button', '0')
  })
})
