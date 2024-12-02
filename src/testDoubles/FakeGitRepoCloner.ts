import { RepoClonerOptions } from '../abstract.types'

export default class FakeGitRepoCloner {
    public static numCallsToConstructor = 0
    public static callsToRun: RepoClonerOptions[] = []

    public constructor() {
        FakeGitRepoCloner.numCallsToConstructor++
    }

    public async run(options: RepoClonerOptions) {
        FakeGitRepoCloner.callsToRun.push(options)
    }

    public static resetTestDouble() {
        FakeGitRepoCloner.numCallsToConstructor = 0
        FakeGitRepoCloner.callsToRun = []
    }
}
