import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const MessageCard = ({ 
  unclassifiedTrips, 
  unclassifiedTransactions,
  onHideTrips,
  onHideTransactions 
}: { 
  unclassifiedTrips: number;
  unclassifiedTransactions: number;
  onHideTrips: () => void;
  onHideTransactions: () => void;
}) => {
  if (unclassifiedTrips === 0 && unclassifiedTransactions === 0) return null;

  return (
    <>  
    <View className="flex-1 flex-col mt-6 justify-center">
      {unclassifiedTrips > 0 && (
        <View className="bg-white rounded-xl shadow-sm mx-4 my-1">
          <View className="bg-purple-200 px-2 py-1 rounded-t-xl border-b border-purple-100 flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-gray-800">
              Unclassified Trips
            </Text>
            <Pressable onPress={onHideTrips} className="p-1">
              <Ionicons name="close" size={20} color="#4B5563" />
            </Pressable>
          </View>
          <Pressable
            onPress={() => router.push('/trips')}
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
          <View className="bg-orange-200 px-2 py-1 rounded-t-xl border-b border-purple-100 flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-gray-800">
              Unclassified Transactions
            </Text>
            <Pressable onPress={onHideTransactions} className="p-1">
              <Ionicons name="close" size={20} color="#4B5563" />
            </Pressable>
          </View>
          <Pressable
            onPress={() => router.push('/transactions')}
            className="active:opacity-80"
          >
            <View className="p-2">
              <Text className="text-base text-gray-600">
                You have {unclassifiedTransactions} transactions need to classify
              </Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
    <View className="flex-1 flex-col mt-6 justify-center">
      {/* TODO : 这里需要引入图表组件 -这里是Trips的相关的图表统计 */}
      <View className="bg-white rounded-xl shadow-sm mx-4 my-1">
          <View className="bg-purple-200 px-2 py-1 rounded-t-xl border-b border-purple-100 flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-gray-800">
               Trips Insights
            </Text>
            
          </View>
          
            <View className="p-2">
              <Text className="text-base text-gray-600">
                //Trips 图表展示区域
              </Text>
            </View>
        </View>
    </View>
    <View className="flex-1 flex-col mt-6 justify-center">
      {/* TODO : 这里需要引入图表组件 -这里是Trips的相关的图表统计 */}
      <View className="bg-white rounded-xl shadow-sm mx-4 my-1">
          <View className="bg-purple-200 px-2 py-1 rounded-t-xl border-b border-purple-100 flex-row justify-between items-center">
            <Text className="text-lg font-semibold text-gray-800">
                Transactions Insights
            </Text>
            
          </View>
          
            <View className="p-2">
              <Text className="text-base text-gray-600">
                //Transactions 图表展示区域
              </Text>
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
      console.error('Error fetching unclassified items:', error);
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
  const effectiveTransactionsCount = showTransactionsCard ? unclassifiedTransactions : 0;

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