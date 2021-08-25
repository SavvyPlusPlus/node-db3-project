const db = require('../../data/db-config')



const checkSchemeId = async (req, res, next) => {
  try {
    const existing = await db('schemes')
      .where('scheme_id', req.params.scheme_id)
      .first()
    if (!existing) {
      next({
        status: 404,
        message: `scheme with schem_id ${req.params.scheme_id} not found`,
      })
    } else {
      next()
    }
  } catch (err) {
    next()
  }
}


const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body
  if (
    scheme_name === undefined ||
    typeof scheme_name !== 'string' ||
    !scheme_name.trim()
  ) {
    next({ status: 400, message: 'invalid scheme_name' })
  } else {
    next()
  }
}

const validateStep = (req, res, next) => {
  const { instuctions, step_number } = req.body
  if (
    instuctions === undefined ||
    typeof instuctions !== 'string' ||
    !instuctions.trim() || typeof step_number !== 'number' ||
    step_number < 1
  ) {
    const error = { status: 400, message: 'invalid step' }
    next(error)
  } else {
    next()
  }
}


module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
