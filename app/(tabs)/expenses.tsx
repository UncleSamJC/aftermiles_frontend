import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AddExpense from '../../components/screens/expense/AddExpense';

export default function Expenses() {
  const [showAddExpense, setShowAddExpense] = useState(false);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-gray-600">No expenses yet</Text>
        <Text className="text-gray-500 mt-2">Tap + to add an expense</Text>
      </View>

      {/* Add Expense Button */}
      {!showAddExpense && (
        <TouchableOpacity
          onPress={() => setShowAddExpense(true)}
          className="absolute bottom-6 right-6 w-14 h-14 bg-teal-500 rounded-full items-center justify-center shadow-lg"
        >
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      )}

      {/* Add Expense Modal */}
      {showAddExpense && (
        <AddExpense onClose={() => setShowAddExpense(false)} />
      )}
    </View>
  );
} 