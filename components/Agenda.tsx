import React from "react";
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { Agenda } from "react-native-calendars";

function AgendaComponent({ selectedDate, items, renderItem }) {
  return (
    <Agenda
      selected={selectedDate}
      items={items}
      renderItem={(item, isFirst) => (
        <TouchableOpacity className="bg-white flex-1 rounded-md p-2 mr-2 mt-4">
          <Text className="text-gray-600 text-lg">{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

export default AgendaComponent;
