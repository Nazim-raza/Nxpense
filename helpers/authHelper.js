import bcrypt from "bcrypt";

//Authentication Steps

//==========1st Step hashedPassword==============
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//=========2nd step Compare password === Hashedpassword==============
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//==========3rd Step check Token JWT============
