import assert from 'node:assert/strict'
import { helloWorld } from '../hello-world.js'

it('helloWorld must return hello world', function () {
  assert.equal(helloWorld(), 'hello world')
})
