import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  KeyboardTypeOptions,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useCallback, useRef } from "react";
import {
  Clock,
  X,
  User,
  Phone,
  Scissors,
  CreditCard,
  AlertCircle,
} from "lucide-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateAppointment = ({ isVisible, onClose }) => {
  const scrollViewRef = useRef(null);
  const [appointmentData, setAppointmentData] = useState({
    customerName: "",
    customerPhone: "",
    service: "",
    price: "",
    time: new Date(),
    date: new Date(),
  });

  const [errors, setErrors] = useState({
    customerName: "",
    customerPhone: "",
    service: "",
    price: "",
  });

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = {
      customerName: "",
      customerPhone: "",
      service: "",
      price: "",
    };

    // Sadece boş alan kontrolü
    if (!appointmentData.customerName.trim()) {
      newErrors.customerName = "Müşteri adı zorunludur";
      isValid = false;
    }

    if (!appointmentData.customerPhone.trim()) {
      newErrors.customerPhone = "Telefon numarası zorunludur";
      isValid = false;
    }

    if (!appointmentData.service.trim()) {
      newErrors.service = "Hizmet seçimi zorunludur";
      isValid = false;
    }

    if (!appointmentData.price.trim()) {
      newErrors.price = "Ücret zorunludur";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [appointmentData]);

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setAppointmentData((prev) => ({
        ...prev,
        time: selectedTime,
      }));
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setAppointmentData((prev) => ({
        ...prev,
        date: selectedDate,
      }));
    }
  };

  const handleCreateAppointment = () => {
    if (validateForm()) {
      console.log(appointmentData);
      onClose();
    } else {
      Alert.alert("Hata", "Lütfen form alanlarını kontrol ediniz", [
        { text: "Tamam" },
      ]);
    }
  };

  const InputField = ({
    icon,
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = "default" as KeyboardTypeOptions,
    maxLength = undefined,
    error,
    inputIndex = 0,
  }) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-600 mb-2">{label}</Text>
      <View
        className={`flex-row items-center border rounded-2xl px-4 py-3 ${
          error
            ? "border-red-500 bg-red-50/50"
            : "border-gray-200 bg-gray-50/50"
        }`}
      >
        {icon}
        <TextInput
          className="flex-1 ml-3 text-base text-gray-800"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          onFocus={() => {
            scrollViewRef.current?.scrollTo({
              y: inputIndex * 100,
              animated: true,
            });
          }}
        />
      </View>
      {error && (
        <View className="flex-row items-center mt-1">
          <AlertCircle size={16} color="#EF4444" />
          <Text className="ml-1 text-red-500 text-sm">{error}</Text>
        </View>
      )}
    </View>
  );

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <View className="flex-1 justify-end bg-black/60">
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              onClose();
            }}
            className="flex-1"
          />
          <View className="bg-white rounded-t-3xl">
            <View className="px-6 py-4 border-b border-gray-100 flex-row justify-between items-center">
              <Text className="text-2xl font-bold text-gray-900">
                Yeni Randevu Oluştur
              </Text>
              <TouchableOpacity
                onPress={onClose}
                className="p-2 rounded-full bg-gray-100"
              >
                <X size={20} color="#374151" />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollViewRef}
              className="p-6"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingBottom: Platform.OS === "ios" ? 120 : 20,
              }}
            >
              <View>
                <InputField
                  icon={<User size={20} color="#6B7280" />}
                  label="Müşteri Adı"
                  value={appointmentData.customerName}
                  onChangeText={(text) =>
                    setAppointmentData((prev) => ({
                      ...prev,
                      customerName: text,
                    }))
                  }
                  placeholder="Müşteri adını giriniz"
                  error={errors.customerName}
                  inputIndex={0}
                />

                <InputField
                  icon={<Phone size={20} color="#6B7280" />}
                  label="Telefon Numarası"
                  value={appointmentData.customerPhone}
                  onChangeText={(text) =>
                    setAppointmentData((prev) => ({
                      ...prev,
                      customerPhone: text,
                    }))
                  }
                  placeholder="05XX XXX XX XX"
                  keyboardType="numeric"
                  error={errors.customerPhone}
                  inputIndex={1}
                />

                <InputField
                  icon={<Scissors size={20} color="#6B7280" />}
                  label="Hizmetler"
                  value={appointmentData.service}
                  onChangeText={(text) =>
                    setAppointmentData((prev) => ({ ...prev, service: text }))
                  }
                  placeholder="Saç kesimi, sakal tıraşı..."
                  error={errors.service}
                  inputIndex={2}
                />

                <InputField
                  icon={<CreditCard size={20} color="#6B7280" />}
                  label="Ücret"
                  value={appointmentData.price}
                  onChangeText={(text) =>
                    setAppointmentData((prev) => ({
                      ...prev,
                      price: text,
                    }))
                  }
                  placeholder="150"
                  keyboardType="numeric"
                  error={errors.price}
                  inputIndex={3}
                />

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-600 mb-2">
                    Randevu Tarihi ve Saati
                  </Text>
                  <View className="flex-row space-x-2">
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      className="flex-1 flex-row items-center border border-gray-200 rounded-2xl bg-gray-50/50 px-4 py-3"
                    >
                      <Clock size={20} color="#6B7280" />
                      <Text className="ml-3 text-base text-gray-800">
                        {appointmentData.date.toLocaleDateString("tr-TR")}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setShowTimePicker(true)}
                      className="flex-1 flex-row items-center border border-gray-200 rounded-2xl bg-gray-50/50 px-4 py-3"
                    >
                      <Clock size={20} color="#6B7280" />
                      <Text className="ml-3 text-base text-gray-800">
                        {appointmentData.time.toLocaleTimeString("tr-TR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={appointmentData.date}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                  />
                )}

                {showTimePicker && (
                  <DateTimePicker
                    value={appointmentData.time}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleTimeChange}
                  />
                )}
              </View>
            </ScrollView>

            <View
              className={`p-6 border-t border-gray-100 ${
                Platform.OS === "ios" ? "pb-8" : ""
              }`}
            >
              <TouchableOpacity
                onPress={handleCreateAppointment}
                className="bg-indigo-600 py-4 rounded-2xl shadow-sm active:bg-indigo-700"
              >
                <Text className="text-white text-center font-semibold text-lg">
                  Randevu Oluştur
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CreateAppointment;
