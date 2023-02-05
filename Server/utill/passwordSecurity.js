import bcrypt from "bcrypt";

const saltRounds = 10;

// let the saltrounds be changeable
export async function hashingPassword(password) {
    return await bcrypt.hash(password, saltRounds);
}

export async function comparePassword(loginPassword, hashedPassword) {
    return await bcrypt.compare(loginPassword, hashedPassword);
}

