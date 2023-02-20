import assert from 'node:assert/strict'
import { helloWorld } from '../hello-world.js'

it('helloWorld must return hello world', function () {
  const actual = helloWorld()
  const expected = 'hello world'
  assert.equal(actual, expected)
})
