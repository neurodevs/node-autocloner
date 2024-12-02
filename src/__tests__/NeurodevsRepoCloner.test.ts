import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { RepoCloner } from '../abstract.types'
import NeurodevsRepoCloner from '../components/NeurodevsRepoCloner'

export default class NeurodevsRepoClonerTest extends AbstractSpruceTest {
    private static instance: RepoCloner

    protected static async beforeEach() {
        await super.beforeEach()

        this.instance = this.NeurodevsRepoCloner()
    }

    @test()
    protected static async canCreateNeurodevsRepoCloner() {
        assert.isTruthy(this.instance, 'Should create a new instance!')
    }

    private static NeurodevsRepoCloner() {
        return NeurodevsRepoCloner.Create()
    }
}
