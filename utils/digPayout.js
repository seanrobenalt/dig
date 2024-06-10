export const createDigPayout = async (address, token, tx) => {
  return fetch(`${process.env.API_HOST}/api/v1/dig_payouts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address,
      token,
      tx,
    }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
