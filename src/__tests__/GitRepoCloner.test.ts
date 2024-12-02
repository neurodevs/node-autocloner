import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import GitRepoCloner, { RepoCloner } from '../components/GitRepoCloner'

export default class RepoClonerTest extends AbstractSpruceTest {
    private static instance: RepoCloner

    protected static async beforeEach() {
        await super.beforeEach()

        this.instance = this.GitRepoCleaner()
    }

    @test()
    protected static async canCreateRepoCloner() {
        assert.isTruthy(this.instance, 'Should create a new instance!')
    }

    @test()
    protected static async runThrowsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = await assert.doesThrowAsync(() => this.instance.run())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['urls', 'dirPath'],
        })
    }

    @test()
    protected static async runThrowsIfDirPathDoesNotExist() {
        const err = await assert.doesThrowAsync(() =>
            this.instance.run({
                urls: [],
                dirPath: this.dirPath,
            })
        )
        errorAssert.assertError(err, 'DIR_PATH_DOES_NOT_EXIST', {
            dirPath: this.dirPath,
        })
    }

    private static readonly dirPath = generateId()

    private static GitRepoCleaner() {
        return GitRepoCloner.Create()
    }
}
