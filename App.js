
import React, {useState} from 'react';
import Task from './components/Task';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard} from 'react-native';

export default function App() {
  /** You use state for variables that change often 
   *  vs declaring a lot of variables 
  */
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]); /** gets the previous tasks and appends the new one */
    setTask(null);
    console.log(task);
  }

  const completeTask = (index) => {
    console.log('completeTask called')
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  return (
    <View style={styles.container}>
      {/** Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity 
                  key={index}
                  onPress={ () => completeTask(index)}>
                  <Task  text={item}/> 
                </TouchableOpacity>
              )
            })
          }

        </View>
      </View> 
      {/** Write a task */}
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
          <TextInput 
            style={styles.input}
            placeholder={'Write a task'}
            value={task}  //Now you'll see the real-time changes
            onChangeText={ text => setTask(text)}
          />
          <TouchableOpacity onPress={ () => handleAddTask() }>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',

  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold', 
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems:'center',
  }, 
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 2,
    width: 250,
  }, 
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 2,

  }, 
  addText:{
    fontSize: 30,
    color: 'black',
  }, 
});
