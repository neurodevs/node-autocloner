import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const dirPathDoesNotExistSchema: SpruceErrors.NodeRepoCloner.DirPathDoesNotExistSchema  = {
	id: 'dirPathDoesNotExist',
	namespace: 'NodeRepoCloner',
	name: 'DIR_PATH_DOES_NOT_EXIST',
	    fields: {
	            /** . */
	            'dirPath': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(dirPathDoesNotExistSchema)

export default dirPathDoesNotExistSchema
