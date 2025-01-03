import React from 'react';
import { Settings, Bell, Lock, Globe, Database } from 'lucide-react';

export function SettingsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold flex items-center">
          <Settings className="mr-2" />
          Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Bell className="mr-2 text-blue-500" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email Notifications</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Lock className="mr-2 text-green-500" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Two-Factor Auth</span>
              <input type="checkbox" className="toggle" />
            </div>
            <button className="w-full px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
              Change Password
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Database className="mr-2 text-purple-500" />
            <h2 className="text-lg font-semibold">Data Management</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Auto Backup</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </div>
            <button className="w-full px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}