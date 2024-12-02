import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'






export declare namespace SpruceErrors.NodeAutocloner {

	
	export interface GitCloneFailed {
		
			
			'url': string
	}

	export interface GitCloneFailedSchema extends SpruceSchema.Schema {
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

	export type GitCloneFailedEntity = SchemaEntity<SpruceErrors.NodeAutocloner.GitCloneFailedSchema>

}


export declare namespace SpruceErrors.NodeAutocloner {

	
	export interface DirPathDoesNotExist {
		
			
			'dirPath': string
	}

	export interface DirPathDoesNotExistSchema extends SpruceSchema.Schema {
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

	export type DirPathDoesNotExistEntity = SchemaEntity<SpruceErrors.NodeAutocloner.DirPathDoesNotExistSchema>

}




