export const canFidDig = async (fid) => {
  return fetch(`${process.env.API_HOST}/api/v1/digs/can_dig_again/${fid}`)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const createDig = async (fid, address, tx) => {
  return fetch(`${process.env.API_HOST}/api/v1/digs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fid,
      address,
      tx,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
