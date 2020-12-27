'use strict'

const Diocese = use('App/Models/Diocese')

class MainController {
    /** --------------------------- VIEW ALL  THE DIOCESES -------------------------- */

    async index({ response }) {
        /** get all dioceses */

        const dioceses = await Diocese.all()
        return response.status(200).send({
            message: 'success',
            data: dioceses,
        })
    }

    /** --------------------------- SHOW SINGLE DIOCESE -------------------------- */

    async show({ params, response }) {
        const dio = await Diocese.query().where('id', params.id).first()

        if (dio) {
            return response.status(200).send({
                message: 'found',
                data: dio,
            })
        } else {
            response.status(404).send({
                message: 'not found',
            })
        }
    }

    /** --------------------------- CREATE THE DIOCESE -------------------------- */

    async store({ request, response }) {
            /** create diocese */
            let { name } = request.only(['name'])

            try {
                const dio = await Diocese.create({ name: name })

                return response.status(200).send({
                    message: 'success',
                    data: dio,
                })
            } catch (error) {
                return response.status(404).send({
                    message: 'error',
                    error: error.sqlMessage,
                })
            }
        }
        /** --------------------------- EDIT THE DIOCESE -------------------------- */

    async update({ request, params, response }) {
        /** get user inputs */
        let { name } = request.only(['name'])
        const dio_id = params.id

        /** find the target diocese */
        const dio = await Diocese.query().where('id', dio_id).first()

        if (dio) {
            dio.name = name

            await dio.save()

            return response.status(200).send({
                message: 'updated successfully',
            })
        }

        return response.status(400).send({
            message: 'failed',
        })
    }

    /** --------------------------- DELETE THE DIOCESE -------------------------- */

    async destroy({ params, response }) {
        /** get the dioceses */

        try {
            const dio = await Diocese.query().where('id', params.id).first()

            if (dio) {
                await dio.delete()
                return response.status(200).send({
                    message: 'deleted',
                })
            }

            return response.status(404).send({
                message: 'not found',
            })
        } catch (error) {
            return response.status(404).send({
                error: error,
            })
        }
    }
}

module.exports = MainController