import React from 'react';
import PropTypes from 'prop-types'
import { Keyboard, Platform} from 'react-native';

const INITIAL_ANIMATION_DURATION = 250;

export default class KeyboardState extends React.Component {
    static propTypes = {
        layout: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
        }).isRequired,
        children: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const { layout: { height } } = props;

        this.state = {
            contentHeight: height,
            keyboardHeight: 0,
            keyboardVisible: false,
            keyboardWillShow: false,
            keyboardWillHide: false,
            keyboardAnimationDuration: INITIAL_ANIMATION_DURATION,
        };
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.subscriptions = [
                Keyboard.addListener('keyboardWillShow', this.keyboardWillShow),
                Keyboard.addListener('keyboardWillHide', this.keyboardWillHide),
                Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
                Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
            ];
        } else {
            this.subscriptions = [
                Keyboard.addListener('keyboardDidHide', this.keyboardDidHide),
                Keyboard.addListener('keyboardDidShow', this.keyboardDidShow),
            ];
        }
    }

    componentWillUnmount() {
        this.subscriptions.forEach(supscription => supscription.remove());
    };

    keyboardWillShow = (event) => {
        this.setState({ keyboardWillshow: true });
        this.measure(event);
    };

    keyboardDidShow = (event) => {
        this.setState({
            keyboardWillShow: false,
            keyboardVisible: true,
        });
        this.measure(event);
    };

    keyboardWillHide = (event) => {
        this.setState({ keyboardWillHide: true });
        this.measure(event);
    };

    keyboardDidHide = () => {
        this.setState({
            keyboardWillHide: false,
            keyboardVisible: false
        });

    };
}