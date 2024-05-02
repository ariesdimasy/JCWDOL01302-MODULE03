import { prismaMock } from "../setup_test/singleton";
import { getUser } from "../setup_test/function";
import { resolve } from "path";

test("should return an array of users ", async () => {
    prismaMock.user.findMany.mockResolvedValue(
        [
            {
                id: 1,
                firstName: "john",
                lastName: 'doe',
                email: "john.doe@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                firstName: "jane",
                lastName: 'dine',
                email: "jane.dine@gmail.com",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]
    )

    await expect(getUser()).resolves.toEqual([
        [{
            id: 1,
            firstName: "john",
            lastName: 'doe',
            email: "john.doe@gmail.com",
        },
        {
            id: 2,
            firstName: "jane",
            lastName: 'dine',
            email: "jane.dine@gmail.com",

        }]
    ])
})




