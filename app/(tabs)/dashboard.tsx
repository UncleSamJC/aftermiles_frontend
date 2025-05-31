import CardHeader from "@/components/ui/CardHeader";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

// 模拟数据接口类型
interface TripStats {
  totalTrips: number;
  totalKms: number;
  workMiles: number;
  personalMiles: number;
  otherMiles: number;
}

// 模拟获取数据的函数
const fetchTripStats = async (): Promise<TripStats> => {
  // TODO: 实际实现从服务器获取数据
  return {
    totalTrips: 38,
    totalKms: 5123.5,
    workMiles: 2500,
    personalMiles: 1800,
    otherMiles: 823.5,
  };
};

const MessageCard = ({
  unclassifiedTrips,
  unclassifiedTransactions,
  onHideTrips,
  onHideTransactions,
}: {
  unclassifiedTrips: number;
  unclassifiedTransactions: number;
  onHideTrips: () => void;
  onHideTransactions: () => void;
}) => {
  const [tripStats, setTripStats] = useState<TripStats | null>(null);
  const currentYear = new Date().getFullYear();
  const screenWidth = Dimensions.get("window").width;
  const currentMileage = "137456"; // TODO: 这里后续从API获取实际里程数

  useEffect(() => {
    const loadTripStats = async () => {
      const stats = await fetchTripStats();
      setTripStats(stats);
    };
    loadTripStats();
  }, []);

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const pieData = [
    {
      name: "WORK",
      miles: tripStats?.workMiles || 0,
      color: "#00B8A9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "PERSONAL",
      miles: tripStats?.personalMiles || 0,
      color: "#3498DB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "OTHER",
      miles: tripStats?.otherMiles || 0,
      color: "#F4A460",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  return (
    <>
      {(unclassifiedTrips > 0 || unclassifiedTransactions > 0) && (
        <View className="flex-1 flex-col mt-6 justify-center">
          {unclassifiedTrips > 0 && (
            <View className="bg-white rounded-xl shadow-sm mx-4 my-1">
              <CardHeader
                title="Unclassified Trips"
                bgColor="bg-orange-600"
                onClose={onHideTrips}
              />
              <Pressable
                onPress={() => router.push("/trips")}
                className="active:opacity-80"
              >
                <View className="p-2">
                  <Text className="text-base text-gray-600">
                    You have {unclassifiedTrips} trips need to classify
                  </Text>
                </View>
              </Pressable>
            </View>
          )}

          {unclassifiedTransactions > 0 && (
            <View className="bg-white rounded-xl shadow-sm mx-4 my-1">
              <CardHeader
                title="Unclassified Transactions"
                bgColor="bg-orange-600"
                onClose={onHideTransactions}
              />
              <Pressable
                onPress={() => router.push("/transactions")}
                className="active:opacity-80"
              >
                <View className="p-2">
                  <Text className="text-base text-gray-600">
                    You have {unclassifiedTransactions} transactions need to
                    classify
                  </Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      )}

      {/* Current Mileage Card */}
      <View className="flex-1 flex-col mt-6 justify-center">
        <View className="bg-gray-700 rounded-xl shadow-sm mx-4 my-1">
          <CardHeader
            title="Your current mileage"
            bgColor="bg-gray-700"
            titleClassName="text-center w-full"
          />
          <View className="p-4 flex-row justify-center items-center">
            {currentMileage.split("").map((digit, index) => (
              <View
                key={index}
                className="mx-0.5 border border-white rounded-sm overflow-hidden"
                style={{
                  width: 28,
                  height: 36,
                }}
              >
                <LinearGradient
                  colors={["#2d2d2d", "#4a4a4a", "#747A79"]} // 上深、中浅、下深
                  className="w-full h-full justify-center items-center"
                >
                  <Text className="text-white text-3xl font-bold text-center">
                    {digit}
                  </Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Trip Insights Card */}
      <View className="flex-1 flex-col mt-6 justify-center">
        <View className="bg-white rounded-xl shadow-sm mx-4 my-1">
          <CardHeader
            title="Trips Insights"
            bgColor="bg-purple-200"
            rightContent={
              <Text className="text-lg text-gray-600">{currentYear}</Text>
            }
          />
          {/* Stats Overview */}
          <View className="flex-row justify-between mt-4 px-4">
            <View>
              <Text className="text-3xl font-bold text-blue-600">
                {tripStats?.totalTrips || 0}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">TRIPS</Text>
            </View>
            <View>
              <Text className="text-3xl font-bold text-blue-600">
                {tripStats?.totalKms || 0}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">Kms</Text>
            </View>
          </View>

          <View className="p-4">
            {tripStats && (
              <PieChart
                data={pieData}
                width={screenWidth - 48}
                height={220}
                chartConfig={chartConfig}
                accessor="miles"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute
                hasLegend={false}
                center={[screenWidth / 4, 0]}
              />
            )}

            {/* Legend */}
            <View className="mt-4">
              <View className="flex-row items-center mb-2">
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#00B8A9" }}
                />
                <Text className="text-sm text-gray-600 ml-2">WORK</Text>
                <Text className="text-sm text-gray-600 ml-auto">
                  {tripStats?.workMiles || 0} mi
                </Text>
              </View>
              <View className="flex-row items-center mb-2">
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#3498DB" }}
                />
                <Text className="text-sm text-gray-600 ml-2">PERSONAL</Text>
                <Text className="text-sm text-gray-600 ml-auto">
                  {tripStats?.personalMiles || 0} mi
                </Text>
              </View>
              <View className="flex-row items-center">
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#F4A460" }}
                />
                <Text className="text-sm text-gray-600 ml-2">OTHER</Text>
                <Text className="text-sm text-gray-600 ml-auto">
                  {tripStats?.otherMiles || 0} mi
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default function Dashboard() {
  const [unclassifiedTrips, setUnclassifiedTrips] = useState(0);
  const [unclassifiedTransactions, setUnclassifiedTransactions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTripsCard, setShowTripsCard] = useState(true);
  const [showTransactionsCard, setShowTransactionsCard] = useState(true);

  useEffect(() => {
    fetchUnclassifiedItems();
  }, []);

  const fetchUnclassifiedItems = async () => {
    try {
      // TODO: 实际实现从服务器获取未分类数量
      // const { data: tripsData, error: tripsError } = await db
      //   .from('trips')
      //   .select('count', { count: 'exact' })
      //   .eq('status', 'unclassified');

      // const { data: transactionsData, error: transactionsError } = await db
      //   .from('transactions')
      //   .select('count', { count: 'exact' })
      //   .eq('status', 'unclassified');

      // if (tripsError || transactionsError) throw error;

      // setUnclassifiedTrips(tripsData.count);
      // setUnclassifiedTransactions(transactionsData.count);

      // 临时使用模拟数据
      setUnclassifiedTrips(3);
      setUnclassifiedTransactions(2);
    } catch (error) {
      console.error("Error fetching unclassified items:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  const effectiveTripsCount = showTripsCard ? unclassifiedTrips : 0;
  const effectiveTransactionsCount = showTransactionsCard
    ? unclassifiedTransactions
    : 0;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <MessageCard
        unclassifiedTrips={effectiveTripsCount}
        unclassifiedTransactions={effectiveTransactionsCount}
        onHideTrips={() => setShowTripsCard(false)}
        onHideTransactions={() => setShowTransactionsCard(false)}
      />
    </ScrollView>
  );
}
