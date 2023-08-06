import consoleDev from "~/utils/console";
import { TOKEN } from "./environment";

const fetchGitHubRateLimit = async () => {
  try {
    const response = await fetch("https://api.github.com/rate_limit", {
      headers: {
        Authorization: TOKEN || 'NOTOKEN'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    consoleDev(error)
  }
};

export { fetchGitHubRateLimit }