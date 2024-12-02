import { AutoclonerOptions } from '../components/GitAutocloner'

export default class FakeGitAutocloner {
    public static numCallsToConstructor = 0
    public static callsToRun: AutoclonerOptions[] = []

    public constructor() {
        FakeGitAutocloner.numCallsToConstructor++
    }

    public async run(options: AutoclonerOptions) {
        FakeGitAutocloner.callsToRun.push(options)
    }

    public static resetTestDouble() {
        FakeGitAutocloner.numCallsToConstructor = 0
        FakeGitAutocloner.callsToRun = []
    }
}
