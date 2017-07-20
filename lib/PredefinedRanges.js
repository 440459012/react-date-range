'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _jsxFileName = 'src/PredefinedRanges.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _styles = require('./styles.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PredefinedRanges = function (_Component) {
  (0, _inherits3.default)(PredefinedRanges, _Component);

  function PredefinedRanges(props, context) {
    (0, _classCallCheck3.default)(this, PredefinedRanges);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PredefinedRanges.__proto__ || (0, _getPrototypeOf2.default)(PredefinedRanges)).call(this, props, context));

    _this.styles = _this.props.theme;
    return _this;
  }

  (0, _createClass3.default)(PredefinedRanges, [{
    key: 'handleSelect',
    value: function handleSelect(name, event) {
      event.preventDefault();

      var range = this.props.ranges[name];

      this.props.onSelect({
        startDate: (0, _parseInput2.default)(range['startDate'], null, 'startOf'),
        endDate: (0, _parseInput2.default)(range['endDate'], null, 'endOf')
      }, PredefinedRanges);
    }
  }, {
    key: 'renderRangeList',
    value: function renderRangeList(classes) {
      var _this2 = this;

      var _props = this.props,
          ranges = _props.ranges,
          range = _props.range,
          onlyClasses = _props.onlyClasses;
      var styles = this.styles;


      return (0, _keys2.default)(ranges).map(function (name) {
        var _classnames;

        var active = (0, _parseInput2.default)(ranges[name].startDate, null, 'startOf').isSame(range.startDate) && (0, _parseInput2.default)(ranges[name].endDate, null, 'endOf').isSame(range.endDate);

        var style = (0, _extends3.default)({}, styles['PredefinedRangesItem'], active ? styles['PredefinedRangesItemActive'] : {});

        var predefinedRangeClass = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, classes.predefinedRangesItem, true), (0, _defineProperty3.default)(_classnames, classes.predefinedRangesItemActive, active), _classnames));

        return _react2.default.createElement(
          'a',
          {
            href: '#',
            key: 'range-' + name,
            className: predefinedRangeClass,
            style: onlyClasses ? undefined : style,
            onClick: _this2.handleSelect.bind(_this2, name),
            __source: {
              fileName: _jsxFileName,
              lineNumber: 48
            }
          },
          name
        );
      }).bind(this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          style = _props2.style,
          onlyClasses = _props2.onlyClasses,
          classNames = _props2.classNames;
      var styles = this.styles;


      var classes = (0, _extends3.default)({}, _styles.defaultClasses, classNames);

      return _react2.default.createElement(
        'div',
        {
          style: onlyClasses ? undefined : (0, _extends3.default)({}, styles['PredefinedRanges'], style),
          className: classes.predefinedRanges,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 68
          }
        },
        this.renderRangeList(classes)
      );
    }
  }]);
  return PredefinedRanges;
}(_react.Component);

PredefinedRanges.defaultProps = {
  onlyClasses: false,
  classNames: {}
};

PredefinedRanges.propTypes = {
  ranges: _propTypes2.default.object.isRequired,
  onlyClasses: _propTypes2.default.bool,
  classNames: _propTypes2.default.object
};

exports.default = PredefinedRanges;