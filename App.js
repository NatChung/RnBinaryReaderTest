/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Button} from 'react-native';
import RNFS from 'react-native-fs';
import MusicTempo from 'music-tempo';
import {Buffer} from 'buffer';

const App = () => (
  <View style={styles.container}>
    <Button
      title="click"
      onPress={() => {
        RNFS.readFile(RNFS.DocumentDirectoryPath + '/raw.pcm', 'base64')
          .then((res) => {
            console.log('Start');
            const bytes = new Buffer(res, 'base64');
            const len = bytes.length / 4;
            const audioData = [];
            for (let i = 0; i < len; i++) {
              audioData.push(bytes.readFloatLE(i * 4));
            }
            console.log('Done of readfile and start to parse');
            const mt = new MusicTempo(audioData);
            console.log(mt.tempo);
            console.log(mt.beats);
          })
          .catch((err) => console.log('err', err));
      }}
    />
  </View>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
