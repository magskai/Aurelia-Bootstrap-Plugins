var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { inject, bindable, bindingMode, DOM } from 'aurelia-framework';
import moment from 'moment';
import $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';
import { globalExtraOptions, globalPickerOptions } from './picker-global-options';

export let AbpDatetimePickerCustomElement = (_dec = inject(Element), _dec2 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec4 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = (_class2 = class AbpDatetimePickerCustomElement {

  constructor(elm) {
    _initDefineProp(this, 'element', _descriptor, this);

    _initDefineProp(this, 'model', _descriptor2, this);

    _initDefineProp(this, 'value', _descriptor3, this);

    _initDefineProp(this, 'id', _descriptor4, this);

    _initDefineProp(this, 'placeholder', _descriptor5, this);

    _initDefineProp(this, 'iconBase', _descriptor6, this);

    _initDefineProp(this, 'withDateIcon', _descriptor7, this);

    _initDefineProp(this, 'bootstrapVersion', _descriptor8, this);

    _initDefineProp(this, 'noUI', _descriptor9, this);

    _initDefineProp(this, 'buttonClass', _descriptor10, this);

    _initDefineProp(this, 'options', _descriptor11, this);

    _initDefineProp(this, 'onHide', _descriptor12, this);

    _initDefineProp(this, 'onShow', _descriptor13, this);

    _initDefineProp(this, 'onChange', _descriptor14, this);

    _initDefineProp(this, 'onError', _descriptor15, this);

    _initDefineProp(this, 'onUpdate', _descriptor16, this);

    this._events = {};
    this._methods = {};

    this.elm = elm;

    elm.focus = () => this.input.focus();
  }

  attached() {
    if (this.noUI) {
      this.domElm = $(this.elm);
    } else {
      this.domElm = $(this.elm).find('.date');
    }

    let pickerOptions = this.options || {};
    if (!this.options || this.options && !this.options.icons) {
      pickerOptions.icons = this.attachIconBase();
    }

    this.applyExposeEvents();
    this.exposeMethods();

    this.options = Object.assign({}, globalPickerOptions, pickerOptions);
    this.domElm.datetimepicker(this.options);

    this.element = {
      events: this._events,
      options: pickerOptions,
      methods: this._methods
    };
  }

  attachIconBase() {
    return {
      time: 'fa fa-clock-o',
      date: 'fa fa-calendar',
      up: 'fa fa-arrow-up',
      down: 'fa fa-arrow-down',
      previous: 'fa fa-chevron-left',
      next: 'fa fa-chevron-right',
      today: 'fa fa-calendar-check-o',
      clear: 'fa fa-trash',
      close: 'fa fa-window-close'
    };
  }

  bind() {
    let pickerOptions = this.options || this.elm.getAttribute('options');
    this.options = Object.assign({}, globalPickerOptions, pickerOptions);

    if (this.options) {
      this._format = this._originalDateFormat = this.options.hasOwnProperty('format') ? this.options.format : 'YYYY-MM-DD hh:mm A';
    }
    if (this.model) {
      this._originalDateObject = moment(this.model, this._format, true).toDate() || this.elm.getAttribute('model');
    }
    this._originalValue = this.value || this.elm.getAttribute('value');
    let value = this._originalValue || this._originalDateObject;

    if (value && moment(value, this._format, true).isValid()) {
      this.model = moment(value, this._format, true).toDate();
      this.value = moment(value, this._format, true);
    }
  }

  applyExposeEvents() {
    this.domElm.on('dp.hide', e => {
      if (typeof this.onHide === 'function') {
        this.onHide(e);
      }
      if (typeof this._events.onHide === 'function') {
        this._events.onHide(e);
      }
    });

    this.domElm.on('dp.show', e => {
      if (typeof this.onShow === 'function') {
        this.onShow(e);
      }
      if (typeof this._events.onShow === 'function') {
        this._events.onShow(e);
      }
    });

    this.domElm.on('dp.change', e => {
      if (typeof this.onChange === 'function') {
        this.onChange(e);
      }
      if (typeof this._events.onChange === 'function') {
        this._events.onChange(e);
      }
    });

    this.domElm.on('dp.error', e => {
      if (typeof this.onError === 'function') {
        this.onError(e);
      }
      if (typeof this._events.onError === 'function') {
        this._events.onError(e);
      }
    });

    this.domElm.on('dp.update', e => {
      if (typeof this.onUpdate === 'function') {
        this.onUpdate(e);
      }
      if (typeof this._events.onUpdate === 'function') {
        this._events.onUpdate(e);
      }
    });
  }

  blur() {
    const event = DOM.createCustomEvent('blur');
    this.elm.dispatchEvent(event);
  }

  constructMethod(methodType, methodName) {
    switch (methodType) {
      case 'getterSetter':
        return value => {
          if (value) {
            return this.domElm.data('DateTimePicker')[methodName](value);
          }
          return this.domElm.data('DateTimePicker')[methodName]();
        };
      case 'caller':
      case 'getter':
      default:
        return value => {
          return this.domElm.data('DateTimePicker')[methodName]();
        };
    }
  }

  exposeMethods() {
    let methodList = [{ name: 'allowInputToggle', type: 'getterSetter' }, { name: 'calendarWeeks', type: 'getterSetter' }, { name: 'clear', type: 'caller' }, { name: 'collapse', type: 'getterSetter' }, { name: 'date', type: 'getterSetter' }, { name: 'daysOfWeekDisabled', type: 'getterSetter' }, { name: 'dayViewHeaderFormat', type: 'getterSetter' }, { name: 'defaultDate', type: 'getterSetter' }, { name: 'destroy', type: 'caller' }, { name: 'debug', type: 'caller' }, { name: 'disable', type: 'caller' }, { name: 'disabledDates', type: 'getterSetter' }, { name: 'disabledHours', type: 'getterSetter' }, { name: 'disabledTimeIntervals', type: 'getterSetter' }, { name: 'enable', type: 'caller' }, { name: 'enabledDates', type: 'getterSetter' }, { name: 'enabledHours', type: 'getterSetter' }, { name: 'extraFormats', type: 'getterSetter' }, { name: 'focusOnShow', type: 'getterSetter' }, { name: 'format', type: 'getterSetter' }, { name: 'hide', type: 'caller' }, { name: 'icons', type: 'getterSetter' }, { name: 'ignoreReadonly', type: 'getterSetter' }, { name: 'inline', type: 'getterSetter' }, { name: 'keepInvalid', type: 'getterSetter' }, { name: 'keyBinds', type: 'getterSetter' }, { name: 'locale', type: 'getterSetter' }, { name: 'maxDate', type: 'getterSetter' }, { name: 'minDate', type: 'getterSetter' }, { name: 'options', type: 'getterSetter' }, { name: 'parseInputDate', type: 'getterSetter' }, { name: 'show', type: 'caller' }, { name: 'showClear', type: 'getterSetter' }, { name: 'showClose', type: 'getterSetter' }, { name: 'showTodayButton', type: 'getterSetter' }, { name: 'sideBySide', type: 'getterSetter' }, { name: 'stepping', type: 'getterSetter' }, { name: 'toggle', type: 'caller' }, { name: 'toolbarplacement', type: 'getterSetter' }, { name: 'tooltips', type: 'getterSetter' }, { name: 'useCurrent', type: 'getterSetter' }, { name: 'useStrict', type: 'getterSetter' }, { name: 'viewDate', type: 'getterSetter' }, { name: 'viewMode', type: 'getterSetter' }, { name: 'widgetPositioning', type: 'getterSetter' }];

    let methods = {};
    methodList.forEach(method => {
      methods[method.name] = this.constructMethod(method.type, method.name);
    });

    this._methods = methods;
  }

  detached() {
    this.value = null;
    this.model = null;
    this.domElm.data('DateTimePicker').minDate(false);
    this.domElm.data('DateTimePicker').maxDate(false);
  }

  getOption(optionName) {
    let domElm = $(this.elm).find('.input-group.date');
    if (domElm && typeof domElm.data === 'function' && domElm.data('DateTimePicker')) {
      let options = domElm.data('DateTimePicker').options();
      return options.hasOwnProperty(optionName) ? options[optionName] : null;
    }
    return null;
  }

  modelChanged(newValue, oldValue) {
    if (isNaN(Date.parse(newValue)) && newValue !== null) {
      throw new Error('Datetimepicker, model.bind must be of type Date');
    }
    if (newValue !== oldValue && newValue) {
      if (moment(newValue, this._format, true).isValid()) {
        this.value = moment(newValue, this._format, true).format(this._format);
      }
    }
  }

  valueChanged(newValue, oldValue) {
    if (newValue !== oldValue && newValue) {
      if (moment(newValue, this._format, true).isValid()) {
        this.model = moment(newValue, this._format, true).toDate();
      }
    }
  }

  parseBool(value) {
    return (/^(true|1)$/i.test(value)
    );
  }

  showCalendar() {
    this.domElm.data('DateTimePicker').show();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'element', [_dec2], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'model', [_dec3], {
  enumerable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec4], {
  enumerable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'id', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
  enumerable: true,
  initializer: function () {
    return '';
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'iconBase', [bindable], {
  enumerable: true,
  initializer: function () {
    return globalExtraOptions.iconBase;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'withDateIcon', [bindable], {
  enumerable: true,
  initializer: function () {
    return globalExtraOptions.withDateIcon;
  }
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, 'bootstrapVersion', [bindable], {
  enumerable: true,
  initializer: function () {
    return globalExtraOptions.bootstrapVersion;
  }
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, 'noUI', [bindable], {
  enumerable: true,
  initializer: function () {
    return globalExtraOptions.noUI;
  }
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, 'buttonClass', [bindable], {
  enumerable: true,
  initializer: function () {
    return globalExtraOptions.buttonClass;
  }
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, 'options', [bindable], {
  enumerable: true,
  initializer: function () {
    return {};
  }
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, 'onHide', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, 'onShow', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, 'onChange', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, 'onError', [bindable], {
  enumerable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, 'onUpdate', [bindable], {
  enumerable: true,
  initializer: null
})), _class2)) || _class);