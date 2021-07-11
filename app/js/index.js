import Web3 from "web3";
import messageArtifact from "../../build/contracts/messageContract.json";
import fleek from "@fleekhq/fleek-storage-js";

// Credit: https://github.com/truffle-box/webpack-box/blob/master/app/src/index.js
const App = {
  
    web3: null,
  account: null,
  messageContract: null,

  start: async function () {
    // Connect to Web3 instance.
    const { web3 } = this;

    try {
      // Get contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = messageArtifact.networks[networkId];
      this.messageContract = new web3.eth.Contract(
        messageArtifact.abi,
        deployedNetwork.address
      );

      // Get accounts and refresh the balance.
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.refreshBalance();
    } catch (error) {
      console.error("Could not connect to contract or chain: ", error);
    }
  },

  storeMetadata: async function (name, to, message) {
    // Build the metadata.
    var metadata = {
      name: "Paper Trail",
      description: `message from ${name}`,
      to: to,
      message: message,
      timestamp: new Date().toISOString(),
    };

    // Configure the uploader.
    const uploadMetadata = {
      apiKey: "KlBFeA+IOCSibbOtRjqN9Q==",
      apiSecret: "k3X0fEIDpMiOw6y2x6OayqJXOvxnr4eT29Gwfb6IG0M=",
      key: `metadata/${metadata.timestamp}.json`,
      data: JSON.stringify(metadata),
    };

    // Tell the user message is sending.
    this.setStatus("Sending Message... please wait!");

    // Add the metadata to IPFS first, because our contract requires a
    // valid URL for the metadata address.
    const result = await fleek.upload(uploadMetadata);

    // Once the file is added, then we can send a message!
    this.sendMessage(to, result.publicUrl);
  },

  sendMessage: async function (to, metadataURL) {
    // Fetch the sendMessage method from our contract.
    const { sendMessage } = this.messageContract.methods;

    // Award the message.
    await sendMessage(to, metadataURL).send({ from: this.account });

    // Set the status and show the metadata link on IPFS.
    this.setStatus(
      `message sent! View the metadata <a href="${metadataURL}" target="_blank">here</a>.`
    );
  },

  setStatus: function (message) {
    $("#status").html(message);
  },
};

window.App = App;

// When all the HTML is loaded, run the code in the callback below.
$(document).ready(function () {
  // Detect Web3 provider.
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545")
    );
  }
  // Initialize Web3 connection.
  window.App.start();

  // Capture the form submission event when it occurs.
  $("#message-form").submit(function (e) {
    // Run the code below instead of performing the default form submission action.
    e.preventDefault();

    // Capture form data and create metadata from the submission.
    const name = $("#from").val();
    const to = $("#to").val();
    const message = $("#message").val();

    window.App.storeMetadata(name, to, message);
  });
});
