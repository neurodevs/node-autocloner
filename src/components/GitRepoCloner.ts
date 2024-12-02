export default class GitRepoCloner implements RepoCloner {
    public static Class?: RepoClonerConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface RepoCloner {}

type RepoClonerConstructor = new () => RepoCloner
