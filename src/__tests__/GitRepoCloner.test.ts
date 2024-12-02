import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import GitRepoCloner from '../components/GitRepoCloner'

export default class RepoClonerTest extends AbstractSpruceTest {
    private static instance: GitRepoCloner

    protected static async beforeEach() {
        await super.beforeEach()

        this.instance = this.GitRepoCleaner()
    }

    @test()
    protected static async canCreateRepoCloner() {
        assert.isTruthy(this.instance, 'Should create a new instance!')
    }

    private static GitRepoCleaner() {
        return GitRepoCloner.Create()
    }
}
