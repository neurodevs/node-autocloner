import { assertOptions } from '@sprucelabs/schema'
import { Autocloner } from '../abstract.types'
import GitAutocloner from './GitAutocloner'

export default class NeurodevsAutocloner implements PresetUrlsAutocloner {
    public static Class?: PresetUrlsAutoclonerConstructor

    private autocloner: Autocloner
    private dirPath!: string

    protected constructor(autocloner: Autocloner) {
        this.autocloner = autocloner
    }

    public static Create() {
        const autocloner = this.GitAutocloner()
        return new (this.Class ?? this)(autocloner)
    }

    public async run(dirPath: string) {
        assertOptions({ dirPath }, ['dirPath'])
        this.dirPath = dirPath

        await this.runGitCloner()
    }

    private async runGitCloner() {
        await this.autocloner.run({
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

    private static GitAutocloner() {
        return GitAutocloner.Create()
    }
}

export interface PresetUrlsAutocloner {
    run(dirPath: string): Promise<void>
}

export type PresetUrlsAutoclonerConstructor = new (
    cloner: Autocloner
) => PresetUrlsAutocloner