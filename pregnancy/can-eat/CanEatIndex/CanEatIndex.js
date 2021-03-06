
'use strict';

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ListView,
    StatusBarIOS,
    BackAndroid,
    ScrollView,
} from 'react-native';

import {
    BBPageRouterRNM,
    BBTNavigator,
} from '../../comm';

import Header from '../Header/Header';
import Search from '../Search/Search';
import IndexMenu from '../IndexMenu/IndexMenu';

// 因为循环引用bug不得不抽取出来，很不爽。
// Search引用ResultList,ResultList引用Search
// 抽取成Search不直接引用ResultList，而是把ResultList作为props传入Search
import ResultList from '../ResultList/ResultList';


class CanEatIndex extends Component {

    componentWillMount() {

        /*
        if (Platform.OS === 'ios') {
            StatusBarIOS.setStyle('light-content');
        }*/


        BackAndroid.addEventListener('hardwareBackPress', () => {

            if (this.refs.nav) {
                if (this.refs.nav.getCurrentRoutes().length === 1) {// 在canEat的home页了
                    if (this.props.nav) {// 在demo中
                        this.props.nav.pop();
                    } else {// 集成了app中
                        BBPageRouterRNM.popModule();
                    }
                } else {
                    this.refs.nav.pop();
                }
            }
            return true;
        });

    }


    componentWillUnmount() {

        /*
        if (Platform.OS === 'ios') {
            StatusBarIOS.setStyle('default');
        }*/
    }


    render() {
        return (
            <Navigator ref='nav'
                initialRoute={{name: 'home', }}
                renderScene={this._renderPage.bind(this)}
                configureScene={(route) => {
                    return BBTNavigator.FloatFromRight;
                }}
                />
        );

    }


    _renderPage(route, nav) {

        console.log(`in render page ${route.name}`);

        if (route.name === 'home') {

            return (
                <View keyboardShouldPersistTaps={false}
                            scrollEnabled={false}
                            style={{backgroundColor: '#efeff4', flex: 1, }}>
                    <Header title='能不能吃' nav={this.props.nav}/>

                    <Search nav={nav} resultComponent={ResultList} keyWord={this.props.keyWord} />

                    <IndexMenu nav={nav} />
                </View>
            );
        }


        if (!route.page) {
            console.error('页面导航请求没有传入page参数.');
            return null;
        }

        return (
            route.page
        );

    }


}


module.exports = CanEatIndex;
AppRegistry.registerComponent('CanEat', () => CanEatIndex);
