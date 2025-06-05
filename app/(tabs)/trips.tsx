import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import TripAbstract from "../../components/ui/TripAbstract";

type DateFilter = "today" | "week" | "custom";

export default function Trips() {
  const [dateFilter, setDateFilter] = useState<DateFilter>("today");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  // Mock data for demonstration
  const trips = [
    {
      id: 1,
      startLocation: "5801 Turner Rd, Nanaimo, BC",
      endLocation: "6033 Linley Valley Dr, Nanaimo",
      startTime: "9:17 AM",
      endTime: "10:17 AM",
      date: "1 Jun, Sunday",
    },
  ];

  // 获取本周的起止日期
  const getWeekDates = () => {
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + (monday.getDay() === 0 ? -6 : 1));
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    return { monday, sunday };
  };

  // 获取今天的起止时间
  const getTodayDates = () => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    return { startOfDay, endOfDay };
  };

  // 处理日期范围选择
  const onDateChange = (date: Date, type: 'START_DATE' | 'END_DATE') => {
    if (type === 'START_DATE') {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      setSelectedEndDate(date);
    }
  };

  // 获取行程数据
  const fetchTrips = async (startDate: Date, endDate: Date) => {
    try {
      // TODO: 实际的API调用
      const response = await fetch('your-api-endpoint/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch trips');
      }

      const data = await response.json();
      // TODO: 处理返回的数据
      console.log('Fetched trips:', data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  // 处理日期选择完成
  const handleDateSelect = () => {
    setShowCalendar(false);
    if (dateFilter === 'custom' && selectedStartDate && selectedEndDate) {
      //fetchTrips(selectedStartDate, selectedEndDate);
      console.log('Selected DATE RANGE:', selectedStartDate, selectedEndDate);
    }
  };

  // 监听日期过滤器变化
  useEffect(() => {
    if (dateFilter === 'today') {
      const { startOfDay, endOfDay } = getTodayDates();
      //fetchTrips(startOfDay, endOfDay);
      console.log('Today DATE RANGE:', startOfDay, endOfDay);
    } else if (dateFilter === 'week') {
      const { monday, sunday } = getWeekDates();
      //fetchTrips(monday, sunday);
      console.log('Week DATE RANGE:', monday, sunday);
    }
  }, [dateFilter]);

  return (
    <View className="flex-1 bg-gray-50 mt-5">
      {/* Date Filter Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={() => {
              setDateFilter("today");
              setSelectedStartDate(null);
              setSelectedEndDate(null);
            }}
            className={`px-4 py-2 rounded-full ${
              dateFilter === "today" ? "bg-green-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={
                dateFilter === "today" ? "text-white" : "text-gray-700"
              }
            >
              Today
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setDateFilter("week");
              setSelectedStartDate(null);
              setSelectedEndDate(null);
            }}
            className={`px-4 py-2 rounded-full ${
              dateFilter === "week" ? "bg-green-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={dateFilter === "week" ? "text-white" : "text-gray-700"}
            >
              This Week
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={() => {
            setDateFilter("custom");
            setShowCalendar(true);
          }} 
          className="flex-row items-center justify-center space-x-2 p-1"
        >
          <Text className={`text-gray-600 ${dateFilter === "custom" ? "font-semibold" : ""}`}>
            Custom Date
          </Text>
          <Ionicons name="calendar-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Trips List */}
      <ScrollView className="flex-1 px-4 pt-4 bg-slate-100">
        {/* Date Header */}
        <Text className="text-lg font-semibold mb-3">{trips[0].date}</Text>

        {/* Trip Items */}
        {trips.map((trip) => (
          <TripAbstract
            key={trip.id}
            startLocation={trip.startLocation}
            endLocation={trip.endLocation}
            startTime={trip.startTime}
            endTime={trip.endTime}
          />
        ))}
      </ScrollView>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View className="flex-1 bg-black/50 justify-center">
          <View className="bg-white mx-4 rounded-lg">
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Text className="text-gray-600">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-lg font-semibold">Select Date Range</Text>
              <TouchableOpacity
                onPress={handleDateSelect}
                disabled={!selectedStartDate || !selectedEndDate}
              >
                <Text className={`font-semibold ${
                  selectedStartDate && selectedEndDate ? 'text-green-500' : 'text-gray-300'
                }`}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>

            <CalendarPicker
              allowRangeSelection={true}
              onDateChange={onDateChange}
              selectedDayColor="#22c55e"
              selectedDayTextColor="#ffffff"
              selectedRangeStartStyle={{
                backgroundColor: '#22c55e',
              }}
              selectedRangeEndStyle={{
                backgroundColor: '#22c55e',
              }}
              selectedRangeStyle={{
                backgroundColor: '#dcfce7',
              }}
              textStyle={{
                fontFamily: "System",
                color: "#1f2937",
              }}
              previousTitle="Previous"
              nextTitle="Next"
              todayBackgroundColor="#f3f4f6"
              todayTextStyle={{
                color: "#22c55e",
              }}
            />

            {/* 显示选择的日期范围 */}
            {selectedStartDate && (
              <View className="px-4 py-2 border-t border-gray-200">
                <Text className="text-gray-600">
                  {selectedStartDate.toLocaleDateString()} 
                  {selectedEndDate ? ` - ${selectedEndDate.toLocaleDateString()}` : ''}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
