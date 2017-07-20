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

var _jsxFileName = 'src/Calendar.js';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _parseInput = require('./utils/parseInput.js');

var _parseInput2 = _interopRequireDefault(_parseInput);

var _DayCell = require('./DayCell.js');

var _DayCell2 = _interopRequireDefault(_DayCell);

var _LangDic = require('./LangDic.js');

var _LangDic2 = _interopRequireDefault(_LangDic);

var _styles = require('./styles.js');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function checkRange(dayMoment, range) {
  return dayMoment.isBetween(range['startDate'], range['endDate']) || dayMoment.isBetween(range['endDate'], range['startDate']);
}

function checkStartEdge(dayMoment, range) {
  var startDate = range.startDate;


  return dayMoment.startOf('day').isSame(startDate.startOf('day'));
}

function checkEndEdge(dayMoment, range) {
  var endDate = range.endDate;


  return dayMoment.endOf('day').isSame(endDate.endOf('day'));
}

function isOusideMinMax(dayMoment, minDate, maxDate, format) {
  return minDate && dayMoment.isBefore((0, _parseInput2.default)(minDate, format, 'startOf')) || maxDate && dayMoment.isAfter((0, _parseInput2.default)(maxDate, format, 'endOf'));
}

var Calendar = function (_Component) {
  (0, _inherits3.default)(Calendar, _Component);

  function Calendar(props, context) {
    (0, _classCallCheck3.default)(this, Calendar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Calendar.__proto__ || (0, _getPrototypeOf2.default)(Calendar)).call(this, props, context));

    var format = props.format,
        range = props.range,
        theme = props.theme,
        offset = props.offset,
        firstDayOfWeek = props.firstDayOfWeek,
        locale = props.locale,
        shownDate = props.shownDate;


    if (locale) {
      _moment2.default.locale(locale);
    }

    var date = (0, _parseInput2.default)(props.date, format, 'startOf');
    var state = {
      date: date,
      shownDate: (shownDate || range && range['endDate'] || date).clone().add(offset, 'months'),
      firstDayOfWeek: firstDayOfWeek || _moment2.default.localeData().firstDayOfWeek()
    };

    _this.state = state;
    _this.styles = (0, _styles2.default)(theme);
    return _this;
  }

  (0, _createClass3.default)(Calendar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var onInit = this.props.onInit;

      onInit && onInit(this.state.date);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var range = nextProps.range,
          offset = nextProps.offset;

      var oldRange = this.props.oldRange;

      if (range && range['endDate'] && !range['endDate'].isSame(range['startDate'], "day") || oldRange && !oldRange["startDate"].isSame(range["startDate"])) {
        this.setState({ shownDate: range['endDate'].clone().add(offset, 'months') });
      }
    }
  }, {
    key: 'getShownDate',
    value: function getShownDate() {
      var _props = this.props,
          link = _props.link,
          offset = _props.offset;


      var shownDate = link ? link.clone().add(offset, 'months') : this.state.shownDate;

      return shownDate;
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(newDate) {
      var _props2 = this.props,
          link = _props2.link,
          onChange = _props2.onChange;
      var date = this.state.date;


      onChange && onChange(newDate, Calendar);

      if (!link) {
        this.setState({ date: newDate });
      }
    }
  }, {
    key: 'changeMonth',
    value: function changeMonth(direction, event) {
      event.preventDefault();
      var _props3 = this.props,
          link = _props3.link,
          linkCB = _props3.linkCB;


      if (link && linkCB) {
        return linkCB(direction);
      }

      var current = this.state.shownDate.month();
      var newMonth = this.state.shownDate.clone().add(direction, 'months');

      this.setState({
        shownDate: newMonth
      });
    }
  }, {
    key: 'renderMonthAndYear',
    value: function renderMonthAndYear(classes) {
      var shownDate = this.getShownDate();
      var month = _moment2.default.months(shownDate.month());
      var year = shownDate.year();
      var styles = this.styles;
      var _props4 = this.props,
          onlyClasses = _props4.onlyClasses,
          lang = _props4.lang,
          showMonthArrow = _props4.showMonthArrow;


      var monthLower = month.toLowerCase();
      month = lang && _LangDic2.default[lang] && _LangDic2.default[lang][monthLower] ? _LangDic2.default[lang][monthLower] : month;

      return _react2.default.createElement(
        'div',
        { style: onlyClasses ? undefined : styles['MonthAndYear'], className: classes.monthAndYearWrapper, __source: {
            fileName: _jsxFileName,
            lineNumber: 117
          }
        },
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            style: onlyClasses ? undefined : (0, _extends3.default)({}, styles['MonthButton'], { float: 'left' }),
            className: classes.prevButton,
            onClick: this.changeMonth.bind(this, -1), __source: {
              fileName: _jsxFileName,
              lineNumber: 120
            }
          },
          _react2.default.createElement('i', { style: onlyClasses ? undefined : (0, _extends3.default)({}, styles['MonthArrow'], styles['MonthArrowPrev']), __source: {
              fileName: _jsxFileName,
              lineNumber: 125
            }
          })
        ) : null,
        _react2.default.createElement(
          'span',
          {
            __source: {
              fileName: _jsxFileName,
              lineNumber: 128
            }
          },
          _react2.default.createElement(
            'span',
            { className: classes.month, __source: {
                fileName: _jsxFileName,
                lineNumber: 129
              }
            },
            month
          ),
          _react2.default.createElement(
            'span',
            { className: classes.monthAndYearDivider, __source: {
                fileName: _jsxFileName,
                lineNumber: 130
              }
            },
            ' - '
          ),
          _react2.default.createElement(
            'span',
            { className: classes.year, __source: {
                fileName: _jsxFileName,
                lineNumber: 131
              }
            },
            year
          )
        ),
        showMonthArrow ? _react2.default.createElement(
          'button',
          {
            type: 'button',
            style: onlyClasses ? undefined : (0, _extends3.default)({}, styles['MonthButton'], { float: 'right' }),
            className: classes.nextButton,
            onClick: this.changeMonth.bind(this, +1), __source: {
              fileName: _jsxFileName,
              lineNumber: 135
            }
          },
          _react2.default.createElement('i', { style: onlyClasses ? undefined : (0, _extends3.default)({}, styles['MonthArrow'], styles['MonthArrowNext']), __source: {
              fileName: _jsxFileName,
              lineNumber: 140
            }
          })
        ) : null
      );
    }
  }, {
    key: 'renderWeekdays',
    value: function renderWeekdays(classes) {
      var dow = this.state.firstDayOfWeek;
      var weekdays = [];
      var styles = this.styles;
      var _props5 = this.props,
          onlyClasses = _props5.onlyClasses,
          lang = _props5.lang;


      for (var i = dow; i < 7 + dow; i++) {
        var day = _moment2.default.weekdaysMin(i);
        var dayLower = day.toLowerCase();
        day = lang && _LangDic2.default[lang] && _LangDic2.default[lang][dayLower] ? _LangDic2.default[lang][dayLower] : day;
        weekdays.push(_react2.default.createElement(
          'span',
          { style: onlyClasses ? undefined : styles['Weekday'], className: classes.weekDay, key: i + day, __source: {
              fileName: _jsxFileName,
              lineNumber: 158
            }
          },
          day
        ));
      }

      return weekdays;
    }
  }, {
    key: 'renderDays',
    value: function renderDays(classes) {
      var _this2 = this;

      // TODO: Split this logic into smaller chunks
      var styles = this.styles;
      var _props6 = this.props,
          range = _props6.range,
          minDate = _props6.minDate,
          maxDate = _props6.maxDate,
          format = _props6.format,
          onlyClasses = _props6.onlyClasses,
          disableDaysBeforeToday = _props6.disableDaysBeforeToday,
          specialDays = _props6.specialDays;


      var shownDate = this.getShownDate();
      var _state = this.state,
          date = _state.date,
          firstDayOfWeek = _state.firstDayOfWeek;

      var dateUnix = date.unix();

      var monthNumber = shownDate.month();
      var dayCount = shownDate.daysInMonth();
      var startOfMonth = shownDate.clone().startOf('month').isoWeekday();

      var lastMonth = shownDate.clone().month(monthNumber - 1);
      var lastMonthNumber = lastMonth.month();
      var lastMonthDayCount = lastMonth.daysInMonth();

      var nextMonth = shownDate.clone().month(monthNumber + 1);
      var nextMonthNumber = nextMonth.month();

      var days = [];

      // Previous month's days
      var diff = Math.abs(firstDayOfWeek - (startOfMonth + 7)) % 7;
      for (var i = diff - 1; i >= 0; i--) {
        var dayMoment = lastMonth.clone().date(lastMonthDayCount - i);
        days.push({ dayMoment: dayMoment, isPassive: true });
      }

      // Current month's days
      for (var _i = 1; _i <= dayCount; _i++) {
        var _dayMoment = shownDate.clone().date(_i);
        // set days before today to isPassive
        var _today = (0, _moment2.default)();
        if (disableDaysBeforeToday && Number(_dayMoment.diff(_today, "days")) <= -1) {
          days.push({ dayMoment: _dayMoment, isPassive: true });
        } else {
          days.push({ dayMoment: _dayMoment });
        }
      }

      // Next month's days
      var remainingCells = 42 - days.length; // 42cells = 7days * 6rows
      for (var _i2 = 1; _i2 <= remainingCells; _i2++) {
        var _dayMoment2 = nextMonth.clone().date(_i2);
        days.push({ dayMoment: _dayMoment2, isPassive: true });
      }

      var today = (0, _moment2.default)().startOf('day');
      return days.map(function (data, index) {
        var dayMoment = data.dayMoment,
            isPassive = data.isPassive;

        var isSelected = !range && dayMoment.unix() === dateUnix;
        var isInRange = range && checkRange(dayMoment, range);
        var isStartEdge = range && checkStartEdge(dayMoment, range);
        var isEndEdge = range && checkEndEdge(dayMoment, range);
        var isEdge = isStartEdge || isEndEdge;
        var isToday = today.isSame(dayMoment);
        var isSunday = dayMoment.day() === 0;
        var isSpecialDay = specialDays && specialDays.some(function (specialDay) {
          return dayMoment.endOf('day').isSame(specialDay.date.endOf('day'));
        });
        var isOutsideMinMax = isOusideMinMax(dayMoment, minDate, maxDate, format);

        return _react2.default.createElement(_DayCell2.default, (0, _extends3.default)({
          onSelect: _this2.handleSelect.bind(_this2)
        }, data, {
          theme: styles,
          isStartEdge: isStartEdge,
          isEndEdge: isEndEdge,
          isSelected: isSelected || isEdge,
          isInRange: isInRange,
          isSunday: isSunday,
          isSpecialDay: isSpecialDay,
          isToday: isToday,
          key: index,
          isPassive: isPassive || isOutsideMinMax,
          onlyClasses: onlyClasses,
          classNames: classes,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 230
          }
        }));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var styles = this.styles;
      var _props7 = this.props,
          onlyClasses = _props7.onlyClasses,
          classNames = _props7.classNames;


      var classes = (0, _extends3.default)({}, _styles.defaultClasses, classNames);

      return _react2.default.createElement(
        'div',
        { style: onlyClasses ? undefined : (0, _extends3.default)({}, styles['Calendar'], this.props.style), className: classes.calendar, __source: {
            fileName: _jsxFileName,
            lineNumber: 257
          }
        },
        _react2.default.createElement(
          'div',
          { className: classes.monthAndYear, __source: {
              fileName: _jsxFileName,
              lineNumber: 258
            }
          },
          this.renderMonthAndYear(classes)
        ),
        _react2.default.createElement(
          'div',
          { className: classes.weekDays, __source: {
              fileName: _jsxFileName,
              lineNumber: 259
            }
          },
          this.renderWeekdays(classes)
        ),
        _react2.default.createElement(
          'div',
          { className: classes.days, __source: {
              fileName: _jsxFileName,
              lineNumber: 260
            }
          },
          this.renderDays(classes)
        )
      );
    }
  }]);
  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  format: 'DD/MM/YYYY',
  theme: {},
  showMonthArrow: true,
  disableDaysBeforeToday: false,
  onlyClasses: false,
  classNames: {},
  specialDays: []
};

Calendar.propTypes = {
  showMonthArrow: _propTypes2.default.bool,
  disableDaysBeforeToday: _propTypes2.default.bool,
  lang: _propTypes2.default.string,
  sets: _propTypes2.default.string,
  range: _propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object
  }),
  minDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  maxDate: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func, _propTypes2.default.string]),
  date: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string, _propTypes2.default.func]),
  format: _propTypes2.default.string.isRequired,
  firstDayOfWeek: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  onChange: _propTypes2.default.func,
  onInit: _propTypes2.default.func,
  link: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    startDate: _propTypes2.default.object,
    endDate: _propTypes2.default.object
  }), _propTypes2.default.bool]),
  linkCB: _propTypes2.default.func,
  theme: _propTypes2.default.object,
  onlyClasses: _propTypes2.default.bool,
  specialDays: _propTypes2.default.array,
  classNames: _propTypes2.default.object,
  locale: _propTypes2.default.string
};

exports.default = Calendar;