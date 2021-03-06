'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _jsxFileName = 'src/DateRange.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _PredefinedRanges = require('./PredefinedRanges.js');

var _PredefinedRanges2 = _interopRequireDefault(_PredefinedRanges);

var _styles = require('./styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateRange = function (_Component) {
  (0, _inherits3.default)(DateRange, _Component);

  function DateRange(props, context) {
    (0, _classCallCheck3.default)(this, DateRange);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateRange.__proto__ || (0, _getPrototypeOf2.default)(DateRange)).call(this, props, context));

    var format = props.format,
        linkedCalendars = props.linkedCalendars,
        theme = props.theme;


    var startDate = (0, _parseInput2.default)(props.startDate, format, 'startOf');
    var endDate = (0, _parseInput2.default)(props.endDate, format, 'endOf');

    _this.state = {
      range: { startDate: startDate, endDate: endDate },
      link: linkedCalendars && endDate
    };

    _this.step = 0;
    _this.styles = (0, _styles2.default)(theme);
    return _this;
  }

  (0, _createClass3.default)(DateRange, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.range);
    }
  }, {
    key: 'orderRange',
    value: function orderRange(range) {
      var startDate = range.startDate,
          endDate = range.endDate;

      var swap = startDate.isAfter(endDate);

      if (!swap) return range;

      return {
        startDate: endDate,
        endDate: startDate
      };
    }
  }, {
    key: 'setRange',
    value: function setRange(range, source, triggerChange) {
      var onChange = this.props.onChange;

      range = this.orderRange(range);

      this.setState({ range: range }, function () {
        return triggerChange && onChange && onChange(range, source);
      });
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(date, source) {
      if (date.startDate && date.endDate) {
        this.step = 0;
        return this.setRange(date, source, true);
      }

      var _state$range = this.state.range,
          startDate = _state$range.startDate,
          endDate = _state$range.endDate;


      var range = {
        startDate: startDate,
        endDate: endDate
      };

      switch (this.step) {
        case 0:
          range['startDate'] = date;
          range['endDate'] = date;
          this.step = 1;
          break;

        case 1:
          range['endDate'] = date;
          this.step = 0;
          break;
      }

      var triggerChange = !this.props.twoStepChange || this.step === 0 && this.props.twoStepChange;

      this.setRange(range, source, triggerChange);
    }
  }, {
    key: 'handleLinkChange',
    value: function handleLinkChange(direction) {
      var link = this.state.link;


      this.setState({
        link: link.clone().add(direction, 'months')
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // Whenever date props changes, update state with parsed variant
      if (newProps.startDate || newProps.endDate) {
        var format = newProps.format || this.props.format;
        var startDate = newProps.startDate && (0, _parseInput2.default)(newProps.startDate, format, 'startOf');
        var endDate = newProps.endDate && (0, _parseInput2.default)(newProps.endDate, format, 'endOf');
        var oldStartDate = this.props.startDate && (0, _parseInput2.default)(this.props.startDate, format, 'startOf');
        var oldEndDate = this.props.endDate && (0, _parseInput2.default)(this.props.endDate, format, 'endOf');

        if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
          this.setRange({
            startDate: startDate || oldStartDate,
            endDate: endDate || oldEndDate
          });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          ranges = _props.ranges,
          format = _props.format,
          linkedCalendars = _props.linkedCalendars,
          style = _props.style,
          calendars = _props.calendars,
          firstDayOfWeek = _props.firstDayOfWeek,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          classNames = _props.classNames,
          onlyClasses = _props.onlyClasses,
          specialDays = _props.specialDays,
          lang = _props.lang,
          disableDaysBeforeToday = _props.disableDaysBeforeToday,
          offsetPositive = _props.offsetPositive,
          shownDate = _props.shownDate,
          showMonthArrow = _props.showMonthArrow,
          rangedCalendars = _props.rangedCalendars;
      var _state = this.state,
          range = _state.range,
          link = _state.link;
      var styles = this.styles;


      var classes = (0, _extends3.default)({}, _styles.defaultClasses, classNames);
      var yearsDiff = range.endDate.year() - range.startDate.year();
      var monthsDiff = range.endDate.month() - range.startDate.month();
      var diff = yearsDiff * 12 + monthsDiff;
      var calendarsCount = Number(calendars) - 1;

      return _react2.default.createElement(
        'div',
        { style: onlyClasses ? undefined : (0, _extends3.default)({}, styles['DateRange'], style), className: classes.dateRange, __source: {
            fileName: _jsxFileName,
            lineNumber: 121
          }
        },
        ranges && _react2.default.createElement(_PredefinedRanges2.default, {
          format: format,
          ranges: ranges,
          range: range,
          theme: styles,
          onSelect: this.handleSelect.bind(this),
          onlyClasses: onlyClasses,
          classNames: classes, __source: {
            fileName: _jsxFileName,
            lineNumber: 123
          }
        }),
        function () {
          var _calendars = [];
          var _method = offsetPositive ? 'unshift' : 'push';
          for (var i = calendarsCount; i >= 0; i--) {
            var offset = offsetPositive ? i : -i;
            var realDiff = offsetPositive ? diff : -diff;
            var realOffset = rangedCalendars && i == calendarsCount && diff != 0 ? realDiff : offset;

            _calendars[_method](_react2.default.createElement(_Calendar2.default, {
              showMonthArrow: showMonthArrow,
              shownDate: shownDate,
              disableDaysBeforeToday: disableDaysBeforeToday,
              lang: lang,
              key: i,
              offset: realOffset,
              link: linkedCalendars && link,
              linkCB: _this2.handleLinkChange.bind(_this2),
              range: range,
              format: format,
              firstDayOfWeek: firstDayOfWeek,
              theme: styles,
              minDate: minDate,
              maxDate: maxDate,
              onlyClasses: onlyClasses,
              specialDays: specialDays,
              classNames: classes,
              onChange: _this2.handleSelect.bind(_this2), __source: {
                fileName: _jsxFileName,
                lineNumber: 142
              }
            }));
          }
          return _calendars;
        }()
      );
    }
  }]);
  return DateRange;
}(_react.Component);

DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: 'DD/MM/YYYY',
  calendars: 2,
  onlyClasses: false,
  offsetPositive: false,
  classNames: {},
  specialDays: [],
  rangedCalendars: false,
  twoStepChange: false
};

DateRange.propTypes = {
  format: _propTypes2.default.string,
  firstDayOfWeek: _propTypes2.default.number,
  calendars: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  startDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  endDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  minDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  maxDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  dateLimit: _propTypes2.default.func,
  ranges: _propTypes2.default.object,
  linkedCalendars: _propTypes2.default.bool,
  twoStepChange: _propTypes2.default.bool,
  theme: _propTypes2.default.object,
  onInit: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onlyClasses: _propTypes2.default.bool,
  specialDays: _propTypes2.default.array,
  offsetPositive: _propTypes2.default.bool,
  classNames: _propTypes2.default.object,
  rangedCalendars: _propTypes2.default.bool
};

exports.default = DateRange;