// import ButtonCounter from './ButtonCounter.vue'
import { defineComponent, h, ref } from 'vue'
import { mountCallback } from '../../../src/vue3/index'

/* eslint-env mocha */
describe('ButtonCounter', () => {


  const ButtonCounter = defineComponent({
    setup(_, ctx) {
      const show = ref(false)
      const count = ref(0)
      const onClick = () => {
        count.value++
        ctx.emit('increment')
      }

      return () => {
        return h('button', {
          onClick: onClick
        }, count.value)
      }
    }
  })


  beforeEach(mountCallback(ButtonCounter))

  it('starts with zero', () => {
    cy.contains('button', '0')
  })

  it('increments the counter on click', () => {
    cy.get('button').click().click().click().contains('3')
  })

  it('emits "increment" event on click', () => {
    const spy = cy.spy()
    console.log(Cypress.vue)
    // Cypress.vue.$on('increment', spy)
    cy.get('button').click().click().then(() => {
      expect(spy).to.be.calledTwice
    })
  })
})
