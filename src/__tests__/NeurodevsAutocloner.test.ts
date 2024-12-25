import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import GitAutocloner from '../components/GitAutocloner'
import NeurodevsAutocloner, {
    PresetUrlsAutocloner,
} from '../components/NeurodevsAutocloner'
import FakeGitAutocloner from '../testDoubles/FakeGitAutocloner'

export default class NeurodevsAutoclonerTest extends AbstractSpruceTest {
    private static instance: PresetUrlsAutocloner

    protected static async beforeEach() {
        await super.beforeEach()

        this.setFakeGitAutocloner()

        this.instance = this.NeurodevsAutocloner()
    }

    @test()
    protected static async canCreateNeurodevsAutocloner() {
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
    protected static async createsGitAutocloner() {
        assert.isEqual(
            FakeGitAutocloner.numCallsToConstructor,
            1,
            'Should create a new instance of GitAutocloner!'
        )
    }

    @test()
    protected static async callsGitAutoclonerWithExpectedOptions() {
        await this.instance.run(this.dirPath)

        const options = FakeGitAutocloner.callsToRun[0]

        assert.isEqualDeep(options, {
            urls: this.repoUrls,
            dirPath: this.dirPath,
        })
    }

    private static repoNames = [
        'fili.js',
        'labrecorder',
        'liblsl',
        'libxdf',
        'node-autocloner',
        'node-autopackage',
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
        'node-test-counter',
        'node-xdf',
        'react-connectivity-graphs',
    ]

    private static generateUrl(repoName: string) {
        return `https://github.com/neurodevs/${repoName}.git`
    }

    private static repoUrls = this.repoNames.map(this.generateUrl)

    private static readonly dirPath = generateId()

    private static setFakeGitAutocloner() {
        GitAutocloner.Class = FakeGitAutocloner
        FakeGitAutocloner.resetTestDouble()
    }

    private static NeurodevsAutocloner() {
        return NeurodevsAutocloner.Create()
    }
}
