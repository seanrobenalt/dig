import { PinataFDK } from "pinata-fdk";
import { ethers } from "ethers";
import { canFidDig, createDig } from "../../utils/dig";
import { getAddressByFid } from "../../utils/pinata";

const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721IncorrectOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721InsufficientApproval",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC721InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "ERC721InvalidOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC721InvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC721InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC721InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ERC721NonexistentToken",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "MetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "string",
        name: "tokenURI",
        type: "string",
      },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMaxSupply",
        type: "uint256",
      },
    ],
    name: "setMaxSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferGrail",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "initialOwner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "_isTokenMinted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CC0_LICENSE",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentTokenId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemainingNFTs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const fdk = new PinataFDK({
  pinata_jwt: process.env.PINATA_JWT,
  pinata_gateway: process.env.PINATA_GATEWAY,
});

const CONTRACT_ADDRESS = "0x142407b2D618f7DA94bE2194f426B532f3405949";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { isValid, message } = await fdk.validateFrameMessage(req.body);

      if (!isValid) {
        return res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://www.dig.bingo/error.png" />
              <meta property="og:image" content="https://www.dig.bingo/error.png" />
              <meta property="fc:frame:image:aspect_ratio" content="1:1" />
              <meta property="fc:frame:button:1" content="Dig" />
              <meta property="fc:frame:button:1:action" content="post" />
              <meta
                property="fc:frame:button:1:post_url"
                content="https://www.dig.bingo/api/play"
              />
              <meta property="fc:frame:button:2" content="NFT" />
              <meta property="fc:frame:button:2:action" content="link" />
              <meta
                property="fc:frame:button:2:target"
                content="https://explorer.ham.fun/token/0x142407b2D618f7DA94bE2194f426B532f3405949/instance/1"
              />
              <meta property="fc:frame:button:3" content="Tokens" />
              <meta property="fc:frame:button:3:action" content="link" />
              <meta
                property="fc:frame:button:3:target"
                content="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
              />
              <meta property="fc:frame:button:4" content="Rules" />
              <meta property="fc:frame:button:4:action" content="link" />
              <meta
                property="fc:frame:button:4:target"
                content="https://www.dig.bingo/rules"
              />
            </head>
          </html>
        `);
      } else {
        const { fid } = message.data;

        const canDig = await canFidDig(fid);

        if (canDig.can_dig) {
          let ethAddress = await fdk.getEthAddressForFid(fid);

          if (ethAddress && !ethAddress.startsWith("0x")) {
            ethAddress = await getAddressByFid(fid);
          }

          const provider = new ethers.JsonRpcProvider("https://rpc.ham.fun");
          const wallet = new ethers.Wallet(process.env.PK, provider);
          const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

          const currentHolder = await contract.ownerOf(1);

          if (currentHolder == ethAddress) {
            return res.status(200).send(`
              <!DOCTYPE html>
              <html>
                <head>
                  <meta property="fc:frame" content="vNext" />
                  <meta property="fc:frame:image" content="https://www.dig.bingo/youOwnIt.png" />
                  <meta property="og:image" content="https://www.dig.bingo/youOwnIt.png" />
                  <meta property="fc:frame:button:1" content="Share" />
                  <meta property="fc:frame:button:1:action" content="link" />
                  <meta
                    property="fc:frame:button:1:target"
                    content="https://warpcast.com/~/compose?text=I%27ve+got+the+Dig%2C+play+the+game+by+%40sean07.eth&embeds[]=https%3A%2F%2Fwww.dig.bingo%2Fplay"
                  />
                  <meta property="fc:frame:button:2" content="NFT" />
                  <meta property="fc:frame:button:2:action" content="link" />
                  <meta
                    property="fc:frame:button:2:target"
                    content="https://explorer.ham.fun/token/0x142407b2D618f7DA94bE2194f426B532f3405949/instance/1"
                  />
                  <meta property="fc:frame:button:3" content="Tokens" />
                  <meta property="fc:frame:button:3:action" content="link" />
                  <meta
                    property="fc:frame:button:3:target"
                    content="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
                  />
                  <meta property="fc:frame:button:4" content="Rules" />
                  <meta property="fc:frame:button:4:action" content="link" />
                  <meta
                    property="fc:frame:button:4:target"
                    content="https://www.dig.bingo/rules"
                  />
                  <meta property="fc:frame:image:aspect_ratio" content="1:1" />
                </head>
              </html>
            `);
          }

          const tx = await contract.transferGrail(currentHolder, ethAddress, 1);

          createDig(fid, ethAddress, tx.hash);

          return res.status(200).send(`
            <!DOCTYPE html>
            <html>
              <head>
                <meta property="fc:frame" content="vNext" />
                <meta property="fc:frame:image" content="https://www.dig.bingo/youOwnIt.png" />
                <meta property="og:image" content="https://www.dig.bingo/youOwnIt.png" />
                <meta property="fc:frame:button:1" content="Share" />
                <meta property="fc:frame:button:1:action" content="link" />
                <meta
                  property="fc:frame:button:1:target"
                  content="https://warpcast.com/~/compose?text=I%27ve+got+the+Dig%2C+play+the+game+by+%40sean07.eth&embeds[]=https%3A%2F%2Fwww.dig.bingo%2Fplay"
                />
                <meta property="fc:frame:button:2" content="NFT" />
                <meta property="fc:frame:button:2:action" content="link" />
                <meta
                  property="fc:frame:button:2:target"
                  content="https://explorer.ham.fun/token/0x142407b2D618f7DA94bE2194f426B532f3405949/instance/1"
                />
                <meta property="fc:frame:button:3" content="Tokens" />
                <meta property="fc:frame:button:3:action" content="link" />
                <meta
                  property="fc:frame:button:3:target"
                  content="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
                />
                <meta property="fc:frame:button:4" content="Rules" />
                <meta property="fc:frame:button:4:action" content="link" />
                <meta
                  property="fc:frame:button:4:target"
                  content="https://www.dig.bingo/rules"
                />
                <meta property="fc:frame:image:aspect_ratio" content="1:1" />
              </head>
            </html>
        `);
        } else {
          return res.status(200).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://www.dig.bingo/cannotDig.png" />
              <meta property="og:image" content="https://www.dig.bingo/cannotDig.png" />
              <meta property="fc:frame:button:1" content="Dig" />
              <meta property="fc:frame:button:1:action" content="post" />
              <meta
                property="fc:frame:button:1:post_url"
                content="https://www.dig.bingo/api/play"
              />
              <meta property="fc:frame:button:2" content="NFT" />
              <meta property="fc:frame:button:2:action" content="link" />
              <meta
                property="fc:frame:button:2:target"
                content="https://explorer.ham.fun/token/0x142407b2D618f7DA94bE2194f426B532f3405949/instance/1"
              />
              <meta property="fc:frame:button:3" content="Tokens" />
              <meta property="fc:frame:button:3:action" content="link" />
              <meta
                property="fc:frame:button:3:target"
                content="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
              />
              <meta property="fc:frame:button:4" content="Rules" />
              <meta property="fc:frame:button:4:action" content="link" />
              <meta
                property="fc:frame:button:4:target"
                content="https://www.dig.bingo/rules"
              />
              <meta property="fc:frame:image:aspect_ratio" content="1:1" />
            </head>
          </html>
        `);
        }
      }
    } catch (e) {
      console.error(e);
      return res.status(500).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content="https://www.dig.bingo/unsuccess.png" />
            <meta property="og:image" content="https://www.dig.bingo/unsuccess.png" />
            <meta property="fc:frame:button:1" content="Dig" />
            <meta property="fc:frame:button:1:action" content="post" />
            <meta
              property="fc:frame:button:1:post_url"
              content="https://www.dig.bingo/api/play"
            />
            <meta property="fc:frame:button:2" content="NFT" />
            <meta property="fc:frame:button:2:action" content="link" />
            <meta
              property="fc:frame:button:2:target"
              content="https://explorer.ham.fun/token/0x142407b2D618f7DA94bE2194f426B532f3405949/instance/1"
            />
            <meta property="fc:frame:button:3" content="Tokens" />
            <meta property="fc:frame:button:3:action" content="link" />
            <meta
              property="fc:frame:button:3:target"
              content="https://basescan.org/address/0x156c132c93ce88bbab04313ef456f093d6957409"
            />
            <meta property="fc:frame:button:4" content="Rules" />
            <meta property="fc:frame:button:4:action" content="link" />
            <meta
              property="fc:frame:button:4:target"
              content="https://www.dig.bingo/rules"
            />
            <meta property="fc:frame:image:aspect_ratio" content="1:1" />
          </head>
        </html>
      `);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
