import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { AutomationRule, AutomationAction, AutomationCondition } from '../../types/automation';

interface AutomationRuleBuilderProps {
  rule: AutomationRule;
  onChange: (rule: AutomationRule) => void;
  onDelete: () => void;
}

export function AutomationRuleBuilder({ 
  rule, 
  onChange, 
  onDelete 
}: AutomationRuleBuilderProps) {
  const handleAddAction = () => {
    const newAction: AutomationAction = {
      type: 'send_email',
      template: '',
      delay: 0,
      priority: 'medium'
    };
    
    onChange({
      ...rule,
      actions: [...rule.actions, newAction]
    });
  };

  const handleAddCondition = () => {
    const newCondition: AutomationCondition = {
      field: '',
      operator: 'equals',
      value: ''
    };
    
    onChange({
      ...rule,
      conditions: [...rule.conditions, newCondition]
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Automation Rule</h3>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-600"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Trigger Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trigger
          </label>
          <select
            value={rule.trigger}
            onChange={(e) => onChange({ ...rule, trigger: e.target.value as any })}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="call_end">Call Ended</option>
            <option value="order_placed">Order Placed</option>
            <option value="email_received">Email Received</option>
            <option value="low_satisfaction">Low Satisfaction</option>
          </select>
        </div>

        {/* Conditions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Conditions
            </label>
            <button
              onClick={handleAddCondition}
              className="text-blue-500 hover:text-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
          {rule.conditions.map((condition, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={condition.field}
                onChange={(e) => {
                  const newConditions = [...rule.conditions];
                  newConditions[index] = {
                    ...condition,
                    field: e.target.value
                  };
                  onChange({ ...rule, conditions: newConditions });
                }}
                placeholder="Field"
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <select
                value={condition.operator}
                onChange={(e) => {
                  const newConditions = [...rule.conditions];
                  newConditions[index] = {
                    ...condition,
                    operator: e.target.value as any
                  };
                  onChange({ ...rule, conditions: newConditions });
                }}
                className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="greater_than">Greater Than</option>
                <option value="less_than">Less Than</option>
              </select>
              <input
                type="text"
                value={condition.value}
                onChange={(e) => {
                  const newConditions = [...rule.conditions];
                  newConditions[index] = {
                    ...condition,
                    value: e.target.value
                  };
                  onChange({ ...rule, conditions: newConditions });
                }}
                placeholder="Value"
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Actions
            </label>
            <button
              onClick={handleAddAction}
              className="text-blue-500 hover:text-blue-600"
            >
              <Plus size={20} />
            </button>
          </div>
          {rule.actions.map((action, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                value={action.type}
                onChange={(e) => {
                  const newActions = [...rule.actions];
                  newActions[index] = {
                    ...action,
                    type: e.target.value as any
                  };
                  onChange({ ...rule, actions: newActions });
                }}
                className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="send_email">Send Email</option>
                <option value="schedule_call">Schedule Call</option>
                <option value="create_task">Create Task</option>
                <option value="update_crm">Update CRM</option>
              </select>
              <input
                type="number"
                value={action.delay || 0}
                onChange={(e) => {
                  const newActions = [...rule.actions];
                  newActions[index] = {
                    ...action,
                    delay: parseInt(e.target.value)
                  };
                  onChange({ ...rule, actions: newActions });
                }}
                placeholder="Delay (minutes)"
                className="w-32 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <select
                value={action.priority}
                onChange={(e) => {
                  const newActions = [...rule.actions];
                  newActions[index] = {
                    ...action,
                    priority: e.target.value as any
                  };
                  onChange({ ...rule, actions: newActions });
                }}
                className="w-32 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}