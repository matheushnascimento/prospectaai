//#region imports
import database from "infra/database";
import password from "models/password";
import { ValidationError, NotFoundError } from "infra/errors";
//#endregion

async function create(userInputValues) {
  await validateUniqueUsername(userInputValues.username);
  const newUser = runInsertQuery(userInputValues);
  return newUser;

  async function runInsertQuery(userInputValues) {
    const result = await database.query({
      text: `
      INSERT INTO
        users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
      ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });
    return result.rows[0];
  }
}

async function validateUniqueUsername(username) {
  const result = await database.query({
    text: `
    SELECT
      *
    FROM
      users
    WHERE
  LOWER(username) = LOWER($1)`,
    values: [username],
  });

  if (result.rowCount > 0) {
    throw ValidationError({
      message: "O username informado já está sendo utilizado",
      action: "Utilize outro username para realizar esta operação",
    });
  }
}

const user = {
  create,
};

export default user;
