import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ToolbarButton = ({ image, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <Image style={styles.image}  source={{ uri: image }}/>
    </TouchableOpacity>
);

ToolbarButton.propTypes = {
    // title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};


export default class Toolbar extends React.Component {
    static propTypes = {
        isFocused: PropTypes.bool.isRequired,
        onChangeFocus: PropTypes.func,
        onSubmit: PropTypes.func,
        onPressCamera: PropTypes.func,
        onPressLocation: PropTypes.func,
    };

    static defaultProps = {
        onChangeFocus: () => {},
        onSubmit: () => {},
        onPressCamera: () => {},
        onPressLocation: () => {},
    };

    state = {
        text: '',
    };

    setInputRef = (ref) => {
        this.input = ref;
    };

    

    componentWillReceiveProps(nextProps) {
        if (nextProps.isFocused !== this.props.isFocused){
            if (nextProps.isFocused) {
                this.input.focus();
            } else {
                this.input.blur();
            }
        }
    }

    handleFocus = () => {
        const { onChangeFocus } = this.props;

        onChangeFocus(true);
    };

    handleBlur = () => {
        const { onChangeFocus } = this.props;

        onChangeFocus(false);
    };

    handleChangleText = (text) => {
        this.setState({ text });
    };

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;

        if (!text) return;

        onSubmit(text);
        this.setState({ text: ''});
    }

    render() {
        const { onPressCamera, onPressLocation } = this.props;
        // grab this from state!
        const { text } = this.state;

        return (
            <View style={styles.toolbar}>
                <ToolbarButton image={'https://cdn-icons-png.flaticon.com/128/1042/1042339.png'} onPress={onPressCamera}/>
                <ToolbarButton image={'https://cdn-icons-png.flaticon.com/128/684/684908.png'} onPress={onPressLocation}/>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid={'transparent'}
                        placeholder={'Type something!'}
                        blurOnSubmit={false} /* keyboard isn't dismissed
                        when user presses the return key */
                        value={text}
                        onChangeText={this.handleChangleText}
                        onSubmitEditing={this.handleSubmitEditing}
                        // Additional props
                        ref={this.setInputRef}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 16,
        backgroundColor: 'white',
    },
    button: {
        top: -2,
        marginRight: 12,
        fontSize: 20,
        color: 'grey',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: 'rgba(0,0,0,0.02)',
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 5
    }
});