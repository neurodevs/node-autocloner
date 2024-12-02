import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import { RepoCloner } from '../abstract.types'
import GitRepoCloner from '../components/GitRepoCloner'
import NeurodevsRepoCloner from '../components/NeurodevsRepoCloner'
import FakeGitRepoCloner from '../testDoubles/FakeGitRepoCloner'

export default class NeurodevsRepoClonerTest extends AbstractSpruceTest {
    private static instance: RepoCloner

    protected static async beforeEach() {
        await super.beforeEach()

        this.setFakeGitRepoCloner()

        this.instance = this.NeurodevsRepoCloner()
    }

    @test()
    protected static async canCreateNeurodevsRepoCloner() {
        assert.isTruthy(this.instance, 'Should create a new instance!')
    }

    @test()
    protected static async createsGitRepoCloner() {
        assert.isEqual(
            FakeGitRepoCloner.numCallsToConstructor,
            1,
            'Should create a new instance of GitRepoCloner!'
        )
    }

    private static setFakeGitRepoCloner() {
        GitRepoCloner.Class = FakeGitRepoCloner
        FakeGitRepoCloner.resetTestDouble()
    }

    private static NeurodevsRepoCloner() {
        return NeurodevsRepoCloner.Create()
    }
}
