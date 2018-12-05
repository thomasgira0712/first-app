import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Line extends React.PureComponent {

    static propTypes = {
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        percent: PropTypes.number,
        state: PropTypes.oneOf(['normal', 'success', 'error']),
        progressive: PropTypes.bool,
        hasBorder: PropTypes.bool,
        textRender: PropTypes.func,
        color: PropTypes.string,
        rtl: PropTypes.bool,
    };

    render() {
        const {
            prefix, size, state, color,
            percent, progressive, hasBorder,
            textRender, className, rtl,
            ...others } = this.props;

        const suffixText = textRender(percent, {rtl});

        const wrapCls = classNames({
            [`${prefix}progress-line`]: true,
            [`${prefix}progress-line-show-info`]: suffixText,
            [`${prefix}progress-line-show-border`]: hasBorder,
            [`${prefix + size}`]: size,
            [className]: className
        });
        const lineCls = classNames({
            [`${prefix}progress-line-overlay`]: true,
            [`${prefix}progress-line-overlay-${state}`]: !color && !progressive && state,
            [`${prefix}progress-line-overlay-started`]: !color && progressive && percent <= 30,
            [`${prefix}progress-line-overlay-middle`]: !color && progressive && percent > 30 && percent < 80,
            [`${prefix}progress-line-overlay-finishing`]: !color && progressive && percent >= 80,
        });

        const lineStyle = { width: `${percent}%`, backgroundColor: color };

        return (
            <div {...others} className={wrapCls} dir={rtl ? 'rtl' : undefined}>
                <div className={`${prefix}progress-line-container`}>
                    <div className={`${prefix}progress-line-underlay`}>
                        <div className={lineCls} style={lineStyle}></div>
                    </div>
                </div>
                {suffixText ? <div className={`${prefix}progress-line-text`}>{suffixText}</div> : null}
            </div>
        );
    }
}
