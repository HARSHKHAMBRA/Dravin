import React from 'react';
import { Plus } from 'lucide-react';
import { AutomationRuleBuilder } from '../components/automation/AutomationRuleBuilder';
import type { AutomationRule } from '../types/automation';

const defaultRule: AutomationRule = {
  id: crypto.randomUUID(),
  trigger: 'call_end',
  actions: [],
  conditions: [],
  isActive: true
};

export function AutomationPage() {
  const [rules, setRules] = React.useState<AutomationRule[]>([]);

  const handleAddRule = () => {
    setRules([...rules, { ...defaultRule, id: crypto.randomUUID() }]);
  };

  const handleUpdateRule = (index: number, updatedRule: AutomationRule) => {
    const newRules = [...rules];
    newRules[index] = updatedRule;
    setRules(newRules);
  };

  const handleDeleteRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Automation Rules</h1>
        <button
          onClick={handleAddRule}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Add Rule
        </button>
      </div>

      <div className="space-y-6">
        {rules.map((rule, index) => (
          <AutomationRuleBuilder
            key={rule.id}
            rule={rule}
            onChange={(updatedRule) => handleUpdateRule(index, updatedRule)}
            onDelete={() => handleDeleteRule(index)}
          />
        ))}

        {rules.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500">
              No automation rules yet. Click "Add Rule" to create one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}