const verifyToken = require("../../src/services/verifyToken");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
test("jest works",()=>{
    expect(true).toBe(true);
})
test("verifyToken function does works",() => {
    const obj = {
        name: "John",
        lastname: "Doe"
    }
    const token = jwt.sign(obj,JWT_SECRET);
    jwt.verify(token,JWT_SECRET,(err,user)=>{
        expect(user.name).toBe(obj.name);
        expect(user.lastname).toBe(obj.lastname);
    })
})
