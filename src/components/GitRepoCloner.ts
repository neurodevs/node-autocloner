import fs from 'fs'
import { chdir } from 'process'
import { assertOptions } from '@sprucelabs/schema'
import SpruceError from '../errors/SpruceError'

export default class GitRepoCloner implements RepoCloner {
    public static Class?: RepoClonerConstructor

    private dirPath!: string

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async run(options: RepoClonerOptions) {
        const { dirPath } = assertOptions(options, ['urls', 'dirPath'])
        this.dirPath = dirPath

        this.throwIfDirPathDoesNotExist()

        chdir(this.dirPath)
    }

    private throwIfDirPathDoesNotExist() {
        if (!fs.existsSync(this.dirPath)) {
            throw new SpruceError({
                code: 'DIR_PATH_DOES_NOT_EXIST',
                dirPath: this.dirPath,
            })
        }
    }
}

export interface RepoCloner {
    run(options: RepoClonerOptions): Promise<void>
}

export type RepoClonerConstructor = new () => RepoCloner

export interface RepoClonerOptions {
    urls: string[]
    dirPath: string
}
