export const getAddressByFid = async (fid) => {
  const options = {
    method: "GET",
    headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` },
  };

  const response = await fetch(
    `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
    options
  );

  const data = await response.json();

  return data.user.custody_address;
};
