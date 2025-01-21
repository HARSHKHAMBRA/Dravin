import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import './styles.css';  // Import external CSS

interface DbConfig {
  username: string;
  dbName: string;
  password: string;
  host: string;
  port: string;
}

export const DatabaseConfigPage: React.FC = () => {
  const [dbConfig, setDbConfig] = useState<DbConfig>({
    username: "",
    dbName: "",
    password: "",
    host: "",
    port: "",
  });

  const [connectionMessage, setConnectionMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true); // Track form visibility

  // Check the connection status when component is mounted
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const checkConnectionResponse = await fetch('http://localhost:3000/api/check-connection');
        const connectionStatus = await checkConnectionResponse.json();

        if (connectionStatus.success) {
          setIsConnected(true);
          setConnectionMessage('Successfully connected to the database!');
          setIsFormVisible(false); // Hide the form if connected
        } else {
          setIsConnected(false);
          setConnectionMessage('Failed to connect to the database.');
        }
      } catch (error) {
        setConnectionMessage(`Error: ${error.message}`);
        setIsConnected(false);
      }
    };

    checkConnection();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDbConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { host, username, dbName, password, port } = dbConfig;

    // Check if all fields are filled
    if (host && username && dbName && password && port) {
      try {
        // Sending POST request to save database config
        const response = await fetch('http://localhost:3000/api/save-db-config', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dbConfig),
        });

        if (!response.ok) {
          throw new Error('Failed to save database config.');
        }

        const message = await response.text();
        setConnectionMessage(message);

        // Check connection status again after saving
        const checkConnectionResponse = await fetch('http://localhost:3000/api/check-connection');
        const connectionStatus = await checkConnectionResponse.json();

        if (connectionStatus.success) {
          setIsConnected(true);
          setConnectionMessage('Successfully connected to the database!');
          setIsFormVisible(false); // Hide the form if connected
        } else {
          setIsConnected(false);
          setConnectionMessage('Failed to connect to the database.');
        }

        // Reset form after successful connection
        setDbConfig({
          username: "",
          dbName: "",
          password: "",
          host: "",
          port: "",
        });

      } catch (error) {
        setConnectionMessage(`Error: ${error.message}`);
        setIsConnected(false);
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="max-w-lg w-full glass p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Connection Form</h2>

        {/* Only show the form if not connected */}
        {isFormVisible && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="host" className="block text-sm font-semibold text-White-700">Host</label>
              <input
                type="text"
                id="host"
                name="host"
                value={dbConfig.host}
                onChange={handleChange}
                className="w-full p-3 bg-White-800 text-white rounded-lg border border-White-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter host"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-White-700">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={dbConfig.username}
                onChange={handleChange}
                className="w-full p-3 bg-White-800 text-white rounded-lg border border-White-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="database" className="block text-sm font-semibold text-White-700">Database</label>
              <input
                type="text"
                id="database"
                name="dbName"
                value={dbConfig.dbName}
                onChange={handleChange}
                className="w-full p-3 bg-White-800 text-white rounded-lg border border-White-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter database name"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-White-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={dbConfig.password}
                onChange={handleChange}
                className="w-full p-3 bg-White-800 text-white rounded-lg border border-White-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label htmlFor="port" className="block text-sm font-semibold text-White-700">Port</label>
              <input
                type="text"
                id="port"
                name="port"
                value={dbConfig.port}
                onChange={handleChange}
                className="w-full p-3 bg-White-800 text-white rounded-lg border border-White-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter port"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Connect
              </button>
            </div>
          </form>
        )}

        {/* Display the connection status */}
        {connectionMessage && (
          <ul id="connection-list" className="space-y-2 text-sm">
            <li className={`flex items-center space-x-2 ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
              <i className={`fas fa-check-circle ${isConnected ? 'text-green-500' : 'text-red-500'}`}></i>
              <span>{connectionMessage}</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
