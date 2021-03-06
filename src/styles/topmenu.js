'use strict'
import React from 'react';
import {
    StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
    container: {
        top: 20,
        flex: 1, // this needs to be rewritten...
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuText: {
        color: "#51258A",
        fontSize: 40,
        fontFamily: 'trefoil-sans-black',
        margin: 15,
    },
    menuNavButton: {
        margin: 20,
        height: 20,
    },
    menuNavButtonImage: {
        height: 40,
        width: 40
    },
    menuTapIconImage: {
        height: 72 / 4,
        width: 90 / 4,
        top: 40,
        right: 45,
        height: 20,
    },
});

export default styles;
