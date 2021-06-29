const ERR_INPUT__MISSING_DATA = {code:'ERR_INPUT__MISSING_DATA', message:'Faltan datos', status: 400};

const ERR_BOOK__NOT_FOUND = {code:'ERR_BOOK__NOT_FOUND', message: 'Libro no encontrado', status: 404};

const ERR_USER__NOT_FOUND = {code:'ERR_USER__NOT_FOUND', message: 'Usuario no encontrado', status: 404};
const ERR_USER__INVALID_GENDER = {code:'ERR_USER__INVALID_GENDER', message: 'Género no válido', status: 400};
const ERR_USER__EXISTING_ALIAS = {code:'ERR_USER__EXISTING_USER_ALIAS', message: 'Ya existe un usuario con ese alias', status:400};
const ERR_USER__EXISTING_MAIL = {code:'ERR_USER__EXISTING_USER_MAIL', message: 'Ese mail ya está registrado', status: 400};


const ERR_LOGIN__INVALID_USER = {code:'ERR_LOGIN__INVALID_USER', message: 'Usuario no válido', satus: 400};
const ERR_LOGIN__INVALID_PASSWORD = {code:'ERR_LOGIN__INVALID_PASSWORD', message: 'Contraseña incorrecta', status: 400};

module.exports = {
ERR_INPUT__MISSING_DATA,
ERR_BOOK__NOT_FOUND,
ERR_USER__NOT_FOUND,
ERR_USER__INVALID_GENDER,
ERR_USER__EXISTING_ALIAS,
ERR_USER__EXISTING_MAIL,
ERR_LOGIN__INVALID_USER,
ERR_LOGIN__INVALID_PASSWORD
}