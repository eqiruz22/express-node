import bcrypt from "bcrypt";

export const MatchPassword = async (pass, match) => {
  const data = await bcrypt.compare(pass, match);
  return data;
};
