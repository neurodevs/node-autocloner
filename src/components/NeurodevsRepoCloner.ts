import { RepoClonerConstructor } from '../abstract.types'

export default class NeurodevsRepoCloner {
    public static Class?: RepoClonerConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }

    public async run() {}
}
