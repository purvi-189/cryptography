const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04a310809f5a723f46415779a041ac15be5c8a43fe2f2a626dcfdad91424562429a91f490f2553b869e9308c55f410d64ee9dfa433a9ef4aac5801bb35f7d81eca": 100,
  "0x2c1c90bf1b1bdfdc2f8ef52716756578b254454ea5e229f329fe2e5afb55c7c6": 50,
  "04e19199d0c60ebd46a6f3668441c8f93288ae26d26d722003910655bb6a7ca2849bbf90f0c16a1eeb6e2ad6beaf2f8eb6e2bead331cb73db601ffd73903a3090a": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});



app.post("/send", (req, res) => {
  


  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
