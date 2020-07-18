import React from 'react';
import { ThemeProvider, Text } from 'react-native-elements';
import Headerbar from '../components/Header';
import AddTodo from '../components/AddTodo';


export default function Home() {
    return (
      <ThemeProvider >
          <Headerbar />
          <AddTodo />
      </ThemeProvider>
    );
  }

