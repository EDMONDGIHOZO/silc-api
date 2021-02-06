'use strict'

const Role = use('App/Models/Role')

class RoleController {
    async index({ response }) {
        try {
            const roles = await Role.query().whereNotNull('name').fetch()
            if (roles) {
                return response.status(200).send({
                    data: roles,
                })
            } else {
                return response.status(404).send({
                    message: 'data not found',
                })
            }
        } catch (e) {
            return response.send({
                message: 'something is wrong',
                error: e,
            })
        }
    }

    /**** create the role ************/

    async store({ request, response }) {
        let name = request.only(['name'])

        //  check if the role name is new
        const oldName = await Role.query().where('name', name.name).first()
        if (oldName) {
            return response.status(200).send({
                message: 'the role already exists',
            })
        }
        //  create the new role

        const newRole = await Role.create({ name: name.name })
        return response.status(200).send({
            message: 'role is created',
            data: newRole,
        })
    }

    async destroy({ params, response }) {
        const role = await Role.query().where('id', params.id).first()

        if (role) {
            await role.delete()
            return response.status(200).send({
                message: "role is gone"
            })
        } else {
            return response.status(404).send({
                message: "the role already gone"
            })
        }
    }
}

module.exports = RoleController