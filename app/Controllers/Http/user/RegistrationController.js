'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class RegistrationController {
    async store({ request, response }) {
        /** gather the user inputs */

        let { username, email, firstname, lastname, password } = request.only([
            'username',
            'email',
            'firstname',
            'lastname',
            'password',
        ])

        /** fetch the default role for the user  */
        const user_role = await Database.from('roles')
            .where('name', 'collector')
            .first()
        if (!user_role) {
            return response.status(404).send({
                message: 'failed to get the user role',
            })
        }
        /** store the user to db */
        const user = await User.create({
            username: username,
            email: email,
            password: password,
            role_id: user_role.id,
            firstname: firstname,
            lastname: lastname
        })

        return response.status(200).send({
            message: 'success',
            data: user,
        })
    }
}

module.exports = RegistrationController