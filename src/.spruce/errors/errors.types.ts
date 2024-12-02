import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'






export declare namespace SpruceErrors.NodeRepoCloner {

	
	export interface GitCloneFailed {
		
			
			'url': string
	}

	export interface GitCloneFailedSchema extends SpruceSchema.Schema {
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

	export type GitCloneFailedEntity = SchemaEntity<SpruceErrors.NodeRepoCloner.GitCloneFailedSchema>

}


export declare namespace SpruceErrors.NodeRepoCloner {

	
	export interface DirPathDoesNotExist {
		
			
			'dirPath': string
	}

	export interface DirPathDoesNotExistSchema extends SpruceSchema.Schema {
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

	export type DirPathDoesNotExistEntity = SchemaEntity<SpruceErrors.NodeRepoCloner.DirPathDoesNotExistSchema>

}




