import React, { useEffect, useState } from 'react';
import { View, Image, FlatList } from 'react-native';

import { styles } from './styles';

import logoImage from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';

import { Background } from '../../components/Background';
import { useNavigation } from '@react-navigation/native';

export function Home() {
  const navigation = useNavigation();

  const [games, setGames] = useState<GameCardProps[]>();

  const handleOnGamePress = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate('game', { id, title, bannerUrl });
  };

  useEffect(() => {
    fetch('http://192.168.0.143:3333/games')
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo}/>

        <Heading
          title='Encontra o teu duo!'
          subtitle='Seleciona o jogo que queres jogar...'
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={item}
              onPress={() => {
                handleOnGamePress(item);
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
        />
      </View>
    </Background>
  );
}