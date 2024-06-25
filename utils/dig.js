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

export const updateDig = async (id, fid) => {
  return fetch(`${process.env.API_HOST}/api/v1/digs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fid,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getLeaders = async () => {
  return fetch(`${process.env.API_HOST}/api/v1/digs/leaders`)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const getDigStatsByFid = async (fid) => {
  return fetch(`${process.env.API_HOST}/api/v1/digs/show_by_fid/${fid}`)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
