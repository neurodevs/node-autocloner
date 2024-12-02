import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'gitCloneFailed',
    name: 'GIT_CLONE_FAILED',
    fields: {
        url: {
            type: 'text',
            isRequired: true,
        },
    },
})
