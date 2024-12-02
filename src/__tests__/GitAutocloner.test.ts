import { chdir } from 'process'
import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import GitAutocloner, {
    Autocloner,
    AutoclonerOptions,
} from '../components/GitAutocloner'

export default class AutoclonerTest extends AbstractSpruceTest {
    private static instance: Autocloner
    private static originalDir = process.cwd()
    private static originalExecSync = GitAutocloner.execSync
    private static originalExistsSync = GitAutocloner.existsSync

    protected static async beforeEach() {
        await super.beforeEach()

        this.resetFakes()
        this.fakeExecSync()
        this.chdirToOriginalDir()

        this.instance = this.GitAutocloner()
    }

    @test()
    protected static async canCreateAutocloner() {
        assert.isTruthy(this.instance, 'Should create a new instance!')
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = await assert.doesThrowAsync(() => this.instance.run())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['urls', 'dirPath'],
        })
    }

    @test()
    protected static async throwsIfDirPathDoesNotExist() {
        const err = await assert.doesThrowAsync(() =>
            this.run({ dirPath: this.invalidDirPath })
        )

        errorAssert.assertError(err, 'DIR_PATH_DOES_NOT_EXIST', {
            dirPath: this.invalidDirPath,
        })
    }

    @test()
    protected static async changesCurrentDirectoryToDirPath() {
        await this.run()

        const actual = process.cwd().split('/').pop()

        assert.isEqual(
            actual,
            this.validDirPath,
            'Should change current directory to the dirPath!'
        )
    }

    @test()
    protected static async callsGitCloneForEachUrl() {
        await this.run()

        this.urls.forEach((url) => {
            assert.doesInclude(this.callsToExecSync, `git clone ${url}`)
        })
    }

    @test()
    protected static async doesNotCallGitCloneIfUrlExists() {
        await this.run()

        this.callsToExecSync = []
        this.chdirToOriginalDir()

        GitAutocloner.existsSync = () => true

        await this.run()

        assert.isLength(this.callsToExecSync, 0)
    }

    @test()
    protected static async throwsIfGitCloneFails() {
        GitAutocloner.execSync = (_command: string) => {
            throw new Error(this.gitCloneFailedError)
        }

        const err = await assert.doesThrowAsync(() => this.run())

        errorAssert.assertError(err, 'GIT_CLONE_FAILED', {
            url: this.urls[0],
            originalError: this.gitCloneFailedError,
        })
    }

    @test()
    protected static async worksWithPeriodInRepoName() {
        const repoName = `/${generateId()}.${generateId()}.git`
        await this.run({ urls: [repoName] })
    }

    private static run(options?: Partial<AutoclonerOptions>) {
        return this.instance.run({
            urls: this.urls,
            dirPath: this.validDirPath,
            ...options,
        })
    }

    private static fakeExecSync() {
        // @ts-ignore
        GitAutocloner.execSync = (command: string) => {
            this.callsToExecSync.push(command)
        }
    }

    private static resetFakes() {
        GitAutocloner.execSync = this.originalExecSync
        GitAutocloner.existsSync = this.originalExistsSync
    }

    private static chdirToOriginalDir() {
        chdir(this.originalDir)
    }

    private static generateUrl() {
        return `https://github.com/${generateId()}.git`
    }

    private static callsToExecSync: string[] = []

    private static readonly urls = [this.generateUrl(), this.generateUrl()]

    private static readonly validDirPath = 'src'

    private static readonly invalidDirPath = generateId()

    private static readonly gitCloneFailedError = 'Failed to clone repo!'

    private static GitAutocloner() {
        return GitAutocloner.Create()
    }
}
