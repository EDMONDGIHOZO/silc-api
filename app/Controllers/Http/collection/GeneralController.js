'use strict'

const General = use('App/Models/GeneralRecord')

class GeneralController {
    /** =============== view all collections made ================================= */
    async index({ request, response }) {
            /** work on pagination */
            let { page } = request.all()
            page = page ? page : 1

            const records = await General.query().paginate(page ? page : 1, 12)

            if (records) {
                return response.status(302).send({
                    message: 'found data',
                    data: records,
                })
            } else {
                return response.status(204).send({
                    message: 'no data yet',
                })
            }
        }
        /** =============== view single collection ================================= */

    async show({ params, response }) {
        const collection = await General.query().where('id', params.id).first()

        if (collection) {
            return response.status(200).send({
                message: 'found',
                data: collection
            })
        } else {
            return response.status(404).send({
                message: 'not found'
            })
        }
    }

    /** =============== Create collection ================================= */

    async store({ request, auth, response }) {
        /** gather the user information */

        let {
            collectionDate,
            collectorName,
            newMembers,
            groupId,
            abandons,
            registeredMembers,
            boysAttended,
            girlsAttended,
        } = request.only([
            'collectionDate',
            'groupId',
            'abandons',
            'registeredMembers',
            'boysAttended',
            'girlsAttended',
            'collectorName',
            'newMembers',
        ])

        try {
            const collection = await General.create({
                collection_date: collectionDate,
                group_id: groupId,
                abandons: abandons,
                new_members: newMembers,
                registered_members: registeredMembers,
                collector_name: collectorName,
                girls_attended: girlsAttended,
                boys_attended: boysAttended,
            })

            return response.status(200).send({
                message: 'saved',
                data: collection,
            })
        } catch (error) {
            return response.status(501).send({
                message: 'not saved',
                error: error,
            })
        }
    }

    /** =============== Update  collection Details ================================= */
    async update({ request, params, response }) {
        /** get inputs */
        let {
            collectionDate,
            collectorName,
            newMembers,
            abandons,
            registeredMembers,
            boysAttended,
            girlsAttended,
        } = request.only([
            'collectionDate',
            'abandons',
            'registeredMembers',
            'boysAttended',
            'girlsAttended',
            'collectorName',
            'newMembers',
        ])

        /** get targeted collection */

        const collection = await General.query().where('id', params.id).first()

        if (collection) {
            try {
                /** update the collection  */
                collection.collection_date = collectionDate
                collection.collector_name = collectorName
                collection.new_members = newMembers
                collection.abandons = abandons
                collection.registered_members = registeredMembers
                collection.boys_attended = boysAttended
                collection.girls_attended = girlsAttended

                /** save the updates */
                await collection.save()

                return response.status(200).send({
                    message: 'collection updated',
                })
            } catch (error) {
                return response.status(404).send({
                    message: 'failed',
                    error: error,
                })
            }
        } else {
            return response.status(404).send({
                message: 'no collection found'
            })
        }
    }

    /** =============== delete  collection ================================= */

    async destroy({ params, response }) {
        const collection = await General.query().where('id', params.id).first()

        if (collection) {
            await collection.delete()

            return response.status(200).send({
                message: 'deleted collection'
            })
        } else {
            return response.status(404).send({
                message: 'already gone'
            })
        }
    }



}

module.exports = GeneralController