import { assertOptions } from '@sprucelabs/schema'
import { RepoCloner } from '../abstract.types'
import GitRepoCloner from './GitRepoCloner'

export default class NeurodevsRepoCloner implements PresetRepoCloner {
    public static Class?: PresetRepoClonerConstructor

    private cloner: RepoCloner
    private dirPath!: string

    protected constructor(cloner: RepoCloner) {
        this.cloner = cloner
    }

    public static Create() {
        const cloner = this.GitRepoCloner()
        return new (this.Class ?? this)(cloner)
    }

    public async run(dirPath: string) {
        assertOptions({ dirPath }, ['dirPath'])
        this.dirPath = dirPath

        await this.runGitCloner()
    }

    private async runGitCloner() {
        await this.cloner.run({
            urls: this.repoUrls,
            dirPath: this.dirPath,
        })
    }

    private repoNames = [
        'fili.js',
        'liblsl',
        'libxdf',
        'node-autoupgrader',
        'node-biometrics',
        'node-biosensors',
        'node-ble',
        'node-csv',
        'node-event-markers',
        'node-experiment-builder',
        'node-file-checker',
        'node-file-loader',
        'node-html-loader',
        'node-knowledge-graphs',
        'node-lsl',
        'node-mangled-names',
        'node-neuropype',
        'node-ppg',
        'node-server-plots',
        'node-signal-processing',
        'node-task-queue',
        'node-xdf',
        'react-connectivity-graphs',
    ]

    private generateUrl(repoName: string) {
        return `https://github.com/neurodevs/${repoName}.git`
    }

    private repoUrls = this.repoNames.map(this.generateUrl)

    private static GitRepoCloner() {
        return GitRepoCloner.Create()
    }
}

export interface PresetRepoCloner {
    run(dirPath: string): Promise<void>
}

export type PresetRepoClonerConstructor = new (
    cloner: RepoCloner
) => PresetRepoCloner
