import React, { Component } from "react";
import { Animated, PanResponder } from 'react-native';

export default class CustomItem extends Component {

  constructor(props) {
      super(props);

      this.state = {
          scaleValue: new Animated.Value(0),
          menu: new Animated.ValueXY({x: 0, y: 0})
      }
  }

  _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, {
      dx: this.state.menu.x,
    }]),
    onPanResponderRelease: () => {
      Animated.spring(this.state.menu.x, {
        toValue: 0,
        bounciness: 10,
      }).start();
    },
  });

  componentDidMount() {
      Animated.timing(this.state.scaleValue, {
          toValue: 1,
          duration : 600,
          delay: this.props.index * 350
      }).start();
  }

  render() {
      return (
          <Animated.View style={{ opacity: this.state.scaleValue }} {...this._panResponder.panHandlers} >
              { this.props.children }
          </Animated.View>
      );
  }
}
