import "../styles/globals.css";
import React, { Component } from "react";
import Posts from "../components/Posts";

export default class App extends Component {
    render() {
        return (
            <div className="bg-gray-200">
                <Posts />
            </div>
        );
    }
}
