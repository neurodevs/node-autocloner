import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const dirPathDoesNotExistSchema: SpruceErrors.NodeAutocloner.DirPathDoesNotExistSchema  = {
	id: 'dirPathDoesNotExist',
	namespace: 'NodeAutocloner',
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
