export const register = async (req, res) => res.json({ status: "success", payload: req.user });
export const login = async (req, res) => res.cookie("cookieToken", req.user.token).json({ status: "success", payload: req.user });
export const logout = (req, res) => res.clearCookie("cookieToken").send({ status: "success", message: "Logged out" });

export const getUser = async (req, res) => {
  const user = req.user;
  if (!user)
    return res.status(404).json({ status: "error", error: "User not found" });
  res.json({ status: "success", payload: user });
};