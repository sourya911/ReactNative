import { View, Text, TouchableOpacity } from "react-native";
import MyShifts from "./Myshifts";

const But = () => {

    return (
        <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: "stretch", marginTop: 20, padding: 10, borderTopColor: "gray", borderTop: 4 }}>
            <TouchableOpacity onPress={<MyShifts />}>
                <Text style={{ fontSize: 25, color: '#004FB4' }} >My Shifts</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 25, color: '#004FB4' }} >Available Shifts</Text>
        </View>
    )
}

export default But