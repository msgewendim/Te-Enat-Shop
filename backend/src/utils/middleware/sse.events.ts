import express, { Router } from "express";

const router: Router = express.Router();
let clients: Array<Client> = [];

router.get("/", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res,
  };
  clients.push(newClient);

  req.on("close", () => {
    clients = clients.filter((client) => client.id !== clientId);
  });
});

type Client = {
  id: number;
  res: express.Response;
};

export function sendPaymentNotification(userId: string) {
  clients.forEach((client) => {
    client.res.write(
      `data: ${JSON.stringify({ event: "payment_success", userId })}\n\n`
    );
  });
}

export default router;
