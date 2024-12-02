import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
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
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = await assert.doesThrowAsync(() => this.instance.run())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['dirPath'],
        })
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
        await this.instance.run(this.dirPath)

        const options = FakeGitRepoCloner.callsToRun[0]

        assert.isEqualDeep(options, {
            urls: this.repoUrls,
            dirPath: this.dirPath,
        })
    }

    private static repoNames = [
        'fili.js',
        'liblsl',
        'libxdf',
        'node-autoupgrader',
        'node-biometrics',
        'node-biosensors',
        'node-ble',
        'node-csv',
        'node-event-markers',
        'node-experiment-builder',
        'node-file-checker',
        'node-file-loader',
        'node-html-loader',
        'node-knowledge-graphs',
        'node-lsl',
        'node-mangled-names',
        'node-neuropype',
        'node-ppg',
        'node-server-plots',
        'node-signal-processing',
        'node-task-queue',
        'node-xdf',
        'react-connectivity-graphs',
    ]

    private static generateUrl(repoName: string) {
        return `https://github.com/neurodevs/${repoName}.git`
    }

    private static repoUrls = this.repoNames.map(this.generateUrl)

    private static readonly dirPath = generateId()

    private static setFakeGitRepoCloner() {
        GitRepoCloner.Class = FakeGitRepoCloner
        FakeGitRepoCloner.resetTestDouble()
    }

    private static NeurodevsRepoCloner() {
        return NeurodevsRepoCloner.Create()
    }
}
