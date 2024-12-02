import { chdir } from 'process'
import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import { RepoCloner, RepoClonerOptions } from '../abstract.types'
import GitRepoCloner from '../components/GitRepoCloner'

export default class RepoClonerTest extends AbstractSpruceTest {
    private static instance: RepoCloner
    private static originalDir = process.cwd()
    private static originalExecSync = GitRepoCloner.execSync
    private static originalExistsSync = GitRepoCloner.existsSync

    protected static async beforeEach() {
        await super.beforeEach()

        this.resetFakes()
        this.fakeExecSync()
        this.chdirToOriginalDir()

        this.instance = this.GitRepoCleaner()
    }

    @test()
    protected static async canCreateRepoCloner() {
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

        GitRepoCloner.existsSync = () => true

        await this.run()

        assert.isLength(this.callsToExecSync, 0)
    }

    @test()
    protected static async throwsIfGitCloneFails() {
        GitRepoCloner.execSync = (_command: string) => {
            throw new Error(this.gitCloneFailedError)
        }

        const err = await assert.doesThrowAsync(() => this.run())

        errorAssert.assertError(err, 'GIT_CLONE_FAILED', {
            url: this.urls[0],
            originalError: this.gitCloneFailedError,
        })
    }

    private static run(options?: Partial<RepoClonerOptions>) {
        return this.instance.run({
            urls: this.urls,
            dirPath: this.validDirPath,
            ...options,
        })
    }

    private static fakeExecSync() {
        // @ts-ignore
        GitRepoCloner.execSync = (command: string) => {
            this.callsToExecSync.push(command)
        }
    }

    private static resetFakes() {
        GitRepoCloner.execSync = this.originalExecSync
        GitRepoCloner.existsSync = this.originalExistsSync
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

    private static GitRepoCleaner() {
        return GitRepoCloner.Create()
    }
}
