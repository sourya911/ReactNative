import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Button, FlatListComponent, ScrollView } from 'react-native';
import mockShifts from '../api/shifts-mock-api/mockShifts';
import { DateTime } from 'luxon';

const Availshifts = ({navigation}) => {
   const [book,setBook]=useState([]);
   const [area1, setArea1]=useState('Helsinki')

   useEffect(() => {
    const flt = mockShifts.filter(shift => shift.booked && shift.area===area1);

    setBook(flt);
  }, [area1])

  const bshift = (id) => {
    setBook((prevShifts) =>
      prevShifts.map((shift) =>
        shift.id === id ? { ...shift, booked: !shift.booked } : shift
      )
    );
  };

  const formatT = (st, et) => {
    const s = DateTime.fromMillis(st)
    const e = DateTime.fromMillis(et)
  
    const fors = s.toFormat('HH:mm')
    const fore = e.toFormat('HH:mm')
  
    return `${fors} - ${fore}`
  }

  const renderAreaText = (area) => {
    return (
      <TouchableOpacity key={area} onPress={() => setArea1(area)}>
        <Text style={[styles.contText, { color: area === area1 ? '#E2006A' : '#004FB4' }]}>
          {area}
        </Text>
      </TouchableOpacity>
    );
  };
    return (
        <View style={{ backgroundColor: "#F1F4F8", flex: 1 }}>
              <View style={styles.container2}>
        {renderAreaText('Helsinki')}
        {renderAreaText('Tampere')}
        {renderAreaText('Turku')}
      </View>
<ScrollView>
               <FlatList
               style={styles.flat}
              keyExtractor={(item) => item.id}
                data={book}
                renderItem={({ item }) => (
                  <View style={[styles.shiftContainer , {display:"flex",flexDirection:'row', justifyContent:'space-between'}]}>
                    <View>
                      <Text style={styles.format}>{formatT(item.startTime, item.endTime)}</Text>
           
                    </View>
                    <Text style={{color:"#4F6C92", fontSize:18}}>{item.booked ? '':'Booked'}</Text>
                    <TouchableOpacity style={[styles.button, {borderColor: item.booked ? "#16A64D":"#E2006A"}]} onPress={() => bshift(item.id)}>
                  <Text style={[styles.buttonText, {color: item.booked? "#16A64D":"#E2006A"}]}>{item.booked ? 'Book' : 'Cancel'}</Text>
                </TouchableOpacity>
                  </View>
                )}
              />

</ScrollView>

            <View style={ styles.foot}>
          <TouchableOpacity >
            <Text style={{ fontSize: 25, color: '#CBD2E1' }}
              onPress={() => navigation.navigate("MyShifts")}>My Shifts</Text>
          </TouchableOpacity>
          <TouchableOpacity >
          <Text style={{ fontSize: 25, color: '#004FB4' }}
          onPress= {()=> navigation.navigate("Availaible")} >Available Shifts</Text>
          </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    format:{
        color:"#4F6C92",
        fontSize:20,
        marginTop:5
    },
    container2: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginBottom:10,
        marginHorizontal:10
    },
    shiftContainer:{
        marginBottom:10,
        marginTop:5,
        marginHorizontal:10,
        borderBottomColor:'#CBD2E1',
        borderBottomWidth:2
    },
    contText:{
        fontSize:20,
        color:"#004FB4",
        marginTop:5
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    shiftItem: {
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 10,
        marginVertical: 5,
    },
    button: {
        backgroundColor: 'transparent',
        width: 100,
        borderColor: "#16A64D",
        borderWidth: 1,
        borderRadius: 50, 
        padding: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#E2006A',
        fontSize: 16,
    },
    foot:{
        position: 'absolute',
        marginTop:'auto',
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
        paddingBottom:15
    }
});

export default Availshifts;
