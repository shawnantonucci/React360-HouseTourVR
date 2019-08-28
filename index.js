import React from "react";
import { AppRegistry, StyleSheet, Text, View, VrButton } from "react-360";
import { connect, changeRoom } from "./store";

class HouseInfoPanel extends React.Component {
    render() {
        return (
            <View>
                <View style={styles.infoPanel}>
                    <Text style={styles.header}>Room Info</Text>
                    <Text
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                            fontWeight: "bold"
                        }}
                    >
                        {this.props.info}
                    </Text>
                </View>
            </View>
        );
    }
}

class Button extends React.Component {
    state = {
        hover: false
    };

    clickHandler(roomSelection) {
        changeRoom(roomSelection);
    }

    render() {
        return (
            <VrButton
                style={this.state.hover ? styles.hover : styles.button}
                onEnter={() => this.setState({ hover: true })}
                onExit={() => this.setState({ hover: false })}
                onClick={() => this.clickHandler(room)}
            >
                <Text style={{ backgroundColor: "green" }}>{room}</Text>
            </VrButton>
        );
    }
}

export default class ButtonInfoPanel extends React.Component {
    createRoomButtons(adjacentRooms) {
        let rooms = adjacentRooms;
        let buttons = [];

        rooms.map(room =>
            buttons.push(<Button key={`${room}` + "button"} room={room} />)
        );

        return buttons;
    }

    render() {
        return (
            <View>
                <View style={styles.buttonPanel}>
                    <Text style={styles.header}>Room Selection</Text>
                    {this.createRoomButtons(this.props.adjacentRooms)}
                </View>
            </View>
        );
    }
}

const ConnectedButtonInfoPanel = connect(ButtonInfoPanel);
const ConnectedHouseInfoPanel = connect(HouseInfoPanel);

const styles = StyleSheet.create({
    panel: {
        // Fill the entire surface
        width: 1000,
        height: 600,
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    greetingBox: {
        padding: 20,
        backgroundColor: "#000000",
        borderColor: "#639dda",
        borderWidth: 2
    }
});

AppRegistry.registerComponent(
    "ConnectedButtonInfoPanel",
    () => ConnectedButtonInfoPanel
);
AppRegistry.registerComponent(
    "ConnectedHouseInfoPanel",
    () => ConnectedHouseInfoPanel
);
