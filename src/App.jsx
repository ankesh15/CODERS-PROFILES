import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const [count, setCount] = useState(0);
  const [dataC, setDataC] = useState([]);
  const [newS, setNew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("2022/01/01");
  const [endDate, setEndDate] = useState(new Date());
  const [leetcode, setLeetcode] = useState("");
  const [CodeForces, setCodeForces] = useState("");
  const [ApiDataCf, setApiDataCf] = useState([]);
  const[github,setGithub]=useState("");
  const [GithubApi, setGithubApi] = useState([]);
  const [loadGithub, setLoadGithub] = useState(true);
  const[leetLoading,setLeetLoading]=useState(true);
  const [languageStats, setLanguageStats] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const getDataFromLeetCode = async () => {
    setLeetLoading(true);
    setError(null);
    try {
      const value = await axios.post(`${API_BASE}/leetcode`, { username: leetcode });
      if (value.data.profile) {
        setDataC(value.data.profile.submissionCalendar || {});
        setCount(1);
      } else {
        setError('No data found for this LeetCode user.');
      }
    } catch (err) {
      setError('Failed to fetch LeetCode data.');
    }
    setLeetLoading(false);
  };

  useEffect(() => {
    getDataFromLeetCode();
  }, []);

  const getDataFromCodeForces = async () => {
    try {
      const value = await axios.post(`${API_BASE}/codeforces`, { username: CodeForces });
      console.log(value.data);
      console.log(value.data.result);
      const tempData = ApiDataCf;
      const myArray = value.data.result;
      myArray.forEach((element) => {
        var myDate = new Date(`${element.creationTimeSeconds}` * 1000)
          .toISOString()
          .replace("-", "/")
          .split("T")[0]
          .replace("-", "/");
        tempData.push({ date: `${myDate}`, count: `5` });
      });

      setApiDataCf(tempData);
      tempData.splice();
      setLoading(false);

      console.log(ApiDataCf[1]);
      console.log(ApiDataCf);
    } catch (err) {
      console.log('Codeforces API error', err);
    }
  };

  const getContributions = async (token, username) => {
    const headers = {
      'Authorization': `bearer ${token}`,
    }
    const body = {
      "query": `query {
          user(login: "${username}") {
            name
            contributionsCollection {
              contributionCalendar {
                colors
                totalContributions
                weeks {
                  contributionDays {
                    color
                    contributionCount
                    date
                    weekday
                  }
                  firstDay
                }
              }
            }
          } 
        }`
    }
    const response = await fetch(`${import.meta.env.VITE_GIT}`, { method: 'POST', body: JSON.stringify(body), headers: headers })
    const data = await response.json()
    return data;
  }

  const geGithubData = async () => {
    try {
      const value = await axios.post(`${API_BASE}/github`, { username: github });
      if (value.data.languageStats) {
        setLanguageStats(Object.entries(value.data.languageStats).map(([name, value]) => ({ name, value })));
      }
      if (value.data.user.contributionsCollection.contributionCalendar.weeks) {
        setLoadGithub(true);
        const tempArray = value.data.user.contributionsCollection.contributionCalendar.weeks;
        const tepmValues = GithubApi;
        tempArray.forEach((element, index, array) => {
          const innerDays = element.contributionDays;
          innerDays.forEach((element, index, array) => {
            if (element.contributionCount > 0) {
              tepmValues.push({ date: `${element.date}`, count: `${element.contributionCount}` });
              console.log(element.date);
              console.log(element.contributionCount);
            }
          });
        });

        setGithubApi(tepmValues);
        console.log(GithubApi);
        setLoadGithub(false);
      }
    } catch (err) {
      console.log('GitHub API error', err);
    }
  }

  useEffect(() => {
    geGithubData();
  }, [setLoadGithub]);

  const handleYear = () => {
    setStartDate(new Date('2021/01/01'));
    setEndDate(new Date('2021/12/30'));
  }

  const getInitialState = () => {
    const value = "2022";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
    setStartDate(new Date(`${e.target.value}/01/01`));
    setEndDate(new Date(`${e.target.value}/12/30`));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LeetCode Card */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">LeetCode HeatMap</h2>
          <input type="text" onChange={(e) => setLeetcode(e.target.value)} placeholder="Username" className="border p-2 rounded w-full mb-2" />
          <button onClick={getDataFromLeetCode} className="bg-yellow-500 text-white px-4 py-2 rounded mb-2">Leetcode</button>
          {leetLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : newS.length > 1 ? (
            <CalendarHeatmap startDate={startDate} endDate={endDate} values={newS} />
          ) : null}
        </div>
        {/* Codeforces Card */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Codeforces HeatMap</h2>
          <input type="text" onChange={(e) => setCodeForces(e.target.value)} placeholder="Username" className="border p-2 rounded w-full mb-2" />
          <button onClick={getDataFromCodeForces} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">Codeforces</button>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <CalendarHeatmap startDate={startDate} endDate={endDate} values={ApiDataCf} />
          )}
        </div>
        {/* GitHub Card */}
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">GitHub HeatMap</h2>
          <input type="text" onChange={(e) => setGithub(e.target.value)} placeholder="Username" className="border p-2 rounded w-full mb-2" />
          <button onClick={geGithubData} className="bg-gray-800 text-white px-4 py-2 rounded mb-2">Github</button>
          {loadGithub ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <CalendarHeatmap startDate={startDate} endDate={endDate} values={GithubApi} />
          )}
        </div>
      </div>
      {/* Pie Chart for GitHub Language Usage */}
      {languageStats && languageStats.length > 0 && (
        <div className="bg-white rounded shadow p-4 my-8">
          <h2 className="text-xl font-bold mb-2">GitHub Language Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={languageStats} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {languageStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFE', '#FF6699'][index % 6]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default App;
