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

    protected static async beforeEach() {
        await super.beforeEach()

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

    private static chdirToOriginalDir() {
        chdir(this.originalDir)
    }

    private static callsToExecSync: string[] = []

    private static readonly urls = [generateId(), generateId()]

    private static readonly validDirPath = 'src'

    private static readonly invalidDirPath = generateId()

    private static GitRepoCleaner() {
        return GitRepoCloner.Create()
    }
}
