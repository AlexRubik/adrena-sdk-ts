// env imports
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

/**
 * Fetches clone statistics for a GitHub repository
 * 
 * @param owner - The GitHub username or organization that owns the repository
 * @param repo - The name of the repository
 * @param token - GitHub personal access token with repo permissions
 * @returns Promise resolving to the clone statistics
 */
export async function getGitHubCloneStats(
  owner: string,
  repo: string,
  token: string
): Promise<{
  count: number;
  uniques: number;
  clones: Array<{
    timestamp: string;
    count: number;
    uniques: number;
  }>;
}> {
  const url = `https://api.github.com/repos/${owner}/${repo}/traffic/clones?per=week`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API error (${response.status}): ${errorText}`);
  }
  
  return response.json();
}

// Example usage:
// const stats = await getGitHubCloneStats('AlexRubik', 'adrena-sdk-ts', 'ghp_your_token_here');
// console.log(`Total clones: ${stats.count}, Unique cloners: ${stats.uniques}`);

export async function runGitApi() {
  const stats = await getGitHubCloneStats('AlexRubik', 'adrena-sdk-ts', process.env.GIT_TOKEN as string);
  console.log(stats);

  // log to a json file
  fs.writeFileSync('./clone_stats/git_stats.json', JSON.stringify(stats, null, 2));
}

