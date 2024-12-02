import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { chdir } from 'process'
import { assertOptions } from '@sprucelabs/schema'
import { buildLog } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'

export default class GitAutocloner implements Autocloner {
    public static Class?: AutoclonerConstructor
    public static execSync = execSync
    public static existsSync = existsSync

    private urls!: string[]
    private dirPath!: string
    private currentUrl!: string
    private currentError!: any
    private log = buildLog('GitAutocloner')

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async run(options: AutoclonerOptions) {
        const { urls, dirPath } = assertOptions(options, ['urls', 'dirPath'])
        this.urls = urls
        this.dirPath = dirPath

        this.throwIfDirPathDoesNotExist()
        this.changeDirectoryToDirPath()
        this.cloneReposFromUrls()
    }

    private throwIfDirPathDoesNotExist() {
        if (!this.dirPathExists) {
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
            this.cloneCurrentUrl()
        })
    }

    private cloneCurrentUrl() {
        if (!this.currentRepoExists) {
            this.tryToCloneRepo()
        } else {
            this.log.info(this.repoExistsMessage)
        }
    }

    private tryToCloneRepo() {
        try {
            this.execSync(`git clone ${this.currentUrl}`)
        } catch (err: any) {
            this.currentError = err
            this.throwGitCloneFailed()
        }
    }

    private throwGitCloneFailed() {
        throw new SpruceError({
            code: 'GIT_CLONE_FAILED',
            url: this.currentUrl,
            originalError: this.currentError.message,
        })
    }

    private get dirPathExists() {
        return this.existsSync(this.dirPath)
    }

    private get currentRepoName() {
        return this.currentUrl.match(this.regex)![1]
    }

    private get currentRepoExists() {
        return this.existsSync(this.currentRepoName)
    }

    private get repoExistsMessage() {
        return `Repo already exists, skipping: ${this.currentRepoName}!`
    }

    private get existsSync() {
        return GitAutocloner.existsSync
    }

    private get execSync() {
        return GitAutocloner.execSync
    }

    private readonly regex = /\/([a-zA-Z0-9_.-]+)\.git/
}

export interface Autocloner {
    run(options: AutoclonerOptions): Promise<void>
}

export type AutoclonerConstructor = new () => Autocloner

export interface AutoclonerOptions {
    urls: string[]
    dirPath: string
}
