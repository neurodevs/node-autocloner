import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import GitRepoCloner from '../components/GitRepoCloner'
import NeurodevsRepoCloner, {
    PresetRepoCloner,
} from '../components/NeurodevsRepoCloner'
import FakeGitRepoCloner from '../testDoubles/FakeGitRepoCloner'

export default class NeurodevsRepoClonerTest extends AbstractSpruceTest {
    private static instance: PresetRepoCloner

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

    @test()
    protected static async callsGitRepoClonerWithExpectedOptions() {
        await this.instance.run()

        const options = FakeGitRepoCloner.callsToRun[0]

        assert.isEqualDeep(options, {
            urls: this.packageUrls,
            dirPath: '',
        })
    }

    private static packageNames = ['node-lsl', 'node-xdf']

    private static generateUrl(packageName: string) {
        return `https://github.com/neurodevs/${packageName}.git`
    }

    private static packageUrls = this.packageNames.map(this.generateUrl)

    private static setFakeGitRepoCloner() {
        GitRepoCloner.Class = FakeGitRepoCloner
        FakeGitRepoCloner.resetTestDouble()
    }

    private static NeurodevsRepoCloner() {
        return NeurodevsRepoCloner.Create()
    }
}
