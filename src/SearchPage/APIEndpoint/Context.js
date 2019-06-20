import React, { Component } from 'react'
import SearchName from './SearchName'

export default class Context {
    constructor(operation){
        this.operation = operation;
    };

    searchresults(){
        return this.operation.searchresult();
    }
} 