import React from 'react';
import PropTypes from 'prop-types';
import { PermissionsAndroid, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import { CameraRoll } from "@react-native-camera-roll/camera-roll"; 

import Grid from './Grid'

const keyExtractor = ({ uri }) => uri;

export default class ImageGrid extends React.Component {
    static propTypes = {
        onPressImage: PropTypes.func,
    };

    static defaultProps = {
        onPressImage: () => {},
    };

    loading = false;
    cursor = null;

    state = {
        images: [],
    };

    componentDidMount() {
        this.getImages();
    };

    getImages = async (after) => {
        if (this.loading) return;

        const { status } = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the media images');    
        } else {
            console.log('media images denied!');
        }

        this.loading = true;

        const results = await CameraRoll.getPhotos({
            first: 20,
            after,
        });

        const { edges, page_info: { has_next_page, end_cursor } } = results;
        
        const loadedImages = edges.map(item => item.node.image);

        this.setState({ 
                images: this.state.images.concat(loadedImages),
            }, 
            () => {
                this.loading = false;
                this.cursor = has_next_page ? end_cursor : null;
            },
        );
    };

    getNextImages = () => {
        if (!this.cursor) return;

        this.getImages(this.cursor);
    };

    renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
        const { onPressImage } = this.props;
        
        const style = {
            width: size, 
            height: size,
            marginLeft,
            marginTop,
        };

        return (
            <TouchableOpacity
                key={uri}
                activeOpacity={0.75}
                onPress={() => onPressImage(uri)}
                style={style}
            >
                <Image source={{ uri }} style={styles.image}/>
            </TouchableOpacity>
            
        );
    };

    render() {
        const { images} = this.state;

        return(
            <Grid
                data={images}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
                onEndReached={this.getNextImages}
            />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,

    }
})