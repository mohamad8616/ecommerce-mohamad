import ZarinPal from "zarinpal-node-sdk";

const zarinpal = new ZarinPal({
  merchantId: "9f612624-3434-44f8-8fb5-78ec42d0c41e",
  sandbox: true,
  accessToken: "your-access-token",
});

export default zarinpal;
