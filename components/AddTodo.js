import React,{useState,useEffect} from 'react';
import { Input ,CheckBox,Icon } from 'react-native-elements';
import { Button,ScrollView,ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ref = firestore().collection('todos');


 function AddTodo(){
    const AddToList= (props) =>{
        props == '' ? alert('Enter some text') 
        :
        ref.add({
                text:props,
            })
            .then(() => {
                console.log('User added!');
            });   
        setText('');   
     }
     const deleteTodo =(id)=>{
        ref.doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
     }
     const updateCheck =(id,checked)=>{
        ref
        .doc(id)
        .update({
            checked: !checked,
        });
     }
     useEffect(()=>{
         setLoading(true);
        return ref.onSnapshot(querySnapshot => {
            const todos = [];
            querySnapshot.forEach(doc => {
              const { text,checked } = doc.data();
              todos.push({
                id: doc.id,
                text,
                checked
              });
            });  
           
            setLoading(false);         
            addList(todos);
          });
     },[])


    const [list,addList]=useState([{
    }]);
    const [text,setText]=useState('');
    const [loading,setLoading]=useState(false);

    return (
        <ScrollView>
            <Input
           placeholder='Todo'
           rightIcon={{ type: 'font-awesome', name: 'plus' }}
           onChangeText={(text)=>setText(text)}
           value={text}
           />
           <Button onPress={()=>AddToList(text,setText)} title="add todo" />
           {
           loading ? <ActivityIndicator size="large" />
           :
           list.map((l, i) => (
                   <CheckBox
                   key={i}
                   title={l.text}
                   iconRight
                   iconType='material'
                   checkedIcon='clear'
                   uncheckedIcon='add'
                   checkedColor='red'
                   checked={l.checked}
                   onPress={()=>updateCheck(l.id,l.checked)}
                   onLongPress={()=>deleteTodo(l.id)}
                   />
              )) 
            } 
        </ScrollView>
    )
}

export default AddTodo;
