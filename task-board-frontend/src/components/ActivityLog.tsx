// src/components/ActivityLog.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ActivityLog: React.FC = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/activity-log").then((response) => {
      setLogs(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Activity Log</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.action} on task {log.taskId} at {log.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityLog;
