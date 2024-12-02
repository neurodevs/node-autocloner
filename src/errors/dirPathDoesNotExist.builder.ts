import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'dirPathDoesNotExist',
    name: 'DIR_PATH_DOES_NOT_EXIST',
    fields: {
        dirPath: {
            type: 'text',
            isRequired: true,
        },
    },
})
