import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ThemeSwitch from './theme'

class Content extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor () {
        super()
        this.state = { themeColor: '' ,name:''}
    }

    componentWillMount () {
        const { store } = this.context
        this._updateThemeColor()
        store.subscribe(() => this._updateThemeColor())
    }

    _updateThemeColor () {
        const { store } = this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor, name:state.name })
    }

    render () {
        return (
            <div>
                <p style={{ color: this.state.themeColor }}>this is content</p>
                <ThemeSwitch />
            </div>
        )
    }
}

export default Content;