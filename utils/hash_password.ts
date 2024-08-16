import bcyrpt from "bcrypt";
const saltRounds = 10;

async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcyrpt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password", error);
  }
}

export default hashPassword;
