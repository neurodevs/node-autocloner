import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const gitCloneFailedSchema: SpruceErrors.NodeRepoCloner.GitCloneFailedSchema  = {
	id: 'gitCloneFailed',
	namespace: 'NodeRepoCloner',
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
