export interface RepoCloner {
    run(options: RepoClonerOptions): Promise<void>
}

export type RepoClonerConstructor = new () => RepoCloner

export interface RepoClonerOptions {
    urls: string[]
    dirPath: string
}
