import { RepoClonerConstructor } from '../abstract.types'
import GitRepoCloner from './GitRepoCloner'

export default class NeurodevsRepoCloner {
    public static Class?: RepoClonerConstructor

    protected constructor() {}

    public static Create() {
        GitRepoCloner.Create()
        return new (this.Class ?? this)()
    }

    public async run() {}
}
