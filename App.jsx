import React, {useState} from 'react';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

function App() {
  const [timerNumber, setTimerNumber] = useState('00:00:00');
  const [buttonName, setButtonName] = useState('INICIAR');
  const [lastTime, setLastTime] = useState(null);

  function startingButton() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;

      setButtonName('INICIAR');
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss === 60) {
          ss = 0;
          mm++;
        }

        if (mm === 60) {
          mm = 0;
          hh++;
        }

        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mm < 10 ? '0' + mm : mm) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setTimerNumber(format);
      }, 1000);
      setButtonName('PARAR');
    }
  }

  function clearButton() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setLastTime(timerNumber);
    setTimerNumber('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;
    setButtonName('INICIAR');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/assets/crono.png')} />

      <Text style={styles.timer}>{timerNumber}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={startingButton}>
          <Text style={styles.btnText}>{buttonName}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={clearButton}>
          <Text style={styles.btnText}>LIMPAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTimer}>
        <Text style={styles.lastRace}>
          {lastTime ? 'Último tempo: ' + lastTime : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 13,
  },
  btnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  lastTimer: {
    marginTop: 40,
  },
  lastRace: {
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default App;
