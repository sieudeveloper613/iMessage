import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, PixelRatio, StyleSheet } from 'react-native';

export default class Grid extends React.Component {
    static propTypes = {
        renderItem: PropTypes.func.isRequired,
        numColumns: PropTypes.number,
        itemMargin: PropTypes.number,
    };

    static defaultProps = {
        numColumns: 4,
        itemMargin: StyleSheet.hairlineWidth,
    };

    renderGridItem = (info) => {
        //... The interesting stuff happen here!
        /* Width can change size depending on device ori, mul mode
        so it's best to do this within the render path */
        const { width } = Dimensions.get('window');
        const { renderItem, numColumns, itemMargin } = this.props;
        const { index } = info;

        const size = PixelRatio.roundToNearestPixel(
            (width - itemMargin * (numColumns - 1)) / numColumns,
        );

        // we don't want to include a `marginLeft` on the first of a row
        const marginLeft = index % numColumns === 0 ? 0 : itemMargin;

        // we don't want to include a `marginTop` on the first of a grid
        const marginTop = index < numColumns ? 0 : itemMargin;

        return renderItem({ ...info, size, marginLeft, marginTop });
    }

    render() {
        return <FlatList {...this.props} renderItem={this.renderGridItem} />
    }
}