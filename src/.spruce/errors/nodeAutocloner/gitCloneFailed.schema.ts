import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const gitCloneFailedSchema: SpruceErrors.NodeAutocloner.GitCloneFailedSchema  = {
	id: 'gitCloneFailed',
	namespace: 'NodeAutocloner',
	name: 'GIT_CLONE_FAILED',
	    fields: {
	            /** . */
	            'url': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(gitCloneFailedSchema)

export default gitCloneFailedSchema
