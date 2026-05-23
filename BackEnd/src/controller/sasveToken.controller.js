import User from "../db/models/User.js";

export const saveToken = async (req, res) => {
  try {
    const { token } = req.body;
      const userId = req.user.id; 

    if (!userId || !token) {
      return res.status(400).json({ message: "Missing data" });
    }

    await User.update(
      { fcm_token: token },
      { where: { id: userId } }
    );

    res.json({ success: true, message: "Token saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};