'use strict'
import React from 'react';
import {
    StyleSheet
} from 'react-native';

var styles = StyleSheet.create({

    shopHeaderRight: {
        height: 40,
        width: 40,
        right: 20
    },


    shopHeaderLeft: {
        height: 40,
        width: 0,
        left: 20

    },


    container: {
        top: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    menuText: {
        color: "white",
        fontSize: 40,
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        margin: 15
    },

    menuButton: {
        margin: 20
    },

    menuButtonImage: {
        height: 40,
        width: 40,
    },



    closeButton: {
        width: 40,
        height: 40,
    },

    // products

    featuredTitle: {
        color: "#512589",
        fontSize: 18,
        fontFamily: 'trefoil-sans-semibold',
        marginBottom: 10,
        marginTop: 20,
        left: 17,

    },


    whatsNewTitle: {
        color: "#512589",
        fontSize: 22,
        left: 17,
        marginBottom: 10,
        fontFamily: 'trefoil-sans-semibold',

    },

    productContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    productImage: {
        height: 226,
        width: 170,
        marginBottom: 10,
        marginTop: 10,
        marginRight: 5,
        left: 10
    },

    productImageBig: {
        width: 346,
        height: 428,
        left: 17
    },


    // category nav on bottom
    categorySection: {
        height: 100,
    },

    categoryMenu: {
        paddingLeft: 60,
        position: "absolute",
        top: 37,
    },

    searchIcon: {
        width: 32,
        height: 32,
        marginLeft: 15,
        position: 'absolute',
        zIndex: 3,
        top: 37,
    },

    pill: {
        backgroundColor: "#FD8059",
        borderRadius: 24,
        height: 30,
        width: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
        marginLeft: 5,
        marginRight: 5,
    },

    pillText: {
        fontFamily: 'trefoil-sans-regular',
        color: 'white',
        fontSize: 14,
    },









});

export default styles;