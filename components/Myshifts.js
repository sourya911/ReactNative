// // MyShifts.js

import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import mockShifts from '../api/shifts-mock-api/mockShifts'
import { DateTime } from 'luxon';

const formatT = (st, et) => {
  const s = DateTime.fromMillis(st)
  const e = DateTime.fromMillis(et)

  const fors = s.toFormat('HH:mm')
  const fore = e.toFormat('HH:mm')

  return `${fors} - ${fore}`
}



const groupShiftsByDate = (shifts) => {
  const groupedShifts = {};
  shifts.forEach(shift => {
    if (!groupedShifts[shift.date]) {
      groupedShifts[shift.date] = [];
    }
    groupedShifts[shift.date].push(shift);
  });
  return groupedShifts;
};

export default function MyShifts({ navigation }) {
  const [bookShift, setBookShift] = useState([]);

  useEffect(() => {
    const flt = mockShifts.filter(shift => shift.booked);

    setBookShift(flt);
  }, [])

  const bshift = (id) => {

    const updList = bookShift.map(shift =>
      shift.id === id ? { ...shift, booked: false } : shift
    )

    setBookShift(updList)
  }

  return (

    <>
      <View style={{ flex: 1, backgroundColor: '#F1F4F8', padding: 16 }}>
        <ScrollView >
          <View style={styles.container}>
            {bookShift.length === 0 ? (
              <Text>No booked shifts</Text>
            ) : (
              <FlatList
                keyExtractor={(item) => item.id}
                data={bookShift}
                renderItem={({ item }) => (
                  <View style={[styles.shiftContainer, { display: "flex", flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View>
                      <Text style={styles.format}>{formatT(item.startTime, item.endTime)}</Text>
                      <Text style={styles.area}>{item.area}</Text>
                    </View>
                    <TouchableOpacity style={[styles.button, { borderColor: item.booked ? "#E2006A" : "#A4B8D3" }]} onPress={() => bshift(item.id)}>
                      <Text style={[styles.buttonText, { color: item.booked ? "#E2006A" : "#A4B8D3" }]}>
                        {item.booked ? 'Book' : 'Cancel'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>

        </ScrollView>
      </View>

      

      <View style={styles.foot}>
        <TouchableOpacity >
          <Text style={{ fontSize: 25, color: '#004FB4' }}
            onPress={() => navigation.navigate("MyShifts")}>My Shifts</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={{ fontSize: 25, color: '#CBD2E1' }}
            onPress={() => navigation.navigate("Availaible")} >Available Shifts</Text>
        </TouchableOpacity>

      </View>
    </>)
}

const styles = StyleSheet.create({
  format: {
    fontSize: 20,
    color: '#004FB4'
  },
  area: {
    color: '#4F6C92',

  }
  , button: {
    backgroundColor: 'transparent',
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E2006A',
    fontSize: 18,
  },
  shiftContainer: {
    borderBottomWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 10,
  },

  foot: {
    position: 'absolute',
    marginTop: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 10,
    borderTopColor: 'gray',
    borderTopWidth: 2,

  }
})