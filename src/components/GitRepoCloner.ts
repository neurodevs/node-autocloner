import { assertOptions } from '@sprucelabs/schema'

export default class GitRepoCloner implements RepoCloner {
    public static Class?: RepoClonerConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async run(options: RepoClonerOptions) {
        assertOptions(options, ['urls', 'dirPath'])
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
