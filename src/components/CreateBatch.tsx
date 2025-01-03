import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
export function CreateBatch()
 {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceName: '',
    template: '',
    vendor: '',
    countryCode: '',
    activateQueue: 'NO',
    source: 'Excel/CSV',
    dataFile: null,
    sheet: '',
    batchName: 'Batch_20250101_110604',
    batchStartDate: '2025-01-01T00:00',
    batchEndDate: '2025-01-01T23:59',
    importTime: '2025-01-01T11:08',
    dncCheck: 'NO',
    fieldRulesCheck: 'NO',
    invalidListCheck: 'NO',
    zonesCheck: 'NO',
    dncAction: '0',
    saveAsTemplate: ''
  });
  const handleBack = () => {
    navigate(-1); // Navigates to the previous page
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        dataFile: e.target.files[0],
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Form Data Submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-4">
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="text-xl font-bold">Create Batch</h1>
        </div>
        <div className="flex items-center">
          <input
            className="p-2 rounded bg-white text-black mr-4"
            placeholder="Batch Search..."
            type="text"
          />
          <button className="p-2 bg-white text-black rounded">
            <i className="fas fa-search"></i>
          </button>
          <button className="p-2 bg-white text-black rounded ml-4">
            <i className="fas fa-star"></i>
          </button>
          <button className="p-2 bg-white text-black rounded ml-4">
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </header>
      <button
            onClick={handleBack}
            className="text-white bg-gray-600 px-4 py-2 rounded mr-4"
          >
            Back
          </button>

      {/* Content */}
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Import Parameters</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Service Name */}
            <div>
              <label className="block mb-2">Service Name</label>
              <select
                name="serviceName"
                value={formData.serviceName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select service</option>
              </select>
            </div>

            {/* Template */}
            <div>
              <label className="block mb-2">Template</label>
              <select
                name="template"
                value={formData.template}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Template</option>
              </select>
            </div>

            {/* Vendor */}
            <div>
              <label className="block mb-2">Vendor</label>
              <select
                name="vendor"
                value={formData.vendor}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="0 - None">0 - None</option>
              </select>
            </div>

            {/* Country Code */}
            <div>
              <label className="block mb-2">Country Code</label>
              <input
                name="countryCode"
                value={formData.countryCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                placeholder="Country Code"
                type="text"
              />
            </div>

            {/* Activate And Queue */}
            <div>
              <label className="block mb-2">Activate And Queue</label>
              <select
                name="activateQueue"
                value={formData.activateQueue}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block mb-2">Source</label>
              <select
                name="source"
                value={formData.source}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="Excel/CSV">Excel/CSV</option>
              </select>
            </div>

            {/* Data File */}
            <div>
              <label className="block mb-2">Data File</label>
              <input
                name="dataFile"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                type="file"
              />
            </div>

            {/* Table/Sheet */}
            <div>
              <label className="block mb-2">Table/Sheet</label>
              <select
                name="sheet"
                value={formData.sheet}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select sheet</option>
              </select>
            </div>

            {/* Batch Name */}
            <div>
              <label className="block mb-2">Batch Name</label>
              <input
                name="batchName"
                value={formData.batchName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                type="text"
              />
            </div>

            {/* Batch Start Date */}
            <div>
              <label className="block mb-2">Batch Start Date</label>
              <input
                name="batchStartDate"
                value={formData.batchStartDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                type="datetime-local"
              />
            </div>

            {/* Batch End Date */}
            <div>
              <label className="block mb-2">Batch End Date</label>
              <input
                name="batchEndDate"
                value={formData.batchEndDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                type="datetime-local"
              />
            </div>

            {/* Import Time */}
            <div>
              <label className="block mb-2">Import Time</label>
              <input
                name="importTime"
                value={formData.importTime}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                type="datetime-local"
              />
            </div>
          </div>

          <h2 className="text-lg font-bold mb-4">Others</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Check In Dnc */}
            <div>
              <label className="block mb-2">Check In Dnc</label>
              <select
                name="dncCheck"
                value={formData.dncCheck}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Check In Field Rules */}
            <div>
              <label className="block mb-2">Check In Field Rules</label>
              <select
                name="fieldRulesCheck"
                value={formData.fieldRulesCheck}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Check In Invalid List */}
            <div>
              <label className="block mb-2">Check In Invalid List</label>
              <select
                name="invalidListCheck"
                value={formData.invalidListCheck}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Check In Zones */}
            <div>
              <label className="block mb-2">Check In Zones</label>
              <select
                name="zonesCheck"
                value={formData.zonesCheck}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="NO">NO</option>
              </select>
            </div>

            {/* Dnc Action */}
            <div>
              <label className="block mb-2">Dnc Action</label>
              <select
                name="dncAction"
                value={formData.dncAction}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="0">0</option>
              </select>
            </div>

            {/* Save As New Template */}
            <div>
              <label className="block mb-2">Save As New Template</label>
              <input
                name="saveAsTemplate"
                value={formData.saveAsTemplate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                type="text"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="bg-orange-500 text-white p-2 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
