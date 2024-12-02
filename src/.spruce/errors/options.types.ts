import { SpruceErrors } from "#spruce/errors/errors.types"
import { ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"

export interface DirPathDoesNotExistErrorOptions extends SpruceErrors.NodeRepoCloner.DirPathDoesNotExist, ISpruceErrorOptions {
	code: 'DIR_PATH_DOES_NOT_EXIST'
}

type ErrorOptions =  | DirPathDoesNotExistErrorOptions 

export default ErrorOptions
