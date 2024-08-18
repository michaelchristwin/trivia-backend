import bcyrpt from "bcrypt";
const saltRounds = 10;

export async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcyrpt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password", error);
  }
}

export async function ComparePassword(
  password: string,
  hashedPassword: string
) {
  try {
    const match = await bcyrpt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error("Error comparing password", error);
  }
}
