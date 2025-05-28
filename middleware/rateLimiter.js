import rateLimiter from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimiter.limit("req.ip");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("RateLimit error", error);
    next(error);
  }
};

export default ratelimiter;
