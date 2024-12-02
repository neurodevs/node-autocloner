import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface GitCloneFailedErrorOptions extends SpruceErrors.NodeAutocloner.GitCloneFailed, ISpruceErrorOptions {
	code: 'GIT_CLONE_FAILED'
}
export interface DirPathDoesNotExistErrorOptions extends SpruceErrors.NodeAutocloner.DirPathDoesNotExist, ISpruceErrorOptions {
	code: 'DIR_PATH_DOES_NOT_EXIST'
}

type ErrorOptions =  | GitCloneFailedErrorOptions  | DirPathDoesNotExistErrorOptions 

export default ErrorOptions
