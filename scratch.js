const createUser = (body) => {
    return new Promise(function (resolve, reject) {
      const { email, password, password_check } = body;
  
      if (password !== password_check) {
        return reject("The two passwords do not match.");
      }
  
      pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, password],
        (error, results) => {
          if (error) {
            reject(error);
          }
  
          const user_id = results.rows[0].id;
          const refresh_token = generateRefreshToken();
  
          pool.query(
            'INSERT INTO refresh_token (user_id, token) VALUES ($1, $2)',
            [user_id, refresh_token],
            (error) => {
              if (error) {
                reject(error);
              }
  
              resolve({
                message: `A new user has been added`,
                user_id: user_id,
                refresh_token: refresh_token,
              });
            }
          );
        }
      );
    });
  };
  