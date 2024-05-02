import { PrismaClient } from "@prisma/client"
import request from "supertest";
import app from "../app"

const prisma = new PrismaClient()

describe("GET /api/users", () => {

  const sampleUsers = [
    {
      id: 1,
      firstName: "john",
      lastName: 'doe',
      email: "john.doe@gmail.com",
      createdAt: new Date()
    },
    {
      id: 2,
      firstName: "jane",
      lastName: 'dine',
      email: "jane.dine@gmail.com",
      createdAt: new Date()
    },
  ]

  beforeAll(async () => {
    await prisma.$connect()
  })

  beforeEach(async () => {
    const users = await prisma.user.findMany()
    if (users.length == 0) {
      console.log("test ====> ")
      await prisma.user.createMany({
        data: sampleUsers
      })
    }
  })

  afterEach(async () => {
    await prisma.user.deleteMany({ where: {} })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it("should return an array of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "ok",
      users: sampleUsers.map((item) => {
        return {
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email
        }
      })
    });
  });
});
