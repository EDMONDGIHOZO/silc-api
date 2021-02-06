'use strict'

const Relation = use('App/Models/InstitutionRelation')

class RelationController {
    /***  =========================  add relation institution value  ====================================  */
    async store({ request, response }) {
        let {
            collectionId,
            membersOpenedAccounts,
            membersCredited,
            creditedAmount,
            groupBankAccount,
            groupBankCredit,
        } = request.only([
            'collectionId',
            'membersOpenedAccounts',
            'membersCredited',
            'creditedAmount',
            'groupBankAccount',
            'groupBankCredit'
        ])

        // check that the collection exist
        const collection = await Relation.query()
          .where("collection_id", collectionId)
          .first();

        if (collection) {
          // update the amount in collection
          collection.merge({
            membres_ouvert_compte_bancaire: membersOpenedAccounts,
            membres_contracte_credit_bancaire: membersCredited,
            ouvert_compte_bancaire: groupBankAccount,
            groupe_ayant_contracte_credit_bancaire: groupBankCredit,
            montant_de_credit_bancaire_contracte: creditedAmount
          });
          await collection.save();

          return response.status(200).send({
            status: "success",
            message: "updated the data",
          });
        }

        try {
            const relation = await Relation.create({
                collection_id: collectionId,
                membres_ouvert_compte_bancaire: membersOpenedAccounts,
                membres_contracte_credit_bancaire: membersCredited,
                ouvert_compte_bancaire: groupBankAccount,
                groupe_ayant_contracte_credit_bancaire: groupBankCredit,
                montant_de_credit_bancaire_contracte: creditedAmount
            })

            return response.status(200).send({
                message: 'success',
                data: relation,
            })
        } catch (error) {
            return response.status(200).send({
                message: 'something is wrong',
                error: error,
            })
        }
    }
}

module.exports = RelationController
