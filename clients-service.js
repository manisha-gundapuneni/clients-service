const express = require('express');
const WebSocket = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const usageStore = new Map();

const MAX_USAGE = 1000; // Allow 1000 packets

function captions(count) {
    const captions_text = [
        "Returning captions response."
    ];
    return captions_text[count % captions_text.length];
}

wss.on('connection', (ws, req) => {
    const sessionToken = req.headers['sec-websocket-protocol'];
    if (!sessionToken) {
        ws.send("Error: Missing session token.");
        ws.close();
        return;
    }

    if (!usageStore.has(sessionToken)) {
        usageStore.set(sessionToken, 0);
    }

    ws.on('message', (message) => {
        const clientUsage = usageStore.get(sessionToken);
        
        if (clientUsage >= MAX_USAGE) {
            ws.send("Error: Usage limit exceeded.");
            ws.close();
            return;
        }

        const caption = captions(clientUsage);
        usageStore.set(sessionToken, clientUsage + 1);
        
        ws.send(JSON.stringify({ caption }));

        console.log(`Client ${sessionToken} used ${clientUsage + 1} caption packets.`);
    });

    ws.on('close', () => {
        console.log(`Client ${sessionToken} closed.`);
    });
});

app.get('/usage/:sessionToken', (req, res) => {
    const sessionToken = req.params.sessionToken;
    if (usageStore.has(sessionToken)) {
        res.json({ usage: usageStore.get(sessionToken) });
    } else {
        res.status(404).json({ error: "Client not found." });
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
