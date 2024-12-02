import { RepoCloner } from '../abstract.types'
import GitRepoCloner from './GitRepoCloner'

export default class NeurodevsRepoCloner implements PresetRepoCloner {
    public static Class?: PresetRepoClonerConstructor

    private cloner: RepoCloner

    protected constructor(cloner: RepoCloner) {
        this.cloner = cloner
    }

    public static Create() {
        const cloner = this.GitRepoCloner()
        return new (this.Class ?? this)(cloner)
    }

    public async run() {
        await this.cloner.run({
            urls: this.packageUrls,
            dirPath: '',
        })
    }

    private packageNames = ['node-lsl', 'node-xdf']

    private generateUrl(packageName: string) {
        return `https://github.com/neurodevs/${packageName}.git`
    }

    private packageUrls = this.packageNames.map(this.generateUrl)

    private static GitRepoCloner() {
        return GitRepoCloner.Create()
    }
}

export interface PresetRepoCloner {
    run(): Promise<void>
}

export type PresetRepoClonerConstructor = new () => PresetRepoCloner
