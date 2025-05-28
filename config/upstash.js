import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const rateLimiter = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(3, "60 s"),
});

export default rateLimiter;
