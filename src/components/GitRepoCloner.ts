import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { chdir } from 'process'
import { assertOptions } from '@sprucelabs/schema'
import { buildLog } from '@sprucelabs/spruce-skill-utils'
import {
    RepoCloner,
    RepoClonerConstructor,
    RepoClonerOptions,
} from '../abstract.types'
import SpruceError from '../errors/SpruceError'

export default class GitRepoCloner implements RepoCloner {
    public static Class?: RepoClonerConstructor
    public static execSync = execSync
    public static existsSync = existsSync

    private urls!: string[]
    private dirPath!: string
    private currentUrl!: string
    private log = buildLog('GitRepoCloner')

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async run(options: RepoClonerOptions) {
        const { urls, dirPath } = assertOptions(options, ['urls', 'dirPath'])
        this.urls = urls
        this.dirPath = dirPath

        this.throwIfDirPathDoesNotExist()
        this.changeDirectoryToDirPath()
        this.cloneReposFromUrls()
    }

    private throwIfDirPathDoesNotExist() {
        if (!this.existsSync(this.dirPath)) {
            throw new SpruceError({
                code: 'DIR_PATH_DOES_NOT_EXIST',
                dirPath: this.dirPath,
            })
        }
    }

    private changeDirectoryToDirPath() {
        chdir(this.dirPath)
    }

    private cloneReposFromUrls() {
        this.urls.forEach((url) => {
            this.currentUrl = url
            this.cloneRepo()
        })
    }

    private cloneRepo() {
        if (!this.existsSync(this.currentRepoName)) {
            this.execSync(`git clone ${this.currentUrl}`)
        } else {
            this.log.info(this.repoExistsMessage)
        }
    }

    private get currentRepoName() {
        return this.currentUrl.match(this.regex)![1]
    }

    private get existsSync() {
        return GitRepoCloner.existsSync
    }

    private get execSync() {
        return GitRepoCloner.execSync
    }
    private get repoExistsMessage() {
        return `Repo already exists, skipping: ${this.currentRepoName}!`
    }

    private readonly regex = /\/([a-zA-Z0-9_-]+)\.git/
}
