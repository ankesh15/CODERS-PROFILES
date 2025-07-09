const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /api/github
router.post('/github', async (req, res) => {
  const { username } = req.body;
  try {
    // Fetch user profile
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    // Fetch repos for language stats
    const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = reposRes.data;
    // Aggregate language usage
    const languageStats = {};
    repos.forEach(repo => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });
    res.json({
      profile: userRes.data,
      languageStats
    });
  } catch (err) {
    res.status(404).json({ error: 'GitHub user not found or API error.' });
  }
});

// POST /api/leetcode
router.post('/leetcode', async (req, res) => {
  const { username } = req.body;
  try {
    // Unofficial LeetCode API endpoint
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    const response = await axios.get(url);
    res.json({ profile: response.data });
  } catch (err) {
    res.status(404).json({ error: 'LeetCode user not found or API error.' });
  }
});

// POST /api/codeforces
router.post('/codeforces', async (req, res) => {
  const { username } = req.body;
  try {
    // Official Codeforces API endpoint
    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      res.json({ profile: response.data.result[0] });
    } else {
      res.status(404).json({ error: 'Codeforces user not found.' });
    }
  } catch (err) {
    res.status(404).json({ error: 'Codeforces user not found or API error.' });
  }
});

// POST /api/codechef
router.post('/codechef', async (req, res) => {
  const { username } = req.body;
  try {
    // Third-party CodeChef API endpoint
    const url = `https://codechef-api.vercel.app/${username}`;
    const response = await axios.get(url);
    if (response.data.status === 'success') {
      res.json({ profile: response.data.data });
    } else {
      res.status(404).json({ error: 'CodeChef user not found.' });
    }
  } catch (err) {
    res.status(404).json({ error: 'CodeChef user not found or API error.' });
  }
});

module.exports = router; 