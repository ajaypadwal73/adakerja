let request = require("supertest");

request = request('http://localhost:8000');

const messageIds = [
    // Valid messageIds
    {
        messageId: "m_v3lwuD8FtspmDblUyLy-DmQL21r7VDHUhliwo4JHxACPNbFpvTozHM5ThKzoEUXk_ADbJiwoQi5oYZDe9KpLIg",
        statusCode: 200,
    },
    {
        messageId: "m_MZ2FDisC9aKE3y3HB-1JN2QL21r7VDHUhliwo4JHxAAoWAYh7H4zBKOGCcAegORkhNCqffxrIqjbYTyRDYk1Fw",
        statusCode: 200,
    },
    {
        messageId: "m_woXE_vR99jZViGcOSPkIz2QL21r7VDHUhliwo4JHxAConGpn_FLqlnebZAmnqRRoc94csnGWb7sWdw0DFJCNJA",
        statusCode: 200,
    },

    // Invalid messages
    {
        messageId: "1",
        statusCode: 404,
    },
    {
        messageId: " ",
        statusCode: 404,
    },
    {
        statusCode: 404,
    }
]

describe("GET / ", () => {
    test("Testing /messages endpoint", async () => {
        const response = await request.get("/messages");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });
    test("Testing /summary endpoint", async () => {
        const response = await request.get("/summary");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        response.body.forEach(sender => {
            expect(sender).toHaveProperty("messages");
        })
    });
    test("Testing /message/:id endpoint", () => {
        messageIds.forEach(async(messageId) => {
            const response = await request.get(`/message/${messageId.messageId}`);
            expect(response.statusCode).toBe(messageId.statusCode);
        });
    });
});

