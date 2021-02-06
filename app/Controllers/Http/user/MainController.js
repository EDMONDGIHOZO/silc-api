'use strict'

const User = use('App/Models/User')

class MainController {
    /** -================== show all users from database ======================= */
    async index({ response }) {
        /** get all the users */
        const users = await User.all()
        if (users.length === 0) {
            response.status(200).send({
                message: 'no users in db yet',
            })
        }

        return response.status(200).send({
            message: 'found users',
            data: users,
        })
    }

    /** ==============show single user details =================================*/

    async show({ params, response }) {
        /** get single usr from database by id */

        const user = await User.query().where('id', params.id).first()

        if (!user) {
            return response.status(404).send({
                message: 'not found',
            })
        }

        return response.status(200).send({
            message: 'success',
            data: user,
        })
    }

    /*** get the current user information */
    async profile({ auth, response }) {
        const currentUser = await auth.getUser()
        if (currentUser) {
            const user = await User.query().where('id', currentUser.id).with('role').first()
            return response.status(200).send({
                message: 'success',
                data: user,
            })
        } else {
            return response.status(404).send({
                message: 'notFound',
            })
        }
    }

    /*** ============= update single user data ================================ */

    async update({ request, params, response }) {
        /*** get the user update inputs  */
        let { lastname, firstname, username, email } = request.only([
            'lastname',
            'firstname',
            'username',
            'email',
        ])

        /** get the target user */
        try {
            const user = await User.query().where('id', params.id).first()
            if (!user) {
                return response.status(404).send({
                    message: 'not found',
                })
            }

            /** update the user details */
            user.lastname = lastname
            user.firstname = firstname
            user.username = username
            user.email = email
            await user.save()

            return response.status(200).send({
                message: 'info updated',
            })
        } catch (error) {
            return response.status(404).send({
                message: 'fail',
                error: error,
            })
        }
    }

    /********** update the user password ===============================*/
    async reset({ request, params, response }) {
        /*** get the user update inputs  */
        let { password } = request.only(['password'])

        /** get the target user */
        try {
            const user = await User.query().where('id', params.id).first()
            if (!user) {
                return response.status(404).send({
                    message: 'not found',
                })
            }
            /** update the user details */
            user.email = password
            await user.save()

            return response.status(200).send({
                message: 'password  updated',
            })
        } catch (error) {
            return response.status(404).send({
                message: 'fail',
                error: error,
            })
        }
    }

    /** ------------------------------- Delete user from database ------------- */

    async delete({ params, response }) {
        /*** get the user from db */
        const user = await User.query().where('id', params.id).first()
        if (!user) {
            return response.status(404).send({
                message: 'not found',
            })
        }
        /** delete the user  */
        await user.delete()

        return response.status(200).send({
            message: 'user removed from database',
        })
    }
}

module.exports = MainController