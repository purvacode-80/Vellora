// Dashboard.js
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import axios from "axios";
import { format, startOfWeek, addWeeks, differenceInCalendarWeeks } from "date-fns";
import "react-circular-progressbar/dist/styles.css";
import "../css/Analytics_Dashboard.css";
import { FaTasks } from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import { RiProgress6Line } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";

// Main purple color #9d4edd and derived shades
const MAIN_PURPLE = "#9d4edd";
const PURPLE_DARK = "#6a31b4"; // darker shade for borders
const PURPLE_LIGHT = "#c6a8f8"; // lighter shade for backgrounds, highlights
const PURPLE_MEDIUM = "#8a3ddb"; // medium shade for text
const white = "#ffffff";

const STATUS_COLORS = {
  "Not Started": MAIN_PURPLE,
  Deferred: PURPLE_LIGHT,
  "In Progress": PURPLE_MEDIUM,
  Completed: PURPLE_DARK,
};

const PRIORITY_COLORS = {
  High: PURPLE_DARK,
  Medium: MAIN_PURPLE,
  Low: PURPLE_LIGHT,
};

function getWeekYearKey(date) {
  const year = date.getFullYear();
  const weekStart = startOfWeek(date, { weekStartsOn: 1 });
  return `${year}-W${format(weekStart, "II")}`;
}

function generateFullWeekRange(tasks) {
  const dates = tasks
    .map((t) => new Date(t.assigneddate))
    .filter((date) => !isNaN(date));

  if (dates.length === 0) return [];

  const minDate = startOfWeek(new Date(Math.min(...dates)), {
    weekStartsOn: 1,
  });
  const maxDate = startOfWeek(new Date(Math.max(...dates)), {
    weekStartsOn: 1,
  });

  let weeksCount = differenceInCalendarWeeks(maxDate, minDate) + 1;
  
  // Ensure at least 10 weeks are shown
  if (weeksCount < 10) {
    weeksCount = 10;
  }

  const weeks = [];

  for (let i = 0; i < weeksCount; i++) {
    const currentWeek = addWeeks(minDate, i);
    const key = getWeekYearKey(currentWeek);
    weeks.push(key);
  }

  return weeks;
}

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/task/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const deferred = tasks.filter((t) => t.status === "Deferred").length;
  const notStarted = tasks.filter((t) => t.status === "Not Started").length;
  const weightedProgress = (completed * 1.0 + inProgress * 0.5) / (total || 1);
  const percentDone = Math.round(weightedProgress * 100);

  const countByStatus = [
    "Not Started",
    "Deferred",
    "In Progress",
    "Completed",
  ].map((status) => ({
    name: status,
    count: tasks.filter((t) => t.status === status).length,
  }));

  const countByPriority = ["High", "Medium", "Low"].map((priority) => ({
    name: priority,
    value: tasks.filter((t) => t.priority === priority).length,
  }));

  // GROUP BY WEEK
  const groupedByWeek = tasks.reduce((acc, task) => {
    const date = new Date(task.assigneddate);
    if (isNaN(date)) return acc;
    const key = getWeekYearKey(date);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // Generate full week range with 0 values and at least 10 weeks
  const fullWeeks = generateFullWeekRange(tasks);
  const lineData = fullWeeks.map((week) => ({
    week,
    count: groupedByWeek[week] || 0,
  }));

  return (
    <div className="min-vh-100 dashboard-container" style={{marginTop:"10px", marginLeft:"0px"}}>
      <div className="container-fluid py-4">
      <div className="bg-white rounded shadow-sm border mb-4 summary-grid">
        <div className="my-2 py-3 summary-card purple-border text-center">
          <div className="bg-primary bg-opacity-10 icon-circle">
            <FaTasks className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="big fw-medium mb-1">Total Tasks</p>
            <p className="h2 fw-bold mb-1"> {total}</p>
          </div>
        </div>
        <div className="my-2 py-3 summary-card purple-border text-center">
          <div className="bg-success bg-opacity-10 icon-circle">
            <MdTaskAlt className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="big fw-medium mb-1">Completed</p>
            <p className="h2 fw-bold mb-1"> {completed}</p>
          </div>
        </div>
        <div className="my-2 py-3 summary-card purple-border text-center">
          <div className="bg-warning bg-opacity-10 icon-circle">
            <RiProgress6Line className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="big fw-medium mb-1">In Progress</p>
            <p className="h2 fw-bold mb-1"> {inProgress} </p>
          </div>
        </div>
        <div className="my-2 py-3 summary-card purple-border text-center">
          <div className="bg-info bg-opacity-10 icon-circle">
            <MdOutlineWatchLater className="w-6 h-6 text-info" />
          </div>
          <div>
            <p className="big fw-medium mb-1">Deferred</p>
            <p className="h2 fw-bold mb-1"> {deferred} </p>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="bg-white rounded shadow-sm p-4 border h-100">
            <h3 className="h5 fw-semibold text-dark mb-3 text-center">
              Tasks by Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={countByStatus}>
                <XAxis dataKey="name" tick={{ fill: MAIN_PURPLE }} />
                <YAxis allowDecimals={false} tick={{ fill: MAIN_PURPLE }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: white,
                    borderColor: MAIN_PURPLE,
                  }}
                  labelStyle={{ color: MAIN_PURPLE }}
                  itemStyle={{ color: MAIN_PURPLE }}
                />
                <Bar dataKey="count">
                  {countByStatus.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={STATUS_COLORS[entry.name]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-white rounded shadow-sm p-4 border h-100">
            <h3 className="h5 fw-semibold text-dark mb-3 text-center">
              Tasks by Priority
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={countByPriority}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={{ fill: MAIN_PURPLE, fontWeight: "600" }}
                >
                  {countByPriority.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PRIORITY_COLORS[entry.name]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: white,
                    borderColor: MAIN_PURPLE,
                  }}
                  labelStyle={{ color: MAIN_PURPLE }}
                  itemStyle={{ color: MAIN_PURPLE }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="priority-legend mt-1">
              {Object.entries(PRIORITY_COLORS).map(([label, color]) => (
                <div key={label} className="legend-item">
                  <span
                    className="dot"
                    style={{ backgroundColor: color }}
                  ></span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="bg-white rounded shadow-sm p-4 border h-100">
            <h3 className="h5 fw-semibold text-dark mb-3 text-center">
              Tasks Added Per Week
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={lineData}
                margin={{ top: 20, right: 30, bottom: 5 }}
              >
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 12, fill: MAIN_PURPLE }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  height={60}
                />
                <YAxis allowDecimals={false} tick={{ fill: MAIN_PURPLE }} />
                <Tooltip
                  formatter={(value) => [`${value} tasks`, "Added"]}
                  labelFormatter={(label) => `Week: ${label}`}
                  contentStyle={{
                    backgroundColor: white,
                    borderColor: MAIN_PURPLE,
                  }}
                  labelStyle={{ color: MAIN_PURPLE }}
                  itemStyle={{ color: MAIN_PURPLE }}
                />
                <CartesianGrid strokeDasharray="3 3" stroke={PURPLE_MEDIUM} />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={MAIN_PURPLE}
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    stroke: MAIN_PURPLE,
                    strokeWidth: 2,
                    fill: PURPLE_LIGHT,
                  }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="bg-white rounded shadow-sm p-4 border h-100">
          <h3 className="h5 fw-semibold text-dark mb-3 text-center">
            Overall Taskboard Progress
          </h3>
          <div style={{ width: 180, height: 180, margin: "2em auto" }}>
            <CircularProgressbar
              value={percentDone}
              text={`${percentDone}%`}
              styles={buildStyles({
                pathColor: MAIN_PURPLE,
                textColor: MAIN_PURPLE,
                trailColor: PURPLE_LIGHT,
              })}
            />
          </div>
          <p className="mt-3 text-center fs-6">
            {completed} completed, {inProgress} in progress
            <br />
            Estimated progress: <strong>{percentDone}%</strong>
          </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}